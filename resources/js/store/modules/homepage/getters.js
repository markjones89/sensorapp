const getSummary = state => state.summary

// range filter
const getRange = state => state.rangeFilter

// data display filter
const getFilter = state => state.filter

// location filter
const getLocation = state => state.locationFilter

// time filter
const getTime = state => {
    return {
        start: state.startTime,
        end: state.endTime
    }
}

// minute filter
const getPeriod = state => state.periodFilter

export default {
    getSummary,
    getRange,
    getFilter,
    getLocation,
    getTime,
    getPeriod
}