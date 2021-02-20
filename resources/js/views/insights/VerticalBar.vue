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
                <span class="chart-title">Building Name, Ground Floor Peak Performance</span>
                <!-- <span class="chart-subtitle">Click the orange bar for more info or click the blank space to go back</span> -->
            </div>
            <div id="bar-chart" class="bar-chart"></div>
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
.bar-chart svg {
    pointer-events: initial;
}
</style>
<script>
import { store } from '../../store'
import { getBaseUrl } from '../../helpers'
import { Checkbox, DateRangeToggle, FilterDropdown, Modal, TimeSlider } from "../../components"
import { CaretIcon, CaretLeftIcon } from "../../components/icons"
import barChart from '../../components/graphs/BarChart'

function randomNum(limit) {
    return Math.floor((Math.random() * (limit || 100)) + 1)
}

function randomData (range) {
    let data = []
    if (range === 'today') {
        let hours = []

        for (let i = 0; i < 24; i++) { hours.push(`${("00" + i).substr(-2,2)}:00`) }

        hours.forEach(h => {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Hour: h, Peak: peak, Average: avg })
        })
    } else if (range === 'week') {
        let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        days.forEach(d => {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Day: d, Peak: peak, Average: avg })
        })
    } else if (range === 'month') {
        let now = new Date(),
            days = (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate(),
            dates = [],
            month = now.toString().substr(4,3)

        for (let i = 1; i <= days; i++) {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Date: `${month} ${i}`, Peak: peak, Average: avg })
        }
    } else if (range === 'year') {
        let months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        months.forEach(m => {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Month: m, Peak: peak, Average: avg })
        })
    }

    return data
}

export default {
    title: 'Bar Chart',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Modal, TimeSlider },
    data() {
        return {
            user: null,
            showPageOpts: false, showEmbed: false,
            chart: null,
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
            // console.log('rangeSelect', range, from, to)
            this.chart.update(randomData(range))
        },
        viewCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        renderChart() {
            this.chart = new barChart('#bar-chart', randomData('today'))
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
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