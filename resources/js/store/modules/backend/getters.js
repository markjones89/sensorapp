const api_header = state => (cancelToken) => {
    let axiosOpts = {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
    }

    if (cancelToken) axiosOpts.cancelToken = cancelToken

    return axiosOpts
}

const api_customers = state => `${state.url}/api/customers`

const api_buildings = state => (cust) => `${state.url}/api/customers/${cust}/buildings`

const api_building = state => (cust, bldg) => `${state.url}/api/customers/${cust}/buildings/${bldg}`

const api_building_overview = state => (cust, bldg) => `${state.url}/api/customers/${cust}/buildings/${bldg}/overview`

const api_floors = state => (cust, bldg) => `${state.url}/api/customers/${cust}/buildings/${bldg}/floors`

const api_floor = state => (cust, bldg, floor) => `${state.url}/api/customers/${cust}/buildings/${bldg}/floors/${floor}`

const api_areas = state => (cust, bldg, floor) => `${state.url}/api/customers/${cust}/buildings/${bldg}/floors/${floor}/areas`

const api_area = state => (cust, bldg, floor, area) => `${state.url}/api/customers/${cust}/buildings/${bldg}/floors/${floor}/areas/${area}`

const api_sensors = state => (cust, bldg, floor, area) => `${state.url}/api/customers/${cust}/buildings/${bldg}/floors/${floor}/areas/${area}/sensors`

const api_sensor = state => (cust, bldg, floor, area, sensor) => `${state.url}/api/customers/${cust}/buildings/${bldg}/floors/${floor}/areas/${area}/sensors/${sensor}`

const api_sensors_by_node = state => (id, label) => `${state.url}/api/node/${id}?label=${label}`

// charts, graphs, stats
const api_customer_summary = state => `${state.url}/api/summary/customer`

export default {
    /** API request header (plus auth token) */
    api_header,
    /** Customers API for (GET, POST) */
    api_customers,
    /** Buildings API (GET, POST) */
    api_buildings,
    /** Building API (GET, PUT, DELETE) */
    api_building,
    /** Building overview API (GET) */
    api_building_overview,
    /** Floors API (GET, POST) */
    api_floors,
    /** Floor API (GET, PUT, DELETE) */
    api_floor,
    /** Areas API (GET, POST) */
    api_areas,
    /** Area API (GET, PUT, DELETE) */
    api_area,
    /** Sensors API (GET, POST) */
    api_sensors,
    /** Sensor API (GET, PUT, DELETE) */
    api_sensor,
    /** Sensors API url by node */
    api_sensors_by_node,
    /** Customer API (home page circle pack) */
    api_customer_summary
}