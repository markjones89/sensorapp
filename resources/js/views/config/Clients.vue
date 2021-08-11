<template>
    <div class="content">
        <h1>Clients</h1>
        <transition name="fadeUp">
            <div id="client-list" v-if="loaded">
                <div class="client" v-for="c in clientList" :key="c.hid">
                    <div class="client-logo">
                        <div class="logo-upload-progress" v-if="c.upload_info.uploading">
                            <circle-progress :percent="c.upload_info.progress" />
                        </div>
                        <div class="logo-holder" v-if="c.logo">
                            <img :src="`${baseUrl}/storage/logos/${c.logo}`">
                            <a @click="upLogo(c.hid)" class="logo-opt">Change Logo</a>
                        </div>
                        <div v-else class="logo-upload-trigger" @click="upLogo(c.hid)">
                            Add Logo
                        </div>
                    </div>
                    <div class="client-info">
                        <div class="client-opts">
                            <a class="client-opt" @click="triggerEdit(c.hid)">Edit</a>
                            <!-- <a class="client-opt" @click="delClient(c.hid)">Remove</a> -->
                        </div>
                    {{ c.name }}
                    </div>
                </div>
                <input type="file" ref="logoFile" hidden accept="image/*" @change="logoFileChange" />
                <button class="btn btn-primary" id="add-btn" @click="triggerAdd">Add Client</button>
            </div>
        </transition>
        <modal :show="clientEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Client</h2>
            </template>
            <div id="client-entry">
                <div class="input-field">
                    <label>Company Name</label>
                    <input type="text" v-model="cName" ref="cName">
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addClient" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <button class="btn btn-primary" @click="upClient" :disabled="state.saving" v-else>{{ state.saving ? 'Updating...' : 'Update'}}</button>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#client-list {
    margin-top: 24px;

    #add-btn {
        margin-top: 24px;
    }
}
.client {
    display: flex;
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    transition: background-color .24s linear;

    &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.025);
    }

    .client-logo {
        position: relative;
        width: 170px;
        height: 68px;
        overflow: hidden;

        .logo-upload-progress {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            background-color: #2B2B2B;
            border-radius: 10px;
            z-index: 1;
        }

        .logo-upload-trigger {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100% - 2px);
            font-size: 14px;
            cursor: pointer;
            border: 1px dashed rgba(255, 255, 255, .1);
            border-radius: 10px;
        }

        .logo-holder {
            position: relative;
            height: 48px;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            overflow: hidden;

            img {
                height: 100%;
                width: auto;
                max-width: 100%;
                pointer-events: none;
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
                font-size: 14px;
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

    .client-info {
        padding-left: 16px;
    }

    .client-opts {
        line-height: 13px;

        .client-opt {
            font-size: 13px;
            cursor: pointer;
            user-select: none;

            &:hover { text-decoration: underline; }
        }
    }
}
#client-entry {
    width: 400px;
}
</style>
<script>
import { mapGetters } from 'vuex'
import { getBaseUrl } from '../../helpers'
import { CircleProgress, Loader, Modal } from '../../components'

const api = '/api/clients'

export default {
    title: 'Clients',
    components: { CircleProgress, Loader, Modal },
    data: () => ({
        clients: [], cName: '', cId: null, refId: null,
        loaded: false, clientEntry: false, editMode: false,
        state: {
            saving: false
        }
    }),
    computed: {
        baseUrl() { return getBaseUrl() },
        clientList() {
            return this.clients.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
            })
        },
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers'
        })
    },
    methods: {
        async getData() {
            let res = await axios.all([
                axios.get(this.api_customers, this.api_header()),
                axios.get(api)
            ])

            let custs = res[0].data,
                data = res[1].data

            data.forEach(c => {
                let cust = custs.find(x => x.id == c.ref_id)

                if (cust) {
                    if (cust.bucket) c.bucket = cust.bucket
                    c.name = cust.name
                    c.upload_info = { uploading: false, progress: 0 }
                    this.clients.push(c)
                }
            })

            this.loaded = true
        },
        toggleEntry(show) {
            this.clientEntry = show

            if (show) setTimeout(() => { this.$refs.cName.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        triggerAdd() {
            this.cId = null
            this.refId = null
            this.cName = ''
            this.editMode = false

            this.toggleEntry(true)
        },
        async addClient() {
            this.toggleSaving(true)
            let cust = await axios.post(this.api_customers, { name: this.cName }, this.api_header())

            if (cust.status == 200) {
                axios.post(api, { ref_id: cust.data.id })
                    .then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) {
                            res.data.name = this.cName
                            res.data.upload_info = { uploading: false, progress: 0, name: this.cName }
                            this.clients.push(res.data)
                            this.toggleEntry(false)
                        }

                        this.$mdtoast(res.m, { type: res.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
                    })
            } else this.toggleSaving(false)
        },
        triggerEdit(id) {
            let c = this.clients.find(c => c.hid === id)

            this.cId = id
            this.refId = c.ref_id
            this.cName = c.name
            this.editMode = true

            this.toggleEntry(true)
        },
        async upClient() {
            this.toggleSaving(true)
            let c = this.clients.find(c => c.hid == this.cId),
                _data = { name: this.cName }

            if (c.bucket) _data.bucket = c.bucket

            axios.put(`${this.api_customers}/${this.refId}`, _data, this.api_header())
                .then(x => {
                    this.toggleSaving(false)
                    if (x.status == 200) {
                        let res = x.data

                        if (res.r) {
                            c.name = this.cName
                            this.toggleEntry(false)
                        }

                        this.$mdtoast(res.m, { type: res.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
                    }
                })
        },
        async delClient(id) {
            let _ = this, idx = _.clients.findIndex(c => c.hid === id)

            _.$duDialog(null, `Remove ${_.clients[idx].name} from clients?`, {
                buttons: _.$duDialog.OK_CANCEL,
                okText: 'Remove',
                callbacks: {
                    okClick: function (e) {
                        this.hide()
                        _.toggleSaving(true)
                        axios.delete(`${api}/${id}`)
                            .then(x => {
                                _.toggleSaving(false)
                                let res = x.data

                                if (res.r) {
                                    _.clients.splice(idx, 1)
                                }

                                _.$mdtoast(res.m, { type: res.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
                            })
                    }
                }
            })
        },
        upLogo(id) {
            this.cId = id
            this.$refs.logoFile.click()
        },
        logoFileChange() {
            let _ = this, file = _.$refs.logoFile.files[0]
            
            if (file) {
                let c = _.clients.find(c => c.hid === _.cId)

                c.upload_info.uploading = true
                _.uploadLogo(file, function(success, res) {
                    c.upload_info.uploading = false
                    if (success) {
                        if (res.r) {
                            c.logo = res.logo
                        }
                    } else {
                        console.error(res)
                    }
                })
            }
        },
        async uploadLogo(file, cb) {
            let formData = new window.FormData(),
                c = this.clients.find(c => c.hid === this.cId)

            formData.append('logo', file)
            formData.append('id', this.cId)

            axios.post(`${api}/logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progress) {
                    var percentCompleted = Math.round((progress.loaded * 100) / progress.total)

                    c.upload_info.progress = percentCompleted
                }
            }).then(x => cb(true, x.data))
            .catch(err => cb(false, err))
        }
    },
    mounted() {
        this.getData()
    }
}
</script>