import '../lib/toast/mdtoast.min.css'
import mdtoast from '../lib/toast/mdtoast.min.js'


export default {
    install(Vue, options) {
        /**
         * Shows an alert message
         * @param {string} message Alert message
         * @param {Object} opts Alert options
         */
        Vue.prototype.$mdtoast = (message, opts) => {
            mdtoast(message, opts)
        }
    }
}