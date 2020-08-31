<template>
    <div class="content">
        <div class="graph-header">
            <date-range-toggle @select="rangeSelect" />
            <div class="graph-filters">
                <span class="graph-filter" @click="showFilter = !showFilter">
                    Select Building
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="buildings" :show="showFilter" @onSelect="filterSelect" />
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
            <div class="chart-header">
                <span class="chart-title">Compare Room Size Performance</span>
            </div>
            <div id="room-compare">
                <span id="left-filter" class="graph-filter" @click="showLeftFilter = !showLeftFilter">
                    {{ leftFilter ? leftFilter : 'Select Room Size' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="sizeFilters" :show="showLeftFilter" @onSelect="filterLeft" />
                </span>
                <two-person-chair-svg />
                <span id="right-filter" class="graph-filter" @click="showRightFilter = !showRightFilter">
                    {{ rightFilter ? rightFilter : 'Select Room Size' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="sizeFilters" :show="showRightFilter" @onSelect="filterRight" />
                </span>
                <span id="percent-filter" class="graph-filter" @click="showPercentFilter = !showPercentFilter">
                    {{ percentFilter ? percentFilter : 'Select Percent' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="percents" :maxItems="3" :chosen="percentFilter" :show="showPercentFilter" @onSelect="filterPercent" />
                </span>
            </div>
            <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
            <div class="clearfix"></div>
        </div>
        <div class="graph-footer">
            <div class="left-options"></div>
            <div class="right-options">
                <checkbox label="Save to report" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
$blue: #524FFF;
$orange: #FF5A09;
$skewDeg: 30deg;

#room-compare {
    position: relative;
    width: 920px;
    margin: 0 auto;

    #left-filter {
        position: absolute;
        top: 0;
        left: 0;
    }

    #right-filter {
        position: absolute;
        top: 0;
        right: 0;
    }

    #percent-filter {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 32px;
    }

    .person-chair-svg {
        padding: 48px 0 48px;
    }

    .stat-group {
        position: relative;
        margin-bottom: 20px;

        .bars-group {
            position: absolute;
            display: inline-block;
            border-bottom: 1px dashed #ffffff;

            .bars {
                position: absolute;

                .percent {
                    display: block;
                    font-size: 12px;
                    margin-bottom: 5px;
                    text-align: center;
                }

                .bar {
                    display: block;
                    width: 30px;
                    height: 10px;
                    margin-bottom: 5px;

                    &.peak { background-color: $blue; }
                    &.average { background-color: $orange; }
                }
            }

            &.left {
                border-left: 1px dashed #ffffff;

                .bars {
                    bottom: 100%;
                    transform: translateX(-15px);

                    .percent {
                        transform: rotate(-$skewDeg);
                    }

                    .bar {
                        transform: skewY(-$skewDeg);
                    }
                }
            }
            &.right {
                border-right: 1px dashed #ffffff;

                .bars {
                    right: -15px;
                    bottom: 100%;

                    .percent {
                        transform: rotate($skewDeg);
                        transform-origin: bottom;
                    }

                    .bar {
                        transform: skewY($skewDeg);
                    }
                }
            }
        }

        .group-label {
            display: inline-block;
            padding: 6px 0;
            font-size: 12px;
        }

        &:nth-child(odd) {
            .bars-group {
                border-color: $blue;
            }

            .group-label {
                background-color: $blue;
            }
        }
        &:nth-child(even) {
            .bars-group {
                border-color: $orange;
            }

            .group-label {
                background-color: $orange;
            }
        }
    }
}
</style>
<script>
import { store } from '../../store'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, TimeSlider } from '../../components'
import { TwoPersonChairSvg } from '../../components/svg'
import { roomComparer } from '../../components/graphs/RoomCompare'

function randomNum(limit) {
    return Math.floor(Math.random() * (limit || 100))
}

function randomData() {
    return [
        { average: randomNum(), peak: randomNum() },
        { average: randomNum(), peak: randomNum() },
        { average: randomNum(), peak: randomNum() },
        { average: randomNum(), peak: randomNum() },
        { average: randomNum(), peak: randomNum() },
        { average: randomNum(), peak: randomNum() }
    ]
}

export default {
    title: 'Compare Room',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, TimeSlider, TwoPersonChairSvg },
    data() {
        return {
            user: null, showPageOpts: false, showEmbed: false, buildings: [], showFilter: false,
            comparer: null,
            showLeftFilter: false, showRightFilter: false, showPercentFilter: false,
            sizes: [4, 6, 12, 15], leftFilter: null, rightFilter: null, percents: ['10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'], percentFilter: '70%',
            timeFilter: {
                start: null, end: null
            }
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null },
        sizeFilters() {
            return this.sizes.map(s => {
                return { value: s, label: `${s}-seated Room` }
            })
        }
    },
    methods: {
        backTo() { this.$router.back() },
        filterSelect(value) {},
        toCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        rangeSelect(range, from, to) {
            //TODO: get data based on date range
            this.generateRandomData()
        },
        timeStartChange(time) {
            this.timeFilter.start = time 

            //TODO: get data based on time range
            this.generateRandomData()
        },
        timeEndChange(time) {
            this.timeFilter.end = time

            //TODO: get data based on time range
            this.generateRandomData()
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        filterLeft(value, label) {
            this.showLeftFilter = false
            this.leftFilter = label
            //TODO: get left data
            this.comparer.setLeft(randomData())
        },
        filterRight(value, label) {
            this.showRightFilter = false
            this.rightFilter = label
            //TODO: get right data
            this.comparer.setRight(randomData())
        },
        filterPercent(value) {
            let percent = value

            this.showPercentFilter = false
            this.percentFilter = value

            //TODO: get data by percent
            this.generateRandomData()
        },
        generateRandomData() {
            let data = {
                groups: [
                    '% of rooms occupied at the same time',
                    `% of time that ${this.percentFilter} of the rooms (or more) are occupied at the same time`,
                    '% of time rooms are occupied at the same time at peak',
                    'Size of meetings. % of Capacity',
                    `% of time that rooms are above ${this.percentFilter} Capacity`,
                    '% of time rooms are at Peak Capacity'
                ],
                left: randomData(),
                right: randomData()
            }
            this.comparer.setData(data)
        }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        let data = {
            groups: [
                '% of rooms occupied at the same time',
                `% of time that ${this.percentFilter} of the rooms (or more) are occupied at the same time`,
                '% of time rooms are occupied at the same time at peak',
                'Size of meetings. % of Capacity',
                `% of time that rooms are above ${this.percentFilter} Capacity`,
                '% of time rooms are at Peak Capacity'
            ],
            left: [
                { average: 60, peak: 70 },
                { average: 20, peak: 0 },
                { average: 0, peak: 2 },
                { average: 60, peak: 100 },
                { average: 0, peak: 20 },
                { average: 40, peak: 0 }
            ],
            right: [
                { average: 80, peak: 100 },
                { average: 21, peak: 0 },
                { average: 0, peak: 15 },
                { average: 100, peak: 100 },
                { average: 0, peak: 0 },
                { average: 40, peak: 0 }
            ]
        }
        this.comparer = new roomComparer('#room-compare', data)
    }
}
</script>