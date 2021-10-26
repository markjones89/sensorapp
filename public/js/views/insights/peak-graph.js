(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{293:function(t,e,r){"use strict";r.r(e);var a=r(5),i=r(0),s=r(4),n=r(11),o=r(8);function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){u(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var h={title:"Peak Chart",components:{CaretIcon:o.a,CaretLeftIcon:o.b,Checkbox:s.a,DateRangeToggle:s.c,GraphFilter:s.e,Modal:s.h,TimeSlider:s.i,HierarchyGraph:n.b},data:function(){return{barChart:null,floorSummary:null,axiosSrc:null,showPageOpts:!1,showEmbed:!1,rangeFilter:{type:"today",start:null,end:null},timeFilter:{start:null,end:null},locations:[],minuteFilter:60,dataLoaded:!1,dataFilters:{trigger:6,start_hour:8,stop_hour:16,start_date:"",stop_date:"",node_type:"Customer",node_id:"ad9b565d-9082-4808-99cd-32f2f09f63f2"},filterReport:!1,monthList:["January","February","March","April","May","June","July","August","September","October","November","December"],rptFilters:{year:0,month:0,limit:50}}},computed:c(c(c({},Object(a.e)({user:function(t){return t.user},company:function(t){return t.user.company},settings:function(t){return t.user.company?t.user.company.settings:null},summary:function(t){return t.homepage.summary},filter:function(t){return t.homepage.filter},locationFilter:function(t){return t.homepage.locationFilter},cp_range:function(t){return t.homepage.rangeFilter},cp_start_time:function(t){return t.homepage.startTime},cp_end_time:function(t){return t.homepage.endTime},peakSummary:function(t){return t.peakchart.summary}})),Object(a.c)({api_header:"backend/api_header",api_customer_summary:"backend/api_customer_summary",api_graph_view:"backend/api_graph_view"})),{},{baseUrl:function(){return Object(i.g)()},minuteFilters:function(){return[60].map((function(t){return{value:t,label:"".concat(t," minutes")}}))},selectedLocation:function(){var t;return null===(t=this.locationFilter)||void 0===t?void 0:t.value}}),methods:c(c({},Object(a.d)({setRange:"homepage/setRange",setSummary:"homepage/setSummary",setPeakSummary:"peakchart/setSummary",setLocation:"homepage/setLocation"})),{},{backTo:function(){this.$router.back()},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},rangeSelect:function(t,e,r){this.dataLoaded=!1,this.setRange({type:t,start:Object(i.w)(e),end:Object(i.v)(r)}),this.dataFilters.start_date=Object(i.w)(e),this.dataFilters.stop_date=Object(i.v)(r)},chartLoaded:function(t,e,r){r||(this.setSummary(t),this.setPeakSummary(e));var a=Object(i.f)(this.summary);null==this.locationFilter&&this.setLocation(a[0]),this.locations=a,this.dataLoaded=!0},locFilter:function(t,e,r){this.setLocation(r),this.$refs.hierarchyChart&&this.$refs.hierarchyChart.renderChart()},timeStartChange:function(t,e){this.dataLoaded=!1,this.dataFilters.start_hour=e},timeEndChange:function(t,e){this.dataLoaded=!1,this.dataFilters.stop_hour=e},filterMinute:function(t){this.minuteFilter=t},graphRoute:function(t,e){this.$router.push({name:t,query:e})},toTreeSummary:function(){this.$router.push({name:"tree-summary",query:{df:this.filter.value}})},toLive:function(){this.$router.push({name:"occupancy"})},showReport:function(t){var e=this;this.filterReport=t,t&&setTimeout((function(){e.$refs.rptYear.focus()}),0)},viewReport:function(){var t={cid:this.company.ref_id,bid:this.locationFilter.value,y:this.rptFilters.year,m:this.rptFilters.month,sh:this.dataFilters.start_hour,eh:this.dataFilters.stop_hour,lr:this.rptFilters.limit},e=this.$router.resolve({name:"utilisation-rpt",query:t});window.open(e.href,"_blank")}}),created:function(){var t=new Date;if(this.cp_range.type){this.rangeFilter=JSON.parse(JSON.stringify(this.cp_range)),this.dataFilters.start_date=this.rangeFilter.start,this.dataFilters.stop_date=this.rangeFilter.end;var e=this.rangeFilter.start,r=new Date(e.substring(0,e.indexOf("T"))),a=r.getFullYear(),s=r.getMonth();this.rptFilters.year=a,this.rptFilters.month=s,this.rptFilters.limit=a>=2020&&s>=2?50:100}else{var n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(t.getFullYear(),t.getMonth(),t.getDate(),23);this.rangeFilter.type="today",this.rangeFilter.start=this.dataFilters.start_date=Object(i.w)(n),this.rangeFilter.end=this.dataFilters.stop_date=Object(i.v)(o);var l=t.getFullYear(),c=t.getMonth();this.rptFilters.year=t.getFullYear(),this.rptFilters.month=t.getMonth(),this.rptFilters.year=l,this.rptFilters.month=c,this.rptFilters.limit=l>=2020&&c>=2?50:100,this.setRange({type:"today",start:Object(i.w)(n),end:Object(i.v)(o)})}this.cp_start_time?(this.dataFilters.start_hour=this.timeFilter.start=this.cp_start_time,this.dataFilters.stop_hour=this.timeFilter.end=this.cp_end_time):this.settings&&(this.dataFilters.start_hour=this.timeFilter.start=Object(i.u)(this.settings.start_time),this.dataFilters.stop_hour=this.timeFilter.end=Object(i.u)(this.settings.end_time)),this.company&&this.company.ref_id&&(this.dataFilters.node_id=this.company.ref_id)},mounted:function(){}},p=r(3),d=Object(p.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("div",{staticClass:"graph-header"},[r("date-range-toggle",{attrs:{active:t.rangeFilter},on:{select:t.rangeSelect}}),t._v(" "),t.dataLoaded?r("div",{staticClass:"graph-filters"},[r("graph-filter",{attrs:{placeholder:"Select Location",filters:t.locations,chosen:t.selectedLocation,chosenAsSelected:!0},on:{onSelect:t.locFilter}}),t._v(" "),r("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toTreeSummary}},[t._v(t._s(t.filter.btnLabel))])],1):t._e(),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),r("hierarchy-graph",{ref:"hierarchyChart",attrs:{custData:t.summary,floorData:t.peakSummary,dataFilters:t.dataFilters},on:{dataLoaded:t.chartLoaded,routeTo:t.graphRoute}}),t._v(" "),r("div",{staticClass:"bottom-filters"},[r("time-slider",{attrs:{from:t.timeFilter.start,to:t.timeFilter.end},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),r("graph-filter",{attrs:{filters:t.minuteFilters,chosen:t.minuteFilter,chosenAsSelected:!0,position:"top"},on:{onSelect:t.filterMinute}})],1)],1),t._v(" "),r("div",{staticClass:"graph-footer"},[r("div",{staticClass:"left-options"},[r("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")]),t._v(" "),t.locationFilter&&t.locationFilter.building?r("button",{staticClass:"btn btn-primary btn-small",on:{click:function(e){return t.showReport(!0)}}},[t._v("\n                Report\n            ")]):t._e()]),t._v(" "),r("div",{staticClass:"right-options"},[r("checkbox",{attrs:{label:"Save to report"}})],1)]),t._v(" "),r("modal",{attrs:{show:t.filterReport},on:{close:function(e){return t.showReport(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[r("h2",[t._v("Utilisation Report")])]},proxy:!0},{key:"footer",fn:function(){return[r("button",{staticClass:"btn btn-primary",on:{click:t.viewReport}},[t._v("View report")])]},proxy:!0}])},[t._v(" "),r("div",[r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("div",{staticClass:"input-field"},[r("label",[t._v("Year")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.rptFilters.year,expression:"rptFilters.year"}],ref:"rptYear",attrs:{type:"number"},domProps:{value:t.rptFilters.year},on:{input:function(e){e.target.composing||t.$set(t.rptFilters,"year",e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"col"},[r("div",{staticClass:"input-field"},[r("label",[t._v("Month")]),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.rptFilters.month,expression:"rptFilters.month"}],on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.rptFilters,"month",e.target.multiple?r:r[0])}}},t._l(t.monthList,(function(e,a){return r("option",{key:a,domProps:{value:a}},[t._v("\n                                "+t._s(e)+"\n                            ")])})),0)])])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-6"},[r("div",{staticClass:"input-field"},[r("label",[t._v("Covid Limit (%)")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.rptFilters.limit,expression:"rptFilters.limit"}],attrs:{type:"number"},domProps:{value:t.rptFilters.limit},on:{input:function(e){e.target.composing||t.$set(t.rptFilters,"limit",e.target.value)}}})])])])])])],1)}),[],!1,null,null,null);e.default=d.exports}}]);