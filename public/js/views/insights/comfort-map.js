(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{108:function(t,e,a){"use strict";var r=a(29);a.n(r).a},109:function(t,e,a){(t.exports=a(7)(!1)).push([t.i,'.graph-content .range-toggle[data-v-6a2f839e]{flex:0;padding-bottom:24px}#live-view[data-v-6a2f839e]{flex:1 auto;display:flex;flex-direction:column}#live-view #comfort-map[data-v-6a2f839e]{flex:1 auto;display:flex;justify-content:center}#live-view #comfort-map #temp-legend[data-v-6a2f839e]{display:flex;flex-direction:column;justify-content:center;text-align:left;margin-left:64px}#live-view #comfort-map #temp-legend .legend[data-v-6a2f839e]{display:flex;align-items:center;margin-bottom:10px}#live-view #comfort-map #temp-legend .legend .dot[data-v-6a2f839e]{position:relative;width:10px;height:10px;border-radius:50%;margin-right:12px}#live-view #comfort-map #temp-legend .legend .dot[data-v-6a2f839e]:before{content:"";position:absolute;top:50%;left:50%;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%)}#live-view #comfort-map #temp-legend .legend .dot.orange[data-v-6a2f839e]{background-color:#ff8600}#live-view #comfort-map #temp-legend .legend .dot.orange[data-v-6a2f839e]:before{background-color:rgba(255,134,0,.3)}#live-view #comfort-map #temp-legend .legend .dot.green[data-v-6a2f839e]{background-color:#01fe01}#live-view #comfort-map #temp-legend .legend .dot.green[data-v-6a2f839e]:before{background-color:rgba(1,254,1,.3)}#live-view #comfort-map #temp-legend .legend .dot.blue[data-v-6a2f839e]{background-color:#0998ff}#live-view #comfort-map #temp-legend .legend .dot.blue[data-v-6a2f839e]:before{background-color:rgba(9,152,255,.3)}',""])},11:function(t,e,a){"use strict";var r=a(0),n=a(5);e.a=function(t,e,a){var o=this,i=r.y(t),s=800,l=400,c=e,d=c.sensors||[],f=c.areas||[],u=Object(n.b)({edit:!1,heatmap:!1,comfortmap:!1},a),p=u.events,h={x:0,y:0,scale:0},g={sensorMapping:!1,showSensors:!1,areaMapping:!1,showAreas:!1,drawing:!1,polyMoved:!1},m=[],v=r.w().domain([0,50]).range([0,s]),y=r.w().domain([0,33.79]).range([0,l]),_=this,w=r.x().domain([0,1,2]).range(["#01FE01","#FF8600","#ED0003"]),x=r.x().domain([0,1,2]).range(["rgba(1,254,1,0.3)","rgba(255,134,0,0.3)","rgba(237,0,3,0.3)"]);i.selectAll("svg").remove(),i.selectAll(".tooltip").remove();var b=i.append("div").attr("class","tooltip"),F=i.append("svg").attr("width",s).attr("height",l).style("display","block").style("background","#ffffff").on("click",(function(){if(u.edit){var t=r.i,e=document.elementFromPoint(t.x,t.y);if("svg"!==e.tagName){var a=C.__transform,n=a?(t.offsetX-a.x)/a.k:t.offsetX,o=a?(t.offsetY-a.y)/a.k:t.offsetY;if((a&&1===a.z||!a)&&(n-=h.x,o-=h.y),g.sensorMapping){var i="polygon"===e.tagName?r.y(e.parentNode).data()[0]:null;return p&&p.sensorAdd&&p.sensorAdd.call(_,{x:n,y:o,scale:h.scale,area:i})}if(g.areaMapping){var s={x:a?(t.offsetX-a.x)/a.k:t.offsetX,y:a?(t.offsetY-a.y)/a.k:t.offsetY},l=M.select("g.area-draw");l.empty()?function(t){g.drawing=!0,P(M.append("g").attr("class","area-draw"),t)}(s):P(l,s)}}}}));(u.heatmap||u.comfortmap)&&F.append("defs").append("filter").attr("id","blur").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feGaussianBlur").attr("stdDeviation",u.heatmap?7:15);var C=F.selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),k=C.append("g").attr("class","image-layer"),M=C.append("g").attr("class","area-layer"),A=C.append("g").attr("class","sensor-layer"),B=r.D().scaleExtent([1,8]).on("zoom",(function(){C.__transform=r.i.transform;var t=(1-C.__transform.k)*(v.range()[1]-v.range()[0]),e=(1-C.__transform.k)*(y.range()[1]-y.range()[0]);C.__transform.x=Math.min(v.range()[0],Math.max(C.__transform.x,t)),C.__transform.y=Math.min(y.range()[0],Math.max(C.__transform.y,e)),k.attr("transform",C.__transform),A.attr("transform",C.__transform),M.attr("transform",C.__transform)}));function S(t,e){var a=this,n=new Image;p&&p.imgLoad&&p.imgLoad.call(this,t),n.src=t,n.onload=function(){var t,o,c=i.node().parentNode.getBoundingClientRect().height||400,d=i.node().parentNode.getBoundingClientRect().width||800,f=n.height>c?c/n.height:d/n.width,u=Math.min(Math.min(n.width*f,n.width),d),h=Math.min(Math.min(n.height*f,n.height),c);return s=t=u,l=o=h,v=r.w().domain([0,50]).range([0,t]),y=r.w().domain([0,33.79]).range([0,o]),F.attr("width",t).attr("height",o),p&&p.imgLoaded&&p.imgLoaded.call(a,n),e&&e({height:n.height,width:n.width})}}function D(t){S(c.floor_plan_url,(function(e){var a=l-e.height<s-e.width?l/e.height:s/e.width,r=e.width*a,n=e.height*a,o=(s-r)/2,i=(l-n)/2;h.x=o<0?0:o,h.y=i<0?0:i,h.scale=a,t&&t()}))}function E(t,e,a){a&&b.html(a),b.style("left","".concat(t,"px")).style("top","".concat(e,"px"))}function P(t,e){m.push(e),t.select("polyline").remove(),t.insert("polyline",":first-child").data(m).attr("points",(function(){return m.map((function(t){return[t.x,t.y].join(",")})).join(" ")})).style("fill","none").attr("stroke","#53DBF3"),t.append("circle").attr("cx",e.x).attr("cy",e.y).attr("r",4).attr("fill","#FFEB3B").attr("stroke","#53DBF3").style("cursor","pointer").on("click",(function(){return function(){M.select("g.area-draw").remove();var t=(e=m,h.scale,e.map((function(t){return[t.x-h.x,t.y-h.y].join(",")})).join(" "));var e;return L(m),m.splice(0),g.drawing=!1,p&&p.addArea&&p.addArea.call(_,t,h.scale)}()}))}function N(t,e){return t.map((function(t){var a=parseFloat(h.scale.toFixed(12));return[t.x/e*a+h.x,t.y/e*a+h.y].join(",")})).join(" ")}function j(t){return t.map((function(t){return[t.x,t.y].join(",")})).join(" ")}function L(t,e){var a=M.append("g").attr("class",e?"area":"area unsaved"),n=u.edit&&g.areaMapping;a.append("polygon").attr("points",e?N(t,e.scale):j(t)).style("fill","#53DBF3").style("opacity",.2).style("cursor",(function(){return n?"move":g.sensorMapping?"crosshair":"default"})).on("click",(function(t){return n&&(function(t){p&&p.areaClick&&p.areaClick.call(_,t)}(e),r.i.stopPropagation())})).on("mouseover",(function(t){g.sensorMapping||(b.transition().duration(200).style("opacity",.9),E(r.i.offsetX+15,r.i.offsetY-b.node().getBoundingClientRect().height/2,e.name))})).on("mousemove",(function(){g.polyMoved||g.sensorMapping||E(r.i.offsetX+15,r.i.offsetY-b.node().getBoundingClientRect().height/2)})).on("mouseout",(function(){b.transition().duration(200).style("opacity",0)})).call(r.h().on("drag",X).on("end",Y));e&&a.data([e]),n&&a.selectAll("circles").data(t).enter().append("circle").attr("cx",(function(t){return e?t.x/e.scale*parseFloat(h.scale.toFixed(12))+h.x:t.x})).attr("cy",(function(t){return e?t.y/e.scale*parseFloat(h.scale.toFixed(12))+h.y:t.y})).attr("r",4).attr("fill","#FFEB3B").attr("stroke","#53DBF3").style("cursor","move").call(r.h().on("drag",O).on("end",U))}function X(){if(u.edit&&g.areaMapping){var t,e=r.i,a=e.dx,n=e.dy,o=r.y(this),i=r.y(this.parentNode).selectAll("circle"),s=[],l=r.y(this.parentNode).data()[0];g.polyMoved=0!==a||0!==n,i.each((function(e){t=r.y(this),e.x+=a,e.y+=n,t.attr("cx",(function(t){return l?e.x/l.scale*parseFloat(h.scale.toFixed(12))+h.x:e.x})).attr("cy",(function(t){return l?e.y/l.scale*parseFloat(h.scale.toFixed(12))+h.y:e.y})),s.push({x:e.x,y:e.y})})),o.attr("points",N(s,l.scale))}}function Y(){if(u.edit&&g.areaMapping){var t=r.y(this.parentNode).data()[0],e=r.y(this.parentNode).selectAll("circle"),a=[];if(!g.polyMoved)return;g.polyMoved=!1,e.each((function(t){return a.push({x:t.x,y:t.y})}));var n=j(a);return p&&p.areaPtUpdate&&p.areaPtUpdate.call(_,0===t?null:t,n,h.scale)}}function O(t){t.dragged=!0;var e=r.i,a=r.y(this),n=[],o=r.y(this.parentNode).select("polygon"),i=r.y(this.parentNode).selectAll("circle"),s=r.y(this.parentNode).data()[0];a.attr("cx",e.x+h.x).attr("cy",e.y+h.y),t.x+=e.dx,t.y+=e.dy,i.each((function(t){return n.push({x:t.x,y:t.y})})),o.attr("points",N(n,s.scale))}function U(t){if(t.dragged){t.dragged=!1;var e=[],a=r.y(this.parentNode).selectAll("circle"),n=r.y(this.parentNode).data()[0];a.each((function(t){return e.push({x:t.x,y:t.y})}));var o=j(e);return p&&p.areaPtUpdate&&p.areaPtUpdate.call(_,0===n?null:n,o,h.scale)}}function R(t){u.edit&&g.sensorMapping&&(t.dragged=!0,r.y(this).attr("cx",t.pos_x=r.i.x).attr("cy",t.pos_y=r.i.y))}function I(t){if(u.edit&&g.sensorMapping&&t.dragged)return t.dragged=!1,t.pos_x-=h.x,t.pos_y-=h.y,t.scale=h.scale,p&&p.sensorMoved&&p.sensorMoved.call(_,t)}return C.call(B).on("mousemove",(function(){if(g.drawing){var t=M.select("g.area-draw");t.select("line").remove();var e=m[m.length-1],a=r.i,n=C.__transform,o=n?(a.offsetX-n.x)/n.k:a.offsetX,i=n?(a.offsetY-n.y)/n.k:a.offsetY;t.insert("line",":nth-child(2)").attr("x1",e.x).attr("y1",e.y).attr("x2",o).attr("y2",i).attr("stroke","#53DBF3").attr("stroke-width",1).style("pointer-events","none")}})),this.drawFloorPlan=function(){if(k.selectAll("image").remove(),C.__transform&&k.attr("transform",C.__transform),c.floor_plan){var t=u.edit&&(g.sensorMapping||g.areaMapping);k.insert("image",":first-child").attr("xlink:href",c.floor_plan_url).attr("height",y(33.79)-y(0)).attr("width",v(50)-v(0)).style("cursor",(function(){return t?"crosshair":"default"}))}},this.drawSensors=function(){if(A.selectAll(".sensor").remove(),C.__transform&&A.attr("transform",C.__transform),0!==d.length){var t=u.edit&&g.sensorMapping;A.selectAll(".sensor").data(d).enter().append("circle").attr("class","sensor").attr("data-id",(function(t){return t.hid})).attr("r",u.heatmap?15:u.comfortmap?35:5).attr("stroke-width",u.heatmap||u.comfortmap?null:5).attr("stroke",u.heatmap||u.comfortmap?null:x(0)).style("fill",w(0)).attr("filter",u.heatmap||u.comfortmap?"url(#blur)":null).style("cursor",(function(){return t?"move":"default"})).attr("cx",(function(t){var e=parseFloat(h.scale.toFixed(12));return t.pos_x/t.scale*e+h.x})).attr("cy",(function(t){var e=parseFloat(h.scale.toFixed(12));return t.pos_y/t.scale*e+h.y})).on("mouseover",(function(){if(!u.comfortmap){var t=r.y(this),e=d.find((function(e){return e.hid===t.attr("data-id")}));b.transition().duration(200).style("opacity",.95),E(r.i.offsetX+15,r.i.offsetY-b.node().getBoundingClientRect().height/2,"<div>ID: ".concat(e.sensor_id,"</div><div>Name: ").concat(e.name?e.name:"(None)","</div>"))}})).on("mousemove",(function(){u.comfortmap||E(r.i.offsetX+15,r.i.offsetY-b.node().getBoundingClientRect().height/2)})).on("mouseout",(function(){u.comfortmap||b.transition().duration(200).style("opacity",0)})).on("click",(function(e){return t&&(function(t){p&&p.sensorClick&&p.sensorClick.call(_,t)}(e),r.i.stopPropagation())})).call(r.h().on("drag",R).on("end",I))}},this.setSensorColor=function(t,e){var a="occupied"===e?1:0;A.select('.sensor[data-id="'.concat(t,'"]')).style("fill",w(a)).attr("stroke",x(a))},this.drawAreas=function(){M.selectAll("g.area").remove(),C.__transform&&M.attr("transform",C.__transform),0!==f.length&&f.forEach((function(t){return L(t.poly_points,t)}))},this.setData=function(t){d=(c=t).sensors,f=c.areas,C.__transform=null,this.redraw(!0)},this.redraw=function(t){var e=this;t?(C.__transform=null,C.call(B.transform,r.E),D((function(){e.drawFloorPlan(),e.drawAreas(),e.drawSensors()}))):(this.drawFloorPlan(),this.drawAreas(),this.drawSensors()),this.clearDrawing()},this.editMode=function(t){u.edit=t,this.redraw(!1)},this.setAreaMapping=function(t){t&&(g.sensorMapping=!1),g.areaMapping=t,this.redraw(!1)},this.clearDrawing=function(){g.drawing=!1,m.splice(0),M.select("g.area-draw").remove(),M.select("g.area.unsaved").remove()},this.setSensorMapping=function(t){t&&(g.areaMapping=!1),g.sensorMapping=t,this.redraw(!1)},c&&D((function(){o.drawFloorPlan(),o.drawAreas(),o.drawSensors()})),this}},219:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),o=a(4),i=a(5),s=a(6),l=a(2),c=a(11);function d(t,e,a,r,n,o,i){try{var s=t[o](i),l=s.value}catch(t){return void a(t)}s.done?e(l):Promise.resolve(l).then(r,n)}function f(t){return function(){var e=this,a=arguments;return new Promise((function(r,n){var o=t.apply(e,a);function i(t){d(o,r,n,i,s,"next",t)}function s(t){d(o,r,n,i,s,"throw",t)}i(void 0)}))}}var u="/api/locations",p="/api/floors",h={title:"Comfort Map",props:["bldg_id","floor_id"],components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:l.a,DateRangeToggle:l.c,FilterDropdown:l.d,Loader:l.e,TimeSlider:l.h},data:function(){return{loaded:!1,user:null,showPageOpts:!1,showEmbed:!1,showFilter:!1,building:null,floors:[],floor:null,floorFilter:null,mapper:null,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:{settings:function(){return this.user.company?this.user.company.settings:null},baseUrl:function(){return Object(i.c)()},floorFilters:function(){return this.floors.map((function(t){return{value:t.hid,label:"".concat(t.ordinal_no," Floor")}}))},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}},methods:{backTo:function(){this.$router.back()},filterSelect:function(t,e){var a=this;this.showFilter=!1,this.floor=this.floors.find((function(e){return e.hid===t})),this.floorFilter=e,this.getFloorData(t,(function(){a.mapper.setData(a.floor)}))},toLive:function(){this.$router.push({name:"live",query:{bid:this.bldg_id,fid:this.floor.hid}})},rangeSelect:function(t,e,a){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},getBuilding:function(t){var e=this;return f(n.a.mark((function a(){var r,o;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,axios.get(u,{params:{id:t}});case 2:r=a.sent,o=r.data,e.building=o,e.getFloors(t,(function(){var t=e.floor_id?e.floor_id:e.floors[0].hid;e.floor=e.floors.find((function(e){return e.hid===t})),e.floorFilter="".concat(e.floor.ordinal_no," Floor"),e.getFloorData(t,(function(){e.loaded=!0,setTimeout((function(){e.setFloorMap()}),0)}))}));case 6:case"end":return a.stop()}}),a)})))()},getFloors:function(t,e){var a=this;return f(n.a.mark((function r(){var o,i,s;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,axios.get(p,{params:{bid:t}});case 2:return o=r.sent,(i=o.data).forEach((function(t){t.floor_plan_url="".concat(a.baseUrl,"/plans/").concat(t.floor_plan)})),s=i.sort((function(t,e){return t.floor_no>e.floor_no?1:t.floor_no<e.floor_no?-1:0})),a.floors=s,r.abrupt("return",e&&e());case 8:case"end":return r.stop()}}),r)})))()},getFloorData:function(t,e){var a=this;return f(n.a.mark((function r(){var o,i;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,axios.get("".concat(p,"/").concat(t,"/data"),{params:{so:!0}});case 2:return o=r.sent,(i=o.data).sensors.forEach((function(t){t.sensor_state="available"})),a.floor.sensors=i.sensors,a.floor.areas=[],r.abrupt("return",e&&e());case 8:case"end":return r.stop()}}),r)})))()},setFloorMap:function(){this.mapper=new c.a("#floor-map",this.floor,{comfortmap:!0})}},created:function(){this.user=o.a.getUser()},mounted:function(){this.bldg_id&&this.getBuilding(this.bldg_id)}},g=(a(108),a(3)),m=Object(g.a)(h,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t.loaded?a("div",{staticClass:"graph-wrapper"},[a("div",{staticClass:"graph-header"},[a("div",{staticClass:"page-back"},[a("div",{staticClass:"back-button",on:{click:t.backTo}},[a("button",{staticClass:"btn btn-primary btn-small"},[a("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),a("div",{staticClass:"graph-filters"},[a("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                        "+t._s(t.floorFilter?t.floorFilter:"Select Floor")+"\n                        "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.floorFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),a("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),a("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"})]),t._v(" "),a("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?a("div",{staticClass:"page-opt-panel"},[a("ul",[a("li",[a("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),a("div",{staticClass:"graph-content"},[a("div",{staticClass:"chart-header"},[a("span",{staticClass:"chart-title"},[t._v(t._s(t.floor.ordinal_no+" Floor")+" Comfort Map")]),t._v(" "),a("span",{staticClass:"chart-subtitle"},[t._v(t._s(t.building.name))])]),t._v(" "),a("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"bottom-filters"},[a("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),a("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)],1),t._v(" "),a("div",{staticClass:"graph-footer"},[a("div",{staticClass:"left-options"}),t._v(" "),a("div",{staticClass:"right-options"},[a("checkbox",{attrs:{label:"Save to report"}})],1)])]):t._e(),t._v(" "),a("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"live-view"}},[e("div",{attrs:{id:"comfort-map"}},[e("div",{staticClass:"floor-map",attrs:{id:"floor-map"}}),this._v(" "),e("div",{attrs:{id:"temp-legend"}},[e("div",{staticClass:"legend"},[e("span",{staticClass:"dot orange"}),this._v("More than 24°c\n                        ")]),this._v(" "),e("div",{staticClass:"legend"},[e("span",{staticClass:"dot green"}),this._v("22°c - 24°c\n                        ")]),this._v(" "),e("div",{staticClass:"legend"},[e("span",{staticClass:"dot blue"}),this._v("Less than 21°c\n                        ")])])])])}],!1,null,"6a2f839e",null);e.default=m.exports},29:function(t,e,a){var r=a(109);"string"==typeof r&&(r=[[t.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(8)(r,n);r.locals&&(t.exports=r.locals)}}]);