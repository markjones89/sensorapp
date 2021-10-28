<template>
    <div class="content">
        <div class="graph-header" v-if="loaded">
            <h2 class="page-title">{{ building ? `${building.name} Mapping` : 'Mapping' }}</h2>
            <div class="graph-filters">
                <template v-if="floor && floor.floor_plan">
                    <a href="javascript:;" class="btn btn-primary mr-12" v-if="editMapper" @click="toggleEditMode(false)">Close Edit</a>
                    <a href="javascript:;" class="btn btn-primary mr-12" v-else @click="toggleEditMode(true)">Edit</a>
                </template>
                <span class="graph-filter" @click="filterFloor = !filterFloor">
                    {{ floor ? `${floor.ordinal_no} Floor` : 'Select Floor' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="floorList" :show="filterFloor" @onSelect="selectFloor" />
                </span>
            </div>
        </div>
        <template v-if="loaded">
            <transition name="fade">
                <div id="sensor-mapper" v-if="loaded">
                    <div id="floor-map" class="floor-map">
                        <loader :show="mapperLoading" type="spinner"/>
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
                    <label>Group ID (Area)</label>
                    <!-- <input type="text" v-model="entry.group"> -->
                    <select v-model="entry.group">
                        <option v-for="a in floorAreas" :key="a.id" :value="a.id">{{ a.group_id }}</option>
                    </select>
                </div>
                <!-- <div class="input-field">
                    <label>Area</label>
                    <select v-model="entry.area">
                        <option v-for="a in floorAreas" :key="a.id" :value="a.id">{{ a.name }}</option>
                    </select>
                </div> -->
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

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { getBaseUrl, toOrdinal } from '@/helpers'
import { Loader, Modal } from '@/components'
import floorMapper from '@/components/FloorMapper.js'
import { FilterDropdown } from '@/components'
import { CaretIcon } from '@/components/icons'

const api = {
    bldg: '/api/locations',
    floor: '/api/floors',
    sensor: '/api/sensors',
    area: '/api/areas'
}

export default {
    title: 'Floor Mapper',
    props: ['bldg_id', 'bldg_name', 'floor_id'],
    components: { Loader, FilterDropdown, CaretIcon, Modal },
    data: () => ({
        mapper: null, mapperLoading: false,
        loaded: false,
        areaTypes: [],
        floorAreas: [],
        filterFloor: false,
        floorSel: null, editMapper: false, editArea: false, editSensor: false,
        showEntry: false, showAreaEntry: false, editMode: false,
        entry: { id: null, sensor: '', name: '', group: '', pos_x: 0, pos_y: 0, scale: 0 },
        state: { saving: false, removing: false }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            company_id: state => state.locations.client
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_buildings: 'backend/api_buildings',
            api_building_overview: 'backend/api_building_overview',
            api_sensors: 'backend/api_sensors',
            api_sensor: 'backend/api_sensor',
            api_sensors_by_node: 'backend/api_sensors_by_node',
            buildings: 'locations/getBuildings',
            building: 'locations/getBuilding'
        }),
        baseUrl() { return getBaseUrl() },
        floors() { return this.$store.getters['locations/getFloors'](this.bldg_id) },
        floorList() {
            return this.floors.sort((a, b) => {
                if (a.number > b.number) return 1
                if (a.number < b.number) return -1
                return 0
            }).map(x => { return { label: `${x.ordinal_no} Floor`, value: x.id } })
        },
        floor() { return this.floorSel ? this.floors.find(f => f.id === this.floorSel) : null },
    },
    watch: {
        floorSel: function(floor, oldFloor) {
            if (this.floor && this.mapper) {
                this.getSensors(floor, () => { this.mapper.setData(this.floor) })
            }
        },
        editSensor: function(isEdit) { 
            if (this.mapper) this.mapper.setSensorMapping(isEdit)
        }
    },
    methods: {
        ...mapMutations({
            setBuildings: 'locations/setBuildings',
            setBuilding: 'locations/setBuilding',
            setFloors: 'locations/setFloors'
        }),
        async getAreaTypes() {
            let { data } = await axios.get(`${api.area}/types`)

            this.areaTypes = data
        },
        async getBuilding(id, cb) {
            let bldg = null
            if (this.buildings.length > 0) {
                bldg = this.buildings.find(x => x.id == id)
            } else {
                let res = await axios.get(this.api_buildings(this.company_id), this.api_header())
                bldg = res.data.find(x => x.id == id)
                this.setBuildings(res.data)
            }

            this.setBuilding(bldg)

            return cb && cb()
        },
        async getFloors(cb) {
            let res = await axios.all([
                axios.get(api.floor, { bid: this.bldg_id }),
                axios.get(this.api_building_overview(this.company_id, this.bldg_id), this.api_header())
            ])

            let refs = res[0].data,
                floors = res[1].data.children

            floors.forEach(f => {
                let ref = refs.find(x => x.ref_id == f.id)
                f.ordinal_no = toOrdinal(f.number)
                f.occupancy_limit = ref?.occupancy_limit
                f.floor_plan = ref?.floor_plan
                f.floor_plan_url = ref?.floor_plan ? `${this.baseUrl}/plans/${ref.floor_plan}` : null
                f.upload_info = {
                    uploading: false, progress: 0
                }

                f.areas = f.children
                delete f.children
            })

            floors.sort((a, b) => {
                if (a.number > b.number) return 1
                if (a.number < b.number) return -1
                return 0
            })

            this.setFloors({ bid: this.bldg_id, floors })

            if (this.floor_id) {
                this.floorSel = this.floor_id
            } else if (this.floors.length > 0) {
                this.floorSel = this.floors[0].id
            }
            
            return cb && cb()
        },
        async getSensors(fid, cb) {
            let res = await axios.all([
                axios.get(this.api_sensors_by_node(fid, 'Floor'), this.api_header()),
                axios.get(api.sensor, { fid: fid })
            ])
            let floor = this.floors.find(f => f.id === fid)
            let sensors = res[0].data,
                sensorMap = res[1].data

            sensors.forEach(s => {
                let map = sensorMap.find(x => x.ref_id == s.id)

                if (map) {
                    s.pos_x = map.pos_x
                    s.pos_y = map.pos_y
                    s.scale = map.scale
                }
            })

            floor.sensors = sensors//.filter(x => x.pos_x != null)
            this.floorAreas = floor.areas

            return cb && cb()
        },
        selectFloor(i) {
            this.floorSel = i
            this.filterFloor = false
        },
        toggleEditMode(edit) {
            this.editMapper = edit
            this.editSensor = edit
            this.mapper.editMode(edit)
        },
        toggleSensorMap() { this.mapper.setSensorMapping(this.editSensor) },
        setupMapper() {
            let _ = this
            _.mapper = new floorMapper('#floor-map', _.floor, {
                events: true,
                events: {
                    imgLoad: function() { _.mapperLoading = true },
                    imgLoaded: function() { _.mapperLoading = false },
                    sensorAdd: function(data) {
                        _.triggerAdd(data.x, data.y, data.scale, data.area)
                    },
                    sensorClick: function(sensor) {
                        _.triggerEdit(sensor.id)
                    },
                    sensorMoved: function(sensor) {
                        // console.log('sensorMoved', sensor, this.floorSel)
                        axios.put(`${api.sensor}/coord/${sensor.id}`, {
                            floor_id: _.floorSel,
                            pos_x: sensor.pos_x,
                            pos_y: sensor.pos_y,
                            scale: sensor.scale
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
            // this.entry.group = ''
            this.entry.pos_x = x
            this.entry.pos_y = y
            this.entry.scale = scale
            this.editMode = false

            this.toggleEntry(true)
        },
        async addSensor() {
            this.toggleSaving(true)
            // console.log(this.entry.group, this.floorAreas)
            let area = this.floorAreas.find(x => x.id == this.entry.group)
            let data = {
                sensor_id: this.entry.sensor,
                name: this.entry.name,
                parent: area.group_id
            }
            let resp = await axios.post(this.api_sensors(this.company_id, this.bldg_id, this.floorSel, area.id), data, this.api_header())

            if (resp.status == 200) {
                data.id = resp.data.child_id

                axios.post(api.sensor, {
                    ref_id: data.id,
                    floor_id: this.floorSel,
                    pos_x: this.entry.pos_x,
                    pos_y: this.entry.pos_y,
                    scale: this.entry.scale
                }).then(x => {
                    let res = x.data

                    if (res.r) {
                        data.pos_x = this.entry.pos_x
                        data.pos_y = this.entry.pos_y
                        data.scale = this.entry.scale

                        this.floor.sensors.push(data)
                        this.mapper.drawSensors()
                        this.toggleEntry(false)
                        this.toggleSaving(false)
                    }
                })
            }
            else this.toggleSaving(false)
        },
        triggerEdit(id) {
            let s = this.floor.sensors.find(s => s.id === id)

            this.entry.id = id
            this.entry.sensor = s.sensor_id
            this.entry.name = s.name
            this.entry.group = s.parent_id//s.group_id
            this.entry.pos_x = s.pos_x
            this.entry.pos_y = s.pos_y
            this.entry.scale = s.scale
            this.editMode = true

            this.toggleEntry(true)
        },
        async upSensor() {
            this.toggleSaving(true)
            let area = this.floorAreas.find(x => x.id == this.entry.group)
            let data = {
                sensor_id: this.entry.sensor,
                name: this.entry.name,
                parent: area.group_id
            }
            let _id = this.entry.id
            let resp = await axios.put(this.api_sensor(this.company_id, this.bldg_id, this.floorSel, area.id, _id), data, this.api_header())
            if (resp.status == 200) {
                let s = this.floor.sensors.find(s => s.id === this.entry.id)
                
                s.sensor_id = data.sensor_id
                s.name = data.name
                s.parent = data.parent

                this.mapper.drawSensors()
                this.toggleEntry(false)
                this.toggleSaving(false)
            }
            else this.toggleSaving(false)
        },
        async delSensor() {
            let _ = this,
                _id = _.entry.id,
                _idx = _.floor.sensors.findIndex(s => s.id === _id),
                _sensor = _.floor.sensors[_idx]

            _.$duDialog(null, `Remove sensor <strong>${_sensor.sensor_id}</strong>?`, {
                buttons: _.$duDialog.OK_CANCEL,
                okText: 'Remove',
                callbacks: {
                    okClick: function (e) {
                        this.hide()
                        _.state.removing = true
                        axios.delete(_.api_sensor(_.company_id, _.bldg_id, _.floorSel, _sensor.area_id), _.api_header).then(resp => {
                            if (resp.status == 200) {
                                axios.delete(`${api.sensor}/${_id}`)
                                _.state.removing = false
                                _.floor.sensors.splice(_idx, 1)
                                _.mapper.drawSensors()
                                _.toggleEntry(false)
                            } else _.state.removing = false
                        })
                    }
                }
            })
        }
    },
    async created() {
        await this.getAreaTypes()
    },
    mounted() {
        let _ = this
        let bldg = this.building,
            floors = this.floors

        if (bldg && bldg.id === _.bldg_id) {
            _.bldg = bldg
            
            if (floors.length > 0) {
                if (_.floor_id) {
                    _.floorSel = _.floor_id
                } else if (_.floors.length > 0) {
                    _.floorSel = _.floors[0].id
                }
                _.loaded = true

                if (!_.floor) return
                setTimeout(() => { _.setupMapper() }, 100)
            } else {
                _.getFloors(function() {
                    _.loaded = true
                    _.getSensors(_.floor.id, function() {
                        _.setupMapper()
                    })
                })
            }
        } else {
            _.getBuilding(_.bldg_id, function() {
                _.getFloors(function() {
                    _.loaded = true
                    _.getSensors(_.floor.id, function() {
                        _.setupMapper()
                    })
                })
            })
        }
    }
}
</script>


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

    #floor-map {
        position: relative;
        flex: 1 auto;
    }
}
</style>