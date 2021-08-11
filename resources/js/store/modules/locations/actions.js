import { toOrdinal } from '@/helpers'

// get buildings from backend
const getBuildings = async ({ state, commit, getters }, customer) => {
    let { data } = await axios.get(getters.api_buildings(customer), getters.api_header())

    data.forEach(d => {
        let cache = state.buildings.find(x => x.id == d.id)

        d.continent_collapsed = cache?.continent_collapsed ?? false
        d.country_collapsed = cache?.country_collapsed ?? false
        d.state_collapsed = cache?.state_collapsed ?? false
        d.city_collapsed = cache?.city_collapsed ?? false
    })

    commit('locations/setBuildings', data)
}

const getBuilding = async ({ commit, getters }, payload) => {
    let res = await axios.all([
        axios.get('/api/floors', { bid: payload.bldg_id }),
        axios.get(getters.api_building_overview(payload.company_id, payload.bldg_id), getters.api_header())
    ])

    let refs = res[0].data,
        floors = [...(res[1].data.children || [])]

    floors.forEach(f => {
        let ref = refs.find(x => x.ref_id == f.id)
        f.ordinal_no = toOrdinal(f.number)
        f.occupancy_limit = ref?.occupancy_limit
        f.floor_plan = ref?.floor_plan
        f.floor_plan_url = ref?.floor_plan ? `${payload.baseUrl}/plans/${ref.floor_plan}` : null
        f.upload_info = {
            uploading: false, progress: 0
        }

        f.areas = f.children
        delete f.children
    })

    commit('locations/setFloors', { bid: payload.bldg_id, floors })
}

export default {
    getBuildings,
    getBuilding
}