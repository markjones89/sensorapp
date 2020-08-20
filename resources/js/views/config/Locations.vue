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
                <template v-if="entry.is_building">
                    <div class="row">
                        <div class="col">
                            <div class="input-field">
                                <label>Rental per m<sup>2</sup></label>
                                <input type="text" v-model="entry.info.rental_metre">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-field">
                                <label>Rental per ft<sup>2</sup></label>
                                <input type="text" v-model="entry.info.rental_foot">
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
    locations: '/api/locations'
}

export default {
    title: 'Locations',
    components: { LocationItem, Loader, Modal },
    data() {
        return {
            user: null, locations: [], cityRef: [],
            // refs: {
            //     continents: [], countries: [], states: [], cities: []
            // },
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
    /* watch: {
        'entry.continent': function(value, old) {
            if (value) {
                let _id = this.refs.continents.find(x => x.name === value).objectId
                this.getCountries(_id)
            }
        },
        'entry.country': function(value, old) {
            if (value) {
                let _id = this.refs.countries.find(x => x.name === value).objectId
                this.getStates(_id)
            }
        },
        'entry.state': function(value, old) {
            if (value) {
                let _id = this.refs.states.find(x => x.Subdivision_Name === value).objectId
                this.getCities(_id)
            }
        }
    }, */
    methods: {
        async jsonGet() {
            axios.get('/assets/cities')
                .then(x => {
                    // console.log(x.data)

                    this.cityRef = x.data
                })
        },
        async jsonPut(json) {
            axios.put('/assets/cities', { data: json })
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
        async addLoc() {
            this.toggleSaving(true)
            axios.post(api.locations, this.getEntry(false))
                .then(x => {
                    this.toggleSaving(false)
                    let res = x.data

                    if (res.r) {
                        res.data.is_building = this.entry.is_building
                        this.locations.push(res.data)
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
            let bldg = this.locations.find(l => l.hid === id)

            this.$parent.$router.push({ name: 'floors', params: { bid: id, bldg_name: bldg.name } })
        },
        toMapper(id) {
            let bldg = this.locations.find(l => l.hid === id)

            this.$parent.$router.push({ name: 'mapper', params: { bid: id, bldg_name: bldg.name } })
        },
        /* async getContinents() {
            let { data } = await axios.get(`${api.world.base}/${api.world.continent}`, {
                headers: api.world.headers,
                params: { order: 'name' },
            })

            this.refs.continents = data.results
        },
        async getCountries(continentId) {
            let where = JSON.stringify({
                "continent": {
                    "__type": "Pointer",
                    "className": api.world.continent,
                    "objectId": continentId
                    }
            })
            let { data } = await axios.get(`${api.world.base}/${api.world.country}`, {
                headers: api.world.headers,
                params: { order: 'name', keys: 'name,emoji,code,currency', where: where }
            })

            this.refs.countries = data.results
        },
        async getStates(countryId) {
            let where = JSON.stringify({
                "country": {
                    "__type": "Pointer",
                    "className": api.world.country,
                    "objectId": countryId
                }
            })
            let { data } = await axios.get(`${api.world.base}/${api.world.state}`, { 
                headers: api.world.headers,
                params: { order: 'name', excludeKeys: 'country,Country_Code', where: where }
            })

            console.log('states', data.results)
            this.refs.states = data.results
        },
        async getCities(stateId) {
            let where = JSON.stringify({
                "province": {
                    "__type": "Pointer",
                    "className": api.world.state,
                    "objectId": stateId
                }
            })
            let { data } = await axios.get(`${api.world.base}/${api.world.city}`, {
                headers: api.world.headers,
                params: { order: 'name', where: where }
            })

            console.log('cities', data.results)
            this.refs.cities = data.results
        } */
    },
    created() {
        this.user = store.getUser()
        this.jsonGet()

        // this.getContinents()
    },
    mounted() {
        this.getData()
    }
}
</script>