<template>
    <span class="graph-filter" @click="showDropdown = !showDropdown" ref="graphFilter">
        <!-- Filter By -->
        {{ chosenAsSelected && selected ? selectedLabel : placeholder }}
        <span class="caret">
            <caret-icon />
        </span>
        <filter-dropdown :filters="filters" :chosen="chosen" v-model="selected" :show="showDropdown" :position="position" @onSelect="onSelect" />
    </span>
</template>

<script>
import { FilterDropdown } from '@/components'
import { CaretIcon } from '@/components/icons'
import { addEvent, removeEvent } from '@/helpers'
export default {
    props: {
        filters: {
            type: Array,
            required: true
        },
        chosen: [String, Number, Boolean],
        chosenAsSelected: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: 'Select'
        },
        position: {
            type: String, default: 'bottom'
        }
    },
    components: {
        CaretIcon,
        FilterDropdown
    },
    data: () => ({
        showDropdown: false,
        selectedLabel: '',
        selected: null
    }),
    methods: {
        onSelect(value, label) { 
            this.selected = value
            this.selectedLabel = label || value
            this.$emit('onSelect', value, label)
        },
        handleClose(e) {
            let _ = this
            if (['mousedown', 'touchend'].indexOf(e.type) >= 0) {
                if (e.target != _.$refs.graphFilter) {
                    _.showDropdown = false
                }
            }
            
        }
    },
    mounted() {
        this.selectedLabel = this.placeholder
        
        if (this.chosen) {
            let selected = this.filters.find(x => typeof x == 'object' ? x.value == this.chosen : x == this.chosen)

            if (typeof selected == 'object') this.selectedLabel = selected.label
            else this.selectedLabel = selected
            
            this.selected = this.chosen
        }

        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.handleClose)
    },
    destroyed() {
        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.handleClose)
    }
}
</script>