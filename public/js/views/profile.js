(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{110:function(t,e,o){"use strict";var r=o(30);o.n(r).a},111:function(t,e,o){(t.exports=o(7)(!1)).push([t.i,".info-panel[data-v-79f26f07]{padding-top:32px}.info-panel .user-photo[data-v-79f26f07]{position:relative;display:inline-flex;flex-direction:column;justify-content:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden}.info-panel .user-photo img[data-v-79f26f07]{height:200px;width:200px;border-radius:50%;pointer-events:none}.info-panel .user-photo button[data-v-79f26f07]{margin-top:16px}.cropper-wrapper[data-v-79f26f07]{position:relative;width:1000px;max-width:100%}.cropper-wrapper .photo-preview[data-v-79f26f07]{position:absolute;bottom:0;right:0;display:flex;flex-direction:column;justify-content:center;background-color:#2b2b2b;border:1px dashed hsla(0,0%,100%,.5);border-radius:50%;overflow:hidden;z-index:1}.cropper-wrapper .photo-preview img[data-v-79f26f07]{height:150px;width:150px}.cropper-wrapper .cropper[data-v-79f26f07]{overflow:hidden}.cropper-wrapper .cropper-opt[data-v-79f26f07]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;cursor:pointer;color:grey;font-size:1.35em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:10px;border:1px dashed hsla(0,0%,100%,.1);background-color:rgba(57,57,57,.15)}#select-btn[data-v-79f26f07]{float:left}#select-btn[data-v-79f26f07],#upload-btn[data-v-79f26f07]{margin-top:24px}",""])},220:function(t,e,o){"use strict";o.r(e);var r=o(4),n=o(5),i=o(2),a=o(54),s={title:"Profile",components:{Cropper:a.a,Loader:i.e,Modal:i.g},data:function(){return{user:null,photo:null,photoPreview:null,selected_photo:null,showUpload:!1,cropperHeight:500,state:{uploading:!1,img_loading:!1}}},computed:{baseUrl:function(){return Object(n.c)()},photoUrl:function(){return this.user&&this.user.photo?"".concat(this.baseUrl,"/storage/user-photos/").concat(this.user.photo):"".concat(this.baseUrl,"/images/user0001.jpg")}},methods:{imageReady:function(){this.state.img_loading=!1},imageCropped:function(t){var e=t.canvas;this.photo=e,this.photoPreview=e.toDataURL()},toggleUpPhoto:function(t){var e=this;this.showUpload=t,t&&(setTimeout((function(){e.calcCropperHeight()}),0),this.selected_photo=null,this.photo=null,this.photoPreview=null)},upPhoto:function(){this.$refs.photoFile.click()},photoFileChange:function(){var t=this,e=t.$refs.photoFile.files[0];if(e){var o=new FileReader;this.state.img_loading=!0,o.onload=function(e){t.selected_photo=e.target.result},o.readAsDataURL(e)}},uploadPhoto:function(){var t=this;t.photo.toBlob((function(e){var o=new window.FormData;o.append("photo",e),t.state.uploading=!0,axios.post("".concat("/api/users","/photo/").concat(t.user.hid),o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.state.uploading=!1;var o=e.data;o.r&&(r.a.setUserPhoto(o.photo),t.toggleUpPhoto(!1))}))}),"image/jpeg")},calcCropperHeight:function(){if(this.showUpload){var t=.5*this.$refs.cropperWrap.getBoundingClientRect().width;this.cropperHeight=t<300?300:t}}},mounted:function(){this.user=r.a.getUser(),Object(n.a)(window,"resize",this.calcCropperHeight)},destroyed:function(){Object(n.g)(window,"resize",this.calcCropperHeight)}},p=(o(110),o(3)),l=Object(p.a)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content"},[o("h1",[t._v("Profile")]),t._v(" "),o("div",{staticClass:"info-panel"},[o("div",{staticClass:"user-photo"},[o("img",{attrs:{src:t.photoUrl}}),t._v(" "),o("button",{staticClass:"btn btn-primary",on:{click:function(e){return t.toggleUpPhoto(!0)}}},[t._v("Change Photo")]),t._v(" "),o("input",{ref:"photoFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.photoFileChange}})])]),t._v(" "),o("modal",{attrs:{show:t.showUpload},on:{close:function(e){return t.toggleUpPhoto(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[o("h2",[t._v("Change Photo")])]},proxy:!0},{key:"footer",fn:function(){return[t.selected_photo&&!t.state.uploading?o("button",{staticClass:"btn",attrs:{id:"select-btn"},on:{click:t.upPhoto}},[t._v("Select another photo")]):t._e(),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.uploading||!t.photo,id:"upload-btn"},on:{click:t.uploadPhoto}},[t._v(t._s(t.state.uploading?"Uploading...":"Upload"))])]},proxy:!0}])},[t._v(" "),o("div",{ref:"cropperWrap",staticClass:"cropper-wrapper",style:{height:t.cropperHeight+"px"}},[o("loader",{attrs:{type:"spinner",show:t.state.img_loading}}),t._v(" "),t.selected_photo?t._e():o("div",{staticClass:"cropper-opt",on:{click:t.upPhoto}},[t._v("\n                Click to select a photo...\n            ")]),t._v(" "),t.photoPreview?o("div",{staticClass:"photo-preview",attrs:{title:"Preview"}},[o("img",{attrs:{src:t.photoPreview}})]):t._e(),t._v(" "),o("cropper",{attrs:{classname:"cropper","stencil-component":"circle-stencil",src:t.selected_photo,"stencil-props":{aspectRatio:1}},on:{ready:t.imageReady,change:t.imageCropped}})],1)])],1)}),[],!1,null,"79f26f07",null);e.default=l.exports},30:function(t,e,o){var r=o(111);"string"==typeof r&&(r=[[t.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o(8)(r,n);r.locals&&(t.exports=r.locals)}}]);