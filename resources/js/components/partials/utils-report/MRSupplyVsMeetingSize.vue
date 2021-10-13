<template>
    <div class="mr-supply-vs-meeting-size">
        <h2>MEETING ROOM SUPPLY RELATIVE TO MEETING SIZES OCCURING</h2>
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
                    <div id="bar-chart">
                        <apexchart type="bar" height="400" :options="graphOptions" :series="graphSeries"></apexchart>
                        <p>{{ oneToSixSupply }}% of the Meeting rooms are 1 to 6 seats in capacity whilst {{ oneToTwoSize }}% of the meetings consisted of a 1 to 2 occupants</p>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="insight-keys">
                    <h4 class="section-header">Key</h4>
                    <ul>
                        <li class="red">% of time Meeting Size occurred</li>
                        <li>Meeting Room supply</li>
                    </ul>
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
    name: 'MRSupplyVsMeetingSize',
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
        maxData: 0,
        oneToSixSupply: 0,
        oneToTwoSize: 0
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header',
            api_room_supply_vs_size: 'backend/api_room_supply_vs_size'
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
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: 'top'
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        return `${val}%`
                    },
                    offsetY: -15,
                    style: {
                        colors: ['#000', '#000'],
                        fontSize: '8px',
                        fontWeight: 'normal',
                        fontFamily: 'Roboto, sans-serif'
                    }
                },
                yaxis: {
                    tickAmount: 10,
                    min: 0,
                    max: this.maxData,
                    labels: {
                        formatter: function (value) { return Math.round(value) + "%" }
                    }
                },
                xaxis: {
                    categories: this.graphCategories,
                    labels: {
                        rotate: 0,
                        style: {
                            fontSize: '9px'
                        }
                    },
                    title: {
                        text: 'MEETING SIZE',
                        style: {
                            fontWeight: 'normal'
                        }
                    }
                }
            }
        }
    },
    methods: {
        async getData() {
            try {
                let { data } = await axios.post(this.api_room_supply_vs_size, this.query, this.api_header())
                let meetingSizes = [...new Set(data.map(x => x.size))]
                let supplyData = []
                let sizeData = []

                meetingSizes.sort((a, b) => {
                    let aSize = parseInt(a.replace(' PAX Meetings', ''))
                    let bSize = parseInt(b.replace(' PAX Meetings', ''))

                    return aSize - bSize
                })
                meetingSizes.forEach(s => {
                    let _data = data.find(x => x.size == s)
                    
                    if (_data) {
                        supplyData.push(roundNum(_data.room_supply, 1))
                        sizeData.push(roundNum(_data.meeting_size_occurred, 1))
                    }
                })

                // this.graphCategories = meetingSizes.map(x => [x.replace(' Meetings', ''), 'Meetings'])
                this.graphCategories = meetingSizes.map(x => x.replace(' Meetings', ''))
                this.graphSeries = [
                    {
                        name: '% of time Meeting Size occurred',
                        data: sizeData
                    },
                    {
                        name: 'Meeting Room supply',
                        data: supplyData
                    }
                ]
                this.maxData = Math.max(Math.ceil(Math.max(...sizeData, ...supplyData) / 10) * 10, 10)
                this.oneToSixSupply = roundNum(data.filter(x => {
                    let meetingSize = parseInt(x.size.replace(' PAX Meetings', ''))
                    return meetingSize >= 1 && meetingSize <= 6
                }).map(x => x.room_supply).reduce((a, b) => a + b), 1)
                this.oneToTwoSize = roundNum(data.filter(x => {
                    let meetingSize = parseInt(x.size.replace(' PAX Meetings', ''))
                    return meetingSize >= 1 && meetingSize <= 2
                }).map(x => x.meeting_size_occurred).reduce((a, b) => a + b), 1)

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
.mr-supply-vs-meeting-size {
    padding: 24px 8px;
    margin-bottom: 64px;

    h3 {
        margin: 8px 0;
    }

    #bar-chart {
        // width: 80%;
        margin-top: 24px;
    }
}
</style>