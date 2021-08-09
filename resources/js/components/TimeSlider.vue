<template>
    <div class="time-slider" ref="slider">
        <div class="slot-holder">
            <span class="slot-selected" ref="range"></span>
            <span class="slot-thumb start-thumb" ref="minThumb" @mousedown="thumbHold" tabindex="-1">
                <span class="range-label" ref="minLabel">{{ startValue }}</span>
            </span>
            <span class="slot-thumb end-thumb" ref="maxThumb" @mousedown="thumbHold" tabindex="-1">
                <span class="range-label" ref="maxLabel">{{ endValue }}</span>
            </span>
        </div>
    </div>
</template>
<style lang="scss">
$primary: #ed762c;
$buffer: #32313d;

.time-slider {
    position: relative;
    width: 400px;
    padding: 20px 0;

    .slot-holder {
        position: relative;
        height: 4px;
        border-radius: 2px;
        background-color: $buffer;

        .slot-selected {
            position: absolute;
            top: 0;
            background-color: $primary;
            height: 4px;
            border-radius: 2px;
            transition: all .14s;
        }

        .slot-thumb {
            position: absolute;
            display: block;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: $primary;
            cursor: pointer;
            transition: all .14s;

            .range-label {
                position: absolute;
                left: 50%;
                white-space: nowrap;
                top: 24px;
                font-size: 14px;
                pointer-events: none;
                transform: translateX(-50%);
            }

            &:active {
                background-color: darken($color: $primary, $amount: 5%);
            }
        }
    }
}
</style>
<script>

const MIN_SLOT = 0,
    MAX_SLOT = 23

export default {
    props: ['from', 'to'],
    data() {
        return {
            slots: [
                '12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', 
                '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'
            ],
            start: 8, end: 17, thumb: null, shiftX: 0,
            holdValue: {
                start: 0, end: 0
            }
        }
    },
    computed: {
        width() { return this.$refs.slider.offsetWidth },
        // step() { return parseInt(this.width / MAX_SLOT) },
        step() { return this.width / MAX_SLOT },
        startValue() { return this.slots[this.start] },
        endValue() { return this.slots[this.end] }
    },
    methods: {
        init() {
            let startLeft = this.step * this.start,
                endLeft = this.step * this.end

            this.move(this.$refs.minThumb, startLeft)
            this.move(this.$refs.maxThumb, endLeft)
        },
        thumbHold(evt) {
            evt.preventDefault()

            let thumb = evt.target
                
            this.shiftX = evt.clientX - thumb.getBoundingClientRect().left - 16

            document.addEventListener('mousemove', this.thumbMove)
            document.addEventListener('mouseup', this.thumbRelease)

            this.thumb = thumb
            this.holdValue.start = this.start
            this.holdValue.end = this.end
        },
        thumbMove(evt) {
            let newLeft = evt.clientX - this.shiftX - this.$refs.slider.getBoundingClientRect().left + this.step,
                steps = parseInt(newLeft / this.step),
                slot = parseInt(newLeft / this.step) - 1, //value = this.slots[slot]
                rightEdge = this.width

            newLeft = (this.step * steps) - this.step

            if (newLeft < 0) newLeft = 0

            if (newLeft > rightEdge) newLeft = rightEdge

            if (this.thumb === this.$refs.minThumb && (slot >= this.end || slot < MIN_SLOT)) return
            if (this.thumb === this.$refs.maxThumb && (slot <= this.start || slot > MAX_SLOT)) return

            this.move(this.thumb, newLeft)

            if (this.thumb == this.$refs.minThumb && this.start !== slot) {
                this.start = slot
            }

            if (this.thumb == this.$refs.maxThumb && this.end !== slot) {
                this.end = slot
            }
        },
        thumbRelease(evt) {
            //TODO: emit change
            if (this.thumb === this.$refs.minThumb && this.holdValue.start !== this.start) {
                this.callStartChange()
            } else if (this.thumb === this.$refs.maxThumb && this.holdValue.end !== this.end) {
                this.callEndChange()
            }

            document.removeEventListener('mouseup', this.thumbRelease)
            document.removeEventListener('mousemove', this.thumbMove)
        },
        move(thumb, pos) {
            let isStart = thumb == this.$refs.minThumb

            thumb.style.left = `${pos}px`

            this.$refs.range.style[isStart ? 'left' : 'right'] = 
                isStart ? `${pos}px` : `${(this.width - pos)}px`
        },
        callStartChange() { this.$emit('startChanged', this.startValue, this.start) },
        callEndChange() { this.$emit('endChanged', this.endValue, this.end) }
    },
    created() {
        if (this.from) this.start = this.slots.indexOf(this.from)
        // else this.callStartChange()

        if (this.to) this.end = this.slots.indexOf(this.to)
        // else this.callEndChange()
    },
    mounted() {
        this.init()
    }
}
</script>