<template>
    <transition name="fadeUp">
        <div class="filter-dropdown" v-if="show" @click="$event.stopPropagation()" :data-multiple="multiple" ref="dropdown" :style="{ height: height }">
            <template v-if="multiple">
                <checkbox v-for="f in filters" :key="f.value" :label="f.label" :val="f.value" v-model="selectedItems" />
                <div class="filter-buttons">
                    <a @click="onSelect">Apply</a>
                </div>
            </template>
            <template v-else>
                <div class="filter-wrapper">
                    <label class="filter-item" v-for="f in filters" :key="f.value ? f.value : f" 
                        @click="onSelect($event, f.value ? f.value : f)" :class="{ 'selected--item': selected === (f.value ? f.value : f) }">
                        {{ f.label ? f.label : f }}
                    </label>
                </div>
            </template>
        </div>
    </transition>
</template>
<style lang="scss">
.filter-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 10px;
    padding: 10px 0;
    min-width: 100%;
    cursor: default;
    white-space: nowrap;
    background-color: rgb(54, 54, 54);
    border-radius: 20px;
    overflow: hidden;

    .filter-buttons {
        line-height: normal;
        text-align: right;
        margin-top: 12px;

        a {
            display: inline-block;
            cursor: pointer;
            color: #FF5A09;
        }
    }

    .filter-wrapper {
        position: relative;
        height: 100%;
        margin-right: 8px;
        overflow-y: auto;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-track {
            background: transparent; 
        }
        &::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.2);
            border-radius: 4px;

            &:hover {
                background: rgba(255,255,255,.1);
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
            color: #FF5A09;
            background-color: rgba($color: #FF5A09, $alpha: 0.035);
        }

        &:active,
        &.selected--item {
            color: #FF5A09;
            background-color: rgba($color: #FF5A09, $alpha: 0.1);
        }
    }
}
</style>
<script>
import Checkbox from './Checkbox'

export default {
    props: ['filters', 'chosen', 'multiple', 'show'],
    components: { Checkbox },
    data() {
        return {
            selectedItems: [], selected: null
        }
    },
    computed: {
        height() {
            if (!this.multiple && this.filters.length > 5) return `${5 * 36}px`
            return 'auto'
        }
    },
    methods: {
        onSelect(evt, value) {
            if (this.multiple) {
                this.$emit('onSelect', this.selectedItems)
            } else {
                this.selected = value
                this.$emit('onSelect', value)
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