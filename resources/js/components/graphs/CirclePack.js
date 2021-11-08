import * as d3 from 'd3'

export function circlePack(wrapper, packData, callbacks) {
    const _wrapper = d3.select(wrapper)

    let _packData = packData,
        diameter,
        commaFormat = d3.format(','),
        moneyFormat = d3.format('$,.2s'),
        // numFormat = d3.format(',s'),
        root,
        // allOccupations = [],
        focus,
        focus0,
        k0,
        scaleFactor,
        barsDrawn = false,
        wrapDelim = '|',
        zoomFromCircle = false
        // rotationText = [-14,4,23,-18,-10.5,-20,20,20,46,-30,-25,-20,20,15,-30,-15,-45,12,-15,-16,15,15,5,18,5,15,20,-20,-25];

    let circleColor = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(['#393846', '#32313d', '#ed762c']);

    let barColor = d3.scaleOrdinal()
        .domain([0, 1])
        .range(['#3DCFA3', '#ed762c']);

    function getStatDisplay(d, tooltip = false) {
        let isBuilding = !!d.data?.building_name
        let value = _packData.moneyValue ? moneyFormat(d.data.value_stat) : 
            _packData.percentValue ? `${Math.round(d.data.value_stat)}%` : d.data.value_stat

        return `${d.data?.name || d.name}${tooltip ? ' - ' : isBuilding ? ` ${wrapDelim} ${_packData.subtitle} - ` : ' '}${value}`
    }

    //Hide the tooltip when the mouse moves away
    function removeTooltip() {
        d3.select('body .cp-tooltip').remove()
        d3.select('body .cp-tooltip.zoom').remove()
    }

    function showZoomTooltip(d) {
        let evt = d3.event, 
            isRoot = d == root,
            isFocused = d == focus,
            isBuilding = typeof d.data.building_id !== 'undefined' && d.data.building_id

        d3.select('body .cp-tooltip.zoom').remove()

        // if (isFocused && !isBuilding) return
        if (isFocused || (!isRoot && !isBuilding)) return

        d3.select('body').append('div').attr('class', 'cp-tooltip zoom')
            // .text(isFocused && isBuilding ? 'Click to view time chart' : isRoot ? 'Click to zoom out' : 'Click to zoom in')
            .text(isRoot ? 'Click to zoom out' : 'Click to zoom in')
            .style('left', () => `${evt.pageX}px`)
            .style('top', () => `${evt.pageY + 25}px`)
    }

    //Show the tooltip on the hovered over slice
    function showTooltip(d) {
        if (d == root) return
        let target = d3.event.target,
            rect = target.getBoundingClientRect(),
            offset = { 
                top: rect.top + window.scrollY, 
                left: rect.left + window.scrollX, 
            },
            focusChildren = focus.children ? focus.children.map(c => c.data.name) : [],
            parentChildren = focus.parent && focus.parent.children ? focus.parent.children.map(c => c.data.name) : [],
            shouldTooltip = d !== focus && d !== focus.parent 
                && focusChildren.indexOf(d.data.name) < 0 && parentChildren.indexOf(d.data.name) < 0

        if (!shouldTooltip) return

        d3.select('body').append('div').attr('class', 'cp-tooltip')
            // .text(`${d.data.name} - ${_packData.moneyValue ? moneyFormat(d.value) : _packData.percentValue ? `${d.value}%` : d.value}`)
            .text(getStatDisplay(d, true))
            .style('left', function() {
                let _w = this.getBoundingClientRect().width
                return `${offset.left - ((_w - rect.width) / 2)}px`
            })
            .style('top', function() {
                let _h = this.getBoundingClientRect().height
                return `${offset.top - _h - 6}px`
            })
    }

    function drawAll(nodes, stats) {
        ////////////////// Create Set-up variables  //////////////////

        let wrapperWidth = Math.max(_wrapper.node().clientWidth, 350),
            width = wrapperWidth / 1.5,
            height = width //(window.innerWidth < 768 ? width : window.innerHeight - 90);

        let mobileSize = (window.innerWidth < 768 ? true : false);

        /////////////////////// Create SVG  ///////////////////////

        _wrapper//.style('display', 'inline-block')
            .select('svg').remove()

        let svg = _wrapper.append("svg").attr('class', 'circle-packs')
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        diameter = Math.min(width * 0.9, height * 0.9);

        const pack = data => d3.pack()
            .size([diameter, diameter])
            .padding(8)
            (d3.hierarchy(data)
                .sum(d => {
                    // calculate stat display
                    let children = d.children?.map(x => x.value_stat)
                    if (children) d.value_stat = _packData.percentValue ? d3.mean(children) : d3.sum(children)

                    return d.value
                })
                .sort((a, b) => b.value - a.value));

        //////// Function | Draw the bars inside the circles /////////

        function drawBars() {
            let elementsPerBar = 7,
                // barChartHeight = 0.7,
                barChartHeight = 0.6,
                // barChartHeightOffset = 0.13;
                barChartHeightOffset = 0.10;

            //Inside each wrapper create the complete bar chart
            d3.selectAll(".barWrapperOuter")
                .each(function (d, i) {
                    let _data = data.find(x => x.key === d.data.ID)

                    if (_data) {
                        barsDrawn = true

                        //Save current circle data in separate variable	
                        let current = d

                        //Create a scale for the width of the bars for the current circle
                        let barScale = d3.scaleLinear()
                            // .range([0, (current.r]); //don't make the max bar bigger than 0.7 times the radius minus the distance in between
                            .domain([0, 100])
                            .range([0, (current.r * 0.7)]);

                        //Title inside circle
                        d3.select(this).append("text")
                            .attr("class", "innerCircleTitle")
                            .attr("y", function (d, i) {
                                d.titleHeight = (-1 + 0.25) * current.r;
                                return d.titleHeight;
                            })
                            .attr("dy", "0em")
                            .text(function (d, i) { return d.name; })
                            .style("font-size", function (d) {
                                //Calculate best font-size
                                d.fontTitleSize = current.r / 10
                                return Math.round(d.fontTitleSize) + "px";
                            })
                            .each(function (d) {
                                d.textLength = current.r * 2 * 0.7;
                                wrap(this, d.textLength);
                            });

                        // Bar chart series
                        d3.select(this).append('text').attr('class', 'innerBarSeriesText average')
                            .attr('y', d => {
                                d.seriesOffsetY = (-1 + 0.475) * current.r
                                return d.seriesOffsetY
                            })
                            .attr('x', d => {
                                // d.seriesOffsetX = -current.r * 0.15
                                d.seriesOffsetX = -current.r * 0.05
                                return d.seriesOffsetX
                            })
                            .attr("dy", "1.5em")
                            .style("font-size", function (d) {
                                d.fontSeriesSize = current.r / 18
                                return `${Math.round(d.fontSeriesSize)}px`
                            })
                            .text('Average')

                        d3.select(this).append('text').attr('class', 'innerBarSeriesText peak')
                            // .attr('x', d => -(d.seriesOffsetX / 0.15) * 0.2)
                            .attr('x', d => -(d.seriesOffsetX / 0.05) * 0.3)
                            .attr('y', d => d.seriesOffsetY)
                            .attr("dy", "1.5em")
                            .style('font-size', d => `${Math.round(d.fontSeriesSize)}px`)
                            .text('Peak')

                        //Bar chart	wrapper			
                        let barWrapperInner = d3.select(this).selectAll(".innerBarWrapper")
                            .data(_data.values)
                            .enter().append("g")
                            .attr("class", "innerBarWrapper")
                            .attr("x", function (d, i) {
                                //Some values are missing, set these to width 0)
                                let scale = ['Meeting Rooms in Use', 'Free Meeting Rooms', 'Workspaces used <20%'].indexOf(d.category) >= 0 ? 35 : 50
                                
                                d.avgWidth = isNaN(d.average) ? 0 : barScale(scale)//barScale(d.average)
                                d.peakWidth = isNaN(d.peak) ? 0 : barScale(scale)//barScale(d.peak)
                                d.totalOffset = -current.r * 0.05;

                                return d.totalOffset;
                            })
                            .attr("y", function (d, i) {
                                d.eachBarHeight = ((1 - barChartHeightOffset) * 2 * current.r * barChartHeight) / elementsPerBar;
                                d.barHeight = barChartHeightOffset * 2 * current.r + i * d.eachBarHeight - barChartHeight * current.r;
                                return d.barHeight;
                            });

                        /* Draw the bars */
                        // average bar
                        /* let avgBar = barWrapperInner.append("rect")
                            .attr("class", "innerBar average")
                            .attr("width", d => d.avgWidth)
                            .attr("height", d => {
                                d.height = d.eachBarHeight * 0.8
                                return d.height
                            })
                            .style("fill", barColor(0)) */
                        barWrapperInner.append('path')
                            .attr("class", "innerBar average")
                            .attr('d', d => {
                                d.height = d.eachBarHeight * 0.8

                                // return `M0,0 h${d.avgWidth} q5,0 5,5 v${d.height} q0,5 -5,5 h-${d.avgWidth} q-5,0 -5,-5 v-${d.height} q0,-5 5,-5 z`
                                // return `M0,0 h${d.avgWidth} v${d.height} h-${d.avgWidth} q-5,0 -5,-5 v-${d.height/2} q0,-5 5,-5 z`
                            })
                            .style('fill', barColor(0))

                        // peak bar
                        /* let peakBar = barWrapperInner.append("rect")
                            .attr("class", "innerBar peak")
                            .attr("width", d => d.peakWidth)
                            .attr("height", d => {
                                d.height = d.eachBarHeight * 0.8
                                return d.height
                            })
                            .style('transform', d => `translateX(${d.avgWidth}px)`)
                            .style("fill", barColor(1)) */

                        barWrapperInner.append('path')
                            .attr("class", "innerBar peak")
                            // .attr('d', d => `M0,0 h${d.avgWidth} q5,0 5,5 v${d.height} q0,5 -5,5 h-${d.avgWidth} z`)
                            .style('fill', barColor(1))

                        //Draw the category text next to the bars		
                        barWrapperInner.append("text")
                            .attr("class", "innerText category")
                            .attr("dx", function (d) {
                                d.dx = -(current.r * 0.15)
                                return d.dx
                            })
                            .attr("dy", "1.35em")
                            .style("font-size", function (d) {
                                //Calculate best font-size
                                d.fontSize = current.r / 18
                                return `${Math.round(d.fontSize)}px`
                            })
                            .text(d => d.category)

                        /* Draw the value inside the bars */
                        // average value
                        barWrapperInner.append("text")
                            .attr("class", "innerValue average")
                            .attr("dy", "1.8em")
                            .style("font-size", function (d) {
                                //Calculate best font-size
                                d.fontSizeValue = current.r / 22;
                                return Math.round(d.fontSizeValue) + "px";
                            })
                            .text(function (d, i) { return commaFormat(d.average); })
                            .attr("dx", function (d) {
                                d.r = current.r;
                                d.valueLoc = (d.avgWidth / 2) - d.r

                                return d.valueLoc
                            })
                            .style("fill", "white")
                            .style('text-anchor', 'middle')

                        // peak value
                        barWrapperInner.append("text")
                            .attr("class", "innerValue peak")
                            .attr("dy", "1.8em")
                            .style("font-size", function (d) { return Math.round(d.fontSizeValue) + "px" })
                            .text(function (d, i) { return commaFormat(d.peak) })
                            .attr("dx", function (d) {
                                d.r = current.r
                                d.valueLoc = (d.avgWidth + (d.peakWidth / 2)) - d.r

                                return d.valueLoc
                            })
                            .style("fill", "white")
                            .style('text-anchor', 'middle')

                        //Draw percent text on the left side
                        barWrapperInner.append("text")
                            .attr("class", "innerText avg-percent")
                            .attr("dx", function (d) { 
                                d.dx_ap = -current.r * 0.015
                                return d.dx_ap
                            })
                            .attr("dy", "1.8em")
                            .style("font-size", function (d) {
                                d.fontSizePercent = current.r / 24
                                return Math.round(d.fontSizePercent) + "px"
                            })
                            // .style('transform', d => `translateX(-${(d.avgWidth + d.peakWidth)}px)`)
                            .text(d => `${Math.round(d.avgPercent)}%`) // average percent data

                        //Draw percent text on the right side
                        barWrapperInner.append("text")
                            .attr("class", "innerText peak-percent")
                            .attr("dx", function (d) { 
                                d.dx_pp = current.r * 0.02
                                return d.dx_pp
                            })
                            .attr("dy", "1.8em")
                            .style("font-size", function (d) {
                                d.fontSizePercent = current.r / 24
                                return Math.round(d.fontSizePercent) + "px"
                            })
                            .style('transform', d => `translateX(${(d.avgWidth + d.peakWidth)}px)`)
                            .text(d => `${Math.round(d.peakPercent)}%`) // peak percent data
                    }//if
                });//each barWrapperOuter 
        }

        ///////////////// Function | Initiates ///////////////////////

        //Create the bars inside the circles
        function runCreateBars() {
            let counter = 0
            while (!barsDrawn & counter < 10) {
                drawBars()
                counter = counter + 1
            }

            return Promise.resolve()
        }

        //Call to the zoom function to move everything into place
        function runAfterCompletion() {
            focus0 = root
            k0 = 1
            d3.select("#loadText").remove()
            // if (_packData.location) searchByName(_packData.location)
            if (_packData.location) {
                zoomFromCircle = true
                searchByID(_packData.location.value)
            }
            else zoomTo(root)
        }

        ///////////////// Data | Read in Age data ////////////////////

        //Global variables
        let data;//, dataMax, dataById = {};

        data = d3.nest()
            .key(d => d.ID)
            .entries(stats)

        /////////// Read in Location Circle data ///////////////////

        root = pack(nodes)
        focus = root;

        /////////// Create a wrappers for each location ////////////
        let plotWrapper = svg.selectAll("g")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "plotWrapper")
            .attr("id", function (d, i) {
                // if (d.data.ID != undefined) return "plotWrapper_" + d.data.ID;
                if (d.data.ID != undefined) return d.data.ID
                else return "plotWrapper_node"
            });

        if (!mobileSize) {
            //Mouseover only on leaf nodes		
            plotWrapper//.filter(function (d) { return d !== root })
                .on('mousemove', showZoomTooltip)
                .on("mouseover", showTooltip)
                .on("mouseout", removeTooltip)
        }//if

        ///////////////////// Draw the circles ///////////////////////
        let circle = plotWrapper.append("circle")
            .attr("id", "nodeCircle")
            .attr("class", function (d, i) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root" })
            .style("fill", function (d) { return d.children ? circleColor(d.depth) : null })
            .attr("r", function (d) {
                // if (d.ID === "1.1.1.1") scaleFactor = d.value / (d.r * d.r);
                if (d.data.building_name) scaleFactor = d.value / (d.r * d.r)
                return d.r
            })
            .on("click", function (d) {
                if (root === d && focus == d) return
                if (focus !== d) {
                    zoomFromCircle = true
                    zoomTo(d)
                }
                else if (focus === d && !d.children) callbacks && callbacks.moreInfo.call(this, d)
                else {
                    zoomFromCircle = true
                    zoomTo(root)
                }
            })

        //////// Draw the titles of parent circles on the Arcs ///////

        //Create the data for the parent circles only
        let overlapNode = [];
        circle.filter(function (d, i) { return d3.select(this).attr("class") === "node"; })
            .each(function (d, i) {
                overlapNode[i] = {
                    ID: d.data.ID,
                    name: d.data.name,
                    value: d.value,
                    depth: d.depth,
                    data: d.data,
                    r: d.r,
                    x: d.x,
                    y: d.y
                }
            });

        //Create a wrapper for the arcs and text
        let hiddenArcWrapper = svg.append("g")
            .attr("class", "hiddenArcWrapper")
            .style("opacity", 0)
            .style('pointer-events', 'none');

        //Create the arcs on which the text can be plotted - will be hidden
        let hiddenArcs = hiddenArcWrapper.selectAll(".circleArcHidden")
            .data(overlapNode)
            .enter().append("path")
            .attr("class", "circleArcHidden")
            .attr("id", function (d, i) { return "circleArc_" + i; })
            .attr("d", function (d, i) { return "M " + -d.r + " 0 A " + d.r + " " + d.r + " 0 0 1 " + d.r + " 0"; })
            .style("fill", "none");

        //Append the text to the arcs
        let arcText = hiddenArcWrapper.selectAll(".circleText")
            .data(overlapNode)
            .enter().append("text")
            .attr("class", "circleText")
            .style("font-size", function (d) {
                //Calculate best font-size
                d.fontSize = d.r / 10;
                return Math.round(d.fontSize) + "px";
            })
            .append("textPath")
            .attr("startOffset", "50%")
            .attr("xlink:href", function (d, i) { return "#circleArc_" + i; })
            // .text(function (d) { return d.name.replace(/ and /g, ' & '); });
            // .text(d => { return `${d.name} ${_packData.moneyValue ? moneyFormat(d.value) : _packData.percentValue ? `${d.value}%` : d.value}` })
            .text(d => { return getStatDisplay(d, false) })
 
        ////////////////// Draw the Bar charts ///////////////////////

        //Create a wrapper for everything inside a leaf circle
        let barWrapperOuter = plotWrapper.append("g")
            .attr("id", function (d) {
                if (d.data.ID != undefined) return d.data.ID
                else return "node"
            })
            .style("opacity", 0)
            .attr("class", "barWrapperOuter")

        // call runCreateBars and use the `done` method
        // with `runAfterCompletion` as it's parameter
        setTimeout(function () { runCreateBars().then(runAfterCompletion); }, 100);
    }//drawAll

    //////////////// Search /////////////////

    function searchByName(location) {
        if (location !== "" & typeof location !== "undefined") {
            d3.selectAll("#nodeCircle")
                .filter(d => d.data.name === location)
                .each(function (d, i) { zoomTo(d) })
        } else {
            zoomTo(root)
        }
    }

    function searchByID(location) {
        if (location !== "" & typeof location !== "undefined") {
            d3.selectAll("#nodeCircle")
                .filter(d => d.data.ID === location)
                .each(function (d, i) { zoomTo(d) })
        } else {
            zoomTo(root)
        }
    }

    //////////////////// The zoom function /////////////////////// 

    //The zoom function
    //Change the sizes of everything inside the circle and the arc texts
    function zoomTo(d) {
        focus = d;
        let v = [focus.x, focus.y, focus.r * 2],
            k = diameter / v[2];

        removeTooltip()

        //Remove the tspans of all the titles
        d3.selectAll(".innerCircleTitle").selectAll("tspan").remove();

        //Hide the bar charts, then update them
        d3.selectAll(".barWrapperOuter").transition().duration(0).style("opacity", 0);

        //Hide the node titles, update them
        d3.selectAll(".hiddenArcWrapper")
            .transition().duration(0)
            .style("opacity", 0)
            .call(endall, changeReset);

        function changeReset() {
            //Save the current ID of the clicked on circle
            //If the clicked on circle is a leaf, strip off the last ID number so it becomes its parent ID

            let currentID = d.data.ID
            
            /////////////// Change titles on the arcs ////////////////////

            //Update the arcs with the new radii	
            d3.selectAll(".hiddenArcWrapper").selectAll(".circleArcHidden")
                .attr("d", function (d, i) { return `M ${(-d.r * k)} 0 A ${(d.r * k)} ${(d.r * k)} 45 0 1 ${(d.r * k)} 0`; })
                .attr("transform", function (d, i) {
                    return `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`;
                    // return `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})rotate(${rotationText[i]})`;
                });

            //Save the names of the circle itself and first children
            let kids = []//[d.data.ID];
            if (typeof d.children !== "undefined") {
                for (let i = 0; i < d.children.length; i++) {
                    kids.push(d.children[i].data.ID)
                };
            }//if

            //Update the font sizes and hide those not close the the parent
            d3.selectAll(".hiddenArcWrapper").selectAll(".circleText")
                .style("font-size", function (d) { return Math.round(d.fontSize * k) + 'px' })
                .style("opacity", function (d) { return kids.indexOf(d.ID) >= 0 ? 1 : 0 })

            ////////////////////// The bar charts ////////////////////////

            //The title inside the circles
            d3.selectAll(".innerCircleTitle")
                .style("display", "none")
                //If the font-size becomes to small do not show it or if the ID does not start with currentID
                .filter(function (d) {
                    // return Math.round(d.fontTitleSize * k) > 4 & d.data.ID.lastIndexOf(currentID, 0) === 0; 
                    return Math.round(d.fontTitleSize * k) > 4
                })
                .style("display", null)
                .attr("y", function (d) { return d.titleHeight * k; })
                .style("font-size", function (d) { return Math.round(d.fontTitleSize * k) + 'px' })
                // .text(function (d, i) { return `${d.data.name} | ${_packData.moneyValue ? moneyFormat(d.value) : _packData.percentValue ? `${d.value}%` : d.value}` })
                .text(d => { return getStatDisplay(d, false) })
                .each(function (d) { wrap(this, k * d.textLength); });
            
            d3.selectAll('.innerBarSeriesText')
                .style('display', 'none')
                .filter(function (d) {
                    // return Math.round(d.fontSeriesSize * k) > 4 & d.data.ID.lastIndexOf(currentID, 0) === 0 
                    return Math.round(d.fontSeriesSize * k) > 4
                })
                .style("display", null)
                .attr("x", function(d) { 
                    // return (d.seriesOffsetX + (this.classList.contains('peak') ? 12 : 0)) * k
                    return this.classList.contains('peak') ?
                        (-(d.seriesOffsetX / 0.05) * 0.3) * k :
                        d.seriesOffsetX * k
                })
                .attr("y", d => d.seriesOffsetY * k)
                .style("font-size", function (d) { return Math.round(d.fontSeriesSize * k) + 'px' })

            //Rescale the bars
            d3.selectAll(".innerBarWrapper").selectAll(".innerBar")
                .style("display", "none")
                //If the circle (i.e. height of one bar) becomes to small do not show the bar chart
                .filter(function (d) {
                    // return Math.round(d.height * k) > 2 & d.ID.lastIndexOf(currentID, 0) === 0; 
                    return Math.round(d.height * k) > 2
                })
                .style("display", null)
                .attr('d', function (d) {
                    let isPeak = this.classList.contains('peak'),
                        w = (isPeak ? d.peakWidth : d.avgWidth) * k,
                        h = d.height * k,
                        c = h / 2,  // curve
                        x = d.totalOffset * k,
                        y = d.barHeight * k
                        
                    return isPeak ? 
                        `M${x + (d.avgWidth * k)},${y} h${w - c} q${c},0 ${c},${c} v${h - (c*2)} q0,${c} -${c},${c} h-${w - c} z` :
                        `M${x + c},${y} h${w - c} v${h} h-${w - c} q-${c},0 -${c},-${c} v-${h - (c*2)} q0,-${c} ${c},-${c} z`
                })
                /* .attr("x", function (d) { return d.totalOffset * k; })
                .attr("y", function (d) { return d.barHeight * k; })
                .attr("width", function (d) {
                    let width = this.classList.contains('peak') ? d.peakWidth : d.avgWidth
                    // return d.width * k;
                    return width * k;
                })
                .attr("height", function (d) { return d.height * k; })
                .style('transform', function (d) {
                    return this.classList.contains('peak') ? `translateX(${(d.avgWidth * k) - ((d.height * k)/2)}px)` : null
                }) */

            //Rescale the axis text
            d3.selectAll(".innerBarWrapper").selectAll(".innerText")
                .style("display", "none")
                //If the font-size becomes to small do not show it
                .filter(function (d) { 
                    // return Math.round(d.fontSize * k) > 4 & d.ID.lastIndexOf(currentID, 0) === 0 
                    return Math.round(d.fontSize * k) > 4
                })
                .style("display", null)
                .style("font-size", function (d) { 
                    return Math.round((this.classList.contains('category') ? d.fontSize : d.fontSizePercent) * k) + 'px' 
                })
                .attr("dx", function (d) {
                    return (this.classList.contains('category') ? d.dx : this.classList.contains('avg-percent') ? d.dx_ap : d.dx_pp) * k
                })
                .attr("x", d => d.totalOffset * k)
                .attr("y", d => d.barHeight * k)
                .style('transform', function (d) {
                    return this.classList.contains('category') || this.classList.contains('avg-percent') ? null : 
                        `translateX(${(d.avgWidth + d.peakWidth) * k}px)`
                })

            //Rescale and position the values of each bar
            d3.selectAll(".innerBarWrapper").selectAll(".innerValue")
                .style("display", "none")
                //If the font-size becomes to small do not show it
                .filter(function (d) {
                    // return Math.round(d.fontSizeValue * k) > 4 & d.ID.lastIndexOf(currentID, 0) === 0; 
                    return Math.round(d.fontSizeValue * k) > 4
                })
                .style("display", null)
                .style("font-size", function (d) { return Math.round(d.fontSizeValue * k) + 'px'; })
                .attr("x", function (d) { return d.totalOffset * k; })
                .attr("y", function (d) { return d.barHeight * k; })
                //Recalculate the left/right side location of the value because the this.getBBox().width has changed
                .attr("dx", function (d) {
                    let isPeak = this.classList.contains('peak'),
                        rect = this.getBBox()

                    d.valueLoc = (isPeak ? ((d.avgWidth + (d.peakWidth / 2)) - d.r * 0.0025) : ((d.avgWidth / 2) - d.r * 0.0025)) * k
                    return d.valueLoc
                })

            setTimeout(function () {
                changeLocation(d, v, k);
            }, 50);

        }//changeReset

    }

    //Move to the new location - called by zoom
    function changeLocation(d, v, k) {

        /* //Only show the circle legend when not at the leafs
        if (typeof d.children === "undefined") {
            d3.select("#legendRowWrapper").style("opacity", 0);
            d3.select(".legendWrapper").transition().duration(1000).style("opacity", 0);
        } else {
            d3.select("#legendRowWrapper").style("opacity", 1);
            d3.select(".legendWrapper").transition().duration(1000).style("opacity", 1);
        }//else */

        //////////////// Overal transform and resize /////////////////
        let duration = 1250

        //Transition the circles to their new location
        d3.selectAll(".plotWrapper").transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });

        //Transition the circles to their new size
        d3.selectAll("#nodeCircle").transition().duration(duration)
            .attr("r", function (d) {
                //Found on http://stackoverflow.com/questions/24293249/access-scale-factor-in-d3s-pack-layout
                // if (d.ID === "1.1.1.1") scaleFactor = d.value / (d.r * d.r * k * k);
                if (d.data.building_name) scaleFactor = d.value / (d.r * d.r * k * k);
                return d.r * k;
            })
            .call(endall, function () {
                d3.select(".legendWrapper").selectAll(".legendText")
                    .text(function (d) { return commaFormat(Math.round(scaleFactor * d * d / 10) * 10); });
            });

        setTimeout(function () {
            //Hide the node titles, update them at once and them show them again
            d3.selectAll(".hiddenArcWrapper")
                .transition().duration(500)
                .style("opacity", 1);

            //Hide the bar charts, then update them at once and show the magain	
            d3.selectAll(".barWrapperOuter")
                .transition().duration(500)
                .style("opacity", 1);

            focus0 = focus;
            k0 = k;

            if (zoomFromCircle && callbacks && callbacks.zoomed) callbacks.zoomed.call(this, focus)
        }, duration);

    }

    ///////////////////// Helper Functions /////////////////////// 

    //Wraps SVG text - Taken from http://bl.ocks.org/mbostock/7555321
    function wrap(textNode, width) {
        let text = d3.select(textNode),
            words = text.text().split(/\s+/).reverse(),
            currentSize = +(text.style("font-size")).replace("px", ""),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.2, // ems
            extraHeight = 0.6,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            //First span is different - smaller font
            tspan = text.text(null)
                .append("tspan")
                // .attr("class", "subTotal")
                .attr("x", 0).attr("y", y)
                .attr("dy", dy + "em")
                // .style("font-size", (Math.round(currentSize * 0.5) <= 5 ? 0 : Math.round(currentSize * 0.5)) + "px");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width | word === wrapDelim) {
                if (word = wrapDelim) word = "";
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("class", "subTotal")
                    .attr("x", 0).attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + extraHeight + dy + "em")
                    .text(word)
                    .style("font-size", (Math.round(currentSize * 0.5) <= 5 ? 0 : Math.round(currentSize * 0.5)) + "px")
            }//if
        }//while
    }

    //Taken from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
    //Calls a function only after the total transition ends
    function endall(transition, callback) {
        let n = 0

        transition.each(function () { ++n })
            .on("end", function () { if (!--n) callback.apply(this, arguments) })
    }

    this.setData = function (data) {
        barsDrawn = false
        _packData = data
        zoomFromCircle = true
        drawAll(data.nodes, data.stats)
    }

    // this.goTo = function (location) { searchByName(location) }

    this.zoomLocation = function (location, fromDropdown = false) {
        zoomFromCircle = fromDropdown
        searchByID(location.value)
    }

    this.reDraw = function () {
        barsDrawn = false
        drawAll(_packData.nodes, _packData.stats)
    }

    this.cleanUp = function () {
        removeTooltip()
    }

    drawAll(packData.nodes, packData.stats)
}