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
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="toHeatMap">Heatmap</a>
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="toComfortMap">Comfort Map</a>
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
                    <div id="floor-plan">
                        <div id="floor-map" class="floor-map"></div>
                    </div>
                    <div id="floor-stats">
                        <div id="desk-stats">
                            Desks
                            <div class="stats-wrapper">
                                <div class="stat-group free">
                                    <!-- <span class="stat">{{ stats.desk_free }}</span> -->
                                    <span class="stat">{{ freeDeskSensors }}</span>
                                    <span class="label">Free</span>
                                </div>
                                <div class="stat-group occupied">
                                    <!-- <span class="stat">{{ stats.desk_occupied }}</span> -->
                                    <span class="stat">{{ occupiedDeskSensors }}</span>
                                    <span class="label">Occupied</span>
                                </div>
                            </div>
                        </div>
                        <div id="meeting-rooms-stats">
                            Meeting Rooms
                            <div class="stats-wrapper">
                                <div class="stat-group free">
                                    <!-- <span class="stat">{{ stats.rooms_free }}</span> -->
                                    <span class="stat">{{ freeRoomSensors }}</span>
                                    <span class="label">Free</span>
                                </div>
                                <div class="stat-group occupied">
                                    <!-- <span class="stat">{{ stats.rooms_occupied }}</span> -->
                                    <span class="stat">{{ occupiedRoomSensors }}</span>
                                    <span class="label">Occupied</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>

<script>
import { addEvent, removeEvent, getBaseUrl, toOrdinal } from '@/helpers'
import { CaretIcon, CaretLeftIcon } from '@/components/icons'
import { FilterDropdown, Loader } from '@/components'
import floorMapper from '@/components/FloorMapper.js'
import { mapState, mapGetters } from 'vuex'

const api = {
    building: '/api/locations',
    floor: '/api/floors',
    sensor: '/api/sensors',
    area: '/api/areas'
}
export default {
    title: 'Live',
    props: ['bldg_id', 'floor_id'],
    components: { CaretIcon, CaretLeftIcon, FilterDropdown, Loader },
    data: () => ({
        loaded: false, mapper: null, showPageOpts: false, showEmbed: false,
        liveWS: null, wsConnected: false,
        building: null, floors: [], floor: null, showFilter: false, floorFilter: null,
        sensors: [], areas: [],
        sci_id: null // sensor change interval
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
        baseUrl() { return getBaseUrl() },
        floorFilters() { return this.floors.map(f => { return { value: f.id, label: `${f.ordinal_no} Floor` } }) },
        freeSensors() { return this.sensors.filter(s => s.sensor_state == 'available') },
        occupiedSensors() { return this.sensors.filter(s => s.sensor_state == 'occupied') },
        freeDeskSensors() { return this.freeSensors.filter(s => s.area && s.area.type == 'Desk Area').length },
        occupiedDeskSensors() { return this.occupiedSensors.filter(s => s.area && s.area.type == 'Desk Area').length },
        freeRoomSensors() { return this.freeSensors.filter(s => s.area && s.area.type == 'Meeting Room').length },
        occupiedRoomSensors() { return this.occupiedSensors.filter(s => s.area && s.area.type == 'Meeting Room').length },
    },
    methods: {
        wsConnect() {
            this.liveWS = new Paho.MQTT.Client('mqtt.intuitive.works', 443, `intuitive_app_${ parseInt(Math.random() * 100, 10) }`)
            this.liveWS.onConnectionLost = (res) => {
                this.wsConnected = false
                
                if (res.errorCode != 0) {
                    console.log('wsClosed: ', res.errorMessage)
                    this.wsConnect()
                }
            }
            this.liveWS.onMessageArrived = (msg) => {
                if (!this.floor) return

                const data = JSON.parse(msg.payloadString)
                const sid = data.sensorId
                const occupancy = data.occupancy_status
                const state = occupancy == '0' ? 'available' : occupancy == '1' ? 'occupied' : null
                let sensor = this.sensors.find(s => s.sensor_id === sid)

                if (sensor && state) {
                    sensor.sensor_state = state
                    this.mapper.setSensorColor(sensor.id, state)
                    // console.log('onMessageArrived.sensor', sensor)
                }
            }

            this.liveWS.connect({
                useSSL: true,
                // reconnect: true,
                userName: 'intuitive-api',
                password: 'TRuhC3jBFrb3',
                onSuccess: (res) => {
                    this.wsConnected = true
                    console.log('wsConnect.onSuccess', res)

                    this.sensors.forEach(s => {
                        // this.liveWS.subscribe('sensor_data/#', callbacks)
                        this.liveWS.subscribe(`sensor_data/${s.sensor_id}/data`)
                    })
                },
                onFailure: (e) => {
                    this.wsConnected = false
                    console.log('wsConnect.onFailure: ', e)
                }
            })
        },
        wsClose() {
            this.liveWS.disconnect()
        },
        windowUnload() { this.wsClose() },
        backTo() { this.$router.back() },
        async filterSelect(value, label) {
            this.showFilter = false
            this.floor = this.floors.find(f => f.id === value)
            this.floorFilter = label

            await this.getFloorData(value)
            this.mapper.setData(this.floor)
        },
        toHeatMap() {
            this.$router.push({ name: 'heat-map', query: { bid: this.bldg_id, fid: this.floor.id } })
        },
        toComfortMap() {
            this.$router.push({ name: 'comfort-map', query: { bid: this.bldg_id, fid: this.floor.id } })
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
                f.areas = f.children

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
            setTimeout(() => { this.setFloorMap() }, 100)
        },
        async getFloorData(fid) {
            this.areas = [...this.floor.areas]

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
                s.sensor_state = 'available'
                s.area = this.areas.find(x => x.id == s.parent_id)
            })

            this.sensors = [...sensors]
            this.floor.sensors = this.sensors
            this.wsConnect()
        },
        setFloorMap() { this.mapper = new floorMapper('#floor-map', this.floor) },
        // windowResize() { if(this.mapper) this.mapper.redraw() }
    },
    mounted() {
        if (this.bldg_id) this.getBuilding(this.bldg_id)

        addEvent(window, 'beforeunload', this.windowUnload)
        // addEvent(window, 'resize', this.windowResize)
    },
    destroyed() {
        if (this.wsConnected) this.wsClose()
        removeEvent(window, 'beforeunload', this.windowUnload)
        // removeEvent(window, 'resize', this.windowResize)
        // clearInterval(this.sci_id)
    }
}
</script>

<style lang="scss" scoped>
#live-view {
    flex: 1 auto;
    display: flex;
    flex-direction: column;

    #floor-plan {
        flex: 1 auto;
        display: flex;
        justify-content: center;
        min-height: 50vh;
    }

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
