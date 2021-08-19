<template>
    <transition name="fadeUp">
        <div class="filter-dropdown" v-if="show" @click="$event.stopPropagation()" :data-multiple="multiple" ref="dropdown" :style="{ height: height }" :data-position="position">
            <template v-if="multiple">
                <checkbox v-for="f in filters" :key="f.value" :label="f.label" :val="f.value" v-model="selectedItems" />
                <div class="filter-buttons">
                    <a @click="onSelect">Apply</a>
                </div>
            </template>
            <template v-else>
                <div class="filter-wrapper" ref="wrapper">
                    <label class="filter-item" v-for="f in filters" :key="f.value ? f.value : f" 
                        @click="onSelect($event, f.value ? f.value : f, f.label ? f.label : f, f)" :class="{ 'selected--item': selected === (f.value ? f.value : f) }">
                        {{ f.label ? f.label : f }}
                    </label>
                </div>
            </template>
        </div>
    </transition>
</template>

<script>
import Checkbox from './Checkbox'

export default {
    // props: ['filters', 'chosen', 'multiple', 'maxItems', 'show'],
    props: {
        filters: Array,
        chosen: [String, Number, Boolean],
        multiple: {
            type: Boolean, default: false
        },
        maxItems: {
            type: Number, default: 5
        },
        position: {
            type: String, default: 'bottom'
        },
        show: Boolean
    },
    components: { Checkbox },
    data() {
        return {
            selectedItems: [], selected: null
        }
    },
    watch: {
        show: function(show) {
            if (show && !this.multiple && this.selected) {
                setTimeout(() => {
                    let _selected = this.$refs.wrapper.querySelector('.selected--item')
                    if (_selected) this.$refs.wrapper.scrollTop = _selected.offsetTop
                }, 0)
            }
        }
    },
    computed: {
        height() {
            let max = this.maxItems// || 5
            if (!this.multiple && this.filters.length > max) return `${max * 36}px`
            return 'auto'
        }
    },
    methods: {
        onSelect(evt, value, label, item) {
            if (this.multiple) {
                this.$emit('onSelect', this.selectedItems)
            } else {
                this.selected = value
                this.$emit('onSelect', value, label, item)
            }
        }
    },
    created() {
        if (this.multiple && this.chosen) {
            this.selectedItems = Array.from(this.chosen)
        } else if (this.chosen) {
            this.selected = this.chosen
        }
    }
}
</script>


<style lang="scss">
.filter-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 10px;
    padding: 12px 0;
    min-width: 100%;
    cursor: default;
    text-align: left;
    white-space: nowrap;
    background-color: #393846;
    border-radius: 20px;
    border: 1px solid #282737;
    overflow: hidden;
    z-index: 1;

    &[data-position=top] {
        top: auto;
        bottom: 100%;
        margin-top: 0;
        margin-bottom: 10px;;
    }

    .filter-buttons {
        line-height: normal;
        text-align: right;
        margin-top: 12px;

        a {
            display: inline-block;
            cursor: pointer;
            color: #ed762c;
        }
    }

    .filter-wrapper {
        position: relative;
        height: 100%;
        // margin-right: 8px;
        overflow-y: auto;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 16px;
        }
        &::-webkit-scrollbar-track {
            background: transparent; 
        }
        &::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.2);
            background-clip: padding-box;
            border: 6px solid transparent;
            border-radius: 8px;

            &:hover {
                background: rgba(255,255,255,.15);
                background-clip: padding-box;
            }
        }
    }

    &[data-multiple="true"] {
        padding: 20px;
    }

    .filter-item {
        display: block;
        padding: 8px 16px;
        line-height: normal;
        cursor: pointer;
        user-select: none;
        transition: color .24s, background-color .24s linear;

        &:hover {
            color: #ed762c;
            background-color: rgba($color: #ed762c, $alpha: 0.035);
        }

        &:active,
        &.selected--item {
            color: #ed762c;
            background-color: rgba($color: #ed762c, $alpha: 0.1);
        }
    }
}
</style>