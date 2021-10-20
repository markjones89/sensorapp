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
        filter: { value: 'opportunity_cost', label: 'Cost of Unused Spaces', boxLabel: 'Opportunity Cost', btnLabel: 'Cost Analysis' },
        locationFilter: null,
        startTime: null,
        endTime: null,
        periodFilter: null,
    }),
    mutations,
    getters
}