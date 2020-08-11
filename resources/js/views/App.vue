<template>
    <div id="_app" class="app-wrapper" v-if="user">
        <div class="app-header">
            <span class="logo" @click="toHome">
                <img :src="`${baseUrl}/storage/logos/${user.company.logo}`" v-if="user.company && user.company.logo">
            </span>
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
        </div>
        <div class="app-content">
            <router-view></router-view>
        </div>
        <footer class="app-footer">
            &copy;{{ (new Date()).getYear() }} All Rights Reserved
            <span id="powered-by">Powered by Intuitive.works</span>
        </footer>
    </div>
</template>
<script>
window.NProgress = require('nprogress')
import 'nprogress/nprogress.css'

import { addEvent, getBaseUrl, removeEvent } from "../helpers"
import { store } from '../store'
import router from "../router"
import { CaretIcon } from "../components/icons"

export default {
    components: { CaretIcon },
    router,
    data() {
        return {
            sharedState: store.state, showUserMenu: false, user: null
        }
    },
    computed: {
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
        toHome() { router.push({ name: 'home' }) },
        logout() {
            axios.get('/logout').then(() => {
                window.location = `${this.baseUrl}/login`
            })
        }
    },
    created() {
        axios.interceptors.request.use(function (config) {
            NProgress.start()
            return config
        }, function (error) {
            return Promise.reject(error)
        })

        axios.interceptors.response.use(function (response) {
            NProgress.done()
            return response
        }, function (error) {
            return Promise.reject(error)
        })
    },
    mounted() {
        axios.get('/profile/authenticated').then(x => {

            store.setUser(x.data)
            this.user = store.getUser()
        })

        addEvent(document, ['mousedown', 'touchend', 'keydown'], this.userOptsHandler)
    },
    destroyed() {
        store.setUser(null)

        removeEvent(document, ['mousedown', 'touchend', 'keydown'], this.userOptsHandler)
    }
}
</script>