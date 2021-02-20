(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{124:function(t,e,a){"use strict";var n=a(37);a.n(n).a},125:function(t,e,a){(t.exports=a(7)(!1)).push([t.i,".company-logo[data-v-3a265018]{display:inline-flex;margin-top:16px}.company-logo .logo-holder[data-v-3a265018]{position:relative;display:flex;align-items:center;height:48px;width:150px;padding:10px;border-radius:10px;overflow:hidden}.company-logo .logo-holder .upload-trigger[data-v-3a265018]{display:flex;justify-content:center;align-items:center;height:calc(100% - 2px);font-size:14px;cursor:pointer;border-radius:10px;border:1px dashed hsla(0,0%,100%,.1)}.company-logo .logo-holder .upload-progress[data-v-3a265018]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color:#2b2b2b}.company-logo .logo-holder img[data-v-3a265018]{height:auto;width:100%}.company-logo .logo-holder .logo-opt[data-v-3a265018]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;cursor:pointer;visibility:hidden;opacity:0;transform:scale(1.25);background-color:rgba(57,57,57,.8);transition:visibility .24s,opacity .24s,transform .24s}.company-logo .logo-holder:hover .logo-opt[data-v-3a265018]{visibility:visible;opacity:1;transform:scale(1)}.settings-section[data-v-3a265018]{margin:24px 0}.settings-section .days-list[data-v-3a265018]{padding:10px 0}.settings-section.hours-section[data-v-3a265018]{margin-bottom:32px}#trigger-filters td[data-v-3a265018]{padding:4px 6px}#trigger-filters .input-field[data-v-3a265018]{margin-bottom:0}",""])},224:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),o=a(4),i=a(5),s=a(2);function c(t,e,a,n,r,o,i){try{var s=t[o](i),c=s.value}catch(t){return void a(t)}s.done?e(c):Promise.resolve(c).then(n,r)}function l(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var o=t.apply(e,a);function i(t){c(o,n,r,i,s,"next",t)}function s(t){c(o,n,r,i,s,"throw",t)}i(void 0)}))}}var d="/api/work-configs",g=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],u={title:"Work Settings",components:{Checkbox:s.a,CircleProgress:s.b,Loader:s.e,TimeSlider:s.h},data:function(){return{loaded:!1,user:null,settings:null,areas:[],entry:{start_time:null,end_time:null,area_triggers:[],work_days:[]},upload_info:{uploading:!1,progress:0},state:{saving:!1,savingTriggers:!1}}},computed:{baseUrl:function(){return Object(i.c)()},daysArr:function(){return g.map((function(t){return{name:t,short:t.substr(0,3)}}))}},methods:{getMinutes:function(t){if("Meeting Rooms"==t.name){for(var e=[],a=1;a<=60;a++)e.push(a);return e}return[5,10,15,20,25,30,35,40,45]},timeFromChange:function(t){this.entry.start_time=t},timeToChange:function(t){this.entry.end_time=t},toggleSaving:function(t){this.state.saving=t},getSettings:function(){var t=this;return l(r.a.mark((function e(){var a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(d,{params:{cid:t.user.cid}});case 2:a=e.sent,n=a.data,t.settings=n.ws,t.loaded=!0,t.settings?(t.entry.start_time=n.ws.start_time,t.entry.end_time=n.ws.end_time,t.entry.work_days=n.ws.work_days.split(",")):t.entry.work_days=g.map((function(t){return t.substr(0,3)}));case 7:case"end":return e.stop()}}),e)})))()},getAreas:function(){var t=this;return l(r.a.mark((function e(){var a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/api/areas/types",{params:{}});case 2:a=e.sent,n=a.data,t.areas=n;case 5:case"end":return e.stop()}}),e)})))()},triggerSave:function(){this.settings?this.upSettings():this.addSettings(),this.saveAreaTriggers()},addSettings:function(){var t=this;return l(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.post(d,{company:t.user.cid,start_time:t.entry.start_time,end_time:t.entry.end_time,work_days:t.entry.work_days.join(",")}).then((function(e){t.toggleSaving(!1);var a=e.data;t.$mdtoast(a.m,{type:a.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},upSettings:function(){var t=this;return l(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.put("".concat(d,"/").concat(t.settings.hid),{start_time:t.entry.start_time,end_time:t.entry.end_time,work_days:t.entry.work_days.join(",")}).then((function(e){t.toggleSaving(!1);var a=e.data;t.$mdtoast(a.m,{type:a.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},saveAreaTriggers:function(){var t=this;return l(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.areas.length,t.state.savingTriggers=!0,t.areas.forEach((function(e,n){axios.put("/api/areas/trigger-filter/".concat(e.hid),{minutes:e.trigger_filter}).then((function(e){n==a&&(t.state.savingTriggers=!1)}))}));case 3:case"end":return e.stop()}}),e)})))()},upLogo:function(){this.$refs.logoFile.click()},logoFileChange:function(){var t=this,e=t.$refs.logoFile.files[0];e&&(t.upload_info.uploading=!0,t.uploadLogo(e,(function(e,a){t.upload_info.uploading=!1,e?a.r&&o.a.setCompanyLogo(a.logo):console.error(a)})))},uploadLogo:function(t,e){var a=this;return l(r.a.mark((function n(){var o,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o=a,(i=new window.FormData).append("logo",t),i.append("id",a.user.company.hid),axios.post("/api/clients/logo",i,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){var e=Math.round(100*t.loaded/t.total);o.upload_info.progress=e}}).then((function(t){return e(!0,t.data)})).catch((function(t){return e(!1,t)}));case 4:case"end":return n.stop()}}),n)})))()}},created:function(){this.user=o.a.getUser()},mounted:function(){this.getAreas(),this.getSettings()}},p=(a(124),a(3)),v=Object(p.a)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("h1",[t._v("Work Settings")]),t._v(" "),a("transition",{attrs:{name:"fadeUp"}},[t.loaded?a("div",{attrs:{id:"settings-panel"}},[a("div",{staticClass:"settings-section",attrs:{id:"company-settings"}},[a("h2",[t._v("Company Logo")]),t._v(" "),a("div",{staticClass:"company-logo"},[a("div",{staticClass:"logo-holder"},[t.upload_info.uploading?a("div",{staticClass:"upload-progress"},[a("circle-progress",{attrs:{percent:t.upload_info.progress}})],1):t._e(),t._v(" "),t.user.company.logo?a("img",{attrs:{src:t.baseUrl+"/storage/logos/"+t.user.company.logo}}):a("div",{staticClass:"upload-trigger",on:{click:t.upLogo}},[t._v("\n                            Add Logo\n                        ")]),t._v(" "),t.user.company.logo?a("div",{staticClass:"logo-opt",on:{click:t.upLogo}},[t._v("Change")]):t._e()])]),t._v(" "),a("input",{ref:"logoFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.logoFileChange}})]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6 col-lg-4"},[a("div",{staticClass:"settings-section"},[a("h2",[t._v("Working Days")]),t._v(" "),a("div",{staticClass:"days-list"},t._l(t.daysArr,(function(e){return a("checkbox",{key:e.short,attrs:{label:e.name,val:e.short},model:{value:t.entry.work_days,callback:function(e){t.$set(t.entry,"work_days",e)},expression:"entry.work_days"}})})),1)])]),t._v(" "),a("div",{staticClass:"col-12 col-md-6 col-lg-4"},[a("div",{staticClass:"settings-section"},[a("h2",[t._v("Area Trigger Filter")]),t._v(" "),a("table",{attrs:{id:"trigger-filters"}},[a("tbody",t._l(t.areas,(function(e){return a("tr",{key:e.hid},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[a("div",{staticClass:"input-field"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.trigger_filter,expression:"a.trigger_filter"}],on:{change:function(a){var n=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(e,"trigger_filter",a.target.multiple?n:n[0])}}},[a("option",{attrs:{value:"null"}},[t._v("Not specified")]),t._v(" "),t._l(t.getMinutes(e),(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e)+" minutes")])}))],2)])])])})),0)])])]),t._v(" "),a("div",{staticClass:"col-12 col-md-6 col-lg-4"},[a("div",{staticClass:"settings-section hours-section"},[a("h2",[t._v("Working Hours")]),t._v(" "),a("time-slider",{attrs:{from:t.entry.start_time,to:t.entry.end_time},on:{startChanged:t.timeFromChange,endChanged:t.timeToChange}})],1)])]),t._v(" "),a("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving&&t.state.savingTriggers},on:{click:t.triggerSave}},[t._v(t._s(t.state.saving&&t.state.savingTriggers?"Saving...":"Save settings"))])]):t._e()]),t._v(" "),a("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"3a265018",null);e.default=v.exports},37:function(t,e,a){var n=a(125);"string"==typeof n&&(n=[[t.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};a(8)(n,r);n.locals&&(t.exports=n.locals)}}]);