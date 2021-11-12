<template>
    <div class="content">
        <div class="graph-wrapper" v-if="loaded">
            <div class="graph-header">
                <div class="page-back">
                    <div class="back-button" @click="backTo">
                        <button class="btn btn-primary btn-small">
                            <caret-left-icon />
                        </button>
                        Back
                    </div>
                </div>
                <div class="graph-filters">
                        <span class="graph-filter" @click="showFilter = !showFilter">
                            {{ floorFilter ? floorFilter : 'Select Floor' }}
                            <span class="caret">
                                <caret-icon />
                            </span>
                            <filter-dropdown :filters="floorFilters" :show="showFilter" @onSelect="filterSelect" />
                        </span>
                        <a href="javascript:;" class="btn btn-primary ml-12" @click="toLive">Live</a>
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
                    <span class="chart-title">{{ `${floor.ordinal_no} Floor` }} Heat Map</span>
                    <span class="chart-subtitle">{{ building.name }}</span>
                </div>
                <date-range-toggle @select="rangeSelect" />
                <div id="live-view">
                    <div id="heat-map">
                        <div id="floor-map" class="floor-map"></div>
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
                <div class="left-options"></div>
                <div class="right-options">
                    <checkbox label="Save to report" />
                </div>
            </div>

        </div>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getBaseUrl, toOrdinal } from '@/helpers'
import { CaretIcon, CaretLeftIcon } from '@/components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '@/components'
import floorMapper from '@/components/FloorMapper'

const api = {
    building: '/api/locations',
    floor: '/api/floors',
    sensor: '/api/sensors'
}

export default {
    title: 'Heat Map',
    props: ['bldg_id', 'floor_id'],
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider },
    data: () => ({
        loaded: false,
        showPageOpts: false, showEmbed: false, showFilter: false,
        building: null, floors: [], floor: null, floorFilter: null, mapper: null,
        timeFilter: {
            start: null, end: null
        },
        minuteFilter: '10 minutes', showMinuteFilter: false
    }),
    computed: {
        ...mapState({
            user: state => state.user
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_building_overview: 'backend/api_building_overview',
            api_floors: 'backend/api_floors',
            api_sensors_by_node: 'backend/api_sensors_by_node'
        }),
        settings() { return this.user.company ? this.user.company.settings : null },
        baseUrl() { return getBaseUrl() },
        floorFilters() { return this.floors.map(f => { return { value: f.id, label: `${f.ordinal_no} Floor` } }) },
        minuteFilters() {
            var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        backTo() { this.$router.back() },
        async filterSelect(value, label) {
            this.showFilter = false
            this.floor = this.floors.find(f => f.id === value)
            this.floorFilter = label

            await this.getFloorData(value)
            this.mapper.setData(this.floor)
        },
        toLive() { this.$router.push({ name: 'live', query: { bid: this.bldg_id, fid: this.floor.id } }) },
        rangeSelect(range, from, to) {},
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async getBuilding(id) {
            let compId = this.user.company_id

            let res = await axios.all([
                axios.get(api.floor, { params: { bid: id } }),
                axios.get(this.api_building_overview(compId, id), this.api_header())
            ])

            let floorRefs = res[0].data,
                bldgOverview = res[1].data,
                floors = []

            bldgOverview.children.forEach(f => {
                let ref = floorRefs.find(x => x.ref_id == f.id)

                f.ordinal_no = toOrdinal(f.number)
                f.occupancy_limit = ref?.occupancy_limit
                f.floor_plan = ref?.floor_plan
                f.floor_plan_url = ref?.floor_plan ? `${this.baseUrl}/plans/${ref.floor_plan}` : null

                delete f.children
                delete f.building

                floors.push(f)
            })

            delete bldgOverview.children
            this.building = bldgOverview
            this.floors = floors.sort((a, b) => {
                if (a.number > b.number) return 1
                if (a.number < b.number) return -1
                return 0
            })

            let selected_floor = this.floor_id ? this.floor_id : this.floors[0].id

            this.floor = this.floors.find(f => f.id === selected_floor)
            this.floorFilter = `${this.floor.ordinal_no} Floor`

            await this.getFloorData(selected_floor)
            
            this.loaded = true
            setTimeout(() => { this.setFloorMap() }, 0)
        },
        async getFloorData(fid) {
            let res = await axios.all([
                axios.get(this.api_sensors_by_node(fid, 'Floor'), this.api_header()),
                axios.get(api.sensor, { fid: fid })
            ])

            let sensors = res[0].data,
                refs = res[1].data

            sensors.forEach(s => {
                let map = refs.find(x => x.ref_id == s.id)

                if (map) {
                    s.pos_x = map.pos_x
                    s.pos_y = map.pos_y
                    s.scale = map.scale
                }
            })

            this.floor.sensors = sensors
            // this.setStats()
        },
        setFloorMap() {
            let _ = this

            _.mapper = new floorMapper('#floor-map', _.floor, { heatmap: true })
        },
        windowResize() { this.mapper.redraw() }
    },
    mounted() {
        if (this.bldg_id) this.getBuilding(this.bldg_id)

        // addEvent(window, 'resize', this.windowResize)
    },
    destroyed() {
        // removeEvent(window, 'resize', this.windowResize)
    }
}
</script>


<style lang="scss" scoped>
.graph-content .range-toggle {
    flex: 0;
    padding-bottom: 24px;
}

#live-view {
    flex: 1 auto;
    display: flex;
    flex-direction: column;

    #heat-map {
        flex: 1 auto;
        display: flex;
        justify-content: center;
        min-height: 50vh;
    }
}
</style>