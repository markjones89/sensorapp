<template>
    <div class="tabular-stats">
        <h2>{{ title }}</h2>
        <div class="graph-loading" v-if="!dataLoaded">
            <ripple-loader />
        </div>
        <div class="graph-error" v-if="dataLoaded && dataError">
            <p>An error occured while getting the graph data, please try again.</p>
            <a href="javascript:;" @click="retry">Try again</a>
        </div>
        <table v-else-if="dataLoaded" border="0">
            <thead>
                <tr>
                    <td class="red"></td>
                    <td class="red" v-for="h in stats.headers" :key="h">{{ h }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in stats.rows" :key="r.name">
                    <td class="red">{{ r.name }}</td>
                    <td v-for="d in r.data" :key="d.key"
                        :class="{ red: d.value != null }">
                        {{ d.value }}
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-if="footer" class="table-footer">{{ footer }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { RippleLoader } from '@/components/loader'
import { roundNum } from '@/helpers'
export default {
    name: 'TabularStats',
    props: {
        title: { type: String, required: true },
        footer: { type: String },
        api: { type: String, required: true },
        query: { type: Object, required: true },
        colKey: { type: String, required: true },
        rowKey: { type: String, required: true },
        valKey: { type: String, required: true }
    },
    components: {
        RippleLoader
    },
    data: () => ({
        dataLoaded: false, dataError: false,
        stats: null
    }),
    computed: {
        ...mapGetters({
            api_header: 'backend/api_header'
        })
    },
    methods: {
        async getData() {
            try {
                let { data } = await axios.post(this.api, this.query, this.api_header())

                this.$emit('dataLoaded', data)
                
                let colHeaders = [...new Set(data.map(x => { return x[this.colKey] }))]
                let rowHeaders = [...new Set(data.map(x => { return x[this.rowKey] }))]
                let rows = []

                rowHeaders.forEach(r => {
                    let rowData =  []
                    colHeaders.forEach(c => {
                        let rd = data.find(x => x[this.colKey] == c && x[this.rowKey] == r)
                        let value = 0

                        if (rd) value = rd[this.valKey]

                        rowData.push({
                            key: `${c}:${r}:${value}`,
                            value: rd ? `${roundNum(value, 1)}%` : null
                        })
                    })

                    rows.push({
                        name: r,
                        data: rowData
                    })
                })
                
                this.stats = {
                    headers: colHeaders,
                    rows: rows
                }
                this.dataLoaded = true
                this.dataError = false
            } catch (error) {
                this.dataLoaded = true
                this.dataError = true
                console.log('getData.error', error)
            }
        },
        retry() {
            this.dataLoaded = false
            this.getData()
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss">
.tabular-stats {
    padding: 24px 8px;
    margin-top: 64px;

    h2 {
        margin-bottom: 8px;
    }

    table {
        width: 90%;
        margin: 32px auto;
        border-collapse: collapse;
        
        th, td {
            font-size: 1.2em;
            padding: 12px 8px;
            text-align: center;
            color: #fff;
            background-color: #000;
            box-shadow: inset 0.1em 0.1em 0.1em 0 rgba(200,200,200,0.5), inset -0.1em -0.1em 0.1em 0 rgba(0,0,0,0.5);
            -webkit-print-color-adjust: exact;

            &.red {
                background-color: rgb(246,29,29);
            }
        }
    }

    .table-footer {
        width: 90%;
        margin: 0 auto;
    }
}
</style>