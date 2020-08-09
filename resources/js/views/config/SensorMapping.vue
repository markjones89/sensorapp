<template>
    <div class="content">
        <h1>{{ building ? `${building} Sensors` : 'Sensors' }}</h1>
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
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss">
#sensor-mapper {
    display: flex;
    margin-top: 24px;

    #mapper-options {
        margin-bottom: 24px;
    }
}
#floor-map {
    overflow: hidden;
    
    svg {
        pointer-events: initial !important;

        .sensor {
            box-shadow: 0 0 0 4px rgba(61,207,163,0.3);
        }
    }
}
</style>
<script>
import { getBaseUrl } from '../../helpers'
import { Loader, Modal } from '../../components'
import sensorMapper from '../../components/SensorMapper.js'

const api = {
    mapping: '/api/sensors',
    bldg: '/api/locations',
    floor: '/api/floors'
}

export default {
    title: 'Sensors',
    props: ['bldg_id', 'bldg_name', 'floor_id'],
    components: { Loader, Modal },
    data() {
        return {
            mapper: null,
            loaded: false, bldg: null, floors: [], floorSel: null, //floor: null, 
            sensors: [], editMapper: false,
            showEntry: false, editMode: false,
            entry: { id: null, sensor: '', name: '', pos_x: 0, pos_y: 0 },
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
            this.getSensors(this.floorSel, () => {
                // this.setupMapper()
                this.mapper.setData(this.floor)
            })
        },
        async getSensors(fid, cb) {
            let { data } = await axios.get(api.mapping, { params: { fid: fid } })
            let floor = this.floors.find(f => f.hid === fid)

            floor.sensors = data

            setTimeout(() => { if (cb) cb() }, 0)
        },
        toggleEditMode(edit) {
            this.editMapper = edit
            this.mapper.editMode(edit)
        },
        setupMapper() {
            let _ = this
            _.mapper = new sensorMapper('#floor-map', _.floor, {
                addTrigger: function(pos) {
                    _.triggerAdd(pos.x, pos.y)
                },
                sensorClick: function(s) {
                    _.triggerEdit(s.hid)
                },
                sensorMoved: function(s) {
                    axios.put(`${api.mapping}/coord/${s.hid}`, {
                        pos_x: s.pos_x, pos_y: s.pos_y
                    })
                }
            })
        },
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.sensor.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        triggerAdd(x, y) {
            this.entry.id = null
            this.entry.sensor = ''
            this.entry.pos_x = x
            this.entry.pos_y = y
            this.editMode = false

            this.toggleEntry(true)
        },
        async addSensor() {
            this.toggleSaving(true)
            axios.post(api.mapping, {
                floor: this.floor.hid,
                sensor_id: this.entry.sensor,
                name: this.entry.name,
                pos_x: this.entry.pos_x,
                pos_y: this.entry.pos_y
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
            this.editMode = true

            this.toggleEntry(true)
        },
        async upSensor() {
            this.toggleSaving(true)
            axios.put(`${api.mapping}/${this.entry.id}`, {
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
                axios.delete(`${api.mapping}/${_id}`).then(x => {
                    this.state.removing = false
                    let res = x.data

                    if (res.r) {
                        this.floor.sensors.splice(_idx, 1)
                        this.mapper.drawSensors()
                        this.toggleEntry(false)
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
            _.getSensors(_.floor.hid, function() {
                _.setupMapper()
            })
        })
    }
}
</script>