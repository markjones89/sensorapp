(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{124:function(t,e,n){"use strict";n(53)},125:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,"#location-list[data-v-1d7d2bb2],#location-list #add-btn[data-v-1d7d2bb2]{margin-top:24px}#loc-entry[data-v-1d7d2bb2]{position:relative;width:400px;max-width:100%}#loc-entry .section-header[data-v-1d7d2bb2]{margin:32px 0 8px;padding:0 0 8px;border-bottom:1px solid hsla(0,0%,100%,.1)}",""])},265:function(t,e,n){"use strict";n.r(e);var i=n(0),r=n.n(i),o=n(5),a=n(4),s=n(2),c=n(6);function l(t,e,n,i,r,o,a){try{var s=t[o](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(i,r)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var o=t.apply(e,n);function a(t){l(o,i,r,a,s,"next",t)}function s(t){l(o,i,r,a,s,"throw",t)}a(void 0)}))}}function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){p(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y="/api/locations",v={title:"Locations",components:{CaretIcon:c.a,FilterDropdown:s.d,LocationItem:s.f,Loader:s.e,Modal:s.g},data:function(){return{locations:[],cityRef:[],gCostsRef:[],cCostsRef:[],filterClient:!1,clientId:null,clientName:null,apiError:null,entry:{parent:null,id:null,name:"",continent:"",country:"",state:"",city:"",info:{rental_sqm:0,rental_sqft:0,furniture_cost:0,employee_allocation:0}},loaded:!1,showEntry:!1,editMode:!1,state:{saving:!1}}},computed:f(f(f({},Object(o.d)({user:function(t){return t.user},clients:function(t){return t.clients},client:function(t){return t.locations.client}})),Object(o.b)({api_header:"backend/api_header",api_customers:"backend/api_customers",api_buildings:"backend/api_buildings",api_building:"backend/api_building",buildings:"locations/getBuildings",building:"locations/getBuilding"})),{},{continents:function(){return this.cityRef.map((function(t){return t.continent}))},countries:function(){var t=this;return this.cityRef.filter((function(e){return e.continent===t.entry.continent})).map((function(t){return t.countries.map((function(t){return{country:t.country,timezone:t.timezone}}))}))[0]},states:function(){var t=this;return this.cityRef.filter((function(e){return e.continent===t.entry.continent})).map((function(e){return e.countries.filter((function(e){return e.country===t.entry.country})).map((function(t){return t.states.map((function(t){return t.state||t.province}))}))[0]}))[0]},cities:function(){var t=this;return this.cityRef.filter((function(e){return e.continent===t.entry.continent})).map((function(e){return e.countries.filter((function(e){return e.country===t.entry.country})).map((function(e){return e.states.filter((function(e){return(e.state||e.province)===t.entry.state})).map((function(t){return t.cities}))[0]}))[0]}))[0]},locationList:function(){var t=this.locations.sort((function(t,e){return t.name>e.name?1:t.name<e.name?-1:0})),e=["continent","country","state","city"],n=[],i={_:n};return t.forEach((function(t){e.reduce((function(e,n){if(!e[t[n]]&&(e[t[n]]={_:[]},t[n])){var i,r=(p(i={},"name",t[n]),p(i,"children",e[t[n]]._),i);"city"===n&&(r.continent=t.continent,r.country=t.country,r.state=t.state,r.city=t.city),["continent","country","state","city"].indexOf(n)>=0&&(r.collapsed=t["".concat(n,"_collapsed")]),e._.push(r)}return e[t[n]]}),i)._.push(t)})),n},clientList:function(){return this.clients.map((function(t){return{label:t.name,value:t.id}}))},companyId:function(){return this.clientId||this.user.company_id}}),watch:{"entry.city":function(t){var e=this;if(!this.editMode){var n=this.gCostsRef.find((function(n){return n.country===e.entry.country&&n.city===t})),i=this.cCostsRef.find((function(n){return n.country===e.entry.country&&n.city===t}));i?(this.entry.info.rental_sqm=i.rental_metre,this.entry.info.rental_sqft=i.rental_foot,this.entry.info.furniture_cost=i.furniture_cost):n&&(this.entry.info.rental_sqm=n.rental_metre,this.entry.info.rental_sqft=n.rental_foot,this.entry.info.furniture_cost=n.furniture_cost)}}},methods:f(f({},Object(o.c)({setClients:"setClients",setClient:"locations/setClient",setBuildings:"locations/setBuildings",setBuilding:"locations/setBuilding",setFloors:"locations/setFloors"})),{},{getReferences:function(){var t=this;return u(r.a.mark((function e(){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.all([axios.get("/assets/cities"),axios.get("".concat(y,"/").concat(t.companyId,"/costs"))]);case 2:n=e.sent,t.cityRef=n[0].data,t.gCostsRef=n[1].data.global_costs,t.cCostsRef=n[1].data.cust_costs;case 6:case"end":return e.stop()}}),e)})))()},putCityRefs:function(t){return u(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:axios.put("/assets/cities",{data:t});case 1:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return u(r.a.mark((function e(){var n,i,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.clientId||t.user.company_id){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,axios.get(t.api_buildings(n),t.api_header());case 6:i=e.sent,(o=i.data).forEach((function(e){var n,i,r,o,a=t.buildings.find((function(t){return t.id==e.id}));e.continent_collapsed=null!==(n=null==a?void 0:a.continent_collapsed)&&void 0!==n&&n,e.country_collapsed=null!==(i=null==a?void 0:a.country_collapsed)&&void 0!==i&&i,e.state_collapsed=null!==(r=null==a?void 0:a.state_collapsed)&&void 0!==r&&r,e.city_collapsed=null!==(o=null==a?void 0:a.city_collapsed)&&void 0!==o&&o})),t.locations=o,t.setBuildings(t.locations),t.apiError=null,e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),t.locations=[],t.setBuildings([]),t.apiError=e.t0.response.data.message;case 19:t.loaded=!0;case 20:case"end":return e.stop()}}),e,null,[[3,14]])})))()},selectClient:function(t,e){this.clientId=t,this.clientName=e,this.filterClient=!1,this.setClient(t),this.loaded=!1,this.getReferences(),this.getData()},metreRentalKeyUp:function(){this.entry.info.rental_sqft=(.092903*this.entry.info.rental_sqm).toFixed(2)},footRentalKeyUp:function(){this.entry.info.rental_sqm=(this.entry.info.rental_sqft/.092903).toFixed(2)},toggleEntry:function(t){var e=this;this.showEntry=t,t&&setTimeout((function(){e.$refs.location.focus()}),0)},toggleSaving:function(t){this.state.saving=t},triggerAdd:function(t,e,n){var i=this,r=Intl.DateTimeFormat().resolvedOptions().timeZone;this.entry.parent=t,this.entry.id=null,this.entry.name="",this.entry.info.rental_sqm=0,this.entry.info.rental_sqft=0,this.entry.info.furniture_cost=0,this.entry.info.employee_allocation=0,r.startsWith("Africa")?this.entry.continent="Africa":r.startsWith("America")?this.entry.continent="North America":r.startsWith("Antarctica")?this.entry.continent="Antarctica":r.startsWith("Europe")?this.entry.continent="Europe":r.startsWith("Asia")?this.entry.continent="Asia":r.startsWith("Australia")?this.entry.continent="Oceania":this.entry.continent=this.continents[0].name,setTimeout((function(){i.entry.country=i.countries[0].country}),0),e?(this.entry.continent=e.continent||e.name,setTimeout((function(){i.entry.country=e.country}),0),setTimeout((function(){i.entry.state=e.state}),0),setTimeout((function(){i.entry.city=e.city}),0)):(this.entry.state="",this.entry.city=""),this.editMode=!1,this.toggleEntry(!0)},getEntry:function(){return{name:this.entry.name,city:this.entry.city,state:this.entry.state,country:this.entry.country,continent:this.entry.continent,rental_sqm:this.entry.info.rental_sqm,rental_sqft:this.entry.info.rental_sqft,furniture_cost:this.entry.info.furniture_cost,employee_allocation:this.entry.info.employee_allocation}},saveCustCosts:function(t,e,n,i,r){var o=this.cCostsRef.find((function(n){return n.country===t&&n.city===e}));o?(o.rental_sqm=n,o.rental_sqft=i,o.furniture_cost=r):this.cCostsRef.push({country:t,city:e,rental_sqm:n,rental_sqft:i,furniture_cost:r})},addLoc:function(){var t=this;return u(r.a.mark((function e(){var n,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.getEntry(),t.toggleSaving(!0),e.next=4,axios.post(t.api_buildings(t.companyId),n,t.api_header());case 4:200==(i=e.sent).status?(n.id=i.data.child_id,n.continent_collapsed=!1,n.country_collapsed=!1,n.state_collapsed=!1,n.city_collapsed=!1,t.locations.push(n),t.toggleSaving(!1),t.toggleEntry(!1),axios.post("".concat(y,"/").concat(t.user.company.hid,"/costs"),n).then((function(e){e.data.r&&t.saveCustCosts(t.entry.country,t.entry.city,n.rental_sqm,n.rental_sqft,n.furniture_cost)}))):t.toggleSaving(!1);case 6:case"end":return e.stop()}}),e)})))()},triggerEdit:function(t){var e=this.locations.find((function(e){return e.id===t}));this.entry.id=t,this.entry.parent=e.pid,this.entry.name=e.name,this.entry.continent=e.continent,this.entry.country=e.country,this.entry.state=e.state,this.entry.city=e.city,this.entry.info.rental_sqm=e.rental_sqm,this.entry.info.rental_sqft=e.rental_sqft,this.entry.info.furniture_cost=e.furniture_cost,this.entry.info.employee_allocation=e.employee_allocation,this.editMode=!0,this.toggleEntry(!0)},upLoc:function(){var t=this;return u(r.a.mark((function e(){var n,i,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.getEntry(),i=t.entry.id,t.toggleSaving(!0),e.next=4,axios.put(t.api_building(t.companyId,i),n,t.api_header());case 4:200==e.sent.status?((o=t.locations.find((function(t){return t.id==i}))).name=t.entry.name,o.city=t.entry.city,o.state=t.entry.state,o.country=t.entry.country,o.continent=t.entry.continent,o.rental_sqm=t.entry.info.rental_sqm,o.rental_sqft=t.entry.info.rental_sqft,o.furniture_cost=t.entry.info.furniture_cost,o.employee_allocation=t.entry.info.employee_allocation,t.toggleSaving(!1),t.toggleEntry(!1),axios.post("".concat(y,"/").concat(t.user.company.hid,"/costs"),n).then((function(e){e.data.r&&t.saveCustCosts(t.entry.country,t.entry.city,n.rental_sqm,n.rental_sqft,n.furniture_cost)}))):t.toggleSaving(!1);case 6:case"end":return e.stop()}}),e)})))()},delLoc:function(t){var e=this;return u(r.a.mark((function n(){var i,o;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o=(i=e).locations.findIndex((function(e){return e.id===t})),i.$duDialog(null,"Remove <strong>".concat(i.locations[o].name,"</strong>?"),i.$duDialog.OK_CANCEL,{okText:"Remove",callbacks:{okClick:function(e){this.hide(),i.toggleSaving(!0),axios.delete(i.api_building(this.companyId,t),i.api_header).then((function(t){i.toggleSaving(!1),200==t.data.status&&i.locations.splice(o,1)}))}}});case 2:case"end":return n.stop()}}),n)})))()},toggleSubs:function(t,e,n){this.locations.filter((function(n){return n[e]==t.name})).forEach((function(t){return t["".concat(e,"_collapsed")]=n})),t.collapsed=n},toSetup:function(t){var e=this.locations.find((function(e){return e.id===t})),n=this.building;(n&&n.hid!==e.hid||!n)&&(this.setBuilding(e),this.setFloors([])),this.$parent.$router.push({name:"building_setup",params:{bid:t,bldg_name:e.name}})},toMapper:function(t){var e=this.locations.find((function(e){return e.id===t})),n=this.building;(n&&n.hid!==e.hid||!n)&&(this.setBuilding(e),this.setFloors([])),this.$parent.$router.push({name:"mapper",params:{bid:t,bldg_name:e.name}})},pageOptsHandler:function(t){["mousedown","touchend"].indexOf(t.type)>=0?t.target.closest(".graph-filter")||(this.filterClient=!1):"keydown"===t.type&&27===t.keyCode&&(this.filterClient=!1)}}),created:function(){var t=this;return u(r.a.mark((function e(){var n,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.user.isSuper){e.next=10;break}if(0!=t.clients.length){e.next=7;break}return e.next=4,axios.get(t.api_customers,t.api_header());case 4:n=e.sent,i=n.data,t.setClients(i);case 7:t.client?(t.clientId=t.client,t.clientName=t.clients.find((function(e){return e.id==t.client})).name):t.selectClient(t.clients[0].id,t.clients[0].name),e.next=12;break;case 10:return e.next=12,t.getReferences();case 12:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;return u(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t.buildings.length){e.next=5;break}return e.next=3,t.getData();case 3:e.next=7;break;case 5:t.locations=t.buildings,t.loaded=!0;case 7:Object(a.a)(document,["mousedown","touchend","keydown"],t.pageOptsHandler);case 8:case"end":return e.stop()}}),e)})))()},destroyed:function(){Object(a.g)(document,["mousedown","touchend","keydown"],this.pageOptsHandler)}},m=(n(124),n(3)),_=Object(m.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t.loaded?n("div",{staticClass:"graph-header"},[n("h2",{staticClass:"page-title"},[t._v("Locations")]),t._v(" "),t.user.isSuper?n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter",on:{click:function(e){t.filterClient=!t.filterClient}}},[t._v("\n                "+t._s(t.clientName?t.clientName:"Select Location")+"\n                "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.clientList,show:t.filterClient},on:{onSelect:t.selectClient}})],1)]):t._e()]):t._e(),t._v(" "),n("transition",{attrs:{name:"fadeUp",appear:""}},[t.loaded&&!t.apiError?n("div",{attrs:{id:"location-list"}},[t._l(t.locationList,(function(e){return n("location-item",{key:e.name,attrs:{item:e,subs:e.children,depth:0},on:{onAdd:t.triggerAdd,onEdit:t.triggerEdit,onDel:t.delLoc,onSetup:t.toSetup,onMapper:t.toMapper,collapse:t.toggleSubs}})})),t._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{id:"add-btn"},on:{click:function(e){return t.triggerAdd(null,null)}}},[t._v("Add Building")])],2):t._e(),t._v(" "),t.loaded&&t.apiError?n("div",{staticClass:"error-display"},[t._v("\n            "+t._s(t.apiError)+"\n        ")]):t._e()]),t._v(" "),n("modal",{attrs:{show:t.showEntry},on:{close:function(e){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[n("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" Building")])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upLoc}},[t._v(t._s(t.state.saving?"Updating...":"Update"))]):n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addLoc}},[t._v(t._s(t.state.saving?"Adding...":"Add"))])]},proxy:!0}])},[t._v(" "),n("div",{attrs:{id:"loc-entry"}},[n("div",{staticClass:"input-field"},[n("label",[t._v("Name")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.name,expression:"entry.name"}],ref:"location",attrs:{type:"text"},domProps:{value:t.entry.name},on:{input:function(e){e.target.composing||t.$set(t.entry,"name",e.target.value)}}})]),t._v(" "),n("h3",{staticClass:"section-header"},[t._v("Address")]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("Continent")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.continent,expression:"entry.continent"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"continent",e.target.multiple?n:n[0])}}},t._l(t.continents,(function(e){return n("option",{key:e},[t._v(t._s(e))])})),0)]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("Country")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.country,expression:"entry.country"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"country",e.target.multiple?n:n[0])}}},t._l(t.countries,(function(e){return n("option",{key:e.country},[t._v(t._s(e.country))])})),0)]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("Region/Province/State")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.state,expression:"entry.state"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"state",e.target.multiple?n:n[0])}}},t._l(t.states,(function(e){return n("option",{key:e},[t._v(t._s(e))])})),0)]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("City/Municipality")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.city,expression:"entry.city"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"city",e.target.multiple?n:n[0])}}},t._l(t.cities,(function(e){return n("option",{key:e},[t._v(t._s(e))])})),0)]),t._v(" "),n("h3",{staticClass:"section-header"},[t._v("Details")]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-6"},[n("div",{staticClass:"input-field"},[n("label",[t._v("Rental per m"),n("sup",[t._v("2")])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.rental_sqm,expression:"entry.info.rental_sqm"}],attrs:{type:"text"},domProps:{value:t.entry.info.rental_sqm},on:{keyup:t.metreRentalKeyUp,input:function(e){e.target.composing||t.$set(t.entry.info,"rental_sqm",e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"col-12 col-md-6"},[n("div",{staticClass:"input-field"},[n("label",[t._v("Rental per ft"),n("sup",[t._v("2")])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.rental_sqft,expression:"entry.info.rental_sqft"}],attrs:{type:"text"},domProps:{value:t.entry.info.rental_sqft},on:{keyup:t.footRentalKeyUp,input:function(e){e.target.composing||t.$set(t.entry.info,"rental_sqft",e.target.value)}}})])])]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-6"},[n("div",{staticClass:"input-field"},[n("label",[t._v("Workspace Furniture Cost")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.furniture_cost,expression:"entry.info.furniture_cost"}],attrs:{type:"text"},domProps:{value:t.entry.info.furniture_cost},on:{input:function(e){e.target.composing||t.$set(t.entry.info,"furniture_cost",e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"col-12 col-md-6"},[n("div",{staticClass:"input-field"},[n("label",[t._v("Allocated People")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.info.employee_allocation,expression:"entry.info.employee_allocation"}],attrs:{type:"text"},domProps:{value:t.entry.info.employee_allocation},on:{input:function(e){e.target.composing||t.$set(t.entry.info,"employee_allocation",e.target.value)}}})])])])])]),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"1d7d2bb2",null);e.default=_.exports},53:function(t,e,n){var i=n(125);"string"==typeof i&&(i=[[t.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(8)(i,r);i.locals&&(t.exports=i.locals)}}]);