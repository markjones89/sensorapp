const getClient = state => state.client

const getBuildings = state => state.buildings

const getBuilding = state => state.building

const getFloors = state => bid => state.buildings.find(x => x.id == bid)?.floors || []

const getFloor = state => state.floor

const getSensors = state => ({ bid, fid }) => {
    let building = state.buildings.find(x => x.id == bid)
    let floor = building ? building.floors.find(x => x.id == fid) : null

    return floor?.sensors
}

const getAreas = state => ({ bid, fid }) => {
    let building = state.buildings.find(x => x.id == bid)
    let floor = building ? building.floors.find(x => x.id == fid) : null

    return floor?.areas
}

export default {
    getClient,
    getBuildings,
    getBuilding,
    getFloors,
    getFloor,
    getSensors,
    getAreas
}