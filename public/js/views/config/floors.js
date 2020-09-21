(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{116:function(t,n,o){"use strict";var e=o(33);o.n(e).a},117:function(t,n,o){(t.exports=o(7)(!1)).push([t.i,"#floor-list[data-v-59aa0ef9] {\n  margin-top: 24px;\n}\n#add-btn[data-v-59aa0ef9] {\n  margin-top: 24px;\n}\n.floor[data-v-59aa0ef9] {\n  position: relative;\n  display: inline-block;\n  flex-direction: column;\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 10px;\n  margin-right: 10px;\n  transition: background-color 0.24s linear;\n}\n.floor[data-v-59aa0ef9]:hover {\n  background-color: rgba(255, 255, 255, 0.04);\n}\n.floor .floor-thumb[data-v-59aa0ef9] {\n  position: relative;\n  width: 200px;\n  height: 135px;\n  overflow: hidden;\n}\n.floor .floor-thumb .fp-upload-progress[data-v-59aa0ef9] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  background-color: rgba(57, 57, 57, 0.8);\n  z-index: 1;\n}\n.floor .floor-thumb .fp-upload-trigger[data-v-59aa0ef9] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: calc(100% - 2px);\n  font-size: 14px;\n  cursor: pointer;\n  border: 1px dashed rgba(255, 255, 255, 0.1);\n}\n.floor .floor-thumb .fp-thumb[data-v-59aa0ef9] {\n  position: relative;\n  height: 135px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #ffffff;\n}\n.floor .floor-thumb .fp-thumb img[data-v-59aa0ef9] {\n  display: block;\n  height: auto;\n  max-width: 100%;\n  margin: 0 auto;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.floor .floor-thumb .fp-thumb .fp-thumb-opts[data-v-59aa0ef9] {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  padding: 2px 6px 6px;\n  background-color: rgba(57, 57, 57, 0.8);\n  transform: translateY(100%);\n  transition: transform 0.24s;\n}\n.floor .floor-thumb .fp-thumb .fp-thumb-opts a[data-v-59aa0ef9] {\n  display: inline-block;\n  font-size: 14px;\n  cursor: pointer;\n}\n.floor .floor-thumb .fp-thumb .fp-thumb-opts a + a[data-v-59aa0ef9] {\n  margin-left: 4px;\n}\n.floor .floor-thumb .fp-thumb .fp-thumb-opts a[data-v-59aa0ef9]:hover {\n  text-decoration: underline;\n}\n.floor .floor-thumb .fp-thumb:hover .fp-thumb-opts[data-v-59aa0ef9] {\n  transform: translateY(0);\n}\n.floor .floor-info[data-v-59aa0ef9] {\n  flex: 1 auto;\n  padding: 10px;\n}\n.floor .floor-opts[data-v-59aa0ef9] {\n  line-height: 13px;\n}\n.floor .floor-opts .floor-opt[data-v-59aa0ef9] {\n  font-size: 13px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.floor .floor-opts .floor-opt + .floor-opt[data-v-59aa0ef9] {\n  margin-left: 4px;\n}\n.floor .floor-opts .floor-opt[data-v-59aa0ef9]:hover {\n  text-decoration: underline;\n}\n.fp-preview[data-v-59aa0ef9] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(20, 20, 20, 0.85);\n}\n.fp-preview .preview-header[data-v-59aa0ef9] {\n  position: relative;\n  font-size: 18px;\n  padding: 10px;\n  line-height: 24px;\n  background-color: rgba(20, 20, 20, 0.7);\n  z-index: 1;\n}\n.fp-preview .preview-header .preview-close[data-v-59aa0ef9] {\n  float: right;\n  cursor: pointer;\n  font-size: 14px;\n  padding: 0 8px;\n}\n.fp-preview img[data-v-59aa0ef9] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  max-height: 90%;\n  max-width: 90%;\n  transform: translate(-50%, -50%);\n  background-color: #ffffff;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: -1;\n}",""])},223:function(t,n,o){"use strict";o.r(n);var e=o(1),r=o.n(e),a=o(4),i=o(2),s=o(5);function l(t,n,o,e,r,a,i){try{var s=t[a](i),l=s.value}catch(t){return void o(t)}s.done?n(l):Promise.resolve(l).then(e,r)}function f(t){return function(){var n=this,o=arguments;return new Promise((function(e,r){var a=t.apply(n,o);function i(t){l(a,e,r,i,s,"next",t)}function s(t){l(a,e,r,i,s,"throw",t)}i(void 0)}))}}var d="/api/floors",c={title:"Floors Setup",props:["bldg_id","bldg_name"],components:{CircleProgress:i.b,Loader:i.e,Modal:i.g},data:function(){return{bldg:null,floors:[],floor:null,listTransition:"fadeUp",loaded:!1,showEntry:!1,editMode:!1,entry:{id:null,fNo:1,size_metre:0,size_feet:0,occupancy_limit:0},showPlan:!1,planUrl:null,state:{saving:!1,imgLoaded:!1}}},computed:{baseUrl:function(){return Object(s.c)()},floorList:function(){return this.floors.sort((function(t,n){return t.floor_no>n.floor_no?1:t.floor_no<n.floor_no?-1:0}))}},methods:{getBuilding:function(t,n){var o=this;return f(r.a.mark((function e(){var i,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/api/locations",{params:{id:t}});case 2:return i=e.sent,s=i.data,a.a.setBldg(s),o.bldg=s,e.abrupt("return",n&&n());case 7:case"end":return e.stop()}}),e)})))()},getFloors:function(){var t=this;return f(r.a.mark((function n(){var o,e;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.get(d,{params:{bid:t.bldg_id}});case 2:o=n.sent,(e=o.data).forEach((function(n){n.floor_plan_url="".concat(t.baseUrl,"/plans/").concat(n.floor_plan),n.upload_info={uploading:!1,progress:0}})),a.a.setFloors(e),t.floors=a.a.getFloors(),t.loaded=!0;case 8:case"end":return n.stop()}}),n)})))()},toggleEntry:function(t){var n=this;this.showEntry=t,t&&setTimeout((function(){n.$refs.fNo.focus()}),0)},toggleSaving:function(t){this.state.saving=t},triggerAdd:function(){this.entry.id=null,this.entry.fNo=1,this.entry.size_metre=0,this.entry.size_feet=0,this.entry.occupancy_limit=0,this.editMode=!1,this.toggleEntry(!0)},addFloor:function(){var t=this;return f(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),axios.post(d,{building:t.bldg_id,floor_no:t.entry.fNo,size_metre:t.entry.size_metre,size_feet:t.entry.size_feet,occupancy_limit:t.entry.occupancy_limit}).then((function(n){t.toggleSaving(!1);var o=n.data;o.r&&(o.data.upload_info={uploading:!1,progress:0},o.data.floor_plan_url="".concat(t.baseUrl,"/plans/").concat(o.data.floor_plan),t.floors.push(o.data),t.toggleEntry(!1))}));case 2:case"end":return n.stop()}}),n)})))()},triggerEdit:function(t){var n=this.floors.find((function(n){return n.hid===t}));this.entry.id=t,this.entry.fNo=n.floor_no,this.entry.size_metre=n.size_metre,this.entry.size_feet=n.size_feet,this.entry.occupancy_limit=n.occupancy_limit,this.editMode=!0,this.toggleEntry(!0)},upFloor:function(){var t=this;return f(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),axios.put("".concat(d,"/").concat(t.entry.id),{floor_no:t.entry.fNo,size_metre:t.entry.size_metre,size_feet:t.entry.size_feet,occupancy_limit:t.entry.occupancy_limit}).then((function(n){if(t.toggleSaving(!1),n.data.r){var o=t.floors.find((function(n){return n.hid==t.entry.id}));o.floor_no=t.entry.fNo,o.size_metre=t.entry.size_metre,o.size_feet=t.entry.size_feet,o.occupancy_limit=t.entry.occupancy_limit,o.ordinal_no=Object(s.h)(o.floor_no),t.toggleEntry(!1)}}));case 2:case"end":return n.stop()}}),n)})))()},delFloor:function(t){var n=this;return f(r.a.mark((function o(){var e,a;return r.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:a=(e=n).floors.findIndex((function(n){return n.hid===t})),e.$duDialog(null,"Remove <strong>".concat(e.floors[a].ordinal_no," Floor</strong>?"),e.$duDialog.OK_CANCEL,{okText:"Remove",callbacks:{okClick:function(n){this.hide(),e.toggleSaving(!0),axios.delete("".concat(d,"/").concat(t)).then((function(t){e.toggleSaving(!1),t.data.r&&e.floors.splice(a,1)}))}}});case 2:case"end":return o.stop()}}),o)})))()},upFloorPlan:function(t){this.entry.id=t,this.$refs.fpFile.click()},fpFileChange:function(){var t=this,n=t.$refs.fpFile.files[0];if(n){var o=t.floors.find((function(n){return n.hid===t.entry.id}));o.upload_info.uploading=!0,t.upload(n,(function(n,e){o.upload_info.uploading=!1,n?e.r&&(o.floor_plan=e.floor_plan,o.floor_plan_url="".concat(t.baseUrl,"/plans/").concat(o.floor_plan)):console.error(e)}))}},upload:function(t,n){var o=this;return f(r.a.mark((function e(){var a,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=new window.FormData,i=o.floors.find((function(t){return t.hid===o.entry.id})),a.append("floor_plan",t),a.append("id",o.entry.id),axios.post("".concat(d,"/plan"),a,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){var n=Math.round(100*t.loaded/t.total);i.upload_info.progress=n}}).then((function(t){return n(!0,t.data)})).catch((function(t){return n(!1,t)}));case 4:case"end":return e.stop()}}),e)})))()},togglePlan:function(t){this.showPlan=t,this.listTransition="fade"},viewFloorPlan:function(t,n){var o=this;o.floor=o.floors.find((function(n){return n.hid===t})),o.togglePlan(!0),o.state.imgLoaded=!1,Object(s.f)(o.floor.floor_plan_url,(function(){o.state.imgLoaded=!0}))},toMapper:function(t){this.$parent.$router.push({name:"mapper",query:{fid:t},params:{bid:this.bldg_id,bldg_name:this.bldg_name}})}},mounted:function(){var t=this,n=a.a.getBldg(),o=a.a.getFloors();n&&n.hid===this.bldg_id?(this.bldg=n,o.length>0?(this.floors=a.a.getFloors(),this.loaded=!0):this.getFloors()):this.getBuilding(this.bldg_id,(function(){t.getFloors()}))}},p=(o(116),o(3)),u=Object(p.a)(c,(function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"content"},[t.loaded?[o("h1",[t._v(t._s(t.bldg?t.bldg.name:""))]),t._v(" "),o("transition",{attrs:{name:"fadeUp",appear:""}},[t.loaded?o("div",{attrs:{id:"list-wrapper"}},[o("div",{attrs:{id:"floor-list"}},[0===t.floorList.length?o("div",[t._v("No floors defined")]):t._l(t.floorList,(function(n){return o("div",{key:n.hid,staticClass:"floor"},[o("div",{staticClass:"floor-thumb"},[n.upload_info.uploading?o("div",{staticClass:"fp-upload-progress"},[t._v("\n                                Uploading\n                                "),o("circle-progress",{attrs:{percent:n.upload_info.progress}})],1):t._e(),t._v(" "),n.floor_plan?o("div",{staticClass:"fp-thumb"},[o("img",{attrs:{src:t.baseUrl+"/plans/thumbnail/"+n.floor_plan}}),t._v(" "),o("div",{staticClass:"fp-thumb-opts"},[o("a",{on:{click:function(o){return t.upFloorPlan(n.hid)}}},[t._v("Change")]),t._v(" "),o("a",{on:{click:function(o){return t.viewFloorPlan(n.hid,n.floor_plan)}}},[t._v("Preview")])])]):o("div",{staticClass:"fp-upload-trigger",on:{click:function(o){return t.upFloorPlan(n.hid)}}},[t._v("\n                                Upload Floor Plan\n                            ")])]),t._v(" "),o("div",{staticClass:"floor-info"},[t._v("\n                            "+t._s(n.ordinal_no+" Floor")+"\n                            "),o("div",{staticClass:"floor-opts"},[n.floor_plan?[o("a",{staticClass:"floor-opt",on:{click:function(o){return t.toMapper(n.hid)}}},[t._v("Mapper")])]:t._e(),t._v(" "),o("a",{staticClass:"floor-opt",on:{click:function(o){return t.triggerEdit(n.hid)}}},[t._v("Edit")]),t._v(" "),o("a",{staticClass:"floor-opt",on:{click:function(o){return t.delFloor(n.hid)}}},[t._v("Remove")])],2)])])}))],2),t._v(" "),o("input",{ref:"fpFile",attrs:{type:"file",hidden:"",accept:"image/*"},on:{change:t.fpFileChange}}),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{id:"add-btn"},on:{click:t.triggerAdd}},[t._v("Add Floor")]),t._v(" "),t.showPlan?o("div",{staticClass:"fp-preview"},[o("loader",{attrs:{show:!t.state.imgLoaded,type:"spinner"}}),t._v(" "),t.state.imgLoaded?o("img",{attrs:{src:t.baseUrl+"/plans/"+t.floor.floor_plan}}):t._e(),t._v(" "),o("div",{staticClass:"preview-header"},[t._v("\n                        "+t._s(t.bldg.name+" - "+t.floor.ordinal_no+" Floor")+"\n                        "),o("span",{staticClass:"preview-close",on:{click:function(n){return t.togglePlan(!1)}}},[t._v("Close")])])],1):t._e()]):t._e()])]:t._e(),t._v(" "),o("modal",{attrs:{show:t.showEntry},on:{close:function(n){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[o("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" Floor")])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?o("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upFloor}},[t._v(t._s(t.state.saving?"Updating...":"Update"))]):o("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addFloor}},[t._v(t._s(t.state.saving?"Adding...":"Add"))])]},proxy:!0}])},[t._v(" "),o("div",{attrs:{id:"entry-wrapper"}},[o("div",{staticClass:"input-field"},[o("label",[t._v("Floor No.")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.fNo,expression:"entry.fNo"}],ref:"fNo",attrs:{type:"number"},domProps:{value:t.entry.fNo},on:{input:function(n){n.target.composing||t.$set(t.entry,"fNo",n.target.value)}}})]),t._v(" "),o("div",{staticClass:"input-field"},[o("label",[t._v("Size (m"),o("sup",[t._v("2")]),t._v(")")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.size_metre,expression:"entry.size_metre"}],attrs:{type:"text"},domProps:{value:t.entry.size_metre},on:{input:function(n){n.target.composing||t.$set(t.entry,"size_metre",n.target.value)}}})]),t._v(" "),o("div",{staticClass:"input-field"},[o("label",[t._v("Size (ft"),o("sup",[t._v("2")]),t._v(")")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.size_feet,expression:"entry.size_feet"}],attrs:{type:"text"},domProps:{value:t.entry.size_feet},on:{input:function(n){n.target.composing||t.$set(t.entry,"size_feet",n.target.value)}}})]),t._v(" "),o("div",{staticClass:"input-field"},[o("label",[t._v("Occupancy Limit")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.occupancy_limit,expression:"entry.occupancy_limit"}],attrs:{type:"number"},domProps:{value:t.entry.occupancy_limit},on:{input:function(n){n.target.composing||t.$set(t.entry,"occupancy_limit",n.target.value)}}})])])]),t._v(" "),o("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[],!1,null,"59aa0ef9",null);n.default=u.exports},33:function(t,n,o){var e=o(117);"string"==typeof e&&(e=[[t.i,e,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};o(8)(e,r);e.locals&&(t.exports=e.locals)}}]);