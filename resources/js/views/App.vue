<template>
    <router-view></router-view>
</template>

<script>
export default {
    mounted() {
        document.body.classList.add('app-loaded')
    }
}
</script>