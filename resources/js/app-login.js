require('./bootstrap');

window.Vue = require('vue');

import Login from './views/Login.vue';

const app = new Vue({
    el: '#app',
    components: {
        Login
    },
    render: h => h(Login)
});