(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{187:function(e,t,n){var i=n(264);"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(8)(i,r);i.locals&&(e.exports=i.locals)},263:function(e,t,n){"use strict";n(187)},264:function(e,t,n){(e.exports=n(7)(!1)).push([e.i,".svg-wrapper[data-v-321e6dc3]{text-align:right}.svg-wrapper .building-svg[data-v-321e6dc3]{padding:0 36px}.info-wrapper[data-v-321e6dc3]{padding:150px 36px 0}.info-wrapper table[data-v-321e6dc3]{border-collapse:collapse}.info-wrapper .info-header th[data-v-321e6dc3]{font-weight:400}.info-wrapper .floor-info[data-v-321e6dc3]{line-height:26px;border-bottom:1px solid rgba(255,255,225,.1)}.info-wrapper .floor-info[data-v-321e6dc3]:last-child{border-bottom:none}.info-wrapper .floor-info td[data-v-321e6dc3]{padding:10px 0}.info-wrapper .floor-info td[data-v-321e6dc3]:first-child{text-align:left}.info-wrapper .floor-info .occ-badge[data-v-321e6dc3]{display:inline-block;padding:0 16px;border-radius:4px}.info-wrapper .floor-info .occ-badge.live-badge[data-v-321e6dc3]{cursor:pointer;transition:background-color .24s}.info-wrapper .floor-info .occ-badge.green[data-v-321e6dc3]{background-color:#01fe01}.info-wrapper .floor-info .occ-badge.green[data-v-321e6dc3]:hover{background-color:#01cb01}.info-wrapper .floor-info .occ-badge.yellow[data-v-321e6dc3]{background-color:#ff8600}.info-wrapper .floor-info .occ-badge.yellow[data-v-321e6dc3]:hover{background-color:#cc6b00}.info-wrapper .floor-info .occ-badge.orange[data-v-321e6dc3]{background-color:#ed0003}.info-wrapper .floor-info .occ-badge.orange[data-v-321e6dc3]:hover{background-color:#ba0002}",""])},435:function(e,t,n){"use strict";n.r(t);var i=n(1),r=n.n(i),o=n(5),a=n(22),s=n(9),c=n(6),l=n(0);function d(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function f(e,t,n,i,r,o,a){try{var s=e[o](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(i,r)}function p(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var o=e.apply(t,n);function a(e){f(o,i,r,a,s,"next",e)}function s(e){f(o,i,r,a,s,"throw",e)}a(void 0)}))}}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h="/api/floors",w={title:"Occupancy",props:["bldg_id"],components:{BuildingSvg:a.a,CaretIcon:s.a,CaretLeftIcon:s.b,GraphFilter:o.e,Loader:o.f},data:function(){return{buildings:[],building:null,bldgFilter:null,loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,floors:[],floorsReverse:[],sensors:[],liveWS:null,wsConnected:!1}},computed:v(v(v({},Object(c.d)({user:function(e){return e.user}})),Object(c.b)({api_header:"backend/api_header",api_customers:"backend/api_customers",api_buildings:"backend/api_buildings",api_building_overview:"backend/api_building_overview",api_sensors_by_node:"backend/api_sensors_by_node"})),{},{buildingFilters:function(){return this.buildings.map((function(e){return{value:e.id,label:e.name}}))}}),methods:{wsConnect:function(){var e=this,t=parseInt("443");this.liveWS=new Paho.MQTT.Client("mqtt.intuitive.works",t,"intuitive_app_".concat(parseInt(100*Math.random(),10))),this.liveWS.onConnectionLost=function(t){e.wsConnected=!1,0!=t.errorCode&&(console.log("wsClosed: ",t.errorMessage),e.wsConnect())},this.liveWS.onMessageArrived=function(t){var n=JSON.parse(t.payloadString),i=n.sensorId,r=n.occupancy_status,o="0"==r?"available":"1"==r?"occupied":null,a=e.sensors.find((function(e){return e.id===i}));if(a&&o){var s=e.floors.find((function(e){return e.id==a.fid}));a.sensor_state=o,s&&"occupied"==o?s.occupancy_limit+=1:s&&"available"==o&&(s.occupancy_limit-=1)}},this.liveWS.connect({useSSL:!0,userName:"intuitive-api",password:"TRuhC3jBFrb3",onSuccess:function(t){e.wsConnected=!0,e.sensors.forEach((function(t){e.liveWS.subscribe("sensor_data/".concat(t.id,"/data"))})),console.log("wsConnect.onSuccess",t)},onFailure:function(t){e.wsConnected=!1,console.log("wsConnect.onFailure: ",t)}})},wsClose:function(){this.liveWS.disconnect()},windowUnload:function(){this.wsClose()},backTo:function(){this.$router.back()},getBuildings:function(){var e=this;return p(r.a.mark((function t(){var n,i,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.user.company_id,t.next=3,axios.get(e.api_buildings(n),e.api_header());case 3:return i=t.sent,o=i.data,e.buildings=o,e.bldg_id?e.building=o.find((function(t){return t.id===e.bldg_id})):e.building=o[0],e.bldgFilter=e.building.id,t.next=10,e.getBuildingOverview(e.building.id);case 10:e.loaded=!0,e.wsConnect();case 12:case"end":return t.stop()}}),t)})))()},getBuildingOverview:function(e){var t=this;return p(r.a.mark((function n(){var i,o,a,s,c,u;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=t.user.company_id,n.next=3,axios.all([axios.get(t.api_building_overview(i,e),t.api_header()),axios.get(h,{params:{bid:e}}),axios.get(t.api_sensors_by_node(e,"Building"),t.api_header())]);case 3:o=n.sent,a=o[0].data,s=o[1].data,c=o[2].data,u=[],t.sensors=[],a.children.forEach((function(e){var n,i=s.find((function(t){return t.ref_id==e.id}));e.ordinal_no=Object(l.y)(e.number),e.occupancy_limit=(null==i?void 0:i.occupancy_limit)||0,e.occupancy_live=0;var r=e.children.filter((function(e){return"Desk Area"==e.type})),o=r.map((function(e){return e.id}));e.areas=r;var a=c.filter((function(e){return o.indexOf(e.parent_id)>=0}));a.forEach((function(t){t.fid=e.id,t.sensor_state="available"})),(n=t.sensors).push.apply(n,d(a)),delete e.children,u.push(e)})),t.floors=u.sort((function(e,t){return e.number>t.number?1:e.number<t.number?-1:0})),t.floorsReverse=u.sort((function(e,t){return e.number>t.number?-1:e.number<t.number?1:0}));case 9:case"end":return n.stop()}}),n)})))()},getLiveColor:function(e,t){var n=e/t*100;return{green:n<50,yellow:n>=50,orange:n>=90}},filterSelect:function(e,t,n){this.showFilter=!1,this.building=this.buildings.find((function(t){return t.id===e})),this.bldgFilter=e,this.getBuildingOverview(this.building.id)},toggleEmbed:function(e){e&&(this.showPageOpts=!1),this.showEmbed=e},floorClick:function(e){this.toLive(e.id)},toLive:function(e){this.$router.push({name:"live",query:{bid:this.building.id,fid:e}})}},mounted:function(){this.getBuildings(),Object(l.a)(window,"beforeunload",this.windowUnload)},destroyed:function(){this.wsConnected&&this.wsClose(),Object(l.s)(window,"beforeunload",this.windowUnload)}},_=(n(263),n(4)),m=Object(_.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[e.loaded&&e.building?[n("div",{staticClass:"graph-header"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:e.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),e._v("\n                    Back\n                ")])]),e._v(" "),n("div",{staticClass:"graph-filters"},[n("graph-filter",{attrs:{placeholder:"Select Building",filters:e.buildingFilters,chosen:e.bldgFilter,chosenAsSelected:!0},on:{onSelect:e.filterSelect}})],1),e._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(t){e.showPageOpts=!e.showPageOpts}}},[n("span",{staticClass:"dot"}),e._v(" "),n("span",{staticClass:"dot"}),e._v(" "),n("span",{staticClass:"dot"})]),e._v(" "),n("transition",{attrs:{name:"fadeUp"}},[e.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(t){return e.toggleEmbed(!0)}}},[e._v("Embed")])])])]):e._e()])],1),e._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"chart-header"},[n("span",{staticClass:"chart-title"},[e._v(e._s(e.building.name)+" Occupancy")])]),e._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col svg-wrapper"},[n("building-svg",{attrs:{floors:e.floors,clickableFloor:!0},on:{floorClick:e.floorClick}})],1),e._v(" "),n("div",{staticClass:"col info-wrapper"},[n("table",[e._m(0),e._v(" "),n("tbody",e._l(e.floorsReverse,(function(t){return n("tr",{key:t.id,staticClass:"floor-info"},[n("td",[e._v(e._s(t.ordinal_no+" Floor"))]),e._v(" "),n("td",[n("span",{staticClass:"occ-badge live-badge",class:e.getLiveColor(t.occupancy_live,t.occupancy_limit),on:{click:function(n){return e.toLive(t.id)}}},[e._v(e._s(t.occupancy_live))])]),e._v(" "),n("td",[n("span",{staticClass:"occ-badge limit-badge orange"},[e._v(e._s(t.occupancy_limit))])])])})),0)])])])])]:e._e(),e._v(" "),n("loader",{attrs:{show:!e.loaded,type:"ripple"}})],2)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",{staticClass:"info-header"},[t("th",{attrs:{width:"100"}}),this._v(" "),t("th",{attrs:{width:"80"}},[this._v("Live")]),this._v(" "),t("th",{attrs:{width:"80"}},[this._v("Limit")])])])}],!1,null,"321e6dc3",null);t.default=m.exports}}]);