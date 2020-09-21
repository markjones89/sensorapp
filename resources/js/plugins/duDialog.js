import '../lib/dialog/duDialog.min.css'
import duDialog from '../lib/dialog/duDialog.min.js'


export default {
    install(Vue, options) {
        /**
         * 
         * @param {string} title Dialog title
         * @param {string|Array} message Message string or array (for selection dialog)
         * @param {(duDialog.DEFAULT|duDialog.OK_CANCEL|duDialog.NO_ACTION)} buttons Dialog buttons
         * @param {Object} opts Dialog options
         */
        Vue.prototype.$duDialog = (title, message, buttons, opts) => {
            duDialog(title, message, buttons, opts)
        }

        Object.defineProperties(Vue.prototype.$duDialog, {
            DEFAULT: { value: duDialog.DEFAULT },
            OK_CANCEL: { value: duDialog.OK_CANCEL },
            NO_ACTION: { value: duDialog.NO_ACTION }
        })
    }
}