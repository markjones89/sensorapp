(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{110:function(t,e,n){"use strict";n(46)},111:function(t,e,n){(t.exports=n(7)(!1)).push([t.i,"#wfh-content[data-v-43b69a38]{position:relative}#wfh-content .stat[data-v-43b69a38]{position:absolute;font-weight:700;font-size:16px;text-align:center;min-width:48px;line-height:48px;border-radius:50%;bottom:16px;background-color:#ff5a09}#wfh-content #house-wrapper[data-v-43b69a38]{position:relative;display:inline-block;padding:0 0 32px}#wfh-content #house-wrapper .house-svg[data-v-43b69a38]{transform-origin:bottom;transition:transform .4s}#wfh-content #house-wrapper .stat[data-v-43b69a38]{margin-left:90px}#wfh-content #building-wrapper[data-v-43b69a38]{position:relative;display:inline-block;padding:0 0 32px}#wfh-content #building-wrapper .building-svg[data-v-43b69a38]{transform-origin:bottom;transition:transform .4s}#wfh-content #building-wrapper .stat[data-v-43b69a38]{margin-left:120px}",""])},259:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),r=n(5),s=n(6),o=n(2),l=n(16);function c(t,e,n,i,a,r,s){try{var o=t[r](s),l=o.value}catch(t){return void n(t)}o.done?e(l):Promise.resolve(l).then(i,a)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var r=t.apply(e,n);function s(t){c(r,i,a,s,o,"next",t)}function o(t){c(r,i,a,s,o,"throw",t)}s(void 0)}))}}function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function g(){return Math.floor(100*Math.random()+1)}var b={title:"Work From Home",components:{BuildingSvg:l.a,CaretIcon:s.a,CaretLeftIcon:s.b,Checkbox:o.a,DateRangeToggle:o.c,FilterDropdown:o.d,HouseSvg:l.b,Loader:o.f,TimeSlider:o.i},data:function(){return{loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,buildings:[],floors:[],building:null,bldgFilter:null,wfhStat:0,bldgStat:0,timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:p(p(p({},Object(r.e)({user:function(t){return t.user}})),Object(r.c)({api_header:"backend/api_header",api_customers:"backend/api_customers",api_buildings:"backend/api_buildings",api_floors:"backend/api_floors"})),{},{settings:function(){return this.user.company?this.user.company.settings:null},buildingFilters:function(){return this.buildings.map((function(t){return{value:t.id,label:t.name}}))},homeScale:function(){return(this.wfhStat<25?25:this.wfhStat)/100},bldgScale:function(){return(this.bldgStat<25?25:this.bldgStat)/100},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},getBuildings:function(){var t=this;return u(a.a.mark((function e(){var n,i,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.user.company_id,e.next=3,axios.get(t.api_buildings(n),t.api_header());case 3:return i=e.sent,r=i.data,t.buildings=r,t.bldg_id?t.building=r.find((function(e){return e.id===t.bldg_id})):t.building=r[0],t.bldgFilter=t.building.name,e.next=10,t.getFloors(t.building.id);case 10:t.loaded=!0,t.wfhStat=g(),t.bldgStat=100-t.wfhStat;case 13:case"end":return e.stop()}}),e)})))()},getFloors:function(t){var e=this;return u(a.a.mark((function n(){var i,r,s,o;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=e.user.company_id,n.next=3,axios.get(e.api_floors(i,t),e.api_header());case 3:r=n.sent,s=r.data,o=s.sort((function(t,e){return t.number>e.number?1:t.number<e.number?-1:0})),e.floors=o.slice(0);case 7:case"end":return n.stop()}}),n)})))()},filterSelect:function(t,e){var n=this;return u(a.a.mark((function i(){return a.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return n.showFilter=!1,n.building=n.buildings.find((function(e){return e.id===t})),n.bldgFilter=e,i.next=5,n.getFloors(n.building.id);case 5:n.wfhStat=g(),n.bldgStat=100-n.wfhStat;case 7:case"end":return i.stop()}}),i)})))()},toCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},rangeSelect:function(t,e,n){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},mounted:function(){this.getBuildings()}},h=(n(110),n(4)),v=Object(h.a)(b,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t.loaded&&t.building?[n("div",{staticClass:"graph-header"},[n("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),n("div",{staticClass:"graph-filters"},[n("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                    "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                    Back\n                ")])]),t._v(" "),n("div",{staticClass:"chart-header"},[n("span",{staticClass:"chart-title"},[t._v(t._s("Work From Home - "+t.building.name))])]),t._v(" "),n("div",{attrs:{id:"wfh-content"}},[n("div",{attrs:{id:"house-wrapper"}},[n("house-svg",{style:{transform:"scale("+t.homeScale+")"}}),t._v(" "),n("span",{staticClass:"stat"},[t._v(t._s(t.wfhStat+"%"))])],1),t._v(" "),n("div",{attrs:{id:"building-wrapper"}},[n("building-svg",{style:{transform:"scale("+t.bldgScale+")"},attrs:{floors:t.floors}}),t._v(" "),n("span",{staticClass:"stat"},[t._v(t._s(t.bldgStat+"%"))])],1)]),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                    "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                    "),n("span",{staticClass:"caret"},[n("caret-icon")],1),t._v(" "),n("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)]),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"}),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])]:t._e(),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[],!1,null,"43b69a38",null);e.default=v.exports},46:function(t,e,n){var i=n(111);"string"==typeof i&&(i=[[t.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(8)(i,a);i.locals&&(t.exports=i.locals)}}]);