(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{110:function(t,e,r){"use strict";r(44)},111:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,".floor-title[data-v-0b84b2c7]{font-size:18px!important;line-height:24px!important;font-weight:700;color:rgba(var(--app-text-rgb),.85)!important}.tree-content[data-v-0b84b2c7]{position:relative;width:100%;margin-top:20px;overflow:hidden}.tree-content .chart-wrapper[data-v-0b84b2c7]{position:relative;display:flex;width:200%;flex-direction:row;flex-wrap:wrap;transform:translateX(0);transition:transform .25s cubic-bezier(.4,0,.2,1)}.tree-content .chart-wrapper .mapper[data-v-0b84b2c7],.tree-content .chart-wrapper .tree-wrapper[data-v-0b84b2c7]{position:relative;flex:50%}.tree-content .chart-wrapper .mapper .sensor-map[data-v-0b84b2c7]{flex:1 auto;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:50vh}.tree-content .chart-wrapper.map-view[data-v-0b84b2c7]{transform:translateX(-50%)}#tree-summary[data-v-0b84b2c7]{margin:24px auto;max-width:100%;width:1200px}",""])},15:function(t,e,r){"use strict";var a=r(2),n=r(0);e.a=function(t,e,r){var i=this,o=a.y(t),s=function(){return o.node().parentNode.getBoundingClientRect().width||800},c=function(){return o.node().parentNode.getBoundingClientRect().height||400},l=s(),d=c(),u=e,p=u.sensors||[],f=Object(n.e)({edit:!1,heatmap:!1,comfortmap:!1},r),h=f.events,m={x:0,y:0,scale:0},g={sensorMapping:!1,showSensors:!1,areaMapping:!1,showAreas:!1,drawing:!1,polyMoved:!1},v=[],_=a.w().domain([0,50]).range([0,l]),y=a.w().domain([0,33.79]).range([0,d]),b=this,w=a.x().domain([0,1,2]).range(["#01FE01","#FF8600","#ED0003"]),x=a.x().domain([0,1,2]).range(["rgba(1,254,1,0.3)","rgba(255,134,0,0.3)","rgba(237,0,3,0.3)"]);o.selectAll("svg").remove(),o.selectAll(".tooltip").remove();var k=o.append("div").attr("class","tooltip"),F=o.append("svg").attr("width",l).attr("height",d).style("display","block").style("background","#ffffff").on("click",(function(){if(f.edit){var t=a.i,e=document.elementFromPoint(t.x,t.y);if("svg"!==e.tagName){var r=S.__transform,n=r?(t.offsetX-r.x)/r.k:t.offsetX,i=r?(t.offsetY-r.y)/r.k:t.offsetY;if((r&&1===r.z||!r)&&(n-=m.x,i-=m.y),g.sensorMapping){var o="polygon"===e.tagName?a.y(e.parentNode).data()[0]:null;return h&&h.sensorAdd&&h.sensorAdd.call(b,{x:n,y:i,scale:m.scale,area:o})}}}}));f.events&&F.style("pointer-events","all"),(f.heatmap||f.comfortmap)&&F.append("defs").append("filter").attr("id","blur").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%").append("feGaussianBlur").attr("stdDeviation",f.heatmap?7:15);var S=F.selectAll(".map-layer").data([0]).enter().append("g").attr("class","map-layer"),M=S.append("g").attr("class","image-layer"),O=S.append("g").attr("class","sensor-layer"),C=a.E().scaleExtent([1,8]).on("zoom",(function(){S.__transform=a.i.transform;var t=(1-S.__transform.k)*(_.range()[1]-_.range()[0]),e=(1-S.__transform.k)*(y.range()[1]-y.range()[0]);S.__transform.x=Math.min(_.range()[0],Math.max(S.__transform.x,t)),S.__transform.y=Math.min(y.range()[0],Math.max(S.__transform.y,e)),M.attr("transform",S.__transform),O.attr("transform",S.__transform)}));function j(t,e){var r=this,n=new Image;h&&h.imgLoad&&h.imgLoad.call(this,t),n.src=t,n.onload=function(){var t,i,o=c(),u=s(),p=n.height>o?o/n.height:u/n.width,f=Math.min(Math.min(n.width*p,n.width),u),m=Math.min(Math.min(n.height*p,n.height),o);return l=t=f,d=i=m,_=a.w().domain([0,50]).range([0,t]),y=a.w().domain([0,33.79]).range([0,i]),F.attr("width",t).attr("height",i),h&&h.imgLoaded&&h.imgLoaded.call(r,n),e&&e({height:n.height,width:n.width})}}function T(t){j(u.floor_plan_url,(function(e){var r=d-e.height<l-e.width?d/e.height:l/e.width,a=e.width*r,n=e.height*r,i=(l-a)/2,o=(d-n)/2;m.x=i<0?0:i,m.y=o<0?0:o,m.scale=r,t&&t()}))}function D(t,e,r){var a=document.body.clientWidth;r&&k.html(r),t<0&&(t=0),t>a&&(t-=Math.abs(a-t)),k.style("left","".concat(t,"px")).style("top","".concat(e,"px"))}function E(t){f.edit&&g.sensorMapping&&(t.dragged=!0,a.y(this).attr("cx",t.pos_x=a.i.x).attr("cy",t.pos_y=a.i.y))}function P(t){if(f.edit&&g.sensorMapping&&t.dragged)return t.dragged=!1,t.pos_x-=m.x,t.pos_y-=m.y,t.scale=m.scale,h&&h.sensorMoved&&h.sensorMoved.call(b,t)}return S.call(C),this.drawFloorPlan=function(){if(M.selectAll("image").remove(),S.__transform&&M.attr("transform",S.__transform),u.floor_plan){var t=f.edit&&(g.sensorMapping||g.areaMapping);M.insert("image",":first-child").attr("xlink:href",u.floor_plan_url).attr("height",y(33.79)-y(0)).attr("width",_(50)-_(0)).style("cursor",(function(){return t?"crosshair":"default"}))}},this.drawSensors=function(){if(O.selectAll(".sensor").remove(),S.__transform&&O.attr("transform",S.__transform),0!==p.length){var t=f.edit&&g.sensorMapping;O.selectAll(".sensor").data(p).enter().append("circle").attr("class","sensor").attr("data-id",(function(t){return t.id})).attr("r",f.heatmap?15:f.comfortmap?35:5).attr("stroke-width",f.heatmap||f.comfortmap?null:5).attr("stroke",f.heatmap||f.comfortmap?null:x(0)).style("fill",w(0)).attr("filter",f.heatmap||f.comfortmap?"url(#blur)":null).style("cursor",(function(){return t?"move":"default"})).attr("cx",(function(t){var e=parseFloat(m.scale.toFixed(12));return t.pos_x/t.scale*e+m.x})).attr("cy",(function(t){var e=parseFloat(m.scale.toFixed(12));return t.pos_y/t.scale*e+m.y})).on("mouseover",(function(){if(!f.comfortmap){var t=a.y(this),e=p.find((function(e){return e.id===t.attr("data-id")}));f.heatmap||t.classed("hovered",!0),k.transition().duration(200).style("opacity",.95);var r=k.node().getBoundingClientRect();D(a.i.pageX-r.width/2,a.i.pageY-(r.height+10),"<div>ID: ".concat(e.sensor_id,"</div>\n                    <div>Name: ").concat(e.name?e.name:"(None)","</div>\n                    <div>Area: ").concat(e.parent,"</div>"))}})).on("mousemove",(function(){if(!f.comfortmap){var t=k.node().getBoundingClientRect();D(a.i.pageX-t.width/2,a.i.pageY-(t.height+10))}})).on("mouseout",(function(){f.comfortmap||(f.heatmap||a.y(this).classed("hovered",!1),k.transition().duration(200).style("opacity",0))})).on("click",(function(e){return t&&(function(t){h&&h.sensorClick&&h.sensorClick.call(b,t)}(e),a.i.stopPropagation())})).call(a.h().on("drag",E).on("end",P))}},this.setSensorColor=function(t,e){var r="occupied"===e?1:0;O.select('.sensor[data-id="'.concat(t,'"]')).style("fill",w(r)).attr("stroke",x(r))},this.setData=function(t){p=(u=t).sensors,S.__transform=null,this.redraw(!0)},this.redraw=function(t){var e=this;if(!u.floor_plan)return M.selectAll("image").remove(),void O.selectAll(".sensor").remove();t?(S.__transform=null,S.call(C.transform,a.F),T((function(){e.drawFloorPlan(),e.drawSensors()}))):(this.drawFloorPlan(),this.drawSensors()),this.clearDrawing()},this.editMode=function(t){f.edit=t,this.redraw(!1)},this.setAreaMapping=function(t){t&&(g.sensorMapping=!1),g.areaMapping=t,this.redraw(!1)},this.clearDrawing=function(){g.drawing=!1,v.splice(0)},this.setSensorMapping=function(t){t&&(g.areaMapping=!1),g.sensorMapping=t,this.redraw(!1)},u&&u.floor_plan&&T((function(){i.drawFloorPlan(),i.drawSensors()})),this}},286:function(t,e,r){"use strict";r.r(e);var a=r(1),n=r.n(a),i=r(5),o=r(0),s=r(4),c=r(8),l=r(11),d=r(2);function u(t,e,r,a){var n=d.y(t),i=d.l(e),o=d.k("$,.2s"),s=10,c=10,l=85,u=d.C().nodeSize([24,200]),p=d.o().x((function(t){return t.y})).y((function(t){return t.x})),f=n.append("svg").attr("viewBox",[-l,-s,1200,24]).style("font-size","12px").style("user-select","none"),h=f.append("g").attr("fill","none").attr("stroke","#3DCFA3").attr("stroke-opacity",.4).attr("stroke-width",1.5),m=f.append("g").attr("cursor","pointer").attr("pointer-events","all");return i.x0=100,i.y0=0,i.descendants().forEach((function(t,e){t.id=e,t._children=t.children,t.depth&&7!==t.data.name.length&&(t.children=null)})),function t(e){var n=this,g=d.i&&d.i.altKey?2500:250,v=i.descendants().reverse(),_=i.links();u(i);var y=i,b=i;i.eachBefore((function(t){t.x<y.x&&(y=t),t.x>b.x&&(b=t)}));var w=b.x-y.x+s+c,x=f.transition().duration(g).attr("viewBox",[-l,y.x-s,1200,w]).tween("resize",window.ResizeObserver?null:function(){return function(){return f.dispatch("toggle")}}),k=m.selectAll("g").data(v,(function(t){return t.id})),F=k.enter().append("g").attr("data-id",(function(t){return t.id})).attr("transform",(function(t){return"translate(".concat(e.y0,",").concat(e.x0,")")})).attr("fill-opacity",0).attr("stroke-opacity",0).on("click",(function(e){e.children=e.children?null:e._children,t(e),e.data.floor&&a&&a.viewFloor&&a.viewFloor.call(n,e)}));F.append("circle").attr("r",2.5).attr("fill",(function(t){return t._children,"#3DCFA3"})).attr("stroke-width",10),F.append("text").attr("dy","0.31em").attr("x",(function(t){return t._children?-6:6})).attr("text-anchor",(function(t){return t._children?"end":"start"})).attr("fill","#fff").text((function(t){return"".concat(t.data.name," ").concat(t.data.number?" - ".concat(t.data.value):r?o(t.data.value||0):"".concat(Math.round(t.data.value),"%"))})).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","#2B2B2B"),k.merge(F).transition(x).attr("transform",(function(t){return"translate(".concat(t.y,",").concat(t.x,")")})).attr("fill-opacity",1).attr("stroke-opacity",1),k.exit().transition(x).remove().attr("transform",(function(t){return"translate(".concat(e.y,",").concat(e.x,")")})).attr("fill-opacity",0).attr("stroke-opacity",0);var S=h.selectAll("path").data(_,(function(t){return t.target.id})),M=S.enter().append("path").attr("d",(function(t){var r={x:e.x0,y:e.y0};return p({source:r,target:r})}));S.merge(M).transition(x).attr("d",(function(t){var e=t.target._children&&t.target._children.length>0,r=m.select('[data-id="'.concat(t.target.id,'"]')).node().getBBox(),a={x:t.target.x,y:t.target.y-r.width};return p(e?{source:t.source,target:a}:{source:t.source,target:t.target})})),S.exit().transition(x).remove().attr("d",(function(t){var r={x:e.x,y:e.y};return p({source:r,target:r})})),i.eachBefore((function(t){t.x0=t.x,t.y0=t.y}))}(i),f.node()}var p=r(15),f=r(13),h=r.n(f);function m(t,e,r,a,n,i,o){try{var s=t[i](o),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(a,n)}function g(t){return function(){var e=this,r=arguments;return new Promise((function(a,n){var i=t.apply(e,r);function o(t){m(i,a,n,o,s,"next",t)}function s(t){m(i,a,n,o,s,"throw",t)}o(void 0)}))}}function v(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function _(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?v(Object(r),!0).forEach((function(e){y(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var b={components:{CaretIcon:c.a,CaretLeftIcon:c.b,Checkbox:s.a,DateRangeToggle:s.c,FilterDropdown:s.d,Loader:s.f,TimeSlider:s.i,StatFilter:l.i},title:"Summary",data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,timeFilter:{start:null,end:null},minuteFilterLbl:"60 minutes",showMinuteFilter:!1,axiosSrc:null,dataError:null,dataFilters:{trigger:6,start_hour:8,stop_hour:16,low_desk_filter:.2,start_date:"",stop_date:"",node_type:"Customer",node_id:"ad9b565d-9082-4808-99cd-32f2f09f63f2"},mapperLoaded:!1,mapper:null,sensorMap:!1,currentFloor:null,sensorMapText:""}},computed:_(_(_({},Object(i.d)({user:function(t){return t.user},company:function(t){return t.user.company},summary:function(t){return t.homepage.summary},floorSummary:function(t){return t.peakchart.summary},filter:function(t){return t.homepage.filter},rangeFilter:function(t){return t.homepage.rangeFilter},startTimeFilter:function(t){return t.homepage.startTime},endTimeFilter:function(t){return t.homepage.endTime}})),Object(i.b)({api_header:"backend/api_header",api_customer_summary:"backend/api_customer_summary",api_graph_view:"backend/api_graph_view",api_building_overview:"backend/api_building_overview",api_sensors_by_node:"backend/api_sensors_by_node"})),{},{settings:function(){return this.user.company?this.user.company.settings:null},baseUrl:function(){return Object(o.g)()},minuteFilters:function(){return[60].map((function(t){return{value:t,label:"".concat(t," minutes")}}))},chartTitle:function(){return this.sensorMap?"Low Performing ".concat(this.currentFloor&&"Desk Area"==this.currentFloor.area?"Workspaces":"Meeting Rooms"):this.filter.btnLabel},statDateRange:function(){var t=this.dataFilters.start_date,e=this.dataFilters.stop_date,r=new Date(t.substring(0,t.indexOf("T"))),a=new Date(e.substring(0,e.indexOf("T")));return Object(o.d)(r,a)}}),methods:_(_({},Object(i.c)({setSummary:"homepage/setSummary",setPeakSummary:"peakchart/setSummary",setRange:"homepage/setRange",setTime:"homepage/setTime"})),{},{backTo:function(){var t=this;this.sensorMap?(this.sensorMap=!1,setTimeout((function(){t.mapperLoaded=!1}),250)):this.$router.back()},rangeSelect:function(t,e,r){var a=Object(o.y)(e),n=Object(o.x)(r);this.setRange({type:t,start:a,end:n}),this.dataFilters.start_date=a,this.dataFilters.stop_date=n,this.axiosSrc&&this.axiosSrc.cancel("Date range selected"),Object(o.c)("#tree-summary"),this.renderTree(!0)},filterSelect:function(){Object(o.c)("#tree-summary"),this.renderTree()},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},renderTree:function(){var t=arguments,e=this;return g(n.a.mark((function r(){var a,i,s,c,l,d,p,f,m,g,v,_,b,w,x,k;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=t.length>0&&void 0!==t[0]&&t[0],i=["building_country","building_city"],c={_:s=[]},l=e.filter.value,d="opportunity_cost"==l,e.loaded=!1,p=null==e.summary||null==e.floorSummary||a,r.prev=4,!p){r.next=20;break}if(e.axiosSrc=h.a.CancelToken.source(),null!=e.summary&&!a){r.next=15;break}return r.next=10,h.a.all([h.a.post(e.api_customer_summary,e.dataFilters,e.api_header(e.axiosSrc.token)),h.a.post(e.api_graph_view,e.dataFilters,e.api_header(e.axiosSrc.token))]);case 10:f=r.sent,e.setSummary(f[0].data),e.setPeakSummary(f[1].data),r.next=20;break;case 15:return r.next=17,h.a.post(e.api_graph_view,e.dataFilters,e.api_header(e.axiosSrc.token));case 17:m=r.sent,g=m.data,e.setPeakSummary(g);case 20:e.loaded=!0,e.dataError=null,v={ID:"",name:e.summary.customer,children:[]},_=JSON.parse(JSON.stringify(e.summary.building_summary)),b=JSON.parse(JSON.stringify(e.floorSummary)),v.value=(d?o.v:o.b)(_.map((function(t){return Object(o.k)(t,l,0)}))),w=[{name:"low_perform_workspace.average_percentage"==l?"Workspaces occupied < 20%":"Free Desks at Peak",key:"free_workspace_utils.max",area:"Desk Area"},{name:"low_perform_workspace.average_percentage"==l?"Meeting Rooms occupied < 20%":"Free Meeting Rooms at Peak",key:"free_meeting_room_occupancy.max",area:"Meeting Room"}],_.forEach((function(t){var e=b.find((function(e){return e.building_id==t.building_id}));t.name=t.building_name,t.value=Object(o.k)(t,l,0),t.children=[],w.forEach((function(r){var a={name:r.name,value:Object(o.k)(t,r.key,0),number:!0};e&&(a.children=e.floor_summary.map((function(e){return{no:e.floor,bid:t.building_id,name:"".concat(Object(o.z)(e.floor)," Floor"),value:Object(o.k)(e,r.key,0),number:!0,floor:!0,area:r.area}}))),t.children.push(a)})),i.reduce((function(e,r){if(!e[t[r]]&&(e[t[r]]={_:[]},t[r])){var a,n=(y(a={},"name",t[r]),y(a,"children",e[t[r]]._),a);if("building_country"===r){var i=_.filter((function(e){return e[r]==t[r]}));n.value=(d?o.v:o.b)(i.map((function(t){return Object(o.k)(t,l,0)}))),n.building_country=!0}else if("building_city"===r){var s=_.filter((function(e){return e[r]==t[r]}));n.value=(d?o.v:o.b)(s.map((function(t){return Object(o.k)(t,l,0)}))),n.building_city=!0}e._.push(n)}return e[t[r]]}),c)._.push(t)})),v.children=s,e.loaded=!0,x="low_perform_workspace.average_percentage"==l?{viewFloor:function(t){var r=t.data;e.sensorMap=!0,e.currentFloor=r,e.sensorMapText="".concat(r.value," ").concat("Desk Area"==r.area?"Workspaces":"Meeting Rooms"," occupied < 20% of the period selected"),e.renderMap()}}:null,setTimeout((function(){u("#tree-summary",v,d,x)}),100),r.next=39;break;case 34:r.prev=34,r.t0=r.catch(4),console.error("renderTree",r.t0,null===(k=r.t0.response)||void 0===k?void 0:k.data),e.dataError="Unable to retrieve data, please try again",e.loaded=!0;case 39:case"end":return r.stop()}}),r,null,[[4,34]])})))()},renderMap:function(){var t=this;return g(n.a.mark((function e(){var r,a,i,s,c,l,d,u,f,m,g,v,_,y;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t.currentFloor.bid,a=t.currentFloor.no,i=t.currentFloor.area,s=t.currentFloor.value,t.mapperLoaded=!1,t.axiosSrc=h.a.CancelToken.source(),e.next=9,h.a.all([h.a.get(t.api_building_overview(t.dataFilters.node_id,r),t.api_header(t.axiosSrc.token)),h.a.get("/api/floors",{params:{bid:r}})]);case 9:return c=e.sent,l=c[0].data,d=l.children.find((function(t){return t.number==a})),u=c[1].data,d&&(f=u.find((function(t){return t.ref_id==d.id})),d.floor_plan=null==f?void 0:f.floor_plan,d.floor_plan_url=null!=f&&f.floor_plan?"".concat(Object(o.g)(),"/plans/").concat(f.floor_plan):null,d.areas=d.children,delete d.children),e.next=16,h.a.all([h.a.get(t.api_sensors_by_node(d.id,"Floor"),t.api_header()),h.a.get("/api/sensors",{fid:d.id})]);case 16:m=e.sent,g=m[0].data,v=m[1].data,g.forEach((function(t){var e=v.find((function(e){return e.ref_id==t.id}));e&&(t.pos_x=e.pos_x,t.pos_y=e.pos_y,t.scale=e.scale),t.sensor_state="available",t.area=d.areas.find((function(e){return e.id==t.parent_id}))})),_=g.filter((function(t){return t.area.type==i})),"Desk Area"==i?d.sensors=_.slice(0,s):(y=d.areas.filter((function(t){return t.type==i})).slice(0,s).map((function(t){return t.id})),d.sensors=_.filter((function(t){return y.indexOf(t.area.id)>=0}))),t.mapperLoaded=!0,t.dataError=null,setTimeout((function(){t.mapper=new p.a("#sensor-map",d)}),100),e.next=31;break;case 26:e.prev=26,e.t0=e.catch(0),t.mapperLoaded=!0,t.dataError="Unable to retrieve data, please try again",console.error("renderMap.error",e.t0);case 31:case"end":return e.stop()}}),e,null,[[0,26]])})))()},timeStartChange:function(t,e){this.dataFilters.start_hour=e,this.setTime({start:e,end:this.dataFilters.stop_hour}),this.axiosSrc&&this.axiosSrc.cancel("Start time updated"),Object(o.c)("#tree-summary"),this.renderTree(!0)},timeEndChange:function(t,e){this.dataFilters.stop_hour=e,this.setTime({start:this.dataFilters.start_hour,end:e}),this.axiosSrc&&this.axiosSrc.cancel("End time updated"),Object(o.c)("#tree-summary"),this.renderTree(!0)},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilterLbl=e.label}}),created:function(){if(this.company&&this.company.ref_id&&(this.dataFilters.node_id=this.company.ref_id),null==this.rangeFilter.type){var t=new Date,e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=new Date(t.getFullYear(),t.getMonth(),t.getDate(),23),a=Object(o.y)(e),n=Object(o.x)(r);this.dataFilters.start_date=a,this.dataFilters.stop_date=n,this.setRange({type:"today",start:a,end:n})}else this.dataFilters.start_date=this.rangeFilter.start,this.dataFilters.stop_date=this.rangeFilter.end;this.startTimeFilter?(this.dataFilters.start_hour=this.timeFilter.start=this.startTimeFilter,this.dataFilters.stop_hour=this.timeFilter.end=this.endTimeFilter):this.settings&&(this.dataFilters.start_hour=this.timeFilter.start=Object(o.w)(this.settings.start_time),this.dataFilters.stop_hour=this.timeFilter.end=Object(o.w)(this.settings.end_time))},mounted:function(){this.renderTree()}},w=(r(110),r(3)),x=Object(w.a)(b,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("div",{staticClass:"graph-header"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),t.loaded?[t.loaded?r("div",{staticClass:"graph-filters"},[r("stat-filter",{on:{filterSelect:t.filterSelect}})],1):t._e(),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])]:t._e()],2),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"chart-header"},[r("span",{staticClass:"chart-title"},[t._v(t._s(t.chartTitle))]),t._v(" "),t.sensorMap&&t.currentFloor?r("span",{staticClass:"chart-subtitle floor-title"},[t._v(t._s(t.currentFloor.name))]):t._e(),t._v(" "),r("span",{staticClass:"chart-subtitle"},[t._v("("+t._s(t.statDateRange)+")")])]),t._v(" "),r("date-range-toggle",{attrs:{active:t.rangeFilter},on:{select:t.rangeSelect}}),t._v(" "),r("div",{staticClass:"tree-content"},[r("div",{staticClass:"chart-wrapper",class:{"map-view":t.sensorMap}},[r("div",{staticClass:"tree-wrapper"},[t.loaded?[t.dataError?r("div",{staticClass:"error-display",staticStyle:{height:"40vh"}},[r("p",[t._v(t._s(t.dataError))]),t._v(" "),r("a",{staticClass:"btn btn-primary",staticStyle:{"align-self":"center"},attrs:{href:"javascript:;"},on:{click:function(e){return t.renderTree(!0)}}},[t._v("Retry")])]):r("div",{attrs:{id:"tree-summary"}})]:r("div",{staticStyle:{height:"40vh"}},[r("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)],2),t._v(" "),r("div",{staticClass:"mapper"},[t.mapperLoaded?[t.dataError?r("div",{staticClass:"error-display",staticStyle:{height:"40vh"}},[r("p",[t._v(t._s(t.dataError))]),t._v(" "),r("a",{staticClass:"btn btn-primary",staticStyle:{"align-self":"center"},attrs:{href:"javascript:;"},on:{click:t.renderMap}},[t._v("Retry")])]):r("div",{staticClass:"sensor-map"},[r("div",{attrs:{id:"sensor-map"}}),t._v(" "),r("p",[t._v(t._s(t.sensorMapText))])])]:r("div",{staticStyle:{height:"40vh"}},[r("loader",{attrs:{show:!t.mapperLoaded,type:"ripple"}})],1)],2)])]),t._v(" "),r("div",{staticClass:"bottom-filters"},[r("time-slider",{attrs:{from:t.timeFilter.start,to:t.timeFilter.end},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),r("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                "+t._s(t.minuteFilterLbl?t.minuteFilterLbl:"Select")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)],1),t._v(" "),r("div",{staticClass:"graph-footer"},[r("div",{staticClass:"left-options"}),t._v(" "),r("div",{staticClass:"right-options"},[r("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[],!1,null,"0b84b2c7",null);e.default=x.exports},44:function(t,e,r){var a=r(111);"string"==typeof a&&(a=[[t.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};r(7)(a,n);a.locals&&(t.exports=a.locals)}}]);