<template>
    <div id="app-login">
        <div id="login-wrapper">
            <h1>Login</h1>
            <div class="input-field">
                <label>Email</label>
                <input type="text" v-model="email" placeholder="Email" @keydown="inputKeydown" ref="email" :disabled="loggingIn">
            </div>
            <div class="input-field">
                <label>Password</label>
                <input type="password" v-model="password" placeholder="Password" @keydown="inputKeydown" :disabled="loggingIn">
                <router-link to="reset" id="forgot-link">Forgot password?</router-link>
            </div>
            <button class="btn btn-primary btn-block" @click="login" :disabled="loggingIn">{{loggingIn ? 'Logging in...' : 'Login'}}</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#app-login {
    padding: 92px 0;
    width: 100%;

    #login-wrapper {
        width: 300px;
        margin: 0 auto;
        background-color: #282737;
        padding: 24px;
        border-radius: 10px;

        h1 {
            margin-bottom: 24px;
            text-align: center;
        }
    }
}
#forgot-link {
    display: inline-block;
    font-size: 13px;
    color: #fefefe;
    padding: 10px 10px 0;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>
<script>
import { getBaseUrl } from '../helpers'
export default {
    data: () => ({
        email: null, password: null, remember: false, loggingIn: false//, redirectTo: null
    }),
    computed: {
        baseUrl() { return getBaseUrl() }
    },
    methods: {
        async login() {
            this.loggingIn = true;
            axios.post('/authenticate', { email: this.email, password: this.password })
                .then(res => {
                    let data = res.data

                    if (data.r) {
                        this.$store.commit('setUser', data.user)
                        this.$store.commit('locations/setClient', data.user.company_id)
                        this.$router.push(this.$route.query.to || '/')
                    }
                    else {
                        this.loggingIn = false
                        this.$mdtoast(data.m, { type: 'error', interaction: true, interactionTimeout: 5000 })
                    }
                })
                .catch(e => {
                    this.loggingIn = false
                    this.$mdtoast('An error occured while trying to login', { type: 'error', interaction: true, interactionTimeout: 5000 })
                })
        },
        inputKeydown(e) {
            if (e.keyCode === 13) this.login()
        }
    },
    mounted() {
        this.$refs.email.focus()
    }
}
</script>