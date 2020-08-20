<template>
    <div class="content">
        <div class="graph-header">
            <div class="graph-range-btns">
                <span class="graph-range-btn btn--active">Today</span>
                <span class="graph-range-btn">This Week</span>
                <span class="graph-range-btn">This Month</span>
                <span class="graph-range-btn">This Year</span>
                <span class="graph-range-btn">Pick Date</span>
            </div>
            <div class="graph-filters">
                <span class="graph-filter">
                    Filter By
                    <span class="caret">
                        <caret-icon />
                    </span>
                </span>
                <span class="graph-filter">
                    Select Location
                    <span class="caret">
                        <caret-icon />
                    </span>
                </span>
                <a href="javascript:;" class="btn btn-primary" id="cost-analysis-btn" @click="viewCostAnalysis">Cost Analysis</a>
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
#cost-analysis-btn {
    margin-left: 12px;
}

#chart {
    width: 50%;
    padding: 64px;
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
import { Modal, TimeSlider } from "../components"
import circlePacker from '../components/graphs/CirclePacks.js'
import { CaretIcon } from "../components/icons"
import { store } from '../store'
export default {
    title: 'Home',
    components: { CaretIcon, Modal, TimeSlider },
    data() {
        return {
            user: null,
            filter: null, locationFilter: null, showPageOpts: false, showEmbed: false
        }
    },
    computed: {
        settings() { return this.user.company ? this.user.company.settings : null }
    },
    methods: {
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
            // let json = await d3.json(`${baseUrl}/data/flare-2.json`)
            fetch(`${baseUrl}/data/flare-2.json`)
                .then(response => response.json())
                .then(json => {
                    circlePacker('#chart', json)
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