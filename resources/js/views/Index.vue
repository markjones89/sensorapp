<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <div class="graph-filters" v-if="dataLoaded">
                <graph-filter placeholder="Filter By" :filters="filters" :chosen="filter" @onSelect="filterSelect" />
                <graph-filter placeholder="Select Location" :filters="locations" :chosen="locationFilter" :chosenAsSelected="true" @onSelect="locFilter" />
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
            <circle-pack-stats
                :custData="summary" :statFilter="filter" :locFilter="locationFilter" :dataFilters="dataFilters"
                @dataLoaded="circlePackLoaded" @costClick="toCostAnalysis" @peakClick="toPeak" @wfhClick="toWFH" @goToTime="toTimeChart" />
            <div class="bottom-filters">
                <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <graph-filter :filters="minuteFilters" :chosen="minuteFilter" :chosenAsSelected="true" position="top" @onSelect="filterMinute" />
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
import { mapMutations, mapState } from 'vuex'
import { addEvent, removeEvent } from '@/helpers'
import { DateRangeToggle, GraphFilter, Modal, TimeSlider } from '@/components'
import { CirclePackStats } from '@/components/partials'
import { format as d3Format } from 'd3-format'
export default {
    title: 'Home',
    components: {
        DateRangeToggle,
        GraphFilter,
        Modal,
        TimeSlider,
        CirclePackStats
    },
    data: () => ({
        filters: [
            { value: 'opportunity_cost', label: 'Cost of Unused Spaces' },
            { value: 'workspace_utils.max_percentage', label: 'Peak Usage' },
            { value: 'workspace_utils.average_percentage', label: 'Average Usage' },
            { value: 'low_perform_workspace.average_percentage', label: 'Low Performing Spaces' },
            { value: 'free_workspace_utils.average_percentage', label: 'Spare Capacity' }
        ], 
        filter: 'opportunity_cost',
        locations: [],
        minuteFilter: 60,
        showPageOpts: false, showEmbed: false, showFilter: false, showLocFilter: false, showMinuteFilter: false,
        dataLoaded: false,
        dataFilters: {
            trigger: 6,
            start_hour: 8,
            stop_hour: 16,
            start_date: '',
            stop_date: '',
            node_type: 'Customer',
            node_id: 'ad9b565d-9082-4808-99cd-32f2f09f63f2'
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            company: state => state.user.company,
            settings: state => state.user.company ? state.user.company.settings : null,
            summary: state => state.homepage.summary,
            rangeFilter: state => state.homepage.rangeFilter,
            locationFilter: state => state.homepage.locationFilter,
            startTimeFilter: state => state.homepage.startTime,
            endTimeFilter: state => state.homepage.endTime,
            periodFilter: state => state.homepage.periodFilter
        }),
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            let minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        },
        formatted_opportunity_cost() {
            var formatter = d3Format('$,.2s')
            
            return formatter(this.statsDisplay.opportunity_cost)
        }
    },
    methods: {
        ...mapMutations({
            setSummary: 'homepage/setSummary',
            setRange: 'homepage/setRange',
            setLocation: 'homepage/setLocation',
            setTime: 'homepage/setTime',
            setMinute: 'homepage/setMinute'
        }),
        circlePackLoaded(data, fromCache) {
            this.dataLoaded = true
            if (!fromCache) {
                this.setSummary(data)
                this.setLocation(data.customer)
            }

            this.locations = [data.customer, ...new Set(data.building_summary.map(x => x.building_country).sort())]
        },
        rangeSelect(range, from, to) {
            this.setRange(range)
            this.dataFilters.start_date = from.toISOString()
            this.dataFilters.stop_date = to.toISOString()
        },
        filterSelect(filter) {
            this.showFilter = false
            this.filter = filter
        },
        locFilter(loc) {
            if (!this.dataLoaded) return
            this.showLocFilter = false
            this.setLocation(loc)
        },
        // period filter
        filterMinute(minute) {
            this.showMinuteFilter = false
            this.minuteFilter = minute
            // this.dataFilters.trigger = minute
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
        timeStartChange(time, hour) { this.dataFilters.start_hour = hour },
        timeEndChange(time, hour) { this.dataFilters.stop_hour = hour },
        toPeak() { this.$router.push({ name: 'peak' }) },
        toWFH() { this.$router.push({ name: 'wfh' }) },
        toTimeChart() { this.$router.push({ name: 'time' }) }
    },
    created() {
        let now = new Date(),
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23)

        this.dataFilters.start_date = start.toISOString()
        this.dataFilters.stop_date = end.toISOString()

        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id

        if (this.rangeFilter == null) this.setRange('today')
    },
    mounted() {
        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)
    },
    destroyed() {
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
    border-radius: 10px;

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