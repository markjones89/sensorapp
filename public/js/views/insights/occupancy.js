(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{18:function(t,n,r){var e=r(91);"string"==typeof e&&(e=[[t.i,e,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(8)(e,a);e.locals&&(t.exports=e.locals)},209:function(t,n,r){"use strict";r.r(n);var e=r(1),a=r.n(e),i=r(4),o=r(2),s=r(6);r(33);function c(t,n,r,e,a,i,o){try{var s=t[i](o),c=s.value}catch(t){return void r(t)}s.done?n(c):Promise.resolve(c).then(e,a)}function l(t){return function(){var n=this,r=arguments;return new Promise((function(e,a){var i=t.apply(n,r);function o(t){c(i,e,a,o,s,"next",t)}function s(t){c(i,e,a,o,s,"throw",t)}o(void 0)}))}}var d="/api/locations",u="/api/floors";function f(){return(f=l(a.a.mark((function t(n,r){var e,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios.get(d,{params:{cid:n,lob:!0}});case 2:e=t.sent,i=e.data,r(i);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var p={props:["bldg_id"],components:{BuildingSvg:o.a,CaretIcon:s.a,CaretLeftIcon:s.b,FilterDropdown:o.e},beforeRouteEnter:function(t,n,r){!function(t,n){f.apply(this,arguments)}(i.a.getUserCompany().hid,(function(t){r((function(n){return n.setBuildings(t)}))}))},data:function(){return{buildings:[],building:null,bldgFilter:null,loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,floors:[],floorsReverse:[]}},computed:{buildingFilters:function(){return this.buildings.map((function(t){return{value:t.hid,label:t.name}}))}},methods:{backTo:function(){this.$router.back()},setBuildings:function(t){var n=this;this.buildings=t,this.bldg_id?this.building=t.find((function(t){return t.hid===n.bldg_id})):this.building=t[0],this.bldgFilter=this.building.name,this.getFloors(this.building.hid,(function(){n.loaded=!0}))},getFloors:function(t,n){var r=this;return l(a.a.mark((function e(){var i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(u,{params:{bid:t}});case 2:return i=e.sent,(o=i.data).forEach((function(t){t.occupancy_live=Math.floor(Math.random()*t.occupancy_limit+1)})),r.floors=o.sort((function(t,n){return t.floor_no>n.floor_no?1:t.floor_no<n.floor_no?-1:0})),r.floorsReverse=o.sort((function(t,n){return t.floor_no>n.floor_no?-1:t.floor_no<n.floor_no?1:0})),e.abrupt("return",n&&n());case 8:case"end":return e.stop()}}),e)})))()},getLiveColor:function(t,n){var r=t/n*100;return{green:r<50,yellow:r>=50,orange:r>=90}},filterSelect:function(t){this.showFilter=!1,this.building=this.buildings.find((function(n){return n.hid===t})),this.bldgFilter=this.building.name,this.getFloors(this.building.hid)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},mounted:function(){}},h=(r(90),r(3)),g=Object(h.a)(p,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return t.loaded&&t.building?r("div",{staticClass:"content"},[r("div",{staticClass:"graph-header"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),r("div",{staticClass:"graph-filters"},[r("span",{staticClass:"graph-filter",on:{click:function(n){t.showFilter=!t.showFilter}}},[t._v("\n                "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1)]),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(n){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(n){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"chart-header"},[r("span",{staticClass:"chart-title"},[t._v(t._s(t.building.name)+" Occupancy")])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col svg-wrapper"},[r("building-svg",{attrs:{floors:t.floors}})],1),t._v(" "),r("div",{staticClass:"col info-wrapper"},[r("table",[t._m(0),t._v(" "),r("tbody",t._l(t.floorsReverse,(function(n){return r("tr",{key:n.hid,staticClass:"floor-info"},[r("td",[t._v(t._s(n.ordinal_no+" Floor"))]),t._v(" "),r("td",[r("span",{staticClass:"occ-badge",class:t.getLiveColor(n.occupancy_live,n.occupancy_limit)},[t._v(t._s(n.occupancy_live))])]),t._v(" "),r("td",[r("span",{staticClass:"occ-badge orange"},[t._v(t._s(n.occupancy_limit))])])])})),0)])])])])]):t._e()}),[function(){var t=this.$createElement,n=this._self._c||t;return n("thead",[n("tr",{staticClass:"info-header"},[n("th",{attrs:{width:"100"}}),this._v(" "),n("th",{attrs:{width:"80"}},[this._v("Live")]),this._v(" "),n("th",{attrs:{width:"80"}},[this._v("Limit")])])])}],!1,null,"0490b9b5",null);n.default=g.exports},33:function(t,n,r){"use strict";r.d(n,"a",(function(){return a}));var e=r(0);function a(t,n){var r=e.t(t),a=e.h(n),i=10,o=10,s=40,c=e.v().nodeSize([15,150]),l=e.l().x((function(t){return t.y})).y((function(t){return t.x})),d=r.append("svg").attr("viewBox",[-s,-i,900,15]).style("font-size","12px").style("user-select","none"),u=d.append("g").attr("fill","none").attr("stroke","#3DCFA3").attr("stroke-opacity",.4).attr("stroke-width",1.5),f=d.append("g").attr("cursor","pointer").attr("pointer-events","all");return a.x0=75,a.y0=0,a.descendants().forEach((function(t,n){t.id=n,t._children=t.children,t.depth&&7!==t.data.name.length&&(t.children=null)})),function t(n){var r=e.f&&e.f.altKey?2500:250,p=a.descendants().reverse(),h=a.links();c(a);var g=a,v=a;a.eachBefore((function(t){t.x<g.x&&(g=t),t.x>v.x&&(v=t)}));var b=v.x-g.x+i+o,_=d.transition().duration(r).attr("viewBox",[-s,g.x-i,900,b]).tween("resize",window.ResizeObserver?null:function(){return function(){return d.dispatch("toggle")}}),w=f.selectAll("g").data(p,(function(t){return t.id})),x=w.enter().append("g").attr("data-id",(function(t){return t.id})).attr("transform",(function(t){return"translate(".concat(n.y0,",").concat(n.x0,")")})).attr("fill-opacity",0).attr("stroke-opacity",0).on("click",(function(n){n.children=n.children?null:n._children,t(n)}));x.append("circle").attr("r",2.5).attr("fill",(function(t){return t._children,"#3DCFA3"})).attr("stroke-width",10),x.append("text").attr("dy","0.31em").attr("x",(function(t){return t._children?-6:6})).attr("text-anchor",(function(t){return t._children?"end":"start"})).attr("fill","#fff").text((function(t){return t.data.name})).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","#2B2B2B"),w.merge(x).transition(_).attr("transform",(function(t){return"translate(".concat(t.y,",").concat(t.x,")")})).attr("fill-opacity",1).attr("stroke-opacity",1),w.exit().transition(_).remove().attr("transform",(function(t){return"translate(".concat(n.y,",").concat(n.x,")")})).attr("fill-opacity",0).attr("stroke-opacity",0);var m=u.selectAll("path").data(h,(function(t){return t.target.id})),y=m.enter().append("path").attr("d",(function(t){var r={x:n.x0,y:n.y0};return l([r,r])}));m.merge(y).transition(_).attr("d",(function(t){var n=t.target._children&&t.target._children.length>0,r=f.select('[data-id="'.concat(t.target.id,'"]')).node().getBBox(),e={x:t.target.x,y:t.target.y-r.width};return l(n?[t.source,e]:[t.source,t.target])})),m.exit().transition(_).remove().attr("d",(function(t){var r={x:n.x,y:n.y};return l([r,r])})),a.eachBefore((function(t){t.x0=t.x,t.y0=t.y}))}(a),d.node()}},90:function(t,n,r){"use strict";var e=r(18);r.n(e).a},91:function(t,n,r){(t.exports=r(7)(!1)).push([t.i,".svg-wrapper[data-v-0490b9b5] {\n  text-align: right;\n}\n.svg-wrapper .building-svg[data-v-0490b9b5] {\n  padding: 0 36px;\n}\n.info-wrapper[data-v-0490b9b5] {\n  padding: 150px 36px 0;\n}\n.info-wrapper table[data-v-0490b9b5] {\n  border-collapse: collapse;\n}\n.info-wrapper .info-header th[data-v-0490b9b5] {\n  font-weight: normal;\n}\n.info-wrapper .floor-info[data-v-0490b9b5] {\n  line-height: 26px;\n  border-bottom: 1px solid rgba(255, 255, 225, 0.1);\n}\n.info-wrapper .floor-info[data-v-0490b9b5]:last-child {\n  border-bottom: none;\n}\n.info-wrapper .floor-info td[data-v-0490b9b5] {\n  padding: 10px 0;\n}\n.info-wrapper .floor-info td[data-v-0490b9b5]:first-child {\n  text-align: left;\n}\n.info-wrapper .floor-info .occ-badge[data-v-0490b9b5] {\n  display: inline-block;\n  padding: 0 16px;\n  border-radius: 4px;\n}\n.info-wrapper .floor-info .occ-badge.green[data-v-0490b9b5] {\n  background-color: #3DCFA3;\n}\n.info-wrapper .floor-info .occ-badge.yellow[data-v-0490b9b5] {\n  background-color: #F0A718;\n}\n.info-wrapper .floor-info .occ-badge.orange[data-v-0490b9b5] {\n  background-color: #FF5A09;\n}",""])}}]);