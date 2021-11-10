<template>
    <div id="app-verify">
        <div id="verify-wrapper">
            <h1>Account Verification</h1>
            <div id="verified" v-if="verified">
                <p>Account verification successful! You can now use your account.</p>
                <a :href="`${baseUrl}/login`" class="btn btn-primary">Continue to login</a>
            </div>
            <template v-else>
                <p>To finish the verification process, kindly enter your new password and the security code provided in the invitation email.</p>
                <div class="input-field">
                    <label>New Password</label>
                    <input type="password" v-model="pass" autofocus>
                </div>
                <div class="input-field">
                    <label>Confirm Password</label>
                    <input type="password" v-model="confPass">
                </div>
                <div class="input-field">
                    <label>Security Code</label>
                    <input type="text" v-model="securityCode">
                </div>
                <button class="btn btn-primary" @click="verify" :disabled="state.verifying || !canVerify">{{ state.verifying ? 'Verifying...' : 'Verify' }}</button>
            </template>
        </div>
    </div>
</template>

<script>
import { getBaseUrl, getUrlParam } from '@/helpers'

const userApi = '/api/users'

export default {
    title: 'Account Verification',
    data: () => ({
        securityCode: '', pass: '', confPass: '', verified: false,
        state: { verifying: false }
    }),
    computed: {
        baseUrl() { return getBaseUrl() },
        uid() { return getUrlParam('uid') },
        verifyUrl() { return `${userApi}/verify/${this.uid}` },
        canVerify() {
            return this.securityCode !== '' && this.pass !== '' && (this.pass === this.confPass)
        }
    },
    methods: {
        toggleVerify(verifying) { this.state.verifying = verifying },
        async verify(callback) {
            this.toggleVerify(true)
            axios.put(this.verifyUrl, {
                security_code: this.securityCode,
                password: this.pass
            }).then(x => {
                this.toggleVerify(false)
                let res = x.data

                if (res.r) {
                    this.verified = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#app-verify {
    padding: 92px 0;
    width: 100%;

    #verify-wrapper {
        width: 340px;
        margin: 0 auto;
        background-color: #282737;
        padding: 24px;
        border-radius: 10px;

        h1 {
            margin-bottom: 24px;
            text-align: center;
        }

        #verified {
            text-align: center;
        }
    }
}
</style>