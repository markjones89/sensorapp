import * as d3 from 'd3'

function circlePacker(wrapper, data) {
    const container = d3.select(wrapper)
    // const width = 500, height = width
    const width = container.node().getBoundingClientRect().width - 128, height = width
    const pack = data => d3.pack()
        .size([width, height])
        .padding(3)
        (d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value));
    const root = pack(data);
    let focus = root;
    let view;
    let color = d3.scaleLinear()
        /* .domain([0,1,2])
        .range(["#393939", "#A5B5C5", "#EC7F37"]) */
        .domain([0, 5])
        .range(["rgb(57,57,57)", "rgb(150,150,150)"])
        .interpolate(d3.interpolateRgb)

    const svg = container
        .append("svg").attr('class', 'circle-packs')
        .attr("width", width).attr("height", height)
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .style("display", "block")
        .style("background", color(0))
        // .style("cursor", "pointer")
        .on("click", () => zoom(true, root));

    const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "#EC7F37")
        // .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function () { d3.select(this).attr("stroke", null); })
        .on("click", d => !focused(d) && (zoom(false, d), d3.event.stopPropagation()));

    const label = svg.append("g")
        .style("font", "14px Source Sans Pro, sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        // .attr('x', d => d.x - root.x)
        // .attr('y', d => (d.y - root.y) - (d.r/1.4))
        .style("fill-opacity", d => isRoot(d.parent) ? 1 : 0)
        .style("display", d => isRoot(d.parent) ? "inline" : "none")
        .text(d => d.data.name);

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
        const k = width / v[2];

        view = v;

        // label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
        label.attr('x', d => (d.x - v[0]) * k)
            .attr('y', d => ((d.y - v[1]) - (d.r/1.4)) * k);
    }

    function zoom(root, d) {
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(1000)
            .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * (root ? 2 : 2.4)]);
                return t => zoomTo(i(t));
            });

        label
            .filter(function (d) { return (focused(d.parent) || focused(d) || this.style.display === "inline") && !isRoot(d); })
            .transition(transition)
                .style("fill-opacity", d => focused(d.parent) || focused(d) ? 1 : 0)
                .on("start", function(d) { if (focused(d.parent) || focused(d)) this.style.display = "inline"; })
                .on("end", function(d) { if (!focused(d.parent) && !focused(d)) this.style.display = "none"; });
    }

    function focused(d) { return d === focus }

    function isRoot(d) { return d === root }

    return svg.node();
}

export default circlePacker