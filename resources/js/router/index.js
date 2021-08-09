import Vue from 'vue'
import VueRouter from 'vue-router'

import { getBaseUrl } from '../helpers'
import { store } from '../store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    base: getBaseUrl(),
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name) NProgress.start()

    if (to.matched.some(record => record.meta.needsAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.getters['getUser'] == null) {
          next({ path: '/login', query: { to: to.fullPath }})
        } else next()
      } else next()
})

router.afterEach((to, from) => { NProgress.done() })

export default router