<template>
    <div class="content">
        <h1>Profile</h1>
        <div class="info-panel">
            <div class="info-section user-photo">
                <img :src="photoUrl">
                <button class="btn btn-primary" @click="toggleUpPhoto(true)">Change Photo</button>
                <input type="file" ref="photoFile" hidden accept="image/*" @change="photoFileChange" />
            </div>
            <div class="info-section user-info">
                <h2>Account Details</h2>
                <div class="info-group">
                    <span class="label">Name</span>
                    <span class="detail">{{ user.name }}</span>
                </div>
                <div class="info-group">
                    <span class="label">Email</span>
                    <span class="detail">{{ user.email }}</span>
                </div>
                <div class="info-group">
                    <span class="label">Role</span>
                    <span class="detail">{{ user.role.name }}</span>
                </div>
            </div>
            <div class="info-section user-security">
                <h2>Account Security</h2>
                <button class="btn btn-primary" @click="toggleChangePass(true)">Change Password</button>
            </div>
        </div>
        <modal :show="showUpload" @close="toggleUpPhoto(false)">
            <template v-slot:header>
                <h2>Change Photo</h2>
            </template>
            <div class="cropper-wrapper" :style="{ height: `${cropperHeight}px` }" ref="cropperWrap">
                <loader type="spinner" :show="state.img_loading" />
                <div class="cropper-opt" @click="upPhoto" v-if="!selected_photo">
                    Click to select a photo...
                </div>
                <div class="photo-preview" v-if="photoPreview" title="Preview">
                    <img :src="photoPreview">
                </div>
                <cropper classname="cropper"
                    stencil-component="circle-stencil"
                    :src="selected_photo"
                    :stencil-props="{ aspectRatio: 1/1 }"
                    @ready="imageReady"
                    @change="imageCropped"></cropper>
            </div>
            <template v-slot:footer>
                <button class="btn" @click="upPhoto" id="select-btn" v-if="selected_photo && !state.uploading">Select another photo</button>
                <button class="btn btn-primary" @click="uploadPhoto" :disabled="state.uploading || !photo" id="upload-btn">{{ state.uploading ? 'Uploading...' : 'Upload'}}</button>
            </template>
        </modal>
        <modal :show="showChangePass" @close="toggleChangePass(false)">
            <template v-slot:header>
                <h2>Change Password</h2>
            </template>
            <div id="change-pass-entry">
                <div class="input-field">
                    <label>Current Password</label>
                    <input type="password" v-model="cPass" ref="cPass">
                </div>
                <div class="input-field">
                    <label>New Password</label>
                    <input type="password" v-model="nPass">
                </div>
                <div class="input-field">
                    <label>Confirm New Password</label>
                    <input type="password" v-model="nPassConfirm">
                    <span class="input-error" v-if="nPassNotMatched">Password does not match</span>
                </div>
            </div>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="doChangePass" :disabled="state.changingPass || !canUpdatePass">{{ state.changingPass ? 'Changing...' : 'Change'}}</button>
            </template>
        </modal>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { addEvent, getBaseUrl, removeEvent } from '@/helpers'
import { Modal, Loader } from '@/components'
import { Cropper } from 'vue-advanced-cropper'

const api = '/api/users'

