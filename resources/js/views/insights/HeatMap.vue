<template>
    <div class="content">
        <div class="graph-header">
            <div class="page-back">
                <div class="back-button" @click="backTo">
                    <button class="btn btn-primary btn-small">
                        <caret-left-icon />
                    </button>
                    Back
                </div>
            </div>
            <div class="graph-filters">
                <span class="graph-filter" @click="showFilter = !showFilter">
                    Select Building
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="buildings" :show="showFilter" @onSelect="filterSelect" />
                </span>
                <a href="javascript:;" class="btn btn-primary ml-12" @click="toLive">Live</a>
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
                <span class="chart-title">Heat Map</span>
            </div>
            <date-range-toggle @select="rangeSelect" />
            <div id="heat-map">
                Map here...
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
#heat-map {
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
    title: 'Heat Map',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, TimeSlider },
    data() {
        return {
            user: null, showPageOpts: false, showEmbed: false, buildings: [], showFilter: false,
            timeFilter: {
                start: null, end: null
            }
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null }
    },
    methods: {
        backTo() { this.$router.back() },
        filterSelect(value) {},
        toLive() {
            this.$router.push({ name: 'live' })
        },
        rangeSelect(range, from, to) {},
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        }
    },
    created() {
        this.user = store.getUser()
    }
}
</script>