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
                    <span class="chart-stat">
                        <span @click="costClick">Opportunity Cost</span>
                        <span class="stat-figure" @click="costClick">
                            <!-- $23.5M -->
                            {{ formatted_opportunity_cost }}
                        </span>
                    </span>
                    <span class="chart-stat">
                        <span @click="peakClick">Peak Workspace Utilisation</span>
                        <span class="stat-figure" @click="peakClick">
                            <!-- 65% -->
                            {{ `${statsDisplay.peak_workspace_util}%` }}
                        </span>
                    </span>
                    <span class="chart-stat">
                        <span @click="peakClick">Average Work space Utilisation</span>
                        <span class="stat-figure" @click="peakClick">
                            <!-- 52% -->
                            {{ `${statsDisplay.average_workspace_util}%` }}
                        </span>
                    </span>
                    <span class="chart-stat">
                        <span @click="peakClick">Peak Meeting Room Occupancy</span>
                        <span class="stat-figure" @click="peakClick">
                            <!-- 75% -->
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
                            <!-- 42% -->
                            {{ `${statsDisplay.work_from_home.toFixed(2)}%` }}
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
import { addEvent, removeEvent, sum, average, getObjValue } from '@/helpers'
import { format as d3Format } from 'd3-format'
import { mapGetters } from 'vuex'
export default {
    props: {
        custData: { type: Object },
        statFilter: { type: String },
        locFilter: { type: String },
        dataFilters: { type: Object }
    },
    components: {
        Loader
    },
    data: () => ({
        circlePack: null, summary: null,
        dataLoaded: false, dataError: null, axiosSrc: null,
        statsDisplay: {
            opportunity_cost: 0,
            peak_workspace_util: 0,
            average_workspace_util: 0,
            peak_meeting_room: 0,
            user_to_workspace_ratio: 0,
            work_from_home: 0
        },
        zoomedLocation: null
    }),
    watch: {
        statFilter: function (value) {
            if (this.circlePack) {
                let _data = this.getCircleData(value)
                this.circlePack.setData(_data)
            }
        },
        locFilter: function (value) {
            if (this.circlePack) this.circlePack.goTo(value)
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
        formatted_opportunity_cost() {
            return d3Format('$,.2s')(this.statsDisplay.opportunity_cost)
        }
    },
    methods: {
        costClick() { this.$emit('costClick') },
        peakClick() { this.$emit('peakClick', this.zoomedLocation ) },
        wfhClick() { this.$emit('wfhClick', this.zoomedLocation) },
        setStatsDisplay(data, isBuilding = false) {
            let stats = {}

            if (isBuilding) {
                if (Array.isArray(data)) {
                    stats = {
                        opportunity_cost: sum(data.map(x => x.opportunity_cost)),
                        peak_workspace_util: average(data.map(x => x.workspace_utils.max_percentage)),
                        average_workspace_util: average(data.map(x => x.workspace_utils.average_percentage)),
                        peak_meeting_room: average(data.map(x => x.meeting_room_occupancy.max_percentage)),
                        user_to_workspace_ratio: average(data.map(x => x.user_to_workspace_ratio)),
                        work_from_home: average(data.map(x => x.work_from_home.average_percentage))
                    }
                } else {
                    stats.opportunity_cost = data.opportunity_cost
                    stats.peak_workspace_util = data.workspace_utils.max_percentage
                    stats.average_workspace_util = data.workspace_utils.average_percentage
                    stats.peak_meeting_room = data.meeting_room_occupancy.max_percentage
                    stats.user_to_workspace_ratio = data.user_to_workspace_ratio
                    stats.work_from_home = data.work_from_home.average_percentage
                }
            } else {
                stats.opportunity_cost = data.opportunity_cost
                stats.peak_workspace_util = data.workspace_utils.max_percentage
                stats.average_workspace_util = data.workspace_utils.average_percentage
                stats.peak_meeting_room = data.meeting_room_occupancy.max_percentage
                stats.user_to_workspace_ratio = data.user_to_work_space_ratio
                stats.work_from_home = data.work_from_home.average_percentage
            }

            this.statsDisplay.opportunity_cost = stats.opportunity_cost
            this.statsDisplay.peak_workspace_util = Math.round(stats.peak_workspace_util)
            this.statsDisplay.average_workspace_util = Math.round(stats.average_workspace_util)
            this.statsDisplay.peak_meeting_room = Math.round(stats.peak_meeting_room)
            this.statsDisplay.user_to_workspace_ratio = stats.user_to_workspace_ratio
            this.statsDisplay.work_from_home = Math.round(stats.work_from_home)

            // console.log('setStatsDisplay', isBuilding, data, this.statsDisplay)
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
            let nodes = { ID: '', name: summary.customer, children: [] }
            let stats = []

            summary.building_summary.forEach(a => {
                // stats
                categories.forEach(c => {
                    let stat = { ID: a.building_name.replace(/\s/g,''), category: c.name }

                    stat.average = c.key == '' ? 0 : a[c.key].average
                    stat.avgPercent = c.key == '' ? 0 : a[c.key].average_percentage
                    stat.peak = c.key == '' ? 0 : a[c.key].max
                    stat.peakPercent = c.key == '' ? 0 : a[c.key].max_percentage

                    stats.push(stat)
                })

                // nodes
                a.ID = a.building_name.replace(/\s/g,'')
                a.name = a.building_name
                a.value = a.opportunity_cost
                // a.value_stat = a[filter]
                a.value_stat = getObjValue(a, filter)

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
            /* let res = await axios.all([
                axios.get('/data/circle-pack-category.json'),
                axios.get('/data/circle-pack.json')
            ]) */

            _data.stats = stats //res[0].data
            _data.nodes = nodes //res[1].data
            _data.location = this.locFilter

            if (filter == 'opportunity_cost') _data.moneyValue = true
            else _data.percentValue = true

            return _data
        },
        async renderChart(refresh = false) {
            this.dataLoaded = false
            let dataFromCache = true
            try {
                if (this.summary == null || refresh) {
                    this.axiosSrc = axios.CancelToken.source()
                    let { data } = await axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token))

                    // if (!data.building_summary) {
                    //     this.dataError = data
                    //     this.dataLoaded = true
                    //     return
                    // }
                    // else 
                    if (data.building_summary && data.building_summary.length == 0) {
                        this.dataError = "No results"
                        this.dataLoaded = true
                        return
                    }
                    else {
                        // this.setSummary(data)
                        // this.setLocation(data.customer)
                        this.summary = data
                        dataFromCache = false
                    }
                }
                
                this.dataLoaded = true
                this.dataError = null
                this.$emit('dataLoaded',
                    JSON.parse(JSON.stringify(this.summary)),
                    dataFromCache)
                this.setStatsDisplay(this.summary)
                // this.locations = [this.summary.customer, ...new Set(this.summary.building_summary.map(x => x.building_country).sort())]

                let _data = this.getCircleData(this.statFilter)

                setTimeout(() => {
                    this.circlePack = new circlePack('#circle-pack', _data, {
                        zoomed: (node) => {
                            if (node.data.building_name) {
                                this.setStatsDisplay(node.data, true)
                                this.zoomedLocation = {
                                    building: true,
                                    name: node.data.building_name
                                }
                            }
                            else if (node.data.building_country) {
                                let bldgSummary = this.summary.building_summary,
                                    buildings = bldgSummary.filter(x => x.building_country == node.data.name)
                                    
                                // console.log('zoomed.countryStats', countryStats)
                                this.setStatsDisplay(buildings, true)
                                this.zoomedLocation = {
                                    country: true,
                                    name: node.data.name
                                }
                            }
                            else if (node.data.building_city) {
                                // let bldgSummary = this.summary.building_summary,
                                //     buildings = bldgSummary.filter(x => x.building_country == node.data.country && x.building_city == node.data.name)
                                    
                                // console.log('zoomed.cityStats', cityStats)
                                this.setStatsDisplay(node.data.children, true)
                                this.zoomedLocation = {
                                    city: true,
                                    name: node.data.name
                                }
                            }
                            else {
                                this.setStatsDisplay(this.summary)
                                this.zoomedLocation = null
                            }
                            
                            this.$emit('circleFocus', this.zoomedLocation)
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
        handlePackRedraw () { if (this.circlePack && this.dataLoaded) this.circlePack.reDraw() }
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
        background-color: #393846;
        border-radius: 10px;

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