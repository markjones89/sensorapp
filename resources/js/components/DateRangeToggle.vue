<template>
    <div class="range-toggle graph-range-btns">
        <span class="graph-range-btn" 
            v-for="r in range" :key="r.value" @click="selectRange(r.value)"
            :class="{ 'btn--active': selected === r.value }">{{ r.label }}</span>
        <date-picker theme="dark" range="true" maxDate="today" :showPicker="showDatePicker" :visible="false" @dateSelect="customRange" @hidden="pickerHidden" />
    </div>
</template>
<script>
import DatePicker from './DatePicker'
export default {
    props: ['active'],
    components: { DatePicker },
    data() {
        return {
            range: [
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
                { value: 'year', label: 'This Year' },
                { value: 'custom', label: 'Pick Date' }
            ],
            selected: null, dateRange: null, showDatePicker: false
        }
    },
    methods: {
        selectRange(range) {
            let now = new Date(),
                from = null, to = null

            this.selected = range

            if (range === 'today') {
                from = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                to = new Date()
            } else if (range === 'week') {
                let w_f = now.getDate() - now.getDay()
                    //,w_l = w_f + 6

                from = new Date(now.setDate(w_f))
                to = new Date()
            } else if (range === 'month') {
                from = new Date(now.getFullYear(), now.getMonth(), 1)
                to = new Date()
            } else if (range === 'year') {
                from = new Date(now.getFullYear(), 0, 1)
                to = new Date()
            }

            if (range === 'custom') {
                this.showDatePicker = true
            } else {
                this.$emit('select', range, from, to)
            }
        },
        customRange(data) {
            this.$emit('select', 'custom', data._dateFrom, data._dateTo)
        },
        pickerHidden() { this.showDatePicker = false }
    },
    created() {
        if (this.active) {
            this.selected = this.active
        }
    }
}
</script>