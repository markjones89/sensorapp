import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: () => ({
        summary: null,
        rangeFilter: {
            type: null,
            start: null,
            end: null
        },
        locationFilter: null,
        startTime: null,
        endTime: null,
        periodFilter: null,
    }),
    mutations,
    getters
}