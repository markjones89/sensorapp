<template>
    <div class="content">
        <template v-if="loaded && building">
            <div class="graph-header">
                <date-range-toggle @select="rangeSelect" />
                <div class="graph-filters">
                    <span class="graph-filter" @click="showFilter = !showFilter">
                        {{ bldgFilter ? bldgFilter : 'Select Building' }}
                        <span class="caret">
                            <caret-icon />
                        </span>
                        <filter-dropdown :filters="buildingFilters" :show="showFilter" @onSelect="filterSelect" />
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
                <div class="page-back">
                    <div class="back-button" @click="backTo">
                        <button class="btn btn-primary btn-small">
                            <caret-left-icon />
                        </button>
                        Back
                    </div>
                </div>
                <div class="chart-header">
                    <span class="chart-title">{{ `Work From Home - ${building.name}` }}</span>
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
            <div class="graph-footer">
                <div class="left-options"></div>
                <div class="right-options">
                    <checkbox label="Save to report" />
                </div>
            </div>
        </template>
        <loader :show="!loaded" type="ripple"/>
    </div>
</template>
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
<script>
import { store } from '../../store'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '../../components'
import { BuildingSvg, HouseSvg } from '../../components/svg'

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
    components: { BuildingSvg, CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, HouseSvg, Loader, TimeSlider },
    data() {
        return {
            user: null, loaded: false, showPageOpts: false, showEmbed: false,
            showFilter: false, buildings: [], floors: [],
            building: null, bldgFilter: null,
            wfhStat: 0, bldgStat: 0,
            timeFilter: {
                start: null, end: null
            },
            minuteFilter: '10 minutes', showMinuteFilter: false
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null },
        buildingFilters() {
            return this.buildings.map(b => { return { value: b.hid, label: b.name } })
        },
        homeScale() { return (this.wfhStat < MIN_SCALE ? MIN_SCALE : this.wfhStat) / 100 },
        bldgScale() { return (this.bldgStat < MIN_SCALE ? MIN_SCALE : this.bldgStat) / 100 },
        minuteFilters() {
            var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    }, 
    methods: {
        backTo() { this.$router.back() },
        async getBuildings() {
            let company = this.user.company

            if (!company) return

            let { data } = await axios.get(api.building, { params: { cid: company.hid, lob: true } })

            this.buildings = data
            if (this.bldg_id) {
                this.building = data.find(b => b.hid === this.bldg_id)
            } else {
                this.building = data[0]
            }
            this.bldgFilter = this.building.name
            this.getFloors(this.building.hid, () => {
                this.loaded = true
                
                //TODO: show stats
                this.wfhStat = randomNum()
                this.bldgStat = 100 - this.wfhStat
            })
        },
        async getFloors(id, cb) {
            let { data } = await axios.get(api.floor, { params: { bid: id } })

            let sorted = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })

            this.floors = sorted.slice(0)

            return cb && cb()
        },
        filterSelect(value, label) {
            this.showFilter = false
            this.building = this.buildings.find(b => b.hid === value)
            this.bldgFilter = label
            this.getFloors(this.building.hid, () => {
                //TODO: update stats
                this.wfhStat = randomNum()
                this.bldgStat = 100 - this.wfhStat
            })
        },
        toCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        rangeSelect(range, from, to) {},
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilter = min.label;
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        this.getBuildings()
    }
}
</script>