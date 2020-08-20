require('./bootstrap')

window.Vue = require('vue')

// mixins
import title from './mixins/pageTitle'
Vue.mixin(title)

import App from './views/App.vue'

const app = new Vue({
    el: '#app',
    render: h => h(App)
})