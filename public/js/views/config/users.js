(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{146:function(e,t,r){"use strict";r(61)},147:function(e,t,r){(e.exports=r(6)(!1)).push([e.i,"#user-list[data-v-1082ab24],#user-list #add-btn[data-v-1082ab24]{margin-top:24px}.role-group+.role-group[data-v-1082ab24]{margin-top:32px}.role-group .group-panel[data-v-1082ab24]{display:flex;justify-content:space-between;border-bottom:1px solid hsla(0,0%,100%,.06)}.role-group .group-panel .role[data-v-1082ab24]{padding:8px 0;font-size:20px}.role-group .group-panel .group-opt[data-v-1082ab24]{cursor:pointer}.role-group .group-panel .group-opt[data-v-1082ab24]:hover{text-decoration:underline}.role-group .user-list[data-v-1082ab24]{border-collapse:collapse}.role-group .user-list th[data-v-1082ab24]{text-align:left}.role-group .user-list td[data-v-1082ab24],.role-group .user-list th[data-v-1082ab24]{padding:0 8px;line-height:32px}.role-group .user-list .invite-lbl[data-v-1082ab24]{margin-left:4px;font-size:14px;font-style:italic;color:orange}.role-group .user-list .you-lbl[data-v-1082ab24]{margin-left:4px;font-size:14px;font-style:italic;color:grey}#entry-wrapper[data-v-1082ab24]{position:relative;width:400px}",""])},305:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),i=r(5),s=r(4);function o(e,t,r,n,a,i,s){try{var o=e[i](s),l=o.value}catch(e){return void r(e)}o.done?t(l):Promise.resolve(l).then(n,a)}function l(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function s(e){o(i,n,a,s,l,"next",e)}function l(e){o(i,n,a,s,l,"throw",e)}s(void 0)}))}}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var p="/api/users",v={title:"Users",components:{Loader:s.f,Modal:s.h},data:function(){return{clients:[],roles:[],users:[],loaded:!1,showEntry:!1,editMode:!1,entry:{showClient:!1,client:null,role:"",name:"",email:"",id:null},state:{saving:!1}}},computed:c(c(c({},Object(i.e)({user:function(e){return e.user}})),Object(i.c)({api_header:"backend/api_header",api_customers:"backend/api_customers"})),{},{compId:function(){return this.user.isSuper?this.entry.client:this.user.company_id},groupedUsers:function(){var e=this;return this.roles.map((function(t){return{hid:t.hid,name:t.name,byClient:t.byCompany,users:e.users.filter((function(e){return e.role.hid===t.hid}))}}))}}),methods:{getDependencies:function(e){var t=this;return l(a.a.mark((function r(){var n,i,s;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,axios.all([axios.get(t.api_customers,t.api_header()),axios.get("/users/init-dependencies")]);case 2:return n=r.sent,(i=n[1].data.clients)&&(s=n[0].data,t.clients=[],i.forEach((function(e){var r=s.find((function(t){return t.id==e.ref_id}));r&&(e.name=r.name,t.clients.push(e))}))),t.roles=n[1].data.roles,r.abrupt("return",e&&e());case 7:case"end":return r.stop()}}),r)})))()},getData:function(){var e=this;return l(a.a.mark((function t(){var r,n,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.user.isSuper?null:{params:{cid:e.compId}},t.next=3,axios.get(p,r);case 3:n=t.sent,(i=n.data).forEach((function(t){var r;t.company&&(t.company.name=null===(r=e.clients.find((function(e){return e.ref_id==t.company_id})))||void 0===r?void 0:r.name)})),e.users=i,e.loaded=!0;case 8:case"end":return t.stop()}}),t)})))()},toggleEntry:function(e){this.showEntry=e},triggerAdd:function(e,t){this.entry.showClient=t,this.entry.role=e,this.editMode=!1,this.toggleEntry(!0)},getEntry:function(){return{company:this.compId,name:this.entry.name,email:this.entry.email,role:this.entry.role}},toggleSaving:function(e){this.state.saving=e},addUser:function(){var e=this;return l(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.toggleSaving(!0),axios.post(p,e.getEntry()).then((function(t){e.toggleSaving(!1);var r=t.data;r.r&&(e.users.push(r.data),e.toggleEntry(!1)),e.$mdtoast(r.m,{type:r.r?"success":"error",interaction:!0,interactionTimeout:5e3})}));case 2:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;this.getDependencies((function(){e.getData()}))}},f=(r(146),r(3)),m=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[r("h1",[e._v("Users")]),e._v(" "),r("transition",{attrs:{name:"fadeUp",appear:""}},[e.loaded?r("div",{attrs:{id:"user-list"}},e._l(e.groupedUsers,(function(t){return r("div",{key:t.hid,staticClass:"role-group"},[r("div",{staticClass:"group-panel"},[r("span",{staticClass:"role"},[e._v(e._s(t.name))]),e._v(" "),r("div",{staticClass:"group-opts"},[r("a",{staticClass:"group-opt",on:{click:function(r){return e.triggerAdd(t.hid,t.byClient)}}},[e._v("Add")])])]),e._v(" "),r("table",{staticClass:"user-list"},[r("tbody",[0===t.users.length?r("tr",[r("td",[e._v("No users")])]):e._l(t.users,(function(t){return r("tr",{key:t.hid},[e.user.isSuper&&t.company?r("td",{attrs:{width:"200"}},[e._v(e._s(t.company.name))]):e._e(),e._v(" "),r("td",{attrs:{width:"250"}},[r("span",{staticClass:"user-name"},[e._v(e._s(t.name))]),e._v(" "),t.email_verified_at?e._e():r("span",{staticClass:"invite-lbl"},[e._v("(Invite sent)")]),e._v(" "),t.hid===e.user.hid?r("span",{staticClass:"you-lbl"},[e._v("(You)")]):e._e()]),e._v(" "),r("td",[r("span",{staticClass:"user-email"},[e._v(e._s(t.email))])])])}))],2)])])})),0):e._e()]),e._v(" "),r("modal",{attrs:{show:e.showEntry},on:{close:function(t){return e.toggleEntry(!1)}},scopedSlots:e._u([{key:"header",fn:function(){return[r("h2",[e._v(e._s(e.editMode?"Edit":"Add")+" User")])]},proxy:!0},{key:"footer",fn:function(){return[r("button",{staticClass:"btn btn-primary",attrs:{id:"send-btn",disabled:e.state.saving},on:{click:e.addUser}},[e._v(e._s(e.state.saving?"Sending...":"Send Invite"))])]},proxy:!0}])},[e._v(" "),r("div",{attrs:{id:"entry-wrapper"}},[r("div",{staticClass:"input-field"},[r("label",[e._v("Role")]),e._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.entry.role,expression:"entry.role"}],attrs:{disabled:""},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.entry,"role",t.target.multiple?r:r[0])}}},e._l(e.roles,(function(t){return r("option",{key:t.hid,domProps:{value:t.hid}},[e._v(e._s(t.name))])})),0)]),e._v(" "),e.entry.showClient&&e.user.isSuper?r("div",{staticClass:"input-field"},[r("label",[e._v("Client")]),e._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.entry.client,expression:"entry.client"}],attrs:{disabled:e.state.saving},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.entry,"client",t.target.multiple?r:r[0])}}},e._l(e.clients,(function(t){return r("option",{key:t.hid,domProps:{value:t.hid}},[e._v(e._s(t.name))])})),0)]):e._e(),e._v(" "),r("div",{staticClass:"input-field"},[r("label",[e._v("Name")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.entry.name,expression:"entry.name"}],ref:"name",attrs:{type:"text",disabled:e.state.saving},domProps:{value:e.entry.name},on:{input:function(t){t.target.composing||e.$set(e.entry,"name",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"input-field"},[r("label",[e._v("Email")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.entry.email,expression:"entry.email"}],attrs:{type:"email",disabled:e.state.saving},domProps:{value:e.entry.email},on:{input:function(t){t.target.composing||e.$set(e.entry,"email",t.target.value)}}})])])]),e._v(" "),r("loader",{attrs:{show:!e.loaded,type:"ripple"}})],1)}),[],!1,null,"1082ab24",null);t.default=m.exports},61:function(e,t,r){var n=r(147);"string"==typeof n&&(n=[[e.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(7)(n,a);n.locals&&(e.exports=n.locals)}}]);