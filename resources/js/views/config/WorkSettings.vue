<template>
    <div class="content">
        <h1>Work Settings</h1>
        <transition name="fadeUp">
            <div id="settings-panel" v-if="loaded">
                <div class="row">
                    <div class="col">
                        <div class="settings-section">
                            <h2>Working Days</h2>
                            <div class="days-list">
                                <span class="checkbox" v-for="d in daysArr" :key="d.short">
                                    <input type="checkbox" v-model="entry.work_days" :id="`cb${d.short}`" :value="d.short">
                                    <label :for="`cb${d.short}`">{{ d.name }}</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="settings-section hours-section">
                            <h2>Working Hours</h2>
                            <time-slider :from="entry.start_time" :to="entry.end_time"
                                @startChanged="timeFromChange" @endChanged="timeToChange"></time-slider>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" @click="triggerSave">Save Settings</button>
            </div>
        </transition>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
.settings-section {
    margin: 24px 0;

    .days-list {
        padding: 10px 0;

        .checkbox {
            display: block;

            & + .checkbox { margin-top: 8px; }
        }
    }

    &.hours-section {
        margin-bottom: 32px;
    }
}
</style>
<script>
import { store } from '../../store'
import { Loader, TimeSlider } from '../../components'

const api = '/api/work-configs'
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default {
    components: { Loader, TimeSlider },
    data() {
        return {
            loaded: false, user: null, settings: null,
            entry: {
                start_time: null, end_time: null, work_days: []
            },
            state: { saving: false }
        }
    },
    computed: {
        daysArr() {
            return days.map(d => {
                return { name: d, short: d.substr(0, 3) }
            })
        }
    },
    methods: {
        timeFromChange(time) { this.entry.start_time = time },
        timeToChange(time) { this.entry.end_time = time },
        toggleSaving(saving) { this.state.saving = saving },
        async getSettings() {
            let { data } = await axios.get(api, { params: { cid: this.user.cid } })

            this.settings = data.ws
            this.loaded = true

            if (this.settings) {
                this.entry.start_time = data.ws.start_time
                this.entry.end_time = data.ws.end_time
                this.entry.work_days = data.ws.work_days.split(',')
            } else {
                this.entry.work_days = days.map(d => { return d.substr(0, 3) })
            }
        },
        triggerSave() {
            if (this.settings) {
                this.upSettings()
            } else {
                this.addSettings()
            }
        },
        async addSettings() {
            this.toggleSaving(true)
            axios.post(api, {
                company: this.user.cid,
                start_time: this.entry.start_time,
                end_time: this.entry.end_time,
                work_days: this.entry.work_days.join(',')
            }).then(x => {
                this.toggleSaving(false)
                let res = x.data
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
            })
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        this.getSettings()
    }
}
</script>