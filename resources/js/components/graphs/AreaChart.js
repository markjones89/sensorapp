import * as d3 from 'd3'

function areaChart(wrapper, data, callbacks) {
    const container = d3.select(wrapper)
    let margin = { top: 10, right: 30, bottom: 30, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom

    let svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    let ticks = data.length

    data.push({ label: '', xValue: (d3.max(data, d => d.xValue) ?? 0) + 1, yValue: data[data.length - 1]?.yValue ?? 0 })

    console.log('create.data', data)

    // copy a mirror of the data with negative values
    let negativeMirror = getMirror(data)

    // x-axis
    let x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.xValue))
        .range([0, width])

    let maxY = d3.max(data, d => d.yValue),
        minY = -maxY

    // y-axis
    let y = d3.scaleLinear()
        .domain([minY, maxY])
        .range([height, 0])

    // set the gradient
    let gradient = svg.append("linearGradient")
        .attr("id", "area-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", width).attr("y2", y(0))
        .selectAll("stop")
        .data([
            { offset: "0%", color: "#524FFF" },
            { offset: "100%", color: "#FF5A09" }
        ])
        .enter().append("stop")
        .attr("offset", function (d) { return d.offset; })
        .attr("stop-color", function (d) { return d.color; });

    // append x-axis grid lines
    let grid = svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .style('opacity', 0.1)

    // Add y-axis
    /* svg.append("g")
        .call(d3.axisLeft(y)) */

    // Add area
    let area = svg.append("path")
        .datum(data)
        .attr('fill', 'url(#area-gradient)')
        // initial state
        .attr("d", d3.area()
            .x(d => x(d.xValue))
            .y0(height / 2)
            .y1(height / 2)
        )

    // Add negative area mirror
    let negativeArea = svg.append("path")
        .datum(negativeMirror)
        .attr('fill', 'url(#area-gradient)')
        // initial state
        .attr("d", d3.area()
            .x(d => x(d.xValue))
            .y0(height / 2)
            .y1(height / 2)
        )

    // Append x-axis labels
    let gLabels = svg.append("g").attr('class', 'labels')
        .attr("transform", "translate(0,0)")

    function getMirror(data) {
        let _mirror = []

        data.forEach(d => {
            _mirror.push({ label: d.label, xValue: d.xValue, yValue: -d.yValue })
        })

        return _mirror
    }

    this.update = function(data, fresh) {
        if (fresh) data.push({ label: '', xValue: (d3.max(data, d => d.xValue) ?? 0) + 1, yValue: data[data.length - 1]?.yValue ?? 0 })

        console.log('update.data', data)

        let _ticks = data.length,
            _maxY = d3.max(data, d => d.yValue), _minY = -_maxY,
            _mirror = getMirror(data)

        let xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.xValue))
            .range([0, width])
        let yScale = d3.scaleLinear()
            .domain([_minY, _maxY])
            .range([height, 0])

        gradient.attr("x1", 0).attr("y1", yScale(0))
            .attr("x2", width).attr("y2", yScale(0))

        grid.selectAll('.tick').remove()
        grid.call(d3.axisBottom(xScale).ticks(_ticks)
                .tickSize(-height)
                .tickFormat("")
            ).call(g => {
                g.select(".domain").remove()
                g.selectAll('.tick text').remove()
            })

        area.datum(data)
            .transition().duration(750)
            .attr("d", d3.area()
                .x(d => xScale(d.xValue))
                .y0(yScale(0))
                .y1(d => yScale(d.yValue))
            )

        negativeArea.datum(_mirror)
            .transition().duration(750)
            .attr("d", d3.area()
                .x(d => xScale(d.xValue))
                .y0(yScale(0))
                .y1(d => yScale(d.yValue))
            )

        gLabels.selectAll('.tick').remove()
        gLabels.call(d3.axisBottom(xScale).ticks(_ticks)
            .tickSize(0)
            .tickFormat(function (x, i) {
                if (i === _ticks) return ''

                let d = data.find(d => d.xValue === x)

                return d ? d.yValue : ''
            })).call(g => {
                g.select(".domain").remove()
                g.select('.tick:last-child').remove()

                let ticks = g.selectAll('.tick')
                ticks.each(function (d, i) {
                    let tick = d3.select(this),
                        tdata = data.find(x => x.xValue === d)

                    if (!tdata) return

                    // Adjust text position/size
                    tick.select('text').attr('font-size', 16).attr('text-anchor', 'start').attr('x', 10)
                        .attr('class', 'value')
                    // Append label text
                    tick.append('text').attr('font-size', 10).attr('text-anchor', 'start').attr('x', 10)
                        .attr('y', 24).attr('dy', '0.71em').attr('fill', 'currentColor')
                        .attr('class', 'label').text(tdata.label)
                })
            })
    }

    this.update(data)

    return this
}

export default areaChart