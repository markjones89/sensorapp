<template>
    <div class="loader-block" v-if="show">
        <ripple-loader v-if="type === 'ripple'" />
        <spin-loader v-else-if="type === 'spinner'" />
        <span v-else>Loading...</span>
    </div>
</template>
<style lang="scss">
.loader-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .loader-svg {
        pointer-events: none;
        user-select: none;

        svg {
            display: block;
        }
    }
}
</style>
<script>
import { RippleLoader, SpinLoader } from './loader'
export default {
    props: ['type', 'show'],
    components: { RippleLoader, SpinLoader }
}
</script>