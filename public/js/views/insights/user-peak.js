(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{20:function(t,e,a){var n=a(93);"string"==typeof n&&(n=[[t.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};a(8)(n,r);n.locals&&(t.exports=n.locals)},203:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),i=a(4),s=a(6),l=a(2),o=a(0);var c=function(t,e,a){var n=o.z(t),r=10,i=30,s=30,l=50,c=800-l-i,u=400-r-s,d=n.append("svg").attr("width",c+l+i).attr("height",u+r+s).append("g").attr("transform","translate("+l+","+r+")");e.length,e.push({label:"",xValue:o.q(e,(function(t){return t.xValue}))+1,yValue:e[e.length-1].yValue});var f=C(e),h=o.x().domain(o.j(e,(function(t){return t.xValue}))).range([0,c]),p=o.q(e,(function(t){return t.yValue})),g=-p,v=o.x().domain([g,p]).range([u,0]),m=d.append("linearGradient").attr("id","area-gradient").attr("gradientUnits","userSpaceOnUse").attr("x1",0).attr("y1",v(0)).attr("x2",c).attr("y2",v(0)).selectAll("stop").data([{offset:"0%",color:"#524FFF"},{offset:"100%",color:"#FF5A09"}]).enter().append("stop").attr("offset",(function(t){return t.offset})).attr("stop-color",(function(t){return t.color})),b=d.append("g").attr("class","grid").attr("transform","translate(0,"+u+")").style("opacity",.1),x=d.append("path").datum(e).attr("fill","url(#area-gradient)").attr("d",o.c().x((function(t){return h(t.xValue)})).y0(u/2).y1(u/2)),y=d.append("path").datum(f).attr("fill","url(#area-gradient)").attr("d",o.c().x((function(t){return h(t.xValue)})).y0(u/2).y1(u/2)),_=d.append("g").attr("class","labels").attr("transform","translate(0,0)");function C(t){var e=[];return t.forEach((function(t){e.push({label:t.label,xValue:t.xValue,yValue:-t.yValue})})),e}return this.update=function(t,e){e&&t.push({label:"",xValue:o.q(t,(function(t){return t.xValue}))+1,yValue:t[t.length-1].yValue});var a=t.length,n=o.q(t,(function(t){return t.yValue})),r=-n,i=C(t),s=o.x().domain(o.j(t,(function(t){return t.xValue}))).range([0,c]),l=o.x().domain([r,n]).range([u,0]);m.attr("x1",0).attr("y1",l(0)).attr("x2",c).attr("y2",l(0)),b.selectAll(".tick").remove(),b.call(o.d(s).ticks(a).tickSize(-u).tickFormat("")).call((function(t){t.select(".domain").remove(),t.selectAll(".tick text").remove()})),x.datum(t).transition().duration(750).attr("d",o.c().x((function(t){return s(t.xValue)})).y0(l(0)).y1((function(t){return l(t.yValue)}))),y.datum(i).transition().duration(750).attr("d",o.c().x((function(t){return s(t.xValue)})).y0(l(0)).y1((function(t){return l(t.yValue)}))),_.selectAll(".tick").remove(),_.call(o.d(s).ticks(a).tickSize(0).tickFormat((function(e,n){if(n===a)return"";var r=t.find((function(t){return t.xValue===e}));return r?r.yValue:""}))).call((function(e){e.select(".domain").remove(),e.select(".tick:last-child").remove(),e.selectAll(".tick").each((function(e,a){var n=o.z(this),r=t.find((function(t){return t.xValue===e}));r&&(n.select("text").attr("font-size",16).attr("text-anchor","start").attr("x",10).attr("class","value"),n.append("text").attr("font-size",10).attr("text-anchor","start").attr("x",10).attr("y",24).attr("dy","0.71em").attr("fill","currentColor").attr("class","label").text(r.label))}))}))},this.update(e),this};function u(t,e,a,n,r,i,s){try{var l=t[i](s),o=l.value}catch(t){return void a(t)}l.done?e(o):Promise.resolve(o).then(n,r)}function d(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var i=t.apply(e,a);function s(t){u(i,n,r,s,l,"next",t)}function l(t){u(i,n,r,s,l,"throw",t)}s(void 0)}))}}var f="/api/locations",h="/api/floors",p=[];function g(){return Math.floor(600*Math.random()+1)}var v={title:"User Peak",components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:l.a,DateRangeToggle:l.c,FilterDropdown:l.d,Loader:l.e,TimeSlider:l.h},data:function(){return{user:null,loaded:!1,showPageOpts:!1,showEmbed:!1,buildings:[],building:null,areas:["All Areas","Department","Informal Meeting Spaces","Meeting Rooms","Workspace Desk Area"],showFilter:!1,showAreaFilter:!1,chart:null,bldgFilter:null,areaFilter:"All Areas",timeFilter:{start:null,end:null}}},computed:{settings:function(){return this.user.company?this.user.company.settings:null},buildingFilters:function(){return this.buildings.map((function(t){return{value:t.hid,label:t.name}}))}},methods:{backTo:function(){this.$router.back()},getBuildings:function(){var t=this;return d(r.a.mark((function e(){var a,n,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=i.a.getUserCompany()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,axios.get(f,{params:{cid:a.hid,lob:!0}});case 5:n=e.sent,s=n.data,t.buildings=s,t.bldg_id?t.building=s.find((function(e){return e.hid===t.bldg_id})):t.building=s[0],t.bldgFilter=t.building.name,t.getFloors(t.building.hid,(function(e){t.loaded=!0,p=e,setTimeout((function(){t.renderChart(e.slice(0))}),0)}));case 11:case"end":return e.stop()}}),e)})))()},getFloors:function(t,e){return d(r.a.mark((function a(){var n,i,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,axios.get(h,{params:{bid:t}});case 2:return n=a.sent,i=n.data,s=i.sort((function(t,e){return t.floor_no>e.floor_no?1:t.floor_no<e.floor_no?-1:0})),a.abrupt("return",e&&e(s.map((function(t){return{label:"".concat(t.ordinal_no," Floor"),xValue:t.floor_no,yValue:g()}}))));case 6:case"end":return a.stop()}}),a)})))()},filterSelect:function(t,e){var a=this;this.showFilter=!1,this.building=this.buildings.find((function(e){return e.hid===t})),this.bldgFilter=e,this.getFloors(this.building.hid,(function(t){p=t,a.chart.update(t.slice(0),!0)}))},toCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},rangeSelect:function(t,e,a){},toLive:function(){this.$router.push({name:"live"})},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},renderChart:function(t){this.chart=new c("#user-peak-chart",t)},filterByArea:function(t,e){this.showAreaFilter=!1,this.areaFilter=e;var a=p.slice(0).map((function(t){return{label:t.label,xValue:t.xValue,yValue:g()}}));this.chart.update(a,!0)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},created:function(){this.user=i.a.getUser()},mounted:function(){this.getBuildings()}},m=(a(92),a(3)),b=Object(m.a)(v,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t.loaded&&t.building?[a("div",{staticClass:"graph-header"},[a("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),a("div",{staticClass:"graph-filters"},[a("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                    "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),a("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),a("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"})]),t._v(" "),a("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?a("div",{staticClass:"page-opt-panel"},[a("ul",[a("li",[a("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),a("div",{staticClass:"graph-content"},[a("div",{staticClass:"chart-header"},[a("span",{staticClass:"chart-title"},[t._v(t._s(t.building.name+" User Peak"))]),t._v(" "),t.areaFilter?a("span",{staticClass:"chart-subtitle"},[t._v(t._s("("+t.areaFilter+")"))]):t._e()]),t._v(" "),a("div",{staticClass:"row"},[t._m(0),t._v(" "),a("div",{staticClass:"col-12 col-md-3",attrs:{id:"area-filter"}},[a("span",{staticClass:"graph-filter",on:{click:function(e){t.showAreaFilter=!t.showAreaFilter}}},[t._v("\n                        "+t._s(t.areaFilter?t.areaFilter:"Select Area")+"\n                        "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.areas,show:t.showAreaFilter},on:{onSelect:t.filterByArea}})],1)])]),t._v(" "),a("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),a("div",{staticClass:"clearfix"})],1),t._v(" "),a("div",{staticClass:"graph-footer"},[a("div",{staticClass:"left-options"},[a("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),a("div",{staticClass:"right-options"},[a("checkbox",{attrs:{label:"Save to report"}})],1)])]:t._e(),t._v(" "),a("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col"},[e("div",{attrs:{id:"user-peak-chart"}})])}],!1,null,"2e0a2edf",null);e.default=b.exports},92:function(t,e,a){"use strict";var n=a(20);a.n(n).a},93:function(t,e,a){(t.exports=a(7)(!1)).push([t.i,"#area-filter[data-v-2e0a2edf] {\n  display: flex;\n  justify-content: left;\n  align-items: center;\n}",""])}}]);