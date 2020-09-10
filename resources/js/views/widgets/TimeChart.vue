<template>
    <div class="widget">
        <div id="time-chart" ref="chart"></div>
    </div>
</template>
<script>
import { getBaseUrl, getUrlParam } from '../../helpers'
import { timeGraph } from '../../components/graphs/TimeGraph'
export default {
    data() {
        return {
            width: 900, height: 450, timeGraph: null
        }
    },
    created() {
        let w = getUrlParam('w'), h = getUrlParam('h')

        if (w) this.width = w
        if (h) this.height = h
    },
    mounted() {
        this.$refs.chart.style.width = `${this.width}px`
        this.$refs.chart.style.height = `${this.height}px`

        this.timeGraph = new timeGraph('#time-chart', `${getBaseUrl()}/data/time-chart-data.json`, { widget: true })
    },
    destroyed() {
        this.timeGraph.destroy()
    }
}
</script>