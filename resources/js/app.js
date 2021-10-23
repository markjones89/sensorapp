require('./bootstrap')

import Vue from 'vue'

// mixins
import title from './mixins/pageTitle'
Vue.mixin(title)

// plugins
import mdtoast from '@dmuy/toast/vue-toast'
import duDialog from '@dmuy/dialog/vue-dialog'
import duDatepicker from '@dmuy/datepicker/vue-datepicker'

import App from './views/App.vue'
import { store } from './store'
import router from "./router"

Vue.use(mdtoast)
Vue.use(duDialog)
Vue.use(duDatepicker, { theme: 'dark', auto: true })

const app = new Vue({
    // el: '#app',
    store,
    router,
    render: h => h(App)
}).$mount('#app')