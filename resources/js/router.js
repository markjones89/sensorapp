import Vue from 'vue'
import VueRouter from 'vue-router'

import { getBaseUrl } from './helpers'
import spaHome from './views/Index.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    base: getBaseUrl(),
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: spaHome, alias: '/home' },
        {
            path: '/cost-analysis', name: 'cost-analysis',
            component: () => import(/* webpackChunkName: "js/views/insights/cost-analysis" */ './views/insights/CostAnalysis.vue')
        },
        {
            path: '/time', name: 'time',
            component: () => import(/* webpackChunkName: "js/views/insights/time-graph" */ './views/insights/TimeGraph.vue')
        },
        {
            path: '/peak', name: 'peak',
            component: () => import(/* webpackChunkName: "js/views/insights/peak-graph" */ './views/insights/PeakAvg.vue')
        },
        {
            path: '/live', name: 'live',
            component: () => import(/* webpackChunkName: "js/views/insights/live-view" */ './views/insights/HeatMap.vue')
        },
        {
            path: '/heat-map', name: 'heat-map',
            component: () => import(/* webpackChunkName: "js/views/insights/heat-map" */ './views/insights/LiveView.vue')
        },
        {
            path: '/profile', name: 'profile',
            component: () => import(/* webpackChunkName: "js/views/profile" */ './views/Profile.vue')
        },
        {
            path: '/clients', name: 'clients',
            component: () => import(/* webpackChunkName: "js/views/config/clients" */ './views/config/Clients.vue')
        },
        {
            path: '/locations', name: 'locations',
            component: () => import(/* webpackChunkName: "js/views/config/locations" */ './views/config/Locations.vue')
        },
        {
            path: '/locations/:bid/floors', name: 'floors', 
            props: (route) => ({ bldg_id: route.params.bid, bldg_name: route.params.bldg_name }),
            component: () => import(/* webpackChunkName: "js/views/config/floors" */ './views/config/Floors.vue')
        },
        {
            path: '/locations/:bid/mapper', name: 'mapper', 
            props: (route) => ({ bldg_id: route.params.bid, bldg_name: route.params.bldg_name, floor_id: route.query.fid }),
            component: () => import(/* webpackChunkName: "js/views/config/mapper" */ './views/config/FloorMapping.vue')
        },
        {
            path: '/work-settings', name: 'work-settings',
            component: () => import(/* webpackChunkName: "js/views/config/work-settings" */ './views/config/WorkSettings.vue')
        },
        {
            path: '/users', name: 'users',
            component: () => import(/* webpackChunkName: "js/views/config/users" */ './views/config/Users.vue')
        },
        {
            path: '/sync-places', name: 'sync-places',
            component: () => import(/* webpackChunkName: "js/views/config/sync-places" */ './views/config/Places.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router