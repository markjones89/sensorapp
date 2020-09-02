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
            <div class="row">
                <div class="col">
                    <div id="chart"></div>
                </div>
                <div class="col-md-4" id="stats-wrapper">
                    <div id="chart-stats">
                        <span class="chart-stat">
                            <span>Cost of Unutilised Spaces</span><span class="stat-figure">$23.5M</span>
                        </span>
                        <span class="chart-stat">
                            <span>Peak Workspace Utilisation</span><span class="stat-figure">65%</span>
                        </span>
                        <span class="chart-stat">
                            <span>Average Work space Utilisation</span><span class="stat-figure">52%</span>
                        </span>
                        <span class="chart-stat">
                            <span>Peak Meeting Room Occupancy</span><span class="stat-figure">75%</span>
                        </span>
                        <span class="chart-stat">
                            <span>User to workspace ratio</span><span class="stat-figure">1.5 to 1</span>
                        </span>
                        <span class="chart-stat">
                            <span>Work from home</span><span class="stat-figure">42%</span>
                        </span>
                    </div>
                </div>
            </div>
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
// #chart {
    .tooltip {
        position: absolute;
        padding: 6px 8px;
        font-size: 14px;
        border-radius: 4px;
        background-color: #ffffff;
        color: #000;
        pointer-events: none;

        &:before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #ffffff transparent transparent transparent;
        }
    }
// }
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

            &.percent {
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
#chart {
    position: relative;
}

#stats-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    #chart-stats {
        padding: 20px;
        background-color: #393939;
        border-radius: 10px;

        .chart-stat {
            display: flex;
            font-size: 14px;
            line-height: 40px;
            justify-content: space-between;

            .stat-figure {
                font-weight: bold;
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
<script>
import { addEvent, getBaseUrl, removeEvent } from "../helpers"
import { DateRangeToggle, FilterDropdown, Modal, TimeSlider } from "../components"
import { circlePack } from '../components/graphs/CirclePack'
import { CaretIcon } from "../components/icons"
import { store } from '../store'
export default {
    title: 'Home',
    components: { CaretIcon, DateRangeToggle, FilterDropdown, Modal, TimeSlider },
    data() {
        return {
            user: null, circlePack: null, filters: [
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

            this.circlePack.goTo(loc)
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
            let _data = {}
            let nodes = await axios.get(`${baseUrl}/data/circle-pack.json`)
            let stats = await axios.get(`${baseUrl}/data/circle-pack-category.json`)

            _data.stats = stats.data
            _data.nodes = nodes.data

            this.circlePack = new circlePack('#chart', _data, {
                zoomed: (data) => {
                    console.log('zoomed', data)
                },
                moreInfo: (data) => {
                    this.$router.push({ name: 'time' })
                }
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