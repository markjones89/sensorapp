import { peakChartState } from '@/store/vars'

const resetState = (state) => {
    let initial = peakChartState()

    Object.keys(initial).forEach(key => {
        state[key] = initial[key]
    })
}

const setSummary = (state, summary) => {
    state.summary = summary
}

export default {
    resetState,
    setSummary
}