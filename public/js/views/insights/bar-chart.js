(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{205:function(t,a,n){"use strict";n.r(a);var e=n(4),r=n(5),s=n(2),i=n(6),c=n(0);function o(t,a,n){var e=c.y(t),r=30,s=30,i=100,o=50,l=950-o-s,u=400-r-i,d=e.append("svg").attr("width",l+o+s).attr("height",u+r+i).append("g").attr("transform","translate("+o+","+r+")"),f=c.n(a[0]),h=f.slice(1),p=f.slice(0,1)[0],g=c.p(a,(function(t){return t[p]})).keys(),v=c.x().domain(h).range(["rgb(149,49,0)","rgb(25,116,88)"]),m=c.x().domain(h).range(["rgb(255,90,0)","rgb(61,207,163)"]),b=c.v().domain(g).range([0,l]).padding([.2]),y=d.append("g").attr("class","x-axis").attr("transform","translate(0,"+u+")"),k=c.v().domain(h).range([0,b.bandwidth()]).padding([.05]),C=function(t){return c.q(t,(function(t){var a=0;return h.forEach((function(n){return a=Math.max(a,t[n])})),10*Math.ceil(a/10)}))},x=c.w().domain([0,C(a)]).range([u,0]),w=d.append("g").attr("class","grid"),_=d.append("g").attr("class","legend").attr("transform","translate(0,0)"),A=function(t){return t.getBBox().width},S=function(t){return t.getBBox().height};return this.update=function(t){f=c.n(t[0]),h=f.slice(1),p=f.slice(0,1)[0],g=c.p(t,(function(t){return t[p]})).keys(),b.domain(g),k.domain(h).range([0,b.bandwidth()]),x.domain([0,C(t)]),w.call(c.e(x).tickSize(-l)).call((function(t){t.select(".domain").remove(),t.selectAll(".tick line").style("opacity",.1),t.selectAll(".tick text").style("transform","translateX(-5px)")})),y.call(c.d(b).tickSizeOuter(0).tickSizeInner(8).tickPadding(6)).call((function(t){t.selectAll(".tick line").style("transform","translateY(8px)"),t.selectAll(".tick text").style("text-anchor","end").style("transform","translateY(8px) rotate(-45deg)")})),d.select(".bar-data").remove(),d.append("g").attr("class","bar-data").selectAll("g").data(t).enter().append("g").attr("class","bar-group").attr("transform",(function(t){return"translate(".concat(b(t[p]),",0)")})).selectAll("rect").data((function(t){return h.map((function(a){return{key:a,value:t[a]}}))})).enter().append("rect").attr("class","bar").attr("x",(function(t){return k(t.key)})).attr("y",(function(t){return x(0)})).attr("width",k.bandwidth()).attr("height",(function(t){return u-x(0)})).attr("rx",k.bandwidth()/2).attr("ry",k.bandwidth()/2).attr("fill",(function(t){return v(t.key)})).on("mouseover",(function(t,a){var n=c.y(this.parentNode).datum();c.y(this).attr("fill",m(t.key)),c.y('.bar-label text[data-label-for="'.concat(t.key,":").concat(n[p],'"]')).style("opacity",1)})).on("mouseout",(function(t,a){var n=c.y(this.parentNode).datum();c.y(this).attr("fill",v(t.key)),c.y('.bar-label text[data-label-for="'.concat(t.key,":").concat(n[p],'"]')).style("opacity",0)})).transition().duration(1e3).attr("height",(function(t){return u-x(t.value)})).attr("y",(function(t){return x(t.value)})),d.append("g").attr("class","bar-labels").selectAll("g").data(t).enter().append("g").attr("class","bar-label").attr("transform",(function(t){return"translate(".concat(b(t[p]),",0)")})).selectAll("text").data((function(t){return h.map((function(a){return{key:a,value:t[a]}}))})).enter().append("text").attr("class","label").attr("x",(function(t){return k(t.key)})).attr("y",(function(t){return x(t.value)-20})).attr("dy",".75em").attr("data-label-for",(function(t){var a=c.y(this.parentNode).datum();return"".concat(t.key,":").concat(a[p])})).style("fill","#fff").style("font-size","13px").style("opacity",0).text((function(t){return"".concat(t.value,"%")})).style("transform",(function(t){return"translateX(".concat(k.bandwidth()/2-A(this)/2,"px)")})),function(t){_.selectAll("g").remove();var a=_.selectAll("g").data(t).enter().append("g").attr("transform",(function(t,a){return"translate(".concat(100*a,",").concat(u+20,")")})).each((function(t){var a=c.y(this);a.append("rect").attr("width",15).attr("height",5).style("fill",(function(t){return m(t)})),a.append("text").attr("x",24).attr("y",10).style("fill","#fff").text((function(t){return t}))})),n=0;a.attr("transform",(function(t,a){var e=n;return n+=A(this)+30,"translate(".concat(e,",").concat(u+10,")")})).call((function(t){t.selectAll("rect").attr("y",(function(){return S(t.node())/3-S(this)/2}))})),_.attr("transform",(function(){return"translate(".concat((l-A(this))/2,",").concat(S(y.node())+25,")")}))}(h)},this.update(a),this}function l(t){return Math.floor(Math.random()*(t||100)+1)}function u(t){var a=[];if("today"===t){for(var n=[],e=0;e<24;e++)n.push("".concat(("00"+e).substr(-2,2),":00"));n.forEach((function(t){var n=l(90),e=n+l(100-n);a.push({Hour:t,Peak:e,Average:n})}))}else if("week"===t){["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((function(t){var n=l(90),e=n+l(100-n);a.push({Day:t,Peak:e,Average:n})}))}else if("month"===t)for(var r=new Date,s=new Date(r.getFullYear(),r.getMonth()+1,0).getDate(),i=r.toString().substr(4,3),c=1;c<=s;c++){var o=l(90),u=o+l(100-o);a.push({Date:"".concat(i," ").concat(c),Peak:u,Average:o})}else if("year"===t){["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].forEach((function(t){var n=l(90),e=n+l(100-n);a.push({Month:t,Peak:e,Average:n})}))}return a}var d={title:"Bar Chart",components:{CaretIcon:i.a,CaretLeftIcon:i.b,Checkbox:s.a,DateRangeToggle:s.c,Modal:s.g,TimeSlider:s.h},data:function(){return{user:null,showPageOpts:!1,showEmbed:!1,chart:null,timeFilter:{start:null,end:null}}},computed:{baseUrl:function(){return Object(r.c)()},settings:function(){return this.user.company?this.user.company.settings:null}},methods:{backTo:function(){this.$router.back()},rangeSelect:function(t,a,n){this.chart.update(u(t))},viewCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},renderChart:function(){this.chart=new o("#bar-chart",u("today"))},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},toLive:function(){this.$router.push({name:"occupancy"})}},created:function(){this.user=e.a.getUser()},mounted:function(){this.renderChart()}},f=(n(92),n(3)),h=Object(f.a)(d,(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"content"},[n("div",{staticClass:"graph-header"},[n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter"},[t._v("\n                Select Location\n                "),n("span",{staticClass:"caret"},[n("caret-icon")],1)]),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.viewCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(a){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(a){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"bar-chart",attrs:{id:"bar-chart"}}),t._v(" "),n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("div",{staticClass:"clearfix"})],1),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"},[n("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")]),t._v(" "),n("button",{staticClass:"btn btn-primary btn-small"},[t._v("Insights")])]),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"chart-header"},[a("span",{staticClass:"chart-title"},[this._v("Building Name, Ground Floor Peak Performance")])])}],!1,null,null,null);a.default=h.exports},21:function(t,a,n){var e=n(93);"string"==typeof e&&(e=[[t.i,e,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(8)(e,r);e.locals&&(t.exports=e.locals)},92:function(t,a,n){"use strict";var e=n(21);n.n(e).a},93:function(t,a,n){(t.exports=n(7)(!1)).push([t.i,".bar-chart svg {\n  pointer-events: initial;\n}",""])}}]);