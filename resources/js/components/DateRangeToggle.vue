<template>
    <div class="range-toggle graph-range-btns">
        <span class="graph-range-btn" 
            v-for="r in range" :key="r.value" @click.prevent="selectRange(r.value)"
            :class="{ 'btn--active': selected === r.value }">{{ r.label }}</span>
        <!-- <date-picker theme="dark" range="true" maxDate="today" :showPicker="showDatePicker" :visible="false" @dateSelect="customRange" @hidden="pickerHidden" /> -->
        <du-datepicker ref="datepicker" v-model="customRangeValue" :options="datepickerOpts" data-hidden="true" :dateChanged="customRange"/>
    </div>
</template>
<script>
import moment from 'moment'
import { isoToDate, isSameDate, padNum } from '@/helpers'
import { mapState } from 'vuex'
export default {
    props: ['active'],
    data: () => ({
        range: [
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' },
            { value: 'year', label: 'This Year' },
            { value: 'custom', label: 'Pick Date' }
        ],
        selected: null, dateRange: null, showDatePicker: false,
        dateFrom: null, dateTo: null,
        datepickerOpts: {
            maxDate: 'today', range: true, value: null
        },
        customRangeValue: null
    }),
    computed: {
        ...mapState({
            theme: state => state.user.theme
        })
    },
    watch: {
        theme: function(theme) {
            let dpTheme = theme == 'dark' ? 'dark' : 'orange'
            
            this.$refs.datepicker.setTheme(dpTheme)
        }
    },
    methods: {
        getDateRange(range) {
            let _today = moment().hours(0).minutes(0).seconds(0).milliseconds(0),
                from = null, to = null

            if (range === 'today') {
                from = _today.clone().toDate()
                to = _today.toDate()
            } else if (range === 'week') {
                from = _today.clone().startOf('isoWeek').toDate()
                to = _today.toDate()
            } else if (range === 'month') {
                from = _today.clone().startOf('month').toDate()
                to = _today.toDate()
            } else if (range === 'year') {
                from = _today.clone().startOf('year').toDate()
                to = _today.toDate()
            }

            return { from, to }
        },
        selectRange(range) {
            if (range === 'custom') {
                this.$refs.datepicker.show()
            } else {
                let dateRange = this.getDateRange(range)
                let sameFrom = this.dateFrom && isSameDate(this.dateFrom, dateRange.from)
                let sameTo = this.dateTo && isSameDate(this.dateTo, dateRange.to)

                if (range == this.selected && sameFrom && sameTo) return

                this.selected = range
                this.dateFrom = dateRange.from
                this.dateTo = dateRange.to
                this.$emit('select', range, dateRange.from, dateRange.to)
            }
        },
        customRange(data) {
            let sameFrom = this.dateFrom && isSameDate(this.dateFrom, data._dateFrom)
            let sameTo = this.dateTo && isSameDate(this.dateTo, data._dateTo)

            if (sameFrom && sameTo) return
            
            this.selected = 'custom'
            this.dateFrom = data._dateFrom
            this.dateTo = data._dateTo
            this.$emit('select', 'custom', data._dateFrom, data._dateTo)
        },
        pickerHidden() { this.showDatePicker = false }
    },
    created() {
        this.datepickerOpts.theme = this.theme == 'light' ? 'orange' : 'dark'

        if (this.active.type) {
            // let dateRange = this.getDateRange(this.active.type)
            let startDate = isoToDate(this.active.start)
            let endDate = isoToDate(this.active.end)

            this.selected = this.active.type
            this.dateFrom = startDate
            this.dateTo = endDate

            if (this.selected == 'custom') {
                let df = `${ padNum(startDate.getMonth() + 1, 2) }/${ padNum(startDate.getDate(), 2) }/${ startDate.getFullYear() }`
                let dt = `${ padNum(endDate.getMonth() + 1, 2) }/${ padNum(endDate.getDate(), 2) }/${ endDate.getFullYear() }`

                this.customRangeValue = [df, dt].join('-')
            }
        }
    }
}
</script>