<template>
    <div class="content">
        <h1>Users</h1>
        <transition name="fadeUp" appear>
            <div id="user-list" v-if="loaded">
                <div class="role-group" v-for="g in groupedUsers" :key="g.hid">
                    <div class="group-panel">
                        <span class="role">{{ g.name }}</span>
                        <div class="group-opts">
                            <a class="group-opt" @click="triggerAdd(g.hid, g.byClient)">Add</a>
                        </div>
                    </div>
                    <table class="user-list">
                        <tbody>
                            <tr v-if="g.users.length === 0">
                                <td>No users</td>
                            </tr>
                            <tr v-else v-for="u in g.users" :key="u.hid">
                                <td v-if="user.isSuper && u.company" width="200">{{ u.company.name }}</td>
                                <td width="250">
                                    <span class="user-name">{{ u.name }}</span>
                                    <span class="invite-lbl" v-if="!u.email_verified_at">(Invite sent)</span>
                                    <span class="you-lbl" v-if="u.hid === user.hid">(You)</span>
                                </td>
                                <td>
                                    <span class="user-email">{{ u.email }}</span>
                                </td>
                                <!-- <td>
                                    options here...
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <button class="btn btn-primary" id="add-btn" @click="triggerAdd(null)">Add User</button> -->
            </div>
        </transition>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} User</h2>
            </template>
            <div id="entry-wrapper">
                <div class="input-field">
                    <label>Role</label>
                    <select v-model="entry.role" disabled>
                        <option v-for="r in roles" :key="r.hid" :value="r.hid">{{ r.name }}</option>
                    </select>
                </div>
                <div class="input-field" v-if="entry.showClient && user.isSuper">
                    <label>Client</label>
                    <select v-model="entry.client" :disabled="state.saving">
                        <option v-for="c in clients" :key="c.hid" :value="c.hid">{{ c.name }}</option>
                    </select>
                </div>
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="entry.name" ref="name" :disabled="state.saving">
                </div>
                <div class="input-field">
                    <label>Email</label>
                    <input type="email" v-model="entry.email" :disabled="state.saving">
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" id="send-btn" @click="addUser" :disabled="state.saving">{{ state.saving ? 'Sending...' : 'Send Invite' }}</button>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#user-list {
    margin-top: 24px;

    #add-btn {
        margin-top: 24px;
    }
}
.role-group {
    & + .role-group {
        margin-top: 32px;
    }

    .group-panel {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);

        .role {
            padding: 8px 0;
            font-size: 20px;
        }

        .group-opt {
            cursor: pointer;

            &:hover { text-decoration: underline; }
        }
    }

    .user-list {
        border-collapse: collapse;

        th {
            padding: 0 8px;
            text-align: left;
            line-height: 32px;
        }

        td {
            padding: 0 8px;
            line-height: 32px;
        }

        .invite-lbl {
            margin-left: 4px;
            font-size: 14px;
            font-style: italic;
            color: orange;
        }

        .you-lbl {
            margin-left: 4px;
            font-size: 14px;
            font-style: italic;
            color: grey;
        }
    }
}
#entry-wrapper {
    position: relative;
    width: 400px;
}
</style>
<script>
import { mapState, mapGetters } from 'vuex'
import { Loader, Modal } from '../../components'

const api = '/api/users'

export default {
    title: 'Users',
    components: { Loader, Modal },
    data() {
        return {
            // user: null, 
            clients: [], roles: [], users: [],
            loaded: false, showEntry: false, editMode: false,
            entry: {
                showClient: false, client: null, role: '', name: '', email: '', id: null
            },
            state: {
                saving: false
            }
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers'
        }),
        compId() {
            return this.user.isSuper ? this.entry.client : this.user.company_id
        },
        groupedUsers() {
            return this.roles.map(r => {
                return {
                    hid: r.hid,
                    name: r.name,
                    byClient: r.byCompany,
                    users: this.users.filter(u => u.role.hid === r.hid)
                }
            })
        }
    },
    methods: {
        async getDependencies(cb) {
            let res = await axios.all([
                axios.get(this.api_customers, this.api_header()),
                axios.get('/users/init-dependencies')
            ])

            let clients = res[1].data.clients

            if (clients) {
                let custs = res[0].data
                this.clients = []
                
                clients.forEach(c => {
                    let cust = custs.find(x => x.id == c.ref_id)

                    if (cust) {
                        c.name = cust.name
                        this.clients.push(c)
                    }
                })
            }

            this.roles = res[1].data.roles

            return cb && cb()
        },
        async getData() {
            let params = this.user.isSuper ? null : { params: { cid: this.compId } }
            let { data } = await axios.get(api, params)

            data.forEach(d => {
                if (d.company) d.company.name = this.clients.find(x => x.ref_id == d.company_id)?.name
            })

            this.users = data
            this.loaded = true
        },
        toggleEntry(show) {
            this.showEntry = show

            // if (show) setTimeout(() => { this.$refs.location.focus() }, 0)
        },
        triggerAdd(role, byClient) {
            this.entry.showClient = byClient
            this.entry.role = role
            this.editMode = false
            this.toggleEntry(true)
        },
        getEntry() {
            return {
                company: this.compId,
                name: this.entry.name,
                email: this.entry.email,
                role: this.entry.role
            }
        },
        toggleSaving(saving) { this.state.saving = saving },
        async addUser() {
            this.toggleSaving(true)
            axios.post(api, this.getEntry()).then(x => {
                this.toggleSaving(false)
                let res = x.data

                if (res.r) {
                    this.users.push(res.data)
                    this.toggleEntry(false)
                }

                this.$mdtoast(res.m, { type: res.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
            })
        }
    },
    // async created() {
    //     await this.getDependencies()
    // },
    mounted() {
        this.getDependencies(() => {
            this.getData()
        })
    }
}
</script>