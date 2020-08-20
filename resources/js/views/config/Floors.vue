<template>
    <div class="content">
        <h1>{{ building ? `Floors - ${building}` : 'Floors' }}</h1>
        <transition name="fadeUp" appear>
            <div id="list-wrapper" v-if="loaded">
                <div id="floor-list">
                    <div v-if="floorList.length === 0">No floors defined</div>
                    <div class="floor" v-for="f in floorList" :key="f.hid" v-else>
                        <div class="floor-thumb">
                            <div class="fp-upload-progress" v-if="f.upload_info.uploading">
                                Uploading
                                <circle-progress :percent="f.upload_info.progress" />
                            </div>
                            <div class="fp-thumb" v-if="f.floor_plan">
                                <img :src="`${baseUrl}/plans/thumbnail/${f.floor_plan}`">
                                <div class="fp-thumb-opts">
                                    <a @click="upFloorPlan(f.hid)">Change</a>
                                    <a @click="viewFloorPlan(f.hid, f.floor_plan)">Preview</a>
                                </div>
                            </div>
                            <div v-else class="fp-upload-trigger" @click="upFloorPlan(f.hid)">
                                Upload Floor Plan
                            </div>
                        </div>
                        <div class="floor-info">
                            {{ `${f.ordinal_no} Floor` }}
                            <div class="floor-opts">
                                <template v-if="f.floor_plan">
                                    <a class="floor-opt" @click="toMapper(f.hid)">Mapper</a>
                                </template>
                                <a class="floor-opt" @click="triggerEdit(f.hid)">Edit</a>
                                <a class="floor-opt" @click="delFloor(f.hid)">Remove</a>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="file" ref="fpFile" hidden accept="image/*" @change="fpFileChange" />
                <button class="btn btn-primary" id="add-btn" @click="triggerAdd">Add Floor</button>
                <div class="fp-preview" v-if="showPlan">
                    <loader :show="!state.imgLoaded" type="spinner"/>
                    <img v-if="state.imgLoaded" :src="`${baseUrl}/plans/${floor.floor_plan}`">
                    <div class="preview-header">
                        {{ `${building} - ${floor.ordinal_no} Floor` }}
                        <span class="preview-close" @click="togglePlan(false)">Close</span>
                    </div>
                </div>
            </div>
        </transition>
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
}
#add-btn {
    margin-top: 24px;
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

    &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.04);
    }

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
        }

        .fp-thumb {
            position: relative;
            height: 135px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            
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
</style>
<script>
import { CircleProgress, Loader, Modal } from '../../components'
import { getBaseUrl, preloadImage, toOrdinal }  from '../../helpers'

const bldgApi = '/api/locations'
const api = '/api/floors'

export default {
    title: 'Floors Setup',
    props: ['bldg_id', 'bldg_name'],
    components: { CircleProgress, Loader, Modal },
    data() {
        return {
            bldgName: null, floors: [], floor: null, listTransition: 'fadeUp',
            loaded: false, showEntry: false, editMode: false,
            entry: { id: null, fNo: 1 },
            showPlan: false, planUrl: null,
            state: {
                saving: false, imgLoaded: false
            }
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

            data.forEach(f => {
                f.upload_info = {
                    uploading: false, progress: 0
                }
            })

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
                        res.data.upload_info = {
                            uploading: false, progress: 0
                        }
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

            if (file) {
                let f = _.floors.find(f => f.hid === _.entry.id)

                f.upload_info.uploading = true
                _.upload(file, function(success, res) {
                    f.upload_info.uploading = false
                    if (success) {
                        if (res.r) {
                            f.floor_plan = res.floor_plan
                        }
                    } else {
                        console.error(res)
                    }
                })
            }
        },
        async upload(file, cb) {
            let formData = new window.FormData(),
                f = this.floors.find(f => f.hid === this.entry.id)

            formData.append('floor_plan', file)
            formData.append('id', this.entry.id)

            axios.post(`${api}/plan`, formData, {
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
            _.floor = _.floors.find(f => f.hid === id)
            _.togglePlan(true)

            _.state.imgLoaded = false
            preloadImage(`${_.baseUrl}/plans/${_.floor.floor_plan}`, function() {
                _.state.imgLoaded = true
            })
        },
        toMapper(id) {
            this.$parent.$router.push({ name: 'mapper', query: { fid: id }, params: { bid: this.bldg_id, bldg_name: this.bldg_name } })
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