const setSummary = (state, summary) => {
    state.summary = summary
}

const setRange = (state, range) => {
    state.rangeFilter.type = range.type
    state.rangeFilter.start = range.start
    state.rangeFilter.end = range.end
}

const setFilter = (state, filter) => {
    state.filter = filter
}

const setLocation = (state, location) => {
    state.locationFilter = location
}

const setTime = (state, time) => {
    if (typeof time.start !== 'undefined') state.startTime = time.start
    if (typeof time.end !== 'undefined') state.endTime = time.end
}

const setPeriod = (state, minute) => {
    state.periodFilter = minute
}

export default {
    setSummary,
    setRange,
    setFilter,
    setLocation,
    setTime,
    setPeriod
}