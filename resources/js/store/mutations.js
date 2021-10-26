import { initialState } from '@/store/vars'

const resetState = (state) => {
    let initial = initialState()

    Object.keys(initial).forEach(key => {
        state[key] = initial[key]
    })
}

const setTheme = (state, theme) => {
    state.theme = theme
}

const setUser = (state, user) => {
    state.user = user
}

const setUserPhoto = (state, photo) => {
    if (state.user) state.user.photo = photo
}

const setCompanyLogo = (state, logo) => {
    if (state.user && state.user.company) state.user.company.logo = logo
}

const setClients = (state, clients) => {
    state.clients = [...clients]
}

export default {
    resetState,
    setTheme,
    setUser,
    setUserPhoto,
    setCompanyLogo,
    setClients
}