(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{198:function(t,e,n){var r=n(285);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(8)(r,o);r.locals&&(t.exports=r.locals)},284:function(t,e,n){"use strict";n(198)},285:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,".company-logo[data-v-cfe6f996]{display:inline-flex;margin-top:16px}.company-logo .logo-holder[data-v-cfe6f996]{position:relative;display:flex;align-items:center;min-height:48px;width:150px;padding:10px;border-radius:10px;overflow:hidden}.company-logo .logo-holder .upload-trigger[data-v-cfe6f996]{display:flex;flex:1;justify-content:center;align-items:center;height:48px;margin:-10px;font-size:14px;cursor:pointer;border-radius:10px;border:1px dashed hsla(0,0%,100%,.1)}.company-logo .logo-holder .upload-progress[data-v-cfe6f996]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color:#2b2b2b}.company-logo .logo-holder img[data-v-cfe6f996]{height:auto;width:100%}.company-logo .logo-holder .logo-opt[data-v-cfe6f996]{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;cursor:pointer;visibility:hidden;opacity:0;transform:scale(1.25);background-color:rgba(57,57,57,.8);transition:visibility .24s,opacity .24s,transform .24s}.company-logo .logo-holder:hover .logo-opt[data-v-cfe6f996]{visibility:visible;opacity:1;transform:scale(1)}.settings-section[data-v-cfe6f996]{margin:24px 0}.settings-section .days-list[data-v-cfe6f996]{padding:10px 0}.settings-section.hours-section[data-v-cfe6f996]{margin-bottom:32px}#trigger-filters td[data-v-cfe6f996]{padding:4px 6px}#trigger-filters .input-field[data-v-cfe6f996]{margin-bottom:0}",""])},445:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r),a=n(6),i=n(0),s=n(5);function c(t,e,n,r,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){c(a,r,o,i,s,"next",t)}function s(t){c(a,r,o,i,s,"throw",t)}i(void 0)}))}}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p="/api/work-configs",f=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],v={title:"Work Settings",components:{Checkbox:s.a,CircleProgress:s.b,Loader:s.f,TimeSlider:s.i},data:function(){return{loaded:!1,settings:null,areas:[],entry:{start_time:null,end_time:null,area_triggers:[],work_days:[]},upload_info:{uploading:!1,progress:0},state:{saving:!1,savingTriggers:!1}}},computed:d(d({},Object(a.d)({user:function(t){return t.user.info}})),{},{baseUrl:function(){return Object(i.g)()},daysArr:function(){return f.map((function(t){return{name:t,short:t.substr(0,3)}}))}}),methods:d(d({},Object(a.c)({setCompanyLogo:"user/setCompanyLogo"})),{},{getMinutes:function(t){if("Meeting Rooms"==t.name){for(var e=[],n=1;n<=60;n++)e.push(n);return e}return[5,10,15,20,25,30,35,40,45]},timeFromChange:function(t){this.entry.start_time=t},timeToChange:function(t){this.entry.end_time=t},toggleSaving:function(t){this.state.saving=t},getSettings:function(){var t=this;return l(o.a.mark((function e(){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(p,{params:{cid:t.user.company.hid}});case 2:n=e.sent,r=n.data,t.settings=r.ws,t.loaded=!0,t.settings?(t.entry.start_time=r.ws.start_time,t.entry.end_time=r.ws.end_time,t.entry.work_days=r.ws.work_days.split(",")):(t.entry.start_time="8:00 am",t.entry.end_time="5:00 pm",t.entry.work_days=f.map((function(t){return t.substr(0,3)})));case 7:case"end":return e.stop()}}),e)})))()},getAreas:function(){var t=this;return l(o.a.mark((function e(){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/api/areas/types",{params:{}});case 2:n=e.sent,r=n.data,t.areas=r;case 5:case"end":return e.stop()}}),e)})))()},triggerSave:function(){this.settings?this.upSettings():this.addSettings(),this.saveAreaTriggers()},addSettings:function(){var t=this;return l(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.post(p,{company:t.user.company.hid,start_time:t.entry.start_time,end_time:t.entry.end_time,work_days:t.entry.work_days.join(",")}).then((function(e){t.toggleSaving(!1);var n=e.data;t.settings=n.data,t.$mdtoast(n.m,{type:n.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},upSettings:function(){var t=this;return l(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.put("".concat(p,"/").concat(t.settings.hid),{start_time:t.entry.start_time,end_time:t.entry.end_time,work_days:t.entry.work_days.join(",")}).then((function(e){t.toggleSaving(!1);var n=e.data;t.settings=n.data,t.$mdtoast(n.m,{type:n.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},saveAreaTriggers:function(){var t=this;return l(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.areas.length,t.state.savingTriggers=!0,t.areas.forEach((function(e,r){axios.put("/api/areas/trigger-filter/".concat(e.hid),{minutes:e.trigger_filter}).then((function(e){r==n&&(t.state.savingTriggers=!1)}))}));case 3:case"end":return e.stop()}}),e)})))()},upLogo:function(){this.$refs.logoFile.click()},logoFileChange:function(){var t=this,e=t.$refs.logoFile.files[0];e&&(t.upload_info.uploading=!0,t.uploadLogo(e,(function(e,n){t.upload_info.uploading=!1,e?n.r&&t.setCompanyLogo(n.logo):console.error(n)})))},uploadLogo:function(t,e){var n=this;return l(o.a.mark((function r(){var a,i;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:a=n,(i=new window.FormData).append("logo",t),i.append("id",n.user.company.hid),axios.post("/api/clients/logo",i,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){var e=Math.round(100*t.loaded/t.total);a.upload_info.progress=e}}).then((function(t){return e(!0,t.data)})).catch((function(t){return e(!1,t)}));case 4:case"end":return r.stop()}}),r)})))()}}),mounted:function(){this.getAreas(),this.getSettings()}},m=(n(284),n(4)),y=Object(m.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("h1",[t._v("Work Settings")]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.loaded?n("div",{attrs:{id:"settings-panel"}},[n("div",{staticClass:"settings-section",attrs:{id:"company-settings"}},[n("h2",[t._v("Company Logo")]),t._v(" "),n("div",{staticClass:"company-logo"},[n("div",{staticClass:"logo-holder"},[t.upload_info.uploading?n("div",{staticClass:"upload-progress"},[n("circle-progress",{attrs:{percent:t.upload_info.progress}})],1):t._e(),t._v(" "),t.user.company.logo?n("img",{attrs:{src:t.baseUrl+"/storage/logos/"+t.user.company.logo}}):n("div",{staticClass:"upload-trigger",on:{click:t.upLogo}},[t._v("\n                            Add Logo\n                        ")]),t._v(" "),t.user.company.logo?n("div",{staticClass:"logo-opt",on:{click:t.upLogo}},[t._v("Change")]):t._e()])]),t._v(" "),n("input",{ref:"logoFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.logoFileChange}})]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-6 col-lg-4"},[n("div",{staticClass:"settings-section"},[n("h2",[t._v("Working Days")]),t._v(" "),n("div",{staticClass:"days-list"},t._l(t.daysArr,(function(e){return n("checkbox",{key:e.short,attrs:{label:e.name,val:e.short},model:{value:t.entry.work_days,callback:function(e){t.$set(t.entry,"work_days",e)},expression:"entry.work_days"}})})),1)])]),t._v(" "),n("div",{staticClass:"col-12 col-md-6 col-lg-4"},[n("div",{staticClass:"settings-section"},[n("h2",[t._v("Area Trigger Filter")]),t._v(" "),n("table",{attrs:{id:"trigger-filters"}},[n("tbody",t._l(t.areas,(function(e){return n("tr",{key:e.hid},[n("td",[t._v(t._s(e.name))]),t._v(" "),n("td",[n("div",{staticClass:"input-field"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.trigger_filter,expression:"a.trigger_filter"}],on:{change:function(n){var r=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(e,"trigger_filter",n.target.multiple?r:r[0])}}},[n("option",{attrs:{value:"null"}},[t._v("Not specified")]),t._v(" "),t._l(t.getMinutes(e),(function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(e)+" minutes")])}))],2)])])])})),0)])])]),t._v(" "),n("div",{staticClass:"col-12 col-md-6 col-lg-4"},[n("div",{staticClass:"settings-section hours-section"},[n("h2",[t._v("Working Hours")]),t._v(" "),n("time-slider",{attrs:{from:t.entry.start_time,to:t.entry.end_time},on:{startChanged:t.timeFromChange,endChanged:t.timeToChange}})],1)])]),t._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving&&t.state.savingTriggers},on:{click:t.triggerSave}},[t._v(t._s(t.state.saving&&t.state.savingTriggers?"Saving...":"Save settings"))])]):t._e()]),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"cfe6f996",null);e.default=y.exports}}]);