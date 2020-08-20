<template>
    <div class="content">
        <div class="graph-header">
            <div class="graph-range-btns">
                <span class="graph-range-btn btn--active">Today</span>
                <span class="graph-range-btn">This Week</span>
                <span class="graph-range-btn">This Month</span>
                <span class="graph-range-btn">This Year</span>
                <span class="graph-range-btn">Pick Date</span>
            </div>
            <div class="graph-filters">
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
            <!-- graph & legends here -->
            <div class="chart-header">
                <span class="chart-title">Building Name</span>
                <span class="chart-subtitle">Click the orange bar for more info or click the blank space to go back</span>
            </div>
            <div id="peak-chart"></div>
            <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
        </div>
        <div class="graph-footer">
            <div class="left-options">
                <button class="btn btn-primary btn-small">Live</button>
                <button class="btn btn-primary btn-small">Insights</button>
            </div>
            <div class="right-options">
                <checkbox label="Save to report" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.hierarchy-chart {
    pointer-events: initial;
    transition: height 750ms;
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
import { Checkbox, Modal, TimeSlider } from "../../components"
import { CaretIcon } from "../../components/icons"
import barChart from '../../components/graphs/HierarchyBar'
export default {
    title: 'Peak Chart',
    components: { CaretIcon, Checkbox, Modal, TimeSlider },
    data() {
        return {
            user: null,
            showPageOpts: false, showEmbed: false,
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
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async renderChart() {
            fetch(`${this.baseUrl}/data/flare-2.json`)
                .then(response => response.json())
                .then(data => {
                    barChart('#peak-chart', data)
                })
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        viewCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        this.renderChart()
    }
}
</script>