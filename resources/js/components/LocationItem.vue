<template>
    <div class="location" :class="{ sub: depth > 0 }">
        <div class="info">
            <span class="name" :class="{ 'has-subs': subs && subs.length > 0 }" @click="toggleSubs">
                <span class="caret" :class="{ up: showSubs }" v-if="subs && subs.length > 0">
                    <caret-icon />
                </span>
                {{ item.name }}
            </span>
            <div class="loc-opts">
                <a class="loc-opt" @click="add(item.hid || parent, item)" v-if="item.city && depth == 3">Add</a>
                <template v-if="item.id">
                    <a class="loc-opt" @click="toSetup(item.id)">Setup</a>
                    <a class="loc-opt" @click="toMapper(item.id)">Mapper</a>
                    <a class="loc-opt" @click="edit(item.id)">Edit</a>
                    <template v-if="isSuper"><a class="loc-opt" @click="del(item.id)">Remove</a></template>
                </template>
            </div>
        </div>
        <div class="subs" v-if="showSubs">
            <location-item v-for="s in subs" :key="s.name"
                :item="s" :subs="s.children" :depth="depth + 1" :parent="item.hid || parent"
                @onAdd="add" @onEdit="edit" @onDel="del" @onSetup="toSetup" @onMapper="toMapper" @collapse="setCollapse"></location-item>
        </div>
    </div>
</template>
<style lang="scss">
.location {
    .info {
        position: relative;
        display: flex;
        padding: 8px 10px;
        justify-content: space-between;
        border-radius: 8px;
        transition: background-color .24s linear;

        &:hover {
            background-color: rgba($color: var(--app-text-rgb), $alpha: 0.04);
        }
        
        .name {
            font-size: 18px;
            padding-right: 16px;

            &.has-subs {
                cursor: pointer;
            }

            .caret {
                margin-right: 8px;

                svg {
                    fill: var(--app-text-color);
                    margin-bottom: 1px;
                    transition: transform .24s;
                }

                &.up svg {
                    margin-bottom: 2px;
                    transform: rotate(180deg);
                }
            }
        }

        .loc-opts {
            display: flex;
            align-items: center;
        }

        .loc-opt {
            display: inline-block;
            cursor: pointer;
            font-size: 13px;

            & + .loc-opt {
                margin-left: 8px;
            }

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &.sub { margin-left: 16px; }
}
</style>
<script>
import { mapState } from 'vuex'
import { CaretIcon } from "../components/icons"
export default {
    name: 'location-item',
    props: ['item', 'parent', 'subs', 'depth'],
    components: { CaretIcon },
    data: () => ({
        showSubs: false
    }),
    computed: {
        ...mapState({
            user: state => state.user
        }),
        isSuper() { return this.user && this.user.isSuper },
        locationType() {
            return `${(this.depth == 0 ? 'continent' : this.depth == 1 ? 'country' : this.depth == 2 ? 'state' : 'city')}`
        }
    },
    methods: {
        toggleSubs() {
            this.showSubs = !this.showSubs
            this.setCollapse(this.item, this.locationType, this.showSubs)
        },
        setCollapse(item, type, collapse) {
            this.$emit('collapse', item, type, collapse)
        },
        toSetup(id) {
            this.$emit('onSetup', id)
        },
        toMapper(id) {
            this.$emit('onMapper', id)
        },
        add(id, item) {
            this.$emit('onAdd', id, item)
        },
        edit(id) {
            this.$emit('onEdit', id)
        },
        del(id) {
            this.$emit('onDel', id)
        }
    },
    created() {
        this.showSubs = this.item.collapsed
    }
}
</script>