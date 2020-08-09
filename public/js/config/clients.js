(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{28:function(t,n,e){"use strict";var i=e(9);e.n(i).a},29:function(t,n,e){(t.exports=e(7)(!1)).push([t.i,"#client-list[data-v-f666ea20] {\n  margin-top: 24px;\n}\n#client-list #add-btn[data-v-f666ea20] {\n  margin-top: 24px;\n}\n.client[data-v-f666ea20] {\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 10px;\n  transition: background-color 0.24s linear;\n}\n.client[data-v-f666ea20]:hover {\n  background-color: rgba(255, 255, 255, 0.04);\n}\n.client .client-opts[data-v-f666ea20] {\n  line-height: 13px;\n}\n.client .client-opts .client-opt[data-v-f666ea20] {\n  font-size: 13px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.client .client-opts .client-opt[data-v-f666ea20]:hover {\n  text-decoration: underline;\n}\n#client-entry[data-v-f666ea20] {\n  width: 400px;\n}",""])},82:function(t,n,e){"use strict";e.r(n);var i=e(0),a=e.n(i),r=e(2);function o(t,n,e,i,a,r,o){try{var s=t[r](o),c=s.value}catch(t){return void e(t)}s.done?n(c):Promise.resolve(c).then(i,a)}function s(t){return function(){var n=this,e=arguments;return new Promise((function(i,a){var r=t.apply(n,e);function s(t){o(r,i,a,s,c,"next",t)}function c(t){o(r,i,a,s,c,"throw",t)}s(void 0)}))}}var c={title:"Clients",components:{Loader:r.b,Modal:r.d},data:function(){return{clients:[],cName:"",cId:null,loaded:!1,clientEntry:!1,editMode:!1,state:{saving:!1}}},computed:{clientList:function(){return this.clients.sort((function(t,n){return t.name>n.name?1:t.name<n.name?-1:0}))}},methods:{getData:function(){var t=this;return s(a.a.mark((function n(){var e,i;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.get("/api/clients");case 2:e=n.sent,i=e.data,t.clients=i,t.loaded=!0;case 6:case"end":return n.stop()}}),n)})))()},toggleEntry:function(t){var n=this;this.clientEntry=t,t&&setTimeout((function(){n.$refs.cName.focus()}),0)},toggleSaving:function(t){this.state.saving=t},triggerAdd:function(){this.cId=null,this.cName="",this.editMode=!1,this.toggleEntry(!0)},addClient:function(){var t=this;return s(a.a.mark((function n(){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),axios.post("/api/clients",{name:t.cName}).then((function(n){t.toggleSaving(!1);var e=n.data;e.r&&(t.clients.push(e.data),t.toggleEntry(!1))}));case 2:case"end":return n.stop()}}),n)})))()},triggerEdit:function(t){var n=this.clients.find((function(n){return n.hid===t}));console.log(t),this.cId=t,this.cName=n.name,this.editMode=!0,this.toggleEntry(!0)},upClient:function(){var t=this;return s(a.a.mark((function n(){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.toggleSaving(!0),axios.put("/api/clients/".concat(t.cId),{name:t.cName}).then((function(n){(t.toggleSaving(!1),n.data.r)&&(t.clients.find((function(n){return n.hid==t.cId})).name=t.cName,t.toggleEntry(!1))}));case 2:case"end":return n.stop()}}),n)})))()},delClient:function(t){var n=this;return s(a.a.mark((function e(){var i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n.clients.findIndex((function(n){return n.hid===t})),confirm("Remove ".concat(n.clients[i].name," from clients?"))&&(n.toggleSaving(!0),axios.delete("/api/clients/".concat(t)).then((function(t){n.toggleSaving(!1),t.data.r&&n.clients.splice(i,1)})));case 2:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.getData()}},l=(e(28),e(1)),d=Object(l.a)(c,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content"},[e("h1",[t._v("Clients")]),t._v(" "),e("transition",{attrs:{name:"fadeUp"}},[t.loaded?e("div",{attrs:{id:"client-list"}},[t._l(t.clientList,(function(n){return e("div",{key:n.hid,staticClass:"client"},[e("div",{staticClass:"client-opts"},[e("a",{staticClass:"client-opt",on:{click:function(e){return t.triggerEdit(n.hid)}}},[t._v("Edit")]),t._v(" "),e("a",{staticClass:"client-opt",on:{click:function(e){return t.delClient(n.hid)}}},[t._v("Remove")])]),t._v("\n                "+t._s(n.name)+"\n            ")])})),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{id:"add-btn"},on:{click:t.triggerAdd}},[t._v("Add Client")])],2):t._e()]),t._v(" "),e("modal",{attrs:{show:t.clientEntry},on:{close:function(n){return t.toggleEntry(!1)}},scopedSlots:t._u([{key:"header",fn:function(){return[e("h2",[t._v(t._s(t.editMode?"Edit":"Add")+" Client")])]},proxy:!0},{key:"footer",fn:function(){return[t.editMode?e("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.upClient}},[t._v(t._s(t.state.saving?"Updating...":"Update"))]):e("button",{staticClass:"btn btn-primary",attrs:{disabled:t.state.saving},on:{click:t.addClient}},[t._v(t._s(t.state.saving?"Adding...":"Add"))])]},proxy:!0}])},[t._v(" "),e("div",{attrs:{id:"client-entry"}},[e("div",{staticClass:"input-field"},[e("label",[t._v("Company Name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.cName,expression:"cName"}],ref:"cName",attrs:{type:"text"},domProps:{value:t.cName},on:{input:function(n){n.target.composing||(t.cName=n.target.value)}}})])])]),t._v(" "),e("loader",{attrs:{show:!t.loaded,type:"ripple"}})],1)}),[],!1,null,"f666ea20",null);n.default=d.exports},9:function(t,n,e){var i=e(29);"string"==typeof i&&(i=[[t.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};e(8)(i,a);i.locals&&(t.exports=i.locals)}}]);