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
import { mapState, mapGetters } from "vuex";
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '../../components'
import areaChart from '../../components/graphs/AreaChart'
import { toOrdinal } from '../../helpers'

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
            // user: null, 
            loaded: false, showPageOpts: false, showEmbed: false,
            buildings: [], building: null,
            areas: ['All Areas', 'Department', 'Informal Meeting Spaces', 'Meeting Rooms', 'Workspace Desk Area'], 
            showFilter: false, showAreaFilter: false,
            chart: null, bldgFilter: null, areaFilter: 'All Areas',
            timeFilter: {
                start: null, end: null
            },
            minuteFilter: '10 minutes', showMinuteFilter: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.user,
            filter: state => state.homepage.filter
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers',
            api_buildings: 'backend/api_buildings',
            api_floors: 'backend/api_floors'
        }),
        settings() { return this.user.company ? this.user.company.settings : null },
        buildingFilters() {
            return this.buildings.map(b => { return { value: b.id, label: b.name } })
        },
        minuteFilters() {
            var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        backTo() { this.$router.back() },
        async getBuildings() {
            let compId = this.user.company_id

            let { data } = await axios.get(this.api_buildings(compId), this.api_header())

            this.buildings = data
            if (this.bldg_id) {
                this.building = data.find(b => b.id === this.bldg_id)
            } else {
                this.building = data[0]
            }
            this.bldgFilter = this.building.name

            let chartData = await this.getFloors(this.building.id)
            
            this.loaded = true
            dummy = chartData

            setTimeout(() => {
                this.renderChart(chartData.slice(0))
            }, 0)
        },
        async getFloors(id) {
            let compId = this.user.company_id

            let { data } = await axios.get(this.api_floors(compId, id), this.api_header())

            data.forEach(f => f.ordinal_no = toOrdinal(f.number))

            let sorted = data.sort((a, b) => {
                if (a.number > b.number) return 1
                if (a.number < b.number) return -1
                return 0
            })

            this.floors = sorted.slice(0)

            return sorted.map(d => {
                return { label: `${d.ordinal_no} Floor`, xValue: d.number, yValue: randomNum() }
            })
        },
        async filterSelect(value, label) {
            //TODO: filter building
            let current = this.building.id

            this.showFilter = false
            this.building = this.buildings.find(b => b.id === value)
            this.bldgFilter = label//this.building.name
            
            if (current == value) {
                let data = dummy.slice(0).map(d => {
                    return { label: d.label, xValue: d.xValue, yValue: randomNum() }
                })

                this.chart.update(data, true)
            } else {
                let data = await this.getFloors(this.building.id)
            
                dummy = data
                this.chart.update(data.slice(0), true)
            }
        },
        toTreeSummary() { this.$router.push({ name: 'tree-summary', query: { df: this.filter.value } }) },
        rangeSelect(range, from, to) {},
        toLive() {
            this.$router.push({ name: 'occupancy', query: { bid: this.building.id } })
            //this.$router.push({ name: 'live', query: { bid: this.building.hid, fid: fid } })
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
        },
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
    mounted() {
        this.getBuildings()
    }
}
</script>