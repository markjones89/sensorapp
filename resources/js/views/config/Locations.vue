<template>
    <div class="content">
        <div class="graph-header" v-if="loaded">
            <h2 class="page-title">Locations</h2>
            <div class="graph-filters" v-if="user.isSuper">
                <span class="graph-filter" @click="filterClient = !filterClient">
                    {{ clientName ? clientName : 'Select Location' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="clientList" :show="filterClient" @onSelect="selectClient" />
                </span>
            </div>
        </div>
        <transition name="fadeUp" appear>
            <div id="location-list" v-if="loaded && !apiError">
                <location-item v-for="l in locationList" :key="l.name" :item="l" :subs="l.children" :depth="0"
                    @onAdd="triggerAdd" @onEdit="triggerEdit" @onDel="delLoc" @onSetup="toSetup" @onMapper="toMapper" @collapse="toggleSubs">
                </location-item>
                <button class="btn btn-primary" id="add-btn" @click="triggerAdd(null, null)">Add Building</button>
            </div>
            <div v-if="loaded && apiError" class="error-display">
                {{ apiError }}
            </div>
        </transition>
        <modal :show="showEntry" @close="toggleEntry(false)">
            <template v-slot:header>
                <h2>{{ editMode ? 'Edit' : 'Add' }} Building</h2>
            </template>
            <div id="loc-entry">
                <div class="input-field">
                    <label>Name</label>
                    <input type="text" v-model="entry.name" ref="location">
                </div>
                <h3 class="section-header">Address</h3>
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
                <div class="input-field">
                    <label>Region/Province/State</label>
                    <select v-model="entry.state">
                        <option v-for="s in states" :key="s">{{ s }}</option>
                    </select>
                </div>
                <div class="input-field">
                    <label>City/Municipality</label>
                    <select v-model="entry.city">
                        <option v-for="c in cities" :key="c">{{ c }}</option>
                    </select>
                </div>
                <h3 class="section-header">Details</h3>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Rental per m<sup>2</sup></label>
                            <input type="text" v-model="entry.info.rental_sqm" @keyup="metreRentalKeyUp">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Rental per ft<sup>2</sup></label>
                            <input type="text" v-model="entry.info.rental_sqft" @keyup="footRentalKeyUp">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Workspace Furniture Cost</label>
                            <input type="text" v-model="entry.info.furniture_cost">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="input-field">
                            <label>Allocated People</label>
                            <input type="text" v-model="entry.info.employee_allocation">
                        </div>
                    </div>
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
    max-width: 100%;

    .section-header {
        margin: 32px 0 8px 0;
        padding: 0 0 8px;
        border-bottom: 1px solid rgba(255,255,255,.1);
    }
}
</style>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { addEvent, removeEvent } from '../../helpers'
import { FilterDropdown, LocationItem, Loader, Modal } from '../../components'
import { CaretIcon } from '../../components/icons'

const api = {
    url: '/api/locations',
    locations: '/api/locations',
    gcosts: '/api/gcosts'
}
const METRE_FOOT_FACTOR = 0.092903

export default {
    title: 'Locations',
    components: { CaretIcon, FilterDropdown, LocationItem, Loader, Modal },
    data: () => ({
        clients: [],
        locations: [], cityRef: [], gCostsRef: [], cCostsRef: [],
        filterClient: false, clientId: null, clientName: null, apiError: null,
        entry: {
            parent: null, id: null, name: '', continent: '', country: '', state: '', city: '', //is_building: false,
            info: {
                rental_sqm: 0, rental_sqft: 0, furniture_cost: 0, employee_allocation: 0
            }
        },
        loaded: false, showEntry: false, editMode: false,
        state: {
            saving: false
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user.info,
            // clients: state => state.clients,
            client: state => state.locations.client
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers',
            api_buildings: 'backend/api_buildings',
            api_building: 'backend/api_building',
            buildings: 'locations/getBuildings',
            building: 'locations/getBuilding'
        }),
        continents() { return this.cityRef.map(x => { return x.continent }) },
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
                locs = this.locations.sort((a, b) => {
                    if (a.name > b.name) return 1
                    else if (a.name < b.name) return -1
                    return 0
                }),
                keys = ['continent', 'country', 'state', 'city'],
                grouped = [],
                temp = { _: grouped }

            // location grouping
            locs.forEach(function (a) {
                keys.reduce(function (r, k) {
                    if (!r[a[k]]) {

                        r[a[k]] = { _: [] }
                        
                        if (a[k]) {
                            let l = { ['name']: a[k], ['children']: r[a[k]]._ }

                            if (k === 'city') {
                                l.continent = a.continent
                                l.country = a.country
                                l.state = a.state
                                l.city = a.city
                            }

                            if (['continent', 'country', 'state', 'city'].indexOf(k) >= 0) {
                                l.collapsed = a[`${k}_collapsed`]
                            }

                            r._.push(l)
                        }
                    }
                    return r[a[k]]
                }, temp)._.push(a)
            })

            // console.log('groupedLocations', grouped)
            
            return grouped
        },
        clientList() { return this.clients.map(x => { return { label: x.name, value: x.id } }) },
        companyId() { return this.clientId || this.user.company_id }
    },
    watch: {
        'entry.city': function(value) {
            if (this.editMode) return

            let gcosts = this.gCostsRef.find(c => c.country === this.entry.country && c.city === value)
            let ccosts = this.cCostsRef.find(c => c.country === this.entry.country && c.city === value)

            if (ccosts) {
                this.entry.info.rental_sqm = ccosts.rental_metre
                this.entry.info.rental_sqft = ccosts.rental_foot
                this.entry.info.furniture_cost = ccosts.furniture_cost
            } else if (gcosts) {
                this.entry.info.rental_sqm = gcosts.rental_metre
                this.entry.info.rental_sqft = gcosts.rental_foot
                this.entry.info.furniture_cost = gcosts.furniture_cost
            }
        }
    },
    methods: {
        ...mapMutations({
            // setClients: 'setClients',
            setClient: 'locations/setClient',
            setBuildings: 'locations/setBuildings',
            setBuilding: 'locations/setBuilding',
            setFloors: 'locations/setFloors'
        }),
        async getReferences() {
            let resp = await axios.all([
                axios.get('/assets/cities'),
                axios.get(`${api.url}/${this.companyId}/costs`)
            ])

            this.cityRef = resp[0].data
            this.gCostsRef = resp[1].data.global_costs
            this.cCostsRef = resp[1].data.cust_costs
        },
        async putCityRefs(json) { axios.put('/assets/cities', { data: json }) },
        async getData() {
            let compId = this.clientId || this.user.company_id

            if (!compId) return

            try {
                let { data } = await axios.get(this.api_buildings(compId), this.api_header())

                data.forEach(d => {
                    let cache = this.buildings.find(x => x.id == d.id)

                    d.continent_collapsed = cache?.continent_collapsed ?? false
                    d.country_collapsed = cache?.country_collapsed ?? false
                    d.state_collapsed = cache?.state_collapsed ?? false
                    d.city_collapsed = cache?.city_collapsed ?? false
                })

                this.locations = data
                this.setBuildings(this.locations)
                this.apiError = null
            } catch (error) {
                this.locations = []
                this.setBuildings([])
                this.apiError = error.response.data.message
            }
            this.loaded = true
        },
        selectClient(id, name) {
            this.clientId = id
            this.clientName = name
            this.filterClient = false
            this.setClient(id)
            this.loaded = false
            this.getReferences()
            this.getData()
        },
        metreRentalKeyUp() { this.entry.info.rental_sqft = (this.entry.info.rental_sqm * METRE_FOOT_FACTOR).toFixed(2) },
        footRentalKeyUp() { this.entry.info.rental_sqm = (this.entry.info.rental_sqft / METRE_FOOT_FACTOR).toFixed(2) },
        toggleEntry(show) {
            this.showEntry = show

            if (show) setTimeout(() => { this.$refs.location.focus() }, 0)
        },
        toggleSaving(saving) { this.state.saving = saving },
        triggerAdd(parent, tItem, depth) {
            let tz = Intl.DateTimeFormat().resolvedOptions().timeZone//, isBuilding = depth > 0

            this.entry.parent = parent
            this.entry.id = null
            this.entry.name = ''
            this.entry.info.rental_sqm = 0
            this.entry.info.rental_sqft = 0
            this.entry.info.furniture_cost = 0
            this.entry.info.employee_allocation = 0

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
        getEntry() {
            let data = {
                name: this.entry.name,
                city: this.entry.city,
                state: this.entry.state,
                country: this.entry.country,
                continent: this.entry.continent,
                rental_sqm: this.entry.info.rental_sqm,
                rental_sqft: this.entry.info.rental_sqft,
                furniture_cost: this.entry.info.furniture_cost,
                employee_allocation: this.entry.info.employee_allocation
            }

            return data
        },
        saveCustCosts(country, city, rental_sqm, rental_sqft, furniture_cost) {
            let ccosts = this.cCostsRef.find(c => c.country === country && c.city === city)

            if (ccosts) {
                ccosts.rental_sqm = rental_sqm
                ccosts.rental_sqft = rental_sqft
                ccosts.furniture_cost = furniture_cost
            } else {
                this.cCostsRef.push({
                    country: country, city: city,
                    rental_sqm: rental_sqm,
                    rental_sqft: rental_sqft,
                    furniture_cost: furniture_cost
                })
            }
        },
        async addLoc() {
            let _entry = this.getEntry()

            this.toggleSaving(true)

            _entry.birthday = (new Date()).toISOString()
            let res = await axios.post(this.api_buildings(this.companyId), _entry, this.api_header())

            if (res.status == 200) {
                _entry.id = res.data.child_id
                _entry.continent_collapsed = false
                _entry.country_collapsed = false
                _entry.state_collapsed = false
                _entry.city_collapsed = false
                this.locations.push(_entry)
                this.toggleSaving(false)
                this.toggleEntry(false)
                // save costs cache
                axios.post(`${api.url}/${this.user.company.hid}/costs`, _entry)
                    .then(x => {
                        let res = x.data

                        if (res.r) {
                            this.saveCustCosts(this.entry.country, this.entry.city,
                                _entry.rental_sqm, _entry.rental_sqft, _entry.furniture_cost)
                        }
                    })
            } else this.toggleSaving(false)
        },
        triggerEdit(id) {
            let l = this.locations.find(l => l.id === id)

            this.entry.id = id
            this.entry.parent = l.pid
            this.entry.name = l.name
            this.entry.continent = l.continent
            this.entry.country = l.country
            this.entry.state = l.state
            this.entry.city = l.city
            this.entry.info.rental_sqm = l.rental_sqm
            this.entry.info.rental_sqft = l.rental_sqft
            this.entry.info.furniture_cost = l.furniture_cost
            this.entry.info.employee_allocation = l.employee_allocation

            this.editMode = true
            this.toggleEntry(true)
        },
        async upLoc() {
            let _entry = this.getEntry(),
                _id = this.entry.id

            this.toggleSaving(true)
            let l = this.locations.find(x => x.id == _id)

            if (l.measurement) _entry.measurement = l.measurement
            if (l.birthday) _entry.birthday = l.birthday

            let res = await axios.put(this.api_building(this.companyId, _id), _entry, this.api_header())

            if (res.status == 200) {
                l.name = this.entry.name
                l.city = this.entry.city
                l.state = this.entry.state
                l.country = this.entry.country
                l.continent = this.entry.continent
                l.rental_sqm = this.entry.info.rental_sqm
                l.rental_sqft = this.entry.info.rental_sqft
                l.furniture_cost = this.entry.info.furniture_cost
                l.employee_allocation = this.entry.info.employee_allocation

                this.toggleSaving(false)
                this.toggleEntry(false)
                // save costs cache
                axios.post(`${api.url}/${this.user.company.hid}/costs`, _entry)
                    .then(x => {
                        let res = x.data

                        if (res.r) {
                            this.saveCustCosts(this.entry.country, this.entry.city,
                                _entry.rental_sqm, _entry.rental_sqft, _entry.furniture_cost)
                        }
                    })
            } else this.toggleSaving(false)
        },
        async delLoc(id) {
            let _ = this,
                idx = _.locations.findIndex(l => l.id === id)

            _.$duDialog(null, `Remove <strong>${_.locations[idx].name}</strong>?`, {
                buttons: _.$duDialog.OK_CANCEL,
                okText: 'Remove',
                callbacks: {
                    okClick: function (e) {
                        this.hide()
                        _.toggleSaving(true)
                        axios.delete(_.api_building(this.companyId, id), _.api_header)
                            .then(x => {
                                _.toggleSaving(false)
                                let res = x.data

                                if (res.status == 200) _.locations.splice(idx, 1)
                            })
                    }
                }
            })
        },
        toggleSubs(item, type, collapse) {
            this.locations.filter(l => l[type] == item.name)
                .forEach(l => l[`${type}_collapsed`] = collapse)
            item.collapsed = collapse
        },
        toSetup(id) {
            let bldg = this.locations.find(l => l.id === id),
                sBldg = this.building

            if ((sBldg && sBldg.hid !== bldg.hid) ||
                !sBldg) {
                this.setBuilding(bldg)
                this.setFloors([])
            }
            this.$parent.$router.push({ name: 'building_setup', params: { bid: id, bldg_name: bldg.name } })
        },
        toMapper(id) {
            let bldg = this.locations.find(l => l.id === id),
                sBldg = this.building

            if ((sBldg && sBldg.hid !== bldg.hid) ||
                !sBldg) {
                this.setBuilding(bldg)
                this.setFloors([])
            }
            this.$parent.$router.push({ name: 'mapper', params: { bid: id, bldg_name: bldg.name } })
        },
        pageOptsHandler(e) {
            let _ = this

            if (['mousedown', 'touchend'].indexOf(e.type) >= 0) {
                if (!e.target.closest('.graph-filter')) {
                    _.filterClient = false
                }
            } else if (e.type === 'keydown') {
                if (e.keyCode === 27) _.filterClient = false
            }
        }
    },
    async created() {
        if (this.user.isSuper) {
            if (this.clients.length == 0) {
                let { data } = await axios.get(this.api_customers, this.api_header())
            
                // this.setClients(data)
                this.clients = data
            }
            
            if (this.client) {
                this.clientId = this.client
                this.clientName = this.clients.find(x => x.id == this.client).name
            } else {
                this.selectClient(this.clients[0].id, this.clients[0].name)
            }
        } else await this.getReferences()
    },
    async mounted() {
        if (this.buildings.length === 0) await this.getData()
        else {
            this.locations = this.buildings
            this.loaded = true
        }

        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)
    },
    destroyed() {
        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)
    }
}
</script>