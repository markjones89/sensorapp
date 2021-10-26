import { locationsState } from '@/store/vars'

const resetState = (state) => {
    let initial = locationsState()

    Object.keys(initial).forEach(key => {
        state[key] = initial[key]
    })
}

const setClient = (state, client) => {
    state.client = client
}

const setBuildings = (state, buildings) => {
    state.buildings = [...buildings]
}

const setBuilding = (state, bldg) => {
    state.building = bldg
}

const setFloors = (state, { bid, floors }) => {
    // let building = state.buildings.find(x => x.id == bid)

    // if (building) building.floors = [...floors]
    // console.log('locations/setFloors', building, floors)
    state.buildings = state.buildings.map(b => {
        if (b.id == bid) b.floors = [...floors]
        return b
    })
}

const addFloor = (state, { bid, floor }) => {
    // let building = state.buildings.find(x => x.id == bid)

    // if (building) building.floors.push(floor)
    state.buildings = state.buildings.map(b => {
        if (b.id == bid) b.floors.push(floor)
        return b
    })
}

const setFloor = (state, floor) => {
    state.floor = floor
}

const setSensors = (state, { bid, fid, sensors }) => {
    let building = state.buildings.find(x => x.id == bid)
    let floor = building ? building.floors.find(x => x.id == fid) : null

    if (floor) floor.sensors = [...sensors]
}

const setAreas = (state, bid, fid, areas) => {
    let building = state.buildings.find(x => x.id == bid)
    let floor = building ? building.floors.find(x => x.id == fid) : null

    if (floor) floor.areas = [...areas]
}

export default {
    resetState,
    setClient,
    setBuildings,
    setBuilding,
    setFloors,
    addFloor,
    setFloor,
    setSensors,
    setAreas
}