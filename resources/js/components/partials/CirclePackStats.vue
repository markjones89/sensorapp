<template>
    <div class="row" v-if="dataLoaded">
        <template v-if="!dataError">
            <div class="col">
                <div id="chart-wrapper">
                    <div id="circle-pack"></div>
                </div>
            </div>
            <div class="col-md-4" id="stats-wrapper">
                <div id="chart-stats">
                    <div class="stat-date">
                        {{ statDateRange }}
                    </div>
                    <span class="chart-stat">
                        <span @click="costClick">
                            {{ statsDisplay.first.label }}
                        </span>
                        <span class="stat-figure" @click="costClick">
                            {{ statsDisplay.first.value }}
                        </span>
                    </span>
                    <span class="chart-stat" v-if="statsDisplay.showCost">
                        <span @click="peakClick">Opportunity Cost</span>
                        <span class="stat-figure" @click="costClick">
                            {{ opportunityCost }}
                        </span>
                    </span>
                    <span class="chart-stat" v-if="statsDisplay.showPeak">
                        <span @click="peakClick">Peak Workspace Utilisation</span>
                        <span class="stat-figure" @click="peakClick">
                            {{ `${statsDisplay.peak_workspace_util}%` }}
                        </span>
                    </span>
                    <span class="chart-stat" v-if="statsDisplay.showAvg">
                        <span @click="peakClick">Average Work space Utilisation</span>
                        <span class="stat-figure" @click="peakClick">
                            {{ `${statsDisplay.average_workspace_util}%` }}
                        </span>
                    </span>
                    <span class="chart-stat">
                        <span @click="peakClick">Peak Meeting Room Occupancy</span>
                        <span class="stat-figure" @click="peakClick">
                            {{ `${statsDisplay.peak_meeting_room}%` }}
                        </span>
                    </span>
                    <span class="chart-stat">
                        <span @click="peakClick">User to workspace ratio</span>
                        <span class="stat-figure" @click="peakClick">
                            <!-- 1.5 to 1 -->
                            {{ statsDisplay.user_to_workspace_ratio }}
                        </span>
                    </span>
                    <span class="chart-stat">
                        <span @click="wfhClick">Work from home</span>
                        <span class="stat-figure" @click="wfhClick">
                            {{ `${statsDisplay.work_from_home}%` }}
                        </span>
                    </span>
                </div>
            </div>
        </template>
        <div v-else class="error-display" style="height: 60vh">
            <p>{{ dataError }}</p>
            <a href="javascript:;" class="btn btn-primary" @click="renderChart(true)" style="align-self:center;">Retry</a>
        </div>
    </div>
    <div v-else style="height: 60vh">
        <loader :show="!dataLoaded" type="ripple"/>
    </div>
</template>

