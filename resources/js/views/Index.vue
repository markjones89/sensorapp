<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" active="today" />
            <div class="graph-filters">
                <!-- <span class="graph-filter" @click="showFilter = !showFilter">
                    Filter By
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="filters" :multiple="true" :show="showFilter" v-model="filter" @onSelect="filterSelect" />
                </span> -->
                <span class="graph-filter" @click="showLocFilter = !showLocFilter">
                    {{ locationFilter ? locationFilter : 'Select Location' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="locations" :show="showLocFilter" @onSelect="locFilter" />
                </span>
                <a href="javascript:;" class="btn btn-primary ml-12" @click="toCostAnalysis">Cost Analysis</a>
            </div>
            <span class="page-opt-trigger" role="button" @click="showPageOpts = !showPageOpts">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </span>
            <transition name="fadeUp">
                <div class="page-opt-panel" v-if="showPageOpts">
                    <ul>
                        <li><a @click="toggleEmbed(true)">Embed</a></li>
                    </ul>
                </div>
            </transition>
        </div>
        <div class="graph-content">
            <!-- graph & legends here -->
            <div class="row" v-if="dataLoaded">
                <template v-if="!dataError">
                    <div class="col">
                        <div id="chart-wrapper">
                            <div id="circle-pack"></div>
                        </div>
                    </div>
                    <div class="col-md-4" id="stats-wrapper">
                        <div id="chart-stats">
                            <span class="chart-stat">
                                <span @click="toCostAnalysis">Opportunity Cost</span>
                                <span class="stat-figure" @click="toCostAnalysis">
                                    <!-- $23.5M -->
                                    {{ formatted_opportunity_cost }}
                                </span>
                            </span>
                            <span class="chart-stat">
                                <span @click="toPeak">Peak Workspace Utilisation</span>
                                <span class="stat-figure" @click="toPeak">
                                    <!-- 65% -->
                                    {{ `${statsDisplay.peak_workspace_util}%` }}
                                </span>
                            </span>
                            <span class="chart-stat">
                                <span @click="toPeak">Average Work space Utilisation</span>
                                <span class="stat-figure" @click="toPeak">
                                    <!-- 52% -->
                                    {{ `${statsDisplay.average_workspace_util}%` }}
                                </span>
                            </span>
                            <span class="chart-stat">
                                <span @click="toPeak">Peak Meeting Room Occupancy</span>
                                <span class="stat-figure" @click="toPeak">
                                    <!-- 75% -->
                                    {{ `${statsDisplay.peak_meeting_room}%` }}
                                </span>
                            </span>
                            <span class="chart-stat">
                                <span @click="toPeak">User to workspace ratio</span>
                                <span class="stat-figure" @click="toPeak">
                                    <!-- 1.5 to 1 -->
                                    {{ statsDisplay.user_to_workspace_ratio }}
                                </span>
                            </span>
                            <span class="chart-stat">
                                <span @click="toWFH">Work from home</span>
                                <span class="stat-figure" @click="toWFH">
                                    <!-- 42% -->
                                    {{ `${statsDisplay.work_from_home.toFixed(2)}%` }}
                                </span>
                            </span>
                        </div>
                    </div>
                </template>
                <div v-else class="error-display" style="height: 60vh">
                    <p>{{ dataError }}</p>
                    <a href="javascript:;" class="btn btn-primary" @click="renderChart" style="align-self:center;">Retry</a>
                </div>
            </div>
            <div v-else style="height: 60vh">
                <loader :show="!dataLoaded" type="ripple"/>
            </div>
            <div class="bottom-filters">
                <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <span class="graph-filter" @click="showMinuteFilter = !showMinuteFilter">
                    {{ minuteFilter ? minuteFilter : 'Select' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="minuteFilters" position="top" :show="showMinuteFilter" @onSelect="filterMinute" />
                </span>
            </div>
        </div>
        <modal :show="showEmbed" @close="toggleEmbed(false)">
            <template v-slot:header>
                <h2>Embed App</h2>
            </template>
            <div id="embed-wrapper">
                <div id="embed-preview"></div>
                <div id="embed-code">
                    <textarea rows="10">Code here...</textarea>
                    <button class="btn btn-primary" id="embed-btn">Copy Embed Code</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { addEvent, removeEvent } from "../helpers"
import { DateRangeToggle, FilterDropdown, Loader, Modal, TimeSlider } from "../components"
import { circlePack } from '../components/graphs/CirclePack'
import { CaretIcon } from "../components/icons"
import { format as d3Format } from 'd3-format'
export default {
    title: 'Home',
    components: { CaretIcon, DateRangeToggle, FilterDropdown, Loader, Modal, TimeSlider },
    data: () => ({
        circlePack: null, filters: [
            { value: 'CUS', label: 'Cost of Unused Spaces' },
            { value: 'PU', label: 'Peak Usage' },
            { value: 'AU', label: 'Average Usage' },
            { value: 'LPS', label: 'Low Performing Spaces' },
            { value: 'SC', label: 'Spare Capacity' }
        ], 
        locations: ['United States', 'Japan', 'Australia', 'Philippines', 'UK', 'South Korea', 'China', 'India'],
        filter: [], locationFilter: null,
        minuteFilter: '10 minutes',
        showPageOpts: false, showEmbed: false, showFilter: false, showLocFilter: false, showMinuteFilter: false,
        dataLoaded: false, dataError: null, axiosSrc: null,
        dataFilters: {
            trigger: 10,
            start_hour: 8,
            stop_hour: 16,
            start_date: '',
            stop_date: '',
            node_type: 'Customer',
            node_id: 'ad9b565d-9082-4808-99cd-32f2f09f63f2'
        },
        summary: null,
        statsDisplay: {
            opportunity_cost: 0,
            peak_workspace_util: 0,
            average_workspace_util: 0,
            peak_meeting_room: 0,
            user_to_workspace_ratio: 0,
            work_from_home: 0
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            company: state => state.user.company,
            settings: state => state.user.company ? state.user.company.settings : null
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customer_summary: 'backend/api_customer_summary'
        }),
        minuteFilters() {
            var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        },
        formatted_opportunity_cost() {
            var formatter = d3Format('$,.2s')
            
            return formatter(this.statsDisplay.opportunity_cost)
        }
    },
    methods: {
        rangeSelect(range, from, to) {
            // console.log('rangeSelect', range, from, to)
            this.dataFilters.start_date = from.toISOString()
            this.dataFilters.stop_date = to.toISOString()
            this.axiosSrc.cancel('Date range selected')
            this.renderChart()
        },
        filterSelect(filters) {
            this.showFilter = false
            // console.log('filters', filters)
        },
        locFilter(loc) {
            if (!this.dataLoaded) return
            this.showLocFilter = false
            this.locationFilter = loc
            this.circlePack.goTo(loc)
        },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
            this.dataFilters.trigger = minute

            this.axiosSrc.cancel('Minute filter updated')
            this.renderChart()
        },
        pageOptsHandler(e) {
            let _ = this

            if (['mousedown', 'touchend'].indexOf(e.type) >= 0) {
                if (!e.target.closest('.page-opt-panel, .page-opt-trigger')) {
                    _.showPageOpts = false
                }
            } else if (e.type === 'keydown') {
                if (e.keyCode === 27) _.showPageOpts = false
            }
        },
        toCostAnalysis() { this.$router.push({ name: 'cost-analysis' }) },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        setStatsDisplay(stats) {
            this.statsDisplay.opportunity_cost = stats.opportunity_cost
            this.statsDisplay.peak_workspace_util = stats.peak_workspace_util
            this.statsDisplay.average_workspace_util = stats.average_workspace_util
            this.statsDisplay.peak_meeting_room = stats.peak_meeting_room_occupancy || 0
            this.statsDisplay.user_to_workspace_ratio = stats.user_to_workspace_ratio || stats.user_to_work_space_ratio
            this.statsDisplay.work_from_home = stats.work_from_home
        },
        async renderChart() {
            this.dataLoaded = false
            let _data = {},
                categories = [
                    { name: 'Workspaces in use', avg: 'average_workspace', avgPercent: 'average_workspace_util', peak: 'peak_workspace', peakPercent: 'peak_workspace_util' },
                    { name: 'Free workspaces', avg: 'average_free_workspace', avgPercent: 'average_free_workspace_util', peak: 'peak_free_workspace', peakPercent: 'peak_free_workspace_util' }, 
                    { name: 'Meeting Rooms in Use', avg: '', avgPercent: '', peak: 'peak_meeting_room', peakPercent: 'peak_meeting_room_occupancy' }, 
                    // { name: 'Free Meeting Rooms', avg: '', avgPercent: '', peak: '', peakPercent: '' }, 
                    // { name: 'Workspaces used <20%', avg: '', avgPercent: '', peak: '', peakPercent: '' }, 
                    // { name: 'Occupancy Count', avg: '', avgPercent: '', peak: '', avgPercent: '' }, 
                    { name: 'Work from home %', avg: '', avgPercent: '', peak: '', peakPercent: '' }
                ],
                keys = ['building_country', 'building_city'],
                grouped = [],
                temp = { _: grouped }
            
            this.axiosSrc = axios.CancelToken.source()
            let { data } = await axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token))
            
            this.summary = data;
            this.dataLoaded = true
            if (!data.building_summary) {
                this.dataError = data
                return
            }
            else if (data.building_summary && data.building_summary.length == 0) {
                this.dataError = "No results"
                return
            }
            else {
                this.dataError = null
                let nodes = { ID: '', name: data.customer, children: [] }
                let stats = []
                
                this.setStatsDisplay(data)
                this.locations = [...new Set(data.building_summary.map(x => x.building_country).sort())]

                data.building_summary.forEach(a => {
                    // stats
                    categories.forEach(c => {
                        let stat = { ID: a.building_name.replace(/\s/g,''), category: c.name }

                        stat.average = c.avg == '' ? 0 : a[c.avg]
                        stat.avgPercent = c.avgPercent == '' ? 0 : a[c.avgPercent]
                        stat.peak = c.peak == '' ? 0 : a[c.peak]
                        stat.peakPercent = c.peakPercent == '' ? 0 : a[c.peakPercent]

                        stats.push(stat)
                    })

                    // nodes
                    a.ID = a.building_name.replace(/\s/g,'')
                    a.name = a.building_name
                    a.value = a.opportunity_cost

                    keys.reduce((r, k) => {
                        if (!r[a[k]]) {

                            r[a[k]] = { _: [] }
                            
                            if (a[k]) {
                                let l = { ['name']: a[k], ['children']: r[a[k]]._ }
                                let type = k === 'building_country' ? '' : '_City'

                                l.ID = `${a[k].replace(/\s/g,'')}${type}`

                                if (k === 'building_country') l.building_country = true
                                else if (k === 'building_city') l.building_city = true

                                r._.push(l)
                            }
                        }
                        return r[a[k]]
                    }, temp)._.push(a)
                })

                nodes.children = grouped
                /* let res = await axios.all([
                    axios.get('/data/circle-pack-category.json'),
                    axios.get('/data/circle-pack.json')
                ]) */

                _data.stats = stats //res[0].data
                _data.nodes = nodes //res[1].data

                // console.log('renderChart', _data, this.locations)
                setTimeout(() => {
                    // if (this.circlePack) {
                    //     this.circlePack.setData(_data)
                    // } else {
                        this.circlePack = new circlePack('#circle-pack', _data, {
                            zoomed: (node) => {
                                // console.log('circlePack.zoomed', node.data)
                                if (node.data.building_name) this.setStatsDisplay(node.data)
                                else if (node.data.building_country) {
                                    let bldgSummary = this.summary.building_summary,
                                        buildings = bldgSummary.filter(x => x.building_country == node.data.name),
                                        count = buildings.length,
                                        countryStats = {
                                            opportunity_cost: buildings.map(x => x.opportunity_cost).reduce((a, b) => a + b, 0),
                                            peak_workspace_util: buildings.map(x => x.peak_workspace_util).reduce((a, b) => a + b, 0) / count,
                                            average_workspace_util: buildings.map(x => x.average_workspace_util).reduce((a, b) => a + b, 0) / count,
                                            peak_meeting_room: buildings.map(x => x.peak_meeting_room_occupancy).reduce((a, b) => a + b, 0) / count,
                                            user_to_workspace_ratio: buildings.map(x => x.user_to_workspace_ratio).reduce((a, b) => a + b, 0) / count,
                                            work_from_home: buildings.map(x => x.work_from_home).reduce((a, b) => a + b, 0) / count
                                        }
                                    this.setStatsDisplay(countryStats)
                                }
                                else if (node.data.building_city) {
                                    let bldgSummary = this.summary.building_summary,
                                        buildings = bldgSummary.filter(x => x.building_city == node.data.name),
                                        count = buildings.length,
                                        cityStats = {
                                            opportunity_cost: buildings.map(x => x.opportunity_cost).reduce((a, b) => a + b, 0),
                                            peak_workspace_util: buildings.map(x => x.peak_workspace_util).reduce((a, b) => a + b, 0) / count,
                                            average_workspace_util: buildings.map(x => x.average_workspace_util).reduce((a, b) => a + b, 0) / count,
                                            peak_meeting_room: buildings.map(x => x.peak_meeting_room_occupancy).reduce((a, b) => a + b, 0) / count,
                                            user_to_workspace_ratio: buildings.map(x => x.user_to_workspace_ratio).reduce((a, b) => a + b, 0) / count,
                                            work_from_home: buildings.map(x => x.work_from_home).reduce((a, b) => a + b, 0) / count
                                        }
                                    this.setStatsDisplay(cityStats)
                                }
                                else this.setStatsDisplay(this.summary)
                            },
                            moreInfo: (data) => {
                                this.$router.push({ name: 'time' })
                            }
                        })
                    // }
                }, 100)
            }
        },
        timeStartChange(time, hour) {
            // console.log('timeStartChange', hour, time)
            this.dataFilters.start_hour = hour
            
            this.axiosSrc.cancel('Start time updated')
            this.renderChart()
        },
        timeEndChange(time, hour) {
            // console.log('timeEndChange', hour, time)
            this.dataFilters.stop_hour = hour
            
            this.axiosSrc.cancel('End time updated')
            this.renderChart()
        },
        toPeak() { this.$router.push({ name: 'peak' }) },
        toWFH() { this.$router.push({ name: 'wfh' }) },
        handlePackRedraw () { if (this.circlePack && this.dataLoaded) this.circlePack.reDraw() }
    },
    created() {
        let now = new Date(),
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23)

        this.dataFilters.start_date = start.toISOString()
        this.dataFilters.stop_date = end.toISOString()

        // console.log('created', this.company)

        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id
    },
    mounted() {
        addEvent(window, 'resize', this.handlePackRedraw)
        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)

        this.renderChart()
    },
    destroyed() {
        removeEvent(window, 'resize', this.handlePackRedraw)
        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)
    }
}
</script>

