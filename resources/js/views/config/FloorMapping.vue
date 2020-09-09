<template>
    <div class="content">
        <template v-if="loaded">
            <h1>{{ building ? `${building} Mapping` : 'Mapping' }}</h1>
            <transition name="fade">
                <div id="sensor-mapper" v-if="loaded">
                    <div class="row">
                        <div class="col-12 col-md-3">
                            <div id="mapper-options">
                                <div class="input-field">
                                    <label>Floor</label>
                                    <!-- <select v-model="floorSel" @change="floorChange"> -->
                                    <select v-model="floorSel">
                                        <option v-for="f in  floors" :key="f.hid" :value="f.hid">{{ f.ordinal_no }} Floor</option>
                                    </select>
                                </div>
                                <template v-if="editMapper">
                                    <button class="btn btn-primary" @click="toggleEditMode(false)">Close Edit</button>
                                    <div id="switches">
                                        <switches type-bold="true" v-model="editArea" label="Area Mapping" theme="custom" color="orange" emit-on-mount="false" @input="toggleAreaMap"/>
                                        <switches type-bold="true" v-model="editSensor" label="Sensor Mapping" theme="custom" color="orange" emit-on-mount="false" @input="toggleSensorMap"/>
                                    </div>
                                </template>
                                <button class="btn btn-primary" v-else @click="toggleEditMode(true)">Edit Mode</button>
                            </div>
                        </div>
                        <div class="col">
                            <div class="floor-map">
                                <div id="floor-map">
                                    <loader :show="mapperLoading" type="spinner"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Sensor</h2>
            </template>
            <div id="entry-wrapper">
                <div class="input-field">
                    <label>Sensor ID</label>
                    <input type="text" v-model="entry.sensor" ref="sensor">
                </div>
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="entry.name" placeholder="(Optional)">
                </div>
                <div class="input-field">
                    <label>Group ID</label>
                    <input type="text" v-model="entry.group">
                </div>
                <div class="input-field">
                    <label>Area</label>
                    <select v-model="entry.area">
                        <option v-for="a in floorAreas" :key="a.hid" :value="a.hid">{{ a.name }}</option>
                    </select>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addSensor" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <template v-if="editMode">
                    <button class="btn btn-danger btn-link" @click="delSensor" :disabled="state.removing">{{ state.removing ? 'Removing...' : 'Remove'}}</button>
                    <button class="btn btn-primary" @click="upSensor" :disabled="state.saving">{{ state.saving ? 'Updating...' : 'Update'}}</button>
                </template>
            </template>
        </modal>
        <modal :show="showAreaEntry" @close="toggleAreaEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Area</h2>
            </template>
            <div id="entry-wrapper">
                <div class="input-field">
                    <label>Type</label>
                    <select v-model="areaEntry.type">
                        <option v-for="t in areaTypes" :key="t.hid" :value="t.hid">{{ t.name }}</option>
                    </select>
                </div>
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="areaEntry.name" ref="area">
                </div>
                <div class="input-field" v-if="areaByDesk">
                    <label>Desks</label>
                    <input type="number" v-model="areaEntry.desks">
                </div>
                <div class="input-field" v-else>
                    <label>Seats</label>
                    <input type="number" v-model="areaEntry.seats">
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addArea" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <template v-if="editMode">
                    <button class="btn btn-danger btn-link" @click="delArea" :disabled="state.removing">{{ state.removing ? 'Removing...' : 'Remove'}}</button>
                    <button class="btn btn-primary" @click="upArea" :disabled="state.saving">{{ state.saving ? 'Updating...' : 'Update'}}</button>
                </template>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss">
