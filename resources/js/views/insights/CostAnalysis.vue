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
        </div>
    </div>
</template>
<style lang="scss" scoped>
#cost-tree {
    margin-top: 24px;
}
</style>
<script>
import { getBaseUrl } from '../../helpers'
import { DateRangeToggle } from '../../components'
import { collapsibleTree } from '../../components/graphs/CollapsibleTree'
export default {
    title: 'Cost Analysis',
    components: { DateRangeToggle },
    data() {
        return {
            loaded: false, showPageOpts: false
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() }
    },
    methods: {
        rangeSelect(range, from, to) {
            console.log('rangeSelect', range, from, to)
        },
        async renderTree() {
            fetch(`${this.baseUrl}/data/flare-2.json`)
                .then(response => response.json())
                .then(data => {
                    this.loaded = true
                    collapsibleTree('#cost-tree', data)
                    // console.log('tree', tree)
                    // document.getElementById('cost-tree').appendChild(tree);
                })
        }
    },
    mounted() {
        this.renderTree()
    }
}
</script>