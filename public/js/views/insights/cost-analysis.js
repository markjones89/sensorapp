(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{240:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(5),o=n(4),s=n(6),c=n(2),l=n(1);function u(t,e){var n=l.y(t),r=l.l(e),a=10,i=10,o=40,s=l.B().nodeSize([16,150]),c=l.o().x((function(t){return t.y})).y((function(t){return t.x})),u=n.append("svg").attr("viewBox",[-o,-a,900,16]).style("font-size","12px").style("user-select","none"),d=u.append("g").attr("fill","none").attr("stroke","#3DCFA3").attr("stroke-opacity",.4).attr("stroke-width",1.5),f=u.append("g").attr("cursor","pointer").attr("pointer-events","all");return r.x0=75,r.y0=0,r.descendants().forEach((function(t,e){t.id=e,t._children=t.children,t.depth&&7!==t.data.name.length&&(t.children=null)})),function t(e){var n=l.i&&l.i.altKey?2500:250,p=r.descendants().reverse(),h=r.links();s(r);var g=r,v=r;r.eachBefore((function(t){t.x<g.x&&(g=t),t.x>v.x&&(v=t)}));var m=v.x-g.x+a+i,b=u.transition().duration(n).attr("viewBox",[-o,g.x-a,900,m]).tween("resize",window.ResizeObserver?null:function(){return function(){return u.dispatch("toggle")}}),y=f.selectAll("g").data(p,(function(t){return t.id})),w=y.enter().append("g").attr("data-id",(function(t){return t.id})).attr("transform",(function(t){return"translate(".concat(e.y0,",").concat(e.x0,")")})).attr("fill-opacity",0).attr("stroke-opacity",0).on("click",(function(e){e.children=e.children?null:e._children,t(e)}));w.append("circle").attr("r",2.5).attr("fill",(function(t){return t._children,"#3DCFA3"})).attr("stroke-width",10),w.append("text").attr("dy","0.31em").attr("x",(function(t){return t._children?-6:6})).attr("text-anchor",(function(t){return t._children?"end":"start"})).attr("fill","#fff").text((function(t){return t.data.name})).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","#2B2B2B"),y.merge(w).transition(b).attr("transform",(function(t){return"translate(".concat(t.y,",").concat(t.x,")")})).attr("fill-opacity",1).attr("stroke-opacity",1),y.exit().transition(b).remove().attr("transform",(function(t){return"translate(".concat(e.y,",").concat(e.x,")")})).attr("fill-opacity",0).attr("stroke-opacity",0);var x=d.selectAll("path").data(h,(function(t){return t.target.id})),C=x.enter().append("path").attr("d",(function(t){var n={x:e.x0,y:e.y0};return c({source:n,target:n})}));x.merge(C).transition(b).attr("d",(function(t){var e=t.target._children&&t.target._children.length>0,n=f.select('[data-id="'.concat(t.target.id,'"]')).node().getBBox(),r={x:t.target.x,y:t.target.y-n.width};return c(e?{source:t.source,target:r}:{source:t.source,target:t.target})})),x.exit().transition(b).remove().attr("d",(function(t){var n={x:e.x,y:e.y};return c({source:n,target:n})})),r.eachBefore((function(t){t.x0=t.x,t.y0=t.y}))}(r),u.node()}function d(t,e,n,r,a,i,o){try{var s=t[i](o),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,a)}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g={title:"Cost Analysis",components:{CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:c.a,DateRangeToggle:c.c,FilterDropdown:c.d,TimeSlider:c.h},data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:p(p({},Object(i.d)({user:function(t){return t.user}})),{},{settings:function(){return this.user.company?this.user.company.settings:null},baseUrl:function(){return Object(o.c)()},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},rangeSelect:function(t,e,n){console.log("rangeSelect",t,e,n)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},renderTree:function(){var t,e=this;return(t=a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:fetch("".concat(e.baseUrl,"/data/flare-2.json")).then((function(t){return t.json()})).then((function(t){e.loaded=!0,u("#cost-tree",t)}));case 1:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var i=t.apply(e,n);function o(t){d(i,r,a,o,s,"next",t)}function s(t){d(i,r,a,o,s,"throw",t)}o(void 0)}))})()},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label}},mounted:function(){this.renderTree()}},v=(n(85),n(3)),m=Object(v.a)(g,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"graph-header"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[t._m(0),t._v(" "),n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),n("div",{attrs:{id:"cost-tree"}}),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)],1),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"}),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chart-header"},[e("span",{staticClass:"chart-title"},[this._v("Cost Analysis")])])}],!1,null,"de2678d0",null);e.default=m.exports},32:function(t,e,n){var r=n(86);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(8)(r,a);r.locals&&(t.exports=r.locals)},85:function(t,e,n){"use strict";n(32)},86:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,"#cost-tree[data-v-de2678d0]{margin:24px auto;max-width:100%;width:1024px}",""])}}]);