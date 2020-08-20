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
                <a class="loc-opt" @click="add(item.hid || parent, item, depth)" v-if="!isBuilding">Add</a>
                <template v-if="isBuilding">
                    <a class="loc-opt" @click="toSetup(item.hid)">Setup</a>
                    <a class="loc-opt" @click="toMapper(item.hid)">Mapper</a>
                </template>
                <template v-if="item.hid">
                    <a class="loc-opt" @click="edit(item.hid)">Edit</a>
                    <a class="loc-opt" @click="del(item.hid)">Remove</a>
                </template>
            </div>
        </div>
        <div class="subs" v-if="showSubs">
            <location-item v-for="s in subs" :key="s.name"
                :item="s" :subs="s.children" :depth="depth + 1" :parent="item.hid || parent"
                @onAdd="add" @onEdit="edit" @onDel="del" @onSetup="toSetup" @onMapper="toMapper"></location-item>
        </div>
    </div>
</template>
<style lang="scss">
.location {
    .info {
        position: relative;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        border-radius: 8px;
        transition: background-color .24s linear;

        &:hover {
            background-color: rgba($color: #ffffff, $alpha: 0.04);
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
                    fill: #ffffff;
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
import { CaretIcon } from "../components/icons"
export default {
    name: 'location-item',
    props: ['item', 'parent', 'subs', 'depth'],
    components: { CaretIcon },
    data() {
        return {
            showSubs: false
        }
    },
    computed: {
        isBuilding() {
            return this.depth === 4
        }
    },
    methods: {
        toggleSubs() {
            if (this.subs && this.subs.length > 0) this.showSubs = !this.showSubs
        },
        toSetup(id) {
            this.$emit('onSetup', id)
        },
        toMapper(id) {
            this.$emit('onMapper', id)
        },
        add(id, item, depth) {
            this.$emit('onAdd', id, item, depth)
        },
        edit(id) {
            this.$emit('onEdit', id)
        },
        del(id) {
            this.$emit('onDel', id)
        }
    }
}
</script>