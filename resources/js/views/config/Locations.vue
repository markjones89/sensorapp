<template>
    <div class="content">
        <h1>{{ user.isAdmin ? `${userCompany} Locations` : 'Locations' }}</h1>
        <transition name="fadeUp" appear>
            <div id="location-list" v-if="loaded">
                <location-item v-for="l in locationList" :key="l.name" :item="l" :subs="l.children" :depth="0"
                    @onAdd="triggerAdd" @onEdit="triggerEdit" @onDel="delLoc" @onSetup="toFloors" @onMapper="toMapper">
                </location-item>
                <button class="btn btn-primary" id="add-btn" @click="triggerAdd(null, null, 0)">Add Location</button>
            </div>
        </transition>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} {{ entry.is_building ? 'Building' : 'Location' }}</h2>
            </template>
            <div id="loc-entry">
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="entry.name" ref="location">
                </div>
                <h3 class="section-header" v-if="entry.is_building">Address</h3>
                <div class="input-field">
                    <label>Continent</label>
                    <select v-model="entry.continent">
                        <option v-for="c in continents" :key="c">{{ c }}</option>
                    </select>
                </div>
                <div class="input-field">
                    <label>Country</label>
                    <select v-model="entry.country">
                        <option v-for="c in countries" :key="c.country">{{ c.country }}</option>
                    </select>
                </div>
                <div class="input-field" v-if="entry.parent">
                    <label>State/Province</label>
                    <select v-model="entry.state">
                        <option v-for="s in states" :key="s">{{ s }}</option>
                    </select>
                </div>
                <div class="input-field" v-if="entry.parent">
                    <label>City/Municipality</label>
                    <select v-model="entry.city">
                        <option v-for="c in cities" :key="c">{{ c }}</option>
                    </select>
                </div>
                <template v-if="entry.is_building">
                    <h3 class="section-header">Details</h3>
                    <div class="row">
                        <div class="col">
                            <div class="input-field">
                                <label>Rental per m<sup>2</sup></label>
                                <input type="text" v-model="entry.info.rental_metre" @keyup="metreRentalKeyUp">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-field">
                                <label>Rental per ft<sup>2</sup></label>
                                <input type="text" v-model="entry.info.rental_foot" @keyup="footRentalKeyUp">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="input-field">
                                <label>Workspace Furniture Cost</label>
                                <input type="text" v-model="entry.info.furniture_cost">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-field">
                                <label>Allocated People</label>
                                <input type="text" v-model="entry.info.people_alloc">
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="addLoc" :disabled="state.saving" v-if="!editMode">{{ state.saving ? 'Adding...' : 'Add'}}</button>
                <button class="btn btn-primary" @click="upLoc" :disabled="state.saving" v-else>{{ state.saving ? 'Updating...' : 'Update'}}</button>
            </template>
        </modal>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
<style lang="scss" scoped>
#location-list {
    margin-top: 24px;

    #add-btn {
        margin-top: 24px;
    }
}
#loc-entry {
    position: relative;
    width: 400px;

    .section-header {
        margin: 32px 0 8px 0;
        padding: 0 0 8px;
        border-bottom: 1px solid rgba(255,255,255,.1);
    }
}
</style>
<script>
import { store } from '../../store'
import { LocationItem, Loader, Modal } from '../../components'

const api = {
    world: {
        base: 'https://parseapi.back4app.com/classes',
        headers: {
            'X-Parse-Application-Id': 'lH1HNSjLv6tTI1b73YXStT3y7QTAzCSrC8zUSRzN',
            'X-Parse-REST-API-Key': 'gOCHE8UmreKHG72ADFHNABow3jlwJ3SHMDPOhWl5'
        },
        continent: 'Continentscountriescities_Continent',
        country: 'Continentscountriescities_Country',
        state: 'Continentscountriescities_Subdivisions_States_Provinces',
        city: 'Continentscountriescities_City'
    },
    locations: '/api/locations',
    gcosts: '/api/gcosts'
}

const METRE_FOOT_FACTOR = 0.092903

