(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{12:function(t,n,r){var e=r(35);"string"==typeof e&&(e=[[t.i,e,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(8)(e,o);e.locals&&(t.exports=e.locals)},34:function(t,n,r){"use strict";var e=r(12);r.n(e).a},35:function(t,n,r){(t.exports=r(7)(!1)).push([t.i,"#sensor-mapper {\n  display: flex;\n  margin-top: 24px;\n}\n#sensor-mapper #mapper-options {\n  min-width: 200px;\n  padding-right: 24px;\n}\n#floor-map svg {\n  pointer-events: initial !important;\n}\n#floor-map svg .sensor {\n  box-shadow: 0 0 0 4px rgba(61, 207, 163, 0.3);\n}",""])},77:function(t,n,r){"use strict";r.r(n);var e=r(0),o=r.n(e),s=r(4),a=r(2),i=r(3);var l=function(t,n,r){var e=i.i(t),o=n,s=o.sensors||[],a={edit:!1},l=r,d=i.h().domain([0,50]).range([0,720]),c=i.h().domain([0,33.79]).range([0,487]),f=this;e.selectAll("svg").remove();var u=e.append("svg").attr("width",720).attr("height",487).style("display","block").style("background","#ffffff").selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),p=i.j().scaleExtent([1,8]).on("zoom",(function(){u.__transform=i.b.transform;var t=(1-u.__transform.k)*(d.range()[1]-d.range()[0]),n=(1-u.__transform.k)*(c.range()[1]-c.range()[0]);u.__transform.x=Math.min(d.range()[0],Math.max(u.__transform.x,t)),u.__transform.y=Math.min(c.range()[0],Math.max(u.__transform.y,n)),u.selectAll("image").attr("transform",u.__transform),u.selectAll(".sensor-layer").attr("transform",u.__transform)}));return u.call(p),this.drawFloorPlan=function(){if(u.selectAll("image").remove(),o.floor_plan){u.selectAll("image").data([0]).enter().append("svg:image").attr("xlink:href",o.floor_plan_url).attr("height",c(33.79)-c(0)).attr("width",d(50)-d(0)).style("cursor",(function(){return a.edit?"crosshair":"default"})).on("click",(function(){return a.edit&&(t=u.__transform,n=i.b,r=t?(n.offsetX-t.x)/t.k:n.offsetX,e=t?(n.offsetY-t.y)/t.k:n.offsetY,l.addTrigger&&l.addTrigger.call(f,{x:r,y:e}),i.b.stopPropagation());var t,n,r,e})),u.__transform&&u.selectAll("image").attr("transform",u.__transform)}},this.drawSensors=function(){if(u.selectAll(".sensor-layer").remove(),0!==s.length){var t=!1,n=u.selectAll(".sensor-layer").data([0]).enter().append("g").attr("class","sensor-layer");u.__transform&&n.attr("transform",u.__transform),n.selectAll(".sensor").data(s).enter().append("circle").attr("class","sensor").attr("r","5").attr("stroke","rgba(61, 207, 163, 0.3)").attr("stroke-width",5).style("fill","#3DCFA3").style("cursor",(function(){return a.edit?"move":"default"})).attr("cx",(function(t){return t.pos_x})).attr("cy",(function(t){return t.pos_y})).on("click",(function(t){return a.edit&&(function(t){l.sensorClick&&l.sensorClick.call(f,t)}(t),i.b.stopPropagation())})).call(i.a().on("drag",(function(n){a.edit&&(t=!0,i.i(this).attr("cx",n.pos_x=i.b.x).attr("cy",n.pos_y=i.b.y))})).on("end",(function(n){if(a.edit&&t)return t=!1,l.sensorMoved&&l.sensorMoved.call(f,n)})))}},this.setData=function(t){s=(o=t).sensors,u.__transform=null,this.redraw(!0)},this.redraw=function(t){t&&(u.__transform=null,u.call(p.transform,i.k)),this.drawFloorPlan(),this.drawSensors()},this.editMode=function(t){a.edit=t,this.redraw(!1)},o&&this.drawFloorPlan(),this.drawSensors(),this};function d(t,n,r,e,o,s,a){try{var i=t[s](a),l=i.value}catch(t){return void r(t)}i.done?n(l):Promise.resolve(l).then(e,o)}function c(t){return function(){var n=this,r=arguments;return new Promise((function(e,o){var s=t.apply(n,r);function a(t){d(s,e,o,a,i,"next",t)}function i(t){d(s,e,o,a,i,"throw",t)}a(void 0)}))}}var f="/api/sensors",u="/api/locations",p="/api/floors",g={title:"Sensors",props:["bldg_id","bldg_name","floor_id"],components:{Loader:a.b,Modal:a.d},data:function(){return{mapper:null,loaded:!1,bldg:null,floors:[],floorSel:null,sensors:[],editMapper:!1,showEntry:!1,editMode:!1,entry:{id:null,sensor:"",name:"",pos_x:0,pos_y:0},state:{saving:!1,removing:!1}}},computed:{baseUrl:function(){return Object(s.b)()},floor:function(){var t=this;return this.floorSel?this.floors.find((function(n){return n.hid===t.floorSel})):null},building:function(){return this.bldg_name?this.bldg_name:this.bldg?this.bldg.name:""}},methods:{getBldg:function(t){var n=this;return c(o.a.mark((function r(){var e,s;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,axios.get(u,{params:{id:t}});case 2:e=r.sent,s=e.data,n.bldg=s;case 5:case"end":return r.stop()}}),r)})))()},getFloors:function(t,n){var r=this;return c(o.a.mark((function e(){var s,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(p,{params:{bid:t}});case 2:s=e.sent,(a=s.data).forEach((function(t){t.floor_plan_url="".concat(r.baseUrl,"/plans/").concat(t.floor_plan)})),r.floors=a.sort((function(t,n){return t.floor_no>n.floor_no?1:t.floor_no<n.floor_no?-1:0})),r.floor_id?r.floorSel=r.floor_id:r.floors.length>0&&(r.floorSel=r.floors[0].hid),setTimeout((function(){n&&n()}),0);case 8:case"end":return e.stop()}}),e)})))()},floorChange:function(){var t=this;this.getSensors(this.floorSel,(function(){t.mapper.setData(t.floor)}))},getSensors:function(t,n){var r=this;return c(o.a.mark((function e(){var s,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(f,{params:{fid:t}});case 2:s=e.sent,a=s.data,r.floors.find((function(n){return n.hid===t})).sensors=a,setTimeout((function(){n&&n()}),0);case 7:case"end":return e.stop()}}),e)})))()},toggleEditMode:function(t){this.editMapper=t,this.mapper.editMode(t)},setupMapper:function(){var t=this;t.mapper=new l("#floor-map",t.floor,{addTrigger:function(n){t.triggerAdd(n.x,n.y)},sensorClick:function(n){t.triggerEdit(n.hid)},sensorMoved:function(t){axios.put("".concat(f,"/coord/").concat(t.hid),{pos_x:t.pos_x,pos_y:t.pos_y})}})},toggleEntry:function(t){var n=this;this.showEntry=t,t&&setTimeout((function(){n.$refs.sensor.focus()}),0)},toggleSaving:function(t){this.state.saving=t},triggerAdd:function(t,n){this.entry.id=null,this.entry.sensor="",this.entry.pos_x=t,this.entry.pos_y=n,this.editMode=!1,this.toggleEntry(!0)},addSensor:function(){var t=this;return c(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),axios.post(f,{floor:t.floor.hid,sensor_id:t.entry.sensor,name:t.entry.name,pos_x:t.entry.pos_x,pos_y:t.entry.pos_y}).then((function(n){t.toggleSaving(!1);var r=n.data;r.r&&(t.floor.sensors.push(r.data),t.mapper.drawSensors(),t.toggleEntry(!1))}));case 2:case"end":return n.stop()}}),n)})))()},triggerEdit:function(t){var n=this.floor.sensors.find((function(n){return n.hid===t}));this.entry.id=t,this.entry.sensor=n.sensor_id,this.entry.name=n.name,this.entry.pos_x=n.pos_x,this.entry.pos_y=n.pos_y,this.editMode=!0,this.toggleEntry(!0)},upSensor:function(){var t=this;return c(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),axios.put("".concat(f,"/").concat(t.entry.id),{sensor_id:t.entry.sensor,name:t.entry.name}).then((function(n){if(t.toggleSaving(!1),n.data.r){var r=t.floor.sensors.find((function(n){return n.hid===t.entry.id}));r.sensor_id=t.entry.sensor,r.name=t.entry.name,t.mapper.drawSensors(),t.toggleEntry(!1)}}));case 2:case"end":return n.stop()}}),n)})))()},delSensor:function(){var t=this;return c(o.a.mark((function n(){var r,e,s;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=t.entry.id,e=t.floor.sensors.findIndex((function(t){return t.hid===r})),s=t.floor.sensors[e],confirm("Remove sensor ".concat(s.sensor_id,"?"))&&(t.state.removing=!0,axios.delete("".concat(f,"/").concat(r)).then((function(n){t.state.removing=!1,n.data.r&&(t.floor.sensors.splice(e,1),t.mapper.drawSensors(),t.toggleEntry(!1))})));case 2:case"end":return n.stop()}}),n)})))()}},created:function(){this.bldg_name||this.getBldg(this.bldg_id)},mounted:function(){var t=this;t.getFloors(t.bldg_id,(function(){t.loaded=!0,t.getSensors(t.floor.hid,(function(){t.setupMapper()}))}))}},m=(r(34),r(1)),v=Object(m.a)(g,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"content"},[r("h1",[t._v(t._s(t.building?t.building+" Sensors":"Sensors"))]),t._v(" "),r("transition",{attrs:{name:"fade"}},[t.loaded?r("div",{attrs:{id:"sensor-mapper"}},[r("div",{attrs:{id:"mapper-options"}},[r("div",{staticClass:"input-field"},[r("label",[t._v("Floor")]),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.floorSel,expression:"floorSel"}],on:{change:[function(n){var r=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.floorSel=n.target.multiple?r:r[0]},t.floorChange]}},t._l(t.floors,(function(n){return r("option",{key:n.hid,domProps:{value:n.hid}},[t._v(t._s(n.ordinal_no)+" Floor")])})),0)]),t._v(" "),t.editMapper?[r("button",{staticClass:"btn btn-primary",on:{click:function(n){return t.toggleEditMode(!1)}}},[t._v("Close Edit")])]:r("button",{staticClass:"btn btn-primary",on:{click:function(n){return t.toggleEditMode(!0)}}},[t._v("Edit Mode")])],2),t._v(" "),r("div",{attrs:{id:"floor-map"}})]):t._e()]),t._v(" "),r("modal",{attrs:{show:t.showEntry},on:{close:function(n){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[r("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" Sensor")])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?t._e():r("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addSensor}},[t._v(t._s(t.state.saving?"Adding...":"Add"))]),t._v(" "),t.editMode?[r("button",{staticClass:"btn btn-danger btn-link",attrs:{disabled:t.state.removing},on:{click:t.delSensor}},[t._v(t._s(t.state.removing?"Removing...":"Remove"))]),t._v(" "),r("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upSensor}},[t._v(t._s(t.state.saving?"Updating...":"Update"))])]:t._e()]},proxy:!0}])},[t._v(" "),r("div",{attrs:{id:"entry-wrapper"}},[r("div",{staticClass:"input-field"},[r("label",[t._v("Sensor")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.sensor,expression:"entry.sensor"}],ref:"sensor",attrs:{type:"text"},domProps:{value:t.entry.sensor},on:{input:function(n){n.target.composing||t.$set(t.entry,"sensor",n.target.value)}}})]),t._v(" "),r("div",{staticClass:"input-field"},[r("label",[t._v("Name")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.name,expression:"entry.name"}],attrs:{type:"text",placeholder:"(Optional)"},domProps:{value:t.entry.name},on:{input:function(n){n.target.composing||t.$set(t.entry,"name",n.target.value)}}})])])]),t._v(" "),r("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,null,null);n.default=v.exports}}]);