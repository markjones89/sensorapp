(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{130:function(t,e,n){"use strict";n(53)},131:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,'.graph-content .range-toggle[data-v-2456ef72]{flex:0;padding-bottom:24px}#live-view[data-v-2456ef72]{flex:1 auto;display:flex;flex-direction:column}#live-view #comfort-map[data-v-2456ef72]{flex:1 auto;display:flex;justify-content:center}#live-view #comfort-map #temp-legend[data-v-2456ef72]{display:flex;flex-direction:column;justify-content:center;text-align:left;margin-left:64px}#live-view #comfort-map #temp-legend .legend[data-v-2456ef72]{display:flex;align-items:center;margin-bottom:10px}#live-view #comfort-map #temp-legend .legend .dot[data-v-2456ef72]{position:relative;width:10px;height:10px;border-radius:50%;margin-right:12px}#live-view #comfort-map #temp-legend .legend .dot[data-v-2456ef72]:before{content:"";position:absolute;top:50%;left:50%;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%)}#live-view #comfort-map #temp-legend .legend .dot.orange[data-v-2456ef72]{background-color:#ff8600}#live-view #comfort-map #temp-legend .legend .dot.orange[data-v-2456ef72]:before{background-color:rgba(255,134,0,.3)}#live-view #comfort-map #temp-legend .legend .dot.green[data-v-2456ef72]{background-color:#01fe01}#live-view #comfort-map #temp-legend .legend .dot.green[data-v-2456ef72]:before{background-color:rgba(1,254,1,.3)}#live-view #comfort-map #temp-legend .legend .dot.blue[data-v-2456ef72]{background-color:#0998ff}#live-view #comfort-map #temp-legend .legend .dot.blue[data-v-2456ef72]:before{background-color:rgba(9,152,255,.3)}',""])},15:function(t,e,n){"use strict";var r=n(2),a=n(1);e.a=function(t,e,n){var o=this,i=r.y(t),s=function(){return i.node().parentNode.getBoundingClientRect().width||800},l=function(){return i.node().parentNode.getBoundingClientRect().height||400},c=s(),d=l(),f=e,u=f.sensors||[],p=Object(a.c)({edit:!1,heatmap:!1,comfortmap:!1},n),m=p.events,g={x:0,y:0,scale:0},h={sensorMapping:!1,showSensors:!1,areaMapping:!1,showAreas:!1,drawing:!1,polyMoved:!1},v=[],_=r.w().domain([0,50]).range([0,c]),b=r.w().domain([0,33.79]).range([0,d]),w=this,y=r.x().domain([0,1,2]).range(["#01FE01","#FF8600","#ED0003"]),x=r.x().domain([0,1,2]).range(["rgba(1,254,1,0.3)","rgba(255,134,0,0.3)","rgba(237,0,3,0.3)"]);i.selectAll("svg").remove(),i.selectAll(".tooltip").remove();var F=i.append("div").attr("class","tooltip"),C=i.append("svg").attr("width",c).attr("height",d).style("display","block").style("background","#ffffff").on("click",(function(){if(p.edit){var t=r.i,e=document.elementFromPoint(t.x,t.y);if("svg"!==e.tagName){var n=k.__transform,a=n?(t.offsetX-n.x)/n.k:t.offsetX,o=n?(t.offsetY-n.y)/n.k:t.offsetY;if((n&&1===n.z||!n)&&(a-=g.x,o-=g.y),h.sensorMapping){var i="polygon"===e.tagName?r.y(e.parentNode).data()[0]:null;return m&&m.sensorAdd&&m.sensorAdd.call(w,{x:a,y:o,scale:g.scale,area:i})}}}}));p.events&&C.style("pointer-events","all"),(p.heatmap||p.comfortmap)&&C.append("defs").append("filter").attr("id","blur").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feGaussianBlur").attr("stdDeviation",p.heatmap?7:15);var k=C.selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),M=k.append("g").attr("class","image-layer"),O=k.append("g").attr("class","sensor-layer"),P=r.E().scaleExtent([1,8]).on("zoom",(function(){k.__transform=r.i.transform;var t=(1-k.__transform.k)*(_.range()[1]-_.range()[0]),e=(1-k.__transform.k)*(b.range()[1]-b.range()[0]);k.__transform.x=Math.min(_.range()[0],Math.max(k.__transform.x,t)),k.__transform.y=Math.min(b.range()[0],Math.max(k.__transform.y,e)),M.attr("transform",k.__transform),O.attr("transform",k.__transform)}));function j(t,e){var n=this,a=new Image;m&&m.imgLoad&&m.imgLoad.call(this,t),a.src=t,a.onload=function(){var t,o,i=l(),f=s(),u=a.height>i?i/a.height:f/a.width,p=Math.min(Math.min(a.width*u,a.width),f),g=Math.min(Math.min(a.height*u,a.height),i);return c=t=p,d=o=g,_=r.w().domain([0,50]).range([0,t]),b=r.w().domain([0,33.79]).range([0,o]),C.attr("width",t).attr("height",o),m&&m.imgLoaded&&m.imgLoaded.call(n,a),e&&e({height:a.height,width:a.width})}}function S(t){j(f.floor_plan_url,(function(e){var n=d-e.height<c-e.width?d/e.height:c/e.width,r=e.width*n,a=e.height*n,o=(c-r)/2,i=(d-a)/2;g.x=o<0?0:o,g.y=i<0?0:i,g.scale=n,t&&t()}))}function E(t,e,n){n&&F.html(n),F.style("left","".concat(t,"px")).style("top","".concat(e,"px"))}function D(t){p.edit&&h.sensorMapping&&(t.dragged=!0,r.y(this).attr("cx",t.pos_x=r.i.x).attr("cy",t.pos_y=r.i.y))}function A(t){if(p.edit&&h.sensorMapping&&t.dragged)return t.dragged=!1,t.pos_x-=g.x,t.pos_y-=g.y,t.scale=g.scale,m&&m.sensorMoved&&m.sensorMoved.call(w,t)}return k.call(P),this.drawFloorPlan=function(){if(M.selectAll("image").remove(),k.__transform&&M.attr("transform",k.__transform),f.floor_plan){var t=p.edit&&(h.sensorMapping||h.areaMapping);M.insert("image",":first-child").attr("xlink:href",f.floor_plan_url).attr("height",b(33.79)-b(0)).attr("width",_(50)-_(0)).style("cursor",(function(){return t?"crosshair":"default"}))}},this.drawSensors=function(){if(O.selectAll(".sensor").remove(),k.__transform&&O.attr("transform",k.__transform),0!==u.length){var t=p.edit&&h.sensorMapping;O.selectAll(".sensor").data(u).enter().append("circle").attr("class","sensor").attr("data-id",(function(t){return t.id})).attr("r",p.heatmap?15:p.comfortmap?35:5).attr("stroke-width",p.heatmap||p.comfortmap?null:5).attr("stroke",p.heatmap||p.comfortmap?null:x(0)).style("fill",y(0)).attr("filter",p.heatmap||p.comfortmap?"url(#blur)":null).style("cursor",(function(){return t?"move":"default"})).attr("cx",(function(t){var e=parseFloat(g.scale.toFixed(12));return t.pos_x/t.scale*e+g.x})).attr("cy",(function(t){var e=parseFloat(g.scale.toFixed(12));return t.pos_y/t.scale*e+g.y})).on("mouseover",(function(){if(!p.comfortmap){var t=r.y(this),e=u.find((function(e){return e.id===t.attr("data-id")}));F.transition().duration(200).style("opacity",.95),E(r.i.offsetX+15,r.i.offsetY-F.node().getBoundingClientRect().height/2,"<div>ID: ".concat(e.sensor_id,"</div><div>Name: ").concat(e.name?e.name:"(None)","</div>"))}})).on("mousemove",(function(){p.comfortmap||E(r.i.offsetX+15,r.i.offsetY-F.node().getBoundingClientRect().height/2)})).on("mouseout",(function(){p.comfortmap||F.transition().duration(200).style("opacity",0)})).on("click",(function(e){return t&&(function(t){m&&m.sensorClick&&m.sensorClick.call(w,t)}(e),r.i.stopPropagation())})).call(r.h().on("drag",D).on("end",A))}},this.setSensorColor=function(t,e){var n="occupied"===e?1:0;O.select('.sensor[data-id="'.concat(t,'"]')).style("fill",y(n)).attr("stroke",x(n))},this.setData=function(t){u=(f=t).sensors,k.__transform=null,this.redraw(!0)},this.redraw=function(t){var e=this;if(!f.floor_plan)return M.selectAll("image").remove(),void O.selectAll(".sensor").remove();t?(k.__transform=null,k.call(P.transform,r.F),S((function(){e.drawFloorPlan(),e.drawSensors()}))):(this.drawFloorPlan(),this.drawSensors()),this.clearDrawing()},this.editMode=function(t){p.edit=t,this.redraw(!1)},this.setAreaMapping=function(t){t&&(h.sensorMapping=!1),h.areaMapping=t,this.redraw(!1)},this.clearDrawing=function(){h.drawing=!1,v.splice(0)},this.setSensorMapping=function(t){t&&(h.areaMapping=!1),h.sensorMapping=t,this.redraw(!1)},f&&f.floor_plan&&S((function(){o.drawFloorPlan(),o.drawSensors()})),this}},297:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(5),i=n(1),s=n(8),l=n(4),c=n(15);function d(t,e,n,r,a,o,i){try{var s=t[o](i),l=s.value}catch(t){return void n(t)}s.done?e(l):Promise.resolve(l).then(r,a)}function f(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){d(o,r,a,i,s,"next",t)}function s(t){d(o,r,a,i,s,"throw",t)}i(void 0)}))}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){m(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g="/api/floors",h="/api/sensors",v={title:"Comfort Map",props:["bldg_id","floor_id"],components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:l.a,DateRangeToggle:l.c,FilterDropdown:l.d,Loader:l.f,TimeSlider:l.i},data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,building:null,floors:[],floor:null,floorFilter:null,mapper:null,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:p(p(p({},Object(o.e)({user:function(t){return t.user}})),Object(o.c)({api_header:"backend/api_header",api_building_overview:"backend/api_building_overview",api_floors:"backend/api_floors",api_sensors_by_node:"backend/api_sensors_by_node"})),{},{settings:function(){return this.user.company?this.user.company.settings:null},baseUrl:function(){return Object(i.d)()},floorFilters:function(){return this.floors.map((function(t){return{value:t.id,label:"".concat(t.ordinal_no," Floor")}}))},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},filterSelect:function(t,e){var n=this;return f(a.a.mark((function r(){return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.showFilter=!1,n.floor=n.floors.find((function(e){return e.id===t})),n.floorFilter=e,r.next=5,n.getFloorData(t);case 5:n.mapper.setData(n.floor);case 6:case"end":return r.stop()}}),r)})))()},toLive:function(){this.$router.push({name:"live",query:{bid:this.bldg_id,fid:this.floor.id}})},rangeSelect:function(t,e,n){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},getBuilding:function(t){var e=this;return f(a.a.mark((function n(){var r,o,s,l,c,d;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.user.company_id,n.next=3,axios.all([axios.get(g,{params:{bid:t}}),axios.get(e.api_building_overview(r,t),e.api_header())]);case 3:return o=n.sent,s=o[0].data,l=o[1].data,c=[],l.children.forEach((function(t){var n=s.find((function(e){return e.ref_id==t.id}));t.ordinal_no=Object(i.u)(t.number),t.occupancy_limit=null==n?void 0:n.occupancy_limit,t.floor_plan=null==n?void 0:n.floor_plan,t.floor_plan_url=null!=n&&n.floor_plan?"".concat(e.baseUrl,"/plans/").concat(n.floor_plan):null,delete t.children,delete t.building,c.push(t)})),delete l.children,e.building=l,e.floors=c.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),d=e.floor_id?e.floor_id:e.floors[0].id,e.floor=e.floors.find((function(t){return t.id===d})),e.floorFilter="".concat(e.floor.ordinal_no," Floor"),n.next=14,e.getFloorData(d);case 14:e.loaded=!0,setTimeout((function(){e.setFloorMap()}),0);case 16:case"end":return n.stop()}}),n)})))()},getFloorData:function(t){var e=this;return f(a.a.mark((function n(){var r,o,i;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.all([axios.get(e.api_sensors_by_node(t,"Floor"),e.api_header()),axios.get(h,{fid:t})]);case 2:r=n.sent,o=r[0].data,i=r[1].data,o.forEach((function(t){var e=i.find((function(e){return e.ref_id==t.id}));e&&(t.pos_x=e.pos_x,t.pos_y=e.pos_y,t.scale=e.scale)})),e.floor.sensors=o;case 6:case"end":return n.stop()}}),n)})))()},setFloorMap:function(){this.mapper=new c.a("#floor-map",this.floor,{comfortmap:!0})}},mounted:function(){this.bldg_id&&this.getBuilding(this.bldg_id)}},_=(n(130),n(3)),b=Object(_.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t.loaded?n("div",{staticClass:"graph-wrapper"},[n("div",{staticClass:"graph-header"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                        "+t._s(t.floorFilter?t.floorFilter:"Select Floor")+"\n                        "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.floorFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"chart-header"},[n("span",{staticClass:"chart-title"},[t._v(t._s(t.floor.ordinal_no+" Floor")+" Comfort Map")]),t._v(" "),n("span",{staticClass:"chart-subtitle"},[t._v(t._s(t.building.name))])]),t._v(" "),n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)],1),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"}),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])]):t._e(),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"live-view"}},[e("div",{attrs:{id:"comfort-map"}},[e("div",{staticClass:"floor-map",attrs:{id:"floor-map"}}),this._v(" "),e("div",{attrs:{id:"temp-legend"}},[e("div",{staticClass:"legend"},[e("span",{staticClass:"dot orange"}),this._v("More than 24°c\n                        ")]),this._v(" "),e("div",{staticClass:"legend"},[e("span",{staticClass:"dot green"}),this._v("22°c - 24°c\n                        ")]),this._v(" "),e("div",{staticClass:"legend"},[e("span",{staticClass:"dot blue"}),this._v("Less than 21°c\n                        ")])])])])}],!1,null,"2456ef72",null);e.default=b.exports},53:function(t,e,n){var r=n(131);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,a);r.locals&&(t.exports=r.locals)}}]);