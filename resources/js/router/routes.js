import spaHome from '../views/Index.vue'

export default [
    { path: '/', name: 'home', alias: '/home', component: spaHome, meta: { needsAuth: true } },
    {
        path: '/login', name: 'login',
        component: () => import(/* webpackChunkName: "js/views/login" */ '../views/Login.vue')
    },
    {
        path: '/verify', name: 'verify',
        component: () => import(/* webpackChunkName: "js/views/verify" */ '../views/Verify.vue')
    },
    {
        path: '/reset/:uid?', name: 'reset',
        props: (route) => ({ uid: route.params.uid }),
        component: () => import(/* webpackChunkName: "js/views/reset" */ '../views/Reset.vue')
    },
    {
        path: '/cost-analysis', name: 'cost-analysis', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/cost-analysis" */ '../views/insights/CostAnalysis.vue')
    },
    {
        path: '/time', name: 'time', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/time-graph" */ '../views/insights/TimeGraph.vue')
    },
    {
        path: '/peak', name: 'peak', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/peak-graph" */ '../views/insights/PeakAvg.vue')
    },
    {
        path: '/bar-chart', name: 'bar-chart', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/bar-chart" */ '../views/insights/VerticalBar.vue')
    },
    {
        path: '/user-peak', name: 'user-peak', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/user-peak" */ '../views/insights/UserPeak.vue')
    },
    {
        path: '/occupancy', name: 'occupancy', meta: { needsAuth: true },
        props: (route) => ({ bldg_id: route.query.bid }),
        component: () => import(/* webpackChunkName: "js/views/insights/occupancy" */ '../views/insights/Occupancy.vue')
    },
    {
        path: '/wfh', name: 'wfh', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/wfh" */ '../views/insights/WorkFromHome.vue')
    },
    {
        path: '/compare', name: 'compare-room', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/insights/compare-room" */ '../views/insights/CompareRoom.vue')
    },
    {
        path: '/live', name: 'live', meta: { needsAuth: true },
        props: (route) => ({ bldg_id: route.query.bid, floor_id: route.query.fid }),
        component: () => import(/* webpackChunkName: "js/views/insights/live-view" */ '../views/insights/LiveView.vue')
    },
    {
        path: '/heat-map', name: 'heat-map', meta: { needsAuth: true },
        props: (route) => ({ bldg_id: route.query.bid, floor_id: route.query.fid }),
        component: () => import(/* webpackChunkName: "js/views/insights/heat-map" */ '../views/insights/HeatMap.vue')
    },
    {
        path: '/comfort-map', name: 'comfort-map', meta: { needsAuth: true },
        props: (route) => ({ bldg_id: route.query.bid, floor_id: route.query.fid }),
        component: () => import(/* webpackChunkName: "js/views/insights/comfort-map" */ '../views/insights/ComfortMap.vue')
    },
    {
        path: '/profile', name: 'profile', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/profile" */ '../views/Profile.vue')
    },
    {
        path: '/clients', name: 'clients', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/config/clients" */ '../views/config/Clients.vue')
    },
    {
        path: '/locations', name: 'locations', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/config/locations" */ '../views/config/Locations.vue')
    },
    {
        path: '/locations/:bid/setup', name: 'building_setup', meta: { needsAuth: true }, 
        props: (route) => ({ bldg_id: route.params.bid, bldg_name: route.params.bldg_name }),
        component: () => import(/* webpackChunkName: "js/views/config/buildingSetup" */ '../views/config/BuildingSetup.vue')
    },
    {
        path: '/locations/:bid/mapper', name: 'mapper', meta: { needsAuth: true }, 
        props: (route) => ({ bldg_id: route.params.bid, bldg_name: route.params.bldg_name, floor_id: route.query.fid }),
        component: () => import(/* webpackChunkName: "js/views/config/mapper" */ '../views/config/FloorMapping.vue')
    },
    {
        path: '/work-settings', name: 'work-settings', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/config/work-settings" */ '../views/config/WorkSettings.vue')
    },
    {
        path: '/cost-settings', name: 'cost-settings', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/config/fees" */ '../views/config/CostSettings.vue')
    },
    {
        path: '/users', name: 'users', meta: { needsAuth: true },
        component: () => import(/* webpackChunkName: "js/views/config/users" */ '../views/config/Users.vue')
    },
    /* widgets */
    {
        path: '/widgets/timechart', name: 'timechart-widget', meta: { widget: true },
        component: () => import(/* webpackChunkName: "js/views/widgets/timechart" */ '../views/widgets/TimeChart.vue')
    }
]