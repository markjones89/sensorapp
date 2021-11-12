import * as d3 from 'd3'
import { extend } from '../helpers'

/**
 * Creates a floor plan mapper (areas and sensors)
 * @param {String} wrapper Mapper wrapper ID
 * @param {Object} data Floor plan data
 * @param {Object} options Mapper configurations & callback functions
 */
function mapper(wrapper, data, options) {
    const container = d3.select(wrapper)//, parentRect = container.node().parentNode.getBoundingClientRect()
    const config_defaults = { edit: false, heatmap: false, comfortmap: false }

    let maxWidth = () => container.node().parentNode.getBoundingClientRect().width || 800, 
        maxHeight = () => container.node().parentNode.getBoundingClientRect().height || 400

    let width = maxWidth(), height = maxHeight()
    let _floor = data,
        sensors = _floor.sensors || [],
        config = extend(config_defaults, options),
        events = config.events,
        offset = { x: 0, y: 0, scale: 0 },
        tooltipOffsetX = 15,
        state = {
            sensorMapping: false, showSensors: false,
            areaMapping: false, showAreas: false,
            drawing: false, polyMoved: false
        },
        drawPoints = [],
        size = 5
    
    let sensorSize = () => {
        if (config.heatmap) return size * 3
        if (config.comfortmap) return size * 7
        return size
    }

    let blurSize = () => { return config.heatmap ? 7 : 15 }

    let xDMax = 50.0, yDMax = 33.79,
        x = d3.scaleLinear().domain([0, xDMax]).range([0, width]),
        y = d3.scaleLinear().domain([0, yDMax]).range([0, height]),
        _ = this

    const sensorColor = d3.scaleOrdinal()
            .domain([0, 1, 2])
            .range(['#01FE01', '#FF8600', '#ED0003']),
        sensorStroke = d3.scaleOrdinal()
            .domain([0, 1, 2])
            .range(['rgba(1,254,1,0.3)', 'rgba(255,134,0,0.3)', 'rgba(237,0,3,0.3)'])

    container.selectAll('svg').remove() //clean up
    container.selectAll('.tooltip').remove()

    const tooltip = container.append('div').attr('class', 'tooltip')
    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('background', '#ffffff')
        .on('click', function() {
            if (!config.edit) return

            let evt = d3.event,
                elem = document.elementFromPoint(evt.x, evt.y)
            
            if (elem.tagName === 'svg') return

            let t = mapLayer.__transform,
                _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
                _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY

            if ((t && t.z === 1) || !t) {
                _x -= offset.x
                _y -= offset.y
            }

            if (state.sensorMapping) {
                let area = elem.tagName === 'polygon' ? d3.select(elem.parentNode).data()[0] : null

                return events && events.sensorAdd && events.sensorAdd.call(_, { x: _x, y: _y, scale: offset.scale, area })
            }
        })

    if (config.events) {
        svg.style('pointer-events', 'all')
    }

    // set wrapper to inline-block
    if (config.heatmap || config.comfortmap) {
        svg.append("defs")
            .append("filter")
            .attr("id", "blur").attr('x', '-50%').attr('y', '-50%')
            .attr('width', '200%').attr('height', '200%')
            .append("feGaussianBlur")
            .attr("stdDeviation", blurSize())
    }

    const mapLayer = svg.selectAll('.map-layer').data([0])
        .enter().append('g').attr('class', 'map-layer')

    const imgLayer = mapLayer.append('g').attr('class', 'image-layer')
    const sensorLayer = mapLayer.append('g').attr('class', 'sensor-layer')

    const zoom = d3.zoom().scaleExtent([1, 8])
        .on('zoom', () => {
            mapLayer.__transform = d3.event.transform

            let minXTranslate = (1 - mapLayer.__transform.k) * (x.range()[1] - x.range()[0]),
                minYTranslate = (1 - mapLayer.__transform.k) * (y.range()[1] - y.range()[0])

            mapLayer.__transform.x = Math.min(x.range()[0], Math.max(mapLayer.__transform.x, minXTranslate))
            mapLayer.__transform.y = Math.min(y.range()[0], Math.max(mapLayer.__transform.y, minYTranslate))

            // mapLayer.attr('transform', mapLayer.__transform)
            imgLayer.attr('transform', mapLayer.__transform)
            sensorLayer.attr('transform', mapLayer.__transform)
        })

    mapLayer.call(zoom)

    /**
     * Sets the size of the canvas
     * @param {number} w Canvas width
     * @param {number} h Canvas height
     */
    function setSize(w, h) {
        width = w
        height = h

        x = d3.scaleLinear().domain([0, xDMax]).range([0, w])
        y = d3.scaleLinear().domain([0, yDMax]).range([0, h])
        svg.attr('width', w).attr('height', h)
    }

    /**
     * Gets the floor plan dimension, and adjusts the canvas size to fit
     * @param {string} src Image url
     * @param {Function} cb Callback function
     */
    function getImageDim(src, cb) {
        let img = new Image()

        if (events && events.imgLoad) events.imgLoad.call(this, src)

        img.src = src
        img.onload = () => {
            let //diff = { h: maxHeight() - img.height, w: maxWidth() - img.width },
                // isNegative = diff.h < 0 && diff.w < 0,
                // scale = (!isNegative && diff.h < diff.w) || (isNegative && diff.h > diff.w) ? (maxHeight() / img.height) : (maxWidth() / img.width),
                // scale = (diff.h < diff.w) ? (maxHeight() / img.height) : (maxWidth() / img.width),
                max_height = maxHeight(), max_width = maxWidth(),
                scale = img.height > max_height ? (max_height / img.height) : (max_width / img.width),
                canvasWidth = Math.min(Math.min(img.width * scale, img.width), max_width),
                canvasHeight = Math.min(Math.min(img.height * scale, img.height), max_height)

            // console.log('getImageDim', img.width, img.height, scale, canvasWidth, canvasHeight, max_width, max_height)

            setSize(canvasWidth, canvasHeight)

            if (events && events.imgLoaded) events.imgLoaded.call(this, img)

            return cb && cb({ height: img.height, width: img.width })
        }
    }

    /**
     * Calculates the floor plan size offset to the canvas
     * @param {Function} cb Callback function
     */
    function calcOffsets(cb) {
        getImageDim(_floor.floor_plan_url, dim => {
            let diff = { h: height - dim.height, w: width - dim.width },
                scale = diff.h < diff.w ? (height / dim.height) : (width / dim.width),
                imgWidth = dim.width * scale, imgHeight = dim.height * scale,
                imgOffsetX = (width - imgWidth) / 2,
                imgOffsetY = (height - imgHeight) / 2

            offset.x = imgOffsetX < 0 ? 0 : imgOffsetX
            offset.y = imgOffsetY < 0 ? 0 : imgOffsetY
            offset.scale = scale

            if (cb) cb()
        })
    }

    /**
     * Sets the tooltip position
     * @param {number} x Position on x-axis
     * @param {number} y Position on y-axis
     * @param {string} content Tooltip content
     */
    function setTooltip(x, y, content) {
        let bodyWidth = document.body.clientWidth

        if (content) tooltip.html(content)
        if (x < 0) x = 0
        if (x > bodyWidth) x = x - Math.abs(bodyWidth - x)

        tooltip.style('left', `${x}px`)
                .style('top', `${y}px`)
    }

    /* sensor functions */
    function sensorClick(s) { return events && events.sensorClick && events.sensorClick.call(_, s) }

    function sensorDrag(s) {
        if (config.edit && state.sensorMapping) {
            s.dragged = true
            d3.select(this)
                .attr('cx', s.pos_x = d3.event.x)
                .attr('cy', s.pos_y = d3.event.y)
        }
    }

    function sensorDragEnd(s) {
        if (config.edit && state.sensorMapping && s.dragged) {
            s.dragged = false
            s.pos_x -= offset.x
            s.pos_y -= offset.y
            s.scale = offset.scale
            return events && events.sensorMoved && events.sensorMoved.call(_, s)
        }
    }
    /* end sensor functions */

    /**
     * Renders the floor plan image
     */
    this.drawFloorPlan = function () {
        imgLayer.selectAll('image').remove()
        
        if (mapLayer.__transform) imgLayer.attr('transform', mapLayer.__transform)

        if (_floor.floor_plan) {

            let canClick = config.edit && (state.sensorMapping || state.areaMapping)

            imgLayer.insert('image', ':first-child')
                    .attr('xlink:href', _floor.floor_plan_url)
                    .attr('height', y(0 + yDMax) - y(0))
                    .attr('width', x(0 + xDMax) - x(0))
                    .style('cursor', () => { return canClick ? 'crosshair' : 'default' })
                    // .on('click', () => canClick && (floorClick(), d3.event.stopPropagation()))
        }
    }

    /**
     * Renders all sensor dots
     */
    this.drawSensors = function () {
        sensorLayer.selectAll('.sensor').remove() //clear

        if (mapLayer.__transform) sensorLayer.attr('transform', mapLayer.__transform)

        if (sensors.length === 0) return

        let canEdit = config.edit && state.sensorMapping

        sensorLayer.selectAll('.sensor')
            .data(sensors)
            .enter()
            .append('circle')
            .attr('class', 'sensor').attr('data-id', d => d.id)
            .attr('r', sensorSize())
            .attr('stroke-width', config.heatmap || config.comfortmap ? null : 5)
            .attr('stroke', config.heatmap || config.comfortmap ? null : sensorStroke(0))
            .style('fill', sensorColor(0))
            .attr("filter", config.heatmap || config.comfortmap ? "url(#blur)" : null)
            .style('cursor', function () { return canEdit ? 'move' : 'default' })
            .attr('cx', s => {
                let scale = parseFloat(offset.scale.toFixed(12))

                return ((s.pos_x / s.scale) * scale) + offset.x
            })
            .attr('cy', s => {
                let scale = parseFloat(offset.scale.toFixed(12))

                return ((s.pos_y / s.scale) * scale) + offset.y
            })
            .on('mouseover', function() {
                if (config.comfortmap) return
                let s_circle = d3.select(this),
                    s = sensors.find(x => x.id === s_circle.attr('data-id'))
                
                if (!config.heatmap) s_circle.classed('hovered', true)
                tooltip.transition().duration(200).style('opacity', 0.95)

                let ttRect = tooltip.node().getBoundingClientRect()
                let tooltipX = d3.event.pageX - (ttRect.width / 2) //d3.event.offsetX + tooltipOffsetX
                let tooltipY = d3.event.pageY - (ttRect.height + 10) //d3.event.offsetY - (tooltip.node().getBoundingClientRect().height / 2)

                setTooltip(tooltipX, tooltipY,
                    `<div>ID: ${s.sensor_id}</div>
                    <div>Name: ${s.name ? s.name : '(None)'}</div>
                    <div>Area: ${s.parent}</div>`)
            })
            .on('mousemove', function() {
                if (config.comfortmap) return

                let ttRect = tooltip.node().getBoundingClientRect()
                let tooltipX = d3.event.pageX - (ttRect.width / 2) //d3.event.offsetX + tooltipOffsetX
                let tooltipY = d3.event.pageY - (ttRect.height + 10) //d3.event.offsetY - (tooltip.node().getBoundingClientRect().height / 2)

                setTooltip(tooltipX, tooltipY)
            })
            .on('mouseout', function() { 
                if (config.comfortmap) return
                
                if (!config.heatmap) d3.select(this).classed('hovered', false)
                tooltip.transition().duration(200).style('opacity', 0) 
            })
            .on('click', s => canEdit && (sensorClick(s), d3.event.stopPropagation()))
            .call(d3.drag()
                .on('drag', sensorDrag)
                .on('end', sensorDragEnd))
    }

    /**
     * Sets the sensor color by status
     * @param {string} id Sensor id
     * @param {string} status Sensor status
     */
    this.setSensorColor = function (id, status) {
        let range = status === 'occupied' ? 1 : 0

        sensorLayer.select(`.sensor[data-id="${id}"]`)
            .style('fill', sensorColor(range))
            .attr('stroke', sensorStroke(range))
    }

    /**
     * Sets the floor data of the mapper
     * @param {Object} data Floor data
     */
    this.setData = function (data) {
        _floor = data
        sensors = _floor.sensors
        mapLayer.__transform = null

        this.redraw(true)
    }

    /**
     * Re-draws the floor map (floor plan, sensors, areas)
     * @param {Boolean} fresh Determines if zoom will be reset
     */
    this.redraw = function (fresh) {
        if (!_floor.floor_plan) {
            imgLayer.selectAll('image').remove()
            sensorLayer.selectAll('.sensor').remove()
            return
        }
        // remove zoom
        if (fresh) {
            mapLayer.__transform = null
            mapLayer.call(zoom.transform, d3.zoomIdentity)

            calcOffsets(() => {
                this.drawFloorPlan()
                this.drawSensors()
            })
        } else {
            this.drawFloorPlan()
            this.drawSensors()
        }

        this.clearDrawing()
    }

    /**
     * Sets the editing state
     * @param {Boolean} edit Determines if editing is enabled
     */
    this.editMode = function (edit) {
        config.edit = edit
        this.redraw(false)
    }

    /**
     * Sets the area mapping state (enabled/disabled)
     * @param {Boolean} enable Determines if area mapping is enabled
     */
    this.setAreaMapping = function (enable) {
        if (enable) state.sensorMapping = false
        state.areaMapping = enable
        this.redraw(false)
    }

    /**
     * Clears the unsaved area drawn
     */
    this.clearDrawing = function() {
        state.drawing = false
        drawPoints.splice(0)
    }

    /**
     * Sets the sensor mapping state (enabled/disabled)
     * @param {Boolean} enable Determines if sensor mapping is enabled
     */
    this.setSensorMapping = function (enable) {
        if (enable) state.areaMapping = false
        state.sensorMapping = enable
        this.redraw(false)
    }

    // render floor plan
    if (_floor && _floor.floor_plan) {
        calcOffsets(() => {
            this.drawFloorPlan()
            this.drawSensors()
        })
    }

    return this
}

export default mapper