<style lang="scss">
.cp-tooltip {
    position: absolute;
    padding: 6px 8px;
    font-size: 14px;
    border-radius: 4px;
    background-color: #2B2B2B;
    color: #ffffff;
    pointer-events: none;

    &:before {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #2B2B2B transparent transparent transparent;
    }
}
.circle-packs {
    pointer-events: all;
    border-radius: 50%;

    .plotWrapper {
        .node {
            cursor: pointer;

            &:hover:not(.node--root) {
                stroke: #0B1A29;
                stroke-width: 1.5px;
            }

            &.node--leaf {
                fill: #ffffff;
            }
        }

        .barWrapperOuter {
            pointer-events: none;
        }

        .innerCircleTitle {
            text-anchor: middle;
        }

        .innerText {
            color: #4A4A4A;
            text-anchor: end;

            &.peak-percent {
                text-anchor: start;
            }
        }
    }

    .hiddenArcWrapper {
        .circleText {
            color: #ffffff;
            fill: #ffffff;
            text-anchor: middle;
        }
    }
}
</style>

<style lang="scss" scoped>
#chart-wrapper {
    #circle-pack {
        position: relative;
    }
}

#stats-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 32px 0;

    #chart-stats {
        padding: 20px;
        background-color: #393846;
        border-radius: 10px;

        .chart-stat {
            display: flex;
            font-size: 14px;
            line-height: 40px;
            justify-content: space-between;

            .stat-figure {
                font-weight: bold;
            }

            span {
                cursor: pointer;
            }
        }
    }
}

#embed-wrapper {
    display: flex;

    textarea {
        width: 400px;
        margin: 14px 0 24px 0;
    }

    #embed-btn {
        float: right;
    }
}
</style>