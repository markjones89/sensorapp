const clearStore = ({ commit }) => {
    commit('setUser', null)
    commit('setClients', [])
    commit('locations/setClient', null)
    commit('locations/setBuildings', [])
    commit('locations/setBuilding', null)
    commit('locations/setFloor', null)

    console.log('clearStore:cleared!')
}

export default {
    clearStore
}