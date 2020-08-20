<template>
    <div id="_widget" class="widget-wrapper">
        <router-view></router-view>
    </div>
</template>
<script>
import router from "../widget-router"
export default {
    router,
}
</script>