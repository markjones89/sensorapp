<template>
    <div class="content">
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
                <a href="javascript:;" class="btn btn-primary" id="cost-analysis-btn" @click="viewCostAnalysis">Cost Analysis</a>
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
            <div id="time-chart"></div>
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
</template>
<style lang="scss">
.time-chart {
    pointer-events: initial;
}
</style>
<style lang="scss" scoped>
#cost-analysis-btn {
    margin-left: 12px;
}
</style>
<script>
import { store } from '../../store'
import { getBaseUrl } from '../../helpers'
import { Checkbox, DateRangeToggle, Modal, TimeSlider } from "../../components"
import { CaretIcon, CaretLeftIcon } from "../../components/icons"
import { timeGraph } from '../../components/graphs/TimeGraph'
export default {
    title: 'Time Chart',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, Modal, TimeSlider },
    data() {
        return {
            user: null,
            showPageOpts: false, showEmbed: false,
            timeGraph: null,
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
        backTo() {
            this.$router.back()
        },
        rangeSelect(range, from, to) {
            console.log('rangeSelect', range, from, to)
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
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
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
    destroyed() {
        this.timeGraph.destroy()
    }
}
</script>