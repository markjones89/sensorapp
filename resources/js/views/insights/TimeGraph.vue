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
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="toTreeSummary">{{ filter.btnLabel }}</a>
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
                <div class="bottom-filters">
                    <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                        @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                    <span class="graph-filter" @click="showMinuteFilter = !showMinuteFilter">
                        {{ minuteFilter ? minuteFilter : 'Select' }}
                        <span class="caret">
                            <caret-icon />
                        </span>
                        <filter-dropdown :filters="minuteFilters" position="top" :show="showMinuteFilter" @onSelect="filterMinute" />
                    </span>
                </div>
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

<script>
import { mapState } from "vuex";
import { getBaseUrl } from '@/helpers'
import { Checkbox, DateRangeToggle, FilterDropdown, Modal, TimeSlider } from "@/components"
import { CaretIcon, CaretLeftIcon } from "@/components/icons"
import { timeGraph } from '@/components/graphs/TimeGraph'
import heatMap from '@/components/graphs/HeatMap'
export default {
    title: 'Time Chart',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Modal, TimeSlider },
    data() {
        return {
            // user: null,
            showPageOpts: false, showEmbed: false, showHeatMap: false,
            timeGraph: null, heatMap: null,
            timeFilter: {
                start: null, end: null
            },
            minuteFilter: '10 minutes', showMinuteFilter: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.user,
            filter: state => state.homepage.filter
        }),
        baseUrl() { return getBaseUrl() },
        settings() { return this.user.company ? this.user.company.settings : null },
        minuteFilters() {
            var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        backTo() { this.$router.back() },
        rangeSelect(range, from, to) {
            console.log('rangeSelect', range, from, to)
            this.showHeatMap = range != 'today'

            setTimeout(() => {
                if (this.showHeatMap && !this.heatMap) {
                    this.renderHeatMap()
                    this.timeGraph = null
                }
                else if (!this.showHeatMap && !this.timeGraph) {
                    this.renderTimeChart()
                    this.heatMap = null
                }
            }, 10)
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
        },
        toTreeSummary() { this.$router.push({ name: 'tree-summary', query: { df: this.filter.value } }) },
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
    mounted() {
        this.renderTimeChart()
    },
    destroyed() {
        this.timeGraph.destroy()
    }
}
</script>

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
    width: 900px;
    height: 450px;
    margin: 32px auto;
}
#time-chart {
    flex: 1 auto;
}
</style>