<template>
    <div class="content">
        <h1>Clients</h1>
        <transition name="fadeUp">
            <div id="client-list" v-if="loaded">
                <div class="client" v-for="c in clientList" :key="c.hid">
                    <div class="client-opts">
                        <a class="client-opt" @click="triggerEdit(c.hid)">Edit</a>
                        <a class="client-opt" @click="delClient(c.hid)">Remove</a>
                    </div>
                    {{ c.name }}
                </div>
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
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    transition: background-color .24s linear;

    &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.04);
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
import { Loader, Modal } from '../../components'
export default {
    title: 'Clients',
    components: { Loader, Modal },
    data() {
        return {
            clients: [], cName: '', cId: null,
            loaded: false, clientEntry: false, editMode: false,
            state: {
                saving: false
            }
        }
    },
    computed: {
        clientList() {
            return this.clients.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
            })
        }
    },
    methods: {
        async getData() {
            let { data } = await axios.get('/api/clients')

            this.clients = data
            this.loaded = true
        },
        toggleEntry(show) {
            this.clientEntry = show

            if (show) setTimeout(() => { this.$refs.cName.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        triggerAdd() {
            this.cId = null
            this.cName = ''
            this.editMode = false

            this.toggleEntry(true)
        },
        async addClient() {
            this.toggleSaving(true)
            axios.post('/api/clients', { name: this.cName })
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        this.clients.push(res.data)
                        this.toggleEntry(false)
                    }
                })
        },
        triggerEdit(id) {
            let c = this.clients.find(c => c.hid === id)

            console.log(id)

            this.cId = id
            this.cName = c.name
            this.editMode = true

            this.toggleEntry(true)
        },
        async upClient() {
            this.toggleSaving(true)
            axios.put(`/api/clients/${this.cId}`, { name: this.cName })
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        let c = this.clients.find(c => c.hid == this.cId)

                        c.name = this.cName
                        this.toggleEntry(false)
                    }
                })
        },
        async delClient(id) {
            let idx = this.clients.findIndex(c => c.hid === id)

            if (confirm(`Remove ${this.clients[idx].name} from clients?`)) {
                this.toggleSaving(true)
                axios.delete(`/api/clients/${id}`)
                    .then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) {
                            this.clients.splice(idx, 1)
                        }
                    })
            }
        }
    },
    mounted() {
        this.getData()
    }
}
</script>