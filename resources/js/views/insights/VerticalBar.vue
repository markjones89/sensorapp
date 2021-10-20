<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <div class="graph-filters">
                <!-- <span class="graph-filter">
                    Select Location
                    <span class="caret">
                        <caret-icon />
                    </span>
                </span> -->
                <graph-filter placeholder="Select Location" :filters="locations" :chosen="locFilter" :chosenAsSelected="true" @onSelect="selectLocation" />
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
            <vertical-graph :buildingData="building" :rangeFilter="rangeFilter.type" :roomFilter="locFilter" :dataFilters="dataFilters" />
            <div class="bottom-filters">
                <time-slider :from="timeFilter.start" :to="timeFilter.end"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <graph-filter :filters="minuteFilters" :chosen="minuteFilter" :chosenAsSelected="true" position="top" @onSelect="filterMinute" />
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

<script>
import { mapState } from "vuex";
import { getBaseUrl, toOrdinal } from '@/helpers'
import { Checkbox, DateRangeToggle, GraphFilter, Modal, TimeSlider } from '@/components'
import { VerticalGraph } from '@/components/partials'
import { CaretIcon, CaretLeftIcon } from '@/components/icons'

export default {
    title: 'Bar Chart',
    components: {
        CaretIcon,
        CaretLeftIcon,
        Checkbox,
        DateRangeToggle,
        GraphFilter,
        Modal,
        TimeSlider,
        VerticalGraph
    },
    data: () => ({
        showPageOpts: false, showEmbed: false,
        building: null,
        locations: [], locFilter: null,
        rangeFilter: { type: 'today', start: null, end: null },
        timeFilter: { start: null, end: null },
        minuteFilter: 60,
        dataFilters: {
            trigger: 6,
            start_hour: 8,
            stop_hour: 16,
            start_date: '',
            stop_date: '',
            node_type: 'Customer',
            node_id: 'ad9b565d-9082-4808-99cd-32f2f09f63f2'
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            company: state => state.user.company,
            settings: state => state.user.company ? state.user.company.settings : null,
            filter: state => state.homepage.filter,
            cp_range: state => state.homepage.rangeFilter,
            cp_start_time: state => state.homepage.startTime,
            cp_end_time: state => state.homepage.endTime,
            peakSummary: state => state.peakchart.summary
        }),
        baseUrl() { return getBaseUrl() },
        settings() { return this.user.company ? this.user.company.settings : null },
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            var minutes = [60];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        backTo() { this.$router.back() },
        rangeSelect(range, from, to) {
            // console.log('rangeSelect', range, from, to)
            // console.log('rangeSelect', this.rangeFilter)
            this.rangeFilter.type = range
            this.dataFilters.start_date = from.toISOString()
            this.dataFilters.stop_date = to.toISOString()
        },
        selectLocation(value, label, item) {
            // console.log('selectLocation', value, label, item)
            this.locFilter = value
        },
        toTreeSummary() { this.$router.push({ name: 'tree-summary', query: { df: this.filter.value } }) },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        timeStartChange(time, hour) {
            // this.timeFilter.start = time
            this.dataFilters.start_hour = hour
        },
        timeEndChange(time, hour) {
            // this.timeFilter.end = time
            this.dataFilters.stop_hour = hour
        },
        filterMinute(minute) {
            this.minuteFilter = minute;
        },
        toLive() {
            this.$router.push({ name: 'occupancy' }) //, query: { bid: bid }
        }
    },
    created() {
        let query = this.$route.query
        let hasQuery = query.building && query.floor

        if (this.peakSummary && hasQuery) {
            let summary = JSON.parse(JSON.stringify(this.peakSummary))
            let building = summary.find(x => x.building_name == query.building)

            if (building) {
                this.building = building
                this.locations = building.floor_summary.map(f => {
                    return `${toOrdinal(f.floor)} Floor ${building.building_name}`
                })
                this.locFilter = `${query.floor} ${query.building}`
            }
        }
    }
}
</script>

<style lang="scss">
.bar-chart svg {
    pointer-events: initial;
}
</style>