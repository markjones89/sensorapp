<template>
    <div class="report">
        <div class="report-header">
            <div class="report-name">{{ `${year} ${reportPeriod.name}` }} Intuitive Report</div>
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
                        <!-- <span>{{ monthName }} {{ year }}</span> -->
                        <span>{{ rptRangeText }}</span>
                    </div>
                </div>
                <monthly-workstation-util
                    :overall="true"
                    :floor="floorNumbers"
                    :time="timeRange"
                    :query="rptApiParams('Building', bid, true)" />
                <monthly-workstation-util v-for="f in floors" :key="`WS:${f.id}`"
                    :floor="ordinalFloor(f.number)"
                    :time="timeRange"
                    :query="rptApiParams('Floor', f.id, true)" />
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
                    colKey="meeting_type"
                    rowKey="room_type"
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
import { toOrdinal, hourStr, getMonthName, getBaseUrl, roundNum, getRoomSize, getMeetingSize, padNum, toISOStart, toISOEnd } from '@/helpers'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
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
        period: { type: Number, required: true },
        year: { type: Number, required: true },
        quarter: { type: Number },
        month: { type: Number },
        week: { type: Number },
        start_hour: { type: Number, required: true },
        stop_hour: { type: Number, required: true },
        limit: { type: Number, required: true }
    },
    data: () => ({
        dataLoaded: false, dataError: false,
        company: null,
        building: null,
        floorWorkUtils: [],
        roomSizeVSMeetingSizeFooter: null
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
        monthName() { return getMonthName(this.month) },
        reportPeriod() {
            let period = { start: null, end: null, moment: null, name: '' }
            let year = this.year

            if (this.period == 1) {
                let _moment = moment().hours(0).minutes(0).seconds(0).milliseconds(0)
                let start = _moment.year(year).isoWeek(this.week).day('monday')
                let end = start.clone().add(6, 'd')

                period.start = start.toDate()
                period.end = end.toDate()
                period.moment = { start, end }
                period.name = 'Weekly'
            }
            else if (this.period == 2) {
                let month = this.month
                let start = moment(new Date(year, month, 1))
                let end = moment(new Date(year, month + 1, 0))

                period.start = start.toDate()
                period.end = end.toDate()
                period.moment = { start, end }
                period.name = 'Monthly'
            }
            else if (this.period == 3) {
                let quarter = this.quarter
                let _moment = moment().hours(0).minutes(0).seconds(0).milliseconds(0)
                let start = _moment.year(year).quarter(quarter).startOf('quarter')
                let end = start.clone().endOf('quarter')

                period.start = start.toDate()
                period.end = end.toDate()
                period.moment = { start, end }
                period.name = 'Quarterly'
            }

            return period
        },
        rptRangeText() {
            let period = this.period
            let range = this.reportPeriod.moment
            let rStart = range.start
            let rEnd = range.end

            if (period == 1) {
                return rStart.isSame(rEnd, 'year') ?
                    `${rStart.format('MMMM D')} - ${rEnd.format('D, YYYY')}` :
                    `${rStart.format('MMMM D, YYYY')} - ${rEnd.format(rStart.isSame(rEnd, 'month') ? 'D, YYYY' : 'MMMM D, YYYY')}`
            }
            else if (period == 2) {
                return rStart.format('MMMM YYYY')
            }
            else if (period == 3) {
                return `${rStart.format('MMMM')} to ${rEnd.format('MMMM YYYY')}`
            }
            
            return ''
        }
    },
    methods: {
        async getCustRef() {
            let { data } = await axios.get('/api/clients', { params: { rid: this.cid } })

            return data
        },
        async getBuildingOverview(cref) {
            try {
                let res = await axios.all([
                    axios.get(this.api_customers, this.api_header()),
                    axios.get(this.api_building_overview(this.cid, this.bid), this.api_header())
                ])
                let clients = res[0].data
                let client = clients.find(x => x.id == this.cid)

                if (client && cref) {
                    client.hid = cref.hid
                    client.logo = cref.logo
                }

                this.company = client
                this.building = res[1].data //data
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
        rptApiParams(type, id, hasLimit = false) {
            // let range = getMonthRange(this.year, this.month)
            let range = this.reportPeriod
            let obj = {
                trigger: this.trigger,
                start_hour: this.start_hour,
                stop_hour: this.stop_hour,
                start_date: toISOStart(range.start),
                stop_date: toISOEnd(range.end),
                node_id: id,
                node_type: type
            }

            if (hasLimit) obj.limit_ratio = this.limit

            return obj
        },
        ordinalFloor(floor) { return `${toOrdinal(floor)} Floor` },
        roomMeetingSizeLoaded(data) {
            data.sort((a, b) => {
                let aRoomSize = a.room_type.indexOf('(') >= 0 ? padNum(getRoomSize(a.room_type), 3) : a.room_type
                let aPAX = padNum(getMeetingSize(a.meeting_type), 3)
                let aSort = `${aRoomSize} | ${aPAX}`
                let bRoomSize = b.room_type.indexOf('(') >= 0 ? padNum(getRoomSize(b.room_type), 3) : b.room_type
                let bPAX = padNum(getMeetingSize(b.meeting_type), 3)
                let bSort = `${bRoomSize} | ${bPAX}`

                return aSort > bSort ? 1 : aSort < bSort ? -1 : 0
            })

            let oneTwoSum = roundNum(data
                .filter(x => { return x.room_type == 'Overall' && ['1 PAX Meeting Sizes', '2 PAX Meeting Sizes'].indexOf(x.meeting_type) >= 0 })
                .map(x => x.percentage).reduce((a, b) => a + b), 1)

            this.roomSizeVSMeetingSizeFooter = `1 and 2 person meetings make up ${oneTwoSum}% of all meeting sizes`
        }
    },
    async mounted() {
        let cref = await this.getCustRef()

        if (this.authToken == null) {
            await this.$parent.doBackendAuth({ user: cref.api_user, pass: cref.api_pass })

            this.getBuildingOverview(cref)
        }
        else this.getBuildingOverview(cref)
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
    -webkit-print-color-adjust: exact;

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
            -webkit-print-color-adjust: exact;
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

        // @top-left { content: none; }
        // @top-center { content: none; }

        // @bottom-left {
        //     content: 'Intuitive Workspaces';
        // }
        // @bottom-center {
        //     content: counter(page);
        // }

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

    .workstation-util,
    .meeting-room-util,
    .hourly-meeting-room-util,
    .tabular-stats,
    .mr-supply-vs-meeting-size,
    .meeting-room-performance,
    .simultaneous-mr-util-vs-hours {
        page-break-before: always;
    }
}
</style>