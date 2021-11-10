const doLogin = ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
        // app login
        axios.post('/authenticate', { email: payload.email, password: payload.password })
            .then(res => {
                let data = res.data
                let user = data.user

                if (data.r) {
                    // set api info
                    commit('setAPIInfo', user.apiInfo)

                    dispatch('doBackendAuth')
                        .finally(() => {
                            // set theme
                            commit('setTheme', user.app_theme)
                            // set customer ID
                            commit('locations/setClient', user.company_id)
                            // set user
                            commit('setUser', user)

                            resolve(res)
                        })
                }
                else resolve(res)
            })
            .catch(reject)
    })
}

const doBackendAuth = async ({ state, commit }) => {
    // // set backend api url
    // if (payload.apiUrl) commit('backend/setAPIUrl', payload.apiUrl)

    // backend login
    let { data } = await axios.post(`${state.backend.url}/login`, { username: state.api_user, password: state.api_pass })

    // set auth token
    if (data.token) commit('backend/setAuthToken', data.token)
}

const clearStore = ({ commit }) => {
    commit('resetState')
    // commit('backend/resetState')
    commit('backend/setAuthToken', null)
    commit('homepage/resetState')
    commit('locations/resetState')
    commit('peakchart/resetState')
}

export default {
    doLogin,
    doBackendAuth,
    clearStore
}