import { locationsState } from '@/store/vars'
import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: locationsState,
    mutations,
    getters
}