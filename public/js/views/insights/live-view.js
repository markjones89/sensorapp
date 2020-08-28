(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{100:function(t,e,s){"use strict";var n=s(23);s.n(n).a},101:function(t,e,s){(t.exports=s(7)(!1)).push([t.i,"#live-view[data-v-52a5b407] {\n  height: 300px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 2em;\n}",""])},214:function(t,e,s){"use strict";s.r(e);var n=s(5),i=s(6),a=s(2),o={title:"Live",components:{CaretIcon:i.a,CaretLeftIcon:i.b,FilterDropdown:a.d},data:function(){return{liveWS:null,showPageOpts:!1,showEmbed:!1,buildings:[],showFilter:!1}},methods:{wsConnect:function(){this.liveWS=new WebSocket("ws://sigfox.switchfi.co.za:1880/ws/request"),this.liveWS.onopen=this.wsOpened,this.liveWS.onmessage=this.wsMessaged,this.liveWS.onclose=this.wsClosed},wsOpened:function(t){console.log("Connected to live data websocket.",t)},wsMessaged:function(t){var e=JSON.parse(t.data),s=JSON.parse(e.payload);console.log("Live data",s)},wsClosed:function(t){t.wasClean?console.log("Connection to live data closed",t.code,t.reason):(console.log("Connection to live data died, reconnecting..."),this.wsConnect())},wsClose:function(t){this.liveWS.close(1e3,t)},windowUnload:function(){this.wsClose("Page closed")},backTo:function(){this.$router.back()},filterSelect:function(t){},toHeatMap:function(){this.$router.push({name:"heat-map"})},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t}},created:function(){this.wsConnect()},mounted:function(){Object(n.a)(window,"beforeunload",this.windowUnload)},destroyed:function(){this.wsClose("Page closed"),Object(n.f)(window,"beforeunload",this.windowUnload)}},c=(s(100),s(3)),l=Object(c.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("div",{staticClass:"graph-header"},[s("div",{staticClass:"page-back"},[s("div",{staticClass:"back-button",on:{click:t.backTo}},[s("button",{staticClass:"btn btn-primary btn-small"},[s("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),s("div",{staticClass:"graph-filters"},[s("span",{staticClass:"graph-filter",on:{click:function(e){t.showFilter=!t.showFilter}}},[t._v("\n                Select Building\n                "),s("span",{staticClass:"caret"},[s("caret-icon")],1),t._v(" "),s("filter-dropdown",{attrs:{filters:t.buildings,show:t.showFilter},on:{onSelect:t.filterSelect}})],1),t._v(" "),s("a",{staticClass:"btn btn-primary ml-12",attrs:{href:"javascript:;"},on:{click:t.toHeatMap}},[t._v("Heatmap")])]),t._v(" "),s("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(e){t.showPageOpts=!t.showPageOpts}}},[s("span",{staticClass:"dot"}),t._v(" "),s("span",{staticClass:"dot"}),t._v(" "),s("span",{staticClass:"dot"})]),t._v(" "),s("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?s("div",{staticClass:"page-opt-panel"},[s("ul",[s("li",[s("a",{on:{click:function(e){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),t._m(0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"graph-content"},[e("div",{staticClass:"chart-header"},[e("span",{staticClass:"chart-title"},[this._v("Live View")])]),this._v(" "),e("div",{attrs:{id:"live-view"}},[this._v("\n            Map here...\n        ")])])}],!1,null,"52a5b407",null);e.default=l.exports},23:function(t,e,s){var n=s(101);"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s(8)(n,i);n.locals&&(t.exports=n.locals)}}]);