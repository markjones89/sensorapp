import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: () => ({
        // Sensor backend api base url
        url: null,
        // Sensor backend api auth token
        authToken: null,
    }),
    mutations,
    getters
}