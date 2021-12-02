import { userState } from '@/store/vars'

const resetState = (state) => {
    let initial = userState()

    Object.keys(initial).forEach(key => {
        state[key] = initial[key]
    })
}

const setUser = (state, info) => {
    state.info = info
}

const setUserPhoto = (state, photo) => {
    if (state.info) state.info.photo = photo
}

const setCompanyLogo = (state, logo) => {
    if (state.info && state.info.company) state.info.company.logo = logo
}

const setAPIInfo = (state, info) => {
    state.api_user = info.user
    state.api_pass = info.pass
}

const setTheme = (state, theme) => {
    state.theme = theme
    state.info.app_theme = theme
}

export default {
    resetState,
    setUser,
    setUserPhoto,
    setAPIInfo,
    setCompanyLogo,
    setTheme
}