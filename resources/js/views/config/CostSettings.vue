<template>
    <div class="content">
        <h1>Cost Settings</h1>
        <transition name="fadeUp" appear>
            <div id="cost-list" v-if="loaded">
                <table>
                    <thead>
                        <tr>
                            <th width="150">Country</th>
                            <th width="150">City</th>
                            <th>Rental per m<sup>2</sup></th>
                            <th>Rental per ft<sup>2</sup></th>
                            <th>Workspace Furniture Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="costs.length === 0">
                            <td colspan="5">No records</td>
                        </tr>
                        <tr v-else v-for="c in costs" :key="c.hid" class="cost-item" @click="triggerEdit(c.hid)">
                            <td>{{ c.country }}</td>
                            <td>{{ c.city }}</td>
                            <td>{{ c.rental_metre.toLocaleString('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 2}) }}</td>
                            <td>{{ c.rental_foot.toLocaleString('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 2}) }}</td>
                            <td>{{ c.furniture_cost.toLocaleString('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 2}) }}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-primary" id="add-btn" @click="triggerAdd">Add Setting</button>
            </div>
        </transition>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Cost Setting</h2>
            </template>
            <div id="cost-entry">
                <div class="input-field">
                    <label>Country</label>
                    <select v-model="entry.country">
                        <option v-for="c in countries" :key="c">{{ c }}</option>
                    </select>
                </div>
                <div class="input-field">
                    <label>City/Town</label>
                    <select v-model="entry.city">
                        <!-- <option v-for="c in cities" :key="c.state">{{ c }}</option> -->
                        <optgroup v-for="c in cities" :key="c.state" :label="c.state">
                            <option v-for="city in c.cities" :key="`${c.state}.${city}`">{{ city }}</option>
                        </optgroup>
                    </select>
                </div>
                <div class="input-field">
                    <label>Rental per m<sup>2</sup></label>
                    <input type="text" v-model="entry.rental_metre">
                </div>
                <div class="input-field">
                    <label>Rental per ft<sup>2</sup></label>
                    <input type="text" v-model="entry.rental_foot">
                </div>
                <div class="input-field">
                    <label>Workspace Furniture Cost</label>
                    <input type="text" v-model="entry.furniture_cost">
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addSetting" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <button class="btn btn-primary" @click="upSetting" :disabled="state.saving" v-else>{{ state.saving ? 'Updating...' : 'Update'}}</button>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#cost-list {
    margin-top: 24px;
    
    table {
        border-collapse: collapse;

        th {
            padding: 0 8px;
            line-height: 48px;
            text-align: left;
            border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.1);

            sup {
                line-height: normal;
            }
        }

        td {
            padding: 0 8px;
            line-height: 32px;
        }

        .cost-item {
            cursor: pointer;
            transition: background-color .24s;

            &:hover {
                background-color: rgba($color: #ffffff, $alpha: 0.05);
            }
        }
    }

    #add-btn {
        margin-top: 24px;
    }
}
</style>
<script>
import { Loader, Modal } from '../../components'

const api = '/api/gcosts'
const METRE_FOOT_FACTOR = 0.092903

export default {
    title: 'Cost Settings',
    components: { Loader, Modal },
    data() {
        return {
            loaded: false, costs: [], cityRef: [], showEntry: false, editMode: false,
            entry: {
                id: null, country: '', city: '', rental_metre: 0, rental_foot: 0, furniture_cost: 0
            },
            state: {
                saving: false
            }
        }
    },
    computed: {
        countries() {
            return this.cityRef.reduce((acc, curr) => {
                return acc.concat(curr.countries.map(c => c.country))
            }, []).sort()
        },
        cities() {
            let _cities = this.cityRef.reduce((acc, curr) => {
                let country = curr.countries.filter(c => c.country === this.entry.country)[0],
                    cities = country ? country.states.reduce((sacc, state) => {
                        return sacc.concat({ state: state.province || state.state, cities: state.cities.sort() })
                    }, []) : []
                    
                return acc.concat(cities)
            }, []).sort((a, b) => {
                if (a.state > b.state) return 1
                if (a.state < b.state) return -1
                return 0
            })

            return _cities
        }
    },
    /* watch: {
        'entry.rental_metre': function(value) {
            this.entry.rental_foot = value * METRE_FOOT_FACTOR
        },
        'entry.rental_foot': function(value) {
            this.entry.rental_metre = value / METRE_FOOT_FACTOR
        }
    }, */
    methods: {
        async getCities() {
            let { data } = await axios.get('/assets/cities')
            this.cityRef = data
        },
        async getCosts() {
            let { data } = await axios.get(api)
            this.costs = data
            this.loaded = true
        },
        toggleSaving(saving) { this.state.saving = saving },
        toggleEntry(show) { this.showEntry = show },
        setEntry(country, city, rental_metre, rental_foot, furniture_cost) {
            this.entry.country = country
            this.entry.city = city
            this.entry.rental_metre = rental_metre
            this.entry.rental_foot = rental_foot
            this.entry.furniture_cost = furniture_cost
        },
        getEntry() {
            return {
                country: this.entry.country,
                city: this.entry.city,
                rental_metre: this.entry.rental_metre,
                rental_foot: this.entry.rental_foot,
                furniture_cost: this.entry.furniture_cost
            }
        },
        triggerAdd() {
            this.entry.id = null
            this.setEntry('', '', 0, 0, 0)
            this.editMode = false

            this.toggleEntry(true)
        },
        async addSetting() {
            this.toggleSaving(true)
            axios.post(api, this.getEntry())
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        this.costs.push(res.data)
                        this.toggleEntry(false)
                    }
                })
        },
        triggerEdit(id) {
            let c = this.costs.find(c => c.hid === id)

            this.entry.id = id
            this.setEntry(c.country, c.city, c.rental_metre, c.rental_foot, c.furniture_cost)
            this.editMode = true

            this.toggleEntry(true)
        },
        async upSetting() {
            this.toggleSaving(true)
            axios.put(`${api}/${this.entry.id}`, this.getEntry())
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        let c = this.costs.find(c => c.hid == this.entry.id)

                        c.country = this.entry.country
                        c.city = this.entry.city
                        c.rental_metre = this.entry.rental_metre
                        c.rental_foot = this.entry.rental_foot
                        c.furniture_cost = this.entry.furniture_cost
                        this.toggleEntry(false)
                    }
                })
        },
        async delSetting(id) {
            let idx = this.costs.findIndex(c => c.hid === id),
                c = this.costs[idx]

            if (confirm(`Remove cost settings for ${c.country} ${c.city}?`)) {
                this.toggleSaving(true)
                axios.delete(`${api}/${id}`)
                    .then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) {
                            this.costs.splice(idx, 1)
                        }
                    })
            }
        }
    },
    created() {
        this.getCities()
    },
    mounted() {
        this.getCosts()
    }
}
</script>