<template>
    <div v-if="dataLoaded" id="hierarchy-graph">
        <template v-if="!dataError">
            <div class="chart-header">
                <span class="chart-title">{{ graphTitle }}</span>
                <!-- <span class="chart-subtitle">{{ subtitle }}</span> -->
            </div>
            <div id="bar-chart"></div>
        </template>
        <div v-else class="error-display" style="height: 60vh">
            <p>{{ dataError }}</p>
            <a href="javascript:;" class="btn btn-primary" @click="renderChart(true)" style="align-self:center;">Retry</a>
        </div>
    </div>
    <div v-else style="height: 60vh">
        <loader :show="!dataLoaded" type="ripple"/>
    </div>
</template>

<script>
import { Loader } from '@/components'
// import { getObjValue, toOrdinal } from '@/helpers'
import barChart from '@/components/graphs/BarChart'

function randomNum(limit) {
    return Math.floor((Math.random() * (limit || 100)) + 1)
}

function randomData (range) {
    let data = []
    if (range === 'today') {
        let hours = []

        for (let i = 0; i < 24; i++) { hours.push(`${("00" + i).substr(-2,2)}:00`) }

        hours.forEach(h => {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Hour: h, Peak: peak, Average: avg })
        })
    } else if (range === 'week') {
        let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        days.forEach(d => {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Day: d, Peak: peak, Average: avg })
        })
    } else if (range === 'month') {
        let now = new Date(),
            days = (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate(),
            dates = [],
            month = now.toString().substr(4,3)

        for (let i = 1; i <= days; i++) {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Date: `${month} ${i}`, Peak: peak, Average: avg })
        }
    } else if (range === 'year') {
        let months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        months.forEach(m => {
            let avg = randomNum(90), peak = avg + randomNum(100 - avg)

            data.push({ Month: m, Peak: peak, Average: avg })
        })
    }

    return data
}

export default {
    props: {
        buildingData: { type: Object },
        rangeFilter: { type: String },
        roomFilter: { type: String },
        dataFilters: { type: Object }
    },
    components: {
        Loader
    },
    data: () => ({
        chart: null,
        dataLoaded: true, dataError: null,
        graphTitle: 'Graph Title'
    }),
    watch: {
        // rangeFilter(value) {
        //     console.log('watch.rangeFilter', value, arguments)
        //     if (this.chart) this.chart.update(randomData(value))
        // },
        roomFilter(value) {
            if (this.chart) this.chart.update(randomData(this.rangeFilter))
        },
        dataFilters: {
            deep: true,
            handler() {
                console.log('watch.dataFilters', arguments)
                if (this.chart) this.chart.update(randomData(this.rangeFilter))
            }
        }
    },
    methods: {
        renderChart() {
            this.chart = new barChart('#bar-chart', randomData(this.rangeFilter))
        }
    },
    mounted() {
        this.renderChart()
    }
}
</script>

<style lang="scss" scoped>

</style>