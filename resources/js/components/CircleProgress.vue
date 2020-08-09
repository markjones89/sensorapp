<template>
    <div class="circle-progress" ref="progress"></div>
</template>
<style lang="scss">
.circle-progress {
    position: relative;
    display: inline-flex;

    .progress-ring__circle {
        stroke: #43a047;
        stroke-width: 3;
        fill: transparent;
        transition: stroke-dashoffset .85s cubic-bezier(.4,0,.2,1);
        transform: rotate(-90deg);
        transform-origin: center;
    }

    .progress-ring__buffer {
        stroke: #eee;
        stroke-width: 3;
        fill: transparent;
    }

    .progress__percent {
        position: absolute;
        top: 50%;
        left: 50%;
        // font-family: Roboto;
        font-size: 0.75em;
        transform: translate(-50%, -50%);
    }

    &[data-color='red'] .progress-ring__circle { stroke: #e53935; }
    &[data-color='blue'] .progress-ring__circle { stroke: #1e88e5; }
    &[data-color='yellow'] .progress-ring__circle { stroke: #ffeb3b; }
    &[data-color='orange'] .progress-ring__circle { stroke: #ff9800; }
    &[data-color='teal'] .progress-ring__circle { stroke: #009688; }
    &[data-color='indigo'] .progress-ring__circle { stroke: #3f51b5; }
    &[data-color='purple'] .progress-ring__circle { stroke: #9c27b0; }
}
</style>
<script>
export default {
    name: 'circle-progress',
    props: ['size', 'percent', 'color'],
    watch: {
        'percent': function(value, old) {
            this.setProgress(value)
        }
    },
    methods: {
        init() {
            let _ = this,
                elem = this.$refs.progress,
                SVG_NS = 'http://www.w3.org/2000/svg', STROKE_WIDTH = 3,
                options = { size: _.size || 48, percent: _.percent || 0, color: _.color }

            build(elem, options)

            // progress html builder
            function build(el, opts) {
                var progressEl = el, _half = opts.size / 2, _radius = _half - (STROKE_WIDTH * 2),
                    svg = createSVGEl('svg', { class: 'progress-ring', height: opts.size.toString(), width: opts.size.toString() }),
                    circleBuffer = createSVGEl('circle', { class: 'progress-ring__buffer', r: _radius, cx: _half, cy: _half }),
                    circleEl = createSVGEl('circle', { class: 'progress-ring__circle', r: _radius, cx: _half, cy: _half }),
                    percentEl = createEl('span', { class: 'progress__percent' }, '0%');

                // progressEl.classList.add('progress-circle');

                if (opts.color)
                    progressEl.setAttribute('data-color', opts.color);

                appendTo([circleBuffer, circleEl], svg);
                appendTo([svg, percentEl], progressEl);

                const circumference = _radius * 2 * Math.PI;

                circleEl.style.strokeDasharray = [circumference, circumference].join(' ');
                circleEl.style.strokeDashoffset = circumference;
                percentEl.innerText = '0%';

                setTimeout(function () { _.setProgress(opts.percent) }, 0);
            }

            // createElement helper
            function createEl(tag, attributes, content, isHtml) {
                var el = document.createElement(tag);

                if (typeof content !== 'undefined')
                    el[isHtml || false ? 'innerHTML' : 'innerText'] = content;

                if (typeof attributes !== 'undefined')
                    setAttrs(el, attributes);

                return el;
            }

            // createElementNS helper
            function createSVGEl(tag, attributes) {
                var el = document.createElementNS(SVG_NS, tag);

                if (typeof attributes !== 'undefined')
                    setAttrs(el, attributes);

                return el;
            }

            // attribute(s) setter
            function setAttrs(el, attrs, isNS) {
                var recursiveSet = function (at, set) {
                    for (var prop in at) {
                        var a = at[prop];
                        if ((typeof a === 'object' && a !== null) && a.dataset === undefined && a[0] === undefined) { recursiveSet(a, set[prop]); }
                        else {
                            if (prop in set) {
                                if (a !== null) set.setAttribute(prop, a);
                            } else {
                                if (a !== null) {
                                    if (isNS) set.setAttributeNS(null, prop, a);
                                    else set.setAttribute(prop, a);
                                }
                                else
                                    set.removeAttribute(prop);
                            }
                        }
                    }
                }
                recursiveSet(attrs, el);
            }

            // appendChild helper
            function appendTo(elem, to) {
                if (Array.isArray(elem)) {
                    elem.forEach(function (el) {
                        to.appendChild(el);
                    });
                } else {
                    to.appendChild(elem);
                }
            }
        },
        setProgress(percent) {
            let progressEl = this.$refs.progress,
                circleEl = progressEl.querySelector('.progress-ring__circle'),
                percentEl = progressEl.querySelector('.progress__percent'),
                radius = circleEl.r.baseVal.value, 
                circumference = radius * 2 * Math.PI,
                offset = (circumference - (circumference * percent) / 100);

            circleEl.style.strokeDashoffset = offset
            percentEl.innerText = percent + '%'
        }
    },
    mounted() {
        this.init()
    }
}
</script>