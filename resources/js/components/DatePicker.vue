<template>
    <input type="text" ref="datepicker" v-model="value" :data-theme="theme">
</template>
<style lang="scss">
[data-hidden="true"] { display: none !important; }
</style>
<script>
import '../lib/datepicker/duDatepicker.min.css'
import duDatepicker from '../lib/datepicker/duDatepicker.min.js'
export default {
    props: ['value', 'showPicker', 'visible', 'range', 'theme', 'minDate', 'maxDate'],
    watch: {
        showPicker: function(show) {
            duDatepicker(this.$refs.datepicker, show ? 'show' : 'hide')
        }
    },
    mounted() {
        let _ = this

        if (!_.visible) _.$refs.datepicker.setAttribute('data-hidden', true)

        duDatepicker(_.$refs.datepicker, {
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
        duDatepicker(this.$refs.datepicker, 'destroy')
    }
}
</script>