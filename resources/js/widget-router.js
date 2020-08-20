import Vue from 'vue'
import VueRouter from 'vue-router'

import { getBaseUrl } from './helpers'

import timeChart from './views/widgets/TimeChart.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    base: `${getBaseUrl()}/widgets`,
    mode: 'history',
    routes: [
        {
            path: '/time-chart', name: 'timeChart', component: timeChart
        }
    ]
})

export default router