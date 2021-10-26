<template>
    <graph-filter placeholder="Filter By" :filters="filters" :chosen="filter.value" :chosenAsSelected="true" @onSelect="filterSelect" />
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { GraphFilter } from '@/components'
export default {
    components: {
        GraphFilter
    },
    data: () => ({
        filters: [
            { value: 'opportunity_cost', label: 'Cost of Unused Spaces', boxLabel: 'Opportunity Cost', btnLabel: 'Cost Analysis' },
            { value: 'workspace_utils.max_percentage', label: 'Peak Usage', boxLabel: 'Peak Workspace Utilisation', btnLabel: 'Peak Usage' },
            { value: 'workspace_utils.average_percentage', label: 'Average Usage', boxLabel: 'Average Workspace Utilisation', btnLabel: 'Average Usage' },
            { value: 'low_perform_workspace.average_percentage', label: 'Low Performing Spaces', boxLabel: 'Low Performing Spaces', btnLabel: 'Low Performing Spaces' },
            { value: 'free_workspace_utils.average_percentage', label: 'Spare Capacity', boxLabel: 'Spare Capacity', btnLabel: 'Spare Capacity' }
        ]
    }),
    computed: {
        ...mapState({
            filter: state => state.homepage.filter
        })
    },
    methods: {
        ...mapMutations({
            setFilter: 'homepage/setFilter'
        }),
        filterSelect(value, label, obj) {
            this.setFilter(obj)
            this.$emit('filterSelect', obj)
        }
    },
    created() {
        if (this.filter == null) this.setFilter(this.filters[0])
    }
}
</script>