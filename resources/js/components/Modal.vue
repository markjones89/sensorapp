<template>
    <transition name="modalIn">
        <aside class="modal" v-if="show">
            <div class="modal-overlay"></div>
            <div class="modal-wrapper">
                <div class="modal-header">
                    <slot name="header" />
                    <span class="modal-close" role="button" @click="close" title="Close">
                        <close-icon height="24" width="24" />
                    </span>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
                <div class="modal-footer">
                    <slot name="footer" />
                </div>
            </div>
        </aside>
    </transition>
</template>
<script>
import { CloseIcon } from "./icons"
export default {
    props: ['show'],
    components: { CloseIcon },
    methods: {
        close() { this.$emit('close') }
    },
    watch: {
        'show': function(value, old) {
            document.body.classList[value ? 'add' : 'remove']('modal--open')
        }
    }
}
</script>