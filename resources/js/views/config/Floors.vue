<template>
    <div class="content">
        <h1>{{ building ? `Floors - ${building}` : 'Floors' }}</h1>
        <template v-if="loaded">
            <transition name="fade" appear>
                <div id="plan-wrapper" v-if="showPlan" >
                    <h2>{{ `${floor.ordinal_no} Floor` }}</h2>
                    <img :src="`${baseUrl}/plans/${floor.floor_plan}`">
                    <button class="btn btn-primary" id="back-btn" @click="togglePlan(false)">Back</button>
                </div>
            </transition>
            <transition :name="listTransition" appear>
                <div id="floor-list" v-if="!showPlan">
                    <div v-if="floorList.length === 0">No floors defined</div>
                    <div class="floor" v-for="f in floorList" :key="f.hid" v-else>
                        <div class="floor-opts">
                            <a class="floor-opt" @click="upFloorPlan(f.hid)">Upload Floor Plan</a>
                            <template v-if="f.floor_plan">
                                <a class="floor-opt" @click="viewFloorPlan(f.hid, f.floor_plan)">Floor Plan</a>
                                <a class="floor-opt" @click="viewSensors(f.hid)">Sensors</a>
                            </template>
                            <a class="floor-opt" @click="triggerEdit(f.hid)">Edit</a>
                            <a class="floor-opt" @click="delFloor(f.hid)">Remove</a>
                        </div>
                        {{ `${f.ordinal_no} Floor` }}
                    </div>
                    <input type="file" ref="fpFile" hidden accept="image/*" @change="fpFileChange" />
                    <button class="btn btn-primary" id="add-btn" @click="triggerAdd">Add Floor</button>
                </div>
            </transition>
        </template>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Floor</h2>
            </template>
            <div id="entry-wrapper">
                <div class="input-field">
                    <label>Floor No.</label>
                    <input type="number" v-model="entry.fNo" ref="fNo">
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addFloor" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <button class="btn btn-primary" @click="upFloor" :disabled="state.saving" v-else>{{ state.saving ? 'Updating...' : 'Update'}}</button>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#floor-list {
    margin-top: 24px;

    #add-btn {
        margin-top: 24px;
    }
}
.floor {
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    transition: background-color .24s linear;

    &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.04);
    }

    .floor-opts {
        line-height: 13px;

        .floor-opt {
            font-size: 13px;
            cursor: pointer;
            user-select: none;

            &:hover { text-decoration: underline; }
        }
    }
}
#plan-wrapper {
    position: relative;
    padding: 16px;

    h2 {
        margin-bottom: 10px;
    }

    img {
        display: block;
        max-width: 100%;
        pointer-events: none;
        user-select: none;
        background-color: #ffffff;
    }

    #back-btn {
        margin-top: 24px;
    }
}
</style>
<script>
import { Loader, Modal } from '../../components'
import { getBaseUrl, toOrdinal }  from '../../helpers'

const bldgApi = '/api/locations'
const api = '/api/floors'

export default {
    title: 'Floors Setup',
    props: ['bldg_id', 'bldg_name'],
    components: { Loader, Modal },
    data() {
        return {
            bldgName: null, floors: [], floor: null, listTransition: 'fadeUp',
            loaded: false, showEntry: false, editMode: false,
            entry: { id: null, fNo: 1 },
            showPlan: false, planUrl: null,
            state: { saving: false }
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() },
        building() { return this.bldg_name ? this.bldg_name : this.bldgName },
        floorList() {
            return this.floors.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })
        }
    },
    methods: {
        async getBldgName() {
            let { data } = await axios.get(bldgApi, { params: { id: this.bldg_id } })

            this.bldgName = data.name
        },
        async getFloors() {
            let { data } = await axios.get(api, { params: { bid: this.bldg_id } })

            this.floors = data
            this.loaded = true
        },
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.fNo.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        triggerAdd() {
            this.entry.id = null
            this.entry.fNo = 1
            this.editMode = false

            this.toggleEntry(true)
        },
        async addFloor() {
            this.toggleSaving(true)
            axios.post(api, { building: this.bldg_id, floor_no: this.entry.fNo })
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        this.floors.push(res.data)
                        this.toggleEntry(false)
                    }
                })
        },
        triggerEdit(id) {
            let f = this.floors.find(f => f.hid === id)

            this.entry.id = id
            this.entry.fNo = f.floor_no
            this.editMode = true

            this.toggleEntry(true)
        },
        async upFloor() {
            this.toggleSaving(true)
            axios.put(`${api}/${this.entry.id}`, { floor_no: this.entry.fNo })
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        let f = this.floors.find(f => f.hid == this.entry.id)

                        f.floor_no = this.entry.fNo
                        f.ordinal_no = toOrdinal(f.floor_no)
                        this.toggleEntry(false)
                    }
                })
        },
        async delFloor(id) {
            let idx = this.floors.findIndex(f => f.hid === id)

            if (confirm(`Remove Floor ${this.floors[idx].floor_no}?`)) {
                this.toggleSaving(true)
                axios.delete(`${api}/${id}`)
                    .then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) {
                            this.floors.splice(idx, 1)
                        }
                    })
            }
        },
        upFloorPlan(id) {
            this.entry.id = id

            this.$refs.fpFile.click()
        },
        fpFileChange() {
            let _ = this, file = _.$refs.fpFile.files[0]
                // loader = mdtoast('Importing vault...', { duration: null, modal: true, init: true })

            if (file) {
                // loader.show()
                _.upload(file, function(success, res) {
                    if (success) {
                        if (res.r) {
                            let f = _.floors.find(f => f.hid === _.entry.id)

                            f.floor_plan = res.floor_plan
                        }
                    } else {
                        // mdtoast(res, { type: 'error' })
                        console.error(res)
                    }
                })
            }
        },
        async upload(file, cb) {
            let formData = new window.FormData()

            formData.append('floor_plan', file)
            formData.append('id', this.entry.id)

            axios.post(`${api}/plan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(x => cb(true, x.data))
            .catch(err => cb(false, err))
        },
        togglePlan(show) { 
            this.showPlan = show 
            this.listTransition = 'fade'
        },
        viewFloorPlan(id, plan) {
            this.floor = this.floors.find(f => f.hid === id)
            this.togglePlan(true)
        },
        viewSensors(id) {
            this.$parent.$router.push({ name: 'sensors', query: { bid: this.bldg_id, fid: id }, params: { bldg_name: this.bldg_name } })
        }
    },
    created() {
        if (!this.bldg_name) this.getBldgName()
    },
    mounted() {
        this.getFloors()
    }
}
</script>