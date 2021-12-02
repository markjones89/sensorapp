<template>
    <div class="report-wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data: () => ({
        backendAuthInterval: null
    }),
    computed: {
        ...mapState({
            authToken: state => state.backend.authToken
        })
    },
    methods: {
        ...mapMutations({
            setAPIInfo: 'user/setAPIInfo',
            setAPIUrl: 'backend/setAPIUrl'
        }),
        async doBackendAuth(credentials) {
            this.setAPIInfo(credentials)
            await this.$store.dispatch('doBackendAuth')
            this.doAuthInterval()
        },
        async doAuthInterval() {
            this.backendAuthInterval = setInterval(async () => {
                await this.$store.dispatch('doBackendAuth')
            }, 10 * (60 * 60 * 1000))
        },
        clearAuthInterval() {
            if (this.backendAuthInterval) clearInterval(this.backendAuthInterval)
        }
    },
    created() {
        this.setAPIUrl(process.env.MIX_SENSOR_API)
    },
    destroyed() {
        this.clearAuthInterval()
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

.report-wrapper {
    font-family: Roboto, sans-serif;
    position: relative;
    min-height: 100vh;
    color: #000;
    background-color: #eee;

    .report {
        height: 100%;
    }

    .report-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        align-content: center;
        color: #fff;
        line-height: 48px;
        background-color: #32313d;
        z-index: 1;

        .report-name {
            padding: 0 16px;
            font-weight: 500;
        }
    }

    .report-content {
        position: relative;
        min-height: calc(100% - 48px);
        padding-top: 48px;

        .rpt-container {
            background-color: #fff;
        }

        .rpt-loading {
            position: relative;
            height: calc(100vh - 48px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 1.2em;
            color: grey;
            pointer-events: none;

            span {
                margin-top: 16px;
            }
        }

        .rpt-error {
            position: relative;
            height: calc(100vh - 48px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 1.2em;
            color: grey;
        }

        .rpt-cover {
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: space-between;
            position: relative;
            padding: 64px 8px;
            height: 600px;

            .cover-logo {
                flex: 1 auto;
                display: flex;
                justify-content: center;

                img {
                    max-width: 90%;
                    pointer-events: none;
                }
            }

            .cover-box {
                width: 50%;
                padding: 16px;
                color: #fff;
                background-color: #32313d;
                -webkit-print-color-adjust: exact;

                h1 {
                    margin-bottom: 32px;
                }

                span {
                    display: block;
                    margin-top: 32px;
                }
            }
        }
    }
}
</style>