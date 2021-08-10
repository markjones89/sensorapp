import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: () => ({
        summary: null,
        rangeFilter: null,
        locationFilter: null,
        startTime: null,
        endTime: null,
        periodFilter: null,
    }),
    mutations,
    getters
}