import * as d3 from 'd3'
import { extend } from '../../helpers'

export function timeGraph(chart, dataUrl, options) {
    const container = d3.select(chart)
    const default_config = {
        widget: false
    }
    let config = extend(true, default_config, options),
        events = config.events

    var isOuterRadio = 0,
        // canvasWidth = 960,
        canvasWidth = container.node().getBoundingClientRect().width - (config.widget ? 0 : 17),
        // canvasHeight = 600,
        canvasHeight = container.node().getBoundingClientRect().height || 600,
        centerX = canvasWidth * .4,
        centerY = canvasHeight / 2,
        // radio = 250,
        radius = canvasHeight / 2.5,
        radiusHours = radius + 12,
        formulaRadiusBreakdown = (radius * .75) * 2,
        lastJsonData;

    //ADD THE ELEMENTS OF THE ARRAY
    Array.prototype.sum = function(ignoraNegativos) {
        var sum = 0,
            ln = this.length,
            i;

        for (i = 0; i < ln; i++) {
            if (typeof(this[i]) === 'number') {

                if (ignoraNegativos && this[i] < 0) {
                    continue;
                } else {
                    sum += this[i];
                }
            }
        }

        return sum;
    }

    function degrees_to_radians(degrees) { return Math.PI / 180 * degrees }

    // function rd3(maxi, dato, medida) {
    //     // the measured variable is the one that marks. 180 is a hemicycle, 360 is a full circle
    //     var mx = +maxi,
    //         med = (medida) ? medida : 100;
    //     return (dato * med) / mx;
    // }

    function calcArrayPercents(arr) {
        var sum = arr.sum(),
            partial = [],
            ln = arr.length,
            calc,
            i;

        for (i = 0; i < ln; i++) {
            calc = (arr[i] * 100) / sum;
            partial.push(calc >= 0 ? calc : 0);
        }

        return partial;
    }

    var en_US = {
            "decimal": ".",
            "thousands": ",",
            "grouping": [3],
            "currency": ["$", ""],
            "dateTime": "%a %b %e %X %Y",
            "date": "%m/%d/%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        ENUS = d3.timeFormatDefaultLocale(en_US),
        iso = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"),
        tooltipDateFormat = ENUS.format("%A %d, %H:%M")

    var dataKeys = ['wfhp', 'cs', 'pwu', 'pmru', 'pmre'],
        dataKeysInfo = {
            wfhp: { id: 'wfhp', name: 'Work from home peak', color: '7EAADD', highlightColor: 'c6d1dd' },
            cs: { id: 'cs', name: 'Cost Saving', color: '33537A', highlightColor: '446fa4' },
            pwu: { id: 'pwu', name: 'Peak Workspace Utilisation', color: 'F5A623', highlightColor: 'f5cc89' },
            pmru: { id: 'pmru', name: 'Peak Meeting Room Utilisation', color: '8F31AE', highlightColor: 'b662d2' },
            pmre: { id: 'pmre', name: 'Peak Meeting Room Efficiency', color: '3D3F56', highlightColor: '6a6d95' }
        }

    //BASE DRAWING
    var svg = container.append('svg')
        .attr('class', 'time-chart')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight)

    var defs = svg.append("defs"),
        filter = defs.append("filter")
        .attr("id", "brightness"),
        feComponent = filter.append("feComponentTransfer");
    feComponent.append('feFuncR')
        .attr('type', 'linear')
        .attr('slope', '1.25')
    feComponent.append('feFuncG')
        .attr('type', 'linear')
        .attr('slope', '1.25')
    feComponent.append('feFuncB')
        .attr('type', 'linear')
        .attr('slope', '1.25')


    svg.append('circle')
        .attr('id', 'circleBG')
        .attr('r', radius)
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('fill', 'rgb(57,57,57)');

    // CREATE THE HOST FOR THE 'RADIUS'
    svg.append('g').attr('id', 'hours');

    var hostRads = svg.append('g').attr('id', 'hostRads'),
        groupCircle = svg.append('g').attr('id', 'circle'),
        consumoCircle = groupCircle.append('circle')
        .attr('r', radius)
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('stroke', '#990000')
        .attr('fill', 'none')
        .attr('stroke-dasharray', 3)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0);

    var currTimeDot = svg.append('g').attr('id', 'curr-time-dot'),
        timeDot = currTimeDot.append('circle')
        .attr('r', 5)
        .attr('cx', -9999)
        .attr('cy', -9999)
        .attr('stroke', 'none')
        .attr('fill', '#900')

    var hoursGroup = d3.select("svg #hours")
        .attr('transform', 'translate(' + centerX + ',' + centerY + ')');

    // SPEND MINUTES 24 * 60
    var hourRotation = d3.scaleLinear()
        .domain([0, 24 * 60])
        .range([0, 360]);

    var currDate = new Date();
    var currentHourRotation = hourRotation((60 * currDate.getHours()) + currDate.getMinutes());

    var circleHour = svg.append('circle')
        .attr('id', 'circleHour')
        .attr('r', 3)
        .attr('cx', centerX + (radius + 12) * Math.sin(degrees_to_radians(180 + 360 - currentHourRotation)))
        .attr('cy', centerY + (radius + 12) * Math.cos(degrees_to_radians(180 + 360 - currentHourRotation)))
        .attr('stroke-width', '2')
        .attr('stroke', '#BCD5D5')
        .attr('fill', '#BCD5D5');

    var clockTimer = setInterval(function() {
        var date = new Date(),
            currentHourRotation = hourRotation((60 * date.getHours()) + date.getMinutes()),
            calc = degrees_to_radians(180 + 360 - currentHourRotation);

        circleHour.transition()
            .attr('cx', centerX + radiusHours * Math.sin(calc))
            .attr('cy', centerY + radiusHours * Math.cos(calc))
            .attr('r', function() {
                return ((circleHour.attr('r') != 3) ? 3 : 1);
            });
    }, 1000);

    // 24 HOUR DRAWING
    var rotation,
        n,
        lnHoras = 24;

    for (n = 0; n < lnHoras; n++) {
        rotation = 180 - (360 / lnHoras) * n;
        hoursGroup.append('text')
            .text(((n > 9) ? n : "0" + n) + ':00')
            .attr('x', (radius + 33) * Math.sin(degrees_to_radians(rotation)))
            .attr('y', (radius + 33) * Math.cos(degrees_to_radians(rotation)) + 7)
            .attr('text-anchor', 'middle')
            .style('font-size', '14').style('font-weight', 'bold')
            .style('fill', '#666')
    }

    // PAINT THE BREAKDOWN
    var breakdown = svg.append('g')
        .attr('id', 'breakdown_group')
        .attr('transform', 'translate(' + (centerX + radius + 100) + ',' + (centerY - (radius * .75)) + ')')
        .attr('opacity', 0);

    breakdown.append('rect')
        .attr('y', formulaRadiusBreakdown + 20)
        .attr('width', 165)
        .attr('height', 3)
        .attr('fill', '#3C3C3C');

    var dateBlock = breakdown.append('text')
            .text("hoy")
            .attr('y', formulaRadiusBreakdown + 39)
            .attr('text-anchor', 'start')
            .style('font-size', '14')
            .attr('fill', '#666'),
        hourBlock = breakdown.append('text')
            .text("21:00h")
            .attr('y', formulaRadiusBreakdown + 62)
            .attr('text-anchor', 'start')
            .style('font-size', '27')
            .attr('fill', '#666')

    // PAINT THE TOOLTIP
    var tooltipWidth = 120,
        tooltipHeight = 32,
        currentTooltipFormat,
        tooltip = svg.append('g').attr('id', 'data-tooltip').attr('opacity', 0),
        // tooltip_shadow = tooltip.append('rect')
        //     .attr('width', tooltipWidth + 4)
        //     .attr('height', tooltipHeight + 4)
        //     .attr('rx', 5)
        //     .attr('fill', 'black').attr('fill-opacity', .15),
        tooltip_rect = tooltip.append('rect')
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight)
            .attr('rx', 5),
        tooltip_date = tooltip.append('text')
            .attr('id', 'fecha')
            .attr('x', 5)
            .attr('y', 11)
            .attr('text-anchor', 'start')
            .style('font-size', '11')
            .style('fill', 'white')
            .style('fill-opacity', .75),
        tooltip_val = tooltip.append('text')
            .text('')
            .attr('x', 15)
            .attr('y', 24)
            .style('font-size', '13')
            .style('fill', 'white');

    function setTooltip(name) {
        let //shadowX = name == 'fmt_0_0' || name == 'fmt_0_1' ? -(tooltipWidth + 2) : -2, 
            //shadowY = name == 'fmt_0_0' || name == 'fmt_1_0' ? -(tooltipHeight + 2) : -2,
            rectX = name == 'fmt_0_0' || name == 'fmt_0_1' ? -tooltipWidth : 0, 
            rectY = name == 'fmt_0_0' || name == 'fmt_1_0' ? -tooltipHeight : 0,
            dateX = name == 'fmt_0_0' || name == 'fmt_0_1' ? -6 : 6,
            dateY = name == 'fmt_0_0' || name == 'fmt_1_0' ? -18 : 13, 
            dateTextAnchor = name == 'fmt_0_0' || name == 'fmt_0_1' ? 'end' : 'start',
            valX = name == 'fmt_0_0' || name == 'fmt_0_1' ? -6 : 6,
            valY = name == 'fmt_0_0' || name == 'fmt_1_0' ? -6 : 26, 
            valTextAnchor = name == 'fmt_0_0' || name == 'fmt_0_1' ? 'end' : 'start';

        // tooltip_shadow.attr('x', shadowX).attr('y', shadowY)
        tooltip_rect.attr('x', rectX).attr('y', rectY)
        tooltip_date.attr('x', dateX).attr('y', dateY)
            .attr('text-anchor', dateTextAnchor)
        tooltip_val.attr('x', valX).attr('y', valY)
            .attr('text-anchor', valTextAnchor)
    }

    function mousemove(d, i) {
        var coords = d3.mouse(this),
            x = coords[0],
            y = coords[1],
            mth = Math,
            xs = mth.pow(centerX - x, 2),
            ys = mth.pow(centerY - y, 2),
            sqrt = mth.sqrt(xs + ys),
            offset = {
                'left': svg.offsetLeft,
                'top': svg.offsetTop
            },
            xsign = (x > centerX) ? 1 : 0,
            ysign = (y > centerY) ? 1 : 0,
            tooltipFmtName = ['fmt_', xsign, '_', ysign].join("");

        if (tooltipFmtName != currentTooltipFormat) {
            setTooltip(tooltipFmtName);
            currentTooltipFormat = tooltipFmtName;
        }

        if (isOuterRadio != +(sqrt <= radius)) {

            isOuterRadio = +(sqrt <= radius);

            groupCircle.transition().duration(100).style('opacity', isOuterRadio);
            currTimeDot.transition().duration(100).style('opacity', isOuterRadio);
            tooltip.transition().duration(100).style('opacity', isOuterRadio);

            if (!isOuterRadio) {
                dispatch.call('mouseenter', this, lastJsonData);
            }

        }

    }

    svg.on('mousemove', mousemove)

    var //sizes = d3.scaleLinear().range([10, 24]),
        opacityScale = d3.scaleLinear().range([.4, 1]),
        colorDemand = d3.scaleLinear().range(['#996A00', '#990000'])
            .domain([0, 100]);

    // THIS SCALE ALLOWS ME TO ESTABLISH THE MAXIMUM AND MINIMUM CONSUMPTION DEPENDING ON DEMAND
    // AND VARY THE MAXIMUM RADIO PERCENTAGE
    var scaleRadius = d3.scaleLinear().range([0, radius])
        .domain([0, 100]);

    var dispatch = d3.dispatch("mouseenter");
    dispatch.on("mouseenter", debounce(drawBreakdown, 125))

    //http://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    function drawBreakdown(data) {
        // WE CALCULATE THE SUM OF THE DIFFERENT SUPPLYING ENERGIES
        var generators = dataKeys.map(key => data[key]),
            demandPercentages = calcArrayPercents(generators),
            demandTime = generators.sum(true);

        var accumulatorInner = 0,
            generatorThickness = 0,
            tsDate = iso(data.ts),
            path,
            i;

        breakdown.attr('opacity', 1)

        dateBlock.text(ENUS.format("%A %d")(tsDate))

        hourBlock.text(ENUS.format("%H:%M")(tsDate) + "h")

        var scaleDesglose = d3.scaleLinear()
            .range([0, formulaRadiusBreakdown]),
            tabla = [];

        for (i = 0; i < dataKeys.length; i++) {
            tabla[i] = {
                id: dataKeys[i],
                data: data[dataKeys[i]]
            };
        }

        var blocks = breakdown.selectAll('.j-block')
            .data(tabla, function(d, i) { return d.id })

        blocks.enter()
            .append('g')
            .attr('id', function(d, i) { return "des_" + d.id })
            .attr('class', 'j-block')
            .each(function() {
                var that = d3.select(this);

                that.append('rect')
                    .attr('width', 6)
                    .attr('height', 10).style('cursor', 'pointer')
                    .attr('fill', function(d) { return '#' + dataKeysInfo[d.id].color })
                    .on('click', d => events && (events.toPeakChart.call(this, d), d3.event.stopPropagation()));

                that.append('text')
                    .text(d => dataKeysInfo[d.id].id)
                    .attr('class', 'j-name')
                    .attr('x', 30)
                    .attr('y', 20)
                    .attr('text-anchor', 'start')
                    .style('font-size', '13').style('cursor', 'pointer')
                    // .style('font-family', 'Roboto Slab, Helvetica Neue, Helvetica, sans-serif')
                    .style('fill', '#B3B3B3')
                    .style('fill', function(d) { return '#' + dataKeysInfo[d.id].highlightColor })
                    .attr('transform', 'rotate(-45)')
                    .on('click', d => events && (events.toPeakChart.call(this, d), d3.event.stopPropagation()));

                that.append('text')
                    .text(d => dataKeysInfo[d.id].id)
                    .attr('class', 'j-data')
                    .attr('x', 30)
                    .attr('y', 32)
                    .attr('text-anchor', 'start')
                    .style('font-size', '12').style('cursor', 'pointer')
                    // .style('font-family', 'Roboto Slab, Helvetica Neue, Helvetica, sans-serif')
                    .style('fill', '#B3B3B3')
                    .style('fill', function(d) { return '#' + dataKeysInfo[d.id].highlightColor })
                    .attr('transform', 'rotate(-45)')
                    .on('click', d => events && (events.toPeakChart.call(this, d), d3.event.stopPropagation()));

                that.append('path')
                    .style('fill', 'none')
                    .style('stroke-width', '1')
                    .style('stroke', function(d) {
                        return '#' + dataKeysInfo[d.id].color;
                    })
            }).attr('transform', function(d, i) {
                return 'translate(0,' + (50 * i) + ')'
            })
        
        var safeStep = 33,
            safeStepCalc = 0,
            colisionCounter = 0,
            minPercentStep = 8;

        // UPDATE
        blocks.each(function(d, i) {
            if (demandPercentages[i - 1] < minPercentStep) {
                colisionCounter++;
            }

            safeStepCalc = safeStep * colisionCounter;
            generatorThickness = demandPercentages[i] / 100 * formulaRadiusBreakdown;

            var that = d3.select(this)
                .transition()
                .attr('transform', 'translate(0,' + accumulatorInner + ')')
                .each(function() {
                    var that = d3.select(this);
                    that.select('rect')
                        .transition()
                        .attr('height', generatorThickness);

                    that.select('.j-name')
                        .text(function(d) {
                            // return tablaIdsInfo[d.id].nombreAbrev + " ";
                            return dataKeysInfo[d.id].name + " "
                        })
                        .transition()
                        .attr('transform', 'translate(' + safeStepCalc + ',' + 0 + ') ' + 'rotate(-45 0 0) ');

                    that.select('.j-data')
                        // .text(function(d) {
                        //     return d3.format(",.2f")(demandPercentages[i]) + "% " + d3.format(",")(d.data) + "MW ";
                        // })
                        // .text(d => `${d3.format(',')(d.data)}%`)
                        .text(d => `${d.data}%`)
                        .transition()
                        .attr('transform', 'translate(' + safeStepCalc + ',' + 0 + ') ' + 'rotate(-45 0 0) ');

                    that.select('path')
                        .transition()
                        .attr('d', 'M6,1 H' + Math.floor(31 + safeStepCalc) + " l3,-3")

                })
            accumulatorInner += generatorThickness;
        })
    }

    function getData(path) {
        d3.json(path).then(function(data) {

            let jsonData = data.map(d => {
                // total percentages
                let toAvg = []
                // d.tp = 0

                for (var key in d) {
                    if (dataKeys.indexOf(key) >= 0) {
                        // d.tp += d[key]
                        toAvg.push(d[key])
                    }
                }
                d.combined = d3.mean(toAvg)

                return d
            })

            // console.log('getData', jsonData)

            jsonData.reverse();

            // UPDATE DOMAINS SCALES
            // sizes.domain([minTotal, maxTotal])
            opacityScale.domain([0, jsonData.length])
            // colorDemand.domain([minTotal, maxTotal])

            // THIS SCALE ALLOWS ME TO ESTABLISH THE MAXIMUM AND MINIMUM CONSUMPTION DEPENDING ON DEMAND
            // AND VARY THE MAXIMUM RADIO PERCENTAGE
            // scaleRadius.domain([0, maxTotal])

            var now = new Date(),
                currentHourDate = iso(jsonData[jsonData.length - 1].ts),
                currentHourDateRotation = hourRotation((currentHourDate.getHours() * 60) + (currentHourDate.getMinutes())),
                arcoPorcion = (360 / jsonData.length) / 1.05;

            // RELEASE THE LAST AVAILABLE DATA
            if (!isOuterRadio) {
                dispatch.call('mouseenter', this, jsonData[jsonData.length - 1]);
            }

            // SELECT THE RADIUS THAT HOUSE EACH OF THE TIME SLOTS
            var rads = svg.select('#hostRads').selectAll('.rad')
                .data(jsonData, d => d.ts)

            // ENTER
            rads.enter().append('g')
                .attr('class', 'rad')
                .attr('id', function(d) {
                    var ts = iso(d.ts)
                    return ['id-', ts.getHours(), ':', ts.getMinutes(), '-dia-', ts.getDate()].join("");
                })
                .on('mouseenter', function(d) {

                    dispatch.call('mouseenter', this, d);

                    /*var that = d3.select(this)
                        that.style("filter", "url(#brightness)")  */

                    var tsDate = iso(d.ts),
                        h = tsDate.getHours(),
                        m = tsDate.getMinutes(),
                        angle = hourRotation((h * 60) + m),
                        offset = 180,
                        a = degrees_to_radians(offset - angle),
                        // consumoRadio = scaleRadius(d.dem),
                        _scaleRad = scaleRadius(d.combined),
                        sinA = Math.sin(a),
                        cosA = Math.cos(a);

                    timeDot
                        .attr('cx', centerX + (_scaleRad * sinA))
                        .attr('cy', centerY + (_scaleRad * cosA))
                        .transition()
                        .duration(150)
                        // .attr('fill', colorDemand(d.dem))
                        .attr('fill', colorDemand(d.combined))

                    tooltip
                        .attr('transform', 'translate(' + (centerX + (_scaleRad * sinA)) + ',' + (centerY + (_scaleRad * cosA)) + ')')

                    tooltip_date
                        .text(function() {
                            var tsDate = iso(d.ts);
                            return tooltipDateFormat(tsDate);
                        });

                    tooltip_val//.text(function() { return d3.format(",")(d.dem) + "MW" })
                        .text(`Combined: ${d3.format(",")(d.combined)}%`)

                    tooltip_rect
                        .attr('fill-opacity', 1)
                        .transition()
                        .duration(150)
                        //.attr('fill', colorDemand(d.dem))
                        .attr('fill', colorDemand(d.combined))

                    consumoCircle
                        .attr('stroke-opacity', .9)
                        .transition()
                        // .attr('r', scaleRadius(d.dem))
                        // .attr('stroke', colorDemand(d.dem))
                        .attr('r', scaleRadius(d.combined))
                        .attr('stroke', colorDemand(d.combined))
                })
                .each(function(d) {
                    //CREATE THE 'HOLES'
                    var group = d3.select(this),
                        ln = 8,
                        n = 0;

                    group.selectAll('path')
                        .data(dataKeys)
                        .enter().append('path')
                        // .on('click', function() {
                        //     var that = d3.select(this);
                        //     // console.log("click", iso(d.ts), that.datum(), d[that.datum()])
                        // })
                        .on('mouseover', function() {
                            let that = d3.select(this)
                            that.attr('fill', '#' + dataKeysInfo[that.datum()].highlightColor);
                        })
                        .on('mouseout', function() {
                            let that = d3.select(this)
                            that.attr('fill', '#' + dataKeysInfo[that.datum()].color);
                        })
                        .attr('fill', function(d, n) {
                            var that = d3.select(this)
                            return '#' + dataKeysInfo[that.datum()].color;
                        })
                    n++;
                })
                .attr('opacity', 0)
                .attr('transform', 'translate(' + centerX + ',' + centerY + ')')

            // UPDATE
            .each(function(d, i) {
                // console.log ('rad',i, this.id);
                var paths = d3.select(this).selectAll('path')

                // CALCULATE THE SUM OF THE DIFFERENT SUPPLYING ENERGIES
                var generators = dataKeys.map(key => d[key]),
                    percentDemand = calcArrayPercents(generators),
                    timeDemand = generators.sum(true),
                    accumulatedInner = 0,
                    generatorThickness = 0,
                    ln = percentDemand.length,
                    n = 0,
                    arc = d3.arc(),
                    tsDate = iso(d.ts),
                    h = tsDate.getHours(),
                    m = tsDate.getMinutes(),
                    angle = hourRotation((h * 60) + m),
                    path;

                paths.each(function() {

                    // generatorThickness = percentDemand[n] / 100 * scaleRadius(d.dem);
                    generatorThickness = percentDemand[n] / 100 * scaleRadius(d.combined);

                    d3.select(this).attr('d', arc.startAngle(function() {
                            return degrees_to_radians(angle);
                        }).endAngle(function() {
                            return degrees_to_radians(angle + arcoPorcion);
                        }).outerRadius(function() {
                            return generatorThickness + accumulatedInner;
                        }).innerRadius(function() {
                            return accumulatedInner;
                        }))
                        //.attr('shape-rendering','optimizeSpeed' )

                    accumulatedInner += generatorThickness;

                    n++;
                })
            })

            .transition().duration(500).delay(function(d, i) {
                    return (jsonData.length - i) * 25
                })
                .attr('opacity', (d, i) => opacityScale(i))
                .attr('transform', 'translate(' + centerX + ',' + centerY + ')')

            //EXIT
            rads.exit().remove()
                // .each(function() {
                //     console.log('Bye! exit ', this);
                // });

            lastJsonData = jsonData[jsonData.length - 1]

            // initialize legends
            if (lastJsonData) drawBreakdown(lastJsonData)
        })
    }

    // var baseUrl = "http://energia.ningunaparte.net/data/last24h";

    // setInterval(getData, 1000 * 30, baseUrl);
    // getData(baseUrl);
    getData(dataUrl)

    this.destroy = function() {
        clearInterval(clockTimer)
    }
}