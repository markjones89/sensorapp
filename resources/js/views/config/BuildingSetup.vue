<template>
    <div class="content">
        <template v-if="loaded">
            <!-- <h1>{{ building ? `Floors - ${building}` : 'Floors' }}</h1> -->
            <h1>{{ building ? building.name : '' }}</h1>
            <transition name="fadeUp" appear>
                <div id="list-wrapper" v-if="loaded">
                    <div id="floor-list">
                        <div v-if="floorList.length === 0">No floors defined</div>
                        <div class="floor" :class="{ selected: floor !== null && floor.id == f.id }" v-for="f in floorList" :key="f.id" v-else>
                            <div class="floor-thumb">
                                <div class="fp-upload-progress" v-if="f.upload_info.uploading">
                                    Uploading
                                    <circle-progress :percent="f.upload_info.progress" />
                                </div>
                                <div class="fp-thumb" v-if="f.floor_plan">
                                    <img :src="`${baseUrl}/plans/thumbnail/${f.floor_plan}`">
                                    <div class="fp-thumb-opts">
                                        <a @click="upFloorPlan(f.id)">Change</a>
                                        <a @click="viewFloorPlan(f.id, f.floor_plan)">Preview</a>
                                    </div>
                                </div>
                                <div v-else class="fp-upload-trigger" @click="upFloorPlan(f.id)">
                                    Upload Floor Plan
                                </div>
                            </div>
                            <div class="floor-info">
                                <span class="floor-number" @click="selectFloor(f)">{{ `${f.ordinal_no} Floor` }}</span>
                                <div class="floor-opts">
                                    <template v-if="f.floor_plan">
                                        <a class="floor-opt" @click="toMapper(f.id)">Mapper</a>
                                    </template>
                                    <a class="floor-opt" @click="triggerEdit(f.id)">Edit</a>
                                    <template v-if="user.isSuper">
                                        <a class="floor-opt" @click="delFloor(f.id)">Remove</a>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="file" ref="fpFile" hidden accept="image/*" @change="fpFileChange" />
                    <button class="btn btn-primary" id="add-btn" @click="triggerAdd">Add Floor</button>
                    <transition name="fadeUp" appear>
                        <section id="area-list" v-if="floor !== null">
                            <h2>{{ floor.ordinal_no }} Floor Areas</h2>
                            <div v-if="areaList.length === 0" style="margin:16px">No areas</div>
                            <ul v-else class="custom-scroll">
                                <li v-for="area in areaList" :key="area.id">
                                    <div class="area-info">
                                        <span class="area-name">{{ area.group_id }}</span>
                                        <div class="area-opts">
                                            <a class="area-opt" @click="editArea(area.id)">Edit</a>
                                            <template v-if="user.isSuper">
                                                <a class="area-opt" @click="delArea(f.id)">Remove</a>
                                            </template>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <button class="btn btn-primary" id="add-area-btn" @click="newArea">Add Area</button>
                        </section>
                    </transition>
                    <div class="fp-preview" v-if="showPlan">
                        <loader :show="!state.imgLoaded" type="spinner"/>
                        <img v-if="state.imgLoaded" :src="`${baseUrl}/plans/${floor.floor_plan}`">
                        <div class="preview-header">
                            {{ `${building.name} - ${floor.ordinal_no} Floor` }}
                            <span class="preview-close" @click="togglePlan(false)">Close</span>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Floor</h2>
            </template>
            <div id="floor-entry">
                <div class="row">
                    <div class="col">
                        <div class="input-field">
                            <label>Floor No.</label>
                            <input type="number" v-model="entry.fNo" ref="fNo">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-field">
                            <label>Occupancy Limit</label>
                            <input type="number" v-model="entry.occupancy_limit">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Size (m<sup>2</sup>)</label>
                            <input type="text" v-model="entry.size_sqm" @keyup="sqmKeyup">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Size (ft<sup>2</sup>)</label>
                            <input type="text" v-model="entry.size_sqft" @keyup="sqftKeyup">
                        </div>
                    </div>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addFloor" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <button class="btn btn-primary" @click="upFloor" :disabled="state.saving" v-else>{{ state.saving ? 'Updating...' : 'Update'}}</button>
            </template>
        </modal>
        <modal id="area-modal" :show="areaModal" @close="toggleAreaModal(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Area</h2>
            </template>
            <div id="area-entry">
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="areaEntry.group_id" ref="group_id">
                </div>
                <div class="input-field">
                    <label>Type</label>
                    <select v-model="areaEntry.type">
                        <option v-for="t in areaTypes" :key="t.hid" :value="t.name">{{ t.name }}</option>
                    </select>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>{{ areaByDesk ? 'Desks' : 'Seats' }}</label>
                            <input type="number" v-model="areaEntry.sensor_count">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Limit</label>
                            <input type="number" v-model="areaEntry.limit">
                        </div>
                    </div>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addArea" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <button class="btn btn-primary" @click="updateArea" :disabled="state.saving" v-else>{{ state.saving ? 'Updating...' : 'Update'}}</button>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { CircleProgress, Loader, Modal } from '../../components'
