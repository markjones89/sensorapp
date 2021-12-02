const doLogin = ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
        // app login
        axios.post('/authenticate', { email: payload.email, password: payload.password })
            .then(res => {
                let data = res.data
                let user = data.user

                if (data.r) {
                    // set api info
                    commit('user/setAPIInfo', user.apiInfo)

                    dispatch('doBackendAuth')
                        .finally(() => {
                            // set user
                            commit('user/setUser', user)
                            // set theme
                            commit('user/setTheme', user.app_theme)
                            // set customer ID
                            commit('locations/setClient', user.company_id)

                            resolve(res)
                        })
                }
                else resolve(res)
            })
            .catch(reject)
    })
}

const doBackendAuth = async ({ state, commit }) => {
    // backend login
    let { data } = await axios.post(`${state.backend.url}/login`, { username: state.user.api_user, password: state.user.api_pass })

    // set auth token
    if (data.token) commit('backend/setAuthToken', data.token)
}

const clearStore = ({ commit }) => {
    // commit('backend/resetState')
    commit('user/resetState')
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