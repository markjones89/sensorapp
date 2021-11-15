(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{134:function(t,e,o){"use strict";o(56)},135:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,".info-panel[data-v-2f914a6c]{display:flex;flex-direction:column;padding-top:32px}.info-panel .info-section[data-v-2f914a6c]{padding:24px 32px}.info-panel .info-section h2[data-v-2f914a6c]{margin-bottom:24px}.info-panel .user-photo[data-v-2f914a6c]{position:relative;display:inline-flex;flex-direction:column;justify-content:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden}.info-panel .user-photo img[data-v-2f914a6c]{height:200px;width:200px;border-radius:50%;pointer-events:none}.info-panel .user-photo button[data-v-2f914a6c]{margin-top:16px}.info-panel .user-info .info-group[data-v-2f914a6c]{position:relative}.info-panel .user-info .info-group span[data-v-2f914a6c]{display:block}.info-panel .user-info .info-group .label[data-v-2f914a6c]{font-size:.9em;color:hsla(0,0%,100%,.4);margin-bottom:4px}.info-panel .user-info .info-group .detail[data-v-2f914a6c]{font-size:1.15em}.info-panel .user-info .info-group+.info-group[data-v-2f914a6c]{margin-top:18px}.cropper-wrapper[data-v-2f914a6c]{position:relative;width:1000px;max-width:100%}.cropper-wrapper .photo-preview[data-v-2f914a6c]{position:absolute;bottom:0;right:0;display:flex;flex-direction:column;justify-content:center;background-color:#2b2b2b;border:1px dashed hsla(0,0%,100%,.5);border-radius:50%;overflow:hidden;z-index:1}.cropper-wrapper .photo-preview img[data-v-2f914a6c]{height:150px;width:150px}.cropper-wrapper .cropper[data-v-2f914a6c]{overflow:hidden}.cropper-wrapper .cropper-opt[data-v-2f914a6c]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;cursor:pointer;color:grey;font-size:1.35em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:10px;border:1px dashed hsla(0,0%,100%,.1);background-color:rgba(57,57,57,.15)}#select-btn[data-v-2f914a6c]{float:left}#select-btn[data-v-2f914a6c],#upload-btn[data-v-2f914a6c]{margin-top:24px}#change-pass-entry[data-v-2f914a6c]{width:300px}@media (min-width:992px){.info-panel[data-v-2f914a6c]{flex-direction:row}}",""])},300:function(t,e,o){"use strict";o.r(e);var a=o(1),s=o.n(a),n=o(5),r=o(0),i=o(4),c=o(66);function p(t,e,o,a,s,n,r){try{var i=t[n](r),c=i.value}catch(t){return void o(t)}i.done?e(c):Promise.resolve(c).then(a,s)}function l(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function u(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?l(Object(o),!0).forEach((function(e){d(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function d(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var h="/api/users",f={title:"Profile",components:{Cropper:c.a,Loader:i.f,Modal:i.h},data:function(){return{photo:null,photoPreview:null,selected_photo:null,showUpload:!1,cropperHeight:500,showChangePass:!1,cPass:"",nPass:"",nPassConfirm:"",state:{uploading:!1,img_loading:!1,changingPass:!1}}},computed:u(u({},Object(n.d)({user:function(t){return t.user}})),{},{baseUrl:function(){return Object(r.g)()},photoUrl:function(){return this.user&&this.user.photo?"".concat(this.baseUrl,"/storage/user-photos/").concat(this.user.photo):"".concat(this.baseUrl,"/images/user0001.jpg")},nPassNotMatched:function(){var t=this.nPass.trim(),e=this.nPassConfirm.trim();return""!=t&&""!=e&&t!=e},canUpdatePass:function(){var t=this.nPass.trim(),e=this.nPassConfirm.trim();return""!=this.cPass.trim()&&""!=t&&""!=e&&t==e}}),methods:u(u({},Object(n.c)(["setUserPhoto"])),{},{imageReady:function(){this.state.img_loading=!1},imageCropped:function(t){var e=t.canvas;this.photo=e,this.photoPreview=e.toDataURL()},toggleUpPhoto:function(t){var e=this;this.showUpload=t,t&&(setTimeout((function(){e.calcCropperHeight()}),0),this.selected_photo=null,this.photo=null,this.photoPreview=null)},upPhoto:function(){this.$refs.photoFile.click()},photoFileChange:function(){var t=this,e=t.$refs.photoFile.files[0];if(e){var o=new FileReader;this.state.img_loading=!0,o.onload=function(e){t.selected_photo=e.target.result},o.readAsDataURL(e)}},uploadPhoto:function(){var t=this,e=this;e.photo.toBlob((function(o){var a=new window.FormData;a.append("photo",o),e.state.uploading=!0,axios.post("".concat(h,"/photo/").concat(e.user.hid),a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(o){e.state.uploading=!1;var a=o.data;a.r&&(t.setUserPhoto(a.photo),e.toggleUpPhoto(!1))}))}),"image/jpeg")},calcCropperHeight:function(){if(this.showUpload){var t=.5*this.$refs.cropperWrap.getBoundingClientRect().width;this.cropperHeight=t<300?300:t}},toggleChangePass:function(t){var e=this;this.showChangePass=t,t&&(this.cPass="",this.nPass="",this.nPassConfirm="",setTimeout((function(){e.$refs.cPass.focus()}),10))},doChangePass:function(){var t,e=this;return(t=s.a.mark((function t(){var o,a,n,r,i;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=e.cPass.trim(),a=e.nPass.trim(),e.canUpdatePass){t.next=3;break}return t.abrupt("return");case 3:return e.state.changingPass=!0,n={current:o,password:a},t.next=7,axios.put("".concat(h,"/change-pass/").concat(e.user.hid),n);case 7:r=t.sent,(i=r.data).r&&e.toggleChangePass(!1),e.$mdtoast(i.m,{type:i.r?"success":"error",interaction:!0,interactionTimeout:5e3}),e.state.changingPass=!1;case 12:case"end":return t.stop()}}),t)})),function(){var e=this,o=arguments;return new Promise((function(a,s){var n=t.apply(e,o);function r(t){p(n,a,s,r,i,"next",t)}function i(t){p(n,a,s,r,i,"throw",t)}r(void 0)}))})()}}),mounted:function(){Object(r.a)(window,"resize",this.calcCropperHeight)},destroyed:function(){Object(r.t)(window,"resize",this.calcCropperHeight)}},v=(o(134),o(3)),g=Object(v.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content"},[o("h1",[t._v("Profile")]),t._v(" "),o("div",{staticClass:"info-panel"},[o("div",{staticClass:"info-section user-photo"},[o("img",{attrs:{src:t.photoUrl}}),t._v(" "),o("button",{staticClass:"btn btn-primary",on:{click:function(e){return t.toggleUpPhoto(!0)}}},[t._v("Change Photo")]),t._v(" "),o("input",{ref:"photoFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.photoFileChange}})]),t._v(" "),o("div",{staticClass:"info-section user-info"},[o("h2",[t._v("Account Details")]),t._v(" "),o("div",{staticClass:"info-group"},[o("span",{staticClass:"label"},[t._v("Name")]),t._v(" "),o("span",{staticClass:"detail"},[t._v(t._s(t.user.name))])]),t._v(" "),o("div",{staticClass:"info-group"},[o("span",{staticClass:"label"},[t._v("Email")]),t._v(" "),o("span",{staticClass:"detail"},[t._v(t._s(t.user.email))])]),t._v(" "),o("div",{staticClass:"info-group"},[o("span",{staticClass:"label"},[t._v("Role")]),t._v(" "),o("span",{staticClass:"detail"},[t._v(t._s(t.user.role.name))])])]),t._v(" "),o("div",{staticClass:"info-section user-security"},[o("h2",[t._v("Account Security")]),t._v(" "),o("button",{staticClass:"btn btn-primary",on:{click:function(e){return t.toggleChangePass(!0)}}},[t._v("Change Password")])])]),t._v(" "),o("modal",{attrs:{show:t.showUpload},on:{close:function(e){return t.toggleUpPhoto(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[o("h2",[t._v("Change Photo")])]},proxy:!0},{key:"footer",fn:function(){return[t.selected_photo&&!t.state.uploading?o("button",{staticClass:"btn",attrs:{id:"select-btn"},on:{click:t.upPhoto}},[t._v("Select another photo")]):t._e(),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.uploading||!t.photo,id:"upload-btn"},on:{click:t.uploadPhoto}},[t._v(t._s(t.state.uploading?"Uploading...":"Upload"))])]},proxy:!0}])},[t._v(" "),o("div",{ref:"cropperWrap",staticClass:"cropper-wrapper",style:{height:t.cropperHeight+"px"}},[o("loader",{attrs:{type:"spinner",show:t.state.img_loading}}),t._v(" "),t.selected_photo?t._e():o("div",{staticClass:"cropper-opt",on:{click:t.upPhoto}},[t._v("\n                Click to select a photo...\n            ")]),t._v(" "),t.photoPreview?o("div",{staticClass:"photo-preview",attrs:{title:"Preview"}},[o("img",{attrs:{src:t.photoPreview}})]):t._e(),t._v(" "),o("cropper",{attrs:{classname:"cropper","stencil-component":"circle-stencil",src:t.selected_photo,"stencil-props":{aspectRatio:1}},on:{ready:t.imageReady,change:t.imageCropped}})],1)]),t._v(" "),o("modal",{attrs:{show:t.showChangePass},on:{close:function(e){return t.toggleChangePass(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[o("h2",[t._v("Change Password")])]},proxy:!0},{key:"footer",fn:function(){return[o("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.changingPass||!t.canUpdatePass},on:{click:t.doChangePass}},[t._v(t._s(t.state.changingPass?"Changing...":"Change"))])]},proxy:!0}])},[t._v(" "),o("div",{attrs:{id:"change-pass-entry"}},[o("div",{staticClass:"input-field"},[o("label",[t._v("Current Password")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.cPass,expression:"cPass"}],ref:"cPass",attrs:{type:"password"},domProps:{value:t.cPass},on:{input:function(e){e.target.composing||(t.cPass=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"input-field"},[o("label",[t._v("New Password")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.nPass,expression:"nPass"}],attrs:{type:"password"},domProps:{value:t.nPass},on:{input:function(e){e.target.composing||(t.nPass=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"input-field"},[o("label",[t._v("Confirm New Password")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.nPassConfirm,expression:"nPassConfirm"}],attrs:{type:"password"},domProps:{value:t.nPassConfirm},on:{input:function(e){e.target.composing||(t.nPassConfirm=e.target.value)}}}),t._v(" "),t.nPassNotMatched?o("span",{staticClass:"input-error"},[t._v("Password does not match")]):t._e()])])])],1)}),[],!1,null,"2f914a6c",null);e.default=g.exports},56:function(t,e,o){var a=o(135);"string"==typeof a&&(a=[[t.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};o(7)(a,s);a.locals&&(t.exports=a.locals)}}]);