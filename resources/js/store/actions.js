const clearStore = ({ commit }) => {
    commit('setUser', null)
    commit('setClients', [])

    commit('locations/setClient', null)
    commit('locations/setBuildings', [])
    commit('locations/setBuilding', null)
    commit('locations/setFloor', null)

    commit('homepage/setSummary', null)
    commit('homepage/setLocation', null)

    console.log('clearStore:cleared!')
}

export default {
    clearStore
}