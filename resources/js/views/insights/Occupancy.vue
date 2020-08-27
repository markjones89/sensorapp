<template>
    <div class="content" v-if="loaded && building">
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
                    {{ bldgFilter ? bldgFilter : 'Select Building' }}
                    <span class="caret">
                        <caret-icon />
                    </span>
                    <filter-dropdown :filters="buildingFilters" :show="showFilter" @onSelect="filterSelect" />
                </span>
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
                <span class="chart-title">{{ building.name }} Occupancy</span>
            </div>
            <div class="row">
                <div class="col svg-wrapper">
                    <building-svg :floors="floors" />
                </div>
                <div class="col info-wrapper">
                    <table>
                        <thead>
                            <tr class="info-header">
                                <th width="100"></th>
                                <th width="80">Live</th>
                                <th width="80">Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="floor-info" v-for="f in floorsReverse" :key="f.hid">
                                <td>{{ `${f.ordinal_no} Floor` }}</td>
                                <td><span class="occ-badge" :class="getLiveColor(f.occupancy_live, f.occupancy_limit)">{{ f.occupancy_live }}</span></td>
                                <td><span class="occ-badge orange">{{ f.occupancy_limit }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$green: #3DCFA3;
$yellow: #F0A718;
$orange: #FF5A09;
.svg-wrapper {
    text-align: right;
    
    .building-svg {
        padding: 0 36px;
    }
}
.info-wrapper {
    padding: 150px 36px 0;

    table {
        border-collapse: collapse;
    }

    .info-header {
        th {
            font-weight: normal;
        }
    }

    .floor-info {
        line-height: 26px;
        border-bottom: 1px solid rgba(255,255,225,.1);

        &:last-child {
            border-bottom: none;
        }

        td {
            padding: 10px 0;

            &:first-child {
                text-align: left;
            }
        }

        .occ-badge {
            display: inline-block;
            padding: 0 16px;
            border-radius: 4px;

            &.green { background-color: $green; }
            &.yellow { background-color: $yellow; }
            &.orange { background-color: $orange; }
        }
    }
}
</style>
<script>
import { store } from '../../store'
import { BuildingSvg, FilterDropdown } from '../../components'
import { CaretIcon, CaretLeftIcon } from '../../components/icons'
import { collapsibleTree } from '../../components/graphs/CollapsibleTree'
const api = {
    building: '/api/locations',
    floor: '/api/floors'
}

async function getBuildings(company, callback) {
    let { data } = await axios.get(api.building, { params: { cid: company, lob: true } })

    callback(data)
}

export default {
    props: ['bldg_id'],
    components: { BuildingSvg, CaretIcon, CaretLeftIcon, FilterDropdown },
    beforeRouteEnter (to, from, next) {
        let //user = store.getUser(),
            company = store.getUserCompany()

        getBuildings(company.hid, (res) => {
            next(vm => vm.setBuildings(res))
        })
    },
    data() {
        return {
            buildings: [], building: null, bldgFilter: null, loaded: false, showPageOpts: false, showEmbed: false, showFilter: false,
            floors: [], floorsReverse: []
        }
    },
    computed: {
        buildingFilters() {
            return this.buildings.map(b => { return { value: b.hid, label: b.name } })
        }
    },
    methods: {
        backTo() { this.$router.back() },
        setBuildings(data) {
            this.buildings = data

            if (this.bldg_id) {
                this.building = data.find(b => b.hid === this.bldg_id)
            } else {
                this.building = data[0]
            }
            this.bldgFilter = this.building.name
            this.getFloors(this.building.hid, () => {
                this.loaded = true
            })
        },
        async getFloors(id, cb) {
            let { data } = await axios.get(api.floor, { params: { bid: id } })

            data.forEach(d => {
                d.occupancy_live = Math.floor((Math.random() * d.occupancy_limit) + 1);
            })
            
            this.floors = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return 1
                if (a.floor_no < b.floor_no) return -1
                return 0
            })
            this.floorsReverse = data.sort((a, b) => {
                if (a.floor_no > b.floor_no) return -1
                if (a.floor_no < b.floor_no) return 1
                return 0
            })
            return cb && cb()
        },
        getLiveColor(live, limit){
            let percent = (live / limit) * 100

            return {
                green: percent < 50,
                yellow: percent >= 50,
                orange: percent >= 90
            }
        },
        filterSelect(value) {
            this.showFilter = false
            this.building = this.buildings.find(b => b.hid === value)
            this.bldgFilter = this.building.name
            this.getFloors(this.building.hid)
        },
        toggleEmbed(show) {
            if (show) this.showPageOpts = false
            this.showEmbed = show
        }
    },
    mounted() {
        // this.loaded = true
    }
}
</script>