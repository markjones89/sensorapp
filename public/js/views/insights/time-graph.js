(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{182:function(t,e,a){var r=a(253);"string"==typeof r&&(r=[[t.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(8)(r,n);r.locals&&(t.exports=r.locals)},183:function(t,e,a){var r=a(255);"string"==typeof r&&(r=[[t.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(8)(r,n);r.locals&&(t.exports=r.locals)},252:function(t,e,a){"use strict";a(182)},253:function(t,e,a){(t.exports=a(7)(!1)).push([t.i,".time-chart{pointer-events:auto}.chart_XYAxis .axis{fill:#fff}.chart_XYAxis .axis .tick text{fill:hsla(0,0%,100%,.5)}.chart_XYAxis .axis .tick line,.chart_XYAxis .axis path.domain{stroke:hsla(0,0%,100%,.5)}",""])},254:function(t,e,a){"use strict";a(183)},255:function(t,e,a){(t.exports=a(7)(!1)).push([t.i,"#heat-map[data-v-9de2e99a]{width:900px;height:450px;margin:32px auto}#time-chart[data-v-9de2e99a]{flex:1 auto}",""])},28:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var r=a(2),n=a(0);function i(t,e,a){var i,o=r.y(t),s=Object(n.e)(!0,{widget:!1},a),c=s.events,l=0,u=960,p=.4*(u=o.node().getBoundingClientRect().width-(s.widget?0:17));function d(t){return Math.PI/180*t}function h(t){var e,a,r=t.sum(),n=[],i=t.length;for(a=0;a<i;a++)e=100*t[a]/r,n.push(e>=0?e:0);return n}Array.prototype.sum=function(t){var e,a=0,r=this.length;for(e=0;e<r;e++)if("number"==typeof this[e]){if(t&&this[e]<0)continue;a+=this[e]}return a};var f=r.B({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),m=r.D("%Y-%m-%dT%H:%M:%S.%LZ"),g=f.format("%A %d, %H:%M"),y=["wfhp","cs","pwu","pmru","pmre"],v={wfhp:{id:"wfhp",name:"Work from home peak",color:"fffd8f",highlightColor:"fffec6"},cs:{id:"cs",name:"Cost Saving",color:"e0713e",highlightColor:"efb89e"},pwu:{id:"pwu",name:"Peak Workspace Utilisation",color:"a93469",highlightColor:"dd90b3"},pmru:{id:"pmru",name:"Peak Meeting Room Utilisation",color:"60269e",highlightColor:"ae80e0"},pmre:{id:"pmre",name:"Peak Meeting Room Efficiency",color:"3439d3",highlightColor:"999ce9"}},b=o.append("svg").attr("class","time-chart").attr("width",u).attr("height",500),x=b.append("defs").append("filter").attr("id","brightness").append("feComponentTransfer");x.append("feFuncR").attr("type","linear").attr("slope","1.25"),x.append("feFuncG").attr("type","linear").attr("slope","1.25"),x.append("feFuncB").attr("type","linear").attr("slope","1.25"),b.append("circle").attr("id","circleBG").attr("r",200).attr("cx",p).attr("cy",250).attr("fill","rgb(57,57,57)"),b.append("g").attr("id","hours");b.append("g").attr("id","hostRads");var w,_,C=b.append("g").attr("id","circle"),k=C.append("circle").attr("r",200).attr("cx",p).attr("cy",250).attr("stroke","#990000").attr("fill","none").attr("stroke-dasharray",3).attr("stroke-width",2).attr("stroke-opacity",0),M=b.append("g").attr("id","curr-time-dot"),O=M.append("circle").attr("r",5).attr("cx",-9999).attr("cy",-9999).attr("stroke","none").attr("fill","#900"),P=r.y("svg #hours").attr("transform","translate("+p+",250)"),j=r.w().domain([0,1440]).range([0,360]),T=new Date,F=j(60*T.getHours()+T.getMinutes()),A=b.append("circle").attr("id","circleHour").attr("r",3).attr("cx",p+212*Math.sin(d(540-F))).attr("cy",250+212*Math.cos(d(540-F))).attr("stroke-width","2").attr("stroke","#BCD5D5").attr("fill","#BCD5D5"),H=setInterval((function(){var t=new Date,e=d(540-j(60*t.getHours()+t.getMinutes()));A.transition().attr("cx",p+212*Math.sin(e)).attr("cy",250+212*Math.cos(e)).attr("r",(function(){return 3!=A.attr("r")?3:1}))}),1e3);for(_=0;_<24;_++)w=180-15*_,P.append("text").text((_>9?_:"0"+_)+":00").attr("x",233*Math.sin(d(w))).attr("y",233*Math.cos(d(w))+7).attr("text-anchor","middle").style("font-size","14").style("font-weight","bold").style("fill","#666");var S=b.append("g").attr("id","breakdown_group").attr("transform","translate("+(p+200+100)+",100)").attr("opacity",0);S.append("rect").attr("y",320).attr("width",165).attr("height",3).attr("fill","#3C3C3C");var D,B=S.append("text").text("hoy").attr("y",339).attr("text-anchor","start").style("font-size","14").attr("fill","#666"),R=S.append("text").text("21:00h").attr("y",362).attr("text-anchor","start").style("font-size","27").attr("fill","#666"),E=b.append("g").attr("id","data-tooltip").attr("opacity",0),Y=E.append("rect").attr("width",120).attr("height",32).attr("rx",5),X=E.append("text").attr("id","fecha").attr("x",5).attr("y",11).attr("text-anchor","start").style("font-size","11").style("fill","white").style("fill-opacity",.75),z=E.append("text").text("").attr("x",15).attr("y",24).style("font-size","13").style("fill","white");b.on("mousemove",(function(t,e){var a,n,o,s,c,u,d,h,f,m=r.s(this),g=m[0],y=m[1],v=Math,x=v.pow(p-g,2),w=v.pow(250-y,2),_=v.sqrt(x+w),k=(b.offsetLeft,b.offsetTop,["fmt_",g>p?1:0,"_",y>250?1:0].join(""));k!=D&&(n="fmt_0_0"==(a=k)||"fmt_0_1"==a?-120:0,o="fmt_0_0"==a||"fmt_1_0"==a?-32:0,s="fmt_0_0"==a||"fmt_0_1"==a?-6:6,c="fmt_0_0"==a||"fmt_1_0"==a?-18:13,u="fmt_0_0"==a||"fmt_0_1"==a?"end":"start",d="fmt_0_0"==a||"fmt_0_1"==a?-6:6,h="fmt_0_0"==a||"fmt_1_0"==a?-6:26,f="fmt_0_0"==a||"fmt_0_1"==a?"end":"start",Y.attr("x",n).attr("y",o),X.attr("x",s).attr("y",c).attr("text-anchor",u),z.attr("x",d).attr("y",h).attr("text-anchor",f),D=k),l!=+(_<=200)&&(l=+(_<=200),C.transition().duration(100).style("opacity",l),M.transition().duration(100).style("opacity",l),E.transition().duration(100).style("opacity",l),l||N.call("mouseenter",this,i))}));var I,J,L,G,$,U=r.w().range([.4,1]),W=r.w().range(["#996A00","#990000"]).domain([0,100]),q=r.w().range([0,200]).domain([0,100]),N=r.g("mouseenter");function Z(t){var e,a=h(y.map((function(e){return t[e]}))),n=0,i=0,o=m(t.ts);S.attr("opacity",1),B.text(f.format("%A %d")(o)),R.text(f.format("%H:%M")(o)+"h");var s=[];for(e=0;e<y.length;e++)s[e]={id:y[e],data:t[y[e]]};var l=S.selectAll(".j-block").data(s,(function(t,e){return t.id}));l.enter().append("g").attr("id",(function(t,e){return"des_"+t.id})).attr("class","j-block").each((function(){var t=this,e=r.y(this);e.append("rect").attr("width",6).attr("height",10).style("cursor","pointer").attr("fill",(function(t){return"#".concat(v[t.id].color)})).on("click",(function(e){return c&&(c.toPeakChart.call(t,e),r.i.stopPropagation())})),e.append("text").text((function(t){return v[t.id].id})).attr("class","j-name").attr("x",30).attr("y",20).attr("text-anchor","start").style("font-size","13").style("cursor","pointer").style("fill","#B3B3B3").style("fill",(function(t){return"#".concat(v[t.id].highlightColor)})).attr("transform","rotate(-45)").on("click",(function(e){return c&&(c.toPeakChart.call(t,e),r.i.stopPropagation())})),e.append("text").text((function(t){return v[t.id].id})).attr("class","j-data").attr("x",30).attr("y",32).attr("text-anchor","start").style("font-size","12").style("cursor","pointer").style("fill","#B3B3B3").style("fill",(function(t){return"#".concat(v[t.id].highlightColor)})).attr("transform","rotate(-45)").on("click",(function(e){return c&&(c.toPeakChart.call(t,e),r.i.stopPropagation())})),e.append("path").style("fill","none").style("stroke-width","1").style("stroke",(function(t){return"#".concat(v[t.id].color)}))})).attr("transform",(function(t,e){return"translate(0,".concat(50*e,")")}));var u=0,p=0;l.each((function(t,e){a[e-1]<8&&p++,u=33*p,i=a[e]/100*300;r.y(this).transition().attr("transform","translate(0,".concat(n,")")).each((function(){var t=r.y(this);t.select("rect").transition().attr("height",i),t.select(".j-name").text((function(t){return v[t.id].name})).transition().attr("transform","translate(".concat(u,",0) rotate(-45 0 0)")),t.select(".j-data").text((function(t){return"".concat(t.data,"%")})).transition().attr("transform","translate(".concat(u,",0) rotate(-45 0 0)")),t.select("path").transition().attr("d","M6,1 H".concat(Math.floor(31+u)," l3,-3"))}));n+=i}))}N.on("mouseenter",(I=Z,J=125,function(){var t=this,e=arguments,a=function(){G=null,L||I.apply(t,e)},r=L&&!G;clearTimeout(G),G=setTimeout(a,J),r&&I.apply(t,e)})),$=e,r.m($).then((function(t){var e=t.map((function(t){var e=[];for(var a in t)y.indexOf(a)>=0&&e.push(t[a]);return t.combined=r.r(e),t}));e.reverse(),U.domain([0,e.length]),new Date;var a=m(e[e.length-1].ts),n=(j(60*a.getHours()+a.getMinutes()),360/e.length/1.05);l||N.call("mouseenter",this,e[e.length-1]);var o=b.select("#hostRads").selectAll(".rad").data(e,(function(t){return t.ts})),s=0;o.enter().append("g").attr("class","rad").attr("id",(function(t){var e=m(t.ts);return"id-".concat(e.getHours(),":").concat(e.getMinutes(),"-dia-").concat(e.getDate())})).on("mouseenter",(function(t){N.call("mouseenter",this,t);var e=m(t.ts),a=e.getHours(),n=e.getMinutes(),i=d(180-j(60*a+n)),o=q(t.combined),s=Math.sin(i),c=Math.cos(i);O.attr("cx",p+o*s).attr("cy",250+o*c).transition().duration(150).attr("fill",W(t.combined)),E.attr("transform","translate(".concat(p+o*s,",").concat(250+o*c,")")),X.text((function(){var e=m(t.ts);return g(e)})),z.text("Combined: ".concat(r.k(",")(t.combined),"%")),Y.attr("fill-opacity",1).transition().duration(150).attr("fill",W(t.combined)),k.attr("stroke-opacity",.9).transition().attr("r",q(t.combined)).attr("stroke",W(t.combined))})).each((function(t){r.y(this).selectAll("path").data(y).enter().append("path").on("mouseover",(function(){var t=r.y(this);t.attr("fill","#".concat(v[t.datum()].highlightColor))})).on("mouseout",(function(){var t=r.y(this);t.attr("fill","#".concat(v[t.datum()].color))})).attr("fill",(function(t,e){var a=r.y(this);return"#".concat(v[a.datum()].color)}))})).attr("opacity",0).attr("transform","translate(".concat(p,",").concat(250,")")).each((function(t,e){var a=r.y(this).selectAll("path"),i=h(y.map((function(e){return t[e]}))),o=0,s=0,c=0,l=r.b(),u=m(t.ts),p=u.getHours(),f=u.getMinutes(),g=j(60*p+f);a.each((function(){s=i[c]/100*q(t.combined),r.y(this).attr("d",l.startAngle((function(){return d(g)})).endAngle((function(){return d(g+n)})).outerRadius((function(){return s+o})).innerRadius((function(){return o}))),o+=s,c++}))})).transition().duration(500).delay((function(t,e){var a=Math.abs(e+1-s)*(0===t.combined?0:25);return 0===t.combined&&s++,a})).attr("opacity",(function(t,e){return U(e)})).attr("transform","translate(".concat(p,",").concat(250,")")),o.exit().remove(),(i=e[e.length-1])&&Z(i)})),this.destroy=function(){clearInterval(H)}}},427:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),i=a(6),o=a(0),s=a(5),c=a(9),l=a(28),u=a(204);function p(t,e,a){var r=Object(o.e)(!0,{minOpacity:.05,radiusX:45,radiusY:45,blurRadius:25},a),n=(new u.a).target(t).columns(["Day","Hour","weight"]).xAxisType("ordinal").yAxisType("time").yAxisTypeTimePattern("%H").yAxisTickFormat("%H %p").yAxisTitle("Hour").orientation("vertical").paletteID("default").radiusX(r.radiusX).radiusY(r.radiusY).blur(r.blurRadius).minOpacity(r.minOpacity);this.update=function(t){n.data(t).lazyRender()},this.update(e)}function d(t,e,a,r,n,i,o){try{var s=t[i](o),c=s.value}catch(t){return void a(t)}s.done?e(c):Promise.resolve(c).then(r,n)}function h(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?h(Object(a),!0).forEach((function(e){m(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function m(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var g={title:"Time Chart",components:{CaretIcon:c.a,CaretLeftIcon:c.b,Checkbox:s.a,DateRangeToggle:s.c,FilterDropdown:s.d,Modal:s.h,TimeSlider:s.i},data:function(){return{showPageOpts:!1,showEmbed:!1,showHeatMap:!1,timeGraph:null,heatMap:null,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:f(f({},Object(i.d)({user:function(t){return t.user.info},filter:function(t){return t.homepage.filter}})),{},{baseUrl:function(){return Object(o.g)()},settings:function(){return this.user.company?this.user.company.settings:null},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},rangeSelect:function(t,e,a){var r=this;console.log("rangeSelect",t,e,a),this.showHeatMap="today"!=t,setTimeout((function(){r.showHeatMap&&!r.heatMap?(r.renderHeatMap(),r.timeGraph=null):r.showHeatMap||r.timeGraph||(r.renderTimeChart(),r.heatMap=null)}),10)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toTreeSummary:function(){this.$router.push({name:"tree-summary",query:{df:this.filter.value}})},toLive:function(){this.$router.push({name:"occupancy"})},renderTimeChart:function(){var t=this;this.timeGraph=new l.a("#time-chart","".concat(this.baseUrl,"/data/time-chart-data.json"),{widget:!1,events:{toPeakChart:function(e){console.log("toPeakChart",e),t.$router.push({name:"peak"})}}})},renderHeatMap:function(){var t,e=this;return(t=n.a.mark((function t(){var a,r;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios.get("/data/heatmap-data.json");case 2:a=t.sent,r=a.data,e.heatMap=new p("heat-map",r,{radiusX:60,radiusY:60});case 5:case"end":return t.stop()}}),t)})),function(){var e=this,a=arguments;return new Promise((function(r,n){var i=t.apply(e,a);function o(t){d(i,r,n,o,s,"next",t)}function s(t){d(i,r,n,o,s,"throw",t)}o(void 0)}))})()}},mounted:function(){this.renderTimeChart()},destroyed:function(){this.timeGraph.destroy()}},y=(a(252),a(254),a(4)),v=Object(y.a)(g,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"graph-wrapper"},[a("div",{staticClass:"graph-header"},[a("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),a("div",{staticClass:"graph-filters"},[a("span",{staticClass:"graph-filter"},[t._v("\n                    Filter By\n                    "),a("span",{staticClass:"caret"},[a("caret-icon")],1)]),t._v(" "),a("span",{staticClass:"graph-filter"},[t._v("\n                    Select Location\n                    "),a("span",{staticClass:"caret"},[a("caret-icon")],1)]),t._v(" "),a("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toTreeSummary}},[t._v(t._s(t.filter.btnLabel))])]),t._v(" "),a("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"})]),t._v(" "),a("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?a("div",{staticClass:"page-opt-panel"},[a("ul",[a("li",[a("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),a("div",{staticClass:"graph-content"},[a("div",{staticClass:"page-back"},[a("div",{staticClass:"back-button",on:{click:t.backTo}},[a("button",{staticClass:"btn btn-primary btn-small"},[a("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),t.showHeatMap?a("div",{key:"heatmap",attrs:{id:"heat-map"}}):a("div",{key:"timechart",attrs:{id:"time-chart"}}),t._v(" "),a("div",{staticClass:"bottom-filters"},[a("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),a("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),a("span",{staticClass:"caret"},[a("caret-icon")],1),t._v(" "),a("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)]),t._v(" "),a("div",{staticClass:"graph-footer"},[a("div",{staticClass:"left-options"},[a("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),a("div",{staticClass:"right-options"},[a("checkbox",{attrs:{label:"Save to report"}})],1)])])])}),[],!1,null,"9de2e99a",null);e.default=v.exports}}]);