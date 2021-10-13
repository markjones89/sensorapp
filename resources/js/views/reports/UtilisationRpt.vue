<template>
    <div class="report">
        <div class="report-header">
            <div class="report-name">{{ `${monthName} ${year}` }} Intuitive Report</div>
            <div class="report-options"></div>
        </div>
        <div class="report-content">
            <div class="rpt-loading" v-if="!dataLoaded">
                <ripple-loader />
                <span>Loading...</span>
            </div>
            <div class="rpt-error" v-else-if="dataLoaded && dataError">
                <p>An error occured while getting the report data, please try again.</p>
                <a href="javascript:;" @click="retry">Try again</a>
            </div>
            <div class="rpt-container" v-else-if="dataLoaded" style="width: 1100px">
                <div class="rpt-cover">
                    <div class="cover-logo">
                        <img :src="`${baseUrl}/storage/logos/${company.logo}`">
                    </div>
                    <div class="cover-box">
                        <h1>{{ building.name }}</h1>
                        <h2>Utilisation Report Data</h2>
                        <h3>Analytics service</h3>
                        <span>{{ monthName }} {{ year }}</span>
                    </div>
                </div>
                <monthly-workstation-util
                    :overall="true"
                    :floor="floorNumbers"
                    :time="timeRange"
                    :query="rptApiParams('Building', bid)" />
                <monthly-workstation-util v-for="f in floors" :key="`WS:${f.id}`"
                    :floor="ordinalFloor(f.number)"
                    :time="timeRange"
                    :query="rptApiParams('Floor', f.id)" />
                <monthly-meeting-room-util 
                    :overall="true"
                    :floor="floorNumbers"
                    :time="timeRange"
                    :query="rptApiParams('Building', bid)" />
                <monthly-meeting-room-util v-for="f in floors" :key="`MR:${f.id}`"
                    :floor="ordinalFloor(f.number)"
                    :time="timeRange"
                    :query="rptApiParams('Floor', f.id)" />
                <hourly-meeting-room-util 
                    :overall="true"
                    :floor="floorNumbers"
                    :time="timeRange"
                    :query="rptApiParams('Building', bid)" />
                <tabular-stats
                    title="MEETING ROOM SIZES RELATIVE TO SIZE OF MEETINGS OBSERVED"
                    :api="api_room_vs_meeting_size_rpt"
                    :query="rptApiParams('Building', bid)"
                    :footer="roomSizeVSMeetingSizeFooter"
                    colKey="meeting_size"
                    rowKey="room_size"
                    valKey="percentage"
                    @dataLoaded="roomMeetingSizeLoaded" />
                <m-r-supply-vs-meeting-size :query="rptApiParams('Building', bid)"/>
                <meeting-room-performance v-for="f in floors" :key="`MRPerf:${f.id}`"
                    :floor="`Level ${f.number}`"
                    :query="rptApiParams('Floor', f.id)" />
                <m-r-util-v-s-total-hours :query="rptApiParams('Building', bid)"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
    MonthlyWorkstationUtil,
    MonthlyMeetingRoomUtil,
    HourlyMeetingRoomUtil,
    TabularStats,
    MRUtilVSTotalHours,
    MRSupplyVsMeetingSize,
    MeetingRoomPerformance
} from '@/components/partials'
import { RippleLoader } from '@/components/loader'
import { toOrdinal, hourStr, getMonthRange, getMonthName, getBaseUrl, roundNum } from '@/helpers'
import VueApexCharts from 'vue-apexcharts'
export default {
    title: 'Intuitive Report',
    components: {
        RippleLoader,
        apexchart: VueApexCharts,
        MonthlyWorkstationUtil,
        MonthlyMeetingRoomUtil,
        HourlyMeetingRoomUtil,
        TabularStats,
        MRUtilVSTotalHours,
        MRSupplyVsMeetingSize,
        MeetingRoomPerformance
    },
    props: {
        trigger: { type: Number, default: 6 },
        cid: { type: String, required: true },
        bid: { type: String, required: true },
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        start_hour: { type: Number, required: true },
        stop_hour: { type: Number, required: true }
    },
    data: () => ({
        checkAuthInterval: null,
        dataLoaded: false, dataError: false,
        company: null,
        building: null,
        floorWorkUtils: [],
        roomSizeVSMeetingSizeFooter: 'Footer here...'
    }),
    computed: {
        ...mapState({
            authToken: state => state.backend.authToken
        }),
        ...mapGetters({
            api_header: 'backend/api_header',
            api_customers: 'backend/api_customers',
            api_building_overview: 'backend/api_building_overview',
            api_workspace_utils_daily_rpt: 'backend/api_workspace_utils_daily_rpt',
            api_room_vs_meeting_size_rpt: 'backend/api_room_vs_meeting_size_rpt'
        }),
        baseUrl() { return getBaseUrl() },
        floors() {
            let floors = [...this.building.children]

            return floors.sort((a, b) => {
                let aFloor = parseInt(a.number),
                    bFloor = parseInt(b.number)

                return aFloor > bFloor ? 1 : aFloor < bFloor ? -1 : 0
            })
        },
        floorNumbers() { return `${this.floors.map(f => toOrdinal(f.number)).join(', ')} Floors` },
        timeRange() { return `${hourStr(this.start_hour)} to ${hourStr(this.stop_hour)}` },
        monthName() { return getMonthName(this.month) }
    },
    methods: {
        async getBuildingOverview() {
            try {
                // let { data } = await axios.get(this.api_building_overview(this.cid, this.bid), this.api_header())
                let res = await axios.all([
                    axios.get(this.api_customers, this.api_header()),
                    axios.get('/api/clients', { params: { rid: this.cid } }),
                    axios.get(this.api_building_overview(this.cid, this.bid), this.api_header())
                ])
                let clients = res[0].data
                let cref = res[1].data
                let client = clients.find(x => x.id == this.cid)

                if (client && cref) {
                    client.hid = cref.hid
                    client.logo = cref.logo
                }

                this.company = client
                this.building = res[2].data //data
                this.dataLoaded = true
                this.dataError = false
            } catch (error) {
                this.dataLoaded = true
                this.dataError = true
                console.log('getBuildingOverview.error', error)
            }
        },
        retry() {
            this.dataLoaded = false
            this.getBuildingOverview()
        },
        rptApiParams(type, id) {
            let range = getMonthRange(this.year, this.month)

            return {
                trigger: this.trigger,
                start_hour: this.start_hour,
                stop_hour: this.stop_hour,
                start_date: range.start,
                stop_date: range.end,
                node_id: id,
                node_type: type
            }
        },
        ordinalFloor(floor) { return `${toOrdinal(floor)} Floor` },
        roomMeetingSizeLoaded(data) {
            let oneTwoSum = roundNum(data
                .filter(x => { return x.room_size == 'Overall Meeting Sizes' && ['1 PAX Meeting Sizes', '2 PAX Meeting Sizes'].indexOf(x.meeting_size) >= 0 })
                .map(x => x.percentage).reduce((a, b) => a + b), 1)

            this.roomSizeVSMeetingSizeFooter = `1 and 2 person meetings make up ${oneTwoSum}% of all meeting sizes`
        }
    },
    mounted() {
        if (this.authToken == null) {
            this.checkAuthInterval = setInterval(() => {
                if (this.authToken) {
                    this.getBuildingOverview()
                    clearInterval(this.checkAuthInterval)
                }
            }, 500)
        }
        else {
            this.getBuildingOverview()
        }
    }
}
</script>

