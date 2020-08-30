(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{20:function(t,n,r){var e=r(96);"string"==typeof e&&(e=[[t.i,e,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(8)(e,o);e.locals&&(t.exports=e.locals)},213:function(t,n,r){"use strict";r.r(n);var e=r(1),o=r.n(e),a=r(4),i=r(2),c=r(12),s=r(6);r(38);function l(t,n,r,e,o,a,i){try{var c=t[a](i),s=c.value}catch(t){return void r(t)}c.done?n(s):Promise.resolve(s).then(e,o)}function d(t){return function(){var n=this,r=arguments;return new Promise((function(e,o){var a=t.apply(n,r);function i(t){l(a,e,o,i,c,"next",t)}function c(t){l(a,e,o,i,c,"throw",t)}i(void 0)}))}}var u="/api/locations",f="/api/floors",p={props:["bldg_id"],components:{BuildingSvg:c.a,CaretIcon:s.a,CaretLeftIcon:s.b,FilterDropdown:i.d,Loader:i.e},data:function(){return{buildings:[],building:null,bldgFilter:null,loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,floors:[],floorsReverse:[]}},computed:{buildingFilters:function(){return this.buildings.map((function(t){return{value:t.hid,label:t.name}}))}},methods:{backTo:function(){this.$router.back()},getBuildings:function(){var t=this;return d(o.a.mark((function n(){var r,e,i;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=a.a.getUserCompany()){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,axios.get(u,{params:{cid:r.hid,lob:!0}});case 5:e=n.sent,i=e.data,t.buildings=i,t.bldg_id?t.building=i.find((function(n){return n.hid===t.bldg_id})):t.building=i[0],t.bldgFilter=t.building.name,t.getFloors(t.building.hid,(function(){t.loaded=!0}));case 11:case"end":return n.stop()}}),n)})))()},getFloors:function(t,n){var r=this;return d(o.a.mark((function e(){var a,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(f,{params:{bid:t}});case 2:return a=e.sent,(i=a.data).forEach((function(t){t.occupancy_live=Math.floor(Math.random()*t.occupancy_limit+1)})),r.floors=i.sort((function(t,n){return t.floor_no>n.floor_no?1:t.floor_no<n.floor_no?-1:0})),r.floorsReverse=i.sort((function(t,n){return t.floor_no>n.floor_no?-1:t.floor_no<n.floor_no?1:0})),e.abrupt("return",n&&n());case 8:case"end":return e.stop()}}),e)})))()},getLiveColor:function(t,n){var r=t/n*100;return{green:r<50,yellow:r>=50,orange:r>=90}},filterSelect:function(t){this.showFilter=!1,this.building=this.buildings.find((function(n){return n.hid===t})),this.bldgFilter=this.building.name,this.getFloors(this.building.hid)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},floorClick:function(t){this.toLive(t.hid)},toLive:function(t){this.$router.push({name:"live",query:{bid:this.building.hid,fid:t}})}},mounted:function(){this.getBuildings()}},g=(r(95),r(3)),v=Object(g.a)(p,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"content"},[t.loaded&&t.building?[r("div",{staticClass:"graph-header"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),r("div",{staticClass:"graph-filters"},[r("span",{staticClass:"graph-filter",on:{click:function(n){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                    "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1)]),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(n){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(n){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"chart-header"},[r("span",{staticClass:"chart-title"},[t._v(t._s(t.building.name)+" Occupancy")])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col svg-wrapper"},[r("building-svg",{attrs:{floors:t.floors,clickableFloor:!0},on:{floorClick:t.floorClick}})],1),t._v(" "),r("div",{staticClass:"col info-wrapper"},[r("table",[t._m(0),t._v(" "),r("tbody",t._l(t.floorsReverse,(function(n){return r("tr",{key:n.hid,staticClass:"floor-info"},[r("td",[t._v(t._s(n.ordinal_no+" Floor"))]),t._v(" "),r("td",[r("span",{staticClass:"occ-badge live-badge",class:t.getLiveColor(n.occupancy_live,n.occupancy_limit),on:{click:function(r){return t.toLive(n.hid)}}},[t._v(t._s(n.occupancy_live))])]),t._v(" "),r("td",[r("span",{staticClass:"occ-badge limit-badge orange"},[t._v(t._s(n.occupancy_limit))])])])})),0)])])])])]:t._e(),t._v(" "),r("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[function(){var t=this.$createElement,n=this._self._c||t;return n("thead",[n("tr",{staticClass:"info-header"},[n("th",{attrs:{width:"100"}}),this._v(" "),n("th",{attrs:{width:"80"}},[this._v("Live")]),this._v(" "),n("th",{attrs:{width:"80"}},[this._v("Limit")])])])}],!1,null,"b81c8e36",null);n.default=v.exports},38:function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var e=r(0);function o(t,n){var r=e.w(t),o=e.k(n),a=10,i=10,c=40,s=e.y().nodeSize([16,150]),l=e.o().x((function(t){return t.y})).y((function(t){return t.x})),d=r.append("svg").attr("viewBox",[-c,-a,900,16]).style("font-size","12px").style("user-select","none"),u=d.append("g").attr("fill","none").attr("stroke","#3DCFA3").attr("stroke-opacity",.4).attr("stroke-width",1.5),f=d.append("g").attr("cursor","pointer").attr("pointer-events","all");return o.x0=75,o.y0=0,o.descendants().forEach((function(t,n){t.id=n,t._children=t.children,t.depth&&7!==t.data.name.length&&(t.children=null)})),function t(n){var r=e.h&&e.h.altKey?2500:250,p=o.descendants().reverse(),g=o.links();s(o);var v=o,h=o;o.eachBefore((function(t){t.x<v.x&&(v=t),t.x>h.x&&(h=t)}));var b=h.x-v.x+a+i,w=d.transition().duration(r).attr("viewBox",[-c,v.x-a,900,b]).tween("resize",window.ResizeObserver?null:function(){return function(){return d.dispatch("toggle")}}),_=f.selectAll("g").data(p,(function(t){return t.id})),x=_.enter().append("g").attr("data-id",(function(t){return t.id})).attr("transform",(function(t){return"translate(".concat(n.y0,",").concat(n.x0,")")})).attr("fill-opacity",0).attr("stroke-opacity",0).on("click",(function(n){n.children=n.children?null:n._children,t(n)}));x.append("circle").attr("r",2.5).attr("fill",(function(t){return t._children,"#3DCFA3"})).attr("stroke-width",10),x.append("text").attr("dy","0.31em").attr("x",(function(t){return t._children?-6:6})).attr("text-anchor",(function(t){return t._children?"end":"start"})).attr("fill","#fff").text((function(t){return t.data.name})).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","#2B2B2B"),_.merge(x).transition(w).attr("transform",(function(t){return"translate(".concat(t.y,",").concat(t.x,")")})).attr("fill-opacity",1).attr("stroke-opacity",1),_.exit().transition(w).remove().attr("transform",(function(t){return"translate(".concat(n.y,",").concat(n.x,")")})).attr("fill-opacity",0).attr("stroke-opacity",0);var m=u.selectAll("path").data(g,(function(t){return t.target.id})),y=m.enter().append("path").attr("d",(function(t){var r={x:n.x0,y:n.y0};return l({source:r,target:r})}));m.merge(y).transition(w).attr("d",(function(t){var n=t.target._children&&t.target._children.length>0,r=f.select('[data-id="'.concat(t.target.id,'"]')).node().getBBox(),e={x:t.target.x,y:t.target.y-r.width};return l(n?{source:t.source,target:e}:{source:t.source,target:t.target})})),m.exit().transition(w).remove().attr("d",(function(t){var r={x:n.x,y:n.y};return l({source:r,target:r})})),o.eachBefore((function(t){t.x0=t.x,t.y0=t.y}))}(o),d.node()}},95:function(t,n,r){"use strict";var e=r(20);r.n(e).a},96:function(t,n,r){(t.exports=r(7)(!1)).push([t.i,".svg-wrapper[data-v-b81c8e36] {\n  text-align: right;\n}\n.svg-wrapper .building-svg[data-v-b81c8e36] {\n  padding: 0 36px;\n}\n.info-wrapper[data-v-b81c8e36] {\n  padding: 150px 36px 0;\n}\n.info-wrapper table[data-v-b81c8e36] {\n  border-collapse: collapse;\n}\n.info-wrapper .info-header th[data-v-b81c8e36] {\n  font-weight: normal;\n}\n.info-wrapper .floor-info[data-v-b81c8e36] {\n  line-height: 26px;\n  border-bottom: 1px solid rgba(255, 255, 225, 0.1);\n}\n.info-wrapper .floor-info[data-v-b81c8e36]:last-child {\n  border-bottom: none;\n}\n.info-wrapper .floor-info td[data-v-b81c8e36] {\n  padding: 10px 0;\n}\n.info-wrapper .floor-info td[data-v-b81c8e36]:first-child {\n  text-align: left;\n}\n.info-wrapper .floor-info .occ-badge[data-v-b81c8e36] {\n  display: inline-block;\n  padding: 0 16px;\n  border-radius: 4px;\n}\n.info-wrapper .floor-info .occ-badge.live-badge[data-v-b81c8e36] {\n  cursor: pointer;\n  transition: background-color 0.24s;\n}\n.info-wrapper .floor-info .occ-badge.green[data-v-b81c8e36] {\n  background-color: #3DCFA3;\n}\n.info-wrapper .floor-info .occ-badge.green[data-v-b81c8e36]:hover {\n  background-color: #2bae87;\n}\n.info-wrapper .floor-info .occ-badge.yellow[data-v-b81c8e36] {\n  background-color: #F0A718;\n}\n.info-wrapper .floor-info .occ-badge.yellow[data-v-b81c8e36]:hover {\n  background-color: #c8890d;\n}\n.info-wrapper .floor-info .occ-badge.orange[data-v-b81c8e36] {\n  background-color: #FF5A09;\n}\n.info-wrapper .floor-info .occ-badge.orange[data-v-b81c8e36]:hover {\n  background-color: #d54600;\n}",""])}}]);