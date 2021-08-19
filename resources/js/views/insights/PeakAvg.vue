<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" :active="rangeFilter.type" />
            <div class="graph-filters" v-if="dataLoaded">
                <graph-filter placeholder="Select Location" :filters="locations" :chosen="selectedLocation" :chosenAsSelected="true" @onSelect="locFilter" />
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
            <hierarchy-graph
                :custData="summary" :floorData="peakSummary"
                :locFilter="locationFilter" :dataFilters="dataFilters"
                @dataLoaded="chartLoaded" />
            <div class="bottom-filters">
                <time-slider :from="timeFilter.start" :to="timeFilter.end"
                    @startChanged="timeStartChange" @endChanged="timeEndChange" />
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getBaseUrl, toHour, toISOStart, toISOEnd } from '@/helpers'
import { Checkbox, DateRangeToggle, GraphFilter, Modal, TimeSlider } from "@/components"
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
        HierarchyGraph
    },
    data: () => ({
        // user: null,
        barChart: null, floorSummary: null, axiosSrc: null,
        showPageOpts: false, showEmbed: false,
        rangeFilter: { type: 'today', start: null, end: null },
        timeFilter: { start: null, end: null },
        locations: [], locationFilter: null,
        minuteFilter: 60,
        dataLoaded: false,
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
            summary: state => state.homepage.summary,
            cp_range: state => state.homepage.rangeFilter,
            // cp_location: state => state.homepage.locationFilter,
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
            setSummary: 'homepage/setSummary',
            setPeakSummary: 'peakchart/setSummary'
        }),
        backTo() { this.$router.back() },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        rangeSelect(range, from, to) {
            this.dataLoaded = false
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
            let summary = JSON.parse(JSON.stringify(this.summary))
            let buildings = summary.building_summary
            let locations = [{ label: summary.customer, value: summary.customer }]
            let countries = [...new Set(buildings.map(x => x.building_country).sort())]

            countries.forEach(country => {
                locations.push({ label: country, value: country, country: true })
                let cities = [...new Set(buildings.filter(x => x.building_country == country).map(x => x.building_city).sort())]

                cities.forEach(city => {
                    locations.push({ label: city, value: city, city: true })

                    locations.push(...buildings.filter(x => x.building_country == country && x.building_city == city).map(x => {
                        return {
                            label: x.building_name,
                            value: x.building_name,
                            building: true
                        }
                    }).sort())
                })
            })
            
            if (this.locationFilter == null) this.locationFilter = locations[0]
            
            this.locations = locations
            this.dataLoaded = true
        },
        locFilter(value, label, loc) {
            // console.log('locFilter', value, label, loc)
            this.locationFilter = loc
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
        viewCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        toLive() {
            this.$router.push({ name: 'occupancy' }) //, query: { bid: bid }
        }
    },
    created() {
        if (this.cp_range.type) {
            this.rangeFilter = JSON.parse(JSON.stringify(this.cp_range))
            this.dataFilters.start_date = this.rangeFilter.start
            this.dataFilters.stop_date = this.rangeFilter.end
        }
        else {
            let now = new Date(),
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23)
            
            this.rangeFilter.type = 'today'
            this.rangeFilter.start = this.dataFilters.start_date = toISOStart(start)
            this.rangeFilter.end = this.dataFilters.stop_date = toISOEnd(end)
        }

        if (this.cp_start_time) {
            this.dataFilters.start_hour = this.timeFilter.start = this.cp_start_time
            this.dataFilters.stop_hour = this.timeFilter.end = this.cp_end_time
        }
        else if (this.settings) {
            this.dataFilters.start_hour = this.timeFilter.start = toHour(this.settings.start_time)
            this.dataFilters.stop_hour = this.timeFilter.end = toHour(this.settings.end_time)
        }

        // if (this.cp_location) this.locationFilter = this.cp_location
        if (this.$route.query.name) {
            let query = JSON.parse(JSON.stringify(this.$route.query))

            query.value = query.name
            this.locationFilter = query
        }

        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id
    },
    mounted() {}
}
</script>