import { getBaseUrl, preloadImage, toOrdinal, addEvent, removeEvent }  from '../../helpers'

const api = {
    floors: '/api/floors',
    area: '/api/areas'
}
const METRE_FOOT_FACTOR = 0.092903

export default {
    title: 'Building Setup',
    props: ['bldg_id', 'bldg_name'],
    components: { CircleProgress, Loader, Modal },
    data: () => ({
        floor: null, listTransition: 'fadeUp',
        loaded: false, showEntry: false, editMode: false,
        entry: { id: null, fNo: 1, size_sqm: 0, size_sqft: 0, occupancy_limit: 0 },
        areaModal: false, areaTypes: [],
        areaEntry: { id: null, group_id: '', type: '', limit: 0, sensor_count: 0 },
        showPlan: false, planUrl: null,
        state: {
            saving: false, imgLoaded: false
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            // company_id: state => state.user.company_id
            company_id: state => state.locations.client,
            buildings: state => state.locations.buildings,
            building: state => state.locations.building
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_buildings: 'backend/api_buildings',
            api_building_overview: 'backend/api_building_overview',
            api_floors: 'backend/api_floors',
            api_floor: 'backend/api_floor',
            api_areas: 'backend/api_areas',
            api_area: 'backend/api_area',
        }),
        floors() { return this.$store.getters['locations/getFloors'](this.bldg_id) },
        baseUrl() { return getBaseUrl() },
        floorList() {
            return this.floors.sort((a, b) => {
                if (a.number > b.number) return 1
                if (a.number < b.number) return -1
                return 0
            })
        },
        areaList() {
            return this.floor == null ? [] : this.floor.areas.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
            })
        },
        areaByDesk() { return this.areaEntry.type === 'Workspace Desk Area' }
    },
    methods: {
        ...mapMutations({
            setBuildings: 'locations/setBuildings',
            setBuilding: 'locations/setBuilding',
            setFloors: 'locations/setFloors'
        }),
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
        },
        async getFloors() {
            let res = await axios.all([
                axios.get(api.floors, { bid: this.bldg_id }),
                axios.get(this.api_building_overview(this.company_id, this.bldg_id), this.api_header())
            ])

            let refs = res[0].data,
                floors = [...(res[1].data.children || [])]

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

            console.log('getFloors', floors)
            this.setFloors({ bid: this.bldg_id, floors })
            this.loaded = true
        },
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.fNo.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        sqmKeyup() { this.entry.size_sqft = (this.entry.size_sqm / METRE_FOOT_FACTOR).toFixed(2) },
        sqftKeyup() { this.entry.size_sqm = (this.entry.size_sqft * METRE_FOOT_FACTOR).toFixed(2) },
        triggerAdd() {
            this.entry.id = null
            this.entry.fNo = this.floors.length > 0 ? (Math.max(...this.floors.map(x => x.number)) + 1) : 1
            this.entry.size_sqm = 0
            this.entry.size_sqft = 0
            this.entry.occupancy_limit = 0
            this.editMode = false

            this.toggleEntry(true)
        },
        async addFloor() {
            this.toggleSaving(true)
            let floor = { 
                number: this.entry.fNo,
                size_sqm: this.entry.size_sqm,
                size_sqft: this.entry.size_sqft,
                building: this.building.name
            }
            let resp = await axios.post(this.api_floors(this.company_id, this.bldg_id), floor, this.api_header())

            if (resp.status == 200) {
                floor.id = resp.data.child_id
                floor.ordinal_no = toOrdinal(floor.number)
                axios.post(api.floors, {
                    building_id: this.bldg_id,
                    ref_id: floor.id,
                    occupancy_limit: this.entry.occupancy_limit
                }).then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) {
                            floor.occupancy_limit = this.entry.occupancy_limit
                            floor.upload_info = {
                                uploading: false, progress: 0
                            }
                            floor.floor_plan = null
                            floor.floor_plan_url = null
                            floor.areas = []
                            this.building.floors.push(floor)
                            this.toggleEntry(false)
                        }
                    })
            } else this.toggleSaving(false)
        },
        triggerEdit(id) {
            let f = this.floors.find(f => f.id === id)

            this.entry.id = id
            this.entry.fNo = f.number
            this.entry.size_sqm = f.size_sqm
            this.entry.size_sqft = f.size_sqft
            this.entry.occupancy_limit = f.occupancy_limit
            this.editMode = true

            this.toggleEntry(true)
        },
        async upFloor() {
            this.toggleSaving(true)
            let floor = { 
                number: this.entry.fNo,
                size_sqm: this.entry.size_sqm,
                size_sqft: this.entry.size_sqft,
                building: this.building.name
            }
            let _id = this.entry.id
            let resp = await axios.put(this.api_floor(this.company_id, this.bldg_id, _id), floor, this.api_header())

            if (resp.status == 200) {
                // floor.id = resp.data.child_id
                // floor.ordinal_no = toOrdinal(floor.number)
                let f = this.floors.find(x => x.id === _id)
                f.number = floor.number
                f.ordinal_no = toOrdinal(floor.number)
                f.size_sqm = floor.size_sqm
                f.size_sqft = floor.size_sqft
                f.building = floor.building
                f.occupancy_limit = this.entry.occupancy_limit

                axios.put(`${api.floors}/${_id}`, { occupancy_limit: this.entry.occupancy_limit })
                    .then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) this.toggleEntry(false)
                    })
            } else this.toggleSaving(false)
        },
        async delFloor(id) {
            let _ = this,
                idx = _.floors.findIndex(f => f.id === id)

            _.$duDialog(null, `Remove <strong>${_.floors[idx].ordinal_no} Floor</strong>?`, {
                buttons: _.$duDialog.OK_CANCEL,
                okText: 'Remove',
                callbacks: {
                    okClick: function (e) {
                        this.hide()
                        _.toggleSaving(true)
                        axios.delete(_.api_floor(_.company_id, _.bldg_id, id), _.api_header).then(resp => {
                            if (resp.status == 200) {
                                _.toggleSaving(false)
                                _.floors.splice(idx, 1)
                                axios.delete(`${api.floors}/${id}`)
                            } else _.toggleSaving(true)
                        })
                    }
                }
            })
        },
        upFloorPlan(id) {
            this.entry.id = id
            this.$refs.fpFile.click()
        },
        fpFileChange() {
            let _ = this, file = _.$refs.fpFile.files[0]

            if (file) {
                let f = _.floors.find(f => f.id === _.entry.id)

                f.upload_info.uploading = true
                _.upload(file, function(success, res) {
                    f.upload_info.uploading = false
                    if (success) {
                        if (res.r) {
                            f.floor_plan = res.floor_plan
                            f.floor_plan_url = `${_.baseUrl}/plans/${f.floor_plan}`
                        }
                    } else {
                        console.error(res)
                    }
                })
            }
        },
        async upload(file, cb) {
            let formData = new window.FormData(),
                f = this.floors.find(f => f.id === this.entry.id)

            formData.append('floor_plan', file)
            formData.append('id', this.entry.id)
            formData.append('bid', this.bldg_id)
            formData.append('occupancy_limit', this.entry.occupancy_limit)

            axios.post(`${api.floors}/plan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progress) {
                    var percentCompleted = Math.round((progress.loaded * 100) / progress.total)

                    f.upload_info.progress = percentCompleted
                }
            }).then(x => cb(true, x.data))
            .catch(err => cb(false, err))
        },
        togglePlan(show) { 
            this.showPlan = show 
            this.listTransition = 'fade'
        },
        viewFloorPlan(id, plan) {
            let _ = this
            _.floor = _.floors.find(f => f.id === id)
            _.togglePlan(true)

            _.state.imgLoaded = false
            preloadImage(_.floor.floor_plan_url, function() { _.state.imgLoaded = true })
        },
        selectFloor(f) { this.floor = f },
        deSelectFloor(e) {
            let _ = this

            if (['mousedown', 'touchend'].indexOf(e.type) >= 0) {
                if (!e.target.closest('#floor-list .floor, .fp-preview, #area-list, #area-modal')) {
                    _.floor = null
                }
            } else if (e.type === 'keydown') {
                if (e.keyCode === 27) _.floor = null
            }
        },
        toMapper(id) {
            this.$parent.$router.push({ name: 'mapper', query: { fid: id }, params: { bid: this.bldg_id, bldg_name: this.bldg_name } })
        },
        async getAreaTypes() {
            let { data } = await axios.get(`${api.area}/types`)

            this.areaTypes = data
        },
        toggleAreaModal(show) {
            this.areaModal = show

            if (show) setTimeout(() => { this.$refs.group_id.focus() }, 0)
        },
        newArea() {
            this.areaEntry.id = null
            this.areaEntry.group_id = ''
            // this.areaEntry.type = null
            this.areaEntry.limit = 0
            this.areaEntry.sensor_count = 0
            this.editMode = false

            this.toggleAreaModal(true)
        },
        async addArea() {
            this.toggleSaving(true)
            let area = {
                group_id: this.areaEntry.group_id,
                type: this.areaEntry.type,
                limit: this.areaEntry.limit,
                sensor_count: this.areaEntry.sensor_count
            }

            let resp = await axios.post(this.api_areas(this.company_id, this.bldg_id, this.floor.id), area, this.api_header())

            if (resp.status == 200) {
                area.id = resp.data.child_id
                this.floor.areas.push(area)
                this.toggleSaving(false)
                this.toggleAreaModal(false)
            }
            else this.toggleSaving(false)
        },
        editArea(id) {
            let a = this.floor.areas.find(x => x.id == id)
            this.areaEntry.id = id
            this.areaEntry.group_id = a.group_id
            this.areaEntry.type = a.type
            this.areaEntry.limit = a.limit
            this.areaEntry.sensor_count = a.sensor_count
            this.editMode = true

            this.toggleAreaModal(true)
        },
        async updateArea() {
            this.toggleSaving(true)
            let area = {
                group_id: this.areaEntry.group_id,
                type: this.areaEntry.type,
                limit: this.areaEntry.limit,
                sensor_count: this.areaEntry.sensor_count
            }
            let _id = this.areaEntry.id
            let resp = await axios.put(this.api_area(this.company_id, this.bldg_id, this.floor.id, _id), area, this.api_header())

            if (resp.status == 200) {
                let a = this.floor.areas.find(x => x.id == _id)
                a.group_id = area.group_id
                a.type = area.type
                a.limit = area.limit
                a.sensor_count = area.sensor_count

                this.toggleSaving(false)
                this.toggleAreaModal(false)
            }
            else this.toggleSaving(false)
        },
        async delArea(id) {
            let _ = this,
                idx = _.floor.areas.findIndex(f => f.id === id)

            _.$duDialog(null, `Remove <strong>${_.floor.areas.group_id}</strong>?`, {
                buttons: _.$duDialog.OK_CANCEL,
                okText: 'Remove',
                callbacks: {
                    okClick: function (e) {
                        this.hide()
                        _.toggleSaving(true)
                        axios.delete(_.api_area(_.company_id, _.bldg_id, _.floor.id, id), _.api_header).then(resp => {
                            if (resp.status == 200) {
                                _.floor.areas.splice(idx, 1)
                                _.toggleSaving(false)
                            }
                            else _.toggleSaving(true)
                        })
                    }
                }
            })
        }
    },
    async created() {
        let bldg = this.building,
            floors = this.floors

        if (bldg && bldg.id === this.bldg_id) {
            if (floors && floors.length > 0) this.loaded = true
            else await this.getFloors()
        } else {
            await this.getBuilding(this.bldg_id)
            await this.getFloors()
        }
        await this.getAreaTypes()
    },
    mounted() {
        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.deSelectFloor)
    },
    destroyed() {
        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.deSelectFloor)
    }
}
</script>


<style lang="scss" scoped>
#floor-list {
    margin-top: 24px;
}
#add-btn {
    margin-top: 24px;
}
#floor-entry {
    width: 400px;
    max-width: 100%;
}
.floor {
    position: relative;
    display: inline-block;
    flex-direction: column;
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    margin-right: 10px;
    transition: background-color 0.24s linear;

    .floor-thumb {
        position: relative;
        width: 200px;
        height: 135px;
        overflow: hidden;

        .fp-upload-progress {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            background-color: rgba($color: #393939, $alpha: 0.8);
            z-index: 1;
        }

        .fp-upload-trigger {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100% - 2px);
            font-size: 14px;
            cursor: pointer;
            border: 1px dashed rgba(255, 255, 255, .1);
            border-radius: 8px;
        }

        .fp-thumb {
            position: relative;
            height: 135px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border-radius: 8px;
            
            img {
                display: block;
                height: auto;
                max-width: 100%;
                margin: 0 auto;
                pointer-events: none;
                user-select: none;
            }

            .fp-thumb-opts {
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                padding: 2px 6px 6px;
                background-color: rgba($color: #393939, $alpha: 0.8);
                transform: translateY(100%);
                transition: transform .24s;

                a {
                    display: inline-block;
                    font-size: 14px;
                    cursor: pointer;

                    & + a { margin-left: 4px; }
                    
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            &:hover .fp-thumb-opts {
                transform: translateY(0);
            }
        }
    }

    .floor-info {
        flex: 1 auto;
        padding: 10px;

        .floor-number {
            display: inline-block;
            cursor: pointer;
            color: inherit;
            margin-bottom: 8px;
            transition: color .2s linear;

            &:hover {
                color: #ed762c;
            }
        }
    }

    .floor-opts {
        line-height: 13px;

        .floor-opt {
            font-size: 13px;
            cursor: pointer;
            user-select: none;

            & + .floor-opt { margin-left: 4px; }

            &:hover { text-decoration: underline; }
        }
    }

    &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.04);
    }

    &.selected {
        background-color: rgba($color: #ffffff, $alpha: 0.1);

        .floor-info {
            .floor-number {
                color: #ed762c;
            }
        }
    }
}

.fp-preview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #141414, $alpha: 0.85);

    .preview-header {
        position: relative;
        font-size: 18px;
        padding: 10px;
        line-height: 24px;
        background-color: rgba($color: #141414, $alpha: 0.7);
        z-index: 1;

        .preview-close {
            float: right;
            cursor: pointer;
            font-size: 14px;
            padding: 0 8px;
        }
    }

    img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 90%;
        max-width: 90%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        pointer-events: none;
        user-select: none;
        z-index: -1;
    }
}

#area-entry {
    width: 300px;
    max-width: 100%;
}

#area-list {
    position: absolute;
    top: 36px;
    right: 32px;
    bottom: 36px;
    width: 350px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 10px;
    background-color: rgb(48, 47, 63);
    overflow: hidden;

    ul {
        padding: 0;
        margin: 12px 0;
        list-style: none;
        overflow: auto;

        li {
            padding: 4px;
        }
    }

    .area-info {
        display: flex;
        padding: 8px;
        border-radius: 8px;
        background-color: transparent;
        transition: background-color .2s linear;

        &:hover {
            background-color: rgba($color: #ffffff, $alpha: 0.05);
        }

        .area-name {
            flex: 1 auto;
        }

        .area-opt {
            display: inline-block;
            font-size: 13px;
            cursor: pointer;
        }
    }
}
</style>