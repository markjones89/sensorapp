<template>
    <input type="text" ref="datepicker" v-model="value" :data-theme="theme">
</template>
<style lang="scss">
[data-hidden="true"] { display: none !important; }
</style>
<script>
import '../lib/datepicker/duDatepickerJs.min.css'
import duDatepickerJs from '../lib/datepicker/duDatepickerJs.min.js'
export default {
    props: ['value', 'showPicker', 'visible', 'range', 'theme', 'minDate', 'maxDate'],
    watch: {
        showPicker: function(show) {
            duDatepickerJs(this.$refs.datepicker, show ? 'show' : 'hide')
        }
    },
    mounted() {
        let _ = this

        if (!_.visible) _.$refs.datepicker.setAttribute('data-hidden', true)

        duDatepickerJs(_.$refs.datepicker, {
            range: _.range, minDate: _.minDate, maxDate: _.maxDate,
            events: {
                dateChanged: function(data) {
                    _.$emit('dateSelect', data)
                },
                hidden: function() {
                    _.$emit('hidden')
                }
            }
        })
    },
    destroyed() {
        duDatepickerJs(this.$refs.datepicker, 'destroy')
    }
}
</script>