<template>
    <div id="app-login" v-if="state.loaded">
        <div id="login-wrapper" v-if="state.resetMode">
            <h1>Reset password for</h1>
            <h2>{{ user.email }}</h2>
            <template v-if="state.resetDone">
                <p>Your password has been successfully changed!</p>
                <router-link to='/login' class="btn btn-primary">Go to login</router-link>
            </template>
            <template v-else>
                <div class="input-field">
                    <label>New Password</label>
                    <input type="password" v-model="newPass" placeholder="New Password" @keydown="inputKeydown" autofocus :disabled="state.changing">
                </div>
                <div class="input-field">
                    <label>Confirm Password</label>
                    <input type="password" v-model="newPassConfirm" placeholder="Confirm Password" @keydown="inputKeydown" autofocus :disabled="state.changing">
                </div>
                <button class="btn btn-primary btn-block" @click="changePass" :disabled="state.changing">{{ state.changing ? 'Changing password...' : 'Change password'}}</button>
            </template>
        </div>
        <div id="login-wrapper" v-else>
            <template v-if="state.linkSent">
                <h1>Reset link sent</h1>
                <p>Kindly check your email for the reset link.</p>
                <router-link to='/login' class="btn btn-primary">Go to login</router-link>
            </template>
            <template v-else>
                <h1>Reset your password</h1>
                <div class="input-field">
                    <label>Verified account's email</label>
                    <input type="text" v-model="email" placeholder="Email" @keydown="inputKeydown" autofocus :disabled="state.sending">
                </div>
                <button class="btn btn-primary btn-block" @click="sendReset" :disabled="state.sending">{{ state.sending ? 'Sending reset link...' : 'Send reset link'}}</button>
            </template>
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
#login-wrapper {
    h1 {
        margin-bottom: 8px !important;
    }
    h2 {
        text-align: center;
        margin-bottom: 24px;
    }
}
</style>
<script>
const userApi = '/api/users'
export default {
    props: ['uid'],
    data: () => ({
        user: null, email: '', password: '', newPass: '', newPassConfirm: '',
        state: {
            loaded: false, 
            sending: false, changing: false, 
            linkSent: false, resetMode: false, resetDone: false
        }
    }),
    methods: {
        async sendReset() {
            this.state.sending = true
            let { data } = await axios.post('/reset/send-link', { email: this.email })
            
            this.state.sending = false
            this.state.linkSent = data.r
            this.$mdtoast(data.m, { type: data.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
        },
        async changePass() {
            let np = this.newPass.trim(), npc = this.newPassConfirm.trim()

            if (np !== npc) {
                this.$mdtoast('Password confirmation doesn\'t match', { type: 'warning', interaction: true, interactionTimeout: 5000 })
            } else {
                this.state.changing = true
                let { data } = await axios.put(`${userApi}/change-pass/${this.uid}`, { password: np })

                this.state.changing = false
                this.state.resetDone = data.r
                this.$mdtoast(data.m, { type: data.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
            }
        },
        inputKeydown(e) {
            if (e.keyCode === 13) {
                if (this.state.resetMode) this.changePass()
                else this.sendReset()
            }
        }
    },
    async created() {
        this.state.resetMode = this.uid !== null && typeof this.uid !== 'undefined'

        console.log('uid', this.uid, this.state.resetMode)
        if (this.uid) {
            let { data } = await axios.get(`${userApi}/${this.uid}`)
        
            this.user = data

            console.log('user', data)
        }
        this.state.loaded = true
    }
}
</script>