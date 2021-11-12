<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <div class="graph-filters" v-if="loaded">
                <graph-filter placeholder="Select Location" :filters="locations" :chosen="selectedLocation" :chosenAsSelected="true" @onSelect="filterSelect" />
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
        </div>
        <div class="graph-content">
            <div class="page-back">
                <div class="back-button" @click="backTo">
                    <button class="btn btn-primary btn-small">
                        <caret-left-icon />
                    </button>
                    Back
                </div>
            </div>
            <template v-if="loaded">
                <template v-if="!dataError">
                    <div class="chart-header">
                        <span class="chart-title">{{ `Work From Home - ${locationLabel}` }}</span>
                        <span class="chart-subtitle">({{ statDateRange }})</span>
                    </div>
                    <div id="wfh-content">
                        <div id="house-wrapper">
                            <house-svg :style="{ transform: `scale(${homeScale})` }" />
                            <span class="stat">{{ `${wfhStat}%` }}</span>
                        </div>
                        <div id="building-wrapper">
                            <building-svg :floors="floors" :style="{ transform: `scale(${bldgScale})` }" />
                            <span class="stat">{{ `${bldgStat}%` }}</span>
                        </div>
                    </div>
                </template>
                <div v-else class="error-display" style="height: 60vh">
                    <p>{{ dataError }}</p>
                    <a href="javascript:;" class="btn btn-primary" @click="getData(true)" style="align-self:center;">Retry</a>
                </div>
            </template>
            <div v-else style="height: 60vh">
                <loader :show="!loaded" type="ripple"/>
            </div>
            <div class="bottom-filters">
                <time-slider :from="timeFilter.start" :to="timeFilter.end"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <graph-filter :filters="minuteFilters" :chosen="minuteFilter" :chosenAsSelected="true" position="top" @onSelect="filterMinute" />
            </div>
        </div>
        <div class="graph-footer">
            <div class="left-options"></div>
            <div class="right-options">
                <checkbox label="Save to report" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { CaretIcon, CaretLeftIcon } from '@/components/icons'
import { Checkbox, DateRangeToggle, GraphFilter, Loader, TimeSlider } from '@/components'
import { BuildingSvg, HouseSvg } from '@/components/svg'
import { average, dateRangeStr, extractLocations, getObjValue, toHour, toISOEnd, toISOStart } from '@/helpers';

const api = {
    building: '/api/locations',
    floor: '/api/floors'
}

/**
 * Minimum percent scaling threshold
 */
const MIN_SCALE = 25

function randomNum() {
    return Math.floor((Math.random() * 100) + 1)
}

