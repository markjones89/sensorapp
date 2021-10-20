import { Heat } from '@hpcc-js/chart'
import { extend } from '@/helpers'

export default function heatMap(wrapper, data, options) {
    const config_defaults = {
        minOpacity: 0.05,
        radiusX: 45, radiusY: 45,
        blurRadius: 25
    }
    // const container = document.querySelector(wrapper)
    const config = extend(true, config_defaults, options)

    let chart = new Heat()
        .target(wrapper)
        .columns(["Day", "Hour", "weight"])
        .xAxisType("ordinal")
        .yAxisType("time")
        .yAxisTypeTimePattern("%H")
        .yAxisTickFormat("%H %p")
        .yAxisTitle("Hour")
        .orientation("vertical")
        // .data(data)
        .paletteID('default')
        .radiusX(config.radiusX)
        .radiusY(config.radiusY)
        .blur(config.blurRadius)
        .minOpacity(config.minOpacity)

    this.update = function (data) {
        chart.data(data)
            .lazyRender()
    }

    this.update(data)
}