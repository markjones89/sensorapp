(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{104:function(t,e,n){"use strict";n(44)},105:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,"#area-filter[data-v-a706c46c]{display:flex;justify-content:left;align-items:center}",""])},254:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(5),s=n(6),l=n(3),o=n(1);var c=function(t,e,n){var a,r,i,s=o.y(t),l=10,c=30,u=30,d=50,f=800-d-c,p=400-l-u,h=s.append("svg").attr("width",f+d+c).attr("height",p+l+u).append("g").attr("transform","translate("+d+","+l+")");e.length,e.push({label:"",xValue:(null!==(a=o.q(e,(function(t){return t.xValue})))&&void 0!==a?a:0)+1,yValue:null!==(r=null===(i=e[e.length-1])||void 0===i?void 0:i.yValue)&&void 0!==r?r:0}),console.log("create.data",e);var g=C(e),v=o.w().domain(o.j(e,(function(t){return t.xValue}))).range([0,f]),b=o.q(e,(function(t){return t.yValue})),m=-b,y=o.w().domain([m,b]).range([p,0]),_=h.append("linearGradient").attr("id","area-gradient").attr("gradientUnits","userSpaceOnUse").attr("x1",0).attr("y1",y(0)).attr("x2",f).attr("y2",y(0)).selectAll("stop").data([{offset:"0%",color:"#524FFF"},{offset:"100%",color:"#FF5A09"}]).enter().append("stop").attr("offset",(function(t){return t.offset})).attr("stop-color",(function(t){return t.color})),w=h.append("g").attr("class","grid").attr("transform","translate(0,"+p+")").style("opacity",.1),x=h.append("path").datum(e).attr("fill","url(#area-gradient)").attr("d",o.c().x((function(t){return v(t.xValue)})).y0(p/2).y1(p/2)),F=h.append("path").datum(g).attr("fill","url(#area-gradient)").attr("d",o.c().x((function(t){return v(t.xValue)})).y0(p/2).y1(p/2)),k=h.append("g").attr("class","labels").attr("transform","translate(0,0)");function C(t){var e=[];return t.forEach((function(t){e.push({label:t.label,xValue:t.xValue,yValue:-t.yValue})})),e}return this.update=function(t,e){var n,a,r;e&&t.push({label:"",xValue:(null!==(n=o.q(t,(function(t){return t.xValue})))&&void 0!==n?n:0)+1,yValue:null!==(a=null===(r=t[t.length-1])||void 0===r?void 0:r.yValue)&&void 0!==a?a:0}),console.log("update.data",t);var i=t.length,s=o.q(t,(function(t){return t.yValue})),l=-s,c=C(t),u=o.w().domain(o.j(t,(function(t){return t.xValue}))).range([0,f]),d=o.w().domain([l,s]).range([p,0]);_.attr("x1",0).attr("y1",d(0)).attr("x2",f).attr("y2",d(0)),w.selectAll(".tick").remove(),w.call(o.d(u).ticks(i).tickSize(-p).tickFormat("")).call((function(t){t.select(".domain").remove(),t.selectAll(".tick text").remove()})),x.datum(t).transition().duration(750).attr("d",o.c().x((function(t){return u(t.xValue)})).y0(d(0)).y1((function(t){return d(t.yValue)}))),F.datum(c).transition().duration(750).attr("d",o.c().x((function(t){return u(t.xValue)})).y0(d(0)).y1((function(t){return d(t.yValue)}))),k.selectAll(".tick").remove(),k.call(o.d(u).ticks(i).tickSize(0).tickFormat((function(e,n){if(n===i)return"";var a=t.find((function(t){return t.xValue===e}));return a?a.yValue:""}))).call((function(e){e.select(".domain").remove(),e.select(".tick:last-child").remove(),e.selectAll(".tick").each((function(e,n){var a=o.y(this),r=t.find((function(t){return t.xValue===e}));r&&(a.select("text").attr("font-size",16).attr("text-anchor","start").attr("x",10).attr("class","value"),a.append("text").attr("font-size",10).attr("text-anchor","start").attr("x",10).attr("y",24).attr("dy","0.71em").attr("fill","currentColor").attr("class","label").text(r.label))}))}))},this.update(e),this},u=n(2);function d(t,e,n,a,r,i,s){try{var l=t[i](s),o=l.value}catch(t){return void n(t)}l.done?e(o):Promise.resolve(o).then(a,r)}function f(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var i=t.apply(e,n);function s(t){d(i,a,r,s,l,"next",t)}function l(t){d(i,a,r,s,l,"throw",t)}s(void 0)}))}}function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v=[];function b(){return Math.floor(600*Math.random()+1)}var m={title:"User Peak",components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:l.a,DateRangeToggle:l.c,FilterDropdown:l.d,Loader:l.f,TimeSlider:l.i},data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,buildings:[],building:null,areas:["All Areas","Department","Informal Meeting Spaces","Meeting Rooms","Workspace Desk Area"],showFilter:!1,showAreaFilter:!1,chart:null,bldgFilter:null,areaFilter:"All Areas",timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:h(h(h({},Object(i.e)({user:function(t){return t.user}})),Object(i.c)({api_header:"backend/api_header",api_customers:"backend/api_customers",api_buildings:"backend/api_buildings",api_floors:"backend/api_floors"})),{},{settings:function(){return this.user.company?this.user.company.settings:null},buildingFilters:function(){return this.buildings.map((function(t){return{value:t.id,label:t.name}}))},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},getBuildings:function(){var t=this;return f(r.a.mark((function e(){var n,a,i,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.user.company_id,e.next=3,axios.get(t.api_buildings(n),t.api_header());case 3:return a=e.sent,i=a.data,t.buildings=i,t.bldg_id?t.building=i.find((function(e){return e.id===t.bldg_id})):t.building=i[0],t.bldgFilter=t.building.name,e.next=10,t.getFloors(t.building.id);case 10:s=e.sent,t.loaded=!0,v=s,setTimeout((function(){t.renderChart(s.slice(0))}),0);case 14:case"end":return e.stop()}}),e)})))()},getFloors:function(t){var e=this;return f(r.a.mark((function n(){var a,i,s,l;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.user.company_id,n.next=3,axios.get(e.api_floors(a,t),e.api_header());case 3:return i=n.sent,(s=i.data).forEach((function(t){return t.ordinal_no=Object(u.l)(t.number)})),l=s.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),e.floors=l.slice(0),n.abrupt("return",l.map((function(t){return{label:"".concat(t.ordinal_no," Floor"),xValue:t.number,yValue:b()}})));case 9:case"end":return n.stop()}}),n)})))()},filterSelect:function(t,e){var n=this;return f(r.a.mark((function a(){var i,s,l;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(i=n.building.id,n.showFilter=!1,n.building=n.buildings.find((function(e){return e.id===t})),n.bldgFilter=e,i!=t){a.next=9;break}s=v.slice(0).map((function(t){return{label:t.label,xValue:t.xValue,yValue:b()}})),n.chart.update(s,!0),a.next=14;break;case 9:return a.next=11,n.getFloors(n.building.id);case 11:l=a.sent,v=l,n.chart.update(l.slice(0),!0);case 14:case"end":return a.stop()}}),a)})))()},toCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},rangeSelect:function(t,e,n){},toLive:function(){this.$router.push({name:"occupancy",query:{bid:this.building.id}})},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},renderChart:function(t){this.chart=new c("#user-peak-chart",t)},filterByArea:function(t,e){this.showAreaFilter=!1,this.areaFilter=e;var n=v.slice(0).map((function(t){return{label:t.label,xValue:t.xValue,yValue:b()}}));this.chart.update(n,!0)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},mounted:function(){this.getBuildings()}},y=(n(104),n(4)),_=Object(y.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t.loaded&&t.building?[n("div",{staticClass:"graph-header"},[n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                    "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),n("div",{staticClass:"chart-header"},[n("span",{staticClass:"chart-title"},[t._v(t._s(t.building.name+" User Peak"))]),t._v(" "),t.areaFilter?n("span",{staticClass:"chart-subtitle"},[t._v(t._s("("+t.areaFilter+")"))]):t._e()]),t._v(" "),n("div",{staticClass:"row"},[t._m(0),t._v(" "),n("div",{staticClass:"col-12 col-md-3",attrs:{id:"area-filter"}},[n("span",{staticClass:"graph-filter",on:{click:function(e){t.showAreaFilter=!t.showAreaFilter}}},[t._v("\n                        "+t._s(t.areaFilter?t.areaFilter:"Select Area")+"\n                        "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.areas,show:t.showAreaFilter},on:{onSelect:t.filterByArea}})],1)])]),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)]),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"},[n("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])]:t._e(),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col"},[e("div",{attrs:{id:"user-peak-chart"}})])}],!1,null,"a706c46c",null);e.default=_.exports},44:function(t,e,n){var a=n(105);"string"==typeof a&&(a=[[t.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(8)(a,r);a.locals&&(t.exports=a.locals)}}]);