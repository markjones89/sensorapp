import * as d3 from 'd3'

/**
 * Creates a floor plan mapper (areas and sensors)
 * @param {String} wrapper Mapper wrapper ID
 * @param {Object} data Floor plan data
 * @param {Object} callbacks Mapper event callbacks
 */
function mapper(wrapper, data, callbacks) {
    const container = d3.select(wrapper)
    const
        width = 800, 
        // width = container.node().getBoundingClientRect().width - 16,
        height = 487
    // height = 600
    let floor = data,
        sensors = floor.sensors || [],
        areas = floor.areas || [],
        config = { edit: false },
        offset = { x: 0, y: 0, scale: 0 },
        state = {
            sensorPlotting: false, showSensors: false,
            areaMapping: false, showAreas: false,
            drawing: false, polyMoved: false
        },
        drawPoints = [],
        events = callbacks//{ sensorClick: null }

    let xDMax = 50.0, yDMax = 33.79,
        x = d3.scaleLinear().domain([0, xDMax]).range([0, width]),
        y = d3.scaleLinear().domain([0, yDMax]).range([0, height]),
        _ = this

    container.selectAll('svg').remove() //clean up

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('background', '#ffffff')

    const mapLayer = svg.selectAll('.map-layer').data([0])
        .enter().append('g').attr('class', 'map-layer')

    const imgLayer = mapLayer.append('g').attr('class', 'image-layer')
    const sensorLayer = mapLayer.append('g').attr('class', 'sensor-layer')
    const areaLayer = mapLayer.append('g').attr('class', 'area-layer')

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
            areaLayer.attr('transform', mapLayer.__transform)
        })

    mapLayer.call(zoom)
        .on('mousemove', function () {
            if (!state.drawing) return

            let drawLayer = areaLayer.select('g.area-draw')

            drawLayer.select('line').remove()

            let lastPoint = drawPoints[drawPoints.length - 1]

            drawLayer.insert('line', ':nth-child(2)')
                .attr('x1', lastPoint.x)
                .attr('y1', lastPoint.y)
                .attr('x2', d3.mouse(this)[0] + 3)
                .attr('y2', d3.mouse(this)[1])
                .attr('stroke', '#53DBF3')
                .attr('stroke-width', 1)
                .style('pointer-events', 'none')
        })

    function getImageDim(src, cb) {
        let img = new Image()

        img.src = src
        img.onload = () => {
            return cb && cb({ height: img.height, width: img.width })
        }
    }

    function calcOffsets(cb) {
        getImageDim(floor.floor_plan_url, dim => {
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

    function floorClick() {
        let t = mapLayer.__transform, evt = d3.event,
            _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
            _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY

        if ((t && t.z === 1) || !t) {
            _x -= offset.x
            _y -= offset.y
        }

        if (state.sensorPlotting) {
            return events.sensorAdd && events.sensorAdd.call(_, { x: _x, y: _y, scale: offset.scale })
        } else if (state.areaMapping) {
            let point = {
                x: t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
                y: t ? (evt.offsetY - t.y) / t.k : evt.offsetY
            },
                drawLayer = areaLayer.select('g.area-draw')

            if (drawLayer.empty())
                startAreaDraw(point)
            else
                addPoint(drawLayer, point)
        }
    }

    /* area mapping functions */
    function startAreaDraw(point) {
        state.drawing = true

        let drawLayer = areaLayer.append('g').attr('class', 'area-draw');

        addPoint(drawLayer, point)
    }

    function addPoint(drawLayer, point) {
        drawPoints.push(point)

        drawLayer.select('polyline').remove()

        // draw line
        drawLayer.insert('polyline', ':first-child').data(drawPoints)
            .attr('points', () => {
                return drawPoints.map(p => {
                    return [p.x, p.y].join(',')
                }).join(' ')
            })
            .style('fill', 'none')
            .attr('stroke', '#53DBF3');

        drawLayer.append('circle')
            .attr('cx', point.x)
            .attr('cy', point.y)
            .attr('r', 4)
            .attr('fill', '#FFEB3B').attr('stroke', '#53DBF3')
            // .attr('is-handle', 'true')
            .style('cursor', 'pointer')
            .on('click', () => endAreaDraw())
    }

    function toPointsDisp(points, scale) {
        return points.map(p => {
            let c_scale = parseFloat(offset.scale.toFixed(12)) //current scale

            return [
                ((p.x / scale) * c_scale) + offset.x,
                ((p.y / scale) * c_scale) + offset.y
            ].join(',')
        }).join(' ')
    }

    function toPointsSave(points) {
        return points.map(p => {
            return [p.x - offset.x, p.y - offset.y].join(',')
        }).join(' ')
    }

    function toPolyPoints(points) {
        return points.map(p => {
            return [p.x, p.y].join(',')
        }).join(' ')
    }

    function addPoly(points, area) {
        let ag = areaLayer.append('g').attr('class', area ? 'area' : 'area unsaved')

        let canEdit = config.edit && !state.sensorPlotting,
            poly = ag.append('polygon')//.data(points)
                .attr('points', area ? toPointsDisp(points, area.scale) : toPolyPoints(points))
                .style('fill', '#53DBF3').style('opacity', 0.6)
                .style('cursor', () => { return canEdit ? 'move' : 'default' })
                .on('click', a => canEdit && (polyClick(area), d3.event.stopPropagation()))
                .call(d3.drag()
                    .on('drag', polyDrag)
                    .on('end', polyDragEnd))

        if (area) {
            ag.data([area])

            poly.append("svg:title")
                .text(area.name)
        }

        if (!canEdit) return

        ag.selectAll('circles')
            .data(points).enter()
            .append('circle')
            .attr('cx', d => {
                return area ? 
                    ((d.x / area.scale) * parseFloat(offset.scale.toFixed(12))) + offset.x : d.x
            })
            .attr('cy', d => {
                return area ? 
                    ((d.y / area.scale) * parseFloat(offset.scale.toFixed(12))) + offset.y : d.y
            })
            .attr('r', 4)
            .attr('fill', '#FFEB3B').attr('stroke', '#53DBF3')
            // .attr('fill', 'none').attr('stroke', '#8bc34a').attr('stroke-width', 2)
            .style('cursor', 'move')
            .call(d3.drag()
                .on('drag', polyPointDrag)
                .on('end', polyPointDragEnd)
            )
    }

    function polyClick(a) { return events.areaClick && events.areaClick.call(_, a)  }

    function polyDrag() {
        if (config.edit && !state.sensorPlotting) {
            let { dx, dy } = d3.event,
                poly = d3.select(this),
                circles = d3.select(this.parentNode).selectAll('circle'), circle, newPoints = [],
                areaData = d3.select(this.parentNode).data()[0]
            
            state.polyMoved = dx > 0 || dy > 0

            circles.each(function (cd) {
                circle = d3.select(this)
                cd.x += dx
                cd.y += dy

                circle.attr('cx', d => {
                    return areaData ? 
                        ((cd.x / areaData.scale) * parseFloat(offset.scale.toFixed(12))) + offset.x : cd.x
                })
                .attr('cy', d => {
                    return areaData ?
                        ((cd.y / areaData.scale) * parseFloat(offset.scale.toFixed(12))) + offset.y : cd.y
                })
                newPoints.push({ x: cd.x, y: cd.y })
            })

            poly.attr('points', toPointsDisp(newPoints, areaData.scale))
        }
    }

    function polyDragEnd() {
        if (config.edit && !state.sensorPlotting) {
            let areaData = d3.select(this.parentNode).data()[0],
                circles = d3.select(this.parentNode).selectAll('circle'), newPoints = []

            if (!state.polyMoved) return

            state.polyMoved = false
            circles.each(cd => newPoints.push({ x: cd.x, y: cd.y }))

            let polyPoints = toPolyPoints(newPoints)

            return events.areaPtUpdate && events.areaPtUpdate.call(_, areaData === 0 ? null : areaData, polyPoints, offset.scale)
        }
    }

    function polyPointDrag (d) {
        // if (state.drawing) return
        d.dragged = true

        let evt = d3.event, dragPoint = d3.select(this), newPoints = [],
            poly = d3.select(this.parentNode).select('polygon'),
            circles = d3.select(this.parentNode).selectAll('circle'),
            areaData = d3.select(this.parentNode).data()[0]

        dragPoint.attr('cx', evt.x + offset.x)
            .attr('cy', evt.y + offset.y)

        d.x += evt.dx
        d.y += evt.dy

        circles.each(cd => newPoints.push({ x: cd.x, y: cd.y }))
        poly.attr('points', toPointsDisp(newPoints, areaData.scale))
    }

    function polyPointDragEnd (d) {
        if (!d.dragged) return

        d.dragged = false

        let newPoints = [], 
            // poly = d3.select(this.parentNode).select('polygon'),
            circles = d3.select(this.parentNode).selectAll('circle'),
            areaData = d3.select(this.parentNode).data()[0]

        circles.each(cd => newPoints.push({ x: cd.x, y: cd.y }))

        let polyPoints = toPolyPoints(newPoints)

        return events.areaPtUpdate && events.areaPtUpdate.call(_, areaData === 0 ? null : areaData, polyPoints, offset.scale)
    }

    function endAreaDraw() {
        areaLayer.select('g.area-draw').remove()

        let polyPoints = toPointsSave(drawPoints, true, offset.scale)

        addPoly(drawPoints)
        drawPoints.splice(0)
        state.drawing = false

        return events.addArea && events.addArea.call(_, polyPoints, offset.scale)
    }
    /* end area mapping functions */

    /* sensor functions */
    function sensorClick(s) { return events.sensorClick && events.sensorClick.call(_, s) }

    function sensorDrag(s) {
        if (config.edit && !state.areaMapping) {
            s.dragged = true
            d3.select(this)
                .attr('cx', s.pos_x = d3.event.x)
                .attr('cy', s.pos_y = d3.event.y);
        }
    }

    function sensorDragEnd(s) {
        if (config.edit && !state.areaMapping && s.dragged) {
            s.dragged = false
            s.pos_x -= offset.x
            s.pos_y -= offset.y
            s.scale = offset.scale
            return events.sensorMoved && events.sensorMoved.call(_, s)
        }
    }
    /* end sensor functions */

    /**
     * Renders the floor plan image
     */
    this.drawFloorPlan = function () {
        imgLayer.selectAll('image').remove()
        
        if (mapLayer.__transform) imgLayer.attr('transform', mapLayer.__transform)

        if (floor.floor_plan) {

            let canClick = config.edit && (state.sensorPlotting || state.areaMapping)

            imgLayer.insert('image', ':first-child')
                    .attr('xlink:href', floor.floor_plan_url)
                    .attr('height', y(0 + yDMax) - y(0))
                    .attr('width', x(0 + xDMax) - x(0))
                    .style('cursor', () => { return canClick ? 'crosshair' : 'default' })
                    .on('click', () => canClick && (floorClick(), d3.event.stopPropagation()))
        }
    }

    /**
     * Renders all sensor dots
     */
    this.drawSensors = function () {
        sensorLayer.selectAll('.sensor').remove() //clear

        if (mapLayer.__transform) sensorLayer.attr('transform', mapLayer.__transform)

        if (sensors.length === 0) return

        let canEdit = config.edit && !state.areaMapping

        sensorLayer.selectAll('.sensor')
            .data(sensors)
            .enter()
            .append('circle')
            .attr('class', 'sensor')
            .attr('r', '5')
            .attr('stroke', 'rgba(61, 207, 163, 0.3)').attr('stroke-width', 5)
            .style('fill', '#3DCFA3')
            .style('cursor', function () { return canEdit ? 'move' : 'default' })
            .attr('cx', s => {
                let scale = parseFloat(offset.scale.toFixed(12))

                return ((s.pos_x / s.scale) * scale) + offset.x
            })
            .attr('cy', s => {
                let scale = parseFloat(offset.scale.toFixed(12))

                return ((s.pos_y / s.scale) * scale) + offset.y
            })
            .on('click', s => canEdit && (sensorClick(s), d3.event.stopPropagation()))
            .call(d3.drag()
                .on('drag', sensorDrag)
                .on('end', sensorDragEnd))
    }

    /**
     * Renders all area polygons
     */
    this.drawAreas = function () {
        areaLayer.selectAll('g.area').remove() //clear

        if (mapLayer.__transform) areaLayer.attr('transform', mapLayer.__transform)

        if (areas.length === 0) return

        areas.forEach(a => addPoly(a.poly_points, a))
    }

    /**
     * Sets the floor data of the mapper
     * @param {Object} data Floor data
     */
    this.setData = function (data) {
        floor = data
        sensors = floor.sensors
        areas = floor.areas
        mapLayer.__transform = null

        this.redraw(true)
    }

    /**
     * Re-draws the floor map (floor plan, sensors, areas)
     * @param {Boolean} fresh Determines if zoom will be reset
     */
    this.redraw = function (fresh) {
        // remove zoom
        if (fresh) {
            mapLayer.__transform = null
            mapLayer.call(zoom.transform, d3.zoomIdentity)
        }

        this.drawFloorPlan()
        calcOffsets(() => {
            this.drawSensors()
            this.drawAreas()
        })
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
        if (enable) state.sensorPlotting = false
        state.areaMapping = enable
        this.redraw(false)
    }

    /**
     * Clears the unsaved area drawn
     */
    this.clearDrawing = function() {
        drawPoints.splice(0)
        areaLayer.select('g.area.unsaved').remove()
    }

    /**
     * Sets the sensor mapping state (enabled/disabled)
     * @param {Boolean} enable Determines if sensor mapping is enabled
     */
    this.setSensorMapping = function (enable) {
        if (enable) state.areaMapping = false
        state.sensorPlotting = enable
        this.redraw(false)
    }

    // render floor plan
    if (floor) {
        this.drawFloorPlan()

        calcOffsets(() => {
            this.drawSensors()
            this.drawAreas()
        })
    }

    return this
}

export default mapper