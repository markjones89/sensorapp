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
                <span class="chart-title">{{ chartTitle }}</span>
                <span class="chart-subtitle floor-title" v-if="sensorMap && currentFloor">{{ currentFloor.name }}</span>
                <span class="chart-subtitle">({{ statDateRange }})</span>
            </div>
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <div class="tree-content">
                <div class="chart-wrapper" :class="{ 'map-view': sensorMap }">
                    <div class="tree-wrapper">
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
                    </div>
                    <div class="mapper">
                        <template v-if="mapperLoaded">
                            <div class="sensor-map" v-if="!dataError">
                                <div id="sensor-map"></div>
                                <p>{{ sensorMapText }}</p>
                            </div>
                            <div v-else class="error-display" style="height: 40vh">
                                <p>{{ dataError }}</p>
                                <a href="javascript:;" class="btn btn-primary" @click="renderMap" style="align-self:center;">Retry</a>
                            </div>
                        </template>
                        <div v-else style="height: 40vh">
                            <loader :show="!mapperLoaded" type="ripple"/>
                        </div>
                    </div>
                </div>
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
import floorMapper from '@/components/FloorMapper.js'
import axios from 'axios'
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
        },
        mapperLoaded: false, mapper: null, 
        sensorMap: false, currentFloor: null,
        sensorMapText: ''
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
            api_graph_view: 'backend/api_graph_view',
            api_building_overview: 'backend/api_building_overview',
            api_sensors_by_node: 'backend/api_sensors_by_node',
            api_low_performing_sensors: 'backend/api_low_performing_sensors'
        }),
        settings() { return this.user.company ? this.user.company.settings : null },
        baseUrl() { return getBaseUrl() },
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            var minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        },
        chartTitle() {
            return this.sensorMap ? 
                `Low Performing ${this.currentFloor && this.currentFloor.area == 'Desk Area' ? 'Workspaces' : 'Meeting Rooms'}` : 
                this.filter.btnLabel
        },
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
        backTo() {
            if (this.sensorMap) {
                this.sensorMap = false
                setTimeout(() => { this.mapperLoaded = false }, 250)
            }
            else this.$router.back()
        },
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

                nodes.value = (moneyValue ? sum : average)(summary.map(x => getObjValue(x, dataKey, 0)))

                let freeCats = /*dataKey == 'low_perform_workspace.average_percentage' ?
                [
                    { name: 'Number of Workspaces occupied < 20%', key: 'low_perform_workspace.average_percentage' },
                    { name: 'Number of Meeting Rooms occupied < 20%', key: '' }
                ] : */
                [
                    { name: dataKey == 'low_perform_workspace.average_percentage' ? 'Workspaces occupied < 20%' : 'Free Desks at Peak', key: 'free_workspace_utils.max', area: 'Desk Area' },
                    { name: dataKey == 'low_perform_workspace.average_percentage' ? 'Meeting Rooms occupied < 20%' : 'Free Meeting Rooms at Peak', key: 'free_meeting_room_occupancy.max', area: 'Meeting Room' }
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
                                    no: x.floor,
                                    bid: a.building_id,
                                    name: `${toOrdinal(x.floor)} Floor`,
                                    value: getObjValue(x, c.key, 0),
                                    number: true,
                                    floor: true,
                                    area: c.area
                                }
                            })
                        }

                        a.children.push(catDetails)
                    })

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

                let callbacks = dataKey == 'low_perform_workspace.average_percentage' ? {
                    viewFloor: (node) => {
                        // console.log('viewFloor.node', node)
                        let data = node.data
                        this.sensorMap = true
                        this.currentFloor = data
                        this.sensorMapText = `${data.value} ${data.area == 'Desk Area' ? 'Workspaces' : 'Meeting Rooms'} occupied < 20% of the period selected`
                        this.renderMap()
                    }
                } : null

                setTimeout(() => { collapsibleTree('#tree-summary', nodes, moneyValue, callbacks) }, 100)
            } catch (error) {
                console.error('renderTree', error, error.response?.data)
                this.dataError = 'Unable to retrieve data, please try again'
                this.loaded = true
            }
        },
        async renderMap() {
            try {
                let bid = this.currentFloor.bid
                let floorNum = this.currentFloor.no
                let areaType = this.currentFloor.area
                let statValue = this.currentFloor.value

                this.mapperLoaded = false
                this.axiosSrc = axios.CancelToken.source()

                let res = await axios.all([
                    axios.get(this.api_building_overview(this.dataFilters.node_id, bid), this.api_header(this.axiosSrc.token)),
                    axios.get('/api/floors', { params: { bid: bid } })
                ])
                let overview = res[0].data
                let floor = overview.children.find(x => x.number == floorNum)
                let floorRefs = res[1].data

                if (floor) {
                    let ref = floorRefs.find(x => x.ref_id == floor.id)

                    floor.floor_plan = ref?.floor_plan
                    floor.floor_plan_url = ref?.floor_plan ? `${getBaseUrl()}/plans/${ref.floor_plan}` : null
                    floor.areas = floor.children

                    delete floor.children
                }

                // let filters = Object.assign({}, this.dataFilters, {
                //     node_type: 'Floor', 
                //     node_id: floor.id,
                //     limit_ratio: 0.5
                // })
                let sensorData = await axios.all([
                    axios.get(this.api_sensors_by_node(floor.id, 'Floor'), this.api_header()),
                    // axios.post(this.api_low_performing_sensors, filters, this.api_header()),
                    axios.get('/api/sensors', { fid: floor.id })
                ])

                let sensors = sensorData[0].data,
                    refs = sensorData[1].data

                sensors.forEach(s => {
                    let map = refs.find(x => x.ref_id == s.id) //s.sensor_id

                    if (map) {
                        s.pos_x = map.pos_x
                        s.pos_y = map.pos_y
                        s.scale = map.scale
                    }
                    s.sensor_state = 'available'
                    s.area = floor.areas.find(x => x.id == s.parent_id)
                })

                let areaSensors = sensors.filter(x => x.area.type == areaType)
                
                if (areaType == 'Desk Area') floor.sensors = areaSensors.slice(0, statValue)
                else {
                    let areas = floor.areas.filter(a => a.type == areaType).slice(0, statValue).map(a => a.id)

                    floor.sensors = areaSensors.filter(x => areas.indexOf(x.area.id) >= 0)
                }

                this.mapperLoaded = true
                this.dataError = null
                setTimeout(() => { this.mapper = new floorMapper('#sensor-map', floor) }, 100)
            } catch (error) {
                this.mapperLoaded = true
                this.dataError = 'Unable to retrieve data, please try again'
                console.error('renderMap.error', error)
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
.floor-title {
    font-size: 18px !important;
    line-height: 24px !important;
    font-weight: 700;
    color: rgba(var(--app-text-rgb), 0.85) !important;
}

.tree-content {
    position: relative;
    width: 100%;
    margin-top: 20px;
    overflow: hidden;

    .chart-wrapper {
        position: relative;
        display: flex;
        width: 200%;
        flex-direction: row;
        flex-wrap: wrap;
        transform: translateX(0);
        transition: transform .25s cubic-bezier(0.4, 0.0, 0.2, 1);

        .tree-wrapper {
            position: relative;
            flex: 50%;
        }

        .mapper {
            position: relative;
            flex: 50%;

            .sensor-map {
                flex: 1 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 50vh;
            }
        }

        &.map-view {
            transform: translateX(-50%);
        }
    }
}
#tree-summary {
    margin: 24px auto;
    max-width: 100%;
    width: 1200px;
}
</style>

<style lang="scss">
[data-theme="light"] {
    #tree-summary {
        text {
            fill: #000 !important;

            &[stroke-width="3"] {
                stroke: #fff !important;
            }
        }
    }
}
</style>