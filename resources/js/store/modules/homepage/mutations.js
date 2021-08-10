const setSummary = (state, summary) => {
    state.summary = summary
}

const setRange = (state, range) => {
    state.rangeFilter = range
}

const setLocation = (state, location) => {
    state.locationFilter = location
}

const setTime = (state, timeFilter) => {
    state.startTime = timeFilter.start
    state.endTime = timeFilter.end
}

const setPeriod = (state, minute) => {
    state.periodFilter = minute
}

export default {
    setSummary,
    setRange,
    setLocation,
    setTime,
    setPeriod
}