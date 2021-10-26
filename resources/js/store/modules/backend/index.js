import { backendState } from '@/store/vars'
import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: backendState,
    mutations,
    getters
}