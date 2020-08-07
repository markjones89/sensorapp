require('./bootstrap')

window.Vue = require('vue')

// import router from "./router"

// mixins
import title from './mixins/pageTitle'
Vue.mixin(title)

import App from './views/App.vue'

const app = new Vue({
    el: '#app',
    // router,
    render: h => h(App)
})