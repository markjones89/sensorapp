<template>
    <div id="app-login">
        <div id="login-wrapper">
            <h1>Login</h1>
            <div class="input-field">
                <label>Email</label>
                <input type="text" v-model="email" placeholder="Email" @keydown="inputKeydown" autofocus :disabled="loggingIn">
            </div>
            <div class="input-field">
                <label>Password</label>
                <input type="password" v-model="password" placeholder="Password" @keydown="inputKeydown" :disabled="loggingIn">
            </div>
            <button class="btn btn-primary btn-block" @click="login" :disabled="loggingIn">{{loggingIn ? 'Logging in...' : 'Login'}}</button>
        </div>
    </div>
</template>
<script>
import { getBaseUrl, getUrlParam } from '../helpers'
export default {
    data() {
        return {
            email: null, password: null, remember: false, loggingIn: false, redirectTo: null
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() }
    },
    methods: {
        async login() {
            this.loggingIn = true;
            axios.post('/login/auth', { email: this.email, password: this.password })
                .then(res => {
                    let data = res.data
                    // this.loggingIn = false

                    if (data.r) 
                        window.location = this.redirectTo === '' ? `${this.baseUrl}/` : `${this.baseUrl}/${this.redirectTo}`
                    else {
                        // alert(data.m)
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
    created() {
        this.redirectTo = getUrlParam('to')
    }
}
</script>