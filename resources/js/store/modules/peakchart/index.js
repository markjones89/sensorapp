import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: () => ({
        summary: null
    }),
    mutations,
    getters
}