(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{102:function(t,e,s){"use strict";var a=s(24);s.n(a).a},103:function(t,e,s){(t.exports=s(7)(!1)).push([t.i,"#heat-map[data-v-2c2d3090] {\n  height: 300px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 2em;\n}",""])},215:function(t,e,s){"use strict";s.r(e);var a=s(4),n=s(6),i=s(2),r={title:"Heat Map",components:{CaretIcon:n.a,CaretLeftIcon:n.b,Checkbox:i.a,DateRangeToggle:i.c,FilterDropdown:i.d,TimeSlider:i.h},data:function(){return{user:null,showPageOpts:!1,showEmbed:!1,buildings:[],showFilter:!1,timeFilter:{start:null,end:null}}},computed:{settings:function(){return this.user.company?this.user.company.settings:null}},methods:{backTo:function(){this.$router.back()},filterSelect:function(t){},toLive:function(){this.$router.push({name:"live"})},rangeSelect:function(t,e,s){},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},created:function(){this.user=a.a.getUser()}},o=(s(102),s(3)),c=Object(o.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("div",{staticClass:"graph-header"},[s("div",{staticClass:"page-back"},[s("div",{staticClass:"back-button",on:{click:t.backTo}},[s("button",{staticClass:"btn btn-primary btn-small"},[s("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),s("div",{staticClass:"graph-filters"},[s("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                Select Building\n                "),s("span",{staticClass:"caret"},[s("caret-icon")],1),t._v(" "),s("filter-dropdown",{attrs:{filters:t.buildings,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),s("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),s("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[s("span",{staticClass:"dot"}),t._v(" "),s("span",{staticClass:"dot"}),t._v(" "),s("span",{staticClass:"dot"})]),t._v(" "),s("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?s("div",{staticClass:"page-opt-panel"},[s("ul",[s("li",[s("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),s("div",{staticClass:"graph-content"},[t._m(0),t._v(" "),s("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),s("div",{attrs:{id:"heat-map"}},[t._v("\n            Map here...\n        ")]),t._v(" "),s("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),s("div",{staticClass:"clearfix"})],1),t._v(" "),s("div",{staticClass:"graph-footer"},[s("div",{staticClass:"left-options"}),t._v(" "),s("div",{staticClass:"right-options"},[s("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chart-header"},[e("span",{staticClass:"chart-title"},[this._v("Heat Map")])])}],!1,null,"2c2d3090",null);e.default=c.exports},24:function(t,e,s){var a=s(103);"string"==typeof a&&(a=[[t.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};s(8)(a,n);a.locals&&(t.exports=a.locals)}}]);