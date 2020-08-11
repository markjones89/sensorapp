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
    },
    /**
     * Sets the company logo of the current user
     * @param {string} logo Company logo file name
     */
    setCompanyLogo(logo) {
        if (this.state.user) this.state.user.company.logo = logo
    }
}