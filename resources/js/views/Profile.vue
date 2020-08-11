<template>
    <div class="content">
        <h1>Profile</h1>
        <div class="user-photo">
            <img :src="photoUrl">
            <div class="photo-opt" @click="toggleUpPhoto(true)">Change</div>
            <input type="file" ref="photoFile" hidden accept="image/*" @change="photoFileChange" />
        </div>
        <modal :show="showUpload" @close="toggleUpPhoto(false)">
            <template v-slot:header>
                <h2>Change Photo</h2>
            </template>
            <div class="cropper-wrapper">
                <loader type="spinner" :show="state.img_loading" />
                <div class="cropper-opt" @click="upPhoto" v-if="!selected_photo">
                    Click to select a photo...
                </div>
                <cropper classname="cropper"
                    stencil-component="circle-stencil"
                    :src="selected_photo"
                    :stencil-props="{ aspectRatio: 1/1 }"
                    @ready="imageReady"
                    @change="imageCropped"></cropper>
            </div>
            <template v-slot:footer>
                <button class="btn" @click="upPhoto" id="select-btn" v-if="selected_photo">Select another photo</button>
                <button class="btn btn-primary" @click="uploadPhoto" :disabled="state.uploading || !photo" id="upload-btn">{{ state.uploading ? 'Uploading...' : 'Upload'}}</button>
            </template>
        </modal>
    </div>
</template>
<style lang="scss" scoped>
.user-photo {
    position: relative;
    display: inline-flex;
    border-radius: 50%;
    overflow: hidden;

    img {
        height: 200px;
        width: 200px;
    }

    .photo-opt {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        visibility: hidden;
        opacity: 0;
        transform: scale(1.2);
        background-color: rgba($color: #2B2B2B, $alpha: 0.9);
        transition: visibility .24s, opacity .24s, transform .24s;
    }

    &:hover .photo-opt {
        visibility: visible;
        opacity: 1;
        transform: scale(1);
    }
}
.cropper-wrapper {
    position: relative;
    height: 380px;
    width: 720px;
    max-width: 100%;

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
</style>
<script>
import { store } from '../store'
import { getBaseUrl } from '../helpers'
import { Modal, Loader } from '../components'
import { Cropper } from 'vue-advanced-cropper'

const api = '/api/users'

export default {
    title: 'Profile',
    components: { Cropper, Loader, Modal },
    data() {
        return {
            user: null, photo: null, selected_photo: null,
            showUpload: false,
            state: {
                uploading: false, img_loading: false
            }
        }
    },
    computed: {
        baseUrl() { return getBaseUrl() },
        photoUrl() {
            return this.user && this.user.photo ? `${this.baseUrl}/storage/user-photos/${this.user.photo}` : 
                `${this.baseUrl}/images/user0001.jpg`
        }
    },
    methods: {
        imageReady() { this.state.img_loading = false },
        imageCropped({canvas}) { this.photo = canvas },
        toggleUpPhoto(show) { 
            this.showUpload = show 
            
            if (show) {
                this.selected_photo = null
                this.photo = null
            }
        },
        upPhoto() {
            this.$refs.photoFile.click()
        },
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
                        store.setUserPhoto(res.photo)
                        _.toggleUpPhoto(false)
                    }
                })
            }, 'image/jpeg')
        }
    },
    mounted() {
        this.user = store.getUser()
    }
}
</script>