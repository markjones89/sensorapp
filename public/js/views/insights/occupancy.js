(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{107:function(t,e,r){"use strict";r(45)},108:function(t,e,r){(t.exports=r(7)(!1)).push([t.i,".svg-wrapper[data-v-26f682ad]{text-align:right}.svg-wrapper .building-svg[data-v-26f682ad]{padding:0 36px}.info-wrapper[data-v-26f682ad]{padding:150px 36px 0}.info-wrapper table[data-v-26f682ad]{border-collapse:collapse}.info-wrapper .info-header th[data-v-26f682ad]{font-weight:400}.info-wrapper .floor-info[data-v-26f682ad]{line-height:26px;border-bottom:1px solid rgba(255,255,225,.1)}.info-wrapper .floor-info[data-v-26f682ad]:last-child{border-bottom:none}.info-wrapper .floor-info td[data-v-26f682ad]{padding:10px 0}.info-wrapper .floor-info td[data-v-26f682ad]:first-child{text-align:left}.info-wrapper .floor-info .occ-badge[data-v-26f682ad]{display:inline-block;padding:0 16px;border-radius:4px}.info-wrapper .floor-info .occ-badge.live-badge[data-v-26f682ad]{cursor:pointer;transition:background-color .24s}.info-wrapper .floor-info .occ-badge.green[data-v-26f682ad]{background-color:#01fe01}.info-wrapper .floor-info .occ-badge.green[data-v-26f682ad]:hover{background-color:#01cb01}.info-wrapper .floor-info .occ-badge.yellow[data-v-26f682ad]{background-color:#ff8600}.info-wrapper .floor-info .occ-badge.yellow[data-v-26f682ad]:hover{background-color:#cc6b00}.info-wrapper .floor-info .occ-badge.orange[data-v-26f682ad]{background-color:#ed0003}.info-wrapper .floor-info .occ-badge.orange[data-v-26f682ad]:hover{background-color:#ba0002}",""])},255:function(t,e,r){"use strict";r.r(e);var i=r(0),o=r.n(i),a=r(2),n=r(16),s=r(6),c=r(5),l=r(4);function d(t,e,r,i,o,a,n){try{var s=t[a](n),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(i,o)}function u(t){return function(){var e=this,r=arguments;return new Promise((function(i,o){var a=t.apply(e,r);function n(t){d(a,i,o,n,s,"next",t)}function s(t){d(a,i,o,n,s,"throw",t)}n(void 0)}))}}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){b(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function b(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var g="/api/floors",v={props:["bldg_id"],components:{BuildingSvg:n.a,CaretIcon:s.a,CaretLeftIcon:s.b,FilterDropdown:a.d,Loader:a.e},data:function(){return{buildings:[],building:null,bldgFilter:null,loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,floors:[],floorsReverse:[]}},computed:p(p(p({},Object(c.d)({user:function(t){return t.user}})),Object(c.b)({api_header:"backend/api_header",api_customers:"backend/api_customers",api_buildings:"backend/api_buildings",api_floors:"backend/api_floors"})),{},{buildingFilters:function(){return this.buildings.map((function(t){return{value:t.id,label:t.name}}))}}),methods:{backTo:function(){this.$router.back()},getBuildings:function(){var t=this;return u(o.a.mark((function e(){var r,i,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.user.company_id,e.next=3,axios.get(t.api_buildings(r),t.api_header());case 3:return i=e.sent,a=i.data,t.buildings=a,t.bldg_id?t.building=a.find((function(e){return e.id===t.bldg_id})):t.building=a[0],t.bldgFilter=t.building.name,e.next=10,t.getFloors(t.building.id);case 10:t.loaded=!0;case 11:case"end":return e.stop()}}),e)})))()},getFloors:function(t){var e=this;return u(o.a.mark((function r(){var i,a,n,s;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return i=e.user.company_id,r.next=3,axios.all([axios.get(g,{params:{bid:t}}),axios.get(e.api_floors(i,t),e.api_header())]);case 3:a=r.sent,n=a[0].data,(s=a[1].data).forEach((function(t){var e=n.find((function(e){return e.ref_id==t.id}));t.ordinal_no=Object(l.h)(t.number),t.occupancy_limit=(null==e?void 0:e.occupancy_limit)||Math.floor(25*Math.random()+1),t.occupancy_live=Math.floor(Math.random()*t.occupancy_limit+1)})),e.floors=s.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),e.floorsReverse=s.sort((function(t,e){return t.number>e.number?-1:t.number<e.number?1:0}));case 8:case"end":return r.stop()}}),r)})))()},getLiveColor:function(t,e){var r=t/e*100;return{green:r<50,yellow:r>=50,orange:r>=90}},filterSelect:function(t){this.showFilter=!1,this.building=this.buildings.find((function(e){return e.id===t})),this.bldgFilter=this.building.name,this.getFloors(this.building.id)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},floorClick:function(t){this.toLive(t.id)},toLive:function(t){this.$router.push({name:"live",query:{bid:this.building.id,fid:t}})}},mounted:function(){this.getBuildings()}},h=(r(107),r(3)),_=Object(h.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[t.loaded&&t.building?[r("div",{staticClass:"graph-header"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),r("div",{staticClass:"graph-filters"},[r("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                    "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1)]),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"chart-header"},[r("span",{staticClass:"chart-title"},[t._v(t._s(t.building.name)+" Occupancy")])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col svg-wrapper"},[r("building-svg",{attrs:{floors:t.floors,clickableFloor:!0},on:{floorClick:t.floorClick}})],1),t._v(" "),r("div",{staticClass:"col info-wrapper"},[r("table",[t._m(0),t._v(" "),r("tbody",t._l(t.floorsReverse,(function(e){return r("tr",{key:e.id,staticClass:"floor-info"},[r("td",[t._v(t._s(e.ordinal_no+" Floor"))]),t._v(" "),r("td",[r("span",{staticClass:"occ-badge live-badge",class:t.getLiveColor(e.occupancy_live,e.occupancy_limit),on:{click:function(r){return t.toLive(e.id)}}},[t._v(t._s(e.occupancy_live))])]),t._v(" "),r("td",[r("span",{staticClass:"occ-badge limit-badge orange"},[t._v(t._s(e.occupancy_limit))])])])})),0)])])])])]:t._e(),t._v(" "),r("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",{staticClass:"info-header"},[e("th",{attrs:{width:"100"}}),this._v(" "),e("th",{attrs:{width:"80"}},[this._v("Live")]),this._v(" "),e("th",{attrs:{width:"80"}},[this._v("Limit")])])])}],!1,null,"26f682ad",null);e.default=_.exports},45:function(t,e,r){var i=r(108);"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(8)(i,o);i.locals&&(t.exports=i.locals)}}]);