import * as d3 from 'd3'

export function collapsibleTree(wrapper, data) {
    const container = d3.select(wrapper);
    const root = d3.hierarchy(data),
        moneyFormat = d3.format('$,.2s'),
        width = 900,
        // wrapperRect = container.node().getBoundingClientRect(),
        // width = wrapperRect.width,
        dx = 16,
        dy = width / 6,
        margin = { top: 10, right: 80, bottom: 10, left: 80 };

    const tree = (d3.tree().nodeSize([dx, dy]));
    // const line = (d3.line().x(d => d.y).y(d => d.x));
    const diagonal = (d3.linkHorizontal().x(d => d.y).y(d => d.x));

    const svg = container.append("svg")
        .attr("viewBox", [-margin.left, -margin.top, width, dx])
        // .attr("width", width)
        // .attr('height', 300)
        .style("font-size", "12px")
        .style("user-select", "none");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#3DCFA3")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    function update(source) {
        const duration = d3.event && d3.event.altKey ? 2500 : 250;
        const nodes = root.descendants().reverse();
        const links = root.links();

        // Compute the new tree layout.
        tree(root);

        let left = root;
        let right = root;
        root.eachBefore(node => {
            if (node.x < left.x) left = node;
            if (node.x > right.x) right = node;
        });

        const height = right.x - left.x + margin.top + margin.bottom;

        const transition = svg.transition()
            .duration(duration)
            .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
            .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

        // Update the nodes…
        const node = gNode.selectAll("g")
            .data(nodes, d => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node.enter().append("g")
            .attr('data-id', d => d.id)
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .on("click", d => {
                d.children = d.children ? null : d._children;
                update(d);
            });

        nodeEnter.append("circle")
            .attr("r", 2.5)
            .attr("fill", d => d._children ? "#3DCFA3" : "#3DCFA3")
            .attr("stroke-width", 10);

        nodeEnter.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d._children ? -6 : 6)
            .attr("text-anchor", d => d._children ? "end" : "start")
            .attr('fill', '#fff')
            // .text(d => d.data.name)
            .text(d => `${d.data.name} ${d.data.number ? ` - ${d.data.value}` : moneyFormat(d.data.value || 0)}`)
            .clone(true).lower()
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .attr("stroke", "#2B2B2B");

        // Transition nodes to their new position.
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition(transition).remove()
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path")
            .data(links, d => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append("path")
            .attr("d", d => {
                const o = { x: source.x0, y: source.y0 };
                // return line([o, o])
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition)
            .attr('d', d => {
                let hasChildren = d.target._children && d.target._children.length > 0;
                let lg = gNode.select(`[data-id="${d.target.id}"]`);
                let _offset = lg.node().getBBox();
                const t = { x: d.target.x, y: d.target.y - _offset.width };

                // return hasChildren ? line([d.source, t]) : line([d.source, d.target]) 
                return hasChildren ? diagonal({source: d.source, target: t}) : diagonal({source: d.source, target: d.target})
            })

        // Transition exiting nodes to the parent's new position.
        link.exit().transition(transition).remove()
            .attr("d", d => {
                const o = { x: source.x, y: source.y };
                // return line([o, o])
                return diagonal({source: o, target: o});
            });

        // Stash the old positions for transition.
        root.eachBefore(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    update(root);

    return svg.node();
}