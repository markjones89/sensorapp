(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{132:function(t,e,a){"use strict";a(55)},133:function(t,e,a){(t.exports=a(6)(!1)).push([t.i,'.graph-content .range-toggle[data-v-bb9a7bd4]{flex:0;padding-bottom:24px}#live-view[data-v-bb9a7bd4]{flex:1 auto;display:flex;flex-direction:column}#live-view #comfort-map[data-v-bb9a7bd4]{flex:1 auto;display:flex;justify-content:center;min-height:50vh}#live-view #comfort-map #temp-legend[data-v-bb9a7bd4]{display:flex;flex-direction:column;justify-content:center;text-align:left;margin-left:64px}#live-view #comfort-map #temp-legend .legend[data-v-bb9a7bd4]{display:flex;align-items:center;margin-bottom:10px}#live-view #comfort-map #temp-legend .legend .dot[data-v-bb9a7bd4]{position:relative;width:10px;height:10px;border-radius:50%;margin-right:12px}#live-view #comfort-map #temp-legend .legend .dot[data-v-bb9a7bd4]:before{content:"";position:absolute;top:50%;left:50%;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%)}#live-view #comfort-map #temp-legend .legend .dot.orange[data-v-bb9a7bd4]{background-color:#ff8600}#live-view #comfort-map #temp-legend .legend .dot.orange[data-v-bb9a7bd4]:before{background-color:rgba(255,134,0,.3)}#live-view #comfort-map #temp-legend .legend .dot.green[data-v-bb9a7bd4]{background-color:#01fe01}#live-view #comfort-map #temp-legend .legend .dot.green[data-v-bb9a7bd4]:before{background-color:rgba(1,254,1,.3)}#live-view #comfort-map #temp-legend .legend .dot.blue[data-v-bb9a7bd4]{background-color:#0998ff}#live-view #comfort-map #temp-legend .legend .dot.blue[data-v-bb9a7bd4]:before{background-color:rgba(9,152,255,.3)}',""])},15:function(t,e,a){"use strict";var n=a(2),r=a(0);e.a=function(t,e,a){var o=this,i=n.y(t),s=function(){return i.node().parentNode.getBoundingClientRect().width||800},l=function(){return i.node().parentNode.getBoundingClientRect().height||400},c=s(),d=l(),f=e,p=f.sensors||[],u=Object(r.e)({edit:!1,heatmap:!1,comfortmap:!1},a),m=u.events,g={x:0,y:0,scale:0},h={sensorMapping:!1,showSensors:!1,areaMapping:!1,showAreas:!1,drawing:!1,polyMoved:!1},v=[],b=n.w().domain([0,50]).range([0,c]),_=n.w().domain([0,33.79]).range([0,d]),w=this,y=n.x().domain([0,1,2]).range(["#01FE01","#FF8600","#ED0003"]),x=n.x().domain([0,1,2]).range(["rgba(1,254,1,0.3)","rgba(255,134,0,0.3)","rgba(237,0,3,0.3)"]);i.selectAll("svg").remove(),i.selectAll(".tooltip").remove();var F=i.append("div").attr("class","tooltip"),C=i.append("svg").attr("width",c).attr("height",d).style("display","block").style("background","#ffffff").on("click",(function(){if(u.edit){var t=n.i,e=document.elementFromPoint(t.x,t.y);if("svg"!==e.tagName){var a=k.__transform,r=a?(t.offsetX-a.x)/a.k:t.offsetX,o=a?(t.offsetY-a.y)/a.k:t.offsetY;if((a&&1===a.z||!a)&&(r-=g.x,o-=g.y),h.sensorMapping){var i="polygon"===e.tagName?n.y(e.parentNode).data()[0]:null;return m&&m.sensorAdd&&m.sensorAdd.call(w,{x:r,y:o,scale:g.scale,area:i})}}}}));u.events&&C.style("pointer-events","all"),(u.heatmap||u.comfortmap)&&C.append("defs").append("filter").attr("id","blur").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feGaussianBlur").attr("stdDeviation",u.heatmap?7:15);var k=C.selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),M=k.append("g").attr("class","image-layer"),O=k.append("g").attr("class","sensor-layer"),P=n.E().scaleExtent([1,8]).on("zoom",(function(){k.__transform=n.i.transform;var t=(1-k.__transform.k)*(b.range()[1]-b.range()[0]),e=(1-k.__transform.k)*(_.range()[1]-_.range()[0]);k.__transform.x=Math.min(b.range()[0],Math.max(k.__transform.x,t)),k.__transform.y=Math.min(_.range()[0],Math.max(k.__transform.y,e)),M.attr("transform",k.__transform),O.attr("transform",k.__transform)}));function j(t,e){var a=this,r=new Image;m&&m.imgLoad&&m.imgLoad.call(this,t),r.src=t,r.onload=function(){var t,o,i=l(),f=s(),p=r.height>i?i/r.height:f/r.width,u=Math.min(Math.min(r.width*p,r.width),f),g=Math.min(Math.min(r.height*p,r.height),i);return c=t=u,d=o=g,b=n.w().domain([0,50]).range([0,t]),_=n.w().domain([0,33.79]).range([0,o]),C.attr("width",t).attr("height",o),m&&m.imgLoaded&&m.imgLoaded.call(a,r),e&&e({height:r.height,width:r.width})}}function S(t){j(f.floor_plan_url,(function(e){var a=d-e.height<c-e.width?d/e.height:c/e.width,n=e.width*a,r=e.height*a,o=(c-n)/2,i=(d-r)/2;g.x=o<0?0:o,g.y=i<0?0:i,g.scale=a,t&&t()}))}function E(t,e,a){var n=document.body.clientWidth;a&&F.html(a),t<0&&(t=0),t>n&&(t-=Math.abs(n-t)),F.style("left","".concat(t,"px")).style("top","".concat(e,"px"))}function D(t){u.edit&&h.sensorMapping&&(t.dragged=!0,n.y(this).attr("cx",t.pos_x=n.i.x).attr("cy",t.pos_y=n.i.y))}function A(t){if(u.edit&&h.sensorMapping&&t.dragged)return t.dragged=!1,t.pos_x-=g.x,t.pos_y-=g.y,t.scale=g.scale,m&&m.sensorMoved&&m.sensorMoved.call(w,t)}return k.call(P),this.drawFloorPlan=function(){if(M.selectAll("image").remove(),k.__transform&&M.attr("transform",k.__transform),f.floor_plan){var t=u.edit&&(h.sensorMapping||h.areaMapping);M.insert("image",":first-child").attr("xlink:href",f.floor_plan_url).attr("height",_(33.79)-_(0)).attr("width",b(50)-b(0)).style("cursor",(function(){return t?"crosshair":"default"}))}},this.drawSensors=function(){if(O.selectAll(".sensor").remove(),k.__transform&&O.attr("transform",k.__transform),0!==p.length){var t=u.edit&&h.sensorMapping;O.selectAll(".sensor").data(p).enter().append("circle").attr("class","sensor").attr("data-id",(function(t){return t.id})).attr("r",u.heatmap?15:u.comfortmap?35:5).attr("stroke-width",u.heatmap||u.comfortmap?null:5).attr("stroke",u.heatmap||u.comfortmap?null:x(0)).style("fill",y(0)).attr("filter",u.heatmap||u.comfortmap?"url(#blur)":null).style("cursor",(function(){return t?"move":"default"})).attr("cx",(function(t){var e=parseFloat(g.scale.toFixed(12));return t.pos_x/t.scale*e+g.x})).attr("cy",(function(t){var e=parseFloat(g.scale.toFixed(12));return t.pos_y/t.scale*e+g.y})).on("mouseover",(function(){if(!u.comfortmap){var t=n.y(this),e=p.find((function(e){return e.id===t.attr("data-id")}));u.heatmap||t.classed("hovered",!0),F.transition().duration(200).style("opacity",.95);var a=F.node().getBoundingClientRect();E(n.i.pageX-a.width/2,n.i.pageY-(a.height+10),"<div>ID: ".concat(e.sensor_id,"</div>\n                    <div>Name: ").concat(e.name?e.name:"(None)","</div>\n                    <div>Area: ").concat(e.parent,"</div>"))}})).on("mousemove",(function(){if(!u.comfortmap){var t=F.node().getBoundingClientRect();E(n.i.pageX-t.width/2,n.i.pageY-(t.height+10))}})).on("mouseout",(function(){u.comfortmap||(u.heatmap||n.y(this).classed("hovered",!1),F.transition().duration(200).style("opacity",0))})).on("click",(function(e){return t&&(function(t){m&&m.sensorClick&&m.sensorClick.call(w,t)}(e),n.i.stopPropagation())})).call(n.h().on("drag",D).on("end",A))}},this.setSensorColor=function(t,e){var a="occupied"===e?1:0;O.select('.sensor[data-id="'.concat(t,'"]')).style("fill",y(a)).attr("stroke",x(a))},this.setData=function(t){p=(f=t).sensors,k.__transform=null,this.redraw(!0)},this.redraw=function(t){var e=this;if(!f.floor_plan)return M.selectAll("image").remove(),void O.selectAll(".sensor").remove();t?(k.__transform=null,k.call(P.transform,n.F),S((function(){e.drawFloorPlan(),e.drawSensors()}))):(this.drawFloorPlan(),this.drawSensors()),this.clearDrawing()},this.editMode=function(t){u.edit=t,this.redraw(!1)},this.setAreaMapping=function(t){t&&(h.sensorMapping=!1),h.areaMapping=t,this.redraw(!1)},this.clearDrawing=function(){h.drawing=!1,v.splice(0)},this.setSensorMapping=function(t){t&&(h.areaMapping=!1),h.sensorMapping=t,this.redraw(!1)},f&&f.floor_plan&&S((function(){o.drawFloorPlan(),o.drawSensors()})),this}},299:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),o=a(5),i=a(0),s=a(8),l=a(4),c=a(15);function d(t,e,a,n,r,o,i){try{var s=t[o](i),l=s.value}catch(t){return void a(t)}s.done?e(l):Promise.resolve(l).then(n,r)}function f(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var o=t.apply(e,a);function i(t){d(o,n,r,i,s,"next",t)}function s(t){d(o,n,r,i,s,"throw",t)}i(void 0)}))}}function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(Object(a),!0).forEach((function(e){m(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function m(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var g="/api/floors",h="/api/sensors",v={title:"Comfort Map",props:["bldg_id","floor_id"],components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:l.a,DateRangeToggle:l.c,FilterDropdown:l.d,Loader:l.f,TimeSlider:l.i},data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,building:null,floors:[],floor:null,floorFilter:null,mapper:null,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:u(u(u({},Object(o.d)({user:function(t){return t.user}})),Object(o.b)({api_header:"backend/api_header",api_building_overview:"backend/api_building_overview",api_floors:"backend/api_floors",api_sensors_by_node:"backend/api_sensors_by_node"})),{},{settings:function(){return this.user.company?this.user.company.settings:null},baseUrl:function(){return Object(i.g)()},floorFilters:function(){return this.floors.map((function(t){return{value:t.id,label:"".concat(t.ordinal_no," Floor")}}))},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},filterSelect:function(t,e){var a=this;return f(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.showFilter=!1,a.floor=a.floors.find((function(e){return e.id===t})),a.floorFilter=e,n.next=5,a.getFloorData(t);case 5:a.mapper.setData(a.floor);case 6:case"end":return n.stop()}}),n)})))()},toLive:function(){this.$router.push({name:"live",query:{bid:this.bldg_id,fid:this.floor.id}})},rangeSelect:function(t,e,a){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},getBuilding:function(t){var e=this;return f(r.a.mark((function a(){var n,o,s,l,c,d;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=e.user.company_id,a.next=3,axios.all([axios.get(g,{params:{bid:t}}),axios.get(e.api_building_overview(n,t),e.api_header())]);case 3:return o=a.sent,s=o[0].data,l=o[1].data,c=[],l.children.forEach((function(t){var a=s.find((function(e){return e.ref_id==t.id}));t.ordinal_no=Object(i.z)(t.number),t.occupancy_limit=null==a?void 0:a.occupancy_limit,t.floor_plan=null==a?void 0:a.floor_plan,t.floor_plan_url=null!=a&&a.floor_plan?"".concat(e.baseUrl,"/plans/").concat(a.floor_plan):null,delete t.children,delete t.building,c.push(t)})),delete l.children,e.building=l,e.floors=c.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),d=e.floor_id?e.floor_id:e.floors[0].id,e.floor=e.floors.find((function(t){return t.id===d})),e.floorFilter="".concat(e.floor.ordinal_no," Floor"),a.next=14,e.getFloorData(d);case 14:e.loaded=!0,setTimeout((function(){e.setFloorMap()}),0);case 16:case"end":return a.stop()}}),a)})))()},getFloorData:function(t){var e=this;return f(r.a.mark((function a(){var n,o,i;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,axios.all([axios.get(e.api_sensors_by_node(t,"Floor"),e.api_header()),axios.get(h,{fid:t})]);case 2:n=a.sent,o=n[0].data,i=n[1].data,o.forEach((function(t){var e=i.find((function(e){return e.ref_id==t.id}));e&&(t.pos_x=e.pos_x,t.pos_y=e.pos_y,t.scale=e.scale)})),e.floor.sensors=o;case 6:case"end":return a.stop()}}),a)})))()},setFloorMap:function(){this.mapper=new c.a("#floor-map",this.floor,{comfortmap:!0})}},mounted:function(){this.bldg_id&&this.getBuilding(this.bldg_id)}},b=(a(132),a(3)),_=Object(b.a)(v,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t.loaded?a("div",{staticClass:"graph-wrapper"},[a("div",{staticClass:"graph-header"},[a("div",{staticClass:"page-back"},[a("div",{staticClass:"back-button",on:{click:t.backTo}},[a("button",{staticClass:"btn btn-primary btn-small"},[a("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),a("div",{staticClass:"graph-filters"},[a("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                        "+t._s(t.floorFilter?t.floorFilter:"Select Floor")+"\n                        "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.floorFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),a("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),a("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"})]),t._v(" "),a("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?a("div",{staticClass:"page-opt-panel"},[a("ul",[a("li",[a("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),a("div",{staticClass:"graph-content"},[a("div",{staticClass:"chart-header"},[a("span",{staticClass:"chart-title"},[t._v(t._s(t.floor.ordinal_no+" Floor")+" Comfort Map")]),t._v(" "),a("span",{staticClass:"chart-subtitle"},[t._v(t._s(t.building.name))])]),t._v(" "),a("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"bottom-filters"},[a("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),a("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)],1),t._v(" "),a("div",{staticClass:"graph-footer"},[a("div",{staticClass:"left-options"}),t._v(" "),a("div",{staticClass:"right-options"},[a("checkbox",{attrs:{label:"Save to report"}})],1)])]):t._e(),t._v(" "),a("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"live-view"}},[e("div",{attrs:{id:"comfort-map"}},[e("div",{staticClass:"floor-map",attrs:{id:"floor-map"}}),this._v(" "),e("div",{attrs:{id:"temp-legend"}},[e("div",{staticClass:"legend"},[e("span",{staticClass:"dot orange"}),this._v("More than 24°c\n                        ")]),this._v(" "),e("div",{staticClass:"legend"},[e("span",{staticClass:"dot green"}),this._v("22°c - 24°c\n                        ")]),this._v(" "),e("div",{staticClass:"legend"},[e("span",{staticClass:"dot blue"}),this._v("Less than 21°c\n                        ")])])])])}],!1,null,"bb9a7bd4",null);e.default=_.exports},55:function(t,e,a){var n=a(133);"string"==typeof n&&(n=[[t.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};a(7)(n,r);n.locals&&(t.exports=n.locals)}}]);