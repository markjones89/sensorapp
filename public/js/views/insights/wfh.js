(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{208:function(t,n,i){"use strict";i.r(n);var a=i(1),e=i.n(a),s=i(4),r=i(6),o=i(2),l=i(12);function c(t,n,i,a,e,s,r){try{var o=t[s](r),l=o.value}catch(t){return void i(t)}o.done?n(l):Promise.resolve(l).then(a,e)}function d(t){return function(){var n=this,i=arguments;return new Promise((function(a,e){var s=t.apply(n,i);function r(t){c(s,a,e,r,o,"next",t)}function o(t){c(s,a,e,r,o,"throw",t)}r(void 0)}))}}var u="/api/locations",h="/api/floors";function g(){return Math.floor(100*Math.random()+1)}var f={title:"Work From Home",components:{BuildingSvg:l.a,CaretIcon:r.a,CaretLeftIcon:r.b,Checkbox:o.a,DateRangeToggle:o.c,FilterDropdown:o.d,HouseSvg:l.b,Loader:o.e,TimeSlider:o.h},data:function(){return{user:null,loaded:!1,showPageOpts:!1,showEmbed:!1,showFilter:!1,buildings:[],floors:[],building:null,bldgFilter:null,wfhStat:0,bldgStat:0,timeFilter:{start:null,end:null}}},computed:{settings:function(){return this.user.company?this.user.company.settings:null},buildingFilters:function(){return this.buildings.map((function(t){return{value:t.hid,label:t.name}}))},homeScale:function(){return(this.wfhStat<25?25:this.wfhStat)/100},bldgScale:function(){return(this.bldgStat<25?25:this.bldgStat)/100}},methods:{backTo:function(){},getBuildings:function(){var t=this;return d(e.a.mark((function n(){var i,a,s;return e.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(i=t.user.company){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,axios.get(u,{params:{cid:i.hid,lob:!0}});case 5:a=n.sent,s=a.data,t.buildings=s,t.bldg_id?t.building=s.find((function(n){return n.hid===t.bldg_id})):t.building=s[0],t.bldgFilter=t.building.name,t.getFloors(t.building.hid,(function(){t.loaded=!0,t.wfhStat=g(),t.bldgStat=100-t.wfhStat}));case 11:case"end":return n.stop()}}),n)})))()},getFloors:function(t,n){var i=this;return d(e.a.mark((function a(){var s,r,o;return e.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,axios.get(h,{params:{bid:t}});case 2:return s=a.sent,r=s.data,o=r.sort((function(t,n){return t.floor_no>n.floor_no?1:t.floor_no<n.floor_no?-1:0})),i.floors=o.slice(0),a.abrupt("return",n&&n());case 7:case"end":return a.stop()}}),a)})))()},filterSelect:function(t,n){var i=this;this.showFilter=!1,this.building=this.buildings.find((function(n){return n.hid===t})),this.bldgFilter=n,this.getFloors(this.building.hid,(function(){i.wfhStat=g(),i.bldgStat=100-i.wfhStat}))},toCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},rangeSelect:function(t,n,i){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},created:function(){this.user=s.a.getUser()},mounted:function(){this.getBuildings()}},p=(i(98),i(3)),v=Object(p.a)(f,(function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"content"},[t.loaded&&t.building?[i("div",{staticClass:"graph-header"},[i("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),i("div",{staticClass:"graph-filters"},[i("span",{staticClass:"graph-filter",on:{click:function(n){t.showFilter=!t.showFilter}}},[t._v("\n                    "+t._s(t.bldgFilter?t.bldgFilter:"Select Building")+"\n                    "),i("span",{staticClass:"caret"},[i("caret-icon")],1),t._v(" "),i("filter-dropdown",{attrs:{filters:t.buildingFilters,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),i("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),i("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(n){t.showPageOpts=!t.showPageOpts}}},[i("span",{staticClass:"dot"}),t._v(" "),i("span",{staticClass:"dot"}),t._v(" "),i("span",{staticClass:"dot"})]),t._v(" "),i("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?i("div",{staticClass:"page-opt-panel"},[i("ul",[i("li",[i("a",{on:{click:function(n){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),i("div",{staticClass:"graph-content"},[i("div",{staticClass:"chart-header"},[i("span",{staticClass:"chart-title"},[t._v(t._s("Work From Home - "+t.building.name))])]),t._v(" "),i("div",{attrs:{id:"wfh-content"}},[i("div",{attrs:{id:"house-wrapper"}},[i("house-svg",{style:{transform:"scale("+t.homeScale+")"}}),t._v(" "),i("span",{staticClass:"stat"},[t._v(t._s(t.wfhStat+"%"))])],1),t._v(" "),i("div",{attrs:{id:"building-wrapper"}},[i("building-svg",{style:{transform:"scale("+t.bldgScale+")"},attrs:{floors:t.floors}}),t._v(" "),i("span",{staticClass:"stat"},[t._v(t._s(t.bldgStat+"%"))])],1)]),t._v(" "),i("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),i("div",{staticClass:"clearfix"})],1),t._v(" "),i("div",{staticClass:"graph-footer"},[i("div",{staticClass:"left-options"}),t._v(" "),i("div",{staticClass:"right-options"},[i("checkbox",{attrs:{label:"Save to report"}})],1)])]:t._e(),t._v(" "),i("loader",{attrs:{show:!t.loaded,type:"ripple"}})],2)}),[],!1,null,"c11819a0",null);n.default=v.exports},23:function(t,n,i){var a=i(99);"string"==typeof a&&(a=[[t.i,a,""]]);var e={hmr:!0,transform:void 0,insertInto:void 0};i(8)(a,e);a.locals&&(t.exports=a.locals)},98:function(t,n,i){"use strict";var a=i(23);i.n(a).a},99:function(t,n,i){(t.exports=i(7)(!1)).push([t.i,"#wfh-content[data-v-c11819a0] {\n  position: relative;\n}\n#wfh-content .stat[data-v-c11819a0] {\n  position: absolute;\n  font-weight: bold;\n  font-size: 16px;\n  text-align: center;\n  min-width: 48px;\n  line-height: 48px;\n  border-radius: 50%;\n  bottom: 16px;\n  background-color: #FF5A09;\n}\n#wfh-content #house-wrapper[data-v-c11819a0] {\n  position: relative;\n  display: inline-block;\n  padding: 0 0 32px 0;\n}\n#wfh-content #house-wrapper .house-svg[data-v-c11819a0] {\n  transform-origin: bottom;\n  transition: transform 0.4s;\n}\n#wfh-content #house-wrapper .stat[data-v-c11819a0] {\n  margin-left: 90px;\n}\n#wfh-content #building-wrapper[data-v-c11819a0] {\n  position: relative;\n  display: inline-block;\n  padding: 0 0 32px 0;\n}\n#wfh-content #building-wrapper .building-svg[data-v-c11819a0] {\n  transform-origin: bottom;\n  transition: transform 0.4s;\n}\n#wfh-content #building-wrapper .stat[data-v-c11819a0] {\n  margin-left: 120px;\n}",""])}}]);