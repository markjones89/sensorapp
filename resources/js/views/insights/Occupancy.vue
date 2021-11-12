<template>
    <div class="content">
        <template v-if="loaded && building">
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
                    <graph-filter placeholder="Select Building" :filters="buildingFilters" :chosen="bldgFilter" :chosenAsSelected="true" @onSelect="filterSelect" />
                    <!-- <span class="graph-filter" @click="showFilter = !showFilter">
                        {{ bldgFilter ? bldgFilter : 'Select Building' }}
                        <span class="caret">
                            <caret-icon />
                        </span>
                        <filter-dropdown :filters="buildingFilters" :show="showFilter" @onSelect="filterSelect" />
                    </span> -->
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
                    <span class="chart-title">{{ building.name }} Occupancy</span>
                </div>
                <div class="row">
                    <div class="col svg-wrapper">
                        <building-svg :floors="floors" :clickableFloor="true" @floorClick="floorClick" />
                    </div>
                    <div class="col info-wrapper">
                        <table>
                            <thead>
                                <tr class="info-header">
                                    <th width="100"></th>
                                    <th width="80">Live</th>
                                    <th width="80">Limit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="floor-info" v-for="f in floorsReverse" :key="f.id">
                                    <td>{{ `${f.ordinal_no} Floor` }}</td>
                                    <td><span class="occ-badge live-badge" :class="getLiveColor(f.occupancy_live, f.occupancy_limit)" @click="toLive(f.id)">{{ f.occupancy_live }}</span></td>
                                    <td><span class="occ-badge limit-badge orange">{{ f.occupancy_limit }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>

<script>
import { GraphFilter, Loader } from '@/components'
import { BuildingSvg } from '@/components/svg'
import { CaretIcon, CaretLeftIcon } from '@/components/icons'
import { mapState, mapGetters } from 'vuex'
import { addEvent, removeEvent, toOrdinal } from '@/helpers'

const api = {
    building: '/api/locations',
    floor: '/api/floors'
}

export default {
    title: 'Occupancy',
    props: ['bldg_id'],
    components: {
        BuildingSvg,
        CaretIcon,
        CaretLeftIcon,
        GraphFilter,
        Loader
    },
    data: () => ({
        buildings: [], building: null, bldgFilter: null, loaded: false, showPageOpts: false, showEmbed: false, showFilter: false,
        floors: [], floorsReverse: [], sensors: [],
        liveWS: null, wsConnected: false
    }),
    computed: {
        ...mapState({
            user: state => state.user 
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers',
            api_buildings: 'backend/api_buildings',
            api_building_overview: 'backend/api_building_overview',
            // api_floors: 'backend/api_floors',
            api_sensors_by_node: 'backend/api_sensors_by_node'
        }),
        buildingFilters() {
            return this.buildings.map(b => { return { value: b.id, label: b.name } })
        }
    },
    methods: {
        wsConnect() {
            let wsClient = process.env.MIX_LIVE_CLIENT
            let wsPort = parseInt(process.env.MIX_LIVE_PORT)
            
            this.liveWS = new Paho.MQTT.Client(wsClient, wsPort, `intuitive_app_${ parseInt(Math.random() * 100, 10) }`)
            this.liveWS.onConnectionLost = (res) => {
                this.wsConnected = false
                
                if (res.errorCode != 0) {
                    console.log('wsClosed: ', res.errorMessage)
                    this.wsConnect()
                }
            }
            this.liveWS.onMessageArrived = (msg) => {
                const data = JSON.parse(msg.payloadString)
                const sid = data.sensorId
                const occupancy = data.occupancy_status
                const state = occupancy == '0' ? 'available' : occupancy == '1' ? 'occupied' : null
                let sensor = this.sensors.find(s => s.id === sid)

                if (sensor && state) {
                    let floor = this.floors.find(f => f.id == sensor.fid)

                    sensor.sensor_state = state
                    if (floor && state == 'occupied') floor.occupancy_limit += 1
                    else if (floor && state == 'available') floor.occupancy_limit -= 1
                }
                // console.log('onMessageArrived', sensor, data)
            }

            this.liveWS.connect({
                useSSL: true,
                userName: process.env.MIX_LIVE_USER,
                password: process.env.MIX_LIVE_PASS,
                onSuccess: (res) => {
                    this.wsConnected = true
                    this.sensors.forEach(s => { this.liveWS.subscribe(`sensor_data/${s.id}/data`) })
                    console.log('wsConnect.onSuccess', res)
                },
                onFailure: (e) => {
                    this.wsConnected = false
                    console.log('wsConnect.onFailure: ', e)
                }
            })
        },
        wsClose() { this.liveWS.disconnect() },
        windowUnload() { this.wsClose() },
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
            
            this.bldgFilter = this.building.id

            await this.getBuildingOverview(this.building.id)
            this.loaded = true
            this.wsConnect()
        },
        async getBuildingOverview(id) {
            let compId = this.user.company_id
            let res = await axios.all([
                axios.get(this.api_building_overview(compId, id), this.api_header()),
                axios.get(api.floor, { params: { bid: id } }),
                axios.get(this.api_sensors_by_node(id, 'Building'), this.api_header())
            ])
            
            let bldgOverview = res[0].data,
                floorsRef = res[1].data,
                bldgSensors = res[2].data,
                floors = []

            this.sensors = []

            // floors
            bldgOverview.children.forEach(f => {
                let ref = floorsRef.find(x => x.ref_id == f.id)

                f.ordinal_no = toOrdinal(f.number)
                f.occupancy_limit = ref?.occupancy_limit || 0
                f.occupancy_live = 0

                // areas
                let areas = f.children.filter(a => a.type == 'Desk Area')
                let areaIds = areas.map(a => a.id)
                f.areas = areas
                
                // sensors
                let floorSensors = bldgSensors.filter(s => areaIds.indexOf(s.parent_id) >= 0)

                floorSensors.forEach(s => {
                    s.fid = f.id
                    s.sensor_state = 'available'
                })
                this.sensors.push(...floorSensors)

                delete f.children
                floors.push(f)
            })

            this.floors = floors.sort((a, b) => {
                if (a.number > b.number) return 1
                if (a.number < b.number) return -1
                return 0
            })
            this.floorsReverse = floors.sort((a, b) => {
                if (a.number > b.number) return -1
                if (a.number < b.number) return 1
                return 0
            })
        },
        getLiveColor(live, limit){
            let percent = (live / limit) * 100

            return {
                green: percent < 50,
                yellow: percent >= 50,
                orange: percent >= 90
            }
        },
        filterSelect(value, label, obj) {
            this.showFilter = false
            this.building = this.buildings.find(b => b.id === value)
            this.bldgFilter = value
            this.getBuildingOverview(this.building.id)
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        floorClick(floor) { this.toLive(floor.id) },
        toLive(fid) {
            this.$router.push({ name: 'live', query: { bid: this.building.id, fid: fid } })
        }
    },
    mounted() {
        this.getBuildings()

        addEvent(window, 'beforeunload', this.windowUnload)
    },
    destroyed() {
        if (this.wsConnected) this.wsClose()
        removeEvent(window, 'beforeunload', this.windowUnload)
    }
}
</script>

<style lang="scss" scoped>
$green: #01FE01;//#3DCFA3;
$yellow: #FF8600;//#F0A718;
$orange: #ED0003;//#FF5A09;
$darkenAmount: 10%;

.svg-wrapper {
    text-align: right;
    
    .building-svg {
        padding: 0 36px;
    }
}
.info-wrapper {
    padding: 150px 36px 0;

    table {
        border-collapse: collapse;
    }

    .info-header {
        th {
            font-weight: normal;
        }
    }

    .floor-info {
        line-height: 26px;
        border-bottom: 1px solid rgba(255,255,225,.1);

        &:last-child {
            border-bottom: none;
        }

        td {
            padding: 10px 0;

            &:first-child {
                text-align: left;
            }
        }

        .occ-badge {
            display: inline-block;
            padding: 0 16px;
            border-radius: 4px;

            &.live-badge {
                cursor: pointer;
                transition: background-color .24s;
            }

            &.green {
                background-color: $green;

                &:hover {
                    background-color: darken($color: $green, $amount: $darkenAmount);
                }
            }
            &.yellow {
                background-color: $yellow;

                &:hover {
                    background-color: darken($color: $yellow, $amount: $darkenAmount);
                }
            }
            &.orange {
                background-color: $orange;

                &:hover {
                    background-color: darken($color: $orange, $amount: $darkenAmount);
                }
            }
        }
    }
}
</style>