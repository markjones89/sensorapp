(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{135:function(t,e,n){"use strict";n(56)},136:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"#client-list[data-v-7abcc4bf],#client-list #add-btn[data-v-7abcc4bf]{margin-top:24px}.client[data-v-7abcc4bf]{display:flex;font-size:20px;padding:10px;border-radius:10px;transition:background-color .24s linear}.client[data-v-7abcc4bf]:hover{background-color:hsla(0,0%,100%,.025)}.client .client-logo[data-v-7abcc4bf]{position:relative;width:170px;height:68px;overflow:hidden}.client .client-logo .logo-upload-progress[data-v-7abcc4bf]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;font-size:14px;background-color:#2b2b2b;border-radius:10px;z-index:1}.client .client-logo .logo-upload-trigger[data-v-7abcc4bf]{display:flex;justify-content:center;align-items:center;height:calc(100% - 2px);font-size:14px;cursor:pointer;border:1px dashed hsla(0,0%,100%,.1);border-radius:10px}.client .client-logo .logo-holder[data-v-7abcc4bf]{position:relative;height:48px;padding:10px;border-radius:10px;text-align:center;overflow:hidden}.client .client-logo .logo-holder img[data-v-7abcc4bf]{height:100%;width:auto;max-width:100%;pointer-events:none}.client .client-logo .logo-holder .logo-opt[data-v-7abcc4bf]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;cursor:pointer;font-size:14px;visibility:hidden;opacity:0;transform:scale(1.25);background-color:rgba(57,57,57,.8);transition:visibility .24s,opacity .24s,transform .24s}.client .client-logo .logo-holder:hover .logo-opt[data-v-7abcc4bf]{visibility:visible;opacity:1;transform:scale(1)}.client .client-info[data-v-7abcc4bf]{display:flex;align-items:center;padding-left:16px}.client .client-opts[data-v-7abcc4bf]{line-height:13px}.client .client-opts .client-opt[data-v-7abcc4bf]{font-size:13px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.client .client-opts .client-opt[data-v-7abcc4bf]:hover{text-decoration:underline}#client-entry[data-v-7abcc4bf]{width:400px}",""])},301:function(t,e,n){"use strict";n.r(e);var i=n(1),o=n.n(i),a=n(5),r=n(0),c=n(4);function s(t,e,n,i,o,a,r){try{var c=t[a](r),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(i,o)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function r(t){s(a,i,o,r,c,"next",t)}function c(t){s(a,i,o,r,c,"throw",t)}r(void 0)}))}}function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p="/api/clients",f={title:"Clients",components:{CircleProgress:c.b,Loader:c.f,Modal:c.h},data:function(){return{clients:[],cName:"",cId:null,refId:null,loaded:!1,clientEntry:!1,editMode:!1,state:{saving:!1}}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({baseUrl:function(){return Object(r.f)()},clientList:function(){return this.clients.sort((function(t,e){return t.name>e.name?1:t.name<e.name?-1:0}))}},Object(a.c)({api_header:"backend/api_header",api_customers:"backend/api_customers"})),methods:{getData:function(){var t=this;return l(o.a.mark((function e(){var n,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.all([axios.get(t.api_customers,t.api_header()),axios.get(p)]);case 2:n=e.sent,i=n[0].data,n[1].data.forEach((function(e){var n=i.find((function(t){return t.id==e.ref_id}));n&&(n.bucket&&(e.bucket=n.bucket),e.name=n.name,e.upload_info={uploading:!1,progress:0},t.clients.push(e))})),t.loaded=!0;case 6:case"end":return e.stop()}}),e)})))()},toggleEntry:function(t){var e=this;this.clientEntry=t,t&&setTimeout((function(){e.$refs.cName.focus()}),0)},toggleSaving:function(t){this.state.saving=t},triggerAdd:function(){this.cId=null,this.refId=null,this.cName="",this.editMode=!1,this.toggleEntry(!0)},addClient:function(){var t=this;return l(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.toggleSaving(!0),e.next=3,axios.post(t.api_customers,{name:t.cName},t.api_header());case 3:200==(n=e.sent).status?axios.post(p,{ref_id:n.data.id}).then((function(e){t.toggleSaving(!1);var n=e.data;n.r&&(n.data.name=t.cName,n.data.upload_info={uploading:!1,progress:0,name:t.cName},t.clients.push(n.data),t.toggleEntry(!1)),t.$mdtoast(n.m,{type:n.r?"success":"error",interaction:!0,interactionTimeout:5e3})})):t.toggleSaving(!1);case 5:case"end":return e.stop()}}),e)})))()},triggerEdit:function(t){var e=this.clients.find((function(e){return e.hid===t}));this.cId=t,this.refId=e.ref_id,this.cName=e.name,this.editMode=!0,this.toggleEntry(!0)},upClient:function(){var t=this;return l(o.a.mark((function e(){var n,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),n=t.clients.find((function(e){return e.hid==t.cId})),i={name:t.cName},n.bucket&&(i.bucket=n.bucket),axios.put("".concat(t.api_customers,"/").concat(t.refId),i,t.api_header()).then((function(e){if(t.toggleSaving(!1),200==e.status){var i=e.data;i.r&&(n.name=t.cName,t.toggleEntry(!1)),t.$mdtoast(i.m,{type:i.r?"success":"error",interaction:!0,interactionTimeout:5e3})}}));case 4:case"end":return e.stop()}}),e)})))()},delClient:function(t){var e=this;return l(o.a.mark((function n(){var i,a;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=(i=e).clients.findIndex((function(e){return e.hid===t})),i.$duDialog(null,"Remove ".concat(i.clients[a].name," from clients?"),{buttons:i.$duDialog.OK_CANCEL,okText:"Remove",callbacks:{okClick:function(e){this.hide(),i.toggleSaving(!0),axios.delete("".concat(p,"/").concat(t)).then((function(t){i.toggleSaving(!1);var e=t.data;e.r&&i.clients.splice(a,1),i.$mdtoast(e.m,{type:e.r?"success":"error",interaction:!0,interactionTimeout:5e3})}))}}});case 2:case"end":return n.stop()}}),n)})))()},upLogo:function(t){this.cId=t,this.$refs.logoFile.click()},logoFileChange:function(){var t=this,e=t.$refs.logoFile.files[0];if(e){var n=t.clients.find((function(e){return e.hid===t.cId}));n.upload_info.uploading=!0,t.uploadLogo(e,(function(t,e){n.upload_info.uploading=!1,t?e.r&&(n.logo=e.logo):console.error(e)}))}},uploadLogo:function(t,e){var n=this;return l(o.a.mark((function i(){var a,r;return o.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:a=new window.FormData,r=n.clients.find((function(t){return t.hid===n.cId})),a.append("logo",t),a.append("id",n.cId),axios.post("".concat(p,"/logo"),a,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){var e=Math.round(100*t.loaded/t.total);r.upload_info.progress=e}}).then((function(t){return e(!0,t.data)})).catch((function(t){return e(!1,t)}));case 4:case"end":return i.stop()}}),i)})))()}},mounted:function(){this.getData()}},g=(n(135),n(3)),v=Object(g.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("h1",[t._v("Clients")]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.loaded?n("div",{attrs:{id:"client-list"}},[t._l(t.clientList,(function(e){return n("div",{key:e.hid,staticClass:"client"},[n("div",{staticClass:"client-logo"},[e.upload_info.uploading?n("div",{staticClass:"logo-upload-progress"},[n("circle-progress",{attrs:{percent:e.upload_info.progress}})],1):t._e(),t._v(" "),e.logo?n("div",{staticClass:"logo-holder"},[n("img",{attrs:{src:t.baseUrl+"/storage/logos/"+e.logo}}),t._v(" "),n("a",{staticClass:"logo-opt",on:{click:function(n){return t.upLogo(e.hid)}}},[t._v("Change Logo")])]):n("div",{staticClass:"logo-upload-trigger",on:{click:function(n){return t.upLogo(e.hid)}}},[t._v("\n                        Add Logo\n                    ")])]),t._v(" "),n("div",{staticClass:"client-info"},[t._v("\n                    "+t._s(e.name)+"\n                ")])])})),t._v(" "),n("input",{ref:"logoFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.logoFileChange}}),t._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{id:"add-btn"},on:{click:t.triggerAdd}},[t._v("Add Client")])],2):t._e()]),t._v(" "),n("modal",{attrs:{show:t.clientEntry},on:{close:function(e){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[n("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" Client")])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upClient}},[t._v(t._s(t.state.saving?"Updating...":"Update"))]):n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addClient}},[t._v(t._s(t.state.saving?"Adding...":"Add"))])]},proxy:!0}])},[t._v(" "),n("div",{attrs:{id:"client-entry"}},[n("div",{staticClass:"input-field"},[n("label",[t._v("Company Name")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.cName,expression:"cName"}],ref:"cName",attrs:{type:"text"},domProps:{value:t.cName},on:{input:function(e){e.target.composing||(t.cName=e.target.value)}}})])])]),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"7abcc4bf",null);e.default=v.exports},56:function(t,e,n){var i=n(136);"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(7)(i,o);i.locals&&(t.exports=i.locals)}}]);