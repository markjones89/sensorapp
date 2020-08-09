<template>
    <div class="circle-progress" ref="progress">
        <svg class="progress-ring" :height="_size" :width="_size">
            <circle class="progress-ring__buffer" :r="radius" :cx="half" :cy="half"></circle>
            <circle class="progress-ring__circle" :r="radius" :cx="half" :cy="half" stroke-linecap="round"></circle>
        </svg>
        <span class="progress__percent">{{ `${percent}%` }}</span>
    </div>
</template>
<style lang="scss">
$bufferAlpha: 0.35;
$stroke: 3;
.circle-progress {
    position: relative;
    display: inline-flex;

    .progress-ring__circle {
        stroke: #ff5a09;
        stroke-width: $stroke;
        fill: transparent;
        transition: stroke-dashoffset .85s cubic-bezier(.4,0,.2,1);
        transform: rotate(-90deg);
        transform-origin: center;
    }

    .progress-ring__buffer {
        stroke: rgba($color: #ff5a09, $alpha: $bufferAlpha);
        stroke-width: $stroke;
        fill: transparent;
    }

    .progress__percent {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 0.75em;
        transform: translate(-50%, -50%);
    }
}
</style>
<script>
const STROKE_WIDTH = 3
export default {
    name: 'circle-progress',
    props: ['size', 'percent', 'color'],
    watch: {
        'percent': function(value) {
            this.setProgress(value)
        }
    },
    computed: {
        _size() { return this.size || 48 },
        half() { return this._size / 2 },
        radius() { return this.half - (STROKE_WIDTH * 2) },
        circumference() { return this.radius * 2 * Math.PI }
    },
    methods: {
        getCircleEl() {
            return this.$refs.progress.querySelector('.progress-ring__circle')
        },
        getPercentEl() {
            return this.$refs.progress.querySelector('.progress__percent')
        },
        init() {
            let _ = this,
                circleEl = _.getCircleEl(),
                percentEl = _.getPercentEl()

            circleEl.style.strokeDasharray = [_.circumference, _.circumference].join(' ')
            circleEl.style.strokeDashoffset = _.circumference
            percentEl.innerText = '0%'

            setTimeout(function () { _.setProgress(_.percent) }, 0)
        },
        setProgress(percent) {
            let _ = this,
                circleEl = _.getCircleEl(),
                percentEl = _.getPercentEl(),
                offset = (_.circumference - (_.circumference * percent) / 100);

            circleEl.style.strokeDashoffset = offset
            percentEl.innerText = `${percent}%`
        }
    },
    mounted() {
        this.init()
    }
}
</script>