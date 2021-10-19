<template>
    <div class="meeting-room-util">
        <h2>MEETING ROOM UTILISATION: MONTHLY SUMMARY</h2>
        <h3>Meeting Room Summary ({{ floor }} - between peak timing, {{ time }})</h3>
        <div class="row">
            <div class="col">
                <h4 class="section-header">{{ graphTitle }}</h4>
                <div class="graph-loading" v-if="!dataLoaded">
                    <ripple-loader />
                </div>
                <div class="graph-error" v-if="dataLoaded && dataError">
                    <p>An error occured while getting the graph data, please try again.</p>
                    <a href="javascript:;" @click="retry">Try again</a>
                </div>
                <div class="chart-holder" v-else-if="dataLoaded">
                    <apexchart type="area" :options="graphOptions" :series="graphSeries"></apexchart>
                    <p>On Average, {{ insights.average.rooms }} Meeting Rooms are in use at the same time, peaking at {{ insights.peak.rooms }} rooms</p>
                </div>
            </div>
            <div class="col-5">
                <h4 class="section-header">Insight</h4>
                <div class="row insights">
                    <div class="col">
                        <div class="insight-card red">
                            <span class="insight-title">Minimum Utilisation</span>
                            <span class="insight-percent">{{ insights.min.percent }}%</span>
                            <span class="insight-rooms">{{ `${insights.min.rooms}/${insights.rooms} rooms` }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="insight-card red">
                            <span class="insight-title">Average Utilisation</span>
                            <span class="insight-percent">{{ insights.average.percent }}%</span>
                            <span class="insight-rooms">{{ `${insights.average.rooms}/${insights.rooms} rooms` }}</span>
                        </div>
                    </div>
                </div>
                <div class="row insights">
                    <div class="col"></div>
                    <div class="col">
                        <div class="insight-card red">
                            <span class="insight-title">Highest Utilisation</span>
                            <span class="insight-percent">{{ insights.peak.percent }}%</span>
                            <span class="insight-rooms">{{ `${insights.peak.rooms}/${insights.rooms} rooms` }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <div class="insight-keys">
                            <h4 class="section-header">Key</h4>
                            <ul>
                                <li class="red">Utilisation of all Meeting Rooms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RippleLoader } from '@/components/loader'
import VueApexCharts from 'vue-apexcharts'
import { roundNum } from '@/helpers'
export default {
    name: 'MonthlyMeetingRoomUtil',
    props: {
        overall: { type: Boolean, default: false },
        floor: { type: String, required: true },
        time: { type: String, required: true },
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
            rooms: 0,
            min: {
                percent: 0,
                rooms: 0
            },
            average: {
                percent: 0,
                rooms: 0
            },
            peak: {
                percent: 0,
                rooms: 0
            }
        }
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_monthly_room_utils_rpt: 'backend/api_monthly_room_utils_rpt'
        }),
        graphTitle() {
            return this.overall ? 'Utilisation of all Meeting Rooms' : `Utilisation of Meeting Rooms - ${this.floor}`
        },
        graphOptions() {
            let ticks = this.maxPercent > 20 ? (this.maxPercent / 10) : this.maxPercent > 10 ? (this.maxPercent / 5) : 10
            return {
                chart: {
                    height: 350,
                    type: 'area',
                    stacked: false,
                    zoom: { enabled: false },
                    toolbar: { show: false },
                    background: 'transparent',
                    fontFamily: 'Roboto, sans-serif'
                },
                colors: ['rgb(246,29,29)'],
                stroke: { curve: 'straight', width: 1, },
                grid: {
                    borderColor: 'rgba(0,0,0,0.07)',
                    yaxis: {
                        lines: { show: true }
                    },
                    padding: {
                        left: 30
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 100]
                    }
                },
                markers: { size: 0, strokeWidth: 1 },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '10px',
                        fontWeight: 'normal',
                        fontFamily: 'Roboto, sans-serif'
                    }
                },
                yaxis: {
                    tickAmount: ticks,
                    min: 0,
                    max: this.maxPercent,
                    labels: {
                        formatter: function (value) { return roundNum(value, 1) + "%" }
                    }
                },
                xaxis: {
                    categories: this.graphCategories,
                    labels: { rotate: 0 }
                }
            }
        }
    },
    methods: {
        async getData() {
            try {
                let { data } = await axios.post(this.api_monthly_room_utils_rpt, this.query, this.api_header())
                let minDate = new Date(data.min.time)
                let maxDate = new Date(data.max.time)

                this.graphCategories = [['MINIMUM UTILISATION', minDate.toDateString()], 'AVERAGE UTILISATION', ['PEAK UTILISATION', maxDate.toDateString()]]
                this.graphSeries = [
                    {
                        name: 'Non Covid',
                        data: [roundNum(data.min.percentage, 1), roundNum(data.average?.percentage || 0, 1), roundNum(data.max.percentage, 1)]
                    }
                ]
                this.insights.rooms = data.total_room ?? 0
                this.insights.min.percent = roundNum(data.min?.percentage ?? 0, 1)
                this.insights.min.rooms = data.min?.room_count ?? 0
                this.insights.average.percent = roundNum(data.average?.percentage ?? 0, 1)
                this.insights.average.rooms = data.average?.room_count ?? 0
                this.insights.peak.percent = roundNum(data.max?.percentage ?? 0, 1)
                this.insights.peak.rooms = data.max?.room_count ?? 0
                let maxValue = Math.max(this.insights.average.percent, this.insights.peak.percent)
                this.maxPercent = Math.max(Math.ceil(maxValue / 10) * 10, 10)
                this.dataLoaded = true
                this.dataError = false
            } catch (error) {
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
.meeting-room-util {
    padding: 24px 8px;
    margin-bottom: 64px;

    h3 {
        margin: 8px 0;
    }
}
</style>