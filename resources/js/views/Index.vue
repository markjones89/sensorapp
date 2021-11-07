<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <template v-if="dataLoaded">
                <div class="graph-filters">
                    <!-- <graph-filter placeholder="Filter By" :filters="filters" :chosen="filter.value" :chosenAsSelected="true" @onSelect="filterSelect" /> -->
                    <stat-filter></stat-filter>
                    <graph-filter placeholder="Select Location" :filters="locations" :chosen="locationFilter.value" :chosenAsSelected="true" @onSelect="locFilter" />
                    <a href="javascript:;" class="btn btn-primary ml-12" @click="toTreeSummary">{{ filter.btnLabel }}</a>
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
            </template>
        </div>
        <div class="graph-content">
            <!-- graph & legends here -->
            <circle-pack-stats ref="circlePack"
                :custData="summary" :statFilter="filter" :dataFilters="dataFilters"
                @dataLoaded="circlePackLoaded" @costClick="toTreeSummary" @peakClick="toPeak" @wfhClick="toWFH" @goToTime="toTimeChart" />
            <div class="bottom-filters">
                <time-slider :from="timeFilter.start" :to="timeFilter.end"
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
import { addEvent, removeEvent, toHour, toISOStart, toISOEnd, extractLocations } from '@/helpers'
import { DateRangeToggle, GraphFilter, Modal, TimeSlider } from '@/components'
import { CirclePackStats, StatFilter } from '@/components/partials'
export default {
    title: 'Home',
    components: {
        DateRangeToggle,
        GraphFilter,
        Modal,
        TimeSlider,
        CirclePackStats,
        StatFilter
    },
    data: () => ({
        locations: [],
        minuteFilter: 60,
        timeFilter: { start: null, end: null },
        showPageOpts: false, showEmbed: false,
        dataLoaded: false,
        dataFilters: {
            trigger: 6,
            start_hour: 8,
            stop_hour: 16,
            low_desk_filter: 0.2,
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
            filter: state => state.homepage.filter,
            locationFilter: state => state.homepage.locationFilter,
            startTimeFilter: state => state.homepage.startTime,
            endTimeFilter: state => state.homepage.endTime,
            periodFilter: state => state.homepage.periodFilter
        }),
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            let minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        ...mapMutations({
            setSummary: 'homepage/setSummary',
            setRange: 'homepage/setRange',
            setFilter: 'homepage/setFilter',
            setLocation: 'homepage/setLocation',
            setTime: 'homepage/setTime',
            setMinute: 'homepage/setMinute',
            setPeakSummary: 'peakchart/setSummary'
        }),
        circlePackLoaded(data, fromCache) {
            this.dataLoaded = true
            if (!fromCache) {
                this.setSummary(data)
                this.setLocation({ label: data.customer, value: data.customer })
                this.setPeakSummary(null)
            }

            this.locations = extractLocations(data)
        },
        rangeSelect(range, from, to) {
            let isoStart = toISOStart(from),
                isoEnd = toISOEnd(to)

            this.dataLoaded = false
            this.setRange({ type: range, start: isoStart, end: isoEnd })
            this.dataFilters.start_date = isoStart
            this.dataFilters.stop_date = isoEnd
        },
        // filterSelect(value, label, obj) { this.setFilter(obj) },
        locFilter(value, label, loc) {
            this.setLocation(loc)

            if (this.$refs.circlePack) this.$refs.circlePack.zoomTo(loc)
        },
        // period filter
        filterMinute(minute) {
            this.minuteFilter = minute
            // this.dataLoaded = false
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
        toTreeSummary() {
            // this.$router.push({ name: 'tree-summary', query: { df: this.filter.value } })
            this.$router.push({ name: 'tree-summary' })
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        timeStartChange(time, hour) {
            this.dataLoaded = false
            this.dataFilters.start_hour = hour
            this.setTime({ start: hour, end: this.dataFilters.stop_hour })
        },
        timeEndChange(time, hour) {
            this.dataLoaded = false
            this.dataFilters.stop_hour = hour
            this.setTime({ start: this.dataFilters.start_hour, end: hour })
        },
        toPeak(location) { this.$router.push({ name: 'peak' }) },
        toWFH() { this.$router.push({ name: 'wfh' }) },
        toTimeChart() { this.$router.push({ name: 'time' }) }
    },
    created() {
        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id

        if (this.rangeFilter.type == null) {
            let now = new Date(),
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23),
                isoStart = toISOStart(start),
                isoEnd = toISOEnd(end)

            this.dataFilters.start_date = isoStart
            this.dataFilters.stop_date = isoEnd
            this.setRange({ type: 'today', start: isoStart, end: isoEnd })
        } else {
            this.dataFilters.start_date = this.rangeFilter.start
            this.dataFilters.stop_date = this.rangeFilter.end
        }

        if (this.startTimeFilter) {
            this.dataFilters.start_hour = this.timeFilter.start = this.startTimeFilter
            this.dataFilters.stop_hour = this.timeFilter.end = this.endTimeFilter
        }
        else if (this.settings) {
            this.dataFilters.start_hour = this.timeFilter.start = toHour(this.settings.start_time)
            this.dataFilters.stop_hour = this.timeFilter.end = toHour(this.settings.end_time)
        }
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

    &.zoom {
        transform: translateX(-50%);
        
        &:before { display: none; }
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