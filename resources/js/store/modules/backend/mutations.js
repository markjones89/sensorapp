import { backendState } from '@/store/vars'

const resetState = (state) => {
    let initial = backendState()

    Object.keys(initial).forEach(key => {
        state[key] = initial[key]
    })
}

const setAPIUrl = (state, url) => {
    state.url = url
}

const setAuthToken = (state, token) => {
    state.authToken = token
}

export default {
    resetState,
    setAPIUrl,
    setAuthToken
}