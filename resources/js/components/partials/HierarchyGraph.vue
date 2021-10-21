<template>
    <div v-if="dataLoaded" id="hierarchy-graph">
        <template v-if="!dataError">
            <div class="chart-header">
                <span class="chart-title">{{ graphTitle }}</span>
                <span class="chart-subtitle">{{ subtitle }}</span>
            </div>
            <div id="peak-chart"></div>
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
import { mapGetters, mapMutations, mapState } from 'vuex'
import { Loader } from '@/components'
import { getObjValue, toOrdinal } from '@/helpers'
import hierarchyBarChart from '@/components/graphs/HierarchyBar'
export default {
    props: {
        custData: { type: Object },
        floorData: { type: Array },
        dataFilters: { type: Object }
    },
    components: {
        Loader
    },
    data: () => ({
        dataLoaded: false, dataError: null, barChart: null, 
        summary: null, floorSummary: null, axiosSrc: null,
        graphTitle: 'Building Name',
        subtitle: 'Click the orange bar for more info or click the blank space to go back'
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customer_summary: 'backend/api_customer_summary',
            api_graph_view: 'backend/api_graph_view'
        }),
        ...mapState({
            locFilter: state => state.homepage.locationFilter
        })
    },
    watch: {
        dataFilters: {
            deep: true,
            handler() {
                if (this.axiosSrc) this.axiosSrc.cancel('Filters changed')
                this.renderChart(true)
            }
        }
    },
    methods: {
        getChartData() {
            let categories = [
                    { name: 'Meeting Room Occupancy Average', key: 'meeting_room_occupancy.average_percentage' },
                    { name: 'Meeting Room Occupancy Peak', key: 'meeting_room_occupancy.max_percentage' },
                    { name: 'Meeting Room Efficiency Average', key: 'meeting_room_efficiency.average_percentage' },
                    { name: 'Meeting Room Efficiency Peak', key: 'meeting_room_efficiency.max_percentage' },
                    { name: 'Workspace Utilisation Average', key: 'work_space_utils.average_percentage' },
                    { name: 'Workspace Utilisation Peak', key: 'work_space_utils.max_percentage' },
                    { name: 'Low performing spaces', key: 'low_perform_workspace.average_percentage' }
                ],
                groupKeys = []

            let summary = JSON.parse(JSON.stringify(this.summary))
            let graphTitle = summary.customer
            let nodes = {
                title: graphTitle,
                subtitle: 'Click the orange bar for more info or click the blank space to go back',
                name: graphTitle, 
                children: []
            }
            let buildings = summary.building_summary
            
            if (this.locFilter && this.locFilter.value != summary.customer) {
                let location = this.locFilter.value

                nodes.title = this.locFilter.label
                nodes.name = location
                // graphTitle = location
                graphTitle = this.locFilter.label

                console.log('getChartData', this.locFilter, nodes)

                if (this.locFilter.country) {
                    groupKeys = ['building_city']
                }
                // if (filter) buildings = summary.building_summary.filter(x => x[filter] == location)

                if (this.locFilter.country) buildings = summary.building_summary.filter(x => x.building_country.replace(/\s/g,'') == location)
                else if (this.locFilter.city) buildings = summary.building_summary.filter(x => `${x.building_country}_${x.building_city}_City`.replace(/\s/g,'') == location)
                else if (this.locFilter.building) buildings = summary.building_summary.filter(x => x.building_id == location)
            }
            else groupKeys = ['building_country', 'building_city']

            let formatFloorSummary = (a, dataKey) => {
                let floorSummary = this.floorSummary.find(x => x.building_name == a.building_name)

                if (floorSummary) {
                    return floorSummary.floor_summary.map(f => {
                        let floor = {
                            name: `${toOrdinal(f.floor)} Floor`,
                            floor: f.floor,
                            title: `${toOrdinal(f.floor)} Floor ${a.building_name}`,
                            value: getObjValue(f, dataKey)
                        }

                        if (f.area_summary)
                            floor.children = f.area_summary.map(area => {
                                return {
                                    name: area.group_id,
                                    value: getObjValue(area, dataKey) || 0,
                                    route: 'bar-chart',
                                    routeParams: {
                                        building: a.building_name,
                                        floor: floor.name
                                    }
                                }
                            })

                        return floor
                    })
                }
            }
            
            categories.forEach(c => {
                let grouped = [],
                    temp = { _: grouped },
                    dataKey = c.key

                delete c.key
                c.title = graphTitle
                c.subtitle = c.name
                
                if (this.locFilter?.building) {
                    let building = buildings.find(x => x.building_id == this.locFilter.value)
                    let floors = formatFloorSummary(building, dataKey)

                    if (floors) c.children = floors
                }
                else {
                    buildings.forEach(a => {
                        let bldg = {
                            // ID: a.building_name.replace(/\s/g,''),
                            ID: a.building_id,
                            name: a.building_name,
                            title: a.building_name
                            // value: getObjValue(a, dataKey, null)
                        }
                        let floors = formatFloorSummary(a, dataKey)

                        if (floors) bldg.children = floors

                        groupKeys.reduce((r, k) => {
                            if (!r[a[k]]) {

                                r[a[k]] = { _: [] }
                                
                                if (a[k]) {
                                    let l = { ['name']: a[k], ['children']: r[a[k]]._ }
                                    let type = k == 'building_country' ? '' : '_City'
                                    let prefix = k == 'building_country' ? '' : `${a.building_country.replace(/\s/g,'')}_`

                                    l.ID = `${prefix}${a[k].replace(/\s/g,'')}${type}`
                                    l.title = a[k]

                                    if (k == 'building_country') l.building_country = true
                                    else if (k == 'building_city') {
                                        l.building_city = true
                                        l.country = a.building_country
                                    }

                                    r._.push(l)
                                }
                            }
                            return r[a[k]]
                        }, temp)._.push(bldg)
                    })

                    c.children = grouped
                }
            })

            nodes.children = categories

            console.log('getChartData.nodes', nodes)

            return nodes
        },
        async renderChart(refresh = false) {
            this.dataLoaded = false
            let dataFromCache = true
            let doRequest = this.summary == null || this.floorSummary == null || refresh
            try {
                if (doRequest) {
                    this.axiosSrc = axios.CancelToken.source()

                    if (this.summary == null || refresh) {
                        let res = await axios.all([
                            axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token)),
                            axios.post(this.api_graph_view, this.dataFilters, this.api_header(this.axiosSrc.token))
                        ])

                        this.summary = res[0].data
                        this.floorSummary = res[1].data
                    } else {
                        let { data } = await axios.post(this.api_graph_view, this.dataFilters, this.api_header(this.axiosSrc.token))

                        this.floorSummary = data
                    }
                    dataFromCache = false
                }

                this.dataLoaded = true
                this.dataError = null
                this.$emit('dataLoaded',
                    JSON.parse(JSON.stringify(this.summary)),
                    JSON.parse(JSON.stringify(this.floorSummary)),
                    dataFromCache)

                // format data for chart
                let _data = this.getChartData()

                setTimeout(() => {
                    hierarchyBarChart('#peak-chart', _data, {
                        events : {
                            // goBack: () => {
                            //     this.$router.back()
                            // },
                            routeTo: (node) => {
                                this.routeTo(node.route, node.routeParams)
                            },
                            breakBar: (bar) => {
                                if (bar.title) this.graphTitle = bar.title
                                if (bar.subtitle) this.subtitle = bar.subtitle
                            },
                            mergeBar: (bar) => {
                                if (bar.title) this.graphTitle = bar.title
                                if (bar.subtitle) this.subtitle = bar.subtitle
                            }
                        }
                    })
                }, 100)
            } catch (error) {
                console.error('renderChart', error, error.response?.data)
                this.dataError = 'Unable to retrieve data, please try again'
                this.dataLoaded = true
            }
        },
        routeTo(route, params) {
            this.$emit('routeTo', route, params)
        }
    },
    mounted() {
        if (this.custData) this.summary = JSON.parse(JSON.stringify(this.custData))

        if (this.floorData) this.floorSummary = JSON.parse(JSON.stringify(this.floorData))

        this.renderChart()
    },
    destroyed() {
        if (this.axiosSrc) this.axiosSrc.cancel('Component destroyed')
    }
}
</script>

<style lang="scss">
.hierarchy-chart {
    pointer-events: initial;
    transition: height 750ms;
}
</style>