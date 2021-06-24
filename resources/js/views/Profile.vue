<template>
    <div class="content">
        <h1>Profile</h1>
        <div class="info-panel">
            <div class="user-photo">
                <img :src="photoUrl">
                <button class="btn btn-primary" @click="toggleUpPhoto(true)">Change Photo</button>
                <input type="file" ref="photoFile" hidden accept="image/*" @change="photoFileChange" />
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
    </div>
</template>
<style lang="scss" scoped>
.info-panel {
    padding-top: 32px;

    .user-photo {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
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
</style>
<script>
import { mapMutations, mapState } from 'vuex'
import { addEvent, getBaseUrl, removeEvent } from '../helpers'
import { Modal, Loader } from '../components'
import { Cropper } from 'vue-advanced-cropper'

const api = '/api/users'

export default {
    title: 'Profile',
    components: { Cropper, Loader, Modal },
    data() {
        return {
            photo: null, photoPreview: null, selected_photo: null,
            showUpload: false, cropperHeight: 500,
            state: {
                uploading: false, img_loading: false
            }
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        baseUrl() { return getBaseUrl() },
        photoUrl() {
            return this.user && this.user.photo ? `${this.baseUrl}/storage/user-photos/${this.user.photo}` : 
                `${this.baseUrl}/images/user0001.jpg`
        }
    },
    methods: {
        ...mapMutations([
            'setUserPhoto'
        ]),
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
    },
    mounted() {
        addEvent(window, 'resize', this.calcCropperHeight)
    },
    destroyed() {
        removeEvent(window, 'resize', this.calcCropperHeight)
    }
}
</script>