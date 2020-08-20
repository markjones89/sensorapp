<template>
    <div class="content">
        <h2>Sync Places</h2>
        <!-- <textarea cols="30" rows="10" v-html="placesJson">
        </textarea> -->
    </div>
</template>
<script>
const api = {
    base: 'https://parseapi.back4app.com/classes',
    headers: {
        'X-Parse-Application-Id': 'lH1HNSjLv6tTI1b73YXStT3y7QTAzCSrC8zUSRzN',
        'X-Parse-REST-API-Key': 'gOCHE8UmreKHG72ADFHNABow3jlwJ3SHMDPOhWl5'
    },
    continent: 'Continentscountriescities_Continent',
    country: 'Continentscountriescities_Country',
    state: 'Continentscountriescities_Subdivisions_States_Provinces',
    city: 'Continentscountriescities_City'
}
export default {
    title: 'Synce Places API',
    date() {
        return {
            places: []
        }
    },
    computed: {
        placesJson() { return JSON.stringify(this.places) }
    },
    methods: {
        async getCountries(continentId, cb) {
            axios.get(`${api.base}/${api.country}`, {
                headers: api.headers,
                params: {
                    order: 'name', keys: 'objectId,name,emoji,code,currency', 
                    where: JSON.stringify({
                        "continent": {
                            "__type": "Pointer",
                            "className": api.continent,
                            "objectId": continentId
                        }
                    })
                }
            }).then(x => {
                let data = x.data
                let countries = data.results.map(x => { return { id: x.objectId, code: x.code, name: x.name, emoji: x.emoji, states: [] } })

                cb(countries)
            })
        },
        async getStates(countryCode, cb) {
            axios.get(`${api.base}/${api.state}`, { 
                headers: api.headers,
                params: {
                    order: 'name', excludeKeys: 'country,Country_Code',
                    where: JSON.stringify({
                        "Country_Code": countryCode
                    })
                }
            }).then(x => {
                let data = x.data
                let states = data.results.map(x => { return { id: x.objectId, code: x.Subdivision_Code, type: x.Subdivion_Type, name: x.Subdivision_Name, cities: [] } })

                cb(states)
            })
        },
        async getCities(stateId, cb) {
            axios.get(`${api.base}/${api.city}`, {
                headers: api.headers,
                params: {
                    order: 'name',
                    where: JSON.stringify({
                        "province": {
                            "__type": "Pointer",
                            "className": api.state,
                            "objectId": stateId
                        }
                    }) 
                }
            }).then(x => {
                let data = x.data
                let cities = data.results.map(x => { return x.name })

                cb(cities)
            })
        },
        async getPlaces() {
            let { data } = await axios.get(`${api.base}/${api.continent}`, {
                headers: api.headers,
                params: { order: 'name' },
            })

            let continents = data.results.map(x => { return { id: x.objectId, code: x.code, name: x.name, countries: [] } })

            // get countries
            continents.forEach(continent => {
                this.getCountries(continent.id, countries => {
                    // get states
                    countries.forEach(country => {
                        this.getStates(country.code, states => {
                            //get cities
                            /* states.forEach(state => {
                                this.getCities(state.id, cities => {
                                    state.cities = cities
                                })
                            }) */

                            country.states = states
                        })
                    })

                    continent.countries = countries
                })
            })

            this.places = continents

            navigator.clipboard.writeText(this.placesJson)
        }
    },
    mounted() {
        // this.getPlaces()
    }
}
</script>