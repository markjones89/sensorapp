require('./bootstrap');

window.Vue = require('vue');

import Login from './views/Login.vue';

// plugins
import mdtoast from './plugins/mdtoast'

Vue.use(mdtoast)

const app = new Vue({
    // el: '#app',
    components: {
        Login
    },
    render: h => h(Login)
}).$mount('#app');