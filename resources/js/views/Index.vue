<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" />
            <div class="graph-filters">
                <span class="graph-filter" @click="showFilter = !showFilter">
                    Filter By
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="filters" multiple="true" :show="showFilter" v-model="filter" @onSelect="filterSelect" />
                </span>
                <span class="graph-filter" @click="showLocFilter = !showLocFilter">
                    {{ locationFilter ? locationFilter : 'Select Location' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="locations" :show="showLocFilter" @onSelect="locFilter" />
                </span>
                <a href="javascript:;" class="btn btn-primary ml-12" @click="viewCostAnalysis">Cost Analysis</a>
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
            <div id="chart"></div>
            <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
            <div class="clearfix"></div>
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
<style lang="scss">
.circle-packs {
    pointer-events: all;
    border-radius: 50%;
}
</style>
<style lang="scss" scoped>
#chart {
    width: 45%;
    padding: 24px;
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
<script>
import { addEvent, getBaseUrl, removeEvent } from "../helpers"
import { DateRangeToggle, FilterDropdown, Modal, TimeSlider } from "../components"
import circlePacker from '../components/graphs/CirclePacks.js'
import { CaretIcon } from "../components/icons"
import { store } from '../store'
export default {
    title: 'Home',
    components: { CaretIcon, DateRangeToggle, FilterDropdown, Modal, TimeSlider },
    data() {
        return {
            user: null, filters: [
                { value: 'CUS', label: 'Cost of Unused Spaces' },
                { value: 'PU', label: 'Peak Usage' },
                { value: 'AU', label: 'Average Usage' },
                { value: 'LPS', label: 'Low Performing Spaces' },
                { value: 'SC', label: 'Spare Capacity' }
            ], 
            locations: ['United States', 'Japan', 'Australia', 'Philippines', 'UK', 'South Korea', 'China', 'India'],
            filter: [], locationFilter: null,
            showPageOpts: false, showEmbed: false, showFilter: false, showLocFilter: false
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null }
    },
    methods: {
        rangeSelect(range, from, to) {
            console.log('rangeSelect', range, from, to)
        },
        filterSelect(filters) {
            this.showFilter = false
            console.log('filters', filters)
        },
        locFilter(loc) {
            this.showLocFilter = false
            this.locationFilter = loc
            console.log('locFilter', loc)
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
        viewCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async renderChart() {
            let baseUrl = getBaseUrl()
            // fetch(`${baseUrl}/data/flare-2.json`)
            fetch(`${baseUrl}/data/circle-pack.json`)
                .then(response => response.json())
                .then(json => {
                    circlePacker('#chart', json, {
                        toTimeChart: (data) => {
                            console.log('toTimeChart', data)
                            this.$router.push({ name: 'time' })
                        }
                    })
                })
        },
        timeStartChange(time) {
            // console.log('from', time)
        },
        timeEndChange(time) {
            // console.log('to', time)
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)

        this.renderChart()
    },
    destroyed() {
        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.pageOptsHandler)
    }
}
</script>