export default {
    title: 'Locations',
    components: { LocationItem, Loader, Modal },
    data() {
        return {
            user: null, locations: [], cityRef: [], gCostsRef: [], cCostsRef: [],
            entry: {
                parent: null, id: null, name: '', continent: '', country: '', state: '', city: '', is_building: false,
                info: {
                    rental_metre: 0, rental_foot: 0, furniture_cost: 0, people_alloc: 0
                }
            },
            loaded: false, showEntry: false, editMode: false,
            state: {
                saving: false
            }
        }
    },
    computed: {
        userCompany() { return this.user ? this.user.company.name : null },
        compId() { return this.user ? this.user.cid : null },
        continents() {
            return this.cityRef.map(x => { return x.continent })
        },
        countries() {
            return this.cityRef.filter(x => x.continent === this.entry.continent)
                .map(x => { 
                    return x.countries.map(c => { 
                        return { country: c.country, timezone: c.timezone }
                    })
                })[0]
        },
        states() {
            return this.cityRef.filter(x => x.continent === this.entry.continent)
                .map(x => { 
                    return x.countries.filter(c => c.country === this.entry.country)
                        .map(c => {
                            return c.states.map(s => {
                                return s.state || s.province 
                            })
                        })[0]
                })[0]
        },
        cities() {
            return this.cityRef.filter(x => x.continent === this.entry.continent)
                .map(x => { 
                    return x.countries.filter(c => c.country === this.entry.country)
                        .map(c => {
                            return c.states.filter(s => (s.state || s.province) === this.entry.state)
                                .map(s => { return s.cities })[0]
                        })[0]
                })[0]
        },
        locationList() {
            let _ = this,
                keys = ['continent', 'parent', 'state', 'city'],
                grouped = [],
                temp = { _: grouped }

            function getParent(id) { return _.locations.find(x => x.hid === id) }

            // location grouping
            _.locations.forEach(function (a) {
                a.parent = getParent(a.pid || a.hid).name

                keys.reduce(function (r, k) {
                    if (!r[a[k]]) {

                        r[a[k]] = { _: [] }
                        
                        if (a[k]) {
                            let l = { ['name']: a[k], ['children']: r[a[k]]._ }

                            if (k === 'parent') {
                                l.pid = a.pid
                                l.hid = a.hid
                            }

                            if (k !== 'continent') {
                                l.continent = a.continent
                                l.country = a.country
                            }

                            if (['state', 'city'].indexOf(k) > -1) l.state = a.state
                            if (k === 'city') l.city = a.city

                            r._.push(l)
                        }
                    }
                    return r[a[k]]
                }, temp)._.push(a)
            })
            
            return grouped
        }
    },
    watch: {
        'entry.city': function(value) {
            if (this.editMode) return

            let gcosts = this.gCostsRef.find(c => c.country === this.entry.country && c.city === value)
            let ccosts = this.cCostsRef.find(c => c.country === this.entry.country && c.city === value)

            console.log(gcosts, ccosts)

            if (ccosts) {
                this.entry.info.rental_metre = ccosts.rental_metre
                this.entry.info.rental_foot = ccosts.rental_foot
                this.entry.info.furniture_cost = ccosts.furniture_cost
            } else if (gcosts) {
                this.entry.info.rental_metre = gcosts.rental_metre
                this.entry.info.rental_foot = gcosts.rental_foot
                this.entry.info.furniture_cost = gcosts.furniture_cost
            }
        }
    },
    methods: {
        async jsonGet() {
            let { data } = await axios.get('/assets/cities')
            this.cityRef = data
        },
        async jsonPut(json) {
            axios.put('/assets/cities', { data: json })
        },
        async getCostsRefs() {
            let { data } = await axios.get(`${api.locations}/${this.user.company.hid}/costs`)
            this.gCostsRef = data.global_costs
            this.cCostsRef = data.cust_costs
        },
        async getData() {
            let { data } = await axios.get(api.locations, { params: { cid: this.compId } })

            data.forEach(l => {
                if (l.state && l.city) {
                    l.is_building = true
                }
            })

            this.locations = data
            this.loaded = true
        },
        metreRentalKeyUp() {
            this.entry.info.rental_foot = (this.entry.info.rental_metre * METRE_FOOT_FACTOR).toFixed(2)
        },
        footRentalKeyUp() {
            this.entry.info.rental_metre = (this.entry.info.rental_foot / METRE_FOOT_FACTOR).toFixed(2)
        },
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.location.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        triggerAdd(parent, tItem, depth) {
            let tz = Intl.DateTimeFormat().resolvedOptions().timeZone,
                isBuilding = depth > 0

            this.entry.parent = parent
            this.entry.id = null
            this.entry.name = ''
            this.entry.is_building = isBuilding
            
            // building info
            this.entry.info.rental_metre = 0
            this.entry.info.rental_foot = 0
            this.entry.info.furniture_cost = 0
            this.entry.info.people_alloc = 0

            if (tz.startsWith('Africa')) this.entry.continent = 'Africa'
            else if (tz.startsWith('America')) this.entry.continent = 'North America'
            else if (tz.startsWith('Antarctica')) this.entry.continent = 'Antarctica'
            else if (tz.startsWith('Europe')) this.entry.continent = 'Europe'
            else if (tz.startsWith('Asia')) this.entry.continent = 'Asia'
            else if (tz.startsWith('Australia')) this.entry.continent = 'Oceania'
            else this.entry.continent = this.continents[0].name

            setTimeout(() => { this.entry.country = this.countries[0].country }, 0)

            if (tItem) {
                this.entry.continent = tItem.continent || tItem.name
                setTimeout(() => { this.entry.country = tItem.country }, 0)
                setTimeout(() => { this.entry.state = tItem.state }, 0)
                setTimeout(() => { this.entry.city = tItem.city }, 0)
            } else {
                this.entry.state = ''
                this.entry.city = ''
            }

            this.editMode = false
            this.toggleEntry(true)
        },
        getEntry(isEdit) {
            let data = {
                name: this.entry.name,
                continent: this.entry.continent,
                country: this.entry.country,
                state: this.entry.parent ? this.entry.state : null,
                city: this.entry.parent ? this.entry.city : null
            }

            if (!isEdit) data.company = this.compId
            if (this.entry.parent) data.parent = this.entry.parent

            if (this.entry.is_building) {
                data.building_info = {
                    rental_metre: this.entry.info.rental_metre,
                    rental_foot: this.entry.info.rental_foot,
                    furniture_cost: this.entry.info.furniture_cost,
                    people_alloc: this.entry.info.people_alloc
                }
            }

            return data
        },
        saveCustCosts(country, city, rental_metre, rental_foot, furniture_cost) {
            let ccosts = this.cCostsRef.find(c => c.country === country && c.city === city)

            if (ccosts) {
                ccosts.rental_metre = rental_metre
                ccosts.rental_foot = rental_foot
                ccosts.furniture_cost = furniture_cost
            } else {
                this.cCostsRef.push({
                    country: country, city: city,
                    rental_metre: rental_metre,
                    rental_foot: rental_foot,
                    furniture_cost: furniture_cost
                })
            }
        },
        async addLoc() {
            let _entry = this.getEntry(false)
            this.toggleSaving(true)
            axios.post(api.locations, _entry)
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        res.data.is_building = this.entry.is_building

                        this.locations.push(res.data)

                        if (res.saved_to_cust) {
                            this.saveCustCosts(this.entry.country, this.entry.city,
                                _entry.building_info.rental_metre, _entry.building_info.rental_foot, _entry.building_info.furniture_cost)
                        }

                        this.toggleEntry(false)
                    }
                })
        },
        triggerEdit(id) {
            let l = this.locations.find(l => l.hid === id)

            this.entry.id = id
            this.entry.parent = l.pid
            this.entry.name = l.name
            this.entry.continent = l.continent
            this.entry.country = l.country
            this.entry.state = l.state
            this.entry.city = l.city
            this.entry.is_building = l.is_building

            if (l.building_info) {
                this.entry.info.rental_metre = l.building_info.rental_metre
                this.entry.info.rental_foot = l.building_info.rental_foot
                this.entry.info.furniture_cost = l.building_info.furniture_cost
                this.entry.info.people_alloc = l.building_info.people_alloc
            } else {
                this.entry.info.rental_metre = 0
                this.entry.info.rental_foot = 0
                this.entry.info.furniture_cost = 0
                this.entry.info.people_alloc = 0
            }

            this.editMode = true

            this.toggleEntry(true)
        },
        async upLoc() {
            this.toggleSaving(true)
            let _entry = this.getEntry(true)
            axios.put(`${api.locations}/${this.entry.id}`, _entry)
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        let l = this.locations.find(l => l.hid == this.entry.id)

                        l.name = this.entry.name
                        l.continent = this.entry.continent
                        l.country = this.entry.country
                        l.state = this.entry.state
                        l.city = this.entry.city

                        if (this.entry.is_building) l.building_info = _entry.building_info
                        
                        if (res.saved_to_cust) {
                            this.saveCustCosts(this.entry.country, this.entry.city,
                                _entry.building_info.rental_metre, _entry.building_info.rental_foot, _entry.building_info.furniture_cost)
                        }

                        this.toggleEntry(false)
                    }
                })
        },
        async delLoc(id) {
            let idx = this.locations.findIndex(l => l.hid === id)

            if (confirm(`Remove ${this.locations[idx].name} from locations?`)) {
                this.toggleSaving(true)
                axios.delete(`${api.locations}/${id}`)
                    .then(x => {
                        this.toggleSaving(false)
                        let res = x.data

                        if (res.r) {
                            this.locations.splice(idx, 1)
                        }
                    })
            }
        },
        toFloors(id) {
            let bldg = this.locations.find(l => l.hid === id),
                sBldg = store.getBldg()

            if ((sBldg && sBldg.hid !== bldg.hid) ||
                !sBldg) {
                store.setBldg(bldg)
                store.setFloors([])
            }
            this.$parent.$router.push({ name: 'floors', params: { bid: id, bldg_name: bldg.name } })
        },
        toMapper(id) {
            let bldg = this.locations.find(l => l.hid === id),
                sBldg = store.getBldg()

            if ((sBldg && sBldg.hid !== bldg.hid) ||
                !sBldg) {
                store.setBldg(bldg)
                store.setFloors([])
            }
            this.$parent.$router.push({ name: 'mapper', params: { bid: id, bldg_name: bldg.name } })
        }
    },
    created() {
        this.user = store.getUser()
        this.jsonGet()
        this.getCostsRefs()
    },
    mounted() {
        this.getData()
    }
}
</script>