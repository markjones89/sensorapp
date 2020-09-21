(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{102:function(t,e,r){"use strict";var a=r(26);r.n(a).a},103:function(t,e,r){(t.exports=r(7)(!1)).push([t.i,"#room-compare {\n  position: relative;\n  width: 920px;\n  margin: 0 auto;\n}\n#room-compare #left-filter {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n#room-compare #right-filter {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n#room-compare #percent-filter {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  margin-top: 32px;\n}\n#room-compare .person-chair-svg {\n  padding: 48px 0 48px;\n}\n#room-compare .stat-group {\n  position: relative;\n  margin-bottom: 20px;\n}\n#room-compare .stat-group .bars-group {\n  position: absolute;\n  display: inline-block;\n  border-bottom: 1px dashed #ffffff;\n}\n#room-compare .stat-group .bars-group .bars {\n  position: absolute;\n}\n#room-compare .stat-group .bars-group .bars .percent {\n  display: block;\n  font-size: 12px;\n  margin-bottom: 5px;\n  text-align: center;\n}\n#room-compare .stat-group .bars-group .bars .bar {\n  display: block;\n  width: 30px;\n  height: 10px;\n  margin-bottom: 5px;\n}\n#room-compare .stat-group .bars-group .bars .bar.peak {\n  background-color: #524FFF;\n}\n#room-compare .stat-group .bars-group .bars .bar.average {\n  background-color: #FF5A09;\n}\n#room-compare .stat-group .bars-group.left {\n  border-left: 1px dashed #ffffff;\n}\n#room-compare .stat-group .bars-group.left .bars {\n  bottom: 100%;\n  transform: translateX(-15px);\n}\n#room-compare .stat-group .bars-group.left .bars .percent {\n  transform: rotate(-30deg);\n}\n#room-compare .stat-group .bars-group.left .bars .bar {\n  transform: skewY(-30deg);\n}\n#room-compare .stat-group .bars-group.right {\n  border-right: 1px dashed #ffffff;\n}\n#room-compare .stat-group .bars-group.right .bars {\n  right: -15px;\n  bottom: 100%;\n}\n#room-compare .stat-group .bars-group.right .bars .percent {\n  transform: rotate(30deg);\n  transform-origin: bottom;\n}\n#room-compare .stat-group .bars-group.right .bars .bar {\n  transform: skewY(30deg);\n}\n#room-compare .stat-group .group-label {\n  display: inline-block;\n  padding: 6px 0;\n  font-size: 12px;\n}\n#room-compare .stat-group:nth-child(odd) .bars-group {\n  border-color: #524FFF;\n}\n#room-compare .stat-group:nth-child(odd) .group-label {\n  background-color: #524FFF;\n}\n#room-compare .stat-group:nth-child(even) .bars-group {\n  border-color: #FF5A09;\n}\n#room-compare .stat-group:nth-child(even) .group-label {\n  background-color: #FF5A09;\n}",""])},213:function(t,e,r){"use strict";r.r(e);var a=r(4),o=r(6),n=r(2),s=r(13),i=r(0);function c(t,e){var r=i.y(t),a=e.groups.map((function(t,r){return{title:t,left:e.left[r],right:e.right[r]}})),o=function(t,e,r){t.selectAll(".bars").remove();var a=t.append("div").attr("class","bars"),o=0===e.average?0:e.average<10?1:Math.ceil(e.average/10),n=t.append("div").attr("class","bars"),s=Math.ceil(e.peak/10)-o;e.peak>0&&n.append("span").attr("class","percent").text("".concat(e.peak,"%"));for(var i=1;i<=s;i++)n.append("span").attr("class","bar peak");(e.average>0||0===e.peak&&0===e.average)&&a.append("span").attr("class","percent").text("".concat(e.average,"%"));for(var c=1;c<=o;c++)a.append("span").attr("class","bar average");e.average>0&&n.style("transform","translate(".concat("left"===r?-15:0,"px, ").concat(-(a.node().getBoundingClientRect().height+5),"px)"))},n=r.selectAll(null).data(a).enter().append("div").attr("class","stat-group");n.each((function(t,e){var r=i.y(this),a=48*(e+1)/3,n=48*(e+1)/2,s=r.append("div").attr("class","bars-group left").attr("data-id",e).style("width","".concat(n,"px")).style("height","".concat(a,"px")).style("transform","translateX(".concat(-n,"px)"));o(s,t.left,"left");var c=r.append("span").attr("class","group-label").attr("data-id",e).style("width","".concat(340+48*e,"px")).text((function(t){return t.title})),l=r.append("div").attr("class","bars-group right").attr("data-id",e).style("width","".concat(n,"px")).style("height","".concat(a,"px"));o(l,t.right,"right");var p=c.node().getBoundingClientRect();s.style("bottom","".concat(p.height/2,"px")),l.style("bottom","".concat(p.height/2,"px"))})),this.setData=function(t){var e;e=t.groups,n.selectAll(".group-label").each((function(){var t=i.y(this),r=parseInt(t.attr("data-id"));t.text(e[r])})),this.setLeft(t.left),this.setRight(t.right)},this.setLeft=function(t){n.selectAll(".bars-group.left").each((function(){var e=i.y(this),r=parseInt(e.attr("data-id"));o(e,t[r],"left")}))},this.setRight=function(t){n.selectAll(".bars-group.right").each((function(){var e=i.y(this),r=parseInt(e.attr("data-id"));o(e,t[r],"right")}))}}function l(t){return Math.floor(Math.random()*(t||100)+1)}function p(){for(var t=[],e=0;e<6;e++){var r=l(90),a=r+l(100-r);t.push({average:r,peak:a})}return t}var h={title:"Compare Room",components:{CaretIcon:o.a,CaretLeftIcon:o.b,Checkbox:n.a,DateRangeToggle:n.c,FilterDropdown:n.d,TimeSlider:n.h,TwoPersonChairSvg:s.c},data:function(){return{user:null,showPageOpts:!1,showEmbed:!1,buildings:[],showFilter:!1,comparer:null,showLeftFilter:!1,showRightFilter:!1,showPercentFilter:!1,sizes:[4,6,12,15],leftFilter:null,rightFilter:null,percents:["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"],percentFilter:"70%",timeFilter:{start:null,end:null}}},computed:{settings:function(){return this.user.company?this.user.company.settings:null},sizeFilters:function(){return this.sizes.map((function(t){return{value:t,label:"".concat(t,"-seated Room")}}))}},methods:{backTo:function(){this.$router.back()},filterSelect:function(t){},toCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},rangeSelect:function(t,e,r){this.generateRandomData()},timeStartChange:function(t){this.timeFilter.start=t,this.generateRandomData()},timeEndChange:function(t){this.timeFilter.end=t,this.generateRandomData()},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},filterLeft:function(t,e){this.showLeftFilter=!1,this.leftFilter=e,this.comparer.setLeft(p())},filterRight:function(t,e){this.showRightFilter=!1,this.rightFilter=e,this.comparer.setRight(p())},filterPercent:function(t){this.showPercentFilter=!1,this.percentFilter=t,this.generateRandomData()},generateRandomData:function(){var t={groups:["% of rooms occupied at the same time","% of time that ".concat(this.percentFilter," of the rooms (or more) are occupied at the same time"),"% of time rooms are occupied at the same time at peak","Size of meetings. % of Capacity","% of time that rooms are above ".concat(this.percentFilter," Capacity"),"% of time rooms are at Peak Capacity"],left:p(),right:p()};this.comparer.setData(t)}},created:function(){this.user=a.a.getUser()},mounted:function(){var t={groups:["% of rooms occupied at the same time","% of time that ".concat(this.percentFilter," of the rooms (or more) are occupied at the same time"),"% of time rooms are occupied at the same time at peak","Size of meetings. % of Capacity","% of time that rooms are above ".concat(this.percentFilter," Capacity"),"% of time rooms are at Peak Capacity"],left:p(),right:p()};this.comparer=new c("#room-compare",t)}},g=(r(102),r(3)),m=Object(g.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("div",{staticClass:"graph-header"},[r("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),r("div",{staticClass:"graph-filters"},[r("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                Select Building\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.buildings,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),r("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),r("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"}),t._v(" "),r("span",{staticClass:"dot"})]),t._v(" "),r("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?r("div",{staticClass:"page-opt-panel"},[r("ul",[r("li",[r("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),r("div",{staticClass:"graph-content"},[r("div",{staticClass:"page-back"},[r("div",{staticClass:"back-button",on:{click:t.backTo}},[r("button",{staticClass:"btn btn-primary btn-small"},[r("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),t._m(0),t._v(" "),r("div",{attrs:{id:"room-compare"}},[r("span",{staticClass:"graph-filter",attrs:{id:"left-filter"},on:{click:function(e){t.showLeftFilter=!t.showLeftFilter}}},[t._v("\n                "+t._s(t.leftFilter?t.leftFilter:"Select Room Size")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.sizeFilters,show:t.showLeftFilter},on:{onSelect:t.filterLeft}})],1),t._v(" "),r("two-person-chair-svg"),t._v(" "),r("span",{staticClass:"graph-filter",attrs:{id:"right-filter"},on:{click:function(e){t.showRightFilter=!t.showRightFilter}}},[t._v("\n                "+t._s(t.rightFilter?t.rightFilter:"Select Room Size")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.sizeFilters,show:t.showRightFilter},on:{onSelect:t.filterRight}})],1),t._v(" "),r("span",{staticClass:"graph-filter",attrs:{id:"percent-filter"},on:{click:function(e){t.showPercentFilter=!t.showPercentFilter}}},[t._v("\n                "+t._s(t.percentFilter?t.percentFilter:"Select Percent")+"\n                "),r("span",{staticClass:"caret"},[r("caret-icon")],1),t._v(" "),r("filter-dropdown",{attrs:{filters:t.percents,maxItems:3,chosen:t.percentFilter,show:t.showPercentFilter},on:{onSelect:t.filterPercent}})],1)],1),t._v(" "),r("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),r("div",{staticClass:"clearfix"})],1),t._v(" "),r("div",{staticClass:"graph-footer"},[r("div",{staticClass:"left-options"}),t._v(" "),r("div",{staticClass:"right-options"},[r("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chart-header"},[e("span",{staticClass:"chart-title"},[this._v("Compare Room Size Performance")])])}],!1,null,null,null);e.default=m.exports},26:function(t,e,r){var a=r(103);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(8)(a,o);a.locals&&(t.exports=a.locals)}}]);