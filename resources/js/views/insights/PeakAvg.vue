<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" />
            <div class="graph-filters">
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
            <div class="chart-header">
                <span class="chart-title">Building Name</span>
                <span class="chart-subtitle">Click the orange bar for more info or click the blank space to go back</span>
            </div>
            <div id="peak-chart"></div>
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
<script>
import { store } from '../../store'
import { getBaseUrl } from '../../helpers'
import { Checkbox, DateRangeToggle, FilterDropdown, Modal, TimeSlider } from "../../components"
import { CaretIcon, CaretLeftIcon } from "../../components/icons"
import hierarchyBarChart from '../../components/graphs/HierarchyBar'
export default {
    title: 'Peak Chart',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Modal, TimeSlider },
    data() {
        return {
            user: null,
            showPageOpts: false, showEmbed: false,
            timeFilter: {
                start: null, end: null
            },
            minuteFilter: '10 minutes', showMinuteFilter: false
        }
    },
    computed: {
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
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async renderChart() {
            fetch(`${this.baseUrl}/data/detail-breakdown.json`)
                .then(response => response.json())
                .then(data => {
                    hierarchyBarChart('#peak-chart', data, {
                        events : {
                            goBack: () => {
                                this.$router.back()
                            },
                            routeTo: (route) => {
                                this.$router.push({ name: route })
                            }
                        }
                    })
                })
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
        },
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
        this.renderChart()
    }
}
</script>