$color: #FF5A09;
.vue-switcher-theme--custom {
    &.vue-switcher-color--orange {
        div {
            background-color: lighten($color, 10%);

            &:after {
                // for the circle on the switch
                background-color: darken($color, 5%);
            }
        }

        &.vue-switcher--unchecked {
            div {
                background-color: lighten($color, 30%);

                &:after {
                    background-color: lighten($color, 10%);
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
#sensor-mapper {
    display: flex;
    margin-top: 24px;
    height: calc(100% - 64px);

    .row {
        height: 100%;
    }

    #mapper-options {
        margin-bottom: 24px;

        #switches {
            margin-top: 16px;
        }

        .vue-switcher {
            position: relative;
            display: inline-block;
            margin: 5px 5px 20px;
        }
    }
    .floor-map {
        display: flex;
        align-items: flex-start;

        #floor-map {
            position: relative;
        }
    }
}
</style>
<script>
import { getBaseUrl } from '../../helpers'
import { Loader, Modal } from '../../components'
import Switches from 'vue-switches'
import floorMapper from '../../components/FloorMapper.js'
import { store } from '../../store'

const api = {
    bldg: '/api/locations',
    floor: '/api/floors',
    sensor: '/api/sensors',
    area: '/api/areas'
}

export default {
    title: 'Floor Mapper',
    props: ['bldg_id', 'bldg_name', 'floor_id'],
    components: { Loader, Modal, Switches },
    data() {
        return {
            mapper: null, mapperLoading: false,
            loaded: false, bldg: null, areaTypes: [], floors: [], floorAreas: [], 
            floorSel: null, editMapper: false, editArea: false, editSensor: false,
            showEntry: false, showAreaEntry: false, editMode: false,
            entry: { id: null, sensor: '', name: '', group: '', area: null, pos_x: 0, pos_y: 0, scale: 0 },
            areaEntry: { id: null, type: null, name: '', desks: 0, seats: 0, points: '', scale: 0 },
            state: { saving: false, removing: false }
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() },
        floor() {
            return this.floorSel ? this.floors.find(f => f.hid === this.floorSel) : null
        },
        building() {
            return this.bldg_name ? this.bldg_name : 
                this.bldg ? this.bldg.name : ''
        },
        areaByDesk() {
            let type = this.areaTypes.find(x => x.hid === this.areaEntry.type)

            return type && type.name === 'Workspace Desk Area'
        }
    },
    watch: {
        floorSel: function(floor, oldFloor) {
            this.getFloorData(this.floorSel, () => {
                this.mapper.setData(this.floor)
            })
        }
    },
    methods: {
        async getAreaTypes() {
            let { data } = await axios.get(`${api.area}/types`)

            this.areaTypes = data
        },
        async getBldg(id, cb) {
            let { data } = await axios.get(api.bldg, { params: { id: id } })

            store.setBldg(data)
            this.bldg = data

            return cb && cb()
        },
        async getFloors(bid, cb) {
            let { data } = await axios.get(api.floor, { params: { bid: bid } })

            data.forEach(floor => {
                floor.floor_plan_url = `${this.baseUrl}/plans/${floor.floor_plan}`
                floor.upload_info = {
                    uploading: false, progress: 0
                }
            })

            let sorted = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })

            store.setFloors(sorted)
            this.floors = sorted

            if (this.floor_id) {
                this.floorSel = this.floor_id
            } else if (this.floors.length > 0) {
                this.floorSel = this.floors[0].hid
            }
            
            return cb && cb()
        },
        async getFloorData(fid, cb) {
            let { data } = await axios.get(`${api.floor}/${fid}/data`)
            let floor = this.floors.find(f => f.hid === fid)

            floor.sensors = data.sensors
            floor.areas = data.areas
            this.floorAreas = data.areas

            // setTimeout(() => { if (cb) cb() }, 0)
            return cb && cb()
        },
        toggleEditMode(edit) {
            this.editMapper = edit
            this.mapper.editMode(edit)
        },
        toggleAreaMap() {
            if(this.editArea) this.editSensor = !this.editArea
            this.mapper.setAreaMapping(this.editArea)
        },
        toggleSensorMap() {
            if(this.editSensor) this.editArea = !this.editSensor
            this.mapper.setSensorMapping(this.editSensor)
        },
        setupMapper() {
            let _ = this
            _.mapper = new floorMapper('#floor-map', _.floor, {
                events: {
                    imgLoad: function() { _.mapperLoading = true },
                    imgLoaded: function() { _.mapperLoading = false },
                    sensorAdd: function(data) {
                        _.triggerAdd(data.x, data.y, data.scale, data.area)
                    },
                    sensorClick: function(sensor) {
                        _.triggerEdit(sensor.hid)
                    },
                    sensorMoved: function(sensor) {
                        axios.put(`${api.sensor}/coord/${sensor.hid}`, {
                            pos_x: sensor.pos_x, pos_y: sensor.pos_y, scale: sensor.scale
                        })
                    },
                    addArea: function(points, scale) {
                        _.triggerAddArea(points, scale)
                    },
                    areaClick: function(area) {
                        _.triggerEditArea(area.hid)
                    },
                    areaPtUpdate: function(area, points, scale) {
                        if (!area) return
                        axios.put(`${api.area}/coord/${area.hid}`, {
                            points: points, scale: scale
                        })
                    }
                }
            })
        },
        toggleSaving(saving) { this.state.saving = saving },
        /* sensor */
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.sensor.focus() }, 0)
        },
        triggerAdd(x, y, scale, area) {
            this.entry.id = null
            this.entry.sensor = ''
            this.entry.name = ''
            this.entry.group = ''
            this.entry.area = area ? area.hid : null
            this.entry.pos_x = x
            this.entry.pos_y = y
            this.entry.scale = scale
            this.editMode = false

            this.toggleEntry(true)
        },
        async addSensor() {
            this.toggleSaving(true)
            axios.post(api.sensor, {
                floor: this.floor.hid,
                sensor_id: this.entry.sensor,
                name: this.entry.name,
                group: this.entry.group,
                area: this.entry.area,
                pos_x: this.entry.pos_x,
                pos_y: this.entry.pos_y,
                scale: this.entry.scale
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    this.floor.sensors.push(res.data)
                    this.mapper.drawSensors()
                    this.toggleEntry(false)
                }
            })
        },
        triggerEdit(id) {
            let s = this.floor.sensors.find(s => s.hid === id)

            this.entry.id = id
            this.entry.sensor = s.sensor_id
            this.entry.name = s.name
            this.entry.group = s.group_id
            this.entry.area = s.aid
            this.entry.pos_x = s.pos_x
            this.entry.pos_y = s.pos_y
            this.entry.scale = s.scale
            this.editMode = true

            this.toggleEntry(true)
        },
        async upSensor() {
            this.toggleSaving(true)
            axios.put(`${api.sensor}/${this.entry.id}`, {
                sensor_id: this.entry.sensor,
                name: this.entry.name,
                group: this.entry.group,
                area: this.entry.area
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    let s = this.floor.sensors.find(s => s.hid === this.entry.id)
                    
                    s.sensor_id = this.entry.sensor
                    s.name = this.entry.name
                    s.aid = this.entry.area
                    s.group_id = this.entry.group

                    this.mapper.drawSensors()
                    this.toggleEntry(false)
                }
            })
        },
        async delSensor() {
            let _id = this.entry.id,
                _idx = this.floor.sensors.findIndex(s => s.hid === _id),
                _sensor = this.floor.sensors[_idx]

            if (confirm(`Remove sensor ${_sensor.sensor_id}?`)) {
                this.state.removing = true
                axios.delete(`${api.sensor}/${_id}`).then(x => {
                    this.state.removing = false
                    let res = x.data

                    if (res.r) {
                        this.floor.sensors.splice(_idx, 1)
                        this.mapper.drawSensors()
                        this.toggleEntry(false)
                    }
                })
            }
        },
        /* area */
        toggleAreaEntry(show) {
            this.showAreaEntry = show

            if (show) setTimeout(() => { this.$refs.area.focus() }, 0)
            else if (this.areaEntry.id == null) {
                this.mapper.clearDrawing()
            }
        },
        triggerAddArea(points, scale) {
            this.areaEntry.id = null
            this.areaEntry.type = this.areaTypes[0] ? this.areaTypes[0].hid : null
            this.areaEntry.name = ''
            this.areaEntry.desks = 0
            this.areaEntry.seats = 0
            this.areaEntry.points = points
            this.areaEntry.scale = scale
            this.editMode = false

            this.toggleAreaEntry(true)
        },
        async addArea() {
            this.toggleSaving(true)
            axios.post(api.area, {
                floor: this.floor.hid,
                type: this.areaEntry.type,
                name: this.areaEntry.name,
                desks: this.areaByDesk ? this.areaEntry.desks : null,
                seats: this.areaByDesk ? null : this.areaEntry.seats,
                points: this.areaEntry.points,
                scale: this.areaEntry.scale
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    this.floor.areas.push(res.data)
                    this.mapper.drawAreas()
                    this.toggleAreaEntry(false)
                }
            })
        },
        triggerEditArea(id) {
            let a = this.floor.areas.find(a => a.hid === id)

            this.areaEntry.id = id
            this.areaEntry.type = a.tid
            this.areaEntry.name = a.name
            this.areaEntry.desks = a.desks
            this.areaEntry.seats = a.seats
            this.areaEntry.points = a.poly_points.map(p => {
                return [p.x, p.y].join(',')
            }).join(' ')
            this.areaEntry.scale = a.scale
            this.editMode = true

            this.toggleAreaEntry(true)
        },
        async upArea() {
            this.toggleSaving(true)
            axios.put(`${api.area}/${this.areaEntry.id}`, {
                type: this.areaEntry.type,
                name: this.areaEntry.name,
                desks: this.areaByDesk ? this.areaEntry.desks : null,
                seats: this.areaByDesk ? null : this.areaEntry.seats
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    let a = this.floor.areas.find(a => a.hid === this.areaEntry.id)
                    
                    a.tid = this.areaEntry.type
                    a.name = this.areaEntry.name
                    a.desks = this.areaEntry.desks
                    a.seats = this.areaEntry.seats

                    this.mapper.drawAreas()
                    this.toggleAreaEntry(false)
                }
            })
        },
        async delArea() {
            let _id = this.areaEntry.id,
                _idx = this.floor.areas.findIndex(s => s.hid === _id),
                _area = this.floor.areas[_idx]

            if (confirm(`Remove area: ${_area.name}?`)) {
                this.state.removing = true
                axios.delete(`${api.area}/${_id}`).then(x => {
                    this.state.removing = false
                    let res = x.data

                    if (res.r) {
                        this.floor.areas.splice(_idx, 1)
                        this.mapper.drawAreas()
                        this.toggleAreaEntry(false)
                    }
                })
            }
        }
    },
    created() {
        this.getAreaTypes()
    },
    mounted() {
        let _ = this
        let bldg = store.getBldg(),
            floors = store.getFloors()

        if (bldg && bldg.hid === _.bldg_id) {
            _.bldg = bldg
            
            if (floors.length > 0) {
                _.floors = store.getFloors()
                if (_.floor_id) {
                    _.floorSel = _.floor_id
                } else if (_.floors.length > 0) {
                    _.floorSel = _.floors[0].hid
                }
                _.loaded = true

                if (!_.floor) return
                _.getFloorData(_.floor.hid, function() {
                    _.setupMapper()
                })
            } else {
                _.getFloors(_.bldg_id, function() {
                    _.loaded = true
                    _.getFloorData(_.floor.hid, function() {
                        _.setupMapper()
                    })
                })
            }
        } else {
            _.getBldg(_.bldg_id, function() {
                _.getFloors(_.bldg_id, function() {
                    _.loaded = true
                    _.getFloorData(_.floor.hid, function() {
                        _.setupMapper()
                    })
                })
            })
        }
    }
}
</script>