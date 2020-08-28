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
                <a href="javascript:;" class="btn btn-primary ml-12" @click="toHeatMap">Heatmap</a>
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
                <span class="chart-title">Live View</span>
            </div>
            <div id="live-view">
                Map here...
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#live-view {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba($color: #ffffff, $alpha: 0.5);
    font-size: 2em;
}
</style>
<script>
import { addEvent, removeEvent } from '../../helpers'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { FilterDropdown } from '../../components'
export default {
    title: 'Live',
    components: { CaretIcon, CaretLeftIcon, FilterDropdown },
    data() {
        return {
            liveWS: null, showPageOpts: false, showEmbed: false, buildings: [], showFilter: false
        }
    },
    methods: {
        wsConnect() {
            this.liveWS = new WebSocket('ws://sigfox.switchfi.co.za:1880/ws/request')
            this.liveWS.onopen = this.wsOpened
            this.liveWS.onmessage = this.wsMessaged
            this.liveWS.onclose = this.wsClosed
        },
        wsOpened(e) {
            console.log('Connected to live data websocket.', e)
        },
        wsMessaged(e) {
            let data = JSON.parse(e.data),
                payload = JSON.parse(data.payload)

            console.log('Live data', payload)
        },
        wsClosed(e) {
            if (e.wasClean) {
                console.log('Connection to live data closed', e.code, e.reason)
            } else {
                console.log('Connection to live data died, reconnecting...')
                this.wsConnect()
            }
        },
        wsClose(reason) {
            this.liveWS.close(1000, reason)
        },
        windowUnload() { this.wsClose('Page closed') },
        backTo() { this.$router.back() },
        filterSelect(value) {},
        toHeatMap() {
            this.$router.push({ name: 'heat-map' })
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        }
    },
    created() {
        this.wsConnect()
    },
    mounted() {
        addEvent(window, 'beforeunload', this.windowUnload)
    },
    destroyed() {
        this.wsClose('Page closed')
        removeEvent(window, 'beforeunload', this.windowUnload)
    }
}
</script>