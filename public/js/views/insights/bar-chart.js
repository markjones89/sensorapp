(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{101:function(t,e,n){"use strict";n(42)},102:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,".bar-chart svg{pointer-events:auto}",""])},249:function(t,e,n){"use strict";n.r(e);var a=n(5),r=n(4),i=n(2),s=n(6),c=n(1);function o(t,e,n){var a=c.y(t),r=30,i=30,s=100,o=50,l=950-o-i,u=400-r-s,f=a.append("svg").attr("width",l+o+i).attr("height",u+r+s).append("g").attr("transform","translate("+o+","+r+")"),d=c.n(e[0]),p=d.slice(1),h=d.slice(0,1)[0],g=c.p(e,(function(t){return t[h]})).keys(),v=c.x().domain(p).range(["rgb(149,49,0)","rgb(25,116,88)"]),m=c.x().domain(p).range(["rgb(255,90,0)","rgb(61,207,163)"]),b=c.v().domain(g).range([0,l]).padding([.2]),y=f.append("g").attr("class","x-axis").attr("transform","translate(0,"+u+")"),w=c.v().domain(p).range([0,b.bandwidth()]).padding([.05]),k=function(t){return c.q(t,(function(t){var e=0;return p.forEach((function(n){return e=Math.max(e,t[n])})),10*Math.ceil(e/10)}))},C=c.w().domain([0,k(e)]).range([u,0]),_=f.append("g").attr("class","grid"),x=f.append("g").attr("class","legend").attr("transform","translate(0,0)"),O=function(t){return t.getBBox().width},P=function(t){return t.getBBox().height};return this.update=function(t){d=c.n(t[0]),p=d.slice(1),h=d.slice(0,1)[0],g=c.p(t,(function(t){return t[h]})).keys(),b.domain(g),w.domain(p).range([0,b.bandwidth()]),C.domain([0,k(t)]),_.call(c.e(C).tickSize(-l)).call((function(t){t.select(".domain").remove(),t.selectAll(".tick line").style("opacity",.1),t.selectAll(".tick text").style("transform","translateX(-5px)")})),y.call(c.d(b).tickSizeOuter(0).tickSizeInner(8).tickPadding(6)).call((function(t){t.selectAll(".tick line").style("transform","translateY(8px)"),t.selectAll(".tick text").style("text-anchor","end").style("transform","translateY(8px) rotate(-45deg)")})),f.select(".bar-data").remove(),f.append("g").attr("class","bar-data").selectAll("g").data(t).enter().append("g").attr("class","bar-group").attr("transform",(function(t){return"translate(".concat(b(t[h]),",0)")})).selectAll("rect").data((function(t){return p.map((function(e){return{key:e,value:t[e]}}))})).enter().append("rect").attr("class","bar").attr("x",(function(t){return w(t.key)})).attr("y",(function(t){return C(0)})).attr("width",w.bandwidth()).attr("height",(function(t){return u-C(0)})).attr("rx",w.bandwidth()/2).attr("ry",w.bandwidth()/2).attr("fill",(function(t){return v(t.key)})).on("mouseover",(function(t,e){var n=c.y(this.parentNode).datum();c.y(this).attr("fill",m(t.key)),c.y('.bar-label text[data-label-for="'.concat(t.key,":").concat(n[h],'"]')).style("opacity",1)})).on("mouseout",(function(t,e){var n=c.y(this.parentNode).datum();c.y(this).attr("fill",v(t.key)),c.y('.bar-label text[data-label-for="'.concat(t.key,":").concat(n[h],'"]')).style("opacity",0)})).transition().duration(1e3).attr("height",(function(t){return u-C(t.value)})).attr("y",(function(t){return C(t.value)})),f.append("g").attr("class","bar-labels").selectAll("g").data(t).enter().append("g").attr("class","bar-label").attr("transform",(function(t){return"translate(".concat(b(t[h]),",0)")})).selectAll("text").data((function(t){return p.map((function(e){return{key:e,value:t[e]}}))})).enter().append("text").attr("class","label").attr("x",(function(t){return w(t.key)})).attr("y",(function(t){return C(t.value)-20})).attr("dy",".75em").attr("data-label-for",(function(t){var e=c.y(this.parentNode).datum();return"".concat(t.key,":").concat(e[h])})).style("fill","#fff").style("font-size","13px").style("opacity",0).text((function(t){return"".concat(t.value,"%")})).style("transform",(function(t){return"translateX(".concat(w.bandwidth()/2-O(this)/2,"px)")})),function(t){x.selectAll("g").remove();var e=x.selectAll("g").data(t).enter().append("g").attr("transform",(function(t,e){return"translate(".concat(100*e,",").concat(u+20,")")})).each((function(t){var e=c.y(this);e.append("rect").attr("width",15).attr("height",5).style("fill",(function(t){return m(t)})),e.append("text").attr("x",24).attr("y",10).style("fill","#fff").text((function(t){return t}))})),n=0;e.attr("transform",(function(t,e){var a=n;return n+=O(this)+30,"translate(".concat(a,",").concat(u+10,")")})).call((function(t){t.selectAll("rect").attr("y",(function(){return P(t.node())/3-P(this)/2}))})),x.attr("transform",(function(){return"translate(".concat((l-O(this))/2,",").concat(P(y.node())+25,")")}))}(p)},this.update(e),this}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d(t){return Math.floor(Math.random()*(t||100)+1)}function p(t){var e=[];if("today"===t){for(var n=[],a=0;a<24;a++)n.push("".concat(("00"+a).substr(-2,2),":00"));n.forEach((function(t){var n=d(90),a=n+d(100-n);e.push({Hour:t,Peak:a,Average:n})}))}else if("week"===t){["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((function(t){var n=d(90),a=n+d(100-n);e.push({Day:t,Peak:a,Average:n})}))}else if("month"===t)for(var r=new Date,i=new Date(r.getFullYear(),r.getMonth()+1,0).getDate(),s=r.toString().substr(4,3),c=1;c<=i;c++){var o=d(90),l=o+d(100-o);e.push({Date:"".concat(s," ").concat(c),Peak:l,Average:o})}else if("year"===t){["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].forEach((function(t){var n=d(90),a=n+d(100-n);e.push({Month:t,Peak:a,Average:n})}))}return e}var h={title:"Bar Chart",components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:i.a,DateRangeToggle:i.c,FilterDropdown:i.d,Modal:i.g,TimeSlider:i.h},data:function(){return{showPageOpts:!1,showEmbed:!1,chart:null,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:u(u({},Object(a.d)({user:function(t){return t.user}})),{},{baseUrl:function(){return Object(r.c)()},settings:function(){return this.user.company?this.user.company.settings:null},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},rangeSelect:function(t,e,n){this.chart.update(p(t))},viewCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},renderChart:function(){this.chart=new o("#bar-chart",p("today"))},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toLive:function(){this.$router.push({name:"occupancy"})}},mounted:function(){this.renderChart()}},g=(n(101),n(3)),v=Object(g.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"graph-header"},[n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter"},[t._v("\n                Select Location\n                "),n("span",{staticClass:"caret"},[n("caret-icon")],1)]),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.viewCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"bar-chart",attrs:{id:"bar-chart"}}),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)]),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"},[n("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")]),t._v(" "),n("button",{staticClass:"btn btn-primary btn-small"},[t._v("Insights")])]),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chart-header"},[e("span",{staticClass:"chart-title"},[this._v("Building Name, Ground Floor Peak Performance")])])}],!1,null,null,null);e.default=v.exports},42:function(t,e,n){var a=n(102);"string"==typeof a&&(a=[[t.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(8)(a,r);a.locals&&(t.exports=a.locals)}}]);