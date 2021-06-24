const setAPI = (state, url) => {
    state.url = url
}

const setAuthToken = (state, token) => {
    state.authToken = token
}

export default {
    setAPI,
    setAuthToken
}