<style lang="scss">
.apexcharts-canvas svg { pointer-events: initial; }

.section-header {
    margin: 0;
    padding: 4px;
    font-weight: 500;
    border-bottom: 1px solid black;
}

.graph-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    color: grey;
    pointer-events: none;
    height: 350px;
}

.graph-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    color: grey;
    height: 350px;
}

.insight-card {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    margin-top: 16px;
    padding: 8px;
    background-color: black;

    &.red {
        background-color: red;
    }

    .insight-title {
        font-size: .8em;
    }

    .insight-percent {
        font-size: 1.6em;
        font-weight: 500;
        padding: 4px 0;
    }

    .insight-seats,
    .insight-rooms {
        font-size: 1.2em;
        font-weight: 500;
    }
}

.insight-keys {
    margin-top: 16px;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        position: relative;
        font-size: .7em;
        padding: 4px 4px 4px 24px;

        &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            width: 16px;
            height: 12px;
            background-color: black;
            border-radius: 4px;
            transform: translateY(-50%);
        }

        &.red::before {
            background-color: red;
        }
    }
}

.workstation-util + .meeting-room-util,
.meeting-room-util + .hourly-meeting-room-util {
    margin-top: 48px;
}
</style>

<style lang="scss" scoped>
.rpt-container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 8px;
}

@media print {
    @page {
        size: A4 landscape;

        h2 {
            page-break-before: always;
        }

        h2, h3, h4 {
            page-break-after: avoid;
        }
    }

    .report-header {
        display: none;
    }
}
</style>