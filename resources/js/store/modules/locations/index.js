import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: () => ({
        client: null,
        buildings: [],
        building: null,
        // floors: [],
        floor: null,
        // areas: [],
        // sensors: []
    }),
    mutations,
    getters
}