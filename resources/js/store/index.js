import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const vuexCookie = new VuexPersistence({
    // storage: window.localStorage
    restoreState: (key, storage) => Cookies.getJSON(key),
    saveState: (key, state, storage) => 
        Cookies.set(key, state, {
            expires: 3,
            sameSite: 'strict'
        }),
    modules: ['user']
})

const vuexSession = new VuexPersistence({
    storage: window.sessionStorage,
    modules: ['backend', 'homepage', 'locations', 'peakchart']
})

export const store = new Vuex.Store({
    // mutations: {},
    actions,
    // getters: {},
    // modules: {}
    modules,
    plugins: [vuexCookie.plugin, vuexSession.plugin]
})