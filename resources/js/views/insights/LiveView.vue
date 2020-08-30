<template>
    <div class="content">
        <template v-if="loaded">
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
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="toHeatMap">Heatmap</a>
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
                    <span class="chart-title">{{ `${floor.ordinal_no} Floor` }} Live View</span>
                    <span class="chart-subtitle">{{ building.name }}</span>
                </div>
                <div id="live-view">
                    <div id="floor-map" class="floor-map"></div>
                    <div id="floor-stats">
                        <div id="desk-stats">
                            Desks
                            <div class="stats-wrapper">
                                <div class="stat-group free">
                                    <span class="stat">{{ stats.desk_free }}</span>
                                    <span class="label">Free</span>
                                </div>
                                <div class="stat-group occupied">
                                    <span class="stat">{{ stats.desk_occupied }}</span>
                                    <span class="label">Occupied</span>
                                </div>
                            </div>
                        </div>
                        <div id="meeting-rooms-stats">
                            Meeting Rooms
                            <div class="stats-wrapper">
                                <div class="stat-group free">
                                    <span class="stat">{{ stats.rooms_free }}</span>
                                    <span class="label">Free</span>
                                </div>
                                <div class="stat-group occupied">
                                    <span class="stat">{{ stats.rooms_occupied }}</span>
                                    <span class="label">Occupied</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#live-view {
    #floor-stats {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
    }

    .stat-group {
        display: inline-flex;
        flex-direction: column;
        color: #ffffff;
        width: 100px;
        margin-top: 24px;
        overflow: hidden;

        span { padding: 4px; }

        & + .stat-group { margin-left: 24px; }

        .stat { border-radius: 4px 4px 0 0; }

        &.free .stat { background-color: #3DCFA3; }
        &.occupied .stat { background-color: #FF5A09; }

        .label {
            font-size: 12px;
            line-height: 20px;
            border-radius: 0 0 4px 4px;
            background-color: rgba($color: #2B2B2B, $alpha: 0.9);
        }

        &.free .label {
            background-color: rgba($color: #3DCFA3, $alpha: 0.1);
        }
        &.occupied .label {
            background-color: rgba($color: #FF5A09, $alpha: 0.1);
        }
    }
}
</style>
<script>
import { addEvent, removeEvent, getBaseUrl } from '../../helpers'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { FilterDropdown, Loader } from '../../components'
import floorMapper from '../../components/FloorMapper.js'

const api = {
    building: '/api/locations',
    floor: '/api/floors'
}
export default {
    title: 'Live',
    props: ['bldg_id', 'floor_id'],
    components: { CaretIcon, CaretLeftIcon, FilterDropdown, Loader },
    data() {
        return {
            loaded: false, mapper: null, showPageOpts: false, showEmbed: false,
            liveWS: null, building: null, floors: [], floor: null, showFilter: false, floorFilter: null,
            stats: {
                desk_free: 0, desk_occupied: 0,
                rooms_free: 0, rooms_occupied: 0
            },
            sci_id: null // sensor change interval
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() },
        floorFilters() { return this.floors.map(f => { return { value: f.hid, label: `${f.ordinal_no} Floor` } }) },
        deskSensors() {
            return this.floor.sensors.filter(s => s.area && s.area.type_id === 4)
        },
        meetingRoomSensors() {
            return this.floor.sensors.filter(s => s.area && [2,3].indexOf(s.area.type_id) >= 0)
        }
    },
    methods: {
        wsConnect() {
            this.liveWS = new WebSocket('ws://sigfox.switchfi.co.za:1880/ws/request')
            this.liveWS.onopen = this.wsOpened
            this.liveWS.onmessage = this.wsMessaged
            this.liveWS.onclose = this.wsClosed
        },
        wsOpened(e) {
            console.log('Connected to live data websocket.', e)
        },
        wsMessaged(e) {
            let data = JSON.parse(e.data),
                payload = JSON.parse(data.payload)

            let sid = payload.sensor_id,
                state = payload.sensor_state,
                timestamp = payload.time

            let sensor = this.floor.sensors.find(s => s.sensor_id === sid)

            if (sensor && state) {
                sensor.sensor_state = state
                this.mapper.setSensorColor(sensor.hid, state)
                this.setStats()
            }
        },
        wsClosed(e) {
            if (e.wasClean) {
                console.log('Connection to live data closed', e.code, e.reason)
            } else {
                console.log('Connection to live data died, reconnecting...')
                this.wsConnect()
            }
        },
        wsClose(reason) {
            this.liveWS.close(1000, reason)
        },
        windowUnload() { this.wsClose('Page closed') },
        backTo() { this.$router.back() },
        filterSelect(value, label) {
            this.showFilter = false
            this.floor = this.floors.find(f => f.hid === value)
            this.floorFilter = label

            this.getFloorData(value, () => {
                this.mapper.setData(this.floor)
            })
        },
        toHeatMap() {
            this.$router.push({ name: 'heat-map' })
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

            this.setStats()

            return cb && cb()
        },
        setFloorMap() {
            let _ = this

            _.mapper = new floorMapper('#floor-map', _.floor)
        },
        setStats() {
            this.stats.desk_free = this.deskSensors.filter(s => s.sensor_state === 'available').length
            this.stats.desk_occupied = Math.abs(this.deskSensors.length - this.stats.desk_free)

            this.stats.rooms_free = this.meetingRoomSensors.filter(s => s.sensor_state === 'available').length
            this.stats.rooms_occupied = Math.abs(this.meetingRoomSensors.length - this.stats.rooms_free)
        }
    },
    created() {
        this.wsConnect()
    },
    mounted() {
        if (this.bldg_id) this.getBuilding(this.bldg_id)

        addEvent(window, 'beforeunload', this.windowUnload)
    },
    destroyed() {
        this.wsClose('Page closed')
        removeEvent(window, 'beforeunload', this.windowUnload)
        clearInterval(this.sci_id)
    }
}
</script>