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
    setUser,
    setUserPhoto,
    setCompanyLogo,
    setClients
}