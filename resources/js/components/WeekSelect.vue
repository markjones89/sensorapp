<template>
    <select @change="selectWeek">
        <option
            v-for="w in weeksList"
            :key="w.week"
            :value="w.week"
        >
            {{ `Week ${w.week} (${w.range})` }}
        </option>
    </select>
</template>

<script>
import moment from 'moment'
export default {
    model: {
        prop: 'selectModel',
        event: 'change'
    },
    props: {
        year: { required: true },
        selectModel: { default: '' }
    },
    data: () => ({
        weeksList: []
    }),
    watch: {
        year: function() {
            this.weeksList = this.getWeeks()
        }
    },
    methods: {
        getWeeks() {
            let weeks = []
            let year = parseInt(this.year)
            let weeksInYear = moment(`${year}-01-01`).isoWeeksInYear()

            for (let week = 1; week <= weeksInYear; week++) {
                let _moment = moment().hours(0).minutes(0).seconds(0).milliseconds(0)
                let start = _moment.year(year).isoWeek(week).day('monday')
                let end = start.clone().add(6, 'd')

                weeks.push({
                    week,
                    start: start.toDate(),
                    end: end.toDate(),
                    range: start.isSame(end, 'year') ? 
                        `${start.format('MMM D')} - ${end.format(start.isSame(end, 'month') ? 'D' : 'MMM D')}` :
                        `${start.format(start.year() == year ? 'MMM D' : 'MMM D, YYYY')} - ${end.format(end.year() == year ? 'MMM D' : 'MMM D, YYYY')}`
                })
            }

            return weeks
        },
        selectWeek(evt) {
            let value = evt.target.value
            let weekObj = this.weeksList.find(x => x.week == value)

            this.$emit('change', weekObj.week, weekObj)
        }
    },
    created() {
        this.weeksList = this.getWeeks()
    }
}
</script>