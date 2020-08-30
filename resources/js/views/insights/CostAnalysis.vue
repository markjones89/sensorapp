<template>
    <div class="content">
        <div class="graph-header">
            <div class="graph-range-btns"></div>
            <div class="graph-filters"></div>
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
                <span class="chart-title">Cost Analysis</span>
            </div>
            <date-range-toggle @select="rangeSelect" />
            <div id="cost-tree"></div>
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
#cost-tree {
    margin: 24px auto;
    max-width: 100%;
    width: 1024px;
}
</style>
<script>
import { store } from '../../store'
import { getBaseUrl } from '../../helpers'
import { Checkbox, DateRangeToggle, TimeSlider } from '../../components'
import { collapsibleTree } from '../../components/graphs/CollapsibleTree'
export default {
    title: 'Cost Analysis',
    components: { Checkbox, DateRangeToggle, TimeSlider },
    data() {
        return {
            user: null, loaded: false, showPageOpts: false, showEmbed: false,
            timeFilter: {
                start: null, end: null
            }
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null },
        baseUrl() { return getBaseUrl() }
    },
    methods: {
        rangeSelect(range, from, to) {
            console.log('rangeSelect', range, from, to)
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async renderTree() {
            fetch(`${this.baseUrl}/data/flare-2.json`)
                .then(response => response.json())
                .then(data => {
                    this.loaded = true
                    collapsibleTree('#cost-tree', data)
                })
        },
        timeStartChange(time) { this.timeFilter.start = time },
        timeEndChange(time) { this.timeFilter.end = time }
    },
    created() {
        this.user = store.getUser()
    },
    mounted() {
        this.renderTree()
    }
}
</script>