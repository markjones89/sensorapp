<template>
    <div class="content">
        <h1>Profile</h1>
    </div>
</template>
<script>
import { store } from '../store'
export default {
    title: 'Profile',
    data() {
        return {
            user: null
        }
    },
    methods: {
    },
    mounted() {
        this.user = store.getUser()
    }
}
</script>