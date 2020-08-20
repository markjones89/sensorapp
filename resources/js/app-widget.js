require('./bootstrap')

window.Vue = require('vue')

// mixins
import title from './mixins/pageTitle'
Vue.mixin(title)

import Widget from './views/AppWidget.vue'

const widget = new Vue({
    el: '#widget',
    render: h => h(Widget)
})