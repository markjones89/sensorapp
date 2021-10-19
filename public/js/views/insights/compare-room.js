(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{125:function(t,e,r){"use strict";r(51)},126:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,"#room-compare{position:relative;width:920px;margin:0 auto}#room-compare #left-filter{position:absolute;top:0;left:0}#room-compare #right-filter{position:absolute;top:0;right:0}#room-compare #percent-filter{position:absolute;top:100%;left:0;margin-top:32px}#room-compare .person-chair-svg{padding:48px 0}#room-compare .stat-group{position:relative;margin-bottom:20px}#room-compare .stat-group .bars-group{position:absolute;display:inline-block;border-bottom:1px dashed #fff}#room-compare .stat-group .bars-group .bars{position:absolute}#room-compare .stat-group .bars-group .bars .percent{display:block;font-size:12px;margin-bottom:5px;text-align:center}#room-compare .stat-group .bars-group .bars .bar{display:block;width:30px;height:10px;margin-bottom:5px}#room-compare .stat-group .bars-group .bars .bar.peak{background-color:#524fff}#room-compare .stat-group .bars-group .bars .bar.average{background-color:#ff5a09}#room-compare .stat-group .bars-group.left{border-left:1px dashed #fff}#room-compare .stat-group .bars-group.left .bars{bottom:100%;transform:translateX(-15px)}#room-compare .stat-group .bars-group.left .bars .percent{transform:rotate(-30deg)}#room-compare .stat-group .bars-group.left .bars .bar{transform:skewY(-30deg)}#room-compare .stat-group .bars-group.right{border-right:1px dashed #fff}#room-compare .stat-group .bars-group.right .bars{right:-15px;bottom:100%}#room-compare .stat-group .bars-group.right .bars .percent{transform:rotate(30deg);transform-origin:bottom}#room-compare .stat-group .bars-group.right .bars .bar{transform:skewY(30deg)}#room-compare .stat-group .group-label{display:inline-block;padding:6px 0;font-size:12px}#room-compare .stat-group:nth-child(odd) .bars-group{border-color:#524fff}#room-compare .stat-group:nth-child(odd) .group-label{background-color:#524fff}#room-compare .stat-group:nth-child(2n) .bars-group{border-color:#ff5a09}#room-compare .stat-group:nth-child(2n) .group-label{background-color:#ff5a09}",""])},289:function(t,e,r){"use strict";r.r(e);var a=r(5),o=r(8),i=r(4),s=r(20),n=r(2);function c(t,e){var r=n.y(t),a=e.groups.map((function(t,r){return{title:t,left:e.left[r],right:e.right[r]}})),o=function(t,e,r){t.selectAll(".bars").remove();var a=t.append("div").attr("class","bars"),o=0===e.average?0:e.average<10?1:Math.ceil(e.average/10),i=t.append("div").attr("class","bars"),s=Math.ceil(e.peak/10)-o;e.peak>0&&i.append("span").attr("class","percent").text("".concat(e.peak,"%"));for(var n=1;n<=s;n++)i.append("span").attr("class","bar peak");(e.average>0||0===e.peak&&0===e.average)&&a.append("span").attr("class","percent").text("".concat(e.average,"%"));for(var c=1;c<=o;c++)a.append("span").attr("class","bar average");e.average>0&&i.style("transform","translate(".concat("left"===r?-15:0,"px, ").concat(-(a.node().getBoundingClientRect().height+5),"px)"))},i=r.selectAll(null).data(a).enter().append("div").attr("class","stat-group");i.each((function(t,e){var r=n.y(this),a=48*(e+1)/3,i=48*(e+1)/2,s=r.append("div").attr("class","bars-group left").attr("data-id",e).style("width","".concat(i,"px")).style("height","".concat(a,"px")).style("transform","translateX(".concat(-i,"px)"));o(s,t.left,"left");var c=r.append("span").attr("class","group-label").attr("data-id",e).style("width","".concat(340+48*e,"px")).text((function(t){return t.title})),l=r.append("div").attr("class","bars-group right").attr("data-id",e).style("width","".concat(i,"px")).style("height","".concat(a,"px"));o(l,t.right,"right");var p=c.node().getBoundingClientRect();s.style("bottom","".concat(p.height/2,"px")),l.style("bottom","".concat(p.height/2,"px"))})),this.setData=function(t){var e;e=t.groups,i.selectAll(".group-label").each((function(){var t=n.y(this),r=parseInt(t.attr("data-id"));t.text(e[r])})),this.setLeft(t.left),this.setRight(t.right)},this.setLeft=function(t){i.selectAll(".bars-group.left").each((function(){var e=n.y(this),r=parseInt(e.attr("data-id"));o(e,t[r],"left")}))},this.setRight=function(t){i.selectAll(".bars-group.right").each((function(){var e=n.y(this),r=parseInt(e.attr("data-id"));o(e,t[r],"right")}))}}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){u(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t){return Math.floor(Math.random()*(t||100)+1)}function h(){for(var t=[],e=0;e<6;e++){var r=f(90),a=r+f(100-r);t.push({average:r,peak:a})}return t}var g={title:"Compare Room",components:{CaretIcon:o.a,CaretLeftIcon:o.b,Checkbox:i.a,DateRangeToggle:i.c,FilterDropdown:i.d,TimeSlider:i.i,TwoPersonChairSvg:s.c},data:function(){return{showPageOpts:!1,showEmbed:!1,buildings:[],showFilter:!1,comparer:null,showLeftFilter:!1,showRightFilter:!1,showPercentFilter:!1,sizes:[4,6,12,15],leftFilter:null,rightFilter:null,percents:["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"],percentFilter:"70%",timeFilter:{start:null,end:null},minuteFilter:"10 minutes",showMinuteFilter:!1}},computed:p(p({},Object(a.e)({user:function(t){return t.user}})),{},{settings:function(){return this.user.company?this.user.company.settings:null},sizeFilters:function(){return this.sizes.map((function(t){return{value:t,label:"".concat(t,"-seated Room")}}))},minuteFilters:function(){return[10,15,30,45,60,120,240,480].map((function(t){return{value:t,label:"".concat(t," minutes")}}))}}),methods:{backTo:function(){this.$router.back()},filterSelect:function(t){},toCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},rangeSelect:function(t,e,r){this.generateRandomData()},timeStartChange:function(t){this.timeFilter.start=t,this.generateRandomData()},timeEndChange:function(t){this.timeFilter.end=t,this.generateRandomData()},filterMinute:function(t){var e=this.minuteFilters.find((function(e){return e.value==t}));this.showMinuteFilter=!1,this.minuteFilter=e.label},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},filterLeft:function(t,e){this.showLeftFilter=!1,this.leftFilter=e,this.comparer.setLeft(h())},filterRight:function(t,e){this.showRightFilter=!1,this.rightFilter=e,this.comparer.setRight(h())},filterPercent:function(t){this.showPercentFilter=!1,this.percentFilter=t,this.generateRandomData()},generateRandomData:function(){var t={groups:["% of rooms occupied at the same time","% of time that ".concat(this.percentFilter," of the rooms (or more) are occupied at the same time"),"% of time rooms are occupied at the same time at peak","Size of meetings. % of Capacity","% of time that rooms are above ".concat(this.percentFilter," Capacity"),"% of time rooms are at Peak Capacity"],left:h(),right:h()};this.comparer.setData(t)}},mounted:function(){var t={groups:["% of rooms occupied at the same time","% of time that ".concat(this.percentFilter," of the rooms (or more) are occupied at the same time"),"% of time rooms are occupied at the same time at peak","Size of meetings. % of Capacity","% of time that rooms are above ".concat(this.percentFilter," Capacity"),"% of time rooms are at Peak Capacity"],left:h(),right:h()};this.comparer=new c("#room-compare",t)}},m=(r(125),r(3)),d=Object(m.a)(g,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("div",{staticClass:"graph-header"},[r("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),r("div",{staticClass:"graph-filters"},[r("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                Select Building\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.buildings,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),r("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),t._m(0),t._v(" "),r("div",{attrs:{id:"room-compare"}},[r("span",{staticClass:"graph-filter",attrs:{id:"left-filter"},on:{click:function(e){t.showLeftFilter=!t.showLeftFilter}}},[t._v("\n                "+t._s(t.leftFilter?t.leftFilter:"Select Room Size")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.sizeFilters,show:t.showLeftFilter},on:{onSelect:t.filterLeft}})],1),t._v(" "),r("two-person-chair-svg"),t._v(" "),r("span",{staticClass:"graph-filter",attrs:{id:"right-filter"},on:{click:function(e){t.showRightFilter=!t.showRightFilter}}},[t._v("\n                "+t._s(t.rightFilter?t.rightFilter:"Select Room Size")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.sizeFilters,show:t.showRightFilter},on:{onSelect:t.filterRight}})],1),t._v(" "),r("span",{staticClass:"graph-filter",attrs:{id:"percent-filter"},on:{click:function(e){t.showPercentFilter=!t.showPercentFilter}}},[t._v("\n                "+t._s(t.percentFilter?t.percentFilter:"Select Percent")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.percents,chosen:t.percentFilter,position:"top",show:t.showPercentFilter},on:{onSelect:t.filterPercent}})],1)],1),t._v(" "),r("div",{staticClass:"bottom-filters"},[r("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),r("span",{staticClass:"graph-filter",on:{click:function(e){t.showMinuteFilter=!t.showMinuteFilter}}},[t._v("\n                "+t._s(t.minuteFilter?t.minuteFilter:"Select")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.minuteFilters,position:"top",show:t.showMinuteFilter},on:{onSelect:t.filterMinute}})],1)],1)]),t._v(" "),r("div",{staticClass:"graph-footer"},[r("div",{staticClass:"left-options"}),t._v(" "),r("div",{staticClass:"right-options"},[r("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chart-header"},[e("span",{staticClass:"chart-title"},[this._v("Compare Room Size Performance")])])}],!1,null,null,null);e.default=d.exports},51:function(t,e,r){var a=r(126);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(7)(a,o);a.locals&&(t.exports=a.locals)}}]);