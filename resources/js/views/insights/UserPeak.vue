<template>
    <div class="content">
        <template v-if="loaded && building">
            <div class="graph-header">
                <date-range-toggle @select="rangeSelect" />
                <div class="graph-filters">
                    <span class="graph-filter" @click="showFilter = !showFilter">
                        {{ bldgFilter ? bldgFilter : 'Select Building' }}
                        <span class="caret">
                            <caret-icon />
                        </span>
                        <filter-dropdown :filters="buildingFilters" :show="showFilter" @onSelect="filterSelect" />
                    </span>
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="toCostAnalysis">Cost Analysis</a>
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
                <div class="chart-header">
                    <span class="chart-title">{{ `${building.name} User Peak` }}</span>
                    <span class="chart-subtitle" v-if="areaFilter">{{ `(${areaFilter})` }}</span>
                </div>
                <div class="row">
                    <div class="col">
                        <div id="user-peak-chart"></div>
                    </div>
                    <div class="col-12 col-md-3" id="area-filter">
                        <span class="graph-filter" @click="showAreaFilter = !showAreaFilter">
                            {{ areaFilter ? areaFilter : 'Select Area' }}
                            <span class="caret">
                                <caret-icon />
                            </span>
                            <filter-dropdown :filters="areas" :show="showAreaFilter" @onSelect="filterByArea" />
                        </span>
                    </div>
                </div>
                <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <div class="clearfix"></div>
            </div>
            <div class="graph-footer">
                <div class="left-options">
                    <button class="btn btn-primary btn-small" @click="toLive">Live</button>
                </div>
                <div class="right-options">
                    <checkbox label="Save to report" />
                </div>
            </div>
        </template>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#area-filter {
    display: flex;
    justify-content: left;
    align-items: center;
}
</style>
<script>
import { store } from '../../store'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '../../components'
import areaChart from '../../components/graphs/AreaChart'

const api = {
    building: '/api/locations',
    floor: '/api/floors'
}

let dummy = []

function randomNum() {
    return Math.floor((Math.random() * 600) + 1)
}

export default {
    title: 'User Peak',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider },
    data() {
        return {
            user: null, loaded: false, showPageOpts: false, showEmbed: false,
            buildings: [], building: null,
            areas: ['All Areas', 'Department', 'Informal Meeting Spaces', 'Meeting Rooms', 'Workspace Desk Area'], 
            showFilter: false, showAreaFilter: false,
            chart: null, bldgFilter: null, areaFilter: 'All Areas',
            timeFilter: {
                start: null, end: null
            }
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null },
        buildingFilters() {
            return this.buildings.map(b => { return { value: b.hid, label: b.name } })
        }
    },
    methods: {
        backTo() { this.$router.back() },
        async getBuildings() {
            let company = store.getUserCompany()

            if (!company) return

            let { data } = await axios.get(api.building, { params: { cid: company.hid, lob: true } })

            this.buildings = data
            if (this.bldg_id) {
                this.building = data.find(b => b.hid === this.bldg_id)
            } else {
                this.building = data[0]
            }
            this.bldgFilter = this.building.name
            this.getFloors(this.building.hid, (chartData) => {
                this.loaded = true
                dummy = chartData
                setTimeout(() => {
                    this.renderChart(chartData.slice(0))
                }, 0);
            })
        },
        async getFloors(id, cb) {
            let { data } = await axios.get(api.floor, { params: { bid: id } })

            let sorted = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })

            return cb && cb(sorted.map(d => {
                return { label: `${d.ordinal_no} Floor`, xValue: d.floor_no, yValue: randomNum() }
            }))
        },
        filterSelect(value, label) {
            //TODO: filter building
            this.showFilter = false
            this.building = this.buildings.find(b => b.hid === value)
            this.bldgFilter = label//this.building.name
            this.getFloors(this.building.hid, (data) => {
                dummy = data
                this.chart.update(data.slice(0), true)
            })
        },
        toCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        rangeSelect(range, from, to) {},
        toLive() {
            this.$router.push({ name: 'live' })
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        renderChart(data) {
            this.chart = new areaChart('#user-peak-chart', data)
        },
        filterByArea(value, label) {
            this.showAreaFilter = false
            this.areaFilter = label
            // update chart data
            let data = dummy.slice(0).map(d => {
                return { label: d.label, xValue: d.xValue, yValue: randomNum() }
            })
            this.chart.update(data, true)
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        this.getBuildings()
    }
}
</script>