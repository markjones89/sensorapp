require('./bootstrap')

import Vue from 'vue'

// mixins
import title from './mixins/pageTitle'
Vue.mixin(title)

// plugins
import mdtoast from './plugins/mdtoast'
import duDialog from './plugins/duDialog'

Vue.use(mdtoast)
Vue.use(duDialog)

import App from './views/App.vue'
import { store } from './store'
import router from "./router"

const app = new Vue({
    // el: '#app',
    store,
    router,
    render: h => h(App)
}).$mount('#app')