export default {
    title: 'Work From Home',
    components: {
        BuildingSvg,
        CaretIcon,
        CaretLeftIcon,
        Checkbox,
        DateRangeToggle,
        // FilterDropdown,
        GraphFilter,
        HouseSvg,
        Loader,
        TimeSlider
    },
    data: () => ({
        loaded: false, showPageOpts: false, showEmbed: false,
        // showFilter: false, 
        locations: [],
        floors: [
            { id: 1, number: 1, occupancy_live: 0, occupancy_limit: 100 },
            { id: 2, number: 2, occupancy_live: 0, occupancy_limit: 100 },
            { id: 3, number: 3, occupancy_live: 0, occupancy_limit: 100 },
            { id: 4, number: 4, occupancy_live: 0, occupancy_limit: 100 }
        ],
        building: null,
        wfhStat: 0, bldgStat: 0,
        timeFilter: { start: null, end: null },
        minuteFilter: 60, 
        // showMinuteFilter: false,
        dataError: null, axiosSrc: null,
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
            summary: state => state.homepage.summary,
            filter: state => state.homepage.filter,
            rangeFilter: state => state.homepage.rangeFilter,
            locationFilter: state => state.homepage.locationFilter,
            startTimeFilter: state => state.homepage.startTime,
            endTimeFilter: state => state.homepage.endTime
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers',
            // api_buildings: 'backend/api_buildings',
            // api_floors: 'backend/api_floors'
            api_customer_summary: 'backend/api_customer_summary'
        }),
        settings() { return this.user.company ? this.user.company.settings : null },
        homeScale() { return (this.wfhStat < MIN_SCALE ? MIN_SCALE : this.wfhStat) / 100 },
        bldgScale() { return (this.bldgStat < MIN_SCALE ? MIN_SCALE : this.bldgStat) / 100 },
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            let minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        },
        selectedLocation() { return this.locationFilter?.value },
        locationLabel() { return this.locationFilter?.label },
        statDateRange() {
            let start = this.dataFilters.start_date
            let end = this.dataFilters.stop_date
            let from = new Date(start.substring(0, start.indexOf('T')))
            let to = new Date(end.substring(0, end.indexOf('T')))

            return dateRangeStr(from, to)
        }
    },
    // watch: {
    //     dataFilters: {
    //         deep: true,
    //         handler(value, old) {
    //             if (this.axiosSrc) this.axiosSrc.cancel('Filters changed')
    //             this.getData(true)
    //         }
    //     }
    // },
    methods: {
        ...mapMutations({
            setSummary: 'homepage/setSummary',
            setRange: 'homepage/setRange',
            setLocation: 'homepage/setLocation'
        }),
        backTo() { this.$router.back() },
        getStats() {
            let selected = this.locationFilter

            if (!selected) return

            let summary = this.summary.building_summary
            if (selected.building) {
                let bldg = summary.find(x => x.building_id == selected.value)
                this.wfhStat = Math.round(getObjValue(bldg, 'work_from_home.average_percentage', 0))
            }
            else {
                let buildings = []

                if (selected.city) buildings = summary.filter(x => `${x.building_country}_${x.building_city}_City`.replace(/\s/g,'') == selected.value)
                else if (selected.country) buildings = summary.filter(x => x.building_country.replace(/\s/g,'') == selected.value)
                else buildings = summary

                this.wfhStat = Math.round(average(buildings.map(x => getObjValue(x, 'work_from_home.average_percentage', 0))))
            }
            this.bldgStat = 100 - this.wfhStat
        },
        async getData(refresh = false) {
            this.loaded = false
            let doRequest = this.summary == null || refresh
            try {
                if (doRequest) {
                    this.axiosSrc = axios.CancelToken.source()
                    let { data } = await axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token))

                    if (data.building_summary && data.building_summary.length == 0) {
                        this.dataError = "No results"
                        this.loaded = true
                        return
                    }
                    else {
                        this.setSummary(data)
                    }
                }
                
                let data = JSON.parse(JSON.stringify(this.summary))
                this.loaded = true
                this.dataError = null
                
                let locations = extractLocations(data)

                if (this.locationFilter == null) {
                    this.setLocation({ label: data.customer, value: data.customer })
                }
                
                this.locations = locations
                this.getStats()
            } catch (error) {
                console.error('getData.error', error)
                this.dataError = 'Unable to retrieve data, please try again'
                this.loaded = true
            }
        },
        filterSelect(value, label, loc) {
            this.setLocation(loc)

            //TODO: update stats
            this.getStats()
        },
        toTreeSummary() { this.$router.push({ name: 'tree-summary', query: { df: this.filter.value } }) },
        rangeSelect(range, from, to) {
            let isoStart = toISOStart(from),
                isoEnd = toISOEnd(to)

            this.loaded = false
            this.setRange({ type: range, start: isoStart, end: isoEnd })
            this.dataFilters.start_date = isoStart
            this.dataFilters.stop_date = isoEnd
            
            if (this.axiosSrc) this.axiosSrc.cancel('Filters changed')
            this.getData(true)
        },
        timeStartChange(time, hour) {
            this.loaded = false
            this.dataFilters.start_hour = hour
            this.setTime({ start: hour, end: this.dataFilters.stop_hour })
            
            if (this.axiosSrc) this.axiosSrc.cancel('Filters changed')
            this.getData(true)
        },
        timeEndChange(time, hour) {
            this.loaded = false
            this.dataFilters.stop_hour = hour
            this.setTime({ start: this.dataFilters.start_hour, end: hour })
            
            if (this.axiosSrc) this.axiosSrc.cancel('Filters changed')
            this.getData(true)
        },
        filterMinute(minute) { this.minuteFilter = minute },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        }
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
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
#wfh-content {
    position: relative;

    .stat {
        position: absolute;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        min-width: 48px;
        line-height: 48px;
        border-radius: 50%;
        bottom: 16px;
        background-color: #FF5A09;
    }

    #house-wrapper {
        position: relative;
        display: inline-block;
        padding: 0 0 32px 0;

        .house-svg {
            transform-origin: bottom;
            transition: transform .4s;
        }

        .stat {
            margin-left: 90px;
        }
    }

    #building-wrapper {
        position: relative;
        display: inline-block;
        padding: 0 0 32px 0;

        .building-svg {
            transform-origin: bottom;
            transition: transform .4s;
        }

        .stat {
            margin-left: 120px;
        }
    }
}
</style>