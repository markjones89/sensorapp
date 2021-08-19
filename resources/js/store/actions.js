const doLogin = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        // app login
        axios.post('/authenticate', { email: payload.email, password: payload.password })
            .then(res => {
                let data = res.data

                if (data.r) {
                    // set user
                    commit('setUser', data.user)
                    // set customer ID
                    commit('locations/setClient', data.user.company_id)
                }
                resolve(res)
            })
            .catch(reject)
    })
}

const doBackendAuth = async ({ state, commit }, payload) => {
    // set backend api url
    if (payload.apiUrl) commit('backend/setAPI', payload.apiUrl)

    // backend login
    let { data } = await axios.post(`${state.backend.url}/login`, { username: 'admin', password: 'ydqpZT(]23umu#=y' })

    // set auth token
    if (data.token) commit('backend/setAuthToken', data.token)
}

const clearStore = ({ commit }) => {
    commit('setUser', null)
    commit('setClients', [])

    commit('locations/setClient', null)
    commit('locations/setBuildings', [])
    commit('locations/setBuilding', null)
    commit('locations/setFloor', null)

    commit('homepage/setSummary', null)
    commit('homepage/setRange', { type: null, start: null, end: null })
    commit('homepage/setLocation', null)
    commit('homepage/setTime', { start: null, end: null })

    console.log('clearStore:cleared!')
}

export default {
    doLogin,
    doBackendAuth,
    clearStore
}