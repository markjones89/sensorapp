import { initialState } from '@/store/vars'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    // storage: window.localStorage
    restoreState: (key, storage) => Cookies.getJSON(key),
    saveState: (key, state, storage) => Cookies.set(key, state, { expires: 3, sameSite: 'strict' })
})

export const store = new Vuex.Store({
    state: initialState,
    // mutations: {},
    mutations,
    // actions: {},
    actions,
    // getters: {},
    getters,
    // modules: {}
    modules,
    plugins: [vuexLocal.plugin]
})