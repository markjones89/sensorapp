(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{129:function(t,e,r){"use strict";r(56)},130:function(t,e,r){(t.exports=r(7)(!1)).push([t.i,".company-logo[data-v-3808100c]{display:inline-flex;margin-top:16px}.company-logo .logo-holder[data-v-3808100c]{position:relative;display:flex;align-items:center;height:48px;width:150px;padding:10px;border-radius:10px;overflow:hidden}.company-logo .logo-holder .upload-trigger[data-v-3808100c]{display:flex;justify-content:center;align-items:center;height:calc(100% - 2px);font-size:14px;cursor:pointer;border-radius:10px;border:1px dashed hsla(0,0%,100%,.1)}.company-logo .logo-holder .upload-progress[data-v-3808100c]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color:#2b2b2b}.company-logo .logo-holder img[data-v-3808100c]{height:auto;width:100%}.company-logo .logo-holder .logo-opt[data-v-3808100c]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;cursor:pointer;visibility:hidden;opacity:0;transform:scale(1.25);background-color:rgba(57,57,57,.8);transition:visibility .24s,opacity .24s,transform .24s}.company-logo .logo-holder:hover .logo-opt[data-v-3808100c]{visibility:visible;opacity:1;transform:scale(1)}.settings-section[data-v-3808100c]{margin:24px 0}.settings-section .days-list[data-v-3808100c]{padding:10px 0}.settings-section.hours-section[data-v-3808100c]{margin-bottom:32px}#trigger-filters td[data-v-3808100c]{padding:4px 6px}#trigger-filters .input-field[data-v-3808100c]{margin-bottom:0}",""])},265:function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n),a=r(5),i=r(4),s=r(2);function c(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function l(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){c(a,n,o,i,s,"next",t)}function s(t){c(a,n,o,i,s,"throw",t)}i(void 0)}))}}function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){u(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var p="/api/work-configs",v=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],f={title:"Work Settings",components:{Checkbox:s.a,CircleProgress:s.b,Loader:s.e,TimeSlider:s.h},data:function(){return{loaded:!1,settings:null,areas:[],entry:{start_time:null,end_time:null,area_triggers:[],work_days:[]},upload_info:{uploading:!1,progress:0},state:{saving:!1,savingTriggers:!1}}},computed:g(g({},Object(a.d)({user:function(t){return t.user}})),{},{baseUrl:function(){return Object(i.c)()},daysArr:function(){return v.map((function(t){return{name:t,short:t.substr(0,3)}}))}}),methods:g(g({},Object(a.c)(["setCompanyLogo"])),{},{getMinutes:function(t){if("Meeting Rooms"==t.name){for(var e=[],r=1;r<=60;r++)e.push(r);return e}return[5,10,15,20,25,30,35,40,45]},timeFromChange:function(t){this.entry.start_time=t},timeToChange:function(t){this.entry.end_time=t},toggleSaving:function(t){this.state.saving=t},getSettings:function(){var t=this;return l(o.a.mark((function e(){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(p,{params:{cid:t.user.company.hid}});case 2:r=e.sent,n=r.data,t.settings=n.ws,t.loaded=!0,t.settings?(t.entry.start_time=n.ws.start_time,t.entry.end_time=n.ws.end_time,t.entry.work_days=n.ws.work_days.split(",")):(t.entry.start_time="8:00 am",t.entry.end_time="5:00 pm",t.entry.work_days=v.map((function(t){return t.substr(0,3)})));case 7:case"end":return e.stop()}}),e)})))()},getAreas:function(){var t=this;return l(o.a.mark((function e(){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/api/areas/types",{params:{}});case 2:r=e.sent,n=r.data,t.areas=n;case 5:case"end":return e.stop()}}),e)})))()},triggerSave:function(){this.settings?this.upSettings():this.addSettings(),this.saveAreaTriggers()},addSettings:function(){var t=this;return l(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.post(p,{company:t.user.company.hid,start_time:t.entry.start_time,end_time:t.entry.end_time,work_days:t.entry.work_days.join(",")}).then((function(e){t.toggleSaving(!1);var r=e.data;t.settings=r.data,t.$mdtoast(r.m,{type:r.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},upSettings:function(){var t=this;return l(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.put("".concat(p,"/").concat(t.settings.hid),{start_time:t.entry.start_time,end_time:t.entry.end_time,work_days:t.entry.work_days.join(",")}).then((function(e){t.toggleSaving(!1);var r=e.data;t.settings=r.data,t.$mdtoast(r.m,{type:r.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},saveAreaTriggers:function(){var t=this;return l(o.a.mark((function e(){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.areas.length,t.state.savingTriggers=!0,t.areas.forEach((function(e,n){axios.put("/api/areas/trigger-filter/".concat(e.hid),{minutes:e.trigger_filter}).then((function(e){n==r&&(t.state.savingTriggers=!1)}))}));case 3:case"end":return e.stop()}}),e)})))()},upLogo:function(){this.$refs.logoFile.click()},logoFileChange:function(){var t=this,e=t.$refs.logoFile.files[0];e&&(t.upload_info.uploading=!0,t.uploadLogo(e,(function(e,r){t.upload_info.uploading=!1,e?r.r&&t.setCompanyLogo(r.logo):console.error(r)})))},uploadLogo:function(t,e){var r=this;return l(o.a.mark((function n(){var a,i;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=r,(i=new window.FormData).append("logo",t),i.append("id",r.user.company.hid),axios.post("/api/clients/logo",i,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){var e=Math.round(100*t.loaded/t.total);a.upload_info.progress=e}}).then((function(t){return e(!0,t.data)})).catch((function(t){return e(!1,t)}));case 4:case"end":return n.stop()}}),n)})))()}}),mounted:function(){this.getAreas(),this.getSettings()}},m=(r(129),r(3)),y=Object(m.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("h1",[t._v("Work Settings")]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.loaded?r("div",{attrs:{id:"settings-panel"}},[r("div",{staticClass:"settings-section",attrs:{id:"company-settings"}},[r("h2",[t._v("Company Logo")]),t._v(" "),r("div",{staticClass:"company-logo"},[r("div",{staticClass:"logo-holder"},[t.upload_info.uploading?r("div",{staticClass:"upload-progress"},[r("circle-progress",{attrs:{percent:t.upload_info.progress}})],1):t._e(),t._v(" "),t.user.company.logo?r("img",{attrs:{src:t.baseUrl+"/storage/logos/"+t.user.company.logo}}):r("div",{staticClass:"upload-trigger",on:{click:t.upLogo}},[t._v("\n                            Add Logo\n                        ")]),t._v(" "),t.user.company.logo?r("div",{staticClass:"logo-opt",on:{click:t.upLogo}},[t._v("Change")]):t._e()])]),t._v(" "),r("input",{ref:"logoFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.logoFileChange}})]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-12 col-md-6 col-lg-4"},[r("div",{staticClass:"settings-section"},[r("h2",[t._v("Working Days")]),t._v(" "),r("div",{staticClass:"days-list"},t._l(t.daysArr,(function(e){return r("checkbox",{key:e.short,attrs:{label:e.name,val:e.short},model:{value:t.entry.work_days,callback:function(e){t.$set(t.entry,"work_days",e)},expression:"entry.work_days"}})})),1)])]),t._v(" "),r("div",{staticClass:"col-12 col-md-6 col-lg-4"},[r("div",{staticClass:"settings-section"},[r("h2",[t._v("Area Trigger Filter")]),t._v(" "),r("table",{attrs:{id:"trigger-filters"}},[r("tbody",t._l(t.areas,(function(e){return r("tr",{key:e.hid},[r("td",[t._v(t._s(e.name))]),t._v(" "),r("td",[r("div",{staticClass:"input-field"},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.trigger_filter,expression:"a.trigger_filter"}],on:{change:function(r){var n=Array.prototype.filter.call(r.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(e,"trigger_filter",r.target.multiple?n:n[0])}}},[r("option",{attrs:{value:"null"}},[t._v("Not specified")]),t._v(" "),t._l(t.getMinutes(e),(function(e){return r("option",{key:e,domProps:{value:e}},[t._v(t._s(e)+" minutes")])}))],2)])])])})),0)])])]),t._v(" "),r("div",{staticClass:"col-12 col-md-6 col-lg-4"},[r("div",{staticClass:"settings-section hours-section"},[r("h2",[t._v("Working Hours")]),t._v(" "),r("time-slider",{attrs:{from:t.entry.start_time,to:t.entry.end_time},on:{startChanged:t.timeFromChange,endChanged:t.timeToChange}})],1)])]),t._v(" "),r("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving&&t.state.savingTriggers},on:{click:t.triggerSave}},[t._v(t._s(t.state.saving&&t.state.savingTriggers?"Saving...":"Save settings"))])]):t._e()]),t._v(" "),r("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"3808100c",null);e.default=y.exports},56:function(t,e,r){var n=r(130);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(8)(n,o);n.locals&&(t.exports=n.locals)}}]);