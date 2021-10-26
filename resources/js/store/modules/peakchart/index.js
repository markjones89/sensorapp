import { peakChartState } from '@/store/vars'
import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: peakChartState,
    mutations,
    getters
}