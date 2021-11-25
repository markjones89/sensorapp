(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{151:function(e,t,n){"use strict";n(64)},152:function(e,t,n){(e.exports=n(6)(!1)).push([e.i,"#user-list[data-v-a14cc13c],#user-list #add-btn[data-v-a14cc13c]{margin-top:24px}.role-group+.role-group[data-v-a14cc13c]{margin-top:32px}.role-group .group-panel[data-v-a14cc13c]{display:flex;justify-content:space-between;border-bottom:1px solid hsla(0,0%,100%,.06)}.role-group .group-panel .role[data-v-a14cc13c]{padding:8px 0;font-size:20px}.role-group .group-panel .group-opt[data-v-a14cc13c]{cursor:pointer}.role-group .group-panel .group-opt[data-v-a14cc13c]:hover{text-decoration:underline}.role-group .user-list[data-v-a14cc13c]{border-collapse:collapse}.role-group .user-list th[data-v-a14cc13c]{text-align:left}.role-group .user-list td[data-v-a14cc13c],.role-group .user-list th[data-v-a14cc13c]{padding:0 8px;line-height:32px}.role-group .user-list .invite-lbl[data-v-a14cc13c]{margin-left:4px;font-size:14px;font-style:italic;color:orange}.role-group .user-list .you-lbl[data-v-a14cc13c]{margin-left:4px;font-size:14px;font-style:italic;color:grey}#entry-wrapper[data-v-a14cc13c]{position:relative;width:400px}",""])},310:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),i=n(5),s=n(4);function o(e,t,n,r,a,i,s){try{var o=e[i](s),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function s(e){o(i,r,a,s,l,"next",e)}function l(e){o(i,r,a,s,l,"throw",e)}s(void 0)}))}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p="/api/users",v={title:"Users",components:{Loader:s.f,Modal:s.h},data:function(){return{clients:[],roles:[],users:[],loaded:!1,showEntry:!1,editMode:!1,entry:{showClient:!1,client:null,role:"",name:"",email:"",id:null},state:{saving:!1}}},computed:u(u(u({},Object(i.d)({user:function(e){return e.user}})),Object(i.b)({api_header:"backend/api_header",api_customers:"backend/api_customers"})),{},{compId:function(){return this.user.isSuper?this.entry.client:this.user.company_id},groupedUsers:function(){var e=this;return this.roles.map((function(t){return{hid:t.hid,name:t.name,byClient:t.byCompany,users:e.users.filter((function(e){return e.role.hid===t.hid}))}}))}}),methods:{getDependencies:function(e){var t=this;return l(a.a.mark((function n(){var r,i,s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,axios.all([axios.get(t.api_customers,t.api_header()),axios.get("/users/init-dependencies")]);case 2:return r=n.sent,(i=r[1].data.clients)&&(s=r[0].data,t.clients=[],i.forEach((function(e){var n=s.find((function(t){return t.id==e.ref_id}));n&&(e.name=n.name,t.clients.push(e))}))),console.log("getDependencies.clients",t.clients),t.roles=r[1].data.roles,n.abrupt("return",e&&e());case 8:case"end":return n.stop()}}),n)})))()},getData:function(){var e=this;return l(a.a.mark((function t(){var n,r,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.user.isSuper?null:{params:{cid:e.compId}},t.next=3,axios.get(p,n);case 3:r=t.sent,(i=r.data).forEach((function(t){var n;t.company&&(t.company.name=null===(n=e.clients.find((function(e){return e.ref_id==t.company_id})))||void 0===n?void 0:n.name)})),e.users=i,e.loaded=!0;case 8:case"end":return t.stop()}}),t)})))()},toggleEntry:function(e){this.showEntry=e},triggerAdd:function(e,t){this.entry.showClient=t,this.entry.role=e,this.editMode=!1,this.toggleEntry(!0)},getEntry:function(){return{company:this.compId,name:this.entry.name,email:this.entry.email,role:this.entry.role}},toggleSaving:function(e){this.state.saving=e},addUser:function(){var e=this;return l(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.toggleSaving(!0),axios.post(p,e.getEntry()).then((function(t){e.toggleSaving(!1);var n=t.data;n.r&&(e.users.push(n.data),e.toggleEntry(!1)),e.$mdtoast(n.m,{type:n.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;this.getDependencies((function(){e.getData()}))}},f=(n(151),n(3)),m=Object(f.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("h1",[e._v("Users")]),e._v(" "),n("transition",{attrs:{name:"fadeUp",appear:""}},[e.loaded?n("div",{attrs:{id:"user-list"}},e._l(e.groupedUsers,(function(t){return n("div",{key:t.hid,staticClass:"role-group"},[n("div",{staticClass:"group-panel"},[n("span",{staticClass:"role"},[e._v(e._s(t.name))]),e._v(" "),n("div",{staticClass:"group-opts"},[n("a",{staticClass:"group-opt",on:{click:function(n){return e.triggerAdd(t.hid,t.byClient)}}},[e._v("Add")])])]),e._v(" "),n("table",{staticClass:"user-list"},[n("tbody",[0===t.users.length?n("tr",[n("td",[e._v("No users")])]):e._l(t.users,(function(t){return n("tr",{key:t.hid},[e.user.isSuper&&t.company?n("td",{attrs:{width:"200"}},[e._v(e._s(t.company.name))]):e._e(),e._v(" "),n("td",{attrs:{width:"250"}},[n("span",{staticClass:"user-name"},[e._v(e._s(t.name))]),e._v(" "),t.email_verified_at?e._e():n("span",{staticClass:"invite-lbl"},[e._v("(Invite sent)")]),e._v(" "),t.hid===e.user.hid?n("span",{staticClass:"you-lbl"},[e._v("(You)")]):e._e()]),e._v(" "),n("td",[n("span",{staticClass:"user-email"},[e._v(e._s(t.email))])])])}))],2)])])})),0):e._e()]),e._v(" "),n("modal",{attrs:{show:e.showEntry},on:{close:function(t){return e.toggleEntry(!1)}},scopedSlots:e._u([{key:"header",fn:function(){return[n("h2",[e._v(e._s(e.editMode?"Edit":"Add")+" User")])]},proxy:!0},{key:"footer",fn:function(){return[n("button",{staticClass:"btn btn-primary",attrs:{id:"send-btn",disabled:e.state.saving},on:{click:e.addUser}},[e._v(e._s(e.state.saving?"Sending...":"Send Invite"))])]},proxy:!0}])},[e._v(" "),n("div",{attrs:{id:"entry-wrapper"}},[n("div",{staticClass:"input-field"},[n("label",[e._v("Role")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.entry.role,expression:"entry.role"}],attrs:{disabled:""},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.entry,"role",t.target.multiple?n:n[0])}}},e._l(e.roles,(function(t){return n("option",{key:t.hid,domProps:{value:t.hid}},[e._v(e._s(t.name))])})),0)]),e._v(" "),e.entry.showClient&&e.user.isSuper?n("div",{staticClass:"input-field"},[n("label",[e._v("Client")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.entry.client,expression:"entry.client"}],attrs:{disabled:e.state.saving},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.entry,"client",t.target.multiple?n:n[0])}}},e._l(e.clients,(function(t){return n("option",{key:t.hid,domProps:{value:t.ref_id}},[e._v(e._s(t.name))])})),0)]):e._e(),e._v(" "),n("div",{staticClass:"input-field"},[n("label",[e._v("Name")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.entry.name,expression:"entry.name"}],ref:"name",attrs:{type:"text",disabled:e.state.saving},domProps:{value:e.entry.name},on:{input:function(t){t.target.composing||e.$set(e.entry,"name",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"input-field"},[n("label",[e._v("Email")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.entry.email,expression:"entry.email"}],attrs:{type:"email",disabled:e.state.saving},domProps:{value:e.entry.email},on:{input:function(t){t.target.composing||e.$set(e.entry,"email",t.target.value)}}})])])]),e._v(" "),n("loader",{attrs:{show:!e.loaded,type:"ripple"}})],1)}),[],!1,null,"a14cc13c",null);t.default=m.exports},64:function(e,t,n){var r=n(152);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(7)(r,a);r.locals&&(e.exports=r.locals)}}]);