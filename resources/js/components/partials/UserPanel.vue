<template>
    <div class="user-panel">
        <div class="profile-panel">
            <img class="user-pic" :src="userPhoto" width="40">
            <span class="user-name">{{ user.name }}</span>
            <span class="user-menus-caret" @click="showUserMenu = !showUserMenu">
                <span class="caret">
                    <caret-icon />
                </span>
            </span>
            <div class="user-menus-panel" :class="{ shown: showUserMenu }">
                <ul>
                    <li class="user-menu">
                        <router-link :to="{ name: 'profile', params: { id: user.hid } }">
                            <span class="opt-icon"><img :src="`${baseUrl}/images/icons/profile.svg`"></span>Profile
                        </router-link>
                    </li>
                    <li class="user-menu" v-for="m in user.menus" :key="m.name">
                        <router-link :to="{ name: m.name }">
                            <span class="opt-icon"><img :src="`${baseUrl}/images/icons/${m.icon}`"></span>{{ m.label }}
                        </router-link>
                    </li>
                    <li class="divider"></li>
                    <li class="user-menu">
                        <a :href="`${baseUrl}/logout`" @click.prevent="logout">
                            <span class="opt-icon"><img :src="`${baseUrl}/images/icons/logout.svg`"></span>Logout</a>
                        </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { addEvent, getBaseUrl, removeEvent } from '../../helpers'
import { CaretIcon } from '../icons'

export default {
    components: { CaretIcon },
    data: () => ({
        showUserMenu: false
    }),
    computed: {
        ...mapState({
            user: state => state.user
        }),
        baseUrl() { return getBaseUrl() },
        userPhoto() {
            return this.user && this.user.photo ?
                `${this.baseUrl}/storage/user-photos/thumbnail/${this.user.photo}`:
                `${this.baseUrl}/images/user0001.jpg`
        }
    },
    methods: {
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
        logout() {
            axios.get('/logout').then(() => {
                this.$router.push({ name: 'login' }, () => {
                    this.$store.commit('setUser', null)
                })
            })
        }
    },
    mounted() {
        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.userOptsHandler)
    },
    destroyed() {
        this.$store.commit('setUser', null)
        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.userOptsHandler)
    }
}
</script>