<script>
import { Loader } from '@/components'
import { circlePack } from '@/components/graphs/CirclePack'
import { addEvent, removeEvent, sum, average, getObjValue, roundNum, dateRangeStr } from '@/helpers'
import { format as d3Format } from 'd3-format'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
    props: {
        custData: { type: Object },
        statFilter: { type: Object },
        dataFilters: { type: Object }
    },
    components: {
        Loader
    },
    data: () => ({
        circlePack: null, summary: null,
        dataLoaded: false, dataError: null, axiosSrc: null,
        statsDisplay: {
            first: {
                label: null,
                value: 0
            },
            opportunity_cost: 0,
            peak_workspace_util: 0,
            average_workspace_util: 0,
            peak_meeting_room: 0,
            user_to_workspace_ratio: 0,
            work_from_home: 0,
            showCost: false,
            showPeak: false,
            showAvg: false
        },
        isFilterPercent: false,
        zoomedLocation: null
    }),
    watch: {
        statFilter: function (value) {
            if (this.circlePack) {
                let _data = this.getCircleData(value)
                this.circlePack.setData(_data)
            }
        },
        dataFilters: {
            deep: true,
            handler(value) {
                if (this.axiosSrc) this.axiosSrc.cancel('Filters changed')
                if (this.circlePack) this.renderChart(true)
            }
        }
    },
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customer_summary: 'backend/api_customer_summary'
        }),
        ...mapState({
            locationFilter: state => state.homepage.locationFilter
        }),
        opportunityCost() { return d3Format('$,.2s')(this.statsDisplay.opportunity_cost) },
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
            setLocation: 'homepage/setLocation'
        }),
        costClick() { this.$emit('costClick') },
        peakClick() { this.$emit('peakClick', this.locationFilter ) },
        wfhClick() { this.$emit('wfhClick', this.locationFilter) },
        setStatsDisplay(data, isBuilding = false) {
            let stats = {}

            if (isBuilding) {
                if (Array.isArray(data)) {
                    stats = {
                        first: {
                            label: this.statFilter.boxLabel,
                            value: this.isFilterPercent ?
                                `${roundNum(average(data.map(x => getObjValue(x, this.statFilter.value))))}%` :
                                d3Format('$,.2s')(sum(data.map(x => getObjValue(x, this.statFilter.value))))
                        },
                        opportunity_cost: sum(data.map(x => x.opportunity_cost)),
                        peak_workspace_util: average(data.map(x => x.workspace_utils.max_percentage)),
                        average_workspace_util: average(data.map(x => x.workspace_utils.average_percentage)),
                        peak_meeting_room: average(data.map(x => x.meeting_room_occupancy.max_percentage)),
                        user_to_workspace_ratio: average(data.map(x => x.user_to_workspace_ratio)),
                        work_from_home: average(data.map(x => x.work_from_home.average_percentage))
                    }
                }
                else {
                    let firstValue = getObjValue(data, this.statFilter.value)
                    stats.first = {
                        label: this.statFilter.boxLabel,
                        value: this.isFilterPercent ? `${roundNum(firstValue, 1)}%` : d3Format('$,.2s')(firstValue)
                    }
                    stats.opportunity_cost = data.opportunity_cost
                    stats.peak_workspace_util = data.workspace_utils.max_percentage
                    stats.average_workspace_util = data.workspace_utils.average_percentage
                    stats.peak_meeting_room = data.meeting_room_occupancy.max_percentage
                    stats.user_to_workspace_ratio = data.user_to_workspace_ratio
                    stats.work_from_home = data.work_from_home.average_percentage
                }
            }

            this.statsDisplay.first = stats.first
            this.statsDisplay.opportunity_cost = stats.opportunity_cost
            this.statsDisplay.peak_workspace_util = roundNum(stats.peak_workspace_util, 1)
            this.statsDisplay.average_workspace_util = roundNum(stats.average_workspace_util, 1)
            this.statsDisplay.peak_meeting_room = roundNum(stats.peak_meeting_room, 1)
            this.statsDisplay.user_to_workspace_ratio = roundNum(stats.user_to_workspace_ratio, 2)
            this.statsDisplay.work_from_home = roundNum(stats.work_from_home, 1)

            this.statsDisplay.showCost = this.statFilter.value != 'opportunity_cost'
            this.statsDisplay.showPeak = this.statFilter.value != 'workspace_utils.max_percentage'
            this.statsDisplay.showAvg = this.statFilter.value != 'workspace_utils.average_percentage'

            // console.log('setStatsDisplay', data, this.statsDisplay, this.statFilter)
        },
        getCircleData(filter) {
            let _data = {},
                categories = [
                    { name: 'Workspaces in use', key: 'workspace_utils' },
                    { name: 'Free workspaces', key: 'free_workspace_utils' },
                    { name: 'Meeting Rooms in Use', key: 'meeting_room_occupancy' },
                    { name: 'Free Meeting Rooms', key: 'free_meeting_room_occupancy' }, 
                    { name: 'Workspaces used <20%', key: 'low_perform_workspace' }, 
                    { name: 'Occupancy Count', key: '' },
                    { name: 'Work from home %', key: 'work_from_home' }
                ],
                keys = ['building_country', 'building_city'],
                grouped = [],
                temp = { _: grouped }

            let summary = JSON.parse(JSON.stringify(this.summary))
            let nodes = { ID: summary.customer, name: summary.customer, children: [] }
            let stats = []

            summary.building_summary.forEach(a => {
                // stats
                categories.forEach(c => {
                    let stat = { ID: a.building_id, category: c.name }

                    stat.average = c.key == '' ? 0 : a[c.key].average
                    stat.avgPercent = c.key == '' ? 0 : a[c.key].average_percentage
                    stat.peak = c.key == '' ? 0 : a[c.key].max
                    stat.peakPercent = c.key == '' ? 0 : a[c.key].max_percentage

                    stats.push(stat)
                })

                // nodes
                let value = getObjValue(a, filter.value)
                a.ID = a.building_id
                a.name = a.building_name
                a.value = value > 0 ? value : 1
                a.value_stat = value

                keys.reduce((r, k) => {
                    if (!r[a[k]]) {

                        r[a[k]] = { _: [] }
                        
                        if (a[k]) {
                            let l = { ['name']: a[k], ['children']: r[a[k]]._ }
                            let type = k == 'building_country' ? '' : '_City'
                            let prefix = k == 'building_country' ? '' : `${a.building_country.replace(/\s/g,'')}_`

                            l.ID = `${prefix}${a[k].replace(/\s/g,'')}${type}`

                            if (k == 'building_country') l.building_country = true
                            else if (k == 'building_city') {
                                l.building_city = true
                                l.country = a.building_country
                            }

                            r._.push(l)
                        }
                    }
                    return r[a[k]]
                }, temp)._.push(a)
            })

            nodes.children = grouped

            _data.stats = stats
            _data.nodes = nodes
            _data.location = JSON.parse(JSON.stringify(this.locationFilter))
            _data.subtitle = this.statFilter.boxLabel

            if (filter.value == 'opportunity_cost') _data.moneyValue = true
            else _data.percentValue = true

            this.isFilterPercent = filter.value != 'opportunity_cost'

            return _data
        },
        async renderChart(refresh = false) {
            this.dataLoaded = false
            let dataFromCache = true
            try {
                if (this.summary == null || refresh) {
                    this.axiosSrc = axios.CancelToken.source()
                    let { data } = await axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token))

                    if (data.building_summary && data.building_summary.length == 0) {
                        this.dataError = "No results"
                        this.dataLoaded = true
                        return
                    }
                    else {
                        this.summary = data
                        dataFromCache = false
                    }
                }
                
                this.dataLoaded = true
                this.dataError = null
                this.$emit('dataLoaded',
                    JSON.parse(JSON.stringify(this.summary)),
                    dataFromCache)
                this.setStatsDisplay(this.summary.building_summary, true)

                let _data = this.getCircleData(this.statFilter)

                setTimeout(() => {
                    this.circlePack = new circlePack('#circle-pack', _data, {
                        zoomed: (node) => {
                            let focused = {}
                            if (node.data.building_name) {
                                this.setStatsDisplay(node.data, true)
                                focused = {
                                    building: true,
                                    label: node.data.building_name,
                                    value: node.data.ID
                                }
                            }
                            else if (node.data.building_country) {
                                let bldgSummary = this.summary.building_summary,
                                    buildings = bldgSummary.filter(x => x.building_country == node.data.name)

                                this.setStatsDisplay(buildings, true)
                                focused = {
                                    country: true,
                                    label: node.data.name,
                                    value: node.data.ID
                                }
                            }
                            else if (node.data.building_city) {
                                this.setStatsDisplay(node.data.children, true)
                                focused = {
                                    city: true,
                                    label: node.data.name,
                                    value: node.data.ID
                                }
                            }
                            else {
                                this.setStatsDisplay(this.summary.building_summary, true)
                                focused = { label: this.summary.customer, value: this.summary.customer }
                            }
                            
                            this.setLocation(focused)
                        },
                        moreInfo: (data) => {
                            // this.$router.push({ name: 'time' })
                            this.$emit('goToTime', data)
                        }
                    })
                }, 100)
            } catch (error) {
                // console.error('renderChart', error.response?.data)
                this.dataError = 'Unable to retrieve data, please try again'
                this.dataLoaded = true
            }
        },
        handlePackRedraw () { if (this.circlePack && this.dataLoaded) this.circlePack.reDraw() },
        zoomTo(location, fromDropdown = false) {
            if (this.circlePack) this.circlePack.zoomLocation(location, fromDropdown)
        }
    },
    mounted() {
        addEvent(window, 'resize', this.handlePackRedraw)

        if (this.custData) this.summary = JSON.parse(JSON.stringify(this.custData))
        
        this.renderChart()
    },
    destroyed() {
        removeEvent(window, 'resize', this.handlePackRedraw)

        if (this.circlePack) this.circlePack.cleanUp()

        if (this.axiosSrc) this.axiosSrc.cancel('Component destroyed')
    }
}
</script>

<style lang="scss" scoped>
#chart-wrapper {
    #circle-pack {
        position: relative;
    }
}

#stats-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 32px 0;

    #chart-stats {
        padding: 20px;
        background-color: var(--app-background-color);
        border-radius: 10px;
        border: 1px solid var(--app-box-border);

        .stat-date {
            font-size: 16px;
            line-height: 40px;
        }

        .chart-stat {
            display: flex;
            font-size: 14px;
            line-height: 40px;
            justify-content: space-between;

            .stat-figure {
                font-weight: bold;
            }

            span {
                cursor: pointer;
            }
        }
    }
}
</style>