export default {
    title: 'Profile',
    components: { Cropper, Loader, Modal },
    data: () => ({
        photo: null, photoPreview: null, selected_photo: null,
        showUpload: false, cropperHeight: 500,
        showChangePass: false,
        cPass: '', nPass: '', nPassConfirm: '',
        state: {
            uploading: false, img_loading: false, changingPass: false
        }
    }),
    computed: {
        ...mapState({
            user: state => state.user.info
        }),
        baseUrl() { return getBaseUrl() },
        photoUrl() {
            return this.user && this.user.photo ? `${this.baseUrl}/storage/user-photos/${this.user.photo}` : 
                `${this.baseUrl}/images/user0001.jpg`
        },
        nPassNotMatched() {
            let newPass = this.nPass.trim(),
                newPassConfirm = this.nPassConfirm.trim()

            return newPass != '' && newPassConfirm != '' && newPass != newPassConfirm
        },
        canUpdatePass() {
            let newPass = this.nPass.trim(),
                newPassConfirm = this.nPassConfirm.trim()
            return this.cPass.trim() != '' && newPass != '' && newPassConfirm != '' && newPass == newPassConfirm
        }
    },
    methods: {
        ...mapMutations({
            setUserPhoto: 'user/setUserPhoto'
        }),
        imageReady() { this.state.img_loading = false },
        imageCropped({canvas}) {
            this.photo = canvas
            this.photoPreview = canvas.toDataURL()
        },
        toggleUpPhoto(show) { 
            this.showUpload = show 
            
            if (show) {
                setTimeout(() => {
                    this.calcCropperHeight()
                }, 0)
                this.selected_photo = null
                this.photo = null
                this.photoPreview = null
            }
        },
        upPhoto() { this.$refs.photoFile.click() },
        photoFileChange() {
            let _ = this, file = _.$refs.photoFile.files[0]
            
            if (file) {
                let reader = new FileReader()

                this.state.img_loading = true
                reader.onload = (e) => {
                    _.selected_photo = e.target.result
                }
                reader.readAsDataURL(file);
            }
        },
        uploadPhoto() {
            let _ = this

            _.photo.toBlob(blob => {
                let formData = new window.FormData()

                formData.append('photo', blob)

                _.state.uploading = true
                axios.post(`${api}/photo/${_.user.hid}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(x => {
                    _.state.uploading = false
                    let res = x.data

                    if (res.r) {
                        this.setUserPhoto(res.photo)
                        _.toggleUpPhoto(false)
                    }
                })
            }, 'image/jpeg')
        },
        calcCropperHeight() {
            if (!this.showUpload) return

            let minHeight = 300, wrapper = this.$refs.cropperWrap,
                rect = wrapper.getBoundingClientRect(),
                height = rect.width * 0.5

            this.cropperHeight = height < minHeight ? minHeight : height
        },
        toggleChangePass(show) {
            this.showChangePass = show

            if (show) {
                this.cPass = ''
                this.nPass = ''
                this.nPassConfirm = ''
                setTimeout(() => { this.$refs.cPass.focus() }, 10)
            }
        },
        async doChangePass() {
            let currPass = this.cPass.trim(),
                newPass = this.nPass.trim()

            if (!this.canUpdatePass) return

            this.state.changingPass = true
            let _data = {
                current: currPass,
                password: newPass
            }
            let { data } = await axios.put(`${api}/change-pass/${this.user.hid}`, _data)

            if (data.r) this.toggleChangePass(false)

            this.$mdtoast(data.m, { type: data.r ? 'success' : 'error', interaction: true, interactionTimeout: 5000 })
            this.state.changingPass = false
        }
    },
    mounted() {
        addEvent(window, 'resize', this.calcCropperHeight)
    },
    destroyed() {
        removeEvent(window, 'resize', this.calcCropperHeight)
    }
}
</script>


<style lang="scss" scoped>
.info-panel {
    display: flex;
    flex-direction: column;
    padding-top: 32px;

    .info-section {
        padding: 24px 32px;

        h2 {
            margin-bottom: 24px;
        }
    }

    .user-photo {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        user-select: none;
        overflow: hidden;

        img {
            height: 200px;
            width: 200px;
            border-radius: 50%;
            pointer-events: none;
        }
        
        button {
            margin-top: 16px;
        }
    }

    .user-info {
        .info-group {
            position: relative;

            span {
                display: block;
            }

            .label {
                font-size: 0.9em;
                color: rgba($color: #fff, $alpha: 0.4);
                margin-bottom: 4px;
            }

            .detail {
                font-size: 1.15em;
            }

            & + .info-group {
                margin-top: 18px;
            }
        }
    }
}

.cropper-wrapper {
    position: relative;
    width: 1000px;
    max-width: 100%;

    .photo-preview {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #2B2B2B;
        border: 1px dashed hsla(0,0%,100%,.5);
        border-radius: 50%;
        overflow: hidden;
        z-index: 1;

        img {
            height: 150px;
            width: 150px;
        }
    }

    .cropper {
        overflow: hidden;
    }

    .cropper-opt {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: grey;
        font-size: 1.35em;
        user-select: none;
        border-radius: 10px;
        border: 1px dashed rgba(255, 255, 255, .1);
        background-color: rgba($color: #393939, $alpha: 0.15);
    }
}

#select-btn {
    float: left;
    margin-top: 24px;
}

#upload-btn {
    margin-top: 24px;
}

#change-pass-entry {
    width: 300px;
}

@media (min-width: 992px) {
    .info-panel {
        flex-direction: row;
    }
}
</style>