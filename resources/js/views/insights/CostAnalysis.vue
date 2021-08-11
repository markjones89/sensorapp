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
            <!-- <div class="graph-filters"></div> -->
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
            <date-range-toggle @select="rangeSelect" :active="rangeFilter" />
            <template v-if="loaded">
                <div id="cost-tree" v-if="!dataError"></div>
                <div v-else class="error-display" style="height: 40vh">
                    <p>{{ dataError }}</p>
                    <a href="javascript:;" class="btn btn-primary" @click="renderTree(true)" style="align-self:center;">Retry</a>
                </div>
            </template>
            <div v-else style="height: 40vh">
                <loader :show="!loaded" type="ripple"/>
            </div>
            <!-- <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <div class="clearfix"></div> -->
            <div class="bottom-filters">
                <time-slider :from="settings ? settings.start_time : null" :to="settings ? settings.end_time : null"
                    @startChanged="timeStartChange" @endChanged="timeEndChange"></time-slider>
                <span class="graph-filter" @click="showMinuteFilter = !showMinuteFilter">
                    {{ minuteFilterLbl ? minuteFilterLbl : 'Select' }}
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getBaseUrl } from '../../helpers'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider } from '../../components'
import { collapsibleTree } from '../../components/graphs/CollapsibleTree'
export default {
    title: 'Cost Analysis',
    components: { CaretIcon, CaretLeftIcon, Checkbox, DateRangeToggle, FilterDropdown, Loader, TimeSlider },
    data: () => ({
        loaded: false, showPageOpts: false, showEmbed: false,
        timeFilter: {
            start: null, end: null
        },
        minuteFilterLbl: '60 minutes', showMinuteFilter: false, axiosSrc: null,
        dataError: null,
        dataFilters: {
            trigger: 6,
            start_hour: 8,
            stop_hour: 16,
            start_date: '',
            stop_date: '',
            node_type: 'Customer',
            node_id: 'ad9b565d-9082-4808-99cd-32f2f09f63f2'
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            company: state => state.user.company,
            summary: state => state.homepage.summary,
            rangeFilter: state => state.homepage.rangeFilter,
            // startTimeFilter: state => state.homepage.startTime,
            // endTimeFilter: state => state.homepage.endTime,
            // periodFilter: state => state.homepage.periodFilter
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customer_summary: 'backend/api_customer_summary'
        }),
        settings() { return this.user.company ? this.user.company.settings : null },
        baseUrl() { return getBaseUrl() },
        minuteFilters() {
            // var minutes = [10, 15, 30, 45, 60, 120, 240, 480];
            var minutes = [60]
            
            return minutes.map(function(x){ return { value: x, label: `${x} minutes` } });
        }
    },
    methods: {
        ...mapMutations({
            setSummary: 'homepage/setSummary',
            setRange: 'homepage/setRange'
        }),
        backTo() { this.$router.back() },
        rangeSelect(range, from, to) {
            // console.log('rangeSelect', range, from, to)
            this.setRange(range)
            this.dataFilters.start_date = from.toISOString()
            this.dataFilters.stop_date = to.toISOString()
            if (this.axiosSrc) this.axiosSrc.cancel('Date range selected')
            this.renderTree(true)
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        },
        async renderTree(refresh = false) {
            /* fetch(`${this.baseUrl}/data/flare-2.json`)
                .then(response => response.json())
                .then(data => {
                    this.loaded = true
                    collapsibleTree('#cost-tree', data)
                }) */
            let keys = ['building_country', 'building_city'],
                grouped = [],
                temp = { _: grouped }

            this.loaded = false

            if (this.summary == null || refresh) {
                this.axiosSrc = axios.CancelToken.source()
                let { data } = await axios.post(this.api_customer_summary, this.dataFilters, this.api_header(this.axiosSrc.token))

                if (!data.building_summary) {
                    this.dataError = data
                    this.loaded = true
                    return
                }
                else if (data.building_summary && data.building_summary.length == 0) {
                    this.dataError = "No results"
                    this.loaded = true
                    return
                }
                else {
                    this.dataError = null
                    // this.summary = data;
                    this.setSummary(data)
                }
            }

            let nodes = { ID: '', name: this.summary.customer, children: [] }
            let summary = [...this.summary.building_summary]

            nodes.value = summary.map(x => x.opportunity_cost).reduce((a, b) => a + b, 0)

            summary.forEach(a => {
                // nodes
                a.name = a.building_name
                a.value = a.opportunity_cost

                // free desks/meeting at peak
                a.children = [
                    { name: 'Free Desks at Peak', value: a.peak_free_workspace, number: true },
                    { name: 'Free Meeting Rooms at Peak', value: a.peak_free_meeting_room, number: true },
                ]

                keys.reduce((r, k) => {
                    if (!r[a[k]]) {

                        r[a[k]] = { _: [] }
                        
                        if (a[k]) {
                            let l = { ['name']: a[k], ['children']: r[a[k]]._ }

                            if (k === 'building_country') {
                                let buildings = summary.filter(x => x[k] == a[k])
                                
                                l.value = buildings.map(x => x.opportunity_cost).reduce((a, b) => a + b, 0)
                                l.building_country = true
                            }
                            else if (k === 'building_city') {
                                let buildings = summary.filter(x => x[k] == a[k])

                                l.value = buildings.map(x => x.opportunity_cost).reduce((a, b) => a + b, 0)
                                l.building_city = true
                            }

                            r._.push(l)
                        }
                    }
                    return r[a[k]]
                }, temp)._.push(a)
            })

            nodes.children = grouped

            this.loaded = true

            setTimeout(() => { collapsibleTree('#cost-tree', nodes) }, 100)
        },
        timeStartChange(time) {
            this.dataFilters.start_hour = hour
            this.timeFilter.start = time
            if (this.axiosSrc) this.axiosSrc.cancel('Start time updated')
            this.renderTree(true)
        },
        timeEndChange(time) {
            this.dataFilters.stop_hour = hour
            this.timeFilter.end = time
            if (this.axiosSrc) this.axiosSrc.cancel('End time updated')
            this.renderTree(true)
        },
        filterMinute(minute) {
            var min = this.minuteFilters.find(m => m.value == minute);

            this.showMinuteFilter = false;
            this.minuteFilterLbl = min.label;
        }
    },
    created() {
        // console.log('created', this.rangeFilter)
        let now = new Date(),
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23)

        this.dataFilters.start_date = start.toISOString()
        this.dataFilters.stop_date = end.toISOString()

        if (this.rangeFilter == null) this.setRange('today')

        if (this.company && this.company.ref_id) this.dataFilters.node_id = this.company.ref_id
    },
    mounted() {
        this.renderTree()
    }
}
</script>