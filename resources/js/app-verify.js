require('./bootstrap');

window.Vue = require('vue');

import Verify from './views/Verify.vue';

const app = new Vue({
    el: '#app',
    components: {
        Verify
    },
    render: h => h(Verify)
});