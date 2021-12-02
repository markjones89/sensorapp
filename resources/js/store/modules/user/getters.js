const isAuth = state => state.info !== null

const getUser = state => state.info

const getUserCompany = state => state.info.company

const getTheme = state => state.info.app_theme

export default {
    isAuth,
    getUser,
    getUserCompany,
    getTheme
}