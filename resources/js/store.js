export const store = {
    appName: process.env.MIX_APP_NAME,
    state: {
        user: null,
        building: null, // selected building (floor setup & floor plan mapper)
        floors: [],     // selected building floors
        floor: null     // selected floor (floor plan mapper)
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
     * Sets the photo of the current user
     * @param {string} photo Photo file name
     */
    setUserPhoto(photo) {
        if (this.state.user) this.state.user.photo = photo
    },
    getUserCompany() { return this.state.user.company },
    /**
     * Sets the company logo of the current user
     * @param {string} logo Company logo file name
     */
    setCompanyLogo(logo) {
        if (this.state.user) this.state.user.company.logo = logo
    },
    setBldg(data) {
        this.state.building = data
    },
    getBldg() { return this.state.building },
    setFloors(data) {
        this.state.floors = data
    },
    getFloors() { return this.state.floors }
}