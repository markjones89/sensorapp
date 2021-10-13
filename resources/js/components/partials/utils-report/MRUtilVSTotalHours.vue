<template>
    <div class="simultaneous-mr-util-vs-hours">
        <h2>SIMULTANEOUS MEETING ROOM UTILISATION VS TOTAL HOURS</h2>
        <div class="graph-loading" v-if="!dataLoaded">
            <ripple-loader />
        </div>
        <div class="graph-error" v-if="dataLoaded && dataError">
            <p>An error occured while getting the graph data, please try again.</p>
            <a href="javascript:;" @click="retry">Try again</a>
        </div>
        <div class="chart-holder d-flex justify-content-center" v-else-if="dataLoaded">
            <div id="bar-chart">
                <apexchart type="bar" height="400" :options="graphOptions" :series="graphSeries"></apexchart>
                <p>{{ maxRooms }} Meeting Rooms (out of {{ totalRooms }}) were utilised at the same time for a total of {{ `${maxRoomHour} ${ maxRoomHour > 1 ? 'hours' : 'hour' }` }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RippleLoader } from '@/components/loader'
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'MRUtilVSTotalHours',
    props: {
        query: { type: Object, required: true }
    },
    components: {
        apexchart: VueApexCharts,
        RippleLoader
    },
    data: () => ({
        dataLoaded: false, dataError: false,
        graphSeries: null,
        graphCategories: null,
        maxHour: 0,
        totalRooms: 0,
        maxRooms: 0,
        maxRoomHour: 0
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_room_util_vs_hours_rpt: 'backend/api_room_util_vs_hours_rpt'
        }),
        graphOptions() {
            // let ticks = this.maxHour > 20 ? (this.maxHour / 10) : this.maxHour > 10 ? (this.maxHour / 5) : 10
            return {
                chart: {
                    type: 'bar',
                    stacked: false,
                    zoom: { enabled: false },
                    toolbar: { show: false },
                    background: 'transparent',
                    fontFamily: 'Roboto, sans-serif'
                },
                colors: ['rgb(246,29,29)'],
                grid: {
                    borderColor: 'rgba(0,0,0,0.07)',
                    yaxis: {
                        lines: { show: true }
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%'
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '10px',
                        fontWeight: 'normal',
                        fontFamily: 'Roboto, sans-serif'
                    }
                },
                yaxis: {
                    tickAmount: 5,
                    min: 0,
                    max: this.maxHour
                },
                xaxis: {
                    categories: this.graphCategories,
                    labels: {
                        rotate: 0,
                        style: {
                            fontSize: '10px'
                        }
                    }
                }
            }
        }
    },
    methods: {
        async getData() {
            try {
                let { data } = await axios.post(this.api_room_util_vs_hours_rpt, this.query, this.api_header())
                let roomCounts = [...new Set(data.details.map(x => x.room_count))]
                let seriesData = []
                
                this.totalRooms = data.room_count
                this.maxRooms = Math.max(...roomCounts)

                roomCounts.sort((a, b) => a - b)
                roomCounts.forEach(c => {
                    let cat_data = data.details.find(x => x.room_count == c)
                    
                    if (cat_data) {
                        seriesData.push(cat_data.hour_use)

                        if (c == this.maxRooms) this.maxRoomHour = cat_data.hour_use
                    }
                })

                this.graphCategories = roomCounts.map(x => [x, x > 1 ? 'Rooms' : 'Room'])
                this.graphSeries = [
                    {
                        name: 'Meeting Room Utilisation vs Total Hours',
                        data: seriesData
                    }
                ]
                this.maxHour = Math.max(Math.ceil(Math.max(...seriesData) / 10) * 10, 10)
                this.dataLoaded = true
                this.dataError = false
            } catch (error) {
                console.log('getData.error', error)
                this.dataLoaded = true
                this.dataError = true
            }
        },
        retry() {
            this.dataLoaded = false
            this.getData()
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
.simultaneous-mr-util-vs-hours {
    padding: 24px 8px;
    margin-bottom: 64px;

    h3 {
        margin: 8px 0;
    }

    #bar-chart {
        width: 80%;
        margin-top: 24px;
    }
}
</style>