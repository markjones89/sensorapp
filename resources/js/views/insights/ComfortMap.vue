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
                    <span class="chart-title">{{ `${floor.ordinal_no} Floor` }} Comfort Map</span>
                    <span class="chart-subtitle">{{ building.name }}</span>
                </div>
                <date-range-toggle @select="rangeSelect" />
                <div id="live-view">
                    <div id="comfort-map">
                        <div id="floor-map" class="floor-map"></div>
                        <div id="temp-legend">
                            <div class="legend">
                                <span class="dot orange"></span>More than 24&deg;c
                            </div>
                            <div class="legend">
                                <span class="dot green"></span>22&deg;c - 24&deg;c
                            </div>
                            <div class="legend">
                                <span class="dot blue"></span>Less than 21&deg;c
                            </div>
                        </div>
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
<style lang="scss" scoped>
$orange: #FF8600;
$green: #01FE01;
$blue: #0998ff;

.graph-content .range-toggle {
    flex: 0;
    padding-bottom: 24px;
}

#live-view {
    flex: 1 auto;
    display: flex;
    flex-direction: column;

    #comfort-map {
        flex: 1 auto;
        display: flex;
        justify-content: center;

        #temp-legend {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            margin-left: 64px;

            .legend {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                .dot {
                    position: relative;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-right: 12px;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                    }

                    &.orange {
                        background-color: $orange;

                        &::before {
                            background-color: rgba($color: $orange, $alpha: 0.3);
                        }
                    }

                    &.green {
                        background-color: $green;

                        &::before {
                            background-color: rgba($color: $green, $alpha: 0.3);
                        }
                    }

                    &.blue {
                        background-color: $blue;

                        &::before {
                            background-color: rgba($color: $blue, $alpha: 0.3);
                        }
                    }
                }
            }
        }
    }
}
</style>
<script>
import { store } from '../../store'
import { addEvent, removeEvent, getBaseUrl } from '../../helpers'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '../../components'
import floorMapper from '../../components/FloorMapper'

const api = {
    building: '/api/locations',
    floor: '/api/floors'
}

export default {
    title: 'Comfort Map',
    props: ['bldg_id', 'floor_id'],
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider },
    data() {
        return {
            loaded: false, user: null, showPageOpts: false, showEmbed: false, showFilter: false,
            building: null, floors: [], floor: null, floorFilter: null, mapper: null,
            timeFilter: {
                start: null, end: null
            },
            minuteFilter: '10 minutes', showMinuteFilter: false
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null },
        baseUrl() { return getBaseUrl() },
        floorFilters() { return this.floors.map(f => { return { value: f.hid, label: `${f.ordinal_no} Floor` } }) },
        minuteFilters() {
            var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        backTo() { this.$router.back() },
        filterSelect(value, label) {
            this.showFilter = false
            this.floor = this.floors.find(f => f.hid === value)
            this.floorFilter = label

            this.getFloorData(value, () => {
                this.mapper.setData(this.floor)
            })
        },
        toLive() { this.$router.push({ name: 'live', query: { bid: this.bldg_id, fid: this.floor.hid } }) },
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
            let { data } = await axios.get(api.building, { params: { id: id } })
            
            this.building = data
            this.getFloors(id, () => {
                let selected_floor = this.floor_id ? this.floor_id : this.floors[0].hid

                this.floor = this.floors.find(f => f.hid === selected_floor)
                this.floorFilter = `${this.floor.ordinal_no} Floor`

                this.getFloorData(selected_floor, () => {
                    this.loaded = true
                    setTimeout(() => {
                        this.setFloorMap()
                    }, 0)
                })
            })
        },
        async getFloors(bid, cb) {
            let { data } = await axios.get(api.floor, { params: { bid: bid } })

            data.forEach(f => {
                f.floor_plan_url = `${this.baseUrl}/plans/${f.floor_plan}`
            })

            let sorted = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })

            this.floors = sorted

            return cb && cb()
        },
        async getFloorData(fid, cb) {
            let { data } = await axios.get(`${api.floor}/${fid}/data`, { params: { so: true } })

            data.sensors.forEach(s => { s.sensor_state = 'available' })

            this.floor.sensors = data.sensors
            this.floor.areas = []

            // this.setStats()

            return cb && cb()
        },
        setFloorMap() {
            let _ = this

            _.mapper = new floorMapper('#floor-map', _.floor, { comfortmap: true })
        },
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        if (this.bldg_id) this.getBuilding(this.bldg_id)
    }
}
</script>