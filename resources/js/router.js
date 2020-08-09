import Vue from 'vue'
import VueRouter from 'vue-router'

// import { store } from './store' 
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
            component: () => import(/* webpackChunkName: "js/insights/cost-analysis" */ './views/insights/CostAnalysis.vue')
        },
        {
            path: '/time', name: 'time',
            component: () => import(/* webpackChunkName: "js/insights/time-graph" */ './views/insights/TimeGraph.vue')
        },
        {
            path: '/live', name: 'live',
            component: () => import(/* webpackChunkName: "js/insights/live-view" */ './views/insights/HeatMap.vue')
        },
        {
            path: '/heat-map', name: 'heat-map',
            component: () => import(/* webpackChunkName: "js/insights/heat-map" */ './views/insights/LiveView.vue')
        },
        {
            path: '/profile', name: 'profile',
            component: () => import(/* webpackChunkName: "js/profile" */ './views/Profile.vue')
        },
        {
            path: '/clients', name: 'clients',
            component: () => import(/* webpackChunkName: "js/config/clients" */ './views/config/Clients.vue')
        },
        {
            path: '/locations', name: 'locations',
            component: () => import(/* webpackChunkName: "js/config/locations" */ './views/config/Locations.vue')
        },
        {
            path: '/locations/:bid/floors', name: 'floors', 
            props: (route) => ({ bldg_id: route.params.bid, bldg_name: route.params.bldg_name }),
            component: () => import(/* webpackChunkName: "js/config/floors" */ './views/config/Floors.vue')
        },
        {
            path: '/locations/:bid/sensors', name: 'sensors', 
            props: (route) => ({ bldg_id: route.params.bid, bldg_name: route.params.bldg_name, floor_id: route.query.fid }),
            component: () => import(/* webpackChunkName: "js/config/sensors" */ './views/config/SensorMapping.vue')
        },
        {
            path: '/work-settings', name: 'work-settings',
            component: () => import(/* webpackChunkName: "js/config/work-settings" */ './views/config/WorkSettings.vue')
        },
        {
            path: '/users', name: 'users',
            component: () => import(/* webpackChunkName: "js/config/users" */ './views/config/Users.vue')
        }
    ]
})

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router