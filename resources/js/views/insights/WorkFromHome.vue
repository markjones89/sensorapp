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
                <span class="chart-title">Work From Home</span>
            </div>
            <div id="wfh-content">
                Content here...
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
<style lang="scss" scoped>
#wfh-content {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba($color: #ffffff, $alpha: 0.5);
    font-size: 2em;
}
</style>
<script>
import { store } from '../../store'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, TimeSlider } from '../../components'
export default {
    title: 'Work From Home',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, TimeSlider },
    data() {
        return {
            user: null, showPageOpts: false, buildings: [], showFilter: false,
            timeFilter: {
                start: null, end: null
            }
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null }
    },
    methods: {
        backTo() {},
        filterSelect(value) {},
        toCostAnalysis() {
            this.$router.push({ name: 'cost-analysis' })
        },
        rangeSelect(range, from, to) {},
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time }
    },
    created() {
        this.user = store.getUser()
    }
}
</script>