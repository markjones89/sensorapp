import * as d3 from 'd3'

export default function hierarchyBarChart(wrapper, data, callbacks) {
    const container = d3.select(wrapper)

    let root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
        .eachAfter(d => d.index = d.parent ? d.parent.index = d.parent.index + 1 || 0 : 0),

        color = d3.scaleOrdinal([true, false], ["#FF5A09", "#953100"]),
        barStep = 30,
        barPadding = 3 / barStep,
        duration = 750,
        // width = container.node().getBoundingClientRect().width - 128,
        width = 900,
        margin = { top: 30, right: 30, bottom: 0, left: 100 },
        minHeight = calcHeight(root),
        height = calcHeight(root),
        x = d3.scaleLinear().range([margin.left, width - margin.right]),

        xAxis = g => g
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${margin.top})`)
            .call(d3.axisTop(x).ticks(width / 80, "s"))
            .call(g => (g.selection ? g.selection() : g).select(".domain").remove()),

        yAxis = g => g
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left + 0.5},0)`)
            .call(g => g.append("line")
                .attr("stroke", "currentColor")
                .attr("y1", margin.top)
                .attr("y2", height - margin.bottom))
    
    function calcHeight(data) {
        /* let max = 1;
        root.each(d => d.children && (max = Math.max(max, d.children.length))); */
        return data.children.length * barStep + margin.top + margin.bottom;
    }

    // Creates a set of bars for the given data node, at the specified index.
    function bar(svg, down, d, selector) {
        const g = svg.insert("g", selector)
            .attr("class", "enter")
            .attr("transform", `translate(0,${margin.top + barStep * barPadding})`)
            .attr("text-anchor", "end")
            .style("font", "10px sans-serif");

        const bar = g.selectAll("g")
            .data(d.children)
            .join("g")
            .attr("cursor", d => !d.children ? null : "pointer")
            .on("click", d => down(svg, d));

        bar.append("text")
            .attr("x", margin.left - 6)
            .attr("y", barStep * (1 - barPadding) / 2)
            .attr("dy", ".35em")
            .attr('fill', 'currentColor')
            .text(d => d.data.name);

        bar.append("rect")
            .attr("x", x(0))
            .attr("width", d => x(d.value) - x(0))
            .attr("height", barStep * (1 - barPadding));

        return g;
    }

    function stack(i) {
        let value = 0;
        return d => {
            const t = `translate(${x(value) - x(0)},${barStep * i})`;
            value += d.value;
            return t;
        };
    }

    function stagger() {
        let value = 0;
        return (d, i) => {
            const t = `translate(${x(value) - x(0)},${barStep * i})`;
            value += d.value;
            return t;
        };
    }

    function down(svg, d) {
        if (!d.children || d3.active(svg.node())) return;

        // Rebind the current node to the background.
        svg.select(".background").datum(d);

        // Set chart height
        setHeight(d)

        // Define two sequenced transitions.
        const transition1 = svg.transition().duration(duration);
        const transition2 = transition1.transition();

        // Mark any currently-displayed bars as exiting.
        const exit = svg.selectAll(".enter")
            .attr("class", "exit");

        // Entering nodes immediately obscure the clicked-on bar, so hide it.
        exit.selectAll("rect")
            .attr("fill-opacity", p => p === d ? 0 : null);

        // Transition exiting bars to fade out.
        exit.transition(transition1)
            .attr("fill-opacity", 0)
            .remove();

        // Enter the new bars for the clicked-on data.
        // Per above, entering bars are immediately visible.
        const enter = bar(svg, down, d, ".y-axis")
            .attr("fill-opacity", 0);

        // Have the text fade-in, even though the bars are visible.
        enter.transition(transition1)
            .attr("fill-opacity", 1);

        // Transition entering bars to their new y-position.
        enter.selectAll("g")
            .attr("transform", stack(d.index))
            .transition(transition1)
            .attr("transform", stagger());

        // Update the x-scale domain.
        x.domain([0, d3.max(d.children, d => d.value)]);

        // Update the x-axis.
        svg.selectAll(".x-axis").transition(transition2)
            .call(xAxis);

        // Transition entering bars to the new x-scale.
        enter.selectAll("g").transition(transition2)
            .attr("transform", (d, i) => `translate(0,${barStep * i})`);

        // Color the bars as parents; they will fade to children if appropriate.
        enter.selectAll("rect")
            .attr("fill", color(true))
            .attr("fill-opacity", 1)
            .transition(transition2)
            .attr("fill", d => color(!!d.children))
            .attr("width", d => x(d.value) - x(0));
    }

    function up(svg, d) {
        if (!d.parent || !svg.selectAll(".exit").empty()) {
            if (callbacks && callbacks.goBack) callbacks.goBack.call(this)
            return
        }

        // Rebind the current node to the background.
        svg.select(".background").datum(d.parent);

        // Set chart height
        setHeight(d.parent)

        // Define two sequenced transitions.
        const transition1 = svg.transition().duration(duration);
        const transition2 = transition1.transition();

        // Mark any currently-displayed bars as exiting.
        const exit = svg.selectAll(".enter")
            .attr("class", "exit");

        // Update the x-scale domain.
        x.domain([0, d3.max(d.parent.children, d => d.value)]);

        // Update the x-axis.
        svg.selectAll(".x-axis").transition(transition1)
            .call(xAxis);

        // Transition exiting bars to the new x-scale.
        exit.selectAll("g").transition(transition1)
            .attr("transform", stagger());

        // Transition exiting bars to the parent’s position.
        exit.selectAll("g").transition(transition2)
            .attr("transform", stack(d.index));

        // Transition exiting rects to the new scale and fade to parent color.
        exit.selectAll("rect").transition(transition1)
            .attr("width", d => x(d.value) - x(0))
            .attr("fill", color(true));

        // Transition exiting text to fade out.
        // Remove exiting nodes.
        exit.transition(transition2)
            .attr("fill-opacity", 0)
            .remove();

        // Enter the new bars for the clicked-on data's parent.
        const enter = bar(svg, down, d.parent, ".exit")
            .attr("fill-opacity", 0);

        enter.selectAll("g")
            .attr("transform", (d, i) => `translate(0,${barStep * i})`);

        // Transition entering bars to fade in over the full duration.
        enter.transition(transition2)
            .attr("fill-opacity", 1);

        // Color the bars as appropriate.
        // Exiting nodes will obscure the parent bar, so hide it.
        // Transition entering rects to the new x-scale.
        // When the entering parent rect is done, make it visible!
        enter.selectAll("rect")
            .attr("fill", d => color(!!d.children))
            .attr("fill-opacity", p => p === d ? 0 : null)
            .transition(transition2)
            .attr("width", d => x(d.value) - x(0))
            .on("end", function (p) { d3.select(this).attr("fill-opacity", 1); });
    }

    const svg = container.append('svg')
        .attr('class', 'hierarchy-chart')
        .attr("width", width)
        .attr("height", height);

    x.domain([0, root.value]);

    const rectUp = svg.append("rect")
        .attr("class", "background")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .attr("cursor", "pointer")
        .on("click", d => up(svg, d));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function setHeight(data) {
        height = calcHeight(data)

        if (height < minHeight) height = minHeight

        svg.attr('height', height)
        svg.select('.y-axis line').transition().duration(duration)
            .attr('y2', height - margin.bottom)
        rectUp.transition().duration(duration)
            .attr('height', height)
    }

    down(svg, root);

    return svg.node();
}