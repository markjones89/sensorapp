const getTheme = state => state.theme

const getUser = state => state.user

const getUserCompany = state => state.user.company

const isAuth = state => state.user !== null

const getClients = state => state.clients

export default {
    getTheme,
    getUser,
    getUserCompany,
    isAuth,
    getClients
}