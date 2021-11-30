<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <div class="graph-filters" v-if="dataLoaded">
                <graph-filter placeholder="Select Location" :filters="locations" :chosen="selectedLocation" :chosenAsSelected="true" @onSelect="locFilter" />
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
            <hierarchy-graph ref="hierarchyChart"
                :custData="summary" :floorData="peakSummary"
                :dataFilters="dataFilters"
                @dataLoaded="chartLoaded"
                @routeTo="graphRoute" />
            <div class="bottom-filters">
                <time-slider :from="timeFilter.start" :to="timeFilter.end"
                    @startChanged="timeStartChange" @endChanged="timeEndChange" />
                <graph-filter :filters="minuteFilters" :chosen="minuteFilter" :chosenAsSelected="true" position="top" @onSelect="filterMinute" />
            </div>
        </div>
        <div class="graph-footer">
            <div class="left-options">
                <template v-if="locationFilter && locationFilter.building">
                    <button class="btn btn-primary btn-small" @click="toLive">Live</button>
                    <button class="btn btn-primary btn-small"
                        @click="showReport(true)">
                        Report
                    </button>
                </template>
            </div>
            <div class="right-options">
                <checkbox label="Save to report" />
            </div>
        </div>
        <modal :show="filterReport" @close="showReport(false)">
            <template v-slot:header>
                <h2>Utilisation Report</h2>
            </template>
            <div>
                <div class="row">
                    <div class="col">
                        <div class="input-field">
                            <label>Covid Limit (%)</label>
                            <input type="number" v-model="rptFilters.limit">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-field">
                            <label>Report Period</label>
                            <select v-model="rptFilters.period">
                                <option
                                    v-for="p in reportPeriods"
                                    :key="p.id"
                                    :value="p.id"
                                >
                                    {{ p.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-field">
                            <label>Year</label>
                            <input type="number" v-model="rptFilters.year" ref="rptYear">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-field" v-if="rptFilters.period == 1">
                            <label>Week</label>
                            <week-select :year="rptFilters.year" v-model="rptFilters.week" />
                        </div>
                        <div class="input-field" v-if="rptFilters.period == 2">
                            <label>Month</label>
                            <select v-model="rptFilters.month">
                                <option v-for="(m, i) in monthList" :key="i"
                                    :value="i">
                                    {{ m }}
                                </option>
                            </select>
                        </div>
                        <div class="input-field" v-if="rptFilters.period == 3">
                            <label>Quarter</label>
                            <select v-model="rptFilters.quarter">
                                <option :value="1">1</option>
                                <option :value="2">2</option>
                                <option :value="3">3</option>
                                <option :value="4">4</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="viewReport">View report</button>
            </template>
        </modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getBaseUrl, toHour, toISOStart, toISOEnd, getMonthRange, extractLocations } from '@/helpers'
import { Checkbox, DateRangeToggle, GraphFilter, Modal, TimeSlider, WeekSelect } from "@/components"
import { HierarchyGraph } from '@/components/partials'
import { CaretIcon, CaretLeftIcon } from "@/components/icons"
export default {
    title: 'Peak Chart',
    components: {
        CaretIcon,
        CaretLeftIcon,
        Checkbox,
        DateRangeToggle,
        GraphFilter,
        Modal,
        TimeSlider,
        HierarchyGraph,
        WeekSelect
    },
    data: () => ({
        // user: null,
        barChart: null, floorSummary: null, axiosSrc: null,
        showPageOpts: false, showEmbed: false,
        rangeFilter: { type: 'today', start: null, end: null },
        timeFilter: { start: null, end: null },
        locations: [], // locationFilter: null,
        minuteFilter: 60,
        dataLoaded: false,
        dataFilters: {
            trigger: 6,
            start_hour: 8,
            stop_hour: 16,
            low_desk_filter: 0.2,
            start_date: '',
            stop_date: '',
            node_type: 'Customer',
            node_id: 'ad9b565d-9082-4808-99cd-32f2f09f63f2'
        },
        filterReport: false,
        reportPeriods: [],
        monthList: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        rptFilters: {
            period: 2,
            year: 0,
            quarter: 1,
            month: 1,
            week: 1,
            limit: 50
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            company: state => state.user.company,
            settings: state => state.user.company ? state.user.company.settings : null,
            summary: state => state.homepage.summary,
            filter: state => state.homepage.filter,
            locationFilter: state => state.homepage.locationFilter,
            cp_range: state => state.homepage.rangeFilter,
            cp_start_time: state => state.homepage.startTime,
            cp_end_time: state => state.homepage.endTime,
            peakSummary: state => state.peakchart.summary
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customer_summary: 'backend/api_customer_summary',
            api_graph_view: 'backend/api_graph_view'
        }),
        baseUrl() { return getBaseUrl() },
        // settings() { return this.user.company ? this.user.company.settings : null },
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            var minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        },
        selectedLocation() { return this.locationFilter?.value }
    },
    methods: {
        ...mapMutations({
            setRange: 'homepage/setRange',
            setSummary: 'homepage/setSummary',
            setPeakSummary: 'peakchart/setSummary',
            setLocation: 'homepage/setLocation'
        }),
        backTo() { this.$router.back() },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        rangeSelect(range, from, to) {
            this.dataLoaded = false
            this.setRange({ type: range, start: toISOStart(from), end: toISOEnd(to) })
            this.dataFilters.start_date = toISOStart(from)
            this.dataFilters.stop_date = toISOEnd(to)
        },
        chartLoaded(custData, floorSummary, fromCache) {
            if (!fromCache) {
                // console.log('chartLoaded', custData, floorSummary, fromCache)
                this.setSummary(custData)
                this.setPeakSummary(floorSummary)
            }

            // list locations (for dropdown)
            let locations = extractLocations(this.summary)
            
            if (this.locationFilter == null) this.setLocation(locations[0])
            
            this.locations = locations
            this.dataLoaded = true
        },
        locFilter(value, label, loc) {
            this.setLocation(loc)
            if (this.$refs.hierarchyChart) this.$refs.hierarchyChart.renderChart()
        },
        timeStartChange(time, hour) {
            this.dataLoaded = false
            this.dataFilters.start_hour = hour
        },
        timeEndChange(time, hour) {
            this.dataLoaded = false
            this.dataFilters.stop_hour = hour
        },
        filterMinute(minute) {
            this.minuteFilter = minute
            // this.dataFilters.trigger = minute
        },
        graphRoute(route, query) {
            // console.log('graph', route, query)
            this.$router.push({ name: route, query })
        },
        toTreeSummary() { this.$router.push({ name: 'tree-summary', query: { df: this.filter.value } }) },
        toLive() { this.$router.push({ name: 'occupancy', query: { bid: this.locationFilter.value } }) },
        async showReport(show) {
            if (show) {
                let clientPeriods = this.company && this.company.util_rpt_periods ? this.company.util_rpt_periods.split(',').map(x => parseInt(x)) : []

                if (!this.user.isSuper && clientPeriods.length == 0) {
                    this.$mdtoast(`You don't have a viewable report period, please contact Intuitive support.`, { type: 'error', duration: 7500 })
                }
                else {
                    let { data } = await axios.get('/api/util-report/periods')

                    this.reportPeriods = data.periods.filter(p => clientPeriods.length > 0 ? clientPeriods.indexOf(p.id) >= 0 : true)
                    this.filterReport = true

                    setTimeout(() => { this.$refs.rptYear.focus() }, 0)
                }
            }
            else this.filterReport = show
        },
        viewReport() {
            let query = {
                cid: this.company.ref_id,
                bid: this.locationFilter.value,
                p: this.rptFilters.period,
                y: this.rptFilters.year,
                // m: this.rptFilters.month,
                sh: this.dataFilters.start_hour,
                eh: this.dataFilters.stop_hour,
                lr: this.rptFilters.limit
            }

            if (query.p == 1) query.w = this.rptFilters.week
            else if (query.p == 2) query.m = this.rptFilters.month
            else if (query.p == 3) query.q = this.rptFilters.quarter

            let route = this.$router.resolve({ name: 'utilisation-rpt', query })

            window.open(route.href, '_blank')
        }
    },
    created() {
        let now = new Date()

        if (this.cp_range.type) {
            this.rangeFilter = JSON.parse(JSON.stringify(this.cp_range))
            this.dataFilters.start_date = this.rangeFilter.start
            this.dataFilters.stop_date = this.rangeFilter.end

            let start = this.rangeFilter.start
            let from = new Date(start.substring(0, start.indexOf('T')))
            let year = from.getFullYear()
            let month = from.getMonth()
            this.rptFilters.year = year
            this.rptFilters.month = month
            this.rptFilters.limit = year >= 2020 && month >= 2 ? 50 : 100
        }
        else {
            let start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23)
            
            this.rangeFilter.type = 'today'
            this.rangeFilter.start = this.dataFilters.start_date = toISOStart(start)
            this.rangeFilter.end = this.dataFilters.stop_date = toISOEnd(end)

            let year = now.getFullYear()
            let month = now.getMonth()
            this.rptFilters.year = now.getFullYear()
            this.rptFilters.month = now.getMonth()
            this.rptFilters.year = year
            this.rptFilters.month = month
            this.rptFilters.limit = year >= 2020 && month >= 2 ? 50 : 100

            this.setRange({ type: 'today', start: toISOStart(start), end: toISOEnd(end) })
        }

        if (this.cp_start_time) {
            this.dataFilters.start_hour = this.timeFilter.start = this.cp_start_time
            this.dataFilters.stop_hour = this.timeFilter.end = this.cp_end_time
        }
        else if (this.settings) {
            this.dataFilters.start_hour = this.timeFilter.start = toHour(this.settings.start_time)
            this.dataFilters.stop_hour = this.timeFilter.end = toHour(this.settings.end_time)
        }

        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id
    },
    mounted() {}
}
</script>