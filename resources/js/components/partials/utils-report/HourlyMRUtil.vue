<template>
    <div class="hourly-meeting-room-util">
        <h2>MEETING ROOM UTILISATION: HOURLY SUMMARY</h2>
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
                            <span class="insight-title">Minimum Average</span>
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
                        <div class="insight-card">
                            <span class="insight-title">Highest Peak</span>
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
                                <li class="red">Average Utilisation of all Meeting Rooms</li>
                                <li>Highest Peak Utilisation</li>
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
import { hourStr, roundNum } from '@/helpers'
import { RippleLoader } from '@/components/loader'
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'HourlyMeetingRoomUtil',
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
        maxCount: 0,
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
            api_hourly_room_utils_rpt: 'backend/api_hourly_room_utils_rpt'
        }),
        graphTitle() {
            return this.overall ? 'Meeting Room Utilisation Summary' : `Meeting Room Utilisation Summary - ${this.floor}`
        },
        graphOptions() {
            let ticks = this.maxCount > 20 ? (this.maxCount / 10) : this.maxCount > 10 ? (this.maxCount / 5) : 10
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
                colors: ['rgb(246,29,29)', '#000'],
                stroke: { curve: 'straight', width: 1, },
                legend: { show: false },
                grid: {
                    borderColor: 'rgba(0,0,0,0.07)',
                    yaxis: {
                        lines: { show: true }
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
                        fontSize: '11px',
                        fontWeight: 'normal',
                        fontFamily: 'Roboto, sans-serif'
                    }
                },
                yaxis: {
                    tickAmount: ticks,
                    min: 0,
                    max: this.maxCount
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
        getTimeRanges(from, to) {
            let ranges = []

            for (let start = from; start < to; start++) {
                let startHour = hourStr(start, true, true)
                let endHour = hourStr(start + 1, true, true)
                
                ranges.push([`${startHour} - `, endHour])
            }

            return ranges
        },
        async getData() {
            try {
                let { data } = await axios.post(this.api_hourly_room_utils_rpt, this.query, this.api_header())
                let series = [{ name: 'Ave Meeting Room Utilisation', key: 'average' }, { name: 'Peak Meeting Room Utilisation', key: 'max' }]

                this.graphCategories = this.getTimeRanges(this.query.start_hour, this.query.stop_hour)
                this.graphSeries = []

                series.forEach(s => {
                    let seriesData = []
                    // let seriesPercent = []

                    for (let start = this.query.start_hour; start < this.query.stop_hour; start++) {
                        let hourData = data.hour_list.find(x => x.hour == start)
                        let hourValue = hourData ? hourData[s.key]?.room_count ?? 0 : 0
                        // let hourPercent = Math.round(hourData ? hourData[s.key]?.percentage ?? 0 : 0)

                        seriesData.push(hourValue)
                        // seriesPercent.push(hourPercent)
                    }

                    this.graphSeries.push({
                        name: s.name,
                        data: seriesData
                    })
                })

                this.insights.rooms = data.total_room ?? 0
                this.insights.min.percent = roundNum(data.insight.min_average.percentage, 1)
                this.insights.min.rooms = data.insight.min_average.room_count
                this.insights.average.percent = roundNum(data.insight.average_utils.percentage, 1)
                this.insights.average.rooms = data.insight.average_utils.room_count
                this.insights.peak.percent = roundNum(data.insight.highest_peak.percentage, 1)
                this.insights.peak.rooms = data.insight.highest_peak.room_count
                this.maxCount = Math.max(Math.ceil(data.insight.highest_peak.room_count / 10) * 10, 10)

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
.hourly-meeting-room-util {
    padding: 24px 8px;
    margin-bottom: 64px;

    h3 {
        margin: 8px 0;
    }
}
</style>