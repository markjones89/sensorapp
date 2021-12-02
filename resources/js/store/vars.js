/**
 * Initial app state
 */
// export function initialState () {
//     return {
//         theme: 'dark',
//         user: null,
//         api_user: null,
//         api_pass: null,
//         clients: []
//     }
// }

/**
 * Initial user state
 */
export function userState() {
    return {
        theme: 'dark',
        info: null,
        api_user: null,
        api_pass: null
    }
}

/**
 * Initial backend (module) state
 */
export function backendState() {
    return {
        // Sensor backend api base url
        url: null,
        // Sensor backend api auth token
        authToken: null,
    }
}

/**
 * Initial homepage (module) state
 */
export function homepageState() {
    return {
        summary: null,
        rangeFilter: {
            type: null,
            start: null,
            end: null
        },
        filter: { value: 'opportunity_cost', label: 'Cost of Unused Spaces', boxLabel: 'Opportunity Cost', btnLabel: 'Cost Analysis' },
        locationFilter: null,
        startTime: null,
        endTime: null,
        periodFilter: null,
    }
}

/**
 * Initial locations (module) state
 */
export function locationsState() {
    return {
        client: null,
        buildings: [],
        building: null,
        // floors: [],
        floor: null,
        // areas: [],
        // sensors: []
    }
}

/**
 * Initial peak chart (page) state
 */
export function peakChartState() {
    return {
        summary: null
    }
}