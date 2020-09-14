<template>
    <div class="content">
        <div class="graph-wrapper">
            <div class="graph-header">
                <date-range-toggle @select="rangeSelect" />
                <div class="graph-filters">
                    <span class="graph-filter">
                        Filter By
                        <span class="caret">
                            <caret-icon />
                        </span>
                    </span>
                    <span class="graph-filter">
                        Select Location
                        <span class="caret">
                            <caret-icon />
                        </span>
                    </span>
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="viewCostAnalysis">Cost Analysis</a>
                </div>
                <span class="page-opt-trigger" role="button" @click="showPageOpts = !showPageOpts">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </span>
                <transition name="fadeUp">
                    <div class="page-opt-panel" v-if="showPageOpts">
                        <ul>
                            <li><a @click="toggleEmbed(true)">Embed</a></li>
                        </ul>
                    </div>
                </transition>
            </div>
            <div class="graph-content">
                <div class="page-back">
                    <div class="back-button" @click="backTo">
                        <button class="btn btn-primary btn-small">
                            <caret-left-icon />
                        </button>
                        Back
                    </div>
                </div>
                <!-- graph & legends here -->
                <div v-if="showHeatMap" id="heat-map" key="heatmap"></div>
                <div v-else id="time-chart" key="timechart"></div>
                <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <div class="clearfix"></div>
            </div>
            <div class="graph-footer">
                <div class="left-options">
                    <button class="btn btn-primary btn-small" @click="toLive">Live</button>
                </div>
                <div class="right-options">
                    <checkbox label="Save to report" />
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.time-chart {
    pointer-events: initial;
}
.chart_XYAxis .axis {
    fill: #ffffff;

    .tick text {
        fill: rgba(255,255,255,.5);
    }

    .tick line,
    path.domain {
        stroke: rgba(255,255,255,.5);
    }
}
</style>
<style lang="scss" scoped>
#heat-map {
    flex: 1 auto;
    width: 950px;
    // height: 450px;
    margin: 0 auto;
}
#time-chart {
    flex: 1 auto;
}
</style>
<script>
import { store } from '../../store'
import { getBaseUrl } from '../../helpers'
import { Checkbox, DateRangeToggle, Modal, TimeSlider } from "../../components"
import { CaretIcon, CaretLeftIcon } from "../../components/icons"
import { timeGraph } from '../../components/graphs/TimeGraph'
import heatMap from '../../components/graphs/HeatMap'
export default {
    title: 'Time Chart',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, Modal, TimeSlider },
    data() {
        return {
            user: null,
            showPageOpts: false, showEmbed: false, showHeatMap: false,
            timeGraph: null, heatMap: null,
            timeFilter: {
                start: null, end: null
            }
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() },
        settings() { return this.user.company ? this.user.company.settings : null }
    },
    methods: {
        backTo() { this.$router.back() },
        rangeSelect(range, from, to) {
            console.log('rangeSelect', range, from, to)
            this.showHeatMap = range != 'today'

            if (this.showHeatMap && !this.heatMap) this.renderHeatMap()
            else if (!this.showHeatMap && !this.timeGraph) this.renderTimeChart()
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        viewCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        toLive() {
            this.$router.push({ name: 'occupancy' }) //, query: { bid: bid }
        },
        renderTimeChart() {
            this.timeGraph = new timeGraph('#time-chart', `${this.baseUrl}/data/time-chart-data.json`, {
                widget: false,
                events: {
                    toPeakChart: (data) => {
                        console.log('toPeakChart', data)
                        this.$router.push({ name: 'peak' })
                    }
                }
            })
        },
        async renderHeatMap() {
            let { data } = await axios.get('/data/heatmap-data.json')

            this.heatMap = new heatMap('heat-map', data, {
                radiusX: 60, radiusY: 60
            })
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        this.renderTimeChart()
    },
    destroyed() {
        this.timeGraph.destroy()
    }
}
</script>