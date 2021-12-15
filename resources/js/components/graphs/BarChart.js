import * as d3 from 'd3'

export default function barChart(wrapper, data, options) {
    const container = d3.select(wrapper)
    let margin = { top: 30, right: 30, bottom: 100, left: 50 },
        width = 950 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom

    let svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    let keys = d3.keys(data[0]),
        subgroups = keys.slice(1),
        xKey = keys.slice(0, 1)[0]
    let groups = d3.map(data, d => (d[xKey])).keys()
    
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        // .range(['rgb(149,49,0)','rgb(25,116,88)'])
        .range(['#ed762c', '#46D2A3'])

    var lightColor = d3.scaleOrdinal()
        .domain(subgroups)
        // .range(['rgb(255,90,0)', 'rgb(61,207,163)'])
        .range(['#ed762c', '#46D2A3'])

    // x-axis
    let x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])

    let xAxis = svg.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0," + height + ")")

    // Another scale for subgroup position?
    var xSubgroups = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    let maxY = data => d3.max(data, d => {
        let max = 0

        subgroups.forEach(sg => max = Math.max(max, d[sg]))
        
        // return max
        return Math.ceil(max / 10) * 10
    })

    // y-axis
    let y = d3.scaleLinear()
        .domain([0, maxY(data)])
        .range([height, 0])

    let grid = svg.append("g")
        .attr("class", "grid")

    // svg.append("g")
    //     .attr("class", "y-axis")
    //     .call(d3.axisLeft(y));

    let legends = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(0,0)')

    let nodeWidth = (d) => d.getBBox().width,
        nodeHeight = (d) => d.getBBox().height

    // create chart legends
    function createLegend(keys) {
        const l_width = 15, l_height = 5

        legends.selectAll('g').remove()

        let lg = legends.selectAll('g')
            .data(keys).enter()
            .append('g')
            .attr('transform', (d,i) => `translate(${i * 100},${height + 20})`)
            .each(function(l){
                let legend = d3.select(this)
                
                legend.append("rect")
                    .attr("width", l_width)
                    .attr("height", l_height)
                    .style("fill", d => lightColor(d))
                    
                legend.append("text")
                    .attr('x', 24)
                    .attr('y', 10)
                    // .style("fill", '#fff')
                    .style('fill', 'currentColor')
                    .text(d => d)
            })

        let offset = 0

        lg.attr('transform', function (d, i) {
            let x = offset

            offset += nodeWidth(this) + 30
            return `translate(${x},${height + 10})`
        }).call(g => {
            g.selectAll('rect').attr('y', function() {
                let gHeight = nodeHeight(g.node()),
                    rHeight = nodeHeight(this)

                return (gHeight / 3) - (rHeight / 2)
            })
        })

        legends.attr('transform', function () {
            return `translate(${(width - nodeWidth(this)) / 2},${nodeHeight(xAxis.node()) + 25})`
        })
    }

    this.update = function (data) {
        keys = d3.keys(data[0])
        subgroups = keys.slice(1)
        xKey = keys.slice(0, 1)[0]
        groups = d3.map(data, d => (d[xKey])).keys()

        x.domain(groups)
        xSubgroups.domain(subgroups)
            .range([0, x.bandwidth()])
        y.domain([0, maxY(data)])

        grid.call(d3.axisLeft(y)
            .tickSize(-width))
            .call(g => {
                g.select(".domain").remove()
                g.selectAll('.tick line').style('opacity', 0.1)
                g.selectAll('.tick text').style('transform', 'translateX(-5px)')
            })

        xAxis.call(d3.axisBottom(x)
            .tickSizeOuter(0).tickSizeInner(8)
            .tickPadding(6))
        .call(g => {
            g.selectAll('.tick line').style('transform', 'translateY(8px)')
            g.selectAll('.tick text')
                .style('text-anchor', 'end')
                .style('transform', 'translateY(8px) rotate(-45deg)')
        })

        svg.select('.bar-data').remove()

        // Show the bars
        svg.append("g").attr('class', 'bar-data')
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr('class', 'bar-group')
            .attr("transform", d => `translate(${x(d[xKey])},0)`)
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter().append("rect").attr('class', 'bar')
            .attr("x", d => xSubgroups(d.key))
            .attr("y", d => y(0))
            .attr("width", xSubgroups.bandwidth())
            .attr("height", d => height - y(0))
            .attr('rx', xSubgroups.bandwidth() / 2)
            .attr('ry', xSubgroups.bandwidth() / 2)
            .attr("fill", d => color(d.key))
            .on('mouseover', function (d, i) {
                let pdata = d3.select(this.parentNode).datum()
                d3.select(this).attr('fill', lightColor(d.key))
                d3.select(`.bar-label text[data-label-for="${d.key}:${pdata[xKey]}"]`).style('opacity', 1)
            })
            .on('mouseout', function (d, i) {
                let parentData = d3.select(this.parentNode).datum()
                d3.select(this).attr('fill', color(d.key))
                d3.select(`.bar-label text[data-label-for="${d.key}:${parentData[xKey]}"]`).style('opacity', 0)
            })
            .transition().duration(1000)
            .attr("height", d => height - y(d.value))
            .attr("y", d => y(d.value))
        
        // add labels
        svg.append("g").attr('class', 'bar-labels')
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr('class', 'bar-label')
            .attr("transform", d => `translate(${x(d[xKey])},0)`)
            .selectAll('text')
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter().append('text').attr("class","label")
            .attr("x", function(d) { return xSubgroups(d.key) })
            .attr("y", function(d) { return y(d.value) - 20; })
            .attr("dy", ".75em")
            .attr('data-label-for', function(d) {
                let pdata = d3.select(this.parentNode).datum()
                return `${d.key}:${pdata[xKey]}`
            })
            // .style('fill', '#fff')
            .style('font-size', '11px')
            .style('opacity', 0)
            .text(d => `${d.value}%`)
            .style('transform', function(d) {
                return `translateX(${((xSubgroups.bandwidth() / 2) - (nodeWidth(this) / 2))}px)`
            })


        createLegend(subgroups)
    }

    this.update(data)

    return this
}