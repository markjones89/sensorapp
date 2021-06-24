<template>
    <div id="_app" class="app-wrapper">
        <div class="app-header" v-if="isAuth">
            <span class="logo" @click="toHome">
                <img :src="`${baseUrl}/storage/logos/${user.company.logo}`" v-if="user.company && user.company.logo">
            </span>
            <user-panel />
        </div>
        <div class="app-content">
            <router-view></router-view>
        </div>
        <footer class="app-footer" v-if="isAuth">
            &copy;{{ new Date().getFullYear() }} All Rights Reserved
            <span id="powered-by">Powered by Intuitive.works</span>
        </footer>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getBaseUrl } from "../helpers"
import UserPanel from '../components/partials/UserPanel'

export default {
    components: { UserPanel },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        baseUrl() { return getBaseUrl() },
        isAuth() { return this.user != null }
    },
    methods: {
        ...mapMutations({
            setClient: 'locations/setClient',
        }),
        userOptsHandler(e) {
            let _ = this

            if (['mousedown', 'touchend'].indexOf(e.type) >= 0) {
                if (!e.target.closest('.user-menus-panel, .user-menus-caret') || e.target.closest('.user-menu')) {
                    _.showUserMenu = false
                }
            } else if (e.type === 'keydown') {
                if (e.keyCode === 27) _.showUserMenu = false
            }
        },
        toHome() { this.$router.push({ name: 'home' }) },
        logout() {
            axios.get('/logout').then(() => {
                this.$router.push({ name: 'login' }, () => {
                    this.$store.dispatch('clearStore')
                })
            })
        }
    },
    async created() {
        // set backend url
        this.$store.commit('backend/setAPI', document.getElementById('sensor_api').value)

        // login to backend api
        let { data } = await axios.post(`${this.$store.state.backend.url}/login`, { username: 'admin', password: 'ydqpZT(]23umu#=y' })

        if (data.token) this.$store.commit('backend/setAuthToken', data.token)

        if (this.user && this.user.company_id) this.setClient(this.user.company_id)
    }
}
</script>