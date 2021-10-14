<template>
    <div class="meeting-room-performance">
        <h2>MEETING ROOM PERFORMANCE: UTILISATION & EFFICIENCY</h2>
        <h3>{{ floor }}</h3>
        <div class="row">
            <div class="col">
                <div class="graph-loading" v-if="!dataLoaded">
                    <ripple-loader />
                </div>
                <div class="graph-error" v-if="dataLoaded && dataError">
                    <p>An error occured while getting the graph data, please try again.</p>
                    <a href="javascript:;" @click="retry">Try again</a>
                </div>
                <div class="chart-holder" v-else-if="dataLoaded">
                    <apexchart type="bar" height="400" :options="graphOptions" :series="graphSeries"></apexchart>
                    <p v-if="footerRoom">{{ footerRoom.name }} {{ footerRoom.room_size }} Seater Meeting Room was utilised {{ footerRoom.avgUtil }}% of the time, whilst averaging {{ footerRoom.avgEfficiency }}% efficiency in terms of capacity</p>
                </div>
            </div>
            <div class="col-3">
                <h4>Insight</h4>
                <div class="insight-card">
                    <span class="insight-title">Average Utilisation</span>
                    <span class="insight-percent">{{ insights.avgUtil }}%</span>
                </div>
                <div class="insight-card red">
                    <span class="insight-title">Average Efficiency</span>
                    <span class="insight-percent">{{ insights.avgEfficiency }}%</span>
                </div>
                <div class="insight-keys">
                    <h4 class="section-header">Key</h4>
                    <ul>
                        <li>Room Utilisation</li>
                        <li class="red">Efficiency when in Use</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RippleLoader } from '@/components/loader'
import { average, roundNum } from '@/helpers'
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'MeetingRoomPerformance',
    props: {
        floor: { type: String, required: true },
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
        maxPercent: 0,
        insights: {
            avgUtil: 0,
            avgEfficiency: 0
        },
        footerRoom: null
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_room_util_vs_efficiency: 'backend/api_room_util_vs_efficiency'
        }),
        graphOptions() {
            return {
                chart: {
                    type: 'bar',
                    height: 400,
                    stacked: false,
                    zoom: { enabled: false },
                    toolbar: { show: false },
                    background: 'transparent',
                    fontFamily: 'Roboto, sans-serif'
                },
                colors: ['rgb(246,29,29)', '#000'],
                stroke: { curve: 'straight', width: 1, },
                legend: { show: false },
                grid: {
                    borderColor: 'rgba(0,0,0,0.07)',
                    yaxis: {
                        lines: { show: true }
                    }
                },
                dataLabels: { enabled: false },
                yaxis: {
                    tickAmount: 10,
                    min: 0,
                    max: this.maxData,
                    labels: {
                        formatter: function (value) { return value + "%" }
                    }
                },
                xaxis: {
                    categories: this.graphCategories,
                    labels: {
                        // rotate: -45,
                        style: {
                            fontSize: '9px'
                        }
                    }
                }
            }
        }
    },
    methods: {
        async getData() {
            try {
                let { data } = await axios.post(this.api_room_util_vs_efficiency, this.query, this.api_header())

                data.detail.sort((a, b) => a.room_size - b.room_size)

                let rooms = [...new Set(data.detail.map(x => [x.group_id, `${x.room_size} PAX`]))]
                let utilData = []
                let efficiencyData = []

                rooms.forEach(r => {
                    let _data = data.detail.find(x => x.group_id == r[0])
                    
                    if (_data) {
                        utilData.push(roundNum(_data.meeting_room_occupancy.average_percentage, 1))
                        efficiencyData.push(roundNum(_data.meeting_room_efficiency.average_percentage, 1))

                        if (_data.room_size >= 4 && this.footerRoom == null) {
                            this.footerRoom = {
                                name: _data.group_id,
                                room_size: _data.room_size,
                                avgUtil: roundNum(_data.meeting_room_occupancy.average_percentage, 1),
                                avgEfficiency: roundNum(_data.meeting_room_efficiency.average_percentage, 1)
                            }
                        }
                    }
                })

                this.graphCategories = rooms
                this.graphSeries = [
                    {
                        name: 'Room Utilisation',
                        data: utilData
                    },
                    {
                        name: 'Efficiency when in Use',
                        data: efficiencyData
                    }
                ]
                this.maxData = Math.max(Math.ceil(Math.max(...utilData, ...efficiencyData) / 10) * 10, 10)
                this.insights.avgUtil = roundNum(data.insight.average_utils, 1)
                this.insights.avgEfficiency = roundNum(data.insight.average_efficiency, 1)

                this.dataLoaded = true
                this.dataError = false

                console.log('getData', data, this.graphSeries)
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
.meeting-room-performance {
    padding: 24px 8px;
    margin-bottom: 64px;

    h3 {
        margin: 8px 0;
    }
}
</style>