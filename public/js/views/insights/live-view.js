(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{17:function(t,e,r){"use strict";var n=r(2),a=r(0);e.a=function(t,e,r){var o=this,s=n.y(t),i=function(){return s.node().parentNode.getBoundingClientRect().width||800},l=function(){return s.node().parentNode.getBoundingClientRect().height||400},c=i(),d=l(),u=e,f=u.sensors||[],p=Object(a.e)({edit:!1,heatmap:!1,comfortmap:!1},r),v=p.events,h={x:0,y:0,scale:0},m={sensorMapping:!1,showSensors:!1,areaMapping:!1,showAreas:!1,drawing:!1,polyMoved:!1},g=[],_=n.w().domain([0,50]).range([0,c]),b=n.w().domain([0,33.79]).range([0,d]),w=this,y=n.x().domain([0,1,2]).range(["#01FE01","#FF8600","#ED0003"]),C=n.x().domain([0,1,2]).range(["rgba(1,254,1,0.3)","rgba(255,134,0,0.3)","rgba(237,0,3,0.3)"]);s.selectAll("svg").remove(),s.selectAll(".tooltip").remove();var x=s.append("div").attr("class","tooltip"),k=s.append("svg").attr("width",c).attr("height",d).style("display","block").style("background","#ffffff").on("click",(function(){if(p.edit){var t=n.i,e=document.elementFromPoint(t.x,t.y);if("svg"!==e.tagName){var r=S.__transform,a=r?(t.offsetX-r.x)/r.k:t.offsetX,o=r?(t.offsetY-r.y)/r.k:t.offsetY;if((r&&1===r.z||!r)&&(a-=h.x,o-=h.y),m.sensorMapping){var s="polygon"===e.tagName?n.y(e.parentNode).data()[0]:null;return v&&v.sensorAdd&&v.sensorAdd.call(w,{x:a,y:o,scale:h.scale,area:s})}}}}));p.livePulse&&k.attr("class","live-pulse"),p.events&&k.style("pointer-events","all"),(p.heatmap||p.comfortmap)&&k.append("defs").append("filter").attr("id","blur").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feGaussianBlur").attr("stdDeviation",p.heatmap?7:15);var S=k.selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),M=S.append("g").attr("class","image-layer"),F=S.append("g").attr("class","sensor-layer"),O=n.E().scaleExtent([1,8]).on("zoom",(function(){S.__transform=n.i.transform;var t=(1-S.__transform.k)*(_.range()[1]-_.range()[0]),e=(1-S.__transform.k)*(b.range()[1]-b.range()[0]);S.__transform.x=Math.min(_.range()[0],Math.max(S.__transform.x,t)),S.__transform.y=Math.min(b.range()[0],Math.max(S.__transform.y,e)),M.attr("transform",S.__transform),F.attr("transform",S.__transform)}));function j(t,e){var r=this,a=new Image;v&&v.imgLoad&&v.imgLoad.call(this,t),a.src=t,a.onload=function(){var t,o,s=l(),u=i(),f=a.height>s?s/a.height:u/a.width,p=Math.min(Math.min(a.width*f,a.width),u),h=Math.min(Math.min(a.height*f,a.height),s);return c=t=p,d=o=h,_=n.w().domain([0,50]).range([0,t]),b=n.w().domain([0,33.79]).range([0,o]),k.attr("width",t).attr("height",o),v&&v.imgLoaded&&v.imgLoaded.call(r,a),e&&e({height:a.height,width:a.width})}}function P(t){j(u.floor_plan_url,(function(e){var r=d-e.height<c-e.width?d/e.height:c/e.width,n=e.width*r,a=e.height*r,o=(c-n)/2,s=(d-a)/2;h.x=o<0?0:o,h.y=s<0?0:s,h.scale=r,t&&t()}))}function A(t,e,r){var n=document.body.clientWidth;r&&x.html(r),t<0&&(t=0),t>n&&(t-=Math.abs(n-t)),x.style("left","".concat(t,"px")).style("top","".concat(e,"px"))}function D(t){p.edit&&m.sensorMapping&&(t.dragged=!0,n.y(this).attr("cx",t.pos_x=n.i.x).attr("cy",t.pos_y=n.i.y))}function E(t){if(p.edit&&m.sensorMapping&&t.dragged)return t.dragged=!1,t.pos_x-=h.x,t.pos_y-=h.y,t.scale=h.scale,v&&v.sensorMoved&&v.sensorMoved.call(w,t)}return S.call(O),this.drawFloorPlan=function(){if(M.selectAll("image").remove(),S.__transform&&M.attr("transform",S.__transform),u.floor_plan){var t=p.edit&&(m.sensorMapping||m.areaMapping);M.insert("image",":first-child").attr("xlink:href",u.floor_plan_url).attr("height",b(33.79)-b(0)).attr("width",_(50)-_(0)).style("cursor",(function(){return t?"crosshair":"default"}))}},this.drawSensors=function(){if(F.selectAll(".sensor").remove(),S.__transform&&F.attr("transform",S.__transform),0!==f.length){var t=p.edit&&m.sensorMapping;F.selectAll(".sensor").data(f).enter().append("circle").attr("class","sensor").attr("data-id",(function(t){return t.id})).attr("r",p.heatmap?15:p.comfortmap?35:5).attr("stroke-width",p.livePulse||p.heatmap||p.comfortmap?null:5).attr("stroke",p.livePulse||p.heatmap||p.comfortmap?null:C(0)).style("fill",y(0)).attr("filter",p.heatmap||p.comfortmap?"url(#blur)":null).style("cursor",(function(){return t?"move":"default"})).attr("cx",(function(t){var e=parseFloat(h.scale.toFixed(12));return t.pos_x/t.scale*e+h.x})).attr("cy",(function(t){var e=parseFloat(h.scale.toFixed(12));return t.pos_y/t.scale*e+h.y})).on("mouseover",(function(){if(!p.comfortmap){var t=n.y(this),e=f.find((function(e){return e.id===t.attr("data-id")}));p.heatmap||t.classed("hovered",!0),x.transition().duration(200).style("opacity",.95);var r=x.node().getBoundingClientRect();A(n.i.pageX-r.width/2,n.i.pageY-(r.height+10)-window.scrollY,"<div>ID: ".concat(e.sensor_id,"</div>\n                    <div>Name: ").concat(e.name?e.name:"(None)","</div>\n                    <div>Area: ").concat(e.parent,"</div>"))}})).on("mousemove",(function(){if(!p.comfortmap){var t=x.node().getBoundingClientRect();A(n.i.pageX-t.width/2,n.i.pageY-(t.height+10)-window.scrollY)}})).on("mouseout",(function(){p.comfortmap||(p.heatmap||n.y(this).classed("hovered",!1),x.transition().duration(200).style("opacity",0))})).on("click",(function(e){return t&&(function(t){v&&v.sensorClick&&v.sensorClick.call(w,t)}(e),n.i.stopPropagation())})).call(n.h().on("drag",D).on("end",E))}},this.setSensorColor=function(t,e){var r="occupied"===e?1:0;F.select('.sensor[data-id="'.concat(t,'"]')).style("fill",y(r)).attr("stroke",C(r)).attr("class","sensor ".concat(e))},this.setData=function(t){f=(u=t).sensors,S.__transform=null,this.redraw(!0)},this.redraw=function(t){var e=this;if(!u.floor_plan)return M.selectAll("image").remove(),void F.selectAll(".sensor").remove();t?(S.__transform=null,S.call(O.transform,n.F),P((function(){e.drawFloorPlan(),e.drawSensors()}))):(this.drawFloorPlan(),this.drawSensors()),this.clearDrawing()},this.editMode=function(t){p.edit=t,this.redraw(!1)},this.setAreaMapping=function(t){t&&(m.sensorMapping=!1),m.areaMapping=t,this.redraw(!1)},this.clearDrawing=function(){m.drawing=!1,g.splice(0)},this.setSensorMapping=function(t){t&&(m.areaMapping=!1),m.sensorMapping=t,this.redraw(!1)},u&&u.floor_plan&&P((function(){o.drawFloorPlan(),o.drawSensors()})),this}},190:function(t,e,r){var n=r(269);"string"==typeof n&&(n=[[t.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(8)(n,a);n.locals&&(t.exports=n.locals)},268:function(t,e,r){"use strict";r(190)},269:function(t,e,r){(t.exports=r(7)(!1)).push([t.i,"#live-view[data-v-65c1cfb0]{flex:1 auto;display:flex;flex-direction:column}#live-view #floor-plan[data-v-65c1cfb0]{flex:1 auto;display:flex;justify-content:center;min-height:50vh}#live-view #floor-stats[data-v-65c1cfb0]{display:flex;margin-top:32px;justify-content:space-around}#live-view .stat-group[data-v-65c1cfb0]{display:inline-flex;flex-direction:column;color:#fff;width:100px;margin-top:24px;overflow:hidden}#live-view .stat-group span[data-v-65c1cfb0]{padding:4px}#live-view .stat-group+.stat-group[data-v-65c1cfb0]{margin-left:24px}#live-view .stat-group .stat[data-v-65c1cfb0]{border-radius:4px 4px 0 0}#live-view .stat-group.free .stat[data-v-65c1cfb0]{background-color:#3dcfa3}#live-view .stat-group.occupied .stat[data-v-65c1cfb0]{background-color:#ff5a09}#live-view .stat-group .label[data-v-65c1cfb0]{font-size:12px;line-height:20px;border-radius:0 0 4px 4px;background-color:rgba(43,43,43,.9)}#live-view .stat-group.free .label[data-v-65c1cfb0]{background-color:rgba(61,207,163,.1)}#live-view .stat-group.occupied .label[data-v-65c1cfb0]{background-color:rgba(255,90,9,.1)}",""])},437:function(t,e,r){"use strict";r.r(e);var n=r(1),a=r.n(n),o=r(0),s=r(9),i=r(5),l=r(17),c=r(6);function d(t,e,r,n,a,o,s){try{var i=t[o](s),l=i.value}catch(t){return void r(t)}i.done?e(l):Promise.resolve(l).then(n,a)}function u(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var o=t.apply(e,r);function s(t){d(o,n,a,s,i,"next",t)}function i(t){d(o,n,a,s,i,"throw",t)}s(void 0)}))}}function f(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function v(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?v(Object(r),!0).forEach((function(e){m(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function m(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var g="/api/floors",_="/api/sensors",b={title:"Live",props:["bldg_id","floor_id"],components:{CaretIcon:s.a,CaretLeftIcon:s.b,FilterDropdown:i.d,Loader:i.f},data:function(){return{loaded:!1,mapper:null,showPageOpts:!1,showEmbed:!1,liveWS:null,wsConnected:!1,building:null,floors:[],floor:null,showFilter:!1,floorFilter:null,sensors:[],areas:[],sci_id:null}},computed:h(h(h({},Object(c.d)({user:function(t){return t.user.info}})),Object(c.b)({api_header:"backend/api_header",api_building_overview:"backend/api_building_overview",api_floors:"backend/api_floors",api_sensors_by_node:"backend/api_sensors_by_node"})),{},{baseUrl:function(){return Object(o.g)()},floorFilters:function(){return this.floors.map((function(t){return{value:t.id,label:"".concat(t.ordinal_no," Floor")}}))},freeSensors:function(){return this.sensors.filter((function(t){return"available"==t.sensor_state}))},occupiedSensors:function(){return this.sensors.filter((function(t){return"occupied"==t.sensor_state}))},freeDeskSensors:function(){return this.freeSensors.filter((function(t){return t.area&&"Desk Area"==t.area.type})).length},occupiedDeskSensors:function(){return this.occupiedSensors.filter((function(t){return t.area&&"Desk Area"==t.area.type})).length},occupiedRooms:function(){var t=this.occupiedSensors.filter((function(t){return t.area&&"Meeting Room"==t.area.type}));return f(new Set(t.map((function(t){return t.area.id}))))},occupiedRoomCount:function(){return this.occupiedRooms.length},freeRoomCount:function(){var t=this,e=this.freeSensors.filter((function(t){return t.area&&"Meeting Room"==t.area.type})).map((function(t){return t.area.id})).filter((function(e){return t.occupiedRooms.indexOf(e)<0}));return new Set(e).size}}),methods:{wsConnect:function(){var t=this,e=parseInt("443");this.liveWS=new Paho.MQTT.Client("mqtt.intuitive.works",e,"intuitive_app_".concat(parseInt(100*Math.random(),10))),this.liveWS.onConnectionLost=function(e){t.wsConnected=!1,0!=e.errorCode&&(console.log("wsClosed: ",e.errorMessage),t.wsConnect())},this.liveWS.onMessageArrived=function(e){if(t.floor){var r=JSON.parse(e.payloadString),n=r.sensorId,a=r.occupancy_status,o="0"==a?"available":"1"==a?"occupied":null,s=t.sensors.find((function(t){return t.sensor_id===n}));s&&o&&(s.sensor_state=o,t.mapper.setSensorColor(s.id,o))}},this.liveWS.connect({useSSL:!0,userName:"intuitive-api",password:"TRuhC3jBFrb3",onSuccess:function(e){t.wsConnected=!0,console.log("wsConnect.onSuccess",e),t.sensors.forEach((function(e){t.liveWS.subscribe("sensor_data/".concat(e.sensor_id,"/data"))}))},onFailure:function(e){t.wsConnected=!1,console.log("wsConnect.onFailure: ",e)}})},wsClose:function(){this.liveWS.disconnect()},windowUnload:function(){this.wsClose()},backTo:function(){this.$router.back()},filterSelect:function(t,e){var r=this;return u(a.a.mark((function n(){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.showFilter=!1,r.floor=r.floors.find((function(e){return e.id===t})),r.floorFilter=e,n.next=5,r.getFloorData(t);case 5:r.mapper.setData(r.floor);case 6:case"end":return n.stop()}}),n)})))()},toHeatMap:function(){this.$router.push({name:"heat-map",query:{bid:this.bldg_id,fid:this.floor.id}})},toComfortMap:function(){this.$router.push({name:"comfort-map",query:{bid:this.bldg_id,fid:this.floor.id}})},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},getBuilding:function(t){var e=this;return u(a.a.mark((function r(){var n,s,i,l,c,d;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.user.company_id,r.next=3,axios.all([axios.get(g,{params:{bid:t}}),axios.get(e.api_building_overview(n,t),e.api_header())]);case 3:return s=r.sent,i=s[0].data,l=s[1].data,c=[],l.children.forEach((function(t){var r=i.find((function(e){return e.ref_id==t.id}));t.ordinal_no=Object(o.y)(t.number),t.occupancy_limit=null==r?void 0:r.occupancy_limit,t.floor_plan=null==r?void 0:r.floor_plan,t.floor_plan_url=null!=r&&r.floor_plan?"".concat(e.baseUrl,"/plans/").concat(r.floor_plan):null,t.areas=t.children,delete t.children,delete t.building,c.push(t)})),delete l.children,e.building=l,e.floors=c.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),d=e.floor_id?e.floor_id:e.floors[0].id,e.floor=e.floors.find((function(t){return t.id===d})),e.floorFilter="".concat(e.floor.ordinal_no," Floor"),r.next=14,e.getFloorData(d);case 14:e.loaded=!0,setTimeout((function(){e.setFloorMap()}),100);case 16:case"end":return r.stop()}}),r)})))()},getFloorData:function(t){var e=this;return u(a.a.mark((function r(){var n,o,s;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.areas=f(e.floor.areas),r.next=3,axios.all([axios.get(e.api_sensors_by_node(t,"Floor"),e.api_header()),axios.get(_,{params:{fid:t}})]);case 3:n=r.sent,o=n[0].data,s=n[1].data,o.forEach((function(t){var r=s.find((function(e){return e.ref_id==t.id}));r&&(t.pos_x=r.pos_x,t.pos_y=r.pos_y,t.scale=r.scale),t.sensor_state="available",t.area=e.areas.find((function(e){return e.id==t.parent_id}))})),e.sensors=f(o),e.floor.sensors=e.sensors,e.wsConnect();case 9:case"end":return r.stop()}}),r)})))()},setFloorMap:function(){this.mapper=new l.a("#floor-map",this.floor,{livePulse:!0})}},mounted:function(){this.bldg_id&&this.getBuilding(this.bldg_id),Object(o.a)(window,"beforeunload",this.windowUnload)},destroyed:function(){this.wsConnected&&this.wsClose(),Object(o.s)(window,"beforeunload",this.windowUnload)}},w=(r(268),r(4)),y=Object(w.a)(b,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[t.loaded?r("div",{staticClass:"graph-wrapper"},[r("div",{staticClass:"graph-header"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),r("div",{staticClass:"graph-filters"},[r("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.floorFilter?t.floorFilter:"Select Floor")+"\n                    "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.floorFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),r("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toHeatMap}},[t._v("Heatmap")]),t._v(" "),r("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toComfortMap}},[t._v("Comfort Map")])]),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"chart-header"},[r("span",{staticClass:"chart-title"},[t._v(t._s(t.floor.ordinal_no+" Floor")+" Live View")]),t._v(" "),r("span",{staticClass:"chart-subtitle"},[t._v(t._s(t.building.name))])]),t._v(" "),r("div",{attrs:{id:"live-view"}},[t._m(0),t._v(" "),r("div",{attrs:{id:"floor-stats"}},[r("div",{attrs:{id:"desk-stats"}},[t._v("\n                        Desks\n                        "),r("div",{staticClass:"stats-wrapper"},[r("div",{staticClass:"stat-group free"},[r("span",{staticClass:"stat"},[t._v(t._s(t.freeDeskSensors))]),t._v(" "),r("span",{staticClass:"label"},[t._v("Free")])]),t._v(" "),r("div",{staticClass:"stat-group occupied"},[r("span",{staticClass:"stat"},[t._v(t._s(t.occupiedDeskSensors))]),t._v(" "),r("span",{staticClass:"label"},[t._v("Occupied")])])])]),t._v(" "),r("div",{attrs:{id:"meeting-rooms-stats"}},[t._v("\n                        Meeting Rooms\n                        "),r("div",{staticClass:"stats-wrapper"},[r("div",{staticClass:"stat-group free"},[r("span",{staticClass:"stat"},[t._v(t._s(t.freeRoomCount))]),t._v(" "),r("span",{staticClass:"label"},[t._v("Free")])]),t._v(" "),r("div",{staticClass:"stat-group occupied"},[r("span",{staticClass:"stat"},[t._v(t._s(t.occupiedRoomCount))]),t._v(" "),r("span",{staticClass:"label"},[t._v("Occupied")])])])])])])])]):t._e(),t._v(" "),r("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"floor-plan"}},[e("div",{staticClass:"floor-map",attrs:{id:"floor-map"}})])}],!1,null,"65c1cfb0",null);e.default=y.exports}}]);