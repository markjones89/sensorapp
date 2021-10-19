(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{115:function(t,e,n){"use strict";n(46)},116:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,".bar-chart svg{pointer-events:auto}",""])},294:function(t,e,n){"use strict";n.r(e);var r=n(5),i=n(1),a=n(4),s=n(12),o=n(8);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p={title:"Bar Chart",components:{CaretIcon:o.a,CaretLeftIcon:o.b,Checkbox:a.a,DateRangeToggle:a.c,GraphFilter:a.e,Modal:a.h,TimeSlider:a.i,VerticalGraph:s.j},data:function(){return{showPageOpts:!1,showEmbed:!1,building:null,locations:[],locFilter:null,rangeFilter:{type:"today",start:null,end:null},timeFilter:{start:null,end:null},minuteFilter:60,dataFilters:{trigger:6,start_hour:8,stop_hour:16,start_date:"",stop_date:"",node_type:"Customer",node_id:"ad9b565d-9082-4808-99cd-32f2f09f63f2"}}},computed:l(l({},Object(r.e)({user:function(t){return t.user},company:function(t){return t.user.company},settings:function(t){return t.user.company?t.user.company.settings:null},cp_range:function(t){return t.homepage.rangeFilter},cp_start_time:function(t){return t.homepage.startTime},cp_end_time:function(t){return t.homepage.endTime},peakSummary:function(t){return t.peakchart.summary}})),{},{baseUrl:function(){return Object(i.e)()},settings:function(){return this.user.company?this.user.company.settings:null},minuteFilters:function(){return[60].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},rangeSelect:function(t,e,n){this.rangeFilter.type=t,this.dataFilters.start_date=e.toISOString(),this.dataFilters.stop_date=n.toISOString()},selectLocation:function(t,e,n){this.locFilter=t},viewCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},timeStartChange:function(t,e){this.dataFilters.start_hour=e},timeEndChange:function(t,e){this.dataFilters.stop_hour=e},filterMinute:function(t){this.minuteFilter=t},toLive:function(){this.$router.push({name:"occupancy"})}},created:function(){var t=this.$route.query,e=t.building&&t.floor;if(this.peakSummary&&e){var n=JSON.parse(JSON.stringify(this.peakSummary)).find((function(e){return e.building_name==t.building}));n&&(this.building=n,this.locations=n.floor_summary.map((function(t){return"".concat(Object(i.v)(t.floor)," Floor ").concat(n.building_name)})),this.locFilter="".concat(t.floor," ").concat(t.building))}}},d=(n(115),n(3)),f=Object(d.a)(p,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"graph-header"},[n("date-range-toggle",{attrs:{active:t.rangeFilter},on:{select:t.rangeSelect}}),t._v(" "),n("div",{staticClass:"graph-filters"},[n("graph-filter",{attrs:{placeholder:"Select Location",filters:t.locations,chosen:t.locFilter,chosenAsSelected:!0},on:{onSelect:t.selectLocation}}),t._v(" "),n("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.viewCostAnalysis}},[t._v("Cost Analysis")])],1),t._v(" "),n("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"}),t._v(" "),n("span",{staticClass:"dot"})]),t._v(" "),n("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?n("div",{staticClass:"page-opt-panel"},[n("ul",[n("li",[n("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),n("div",{staticClass:"graph-content"},[n("div",{staticClass:"page-back"},[n("div",{staticClass:"back-button",on:{click:t.backTo}},[n("button",{staticClass:"btn btn-primary btn-small"},[n("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),n("vertical-graph",{attrs:{buildingData:t.building,rangeFilter:t.rangeFilter.type,roomFilter:t.locFilter,dataFilters:t.dataFilters}}),t._v(" "),n("div",{staticClass:"bottom-filters"},[n("time-slider",{attrs:{from:t.timeFilter.start,to:t.timeFilter.end},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),n("graph-filter",{attrs:{filters:t.minuteFilters,chosen:t.minuteFilter,chosenAsSelected:!0,position:"top"},on:{onSelect:t.filterMinute}})],1)],1),t._v(" "),n("div",{staticClass:"graph-footer"},[n("div",{staticClass:"left-options"},[n("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")]),t._v(" "),n("button",{staticClass:"btn btn-primary btn-small"},[t._v("Insights")])]),t._v(" "),n("div",{staticClass:"right-options"},[n("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[],!1,null,null,null);e.default=f.exports},46:function(t,e,n){var r=n(116);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,i);r.locals&&(t.exports=r.locals)}}]);