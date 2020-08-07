(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{14:function(e,t,n){var r=n(39);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(8)(r,a);r.locals&&(e.exports=r.locals)},38:function(e,t,n){"use strict";var r=n(14);n.n(r).a},39:function(e,t,n){(e.exports=n(7)(!1)).push([e.i,"#user-list[data-v-0ec12137] {\n  margin-top: 24px;\n}\n#user-list #add-btn[data-v-0ec12137] {\n  margin-top: 24px;\n}\n.role-group + .role-group[data-v-0ec12137] {\n  margin-top: 32px;\n}\n.role-group .group-panel[data-v-0ec12137] {\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.role-group .group-panel .role[data-v-0ec12137] {\n  padding: 8px 0;\n  font-size: 20px;\n}\n.role-group .group-panel .group-opt[data-v-0ec12137] {\n  cursor: pointer;\n}\n.role-group .group-panel .group-opt[data-v-0ec12137]:hover {\n  text-decoration: underline;\n}\n.role-group .user-list[data-v-0ec12137] {\n  border-collapse: collapse;\n}\n.role-group .user-list th[data-v-0ec12137] {\n  padding: 0 8px;\n  text-align: left;\n  line-height: 32px;\n}\n.role-group .user-list td[data-v-0ec12137] {\n  padding: 0 8px;\n  line-height: 32px;\n}\n.role-group .user-list .invite-lbl[data-v-0ec12137] {\n  margin-left: 4px;\n  font-size: 14px;\n  font-style: italic;\n  color: orange;\n}\n.role-group .user-list .you-lbl[data-v-0ec12137] {\n  margin-left: 4px;\n  font-size: 14px;\n  font-style: italic;\n  color: grey;\n}\n#entry-wrapper[data-v-0ec12137] {\n  position: relative;\n  width: 400px;\n}",""])},85:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(6),i=n(2);function o(e,t,n,r,a,s,i){try{var o=e[s](i),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function i(e){o(s,r,a,i,l,"next",e)}function l(e){o(s,r,a,i,l,"throw",e)}i(void 0)}))}}var u="/api/users",d={title:"Users",components:{Loader:i.a,Modal:i.c},data:function(){return{user:null,clients:[],roles:[],users:[],loaded:!1,showEntry:!1,editMode:!1,entry:{showClient:!1,client:null,role:"",name:"",email:"",id:null},state:{saving:!1}}},computed:{userCompany:function(){return this.user?this.user.company.name:null},compId:function(){return this.user.isSuper?this.entry.client:s.a.getUser().cid},groupedUsers:function(){var e=this;return this.roles.map((function(t){return{hid:t.hid,name:t.name,byClient:t.byCompany,users:e.users.filter((function(e){return e.role.hid===t.hid}))}}))}},methods:{getDependencies:function(){var e=this;return l(a.a.mark((function t(){var n,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s.a.getUser().cid,t.next=3,axios.get("/users/init-dependencies");case 3:n=t.sent,r=n.data,e.clients=r.clients,e.roles=r.roles;case 7:case"end":return t.stop()}}),t)})))()},getData:function(){var e=this;return l(a.a.mark((function t(){var n,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios.get(e.user.isSuper?u:"".concat(u,"/").concat(e.compId));case 2:n=t.sent,r=n.data,e.users=r,e.loaded=!0;case 6:case"end":return t.stop()}}),t)})))()},toggleEntry:function(e){this.showEntry=e},triggerAdd:function(e,t){this.entry.showClient=t,this.entry.role=e,this.editMode=!1,this.toggleEntry(!0)},getEntry:function(){return{company:this.compId,name:this.entry.name,email:this.entry.email,role:this.entry.role}},toggleSaving:function(e){this.state.saving=e},addUser:function(){var e=this;return l(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.toggleSaving(!0),axios.post(u,e.getEntry()).then((function(t){e.toggleSaving(!1);var n=t.data;console.log(n),n.r&&(e.users.push(n.data),e.toggleEntry(!1))}));case 2:case"end":return t.stop()}}),t)})))()}},created:function(){this.user=s.a.getUser(),this.getDependencies()},mounted:function(){this.getData()}},c=(n(38),n(1)),p=Object(c.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("h1",[e._v(e._s(e.user.isAdmin?e.userCompany+" Users":"Users"))]),e._v(" "),n("transition",{attrs:{name:"fadeUp",appear:""}},[e.loaded?n("div",{attrs:{id:"user-list"}},e._l(e.groupedUsers,(function(t){return n("div",{key:t.hid,staticClass:"role-group"},[n("div",{staticClass:"group-panel"},[n("span",{staticClass:"role"},[e._v(e._s(t.name))]),e._v(" "),n("div",{staticClass:"group-opts"},[n("a",{staticClass:"group-opt",on:{click:function(n){return e.triggerAdd(t.hid,t.byClient)}}},[e._v("Add")])])]),e._v(" "),n("table",{staticClass:"user-list"},[n("tbody",[0===t.users.length?n("tr",[n("td",[e._v("No users")])]):e._l(t.users,(function(t){return n("tr",{key:t.hid},[e.user.isSuper&&t.company?n("td",{attrs:{width:"200"}},[e._v(e._s(t.company.name))]):e._e(),e._v(" "),n("td",{attrs:{width:"250"}},[n("span",{staticClass:"user-name"},[e._v(e._s(t.name))]),e._v(" "),t.email_verified_at?e._e():n("span",{staticClass:"invite-lbl"},[e._v("(Invite sent)")]),e._v(" "),t.hid===e.user.hid?n("span",{staticClass:"you-lbl"},[e._v("(You)")]):e._e()]),e._v(" "),n("td",[n("span",{staticClass:"user-email"},[e._v(e._s(t.email))])]),e._v(" "),n("td",[e._v("\n                                options here...\n                            ")])])}))],2)])])})),0):e._e()]),e._v(" "),n("modal",{attrs:{show:e.showEntry},on:{close:function(t){return e.toggleEntry(!1)}},scopedSlots:e._u([{key:"header",fn:function(){return[n("h2",[e._v(e._s(e.editMode?"Edit":"Add")+" User")])]},proxy:!0},{key:"footer",fn:function(){return[n("button",{staticClass:"btn btn-primary",attrs:{id:"send-btn",disabled:e.state.saving},on:{click:e.addUser}},[e._v(e._s(e.state.saving?"Sending...":"Send Invite"))])]},proxy:!0}])},[e._v(" "),n("div",{attrs:{id:"entry-wrapper"}},[n("div",{staticClass:"input-field"},[n("label",[e._v("Role")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.entry.role,expression:"entry.role"}],attrs:{disabled:""},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.entry,"role",t.target.multiple?n:n[0])}}},e._l(e.roles,(function(t){return n("option",{key:t.hid,domProps:{value:t.hid}},[e._v(e._s(t.name))])})),0)]),e._v(" "),e.entry.showClient&&e.user.isSuper?n("div",{staticClass:"input-field"},[n("label",[e._v("Client")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.entry.client,expression:"entry.client"}],attrs:{disabled:e.state.saving},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.entry,"client",t.target.multiple?n:n[0])}}},e._l(e.clients,(function(t){return n("option",{key:t.hid,domProps:{value:t.hid}},[e._v(e._s(t.name))])})),0)]):e._e(),e._v(" "),n("div",{staticClass:"input-field"},[n("label",[e._v("Name")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.entry.name,expression:"entry.name"}],ref:"name",attrs:{type:"text",disabled:e.state.saving},domProps:{value:e.entry.name},on:{input:function(t){t.target.composing||e.$set(e.entry,"name",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"input-field"},[n("label",[e._v("Email")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.entry.email,expression:"entry.email"}],attrs:{type:"email",disabled:e.state.saving},domProps:{value:e.entry.email},on:{input:function(t){t.target.composing||e.$set(e.entry,"email",t.target.value)}}})])])]),e._v(" "),n("loader",{attrs:{show:!e.loaded,type:"ripple"}})],1)}),[],!1,null,"0ec12137",null);t.default=p.exports}}]);