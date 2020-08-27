<template>
    <div class="checkbox">
        <label>
            <input type="checkbox" :value="val" :checked="checked" @change="change">
            <span class="checkbox_box">
                <svg class="checkbox_checkmark" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.82919 7.62794C3.73373 7.72412 3.6035 7.77778 3.46821 7.77778C3.33293 7.77778 3.20269 7.72412 3.10724 7.62794L0.224383 4.73982C-0.0747943 4.44015 -0.0747943 3.95421 0.224383 3.6551L0.585359 3.29343C0.88463 2.99375 1.3692 2.99375 1.66838 3.29343L3.46821 5.09634L8.33162 0.224756C8.63089 -0.0749187 9.11593 -0.0749187 9.41464 0.224756L9.77562 0.586426C10.0748 0.886101 10.0748 1.37195 9.77562 1.67116L3.82919 7.62794Z" />
                </svg>
            </span>
            <span class="checkbox_label">{{ label }}</span>
        </label>
    </div>
</template>
<style lang="scss">
$height: 15px;
.checkbox {
    position: relative;
    display: flex;
    height: $height;

    & + .checkbox { margin-top: 12px; }

    label {
        display: inline-flex;
        align-items: center;
        line-height: $height;
        cursor: pointer;
    }

    .checkbox_box {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: $height;
        height: $height;
        border-radius: 4px;
    }

    .checkbox_checkmark {
        pointer-events: none;
        margin-top: 1px;

        path {
            fill: #ffffff;
        }
    }

    .checkbox_label {
        padding: 0 8px;
        user-select: none;
        transition: color .15s;
    }

    input {
        display: none;

        & ~ .checkbox_box {
            background-color: #ffffff;
            transition: background-color .15s;
        }
        
        &:checked ~ .checkbox_box {
            background-color: #FF5A09;
        }

        &:checked ~ .checkbox_label {
            color: #FF5A09;
        }
    }
}
</style>
<script>
export default {
    name: 'checkbox',
    props: ['value', 'label', 'val'],
    data() {
        return {
            checked: false
        }
    },
    computed: {
        arrayBound() { return Array.isArray(this.value) }
    },
    methods: {
        change() {
            this.checked = !this.checked

            let checked = this.arrayBound ? Array.from(this.value) : this.checked

            if (this.arrayBound) {
                let found = checked.indexOf(this.val)

                if (!this.checked && found >= 0) checked.splice(found, 1)
                else checked.push(this.val)
            }
            
            this.$emit('input', checked)
        }
    },
    created() {
        this.checked = this.arrayBound ? 
            this.value.indexOf(this.val) >= 0 :
            (typeof this.value === 'undefined' ? false : this.value)
    }
}
</script>