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

const api_graph_view = state => `${state.url}/api/summary/graph_view`

const api_monthly_workspace_utils_rpt = state => `${state.url}/api/filters/desk_area/workspace_utils_daily`

const api_monthly_room_utils_rpt = state => `${state.url}/api/filters/meeting_room/hourly_room_in_use_stat`

const api_hourly_room_utils_rpt = state => `${state.url}/api/filters/meeting_room/hourly_room_in_use_detail`

const api_room_vs_meeting_size_rpt = state => `${state.url}/api/filters/meeting_room/room_size_vs_meeting_size`

const api_room_util_vs_hours_rpt = state => `${state.url}/api/filters/meeting_room/room_in_use_vs_total_hour`

const api_room_supply_vs_size = state => `${state.url}/api/filters/meeting_room/room_supply_vs_overall_meeting_size`

const api_room_util_vs_efficiency = state => `${state.url}/api/filters/meeting_room/room_utilisation_vs_efficiency`

const api_low_performing_stats = state => `${state.url}/api/filters/desk_area/low_workspace_stats`

const api_low_performing_sensors = state => `${state.url}/api/filters/desk_area/low_workspace_sensor_detail`

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
    api_customer_summary,
    /** Customer API (bar charts - floor summary) */
    api_graph_view,
    api_low_performing_stats,
    api_low_performing_sensors,
    /** Utilisation report (workspace utilisation page 2-4) */
    api_monthly_workspace_utils_rpt,
    /** Utilisation report (meeting room utilisation page 5-7) */
    api_monthly_room_utils_rpt,
    /** Utilisation report (meeting room utilisation page 8) */
    api_hourly_room_utils_rpt,
    /** Utilisation report (room vs meeting size page 9) */
    api_room_vs_meeting_size_rpt,
    /** Utilisation report (room supply vs meeting size page 10) */
    api_room_supply_vs_size,
    /** Utilisation report (room util vs effeciency page 11-12) */
    api_room_util_vs_efficiency,
    /** Utilisation report (room util vs total hours page 13) */
    api_room_util_vs_hours_rpt
}