<template>
    <div class="content">
        <h1>{{ building ? `${building} Mapping` : 'Mapping' }}</h1>
        <transition name="fade">
            <div id="sensor-mapper" v-if="loaded">
                <div class="row">
                    <div class="col-12 col-md-3">
                        <div id="mapper-options">
                            <div class="input-field">
                                <label>Floor</label>
                                <select v-model="floorSel" @change="floorChange">
                                    <option v-for="f in  floors" :key="f.hid" :value="f.hid">{{ f.ordinal_no }} Floor</option>
                                </select>
                            </div>
                            <template v-if="editMapper">
                                <!-- <button class="btn btn-primary">Add Sensor</button> -->
                                <button class="btn btn-primary" @click="toggleEditMode(false)">Close Edit</button>
                                <div id="switches">
                                    <switches type-bold="true" v-model="editArea" label="Area Mapping" theme="custom" color="orange" emit-on-mount="false" @input="toggleAreaMap"/>
                                    <switches type-bold="true" v-model="editSensor" label="Sensor Mapping" theme="custom" color="orange" emit-on-mount="false" @input="toggleSensorMap"/>
                                </div>
                                <!-- <span class="checkbox">
                                    <input type="checkbox" id="cbSensorMap" @change="toggleSensorMap" />
                                    <label for="cbSensorMap">Sensor Mapping</label>
                                </span>
                                <span class="checkbox">
                                    <input type="checkbox" id="cbAreaMap" @change="toggleAreaMap" />
                                    <label for="cbAreaMap">Area Mapping</label>
                                </span> -->
                            </template>
                            <button class="btn btn-primary" v-else @click="toggleEditMode(true)">Edit Mode</button>
                        </div>
                    </div>
                    <div class="col">
                        <div id="floor-map"></div>
                    </div>
                </div>
            </div>
        </transition>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Sensor</h2>
            </template>
            <div id="entry-wrapper">
                <div class="input-field">
                    <label>Sensor</label>
                    <input type="text" v-model="entry.sensor" ref="sensor">
                </div>
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="entry.name" placeholder="(Optional)">
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
                    <label>Name</label>
                    <input type="text" v-model="areaEntry.name" ref="area">
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
#floor-map {
    position: relative;
    overflow: hidden;
    
    svg {
        pointer-events: initial !important;
    }
}
</style>
<style lang="scss" scoped>
#sensor-mapper {
    display: flex;
    margin-top: 24px;

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
}
</style>
<script>
import { getBaseUrl } from '../../helpers'
import { Loader, Modal } from '../../components'
import Switches from 'vue-switches'
import floorMapper from '../../components/FloorMapper.js'

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
            mapper: null,
            loaded: false, bldg: null, floors: [], floorSel: null,
            editMapper: false, editArea: false, editSensor: false,
            showEntry: false, showAreaEntry: false, editMode: false,
            entry: { id: null, sensor: '', name: '', pos_x: 0, pos_y: 0, scale: 0 },
            areaEntry: { id: null, name: '', points: '', scale: 0 },
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
        }
    },
    methods: {
        async getBldg(id) {
            let { data } = await axios.get(api.bldg, { params: { id: id } })

            this.bldg = data
        },
        async getFloors(bid, cb) {
            let { data } = await axios.get(api.floor, { params: { bid: bid } })

            data.forEach(floor => {
                floor.floor_plan_url = `${this.baseUrl}/plans/${floor.floor_plan}`
            })

            this.floors = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })

            if (this.floor_id) {
                this.floorSel = this.floor_id
            } else if (this.floors.length > 0) {
                this.floorSel = this.floors[0].hid
            }
            
            setTimeout(() => { if (cb) cb() }, 0)
        },
        floorChange() {
            this.getFloorData(this.floorSel, () => {
                this.mapper.setData(this.floor)
            })
        },
        async getFloorData(fid, cb) {
            let { data } = await axios.get(`${api.floor}/${fid}/data`)
            let floor = this.floors.find(f => f.hid === fid)

            floor.sensors = data.sensors
            floor.areas = data.areas

            setTimeout(() => { if (cb) cb() }, 0)
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
                sensorAdd: function(pos) {
                    _.triggerAdd(pos.x, pos.y, pos.scale)
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
            })
        },
        toggleSaving(saving) { this.state.saving = saving },
        /* sensor */
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.sensor.focus() }, 0)
        },
        triggerAdd(x, y, scale) {
            this.entry.id = null
            this.entry.sensor = ''
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
                name: this.entry.name
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    let s = this.floor.sensors.find(s => s.hid === this.entry.id)
                    
                    s.sensor_id = this.entry.sensor
                    s.name = this.entry.name

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
            this.areaEntry.name = ''
            this.areaEntry.points = points
            this.areaEntry.scale = scale
            this.editMode = false

            this.toggleAreaEntry(true)
        },
        async addArea() {
            this.toggleSaving(true)
            axios.post(api.area, {
                floor: this.floor.hid,
                name: this.areaEntry.name,
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
            this.areaEntry.name = a.name
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
                name: this.areaEntry.name
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    let a = this.floor.areas.find(a => a.hid === this.areaEntry.id)
                    
                    a.name = this.areaEntry.name

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
        if (!this.bldg_name) this.getBldg(this.bldg_id)
    },
    mounted() {
        let _ = this
        _.getFloors(_.bldg_id, function() {
            _.loaded = true
            _.getFloorData(_.floor.hid, function() {
                _.setupMapper()
            })
        })
    }
}
</script>