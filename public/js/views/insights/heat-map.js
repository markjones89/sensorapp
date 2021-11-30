(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{16:function(t,e,n){"use strict";var r=n(2),a=n(0);e.a=function(t,e,n){var i=this,o=r.y(t),s=function(){return o.node().parentNode.getBoundingClientRect().width||800},l=function(){return o.node().parentNode.getBoundingClientRect().height||400},c=s(),d=l(),u=e,f=u.sensors||[],p=Object(a.e)({edit:!1,heatmap:!1,comfortmap:!1},n),h=p.events,m={x:0,y:0,scale:0},g={sensorMapping:!1,showSensors:!1,areaMapping:!1,showAreas:!1,drawing:!1,polyMoved:!1},v=[],_=r.w().domain([0,50]).range([0,c]),b=r.w().domain([0,33.79]).range([0,d]),w=this,y=r.x().domain([0,1,2]).range(["#01FE01","#FF8600","#ED0003"]),x=r.x().domain([0,1,2]).range(["rgba(1,254,1,0.3)","rgba(255,134,0,0.3)","rgba(237,0,3,0.3)"]);o.selectAll("svg").remove(),o.selectAll(".tooltip").remove();var F=o.append("div").attr("class","tooltip"),C=o.append("svg").attr("width",c).attr("height",d).style("display","block").style("background","#ffffff").on("click",(function(){if(p.edit){var t=r.i,e=document.elementFromPoint(t.x,t.y);if("svg"!==e.tagName){var n=k.__transform,a=n?(t.offsetX-n.x)/n.k:t.offsetX,i=n?(t.offsetY-n.y)/n.k:t.offsetY;if((n&&1===n.z||!n)&&(a-=m.x,i-=m.y),g.sensorMapping){var o="polygon"===e.tagName?r.y(e.parentNode).data()[0]:null;return h&&h.sensorAdd&&h.sensorAdd.call(w,{x:a,y:i,scale:m.scale,area:o})}}}}));p.events&&C.style("pointer-events","all"),(p.heatmap||p.comfortmap)&&C.append("defs").append("filter").attr("id","blur").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feGaussianBlur").attr("stdDeviation",p.heatmap?7:15);var k=C.selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),M=k.append("g").attr("class","image-layer"),O=k.append("g").attr("class","sensor-layer"),P=r.E().scaleExtent([1,8]).on("zoom",(function(){k.__transform=r.i.transform;var t=(1-k.__transform.k)*(_.range()[1]-_.range()[0]),e=(1-k.__transform.k)*(b.range()[1]-b.range()[0]);k.__transform.x=Math.min(_.range()[0],Math.max(k.__transform.x,t)),k.__transform.y=Math.min(b.range()[0],Math.max(k.__transform.y,e)),M.attr("transform",k.__transform),O.attr("transform",k.__transform)}));function S(t,e){var n=this,a=new Image;h&&h.imgLoad&&h.imgLoad.call(this,t),a.src=t,a.onload=function(){var t,i,o=l(),u=s(),f=a.height>o?o/a.height:u/a.width,p=Math.min(Math.min(a.width*f,a.width),u),m=Math.min(Math.min(a.height*f,a.height),o);return c=t=p,d=i=m,_=r.w().domain([0,50]).range([0,t]),b=r.w().domain([0,33.79]).range([0,i]),C.attr("width",t).attr("height",i),h&&h.imgLoaded&&h.imgLoaded.call(n,a),e&&e({height:a.height,width:a.width})}}function j(t){S(u.floor_plan_url,(function(e){var n=d-e.height<c-e.width?d/e.height:c/e.width,r=e.width*n,a=e.height*n,i=(c-r)/2,o=(d-a)/2;m.x=i<0?0:i,m.y=o<0?0:o,m.scale=n,t&&t()}))}function E(t,e,n){var r=document.body.clientWidth;n&&F.html(n),t<0&&(t=0),t>r&&(t-=Math.abs(r-t)),F.style("left","".concat(t,"px")).style("top","".concat(e,"px"))}function D(t){p.edit&&g.sensorMapping&&(t.dragged=!0,r.y(this).attr("cx",t.pos_x=r.i.x).attr("cy",t.pos_y=r.i.y))}function A(t){if(p.edit&&g.sensorMapping&&t.dragged)return t.dragged=!1,t.pos_x-=m.x,t.pos_y-=m.y,t.scale=m.scale,h&&h.sensorMoved&&h.sensorMoved.call(w,t)}return k.call(P),this.drawFloorPlan=function(){if(M.selectAll("image").remove(),k.__transform&&M.attr("transform",k.__transform),u.floor_plan){var t=p.edit&&(g.sensorMapping||g.areaMapping);M.insert("image",":first-child").attr("xlink:href",u.floor_plan_url).attr("height",b(33.79)-b(0)).attr("width",_(50)-_(0)).style("cursor",(function(){return t?"crosshair":"default"}))}},this.drawSensors=function(){if(O.selectAll(".sensor").remove(),k.__transform&&O.attr("transform",k.__transform),0!==f.length){var t=p.edit&&g.sensorMapping;O.selectAll(".sensor").data(f).enter().append("circle").attr("class","sensor").attr("data-id",(function(t){return t.id})).attr("r",p.heatmap?15:p.comfortmap?35:5).attr("stroke-width",p.heatmap||p.comfortmap?null:5).attr("stroke",p.heatmap||p.comfortmap?null:x(0)).style("fill",y(0)).attr("filter",p.heatmap||p.comfortmap?"url(#blur)":null).style("cursor",(function(){return t?"move":"default"})).attr("cx",(function(t){var e=parseFloat(m.scale.toFixed(12));return t.pos_x/t.scale*e+m.x})).attr("cy",(function(t){var e=parseFloat(m.scale.toFixed(12));return t.pos_y/t.scale*e+m.y})).on("mouseover",(function(){if(!p.comfortmap){var t=r.y(this),e=f.find((function(e){return e.id===t.attr("data-id")}));p.heatmap||t.classed("hovered",!0),F.transition().duration(200).style("opacity",.95);var n=F.node().getBoundingClientRect();E(r.i.pageX-n.width/2,r.i.pageY-(n.height+10),"<div>ID: ".concat(e.sensor_id,"</div>\n                    <div>Name: ").concat(e.name?e.name:"(None)","</div>\n                    <div>Area: ").concat(e.parent,"</div>"))}})).on("mousemove",(function(){if(!p.comfortmap){var t=F.node().getBoundingClientRect();E(r.i.pageX-t.width/2,r.i.pageY-(t.height+10))}})).on("mouseout",(function(){p.comfortmap||(p.heatmap||r.y(this).classed("hovered",!1),F.transition().duration(200).style("opacity",0))})).on("click",(function(e){return t&&(function(t){h&&h.sensorClick&&h.sensorClick.call(w,t)}(e),r.i.stopPropagation())})).call(r.h().on("drag",D).on("end",A))}},this.setSensorColor=function(t,e){var n="occupied"===e?1:0;O.select('.sensor[data-id="'.concat(t,'"]')).style("fill",y(n)).attr("stroke",x(n))},this.setData=function(t){f=(u=t).sensors,k.__transform=null,this.redraw(!0)},this.redraw=function(t){var e=this;if(!u.floor_plan)return M.selectAll("image").remove(),void O.selectAll(".sensor").remove();t?(k.__transform=null,k.call(P.transform,r.F),j((function(){e.drawFloorPlan(),e.drawSensors()}))):(this.drawFloorPlan(),this.drawSensors()),this.clearDrawing()},this.editMode=function(t){p.edit=t,this.redraw(!1)},this.setAreaMapping=function(t){t&&(g.sensorMapping=!1),g.areaMapping=t,this.redraw(!1)},this.clearDrawing=function(){g.drawing=!1,v.splice(0)},this.setSensorMapping=function(t){t&&(g.areaMapping=!1),g.sensorMapping=t,this.redraw(!1)},u&&u.floor_plan&&j((function(){i.drawFloorPlan(),i.drawSensors()})),this}},191:function(t,e,n){var r=n(272);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(8)(r,a);r.locals&&(t.exports=r.locals)},271:function(t,e,n){"use strict";n(191)},272:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,".graph-content .range-toggle[data-v-733bc20a]{flex:0;padding-bottom:24px}#live-view[data-v-733bc20a]{flex:1 auto;display:flex;flex-direction:column}#live-view #heat-map[data-v-733bc20a]{flex:1 auto;display:flex;justify-content:center;min-height:50vh}",""])},438:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),i=n(6),o=n(0),s=n(9),l=n(5),c=n(16);function d(t,e,n,r,a,i,o){try{var s=t[i](o),l=s.value}catch(t){return void n(t)}s.done?e(l):Promise.resolve(l).then(r,a)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){d(i,r,a,o,s,"next",t)}function s(t){d(i,r,a,o,s,"throw",t)}o(void 0)}))}}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m="/api/floors",g="/api/sensors",v={title:"Heat Map",props:["bldg_id","floor_id"],components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:l.a,DateRangeToggle:l.c,FilterDropdown:l.d,Loader:l.f,TimeSlider:l.i},data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,building:null,floors:[],floor:null,floorFilter:null,mapper:null,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:p(p(p({},Object(i.d)({user:function(t){return t.user}})),Object(i.b)({api_header:"backend/api_header",api_building_overview:"backend/api_building_overview",api_floors:"backend/api_floors",api_sensors_by_node:"backend/api_sensors_by_node"})),{},{settings:function(){return this.user.company?this.user.company.settings:null},baseUrl:function(){return Object(o.g)()},floorFilters:function(){return this.floors.map((function(t){return{value:t.id,label:"".concat(t.ordinal_no," Floor")}}))},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},filterSelect:function(t,e){var n=this;return u(a.a.mark((function r(){return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.showFilter=!1,n.floor=n.floors.find((function(e){return e.id===t})),n.floorFilter=e,r.next=5,n.getFloorData(t);case 5:n.mapper.setData(n.floor);case 6:case"end":return r.stop()}}),r)})))()},toLive:function(){this.$router.push({name:"live",query:{bid:this.bldg_id,fid:this.floor.id}})},rangeSelect:function(t,e,n){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},getBuilding:function(t){var e=this;return u(a.a.mark((function n(){var r,i,s,l,c,d;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.user.company_id,n.next=3,axios.all([axios.get(m,{params:{bid:t}}),axios.get(e.api_building_overview(r,t),e.api_header())]);case 3:return i=n.sent,s=i[0].data,l=i[1].data,c=[],l.children.forEach((function(t){var n=s.find((function(e){return e.ref_id==t.id}));t.ordinal_no=Object(o.y)(t.number),t.occupancy_limit=null==n?void 0:n.occupancy_limit,t.floor_plan=null==n?void 0:n.floor_plan,t.floor_plan_url=null!=n&&n.floor_plan?"".concat(e.baseUrl,"/plans/").concat(n.floor_plan):null,delete t.children,delete t.building,c.push(t)})),delete l.children,e.building=l,e.floors=c.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),d=e.floor_id?e.floor_id:e.floors[0].id,e.floor=e.floors.find((function(t){return t.id===d})),e.floorFilter="".concat(e.floor.ordinal_no," Floor"),n.next=14,e.getFloorData(d);case 14:e.loaded=!0,setTimeout((function(){e.setFloorMap()}),0);case 16:case"end":return n.stop()}}),n)})))()},getFloorData:function(t){var e=this;return u(a.a.mark((function n(){var r,i,o;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.all([axios.get(e.api_sensors_by_node(t,"Floor"),e.api_header()),axios.get(g,{fid:t})]);case 2:r=n.sent,i=r[0].data,o=r[1].data,i.forEach((function(t){var e=o.find((function(e){return e.ref_id==t.id}));e&&(t.pos_x=e.pos_x,t.pos_y=e.pos_y,t.scale=e.scale)})),e.floor.sensors=i;case 6:case"end":return n.stop()}}),n)})))()},setFloorMap:function(){this.mapper=new c.a("#floor-map",this.floor,{heatmap:!0})},windowResize:function(){this.mapper.redraw()}},mounted:function(){this.bldg_id&&this.getBuilding(this.bldg_id)},destroyed:function(){}},_=(n(271),n(4)),b=Object(_.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t.loaded?n("div",{staticClass:"graph-wrapper"},[n("div",{staticClass:"graph-header"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                        "+t._s(t.floorFilter?t.floorFilter:"Select Floor")+"\n                        "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.floorFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"chart-header"},[n("span",{staticClass:"chart-title"},[t._v(t._s(t.floor.ordinal_no+" Floor")+" Heat Map")]),t._v(" "),n("span",{staticClass:"chart-subtitle"},[t._v(t._s(t.building.name))])]),t._v(" "),n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)],1),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"}),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])]):t._e(),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"live-view"}},[e("div",{attrs:{id:"heat-map"}},[e("div",{staticClass:"floor-map",attrs:{id:"floor-map"}})])])}],!1,null,"733bc20a",null);e.default=b.exports}}]);