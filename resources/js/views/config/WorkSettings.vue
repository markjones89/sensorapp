<template>
    <div class="content">
        <h1>Work Settings</h1>
        <transition name="fadeUp">
            <div id="settings-panel" v-if="loaded">
                <div id="company-settings" class="settings-section">
                    <h2>Company Logo</h2>
                    <div class="company-logo">
                        <div class="logo-holder">
                            <div class="upload-progress" v-if="upload_info.uploading">
                                <circle-progress :percent="upload_info.progress" />
                            </div>
                            <img v-if="user.company.logo" :src="`${baseUrl}/storage/logos/${user.company.logo}`">
                            <div class="upload-trigger" v-else @click="upLogo">
                                Add Logo
                            </div>
                            <div class="logo-opt" v-if="user.company.logo" @click="upLogo">Change</div>
                        </div>
                    </div>
                    <input type="file" ref="logoFile" hidden accept="image/*" @change="logoFileChange" />
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="settings-section">
                            <h2>Working Days</h2>
                            <div class="days-list">
                                <checkbox v-for="d in daysArr" :key="d.short" :label="d.name" :val="d.short" v-model="entry.work_days" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="settings-section">
                            <h2>Area Trigger Filter</h2>
                            <table id="trigger-filters">
                                <tbody>
                                    <tr v-for="a in areas" :key="a.hid">
                                        <td>{{ a.name }}</td>
                                        <td>
                                            <div class="input-field">
                                                <select v-model="a.trigger_filter">
                                                    <option value="null">Not specified</option>
                                                    <option v-for="m in getMinutes(a)" :key="m" :value="m">{{ m }} minutes</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="settings-section hours-section">
                            <h2>Working Hours</h2>
                            <time-slider :from="entry.start_time" :to="entry.end_time"
                                @startChanged="timeFromChange" @endChanged="timeToChange"></time-slider>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" @click="triggerSave" :disabled="state.saving && state.savingTriggers">{{ state.saving && state.savingTriggers ? 'Saving...' : 'Save settings' }}</button>
            </div>
        </transition>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
.company-logo {
    display: inline-flex;
    margin-top: 16px;

    .logo-holder {
        position: relative;
        display: flex;
        align-items: center;
        height: 48px;
        width: 150px;
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;

        .upload-trigger {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100% - 2px);
            font-size: 14px;
            cursor: pointer;
            border-radius: 10px;
            border: 1px dashed rgba(255, 255, 255, .1);
        }

        .upload-progress {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #2B2B2B;
        }

        img {
            height: auto;
            width: 100%;
        }

        .logo-opt {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            visibility: hidden;
            opacity: 0;
            transform: scale(1.25);
            background-color: rgba($color: #393939, $alpha: 0.8);
            transition: visibility .24s, opacity .24s, transform .24s;
        }

        &:hover .logo-opt {
            visibility: visible;
            opacity: 1;
            transform: scale(1);
        }
    }
}
.settings-section {
    margin: 24px 0;

    .days-list {
        padding: 10px 0;
    }

    &.hours-section {
        margin-bottom: 32px;
    }
}
#trigger-filters {
    td {
        padding: 4px 6px;
    }
    .input-field {
        margin-bottom: 0;
    }
}
</style>
<script>
import { mapMutations, mapState } from 'vuex'
// import { store } from '../../store'
import { getBaseUrl } from '../../helpers'
import { Checkbox, CircleProgress, Loader, TimeSlider } from '../../components'

const api = '/api/work-configs'
const atfApi = '/api/area-trigger-filter'
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default {
    title: 'Work Settings',
    components: { Checkbox, CircleProgress, Loader, TimeSlider },
    data() {
        return {
            loaded: false, 
            // user: null, 
            settings: null, 
            areas: [],
            entry: {
                start_time: null, end_time: null, area_triggers: [], work_days: []
            },
            upload_info: {
                uploading: false, progress: 0
            },
            state: { saving: false, savingTriggers: false }
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        baseUrl() { return getBaseUrl() },
        daysArr() {
            return days.map(d => {
                return { name: d, short: d.substr(0, 3) }
            })
        }
    },
    methods: {
        ...mapMutations(['setCompanyLogo']),
        getMinutes(area) {
            if (area.name == 'Meeting Rooms') {
                let arr = [];
                for (let i = 1; i <= 60; i++) { arr.push(i); }
                return arr;
            } else {
                return [5,10,15,20,25,30,35,40,45];
            }
        },
        timeFromChange(time) { this.entry.start_time = time },
        timeToChange(time) { this.entry.end_time = time },
        toggleSaving(saving) { this.state.saving = saving },
        async getSettings() {
            let { data } = await axios.get(api, { params: { cid: this.user.company.hid } })

            this.settings = data.ws
            this.loaded = true

            if (this.settings) {
                this.entry.start_time = data.ws.start_time
                this.entry.end_time = data.ws.end_time
                this.entry.work_days = data.ws.work_days.split(',')
            } else {
                this.entry.start_time = '8:00 am'
                this.entry.end_time = '5:00 pm'
                this.entry.work_days = days.map(d => { return d.substr(0, 3) })
            }
        },
        async getAreas() {
            let { data } = await axios.get('/api/areas/types', { params: {} })

            this.areas = data;
        },
        triggerSave() {
            if (this.settings) {
                this.upSettings()
            } else {
                this.addSettings()
            }
            this.saveAreaTriggers();
        },
        async addSettings() {
            this.toggleSaving(true)
            axios.post(api, {
                company: this.user.company.hid,
                start_time: this.entry.start_time,
                end_time: this.entry.end_time,
                work_days: this.entry.work_days.join(',')
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                this.$mdtoast(res.m, { type: res.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
            })
        },
        async upSettings() {
            this.toggleSaving(true)
            axios.put(`${api}/${this.settings.hid}`, {
                start_time: this.entry.start_time,
                end_time: this.entry.end_time,
                work_days: this.entry.work_days.join(',')
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data

                this.$mdtoast(res.m, { type: res.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
            })
        },
        async saveAreaTriggers() {
            let total = this.areas.length

            this.state.savingTriggers = true
            this.areas.forEach((a, i) => {
                axios.put(`/api/areas/trigger-filter/${a.hid}`, { minutes: a.trigger_filter, })
                    .then(x => { if (i == total) this.state.savingTriggers = false })
            });
        },
        upLogo() { this.$refs.logoFile.click() },
        logoFileChange() {
            let _ = this, file = _.$refs.logoFile.files[0]
            
            if (file) {
                _.upload_info.uploading = true
                _.uploadLogo(file, function(success, res) {
                    _.upload_info.uploading = false
                    if (success) {
                        if (res.r) {
                            _.setCompanyLogo(res.logo)
                        }
                    } else {
                        console.error(res)
                    }
                })
            }
        },
        async uploadLogo(file, cb) {
            let _ = this, formData = new window.FormData()

            formData.append('logo', file)
            formData.append('id', this.user.company.hid)

            axios.post(`/api/clients/logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progress) {
                    var percentCompleted = Math.round((progress.loaded * 100) / progress.total)

                    _.upload_info.progress = percentCompleted
                }
            }).then(x => cb(true, x.data))
            .catch(err => cb(false, err))
        }
    },
    // created() {
    //     this.user = store.getUser()
    // },
    mounted() {
        this.getAreas()
        this.getSettings()
    }
}
</script>