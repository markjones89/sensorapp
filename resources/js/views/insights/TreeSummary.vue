<template>
    <div class="content">
        <div class="graph-header">
            <div class="page-back">
                <div class="back-button" @click="backTo">
                    <button class="btn btn-primary btn-small">
                        <caret-left-icon />
                    </button>
                    Back
                </div>
            </div>
            <template v-if="loaded">
                <div class="graph-filters" v-if="loaded">
                    <stat-filter @filterSelect="filterSelect"></stat-filter>
                </div>
                <!-- <div class="graph-filters"></div> -->
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
            </template>
        </div>
        <div class="graph-content">
            <div class="chart-header">
                <span class="chart-title">{{ filter.btnLabel }}</span>
                <span class="chart-subtitle">{{ statDateRange }}</span>
            </div>
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <template v-if="loaded">
                <div id="tree-summary" v-if="!dataError"></div>
                <div v-else class="error-display" style="height: 40vh">
                    <p>{{ dataError }}</p>
                    <a href="javascript:;" class="btn btn-primary" @click="renderTree(true)" style="align-self:center;">Retry</a>
                </div>
            </template>
            <div v-else style="height: 40vh">
                <loader :show="!loaded" type="ripple"/>
            </div>
            <div class="bottom-filters">
                <time-slider :from="timeFilter.start" :to="timeFilter.end"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <span class="graph-filter" @click="showMinuteFilter = !showMinuteFilter">
                    {{ minuteFilterLbl ? minuteFilterLbl : 'Select' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="minuteFilters" position="top" :show="showMinuteFilter" @onSelect="filterMinute" />
                </span>
            </div>
        </div>
        <div class="graph-footer">
            <div class="left-options"></div>
            <div class="right-options">
                <checkbox label="Save to report" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getBaseUrl, sum, toHour, toISOStart, toISOEnd, getObjValue, dateRangeStr, average, clearEl, toOrdinal } from '@/helpers'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '@/components'
import { CaretIcon, CaretLeftIcon } from '@/components/icons'
import { StatFilter } from '@/components/partials'
import { collapsibleTree } from '@/components/graphs/CollapsibleTree'
export default {
    // props: ['data_filter'],
    components: {
        CaretIcon,
        CaretLeftIcon,
        Checkbox,
        DateRangeToggle,
        FilterDropdown,
        Loader,
        TimeSlider,
        StatFilter
    },
    title: 'Summary',
    data: () => ({
        loaded: false, showPageOpts: false, showEmbed: false,
        timeFilter: {
            start: null, end: null
        },
        minuteFilterLbl: '60 minutes', showMinuteFilter: false, axiosSrc: null,
        dataError: null,
        dataFilters: {
            trigger: 6,
            start_hour: 8,
            stop_hour: 16,
            low_desk_filter: 0.2,
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
            summary: state => state.homepage.summary,
            floorSummary: state => state.peakchart.summary,
            filter: state => state.homepage.filter,
            rangeFilter: state => state.homepage.rangeFilter,
            startTimeFilter: state => state.homepage.startTime,
            endTimeFilter: state => state.homepage.endTime,
            // periodFilter: state => state.homepage.periodFilter
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customer_summary: 'backend/api_customer_summary',
            api_graph_view: 'backend/api_graph_view'
        }),
        settings() { return this.user.company ? this.user.company.settings : null },
        baseUrl() { return getBaseUrl() },
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            var minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        },
        // dataFilter() { return this.filters.find(x => x.value == (this.data_filter || 'opportunity_cost')) },
        statDateRange() {
            let start = this.dataFilters.start_date
            let end = this.dataFilters.stop_date
            let from = new Date(start.substring(0, start.indexOf('T')))
            let to = new Date(end.substring(0, end.indexOf('T')))

            return dateRangeStr(from, to)
        }
    },
    methods: {
        ...mapMutations({
            setSummary: 'homepage/setSummary',
            setPeakSummary: 'peakchart/setSummary',
            setRange: 'homepage/setRange',
            setTime: 'homepage/setTime'
        }),
        backTo() { this.$router.back() },
        rangeSelect(range, from, to) {
            let isoStart = toISOStart(from)
            let isoEnd = toISOEnd(to)

            // console.log('rangeSelect', range, isoStart, isoEnd)

            this.setRange({ type: range, start: isoStart, end: isoEnd })
            this.dataFilters.start_date = isoStart
            this.dataFilters.stop_date = isoEnd

            if (this.axiosSrc) this.axiosSrc.cancel('Date range selected')
            clearEl('#tree-summary')
            this.renderTree(true)
        },
        filterSelect() {
            clearEl('#tree-summary')
            this.renderTree() 
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async renderTree(refresh = false) {
            let keys = ['building_country', 'building_city'],
                grouped = [],
                temp = { _: grouped },
                dataKey = this.filter.value,
                moneyValue = dataKey == 'opportunity_cost'

            this.loaded = false

            let doRequest = this.summary == null || this.floorSummary == null || refresh

            try {
                if (doRequest) {
                    this.axiosSrc = axios.CancelToken.source()
                    // let { data } = await axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token))

                    // if (!data.building_summary) {
                    //     this.dataError = data
                    //     this.loaded = true
                    //     return
                    // }
                    // else if (data.building_summary && data.building_summary.length == 0) {
                    //     this.dataError = "No results"
                    //     this.loaded = true
                    //     return
                    // }
                    // else {
                    //     this.dataError = null
                    //     this.setSummary(data)
                    // }
                    if (this.summary == null || refresh) {
                        let res = await axios.all([
                            axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token)),
                            axios.post(this.api_graph_view, this.dataFilters, this.api_header(this.axiosSrc.token))
                        ])

                        this.setSummary(res[0].data)
                        this.setPeakSummary(res[1].data)
                    } else {
                        let { data } = await axios.post(this.api_graph_view, this.dataFilters, this.api_header(this.axiosSrc.token))

                        this.setPeakSummary(data)
                    }
                }

                this.loaded = true
                this.dataError = null

                let nodes = { ID: '', name: this.summary.customer, children: [] }
                let summary = JSON.parse(JSON.stringify(this.summary.building_summary))
                let floorSummary = JSON.parse(JSON.stringify(this.floorSummary))

                // nodes.value = summary.map(x => x.opportunity_cost).reduce((a, b) => a + b, 0)
                nodes.value = (moneyValue ? sum : average)(summary.map(x => getObjValue(x, dataKey, 0)))

                let freeCats = [
                    { name: 'Free Desks at Peak', key: 'free_workspace_utils.max' },
                    { name: 'Free Meeting Rooms at Peak', key: 'free_meeting_room_occupancy.max' }
                ]

                summary.forEach(a => {
                    let fsBldg = floorSummary.find(x => x.building_id == a.building_id)

                    // nodes
                    a.name = a.building_name
                    // a.value = a.opportunity_cost
                    a.value = getObjValue(a, dataKey, 0)

                    // free desks/meeting at peak
                    a.children = []
                    freeCats.forEach(c => {
                        let catDetails = {
                            name: c.name,
                            value: getObjValue(a, c.key, 0),
                            number: true
                        }

                        if (fsBldg) {
                            catDetails.children = fsBldg.floor_summary.map(x => {
                                return {
                                    name: `${toOrdinal(x.floor)} Floor`,
                                    value: getObjValue(x, c.key, 0),
                                    number: true
                                }
                            })
                        }

                        a.children.push(catDetails)
                    })
                    // a.children = [
                    //     { name: 'Free Desks at Peak', value: a.free_workspace_utils.max, number: true },
                    //     { name: 'Free Meeting Rooms at Peak', value: a.free_meeting_room_occupancy.max, number: true },
                    // ]

                    keys.reduce((r, k) => {
                        if (!r[a[k]]) {

                            r[a[k]] = { _: [] }
                            
                            if (a[k]) {
                                let l = { ['name']: a[k], ['children']: r[a[k]]._ }

                                if (k === 'building_country') {
                                    let buildings = summary.filter(x => x[k] == a[k])
                                    
                                    // l.value = sum(buildings.map(x => x.opportunity_cost))
                                    l.value = (moneyValue ? sum : average)(buildings.map(x => getObjValue(x, dataKey, 0)))
                                    l.building_country = true
                                }
                                else if (k === 'building_city') {
                                    let buildings = summary.filter(x => x[k] == a[k])

                                    // l.value = sum(buildings.map(x => x.opportunity_cost))
                                    l.value = (moneyValue ? sum : average)(buildings.map(x => getObjValue(x, dataKey, 0)))
                                    l.building_city = true
                                }

                                r._.push(l)
                            }
                        }
                        return r[a[k]]
                    }, temp)._.push(a)
                })

                nodes.children = grouped

                this.loaded = true

                setTimeout(() => { collapsibleTree('#tree-summary', nodes, moneyValue) }, 100)   
            } catch (error) {
                console.error('renderTree', error, error.response?.data)
                this.dataError = 'Unable to retrieve data, please try again'
                this.loaded = true
            }
        },
        timeStartChange(time, hour) {
            this.dataFilters.start_hour = hour
            // this.timeFilter.start = time
            this.setTime({ start: hour, end: this.dataFilters.stop_hour })

            if (this.axiosSrc) this.axiosSrc.cancel('Start time updated')
            clearEl('#tree-summary')
            this.renderTree(true)
        },
        timeEndChange(time, hour) {
            this.dataFilters.stop_hour = hour
            // this.timeFilter.end = time
            this.setTime({ start: this.dataFilters.start_hour, end: hour })

            if (this.axiosSrc) this.axiosSrc.cancel('End time updated')
            clearEl('#tree-summary')
            this.renderTree(true)
        },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilterLbl = min.label;
        }
    },
    created() {
        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id

        if (this.rangeFilter.type == null) {
            let now = new Date(),
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23),
                isoStart = toISOStart(start),
                isoEnd = toISOEnd(end)

            this.dataFilters.start_date = isoStart
            this.dataFilters.stop_date = isoEnd
            this.setRange({ type: 'today', start: isoStart, end: isoEnd })
            // console.log('setRange', 'today', isoStart, isoEnd)
        }
        else {
            this.dataFilters.start_date = this.rangeFilter.start
            this.dataFilters.stop_date = this.rangeFilter.end
        }

        if (this.startTimeFilter) {
            this.dataFilters.start_hour = this.timeFilter.start = this.startTimeFilter
            this.dataFilters.stop_hour = this.timeFilter.end = this.endTimeFilter
        }
        else if (this.settings) {
            this.dataFilters.start_hour = this.timeFilter.start = toHour(this.settings.start_time)
            this.dataFilters.stop_hour = this.timeFilter.end = toHour(this.settings.end_time)
        }
    },
    mounted() {
        this.renderTree()
    }
}
</script>

<style lang="scss" scoped>
#tree-summary {
    margin: 24px auto;
    max-width: 100%;
    width: 1200px;
}
</style>