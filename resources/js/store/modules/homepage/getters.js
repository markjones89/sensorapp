const getSummary = state => state.summary

// range filter
const getRange = state => state.rangeFilter

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
    getLocation,
    getTime,
    getPeriod
}