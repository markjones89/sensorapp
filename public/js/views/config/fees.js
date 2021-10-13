(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{144:function(t,e,n){"use strict";n(60)},145:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"#cost-list[data-v-4c129049]{margin-top:24px}#cost-list table[data-v-4c129049]{border-collapse:collapse;width:100%}#cost-list table th[data-v-4c129049]{padding:0 8px;line-height:48px;text-align:left;border-bottom:1px solid hsla(0,0%,100%,.1)}#cost-list table th sup[data-v-4c129049]{line-height:normal}#cost-list table td[data-v-4c129049]{padding:10px}#cost-list table .cost-item[data-v-4c129049]{cursor:pointer;transition:background-color .24s}#cost-list table .cost-item[data-v-4c129049]:hover{background-color:hsla(0,0%,100%,.05)}#cost-list #add-btn[data-v-4c129049]{margin-top:24px}",""])},304:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n.n(r),o=n(4);function s(t,e,n,r,i,o,s){try{var a=t[o](s),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(r,i)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function a(t){s(o,r,i,a,c,"next",t)}function c(t){s(o,r,i,a,c,"throw",t)}a(void 0)}))}}var c="/api/gcosts",u={title:"Cost Settings",components:{Loader:o.f,Modal:o.h},data:function(){return{loaded:!1,costs:[],cityRef:[],showEntry:!1,editMode:!1,entry:{id:null,country:"",city:"",rental_metre:0,rental_foot:0,furniture_cost:0},state:{saving:!1}}},computed:{countries:function(){return this.cityRef.reduce((function(t,e){return t.concat(e.countries.map((function(t){return t.country})))}),[]).sort()},cities:function(){var t=this;return this.cityRef.reduce((function(e,n){var r=n.countries.filter((function(e){return e.country===t.entry.country}))[0],i=r?r.states.reduce((function(t,e){return t.concat({state:e.province||e.state,cities:e.cities.sort()})}),[]):[];return e.concat(i)}),[]).sort((function(t,e){return t.state>e.state?1:t.state<e.state?-1:0}))},costList:function(){return this.costs.sort((function(t,e){return t.country>e.country||t.country==e.country&&t.city>e.city?1:t.country<e.country||t.country==e.country&&t.city<e.city?-1:0}))}},methods:{getCities:function(){var t=this;return a(i.a.mark((function e(){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/assets/cities");case 2:n=e.sent,r=n.data,t.cityRef=r;case 5:case"end":return e.stop()}}),e)})))()},getCosts:function(){var t=this;return a(i.a.mark((function e(){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get(c);case 2:n=e.sent,r=n.data,t.costs=r,t.loaded=!0;case 6:case"end":return e.stop()}}),e)})))()},toggleSaving:function(t){this.state.saving=t},toggleEntry:function(t){this.showEntry=t},setEntry:function(t,e,n,r,i){this.entry.country=t,this.entry.city=e,this.entry.rental_metre=n,this.entry.rental_foot=r,this.entry.furniture_cost=i},getEntry:function(){return{country:this.entry.country,city:this.entry.city,rental_metre:this.entry.rental_metre,rental_foot:this.entry.rental_foot,furniture_cost:this.entry.furniture_cost}},triggerAdd:function(){this.entry.id=null,this.setEntry("","",0,0,0),this.editMode=!1,this.toggleEntry(!0)},addSetting:function(){var t=this;return a(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.post(c,t.getEntry()).then((function(e){t.toggleSaving(!1);var n=e.data;n.r&&(t.costs.push(n.data),t.toggleEntry(!1)),t.$mdtoast(n.m,{type:n.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},triggerEdit:function(t){var e=this.costs.find((function(e){return e.hid===t}));this.entry.id=t,this.setEntry(e.country,e.city,e.rental_metre,e.rental_foot,e.furniture_cost),this.editMode=!0,this.toggleEntry(!0)},upSetting:function(){var t=this;return a(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.toggleSaving(!0),axios.put("".concat(c,"/").concat(t.entry.id),t.getEntry()).then((function(e){t.toggleSaving(!1);var n=e.data;if(n.r){var r=t.costs.find((function(e){return e.hid==t.entry.id}));r.country=t.entry.country,r.city=t.entry.city,r.rental_metre=t.entry.rental_metre,r.rental_foot=t.entry.rental_foot,r.furniture_cost=t.entry.furniture_cost,t.toggleEntry(!1)}t.$mdtoast(n.m,{type:n.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return e.stop()}}),e)})))()},delSetting:function(t){var e=this;return a(i.a.mark((function n(){var r,o,s;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o=(r=e).costs.findIndex((function(e){return e.hid===t})),s=r.costs[o],r.$duDialog(null,"Remove cost settings for ".concat(s.country," ").concat(s.city,"?"),{buttons:r.$duDialog.OK_CANCEL,okText:"Remove",callbacks:{okClick:function(e){this.hide(),r.toggleSaving(!0),axios.delete("".concat(c,"/").concat(t)).then((function(t){r.toggleSaving(!1);var e=t.data;e.r&&r.costs.splice(o,1),r.$mdtoast(e.m,{type:e.r?"success":"error",interaction:!0,interactionTimeout:5e3})}))}}});case 2:case"end":return n.stop()}}),n)})))()}},created:function(){this.getCities()},mounted:function(){this.getCosts()}},l=(n(144),n(3)),d=Object(l.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("h1",[t._v("Cost Settings")]),t._v(" "),n("transition",{attrs:{name:"fadeUp",appear:""}},[t.loaded?n("div",{attrs:{id:"cost-list"}},[n("table",[n("thead",[n("tr",[n("th",{attrs:{width:"200"}},[t._v("Country")]),t._v(" "),n("th",{attrs:{width:"200"}},[t._v("City")]),t._v(" "),n("th",[t._v("Rental per m"),n("sup",[t._v("2")])]),t._v(" "),n("th",[t._v("Rental per ft"),n("sup",[t._v("2")])]),t._v(" "),n("th",[t._v("Workspace Furniture Cost")])])]),t._v(" "),n("tbody",[0===t.costs.length?n("tr",[n("td",{attrs:{colspan:"5"}},[t._v("No records")])]):t._l(t.costList,(function(e){return n("tr",{key:e.hid,staticClass:"cost-item",on:{click:function(n){return t.triggerEdit(e.hid)}}},[n("td",[t._v(t._s(e.country))]),t._v(" "),n("td",[t._v(t._s(e.city))]),t._v(" "),n("td",[t._v(t._s(e.rental_metre.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})))]),t._v(" "),n("td",[t._v(t._s(e.rental_foot.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})))]),t._v(" "),n("td",[t._v(t._s(e.furniture_cost.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})))])])}))],2)]),t._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{id:"add-btn"},on:{click:t.triggerAdd}},[t._v("Add Setting")])]):t._e()]),t._v(" "),n("modal",{attrs:{show:t.showEntry},on:{close:function(e){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[n("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" Cost Setting")])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upSetting}},[t._v(t._s(t.state.saving?"Updating...":"Update"))]):n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addSetting}},[t._v(t._s(t.state.saving?"Adding...":"Add"))])]},proxy:!0}])},[t._v(" "),n("div",{attrs:{id:"cost-entry"}},[n("div",{staticClass:"input-field"},[n("label",[t._v("Country")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.country,expression:"entry.country"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"country",e.target.multiple?n:n[0])}}},t._l(t.countries,(function(e){return n("option",{key:e},[t._v(t._s(e))])})),0)]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("City/Town")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.entry.city,expression:"entry.city"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.entry,"city",e.target.multiple?n:n[0])}}},t._l(t.cities,(function(e){return n("optgroup",{key:e.state,attrs:{label:e.state}},t._l(e.cities,(function(r){return n("option",{key:e.state+"."+r},[t._v(t._s(r))])})),0)})),0)]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("Rental per m"),n("sup",[t._v("2")])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.rental_metre,expression:"entry.rental_metre"}],attrs:{type:"text"},domProps:{value:t.entry.rental_metre},on:{input:function(e){e.target.composing||t.$set(t.entry,"rental_metre",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("Rental per ft"),n("sup",[t._v("2")])]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.rental_foot,expression:"entry.rental_foot"}],attrs:{type:"text"},domProps:{value:t.entry.rental_foot},on:{input:function(e){e.target.composing||t.$set(t.entry,"rental_foot",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"input-field"},[n("label",[t._v("Workspace Furniture Cost")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.entry.furniture_cost,expression:"entry.furniture_cost"}],attrs:{type:"text"},domProps:{value:t.entry.furniture_cost},on:{input:function(e){e.target.composing||t.$set(t.entry,"furniture_cost",e.target.value)}}})])])]),t._v(" "),n("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"4c129049",null);e.default=d.exports},60:function(t,e,n){var r=n(145);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,i);r.locals&&(t.exports=r.locals)}}]);