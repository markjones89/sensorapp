export const store = {
    appName: process.env.MIX_APP_NAME,
    state: {
        user: null
    },
    /**
     * Returns currently logged in user info
     */
    getUser() {
        return this.state.user
    },
    /**
     * Sets currently logged in user info
     * @param {Object} user User info object
     */
    setUser(user) {
        this.state.user = user
    }
}