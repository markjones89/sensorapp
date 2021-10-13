<template>
    <div class="workstation-util">
        <h2>WORKSTATION UTILISATION: MONTHLY SUMMARY</h2>
        <h3>Open Area Totals ({{ floor }} - between peak timing, {{ time }})</h3>
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
                    <p>Desks are considered occupied when occupied a minimum of {{ minutes }} of usage or more</p>
                </div>
            </div>
            <div class="col-5">
                <h4 class="section-header">Insight</h4>
                <div class="row insights">
                    <div class="col">
                        <div class="insight-card red">
                            <span class="insight-title">Average Utilisation</span>
                            <span class="insight-percent">{{ insights.non_covid.average.percent }}%</span>
                            <span class="insight-seats">{{ `${insights.non_covid.average.seats}/${insights.non_covid.seats} seats` }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="insight-card">
                            <span class="insight-title">Average Utilisation</span>
                            <span class="insight-percent">{{ insights.covid.average.percent }}%</span>
                            <span class="insight-seats">{{ `${insights.covid.average.seats}/${insights.covid.seats} seats` }}</span>
                        </div>
                    </div>
                </div>
                <div class="row insights">
                    <div class="col">
                        <div class="insight-card red">
                            <span class="insight-title">Highest Peak Utilisation</span>
                            <span class="insight-percent">{{ insights.non_covid.peak.percent }}%</span>
                            <span class="insight-seats">{{ `${insights.non_covid.peak.seats}/${insights.non_covid.seats} seats` }}</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="insight-card">
                            <span class="insight-title">Highest Peak Utilisation</span>
                            <span class="insight-percent">{{ insights.covid.peak.percent }}%</span>
                            <span class="insight-seats">{{ `${insights.covid.peak.seats}/${insights.covid.seats} seats` }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <div class="insight-keys">
                            <h4 class="section-header">Key</h4>
                            <ul>
                                <li class="red">Non Covid Utilisation</li>
                                <li>Covid Utilisation</li>
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
import { roundNum } from '@/helpers'
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'MonthlyWorkstationUtil',
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
            covid: {
                seats: 0,
                average: {
                    percent: 0,
                    seats: 0
                },
                peak: {
                    percent: 0,
                    seats: 0
                }
            },
            non_covid: {
                seats: 0,
                average: {
                    percent: 0,
                    seats: 0
                },
                peak: {
                    percent: 0,
                    seats: 0
                }
            }
        }
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_monthly_workspace_utils_rpt: 'backend/api_monthly_workspace_utils_rpt'
        }),
        graphTitle() {
            return this.overall ? 'Utilisation of workstations summary' : `Utilisation of workstations summary - ${this.floor}`
        },
        minutes() {
            let minutes = this.query.trigger
            return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`
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
                colors: ['rgb(246,29,29)', '#000'],
                stroke: { curve: 'straight', width: 1, },
                legend: { show: false },
                grid: {
                    borderColor: 'rgba(0,0,0,0.07)',
                    yaxis: {
                        lines: { show: true }
                    },
                    padding: {
                        left: 35
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
                let { data } = await axios.post(this.api_monthly_workspace_utils_rpt, this.query, this.api_header())

                this.graphCategories = [['MINIMUM UTILISATION', data.covid.min_point.time], 'AVERAGE UTILISATION', ['PEAK UTILISATION', data.covid.max_point.time]]
                this.graphSeries = [
                    {
                        name: 'Workspaces in use - Non Covid',
                        data: [roundNum(data.non_covid.min_point.percentage, 1), roundNum(data.non_covid.average?.percentage || 0, 1), roundNum(data.non_covid.max_point.percentage, 1)]
                    },
                    {
                        name: 'Workspaces in use - Covid',
                        data: [roundNum(data.covid.min_point.percentage, 1), roundNum(data.covid.average?.percentage || 0, 1), roundNum(data.covid.max_point.percentage, 1)]
                    }
                ]

                // covid insights
                this.insights.covid.seats = data.covid.total_sensor ?? 0
                this.insights.covid.average.percent = roundNum(data.covid.average?.percentage ?? 0, 1)
                this.insights.covid.average.seats = data.covid.average?.sensor_count ?? 0
                this.insights.covid.peak.percent = roundNum(data.covid.max_point?.percentage ?? 0, 1)
                this.insights.covid.peak.seats = data.covid.max_point?.sensor_count ?? 0

                // non-covid insights
                this.insights.non_covid.seats = data.non_covid.total_sensor ?? 0
                this.insights.non_covid.average.percent = roundNum(data.non_covid.average?.percentage ?? 0, 1)
                this.insights.non_covid.average.seats = data.non_covid.average?.sensor_count ?? 0
                this.insights.non_covid.peak.percent = roundNum(data.non_covid.max_point?.percentage ?? 0, 1)
                this.insights.non_covid.peak.seats = data.non_covid.max_point?.sensor_count ?? 0

                this.maxPercent = Math.max(Math.ceil(Math.round(data.covid.max_point?.percentage ?? 0) / 10) * 10,
                    Math.ceil(Math.round(data.non_covid.max_point?.percentage ?? 0) / 10) * 10,
                    10)
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
.workstation-util {
    padding: 24px 8px;
    margin-bottom: 64px;

    h3 {
        margin: 8px 0;
    }
}
</style>