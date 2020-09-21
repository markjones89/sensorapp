require('./bootstrap')

window.Vue = require('vue')

// mixins
import title from './mixins/pageTitle'
Vue.mixin(title)

// plugins
import mdtoast from './plugins/mdtoast'
import duDialog from './plugins/duDialog'

Vue.use(mdtoast)
Vue.use(duDialog)

import App from './views/App.vue'

const app = new Vue({
    // el: '#app',
    render: h => h(App)
}).$mount('#app')