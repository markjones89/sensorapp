(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{111:function(t,n,e){"use strict";var i=e(28);e.n(i).a},112:function(t,n,e){(t.exports=e(7)(!1)).push([t.i,"#location-list[data-v-339cf046] {\n  margin-top: 24px;\n}\n#location-list #add-btn[data-v-339cf046] {\n  margin-top: 24px;\n}\n#loc-entry[data-v-339cf046] {\n  position: relative;\n  width: 400px;\n}\n#loc-entry .section-header[data-v-339cf046] {\n  margin: 32px 0 8px 0;\n  padding: 0 0 8px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}",""])},221:function(t,n,e){"use strict";e.r(n);var i=e(1),r=e.n(i),o=e(4),a=e(2);function s(t,n,e,i,r,o,a){try{var s=t[o](a),c=s.value}catch(t){return void e(t)}s.done?n(c):Promise.resolve(c).then(i,r)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(i,r){var o=t.apply(n,e);function a(t){s(o,i,r,a,c,"next",t)}function c(t){s(o,i,r,a,c,"throw",t)}a(void 0)}))}}function u(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var l="/api/locations",f={title:"Locations",components:{LocationItem:a.f,Loader:a.e,Modal:a.g},data:function(){return{user:null,locations:[],cityRef:[],gCostsRef:[],cCostsRef:[],entry:{parent:null,id:null,name:"",continent:"",country:"",state:"",city:"",is_building:!1,info:{rental_metre:0,rental_foot:0,furniture_cost:0,people_alloc:0}},loaded:!1,showEntry:!1,editMode:!1,state:{saving:!1}}},computed:{userCompany:function(){return this.user?this.user.company.name:null},compId:function(){return this.user?this.user.cid:null},continents:function(){return this.cityRef.map((function(t){return t.continent}))},countries:function(){var t=this;return this.cityRef.filter((function(n){return n.continent===t.entry.continent})).map((function(t){return t.countries.map((function(t){return{country:t.country,timezone:t.timezone}}))}))[0]},states:function(){var t=this;return this.cityRef.filter((function(n){return n.continent===t.entry.continent})).map((function(n){return n.countries.filter((function(n){return n.country===t.entry.country})).map((function(t){return t.states.map((function(t){return t.state||t.province}))}))[0]}))[0]},cities:function(){var t=this;return this.cityRef.filter((function(n){return n.continent===t.entry.continent})).map((function(n){return n.countries.filter((function(n){return n.country===t.entry.country})).map((function(n){return n.states.filter((function(n){return(n.state||n.province)===t.entry.state})).map((function(t){return t.cities}))[0]}))[0]}))[0]},locationList:function(){var t=this,n=["continent","parent","state","city"],e=[],i={_:e};return t.locations.forEach((function(e){var r;e.parent=(r=e.pid||e.hid,t.locations.find((function(t){return t.hid===r}))).name,n.reduce((function(t,n){if(!t[e[n]]&&(t[e[n]]={_:[]},e[n])){var i,r=(u(i={},"name",e[n]),u(i,"children",t[e[n]]._),i);"parent"===n&&(r.pid=e.pid,r.hid=e.hid),"continent"!==n&&(r.continent=e.continent,r.country=e.country),["state","city"].indexOf(n)>-1&&(r.state=e.state),"city"===n&&(r.city=e.city),t._.push(r)}return t[e[n]]}),i)._.push(e)})),e}},watch:{"entry.city":function(t){var n=this;if(!this.editMode){var e=this.gCostsRef.find((function(e){return e.country===n.entry.country&&e.city===t})),i=this.cCostsRef.find((function(e){return e.country===n.entry.country&&e.city===t}));console.log(e,i),i?(this.entry.info.rental_metre=i.rental_metre,this.entry.info.rental_foot=i.rental_foot,this.entry.info.furniture_cost=i.furniture_cost):e&&(this.entry.info.rental_metre=e.rental_metre,this.entry.info.rental_foot=e.rental_foot,this.entry.info.furniture_cost=e.furniture_cost)}}},methods:{jsonGet:function(){var t=this;return c(r.a.mark((function n(){var e,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.get("/assets/cities");case 2:e=n.sent,i=e.data,t.cityRef=i;case 5:case"end":return n.stop()}}),n)})))()},jsonPut:function(t){return c(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:axios.put("/assets/cities",{data:t});case 1:case"end":return n.stop()}}),n)})))()},getCostsRefs:function(){var t=this;return c(r.a.mark((function n(){var e,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.get("".concat(l,"/").concat(t.user.company.hid,"/costs"));case 2:e=n.sent,i=e.data,t.gCostsRef=i.global_costs,t.cCostsRef=i.cust_costs;case 6:case"end":return n.stop()}}),n)})))()},getData:function(){var t=this;return c(r.a.mark((function n(){var e,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.get(l,{params:{cid:t.compId}});case 2:e=n.sent,(i=e.data).forEach((function(t){t.state&&t.city&&(t.is_building=!0)})),t.locations=i,t.loaded=!0;case 7:case"end":return n.stop()}}),n)})))()},metreRentalKeyUp:function(){this.entry.info.rental_foot=(.092903*this.entry.info.rental_metre).toFixed(2)},footRentalKeyUp:function(){this.entry.info.rental_metre=(this.entry.info.rental_foot/.092903).toFixed(2)},toggleEntry:function(t){var n=this;this.showEntry=t,t&&setTimeout((function(){n.$refs.location.focus()}),0)},toggleSaving:function(t){this.state.saving=t},triggerAdd:function(t,n,e){var i=this,r=Intl.DateTimeFormat().resolvedOptions().timeZone,o=e>0;this.entry.parent=t,this.entry.id=null,this.entry.name="",this.entry.is_building=o,this.entry.info.rental_metre=0,this.entry.info.rental_foot=0,this.entry.info.furniture_cost=0,this.entry.info.people_alloc=0,r.startsWith("Africa")?this.entry.continent="Africa":r.startsWith("America")?this.entry.continent="North America":r.startsWith("Antarctica")?this.entry.continent="Antarctica":r.startsWith("Europe")?this.entry.continent="Europe":r.startsWith("Asia")?this.entry.continent="Asia":r.startsWith("Australia")?this.entry.continent="Oceania":this.entry.continent=this.continents[0].name,setTimeout((function(){i.entry.country=i.countries[0].country}),0),n?(this.entry.continent=n.continent||n.name,setTimeout((function(){i.entry.country=n.country}),0),setTimeout((function(){i.entry.state=n.state}),0),setTimeout((function(){i.entry.city=n.city}),0)):(this.entry.state="",this.entry.city=""),this.editMode=!1,this.toggleEntry(!0)},getEntry:function(t){var n={name:this.entry.name,continent:this.entry.continent,country:this.entry.country,state:this.entry.parent?this.entry.state:null,city:this.entry.parent?this.entry.city:null};return t||(n.company=this.compId),this.entry.parent&&(n.parent=this.entry.parent),this.entry.is_building&&(n.building_info={rental_metre:this.entry.info.rental_metre,rental_foot:this.entry.info.rental_foot,furniture_cost:this.entry.info.furniture_cost,people_alloc:this.entry.info.people_alloc}),n},saveCustCosts:function(t,n,e,i,r){var o=this.cCostsRef.find((function(e){return e.country===t&&e.city===n}));o?(o.rental_metre=e,o.rental_foot=i,o.furniture_cost=r):this.cCostsRef.push({country:t,city:n,rental_metre:e,rental_foot:i,furniture_cost:r})},addLoc:function(){var t=this;return c(r.a.mark((function n(){var e;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=t.getEntry(!1),t.toggleSaving(!0),axios.post(l,e).then((function(n){t.toggleSaving(!1);var i=n.data;i.r&&(i.data.is_building=t.entry.is_building,t.locations.push(i.data),i.saved_to_cust&&t.saveCustCosts(t.entry.country,t.entry.city,e.building_info.rental_metre,e.building_info.rental_foot,e.building_info.furniture_cost),t.toggleEntry(!1))}));case 3:case"end":return n.stop()}}),n)})))()},triggerEdit:function(t){var n=this.locations.find((function(n){return n.hid===t}));this.entry.id=t,this.entry.parent=n.pid,this.entry.name=n.name,this.entry.continent=n.continent,this.entry.country=n.country,this.entry.state=n.state,this.entry.city=n.city,this.entry.is_building=n.is_building,n.building_info?(this.entry.info.rental_metre=n.building_info.rental_metre,this.entry.info.rental_foot=n.building_info.rental_foot,this.entry.info.furniture_cost=n.building_info.furniture_cost,this.entry.info.people_alloc=n.building_info.people_alloc):(this.entry.info.rental_metre=0,this.entry.info.rental_foot=0,this.entry.info.furniture_cost=0,this.entry.info.people_alloc=0),this.editMode=!0,this.toggleEntry(!0)},upLoc:function(){var t=this;return c(r.a.mark((function n(){var e;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),e=t.getEntry(!0),axios.put("".concat(l,"/").concat(t.entry.id),e).then((function(n){t.toggleSaving(!1);var i=n.data;if(i.r){var r=t.locations.find((function(n){return n.hid==t.entry.id}));r.name=t.entry.name,r.continent=t.entry.continent,r.country=t.entry.country,r.state=t.entry.state,r.city=t.entry.city,t.entry.is_building&&(r.building_info=e.building_info),i.saved_to_cust&&t.saveCustCosts(t.entry.country,t.entry.city,e.building_info.rental_metre,e.building_info.rental_foot,e.building_info.furniture_cost),t.toggleEntry(!1)}}));case 3:case"end":return n.stop()}}),n)})))()},delLoc:function(t){var n=this;return c(r.a.mark((function e(){var i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n.locations.findIndex((function(n){return n.hid===t})),confirm("Remove ".concat(n.locations[i].name," from locations?"))&&(n.toggleSaving(!0),axios.delete("".concat(l,"/").concat(t)).then((function(t){n.toggleSaving(!1),t.data.r&&n.locations.splice(i,1)})));case 2:case"end":return e.stop()}}),e)})))()},toFloors:function(t){var n=this.locations.find((function(n){return n.hid===t})),e=o.a.getBldg();(e&&e.hid!==n.hid||!e)&&(o.a.setBldg(n),o.a.setFloors([])),this.$parent.$router.push({name:"floors",params:{bid:t,bldg_name:n.name}})},toMapper:function(t){var n=this.locations.find((function(n){return n.hid===t})),e=o.a.getBldg();(e&&e.hid!==n.hid||!e)&&(o.a.setBldg(n),o.a.setFloors([])),this.$parent.$router.push({name:"mapper",params:{bid:t,bldg_name:n.name}})}},created:function(){this.user=o.a.getUser(),this.jsonGet(),this.getCostsRefs()},mounted:function(){this.getData()}},d=(e(111),e(3)),y=Object(d.a)(f,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content"},[e("h1",[t._v(t._s(t.user.isAdmin?t.userCompany+" Locations":"Locations"))]),t._v(" "),e("transition",{attrs:{name:"fadeUp",appear:""}},[t.loaded?e("div",{attrs:{id:"location-list"}},[t._l(t.locationList,(function(n){return e("location-item",{key:n.name,attrs:{item:n,subs:n.children,depth:0},on:{onAdd:t.triggerAdd,onEdit:t.triggerEdit,onDel:t.delLoc,onSetup:t.toFloors,onMapper:t.toMapper}})})),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{id:"add-btn"},on:{click:function(n){return t.triggerAdd(null,null,0)}}},[t._v("Add Location")])],2):t._e()]),t._v(" "),e("modal",{attrs:{show:t.showEntry},on:{close:function(n){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[e("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" "+t._s(t.entry.is_building?"Building":"Location"))])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?e("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upLoc}},[t._v(t._s(t.state.saving?"Updating...":"Update"))]):e("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addLoc}},[t._v(t._s(t.state.saving?"Adding...":"Add"))])]},proxy:!0}])},[t._v(" "),e("div",{attrs:{id:"loc-entry"}},[e("div",{staticClass:"input-field"},[e("label",[t._v("Name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.name,expression:"entry.name"}],ref:"location",attrs:{type:"text"},domProps:{value:t.entry.name},on:{input:function(n){n.target.composing||t.$set(t.entry,"name",n.target.value)}}})]),t._v(" "),t.entry.is_building?e("h3",{staticClass:"section-header"},[t._v("Address")]):t._e(),t._v(" "),e("div",{staticClass:"input-field"},[e("label",[t._v("Continent")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.continent,expression:"entry.continent"}],on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"continent",n.target.multiple?e:e[0])}}},t._l(t.continents,(function(n){return e("option",{key:n},[t._v(t._s(n))])})),0)]),t._v(" "),e("div",{staticClass:"input-field"},[e("label",[t._v("Country")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.country,expression:"entry.country"}],on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"country",n.target.multiple?e:e[0])}}},t._l(t.countries,(function(n){return e("option",{key:n.country},[t._v(t._s(n.country))])})),0)]),t._v(" "),t.entry.parent?e("div",{staticClass:"input-field"},[e("label",[t._v("State/Province")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.state,expression:"entry.state"}],on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"state",n.target.multiple?e:e[0])}}},t._l(t.states,(function(n){return e("option",{key:n},[t._v(t._s(n))])})),0)]):t._e(),t._v(" "),t.entry.parent?e("div",{staticClass:"input-field"},[e("label",[t._v("City/Municipality")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.city,expression:"entry.city"}],on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"city",n.target.multiple?e:e[0])}}},t._l(t.cities,(function(n){return e("option",{key:n},[t._v(t._s(n))])})),0)]):t._e(),t._v(" "),t.entry.is_building?[e("h3",{staticClass:"section-header"},[t._v("Details")]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"input-field"},[e("label",[t._v("Rental per m"),e("sup",[t._v("2")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.rental_metre,expression:"entry.info.rental_metre"}],attrs:{type:"text"},domProps:{value:t.entry.info.rental_metre},on:{keyup:t.metreRentalKeyUp,input:function(n){n.target.composing||t.$set(t.entry.info,"rental_metre",n.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col"},[e("div",{staticClass:"input-field"},[e("label",[t._v("Rental per ft"),e("sup",[t._v("2")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.rental_foot,expression:"entry.info.rental_foot"}],attrs:{type:"text"},domProps:{value:t.entry.info.rental_foot},on:{keyup:t.footRentalKeyUp,input:function(n){n.target.composing||t.$set(t.entry.info,"rental_foot",n.target.value)}}})])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"input-field"},[e("label",[t._v("Workspace Furniture Cost")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.furniture_cost,expression:"entry.info.furniture_cost"}],attrs:{type:"text"},domProps:{value:t.entry.info.furniture_cost},on:{input:function(n){n.target.composing||t.$set(t.entry.info,"furniture_cost",n.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col"},[e("div",{staticClass:"input-field"},[e("label",[t._v("Allocated People")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.people_alloc,expression:"entry.info.people_alloc"}],attrs:{type:"text"},domProps:{value:t.entry.info.people_alloc},on:{input:function(n){n.target.composing||t.$set(t.entry.info,"people_alloc",n.target.value)}}})])])])]:t._e()],2)]),t._v(" "),e("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"339cf046",null);n.default=y.exports},28:function(t,n,e){var i=e(112);"string"==typeof i&&(i=[[t.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};e(8)(i,r);i.locals&&(t.exports=i.locals)}}]);