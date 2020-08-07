import * as d3 from 'd3'
import { drag } from 'd3'

/**
 * Creates a floor plan sensor mapper
 * @param {String} wrapper Mapper wrapper ID
 * @param {Object} data Floor plan data
 * @param {Object} callbacks Mapper event callbacks
 */
function mapper(wrapper, data, callbacks) {
    const container = d3.select(wrapper)
    const width = 720, //width = container.node().getBoundingClientRect().width - 32, 
        height = 487
    let floor = data,
        sensors = floor.sensors || [],
        config = { edit: false },
        events = callbacks//{ sensorClick: null }

    let x = d3.scaleLinear().domain([0, 50.0]).range([0, width]), 
        y = d3.scaleLinear().domain([0, 33.79]).range([0, height]),
        _ = this

    container.selectAll('svg').remove() //clean up

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('background', '#ffffff')

    const g = svg.selectAll('.map-layer').data([0])
        .enter()
        .append('g').attr('class', 'map-layer')
        
    const zoom = d3.zoom().scaleExtent([1, 8])
        .on('zoom', () => {
            g.__transform = d3.event.transform

            let minXTranslate = (1 - g.__transform.k) * (x.range()[1] - x.range()[0]),
                minYTranslate = (1 - g.__transform.k) * (y.range()[1] - y.range()[0])

            g.__transform.x = Math.min(x.range()[0], Math.max(g.__transform.x, minXTranslate))
            g.__transform.y = Math.min(y.range()[0], Math.max(g.__transform.y, minYTranslate))

            // g.attr('transform', `${g.__transform}`)
            g.selectAll('image').attr('transform', g.__transform)
            g.selectAll('.sensor-layer').attr('transform', g.__transform)
        })
    
    g.call(zoom)

    this.drawFloorPlan = function () {
        g.selectAll('image').remove()

        if (floor.floor_plan) {
            let imgs = g.selectAll('image').data([0]),
                _height = 33.79, _width = 50.0

            imgs.enter().append('svg:image')
                .attr('xlink:href', floor.floor_plan_url)
                .attr('height', y(0 + _height) - y(0))
                .attr('width', x(0 + _width) - x(0))
                .style('cursor', function() { return config.edit ? 'crosshair' : 'default' })
                .on('click', () => config.edit && (floorClick(), d3.event.stopPropagation()))

            if (g.__transform) g.selectAll('image').attr('transform', g.__transform)
        }
    }

    function floorClick() {
        let t = g.__transform, evt = d3.event,
            _x = t ? (evt.offsetX - t.x) / t.k : evt.offsetX,
            _y = t ? (evt.offsetY - t.y) / t.k : evt.offsetY
        
        return events.addTrigger && events.addTrigger.call(_, { x: _x, y: _y })
    }

    this.drawSensors = function () {
        g.selectAll('.sensor-layer').remove() //clear

        if (sensors.length === 0) return

        let dragged = false
        let sg = g.selectAll('.sensor-layer').data([0]).enter()
            .append('g').attr('class', 'sensor-layer')

        if (g.__transform) sg.attr('transform', g.__transform)

        sg.selectAll('.sensor')
            .data(sensors)
            .enter()
            .append('circle')
            .attr('class', 'sensor')
            .attr('r', '5')
            .attr('stroke', 'rgba(61, 207, 163, 0.3)').attr('stroke-width', 5)
            .style('fill', '#3DCFA3')
            .style('cursor', function() { return config.edit ? 'move' : 'default' })
            .attr('cx', function(s) { return s.pos_x })
            .attr('cy', function(s) { return s.pos_y })
            .on('click', s => config.edit && (sensorClick(s), d3.event.stopPropagation()))
            .call(d3.drag()
                .on('drag', function(s) {
                    if (config.edit) {
                        dragged = true
                        d3.select(this)
                            .attr('cx', s.pos_x = d3.event.x)
                            .attr('cy', s.pos_y = d3.event.y);
                    }
                })
                .on('end', function(s) {
                    if (config.edit && dragged) {
                        dragged = false
                        return events.sensorMoved && events.sensorMoved.call(_, s)
                    }
                })
            )
    }

    function sensorClick(s) {
        return events.sensorClick && events.sensorClick.call(_, s)
    }

    this.setData = function(data) {
        floor = data
        sensors = floor.sensors

        // redraw
        g.__transform = null
        this.redraw(true)
    }

    this.redraw = function(fresh) {
        // remove zoom
        if (fresh) {
            g.__transform = null
            g.call(zoom.transform, d3.zoomIdentity)
        }

        this.drawFloorPlan()
        this.drawSensors()
    }

    this.editMode = function(edit) {
        config.edit = edit

        // redraw
        this.redraw(false)
    }

    // render floor plan
    if (floor) this.drawFloorPlan()

    // render sensors
    this.drawSensors()

    return this
}

export default mapper