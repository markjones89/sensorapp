import * as d3 from 'd3'

export function roomComparer(wrapper, data) {
    const _wrapper = d3.select(wrapper),
        labelWidth = 340,
        step = 48,
        barDiv = 20

    const groupData = data.groups.map((g, i) => {
        return {
            title: g,
            left: data.left[i],
            right: data.right[i]
        }
    })

    let createBars = (wrapper, data, type) => {
        wrapper.selectAll('.bars').remove()

        let peakBars = wrapper.append('div').attr('class', 'bars'),
            peakCount = data.peak === 0 ? 0 : data.peak < barDiv ? 1 : Math.round(data.peak / barDiv),
            avgBars = wrapper.append('div').attr('class', 'bars'),
            avgCount = data.average === 0 ? 0 : data.average < barDiv ? 1 : Math.round(data.average / barDiv)

        // percent label (peak)
        if (data.peak > 0) peakBars.append('span').attr('class', 'percent').text(`${data.peak}%`)
        // bars (peak)
        for (let i = 1; i <= peakCount; i++) { peakBars.append('span').attr('class', 'bar peak') }

        // percent label (average)
        if (data.average > 0 || (data.peak === 0 && data.average === 0)) avgBars.append('span').attr('class', 'percent').text(`${data.average}%`)
        // bars (average)
        for (let i = 1; i <= avgCount; i++) { avgBars.append('span').attr('class', 'bar average') }

        if (data.average > 0) {
            peakBars.style('transform', `translate(${type === 'left' ? -15 : 0}px, ${-(avgBars.node().getBoundingClientRect().height + 5)}px)`)
        }
    }

    let groups = _wrapper.selectAll(null).data(groupData).enter()
        .append('div').attr('class', 'stat-group')

    groups.each(function (g, i) {
        let group = d3.select(this),
            groupHeight = (i + 1) * step / 3,
            groupWidth = (i + 1) * step / 2

        let left = group.append('div').attr('class', 'bars-group left').attr('data-id', i)
            .style('width', `${groupWidth}px`)
            .style('height', `${groupHeight}px`)
            .style('transform', `translateX(${-groupWidth}px)`)

        createBars(left, g.left, 'left')

        let label = group.append('span').attr('class', 'group-label').attr('data-id', i)
            .style('width', `${labelWidth + (i * step)}px`)
            .text(d => d.title)

        let right = group.append('div').attr('class', 'bars-group right').attr('data-id', i)
            .style('width', `${groupWidth}px`)
            .style('height', `${groupHeight}px`)

        createBars(right, g.right, 'right')

        let rect = label.node().getBoundingClientRect()

        left.style('bottom', `${rect.height / 2}px`)
        right.style('bottom', `${rect.height / 2}px`)
    })

    function setGroups(dataGroups) {
        let labels = groups.selectAll('.group-label')

        labels.each(function() {
            let label = d3.select(this),
                id = parseInt(label.attr('data-id'))

            label.text(dataGroups[id])
        })
    }

    this.setData = function (data) {
        setGroups(data.groups)
        this.setLeft(data.left)
        this.setRight(data.right)
    }

    this.setLeft = function (data) {
        let lefts = groups.selectAll('.bars-group.left')

        lefts.each(function () {
            let left = d3.select(this),
                id = parseInt(left.attr('data-id'))

            createBars(left, data[id], 'left')
        })
    }

    this.setRight = function (data) {
        let rights = groups.selectAll('.bars-group.right')

        rights.each(function () {
            let right = d3.select(this),
                id = parseInt(right.attr('data-id'))

            createBars(right, data[id], 'right')
        })
    }
}