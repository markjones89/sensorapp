(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{104:function(e,t,i){"use strict";i(40)},105:function(e,t,i){(e.exports=i(6)(!1)).push([e.i,"#app-verify[data-v-599c2821]{padding:92px 0;width:100%}#app-verify #verify-wrapper[data-v-599c2821]{width:300px;margin:0 auto;background-color:#282737;padding:24px;border-radius:10px}#app-verify #verify-wrapper h1[data-v-599c2821]{margin-bottom:24px;text-align:center}#app-verify #verify-wrapper #verified[data-v-599c2821]{text-align:center}",""])},289:function(e,t,i){"use strict";i.r(t);var r=i(0),n=i.n(r),a=i(1);function s(e,t,i,r,n,a,s){try{var o=e[a](s),c=o.value}catch(e){return void i(e)}o.done?t(c):Promise.resolve(c).then(r,n)}var o={data:function(){return{securityCode:"",pass:"",confPass:"",verified:!1,state:{verifying:!1}}},computed:{baseUrl:function(){return Object(a.e)()},uid:function(){return Object(a.l)("uid")},verifyUrl:function(){return"".concat("/api/users","/verify/").concat(this.uid)},canVerify:function(){return""!==this.securityCode&&""!==this.pass&&this.pass===this.confPass}},methods:{toggleVerify:function(e){this.state.verifying=e},verify:function(e){var t,i=this;return(t=n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.toggleVerify(!0),axios.put(i.verifyUrl,{security_code:i.securityCode,password:i.pass}).then((function(e){i.toggleVerify(!1),e.data.r&&(i.verified=!0)}));case 2:case"end":return e.stop()}}),e)})),function(){var e=this,i=arguments;return new Promise((function(r,n){var a=t.apply(e,i);function o(e){s(a,r,n,o,c,"next",e)}function c(e){s(a,r,n,o,c,"throw",e)}o(void 0)}))})()}}},c=(i(104),i(3)),u=Object(c.a)(o,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app-verify"}},[i("div",{attrs:{id:"verify-wrapper"}},[i("h1",[e._v("Account Verification")]),e._v(" "),e.verified?i("div",{attrs:{id:"verified"}},[i("p",[e._v("Account verification successful! You can now use your account.")]),e._v(" "),i("a",{staticClass:"btn btn-primary",attrs:{href:e.baseUrl+"/login"}},[e._v("Continue to login")])]):[i("p",[e._v("To finish the verification process, kindly enter your new password and the security code provided in the invitation email.")]),e._v(" "),i("div",{staticClass:"input-field"},[i("label",[e._v("New Password")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.pass,expression:"pass"}],attrs:{type:"password",autofocus:""},domProps:{value:e.pass},on:{input:function(t){t.target.composing||(e.pass=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"input-field"},[i("label",[e._v("Confirm Password")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.confPass,expression:"confPass"}],attrs:{type:"password"},domProps:{value:e.confPass},on:{input:function(t){t.target.composing||(e.confPass=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"input-field"},[i("label",[e._v("Security Code")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.securityCode,expression:"securityCode"}],attrs:{type:"text"},domProps:{value:e.securityCode},on:{input:function(t){t.target.composing||(e.securityCode=t.target.value)}}})]),e._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{disabled:e.state.verifying||!e.canVerify},on:{click:e.verify}},[e._v(e._s(e.state.verifying?"Verifying...":"Verify"))])]],2)])}),[],!1,null,"599c2821",null);t.default=u.exports},40:function(e,t,i){var r=i(105);"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(7)(r,n);r.locals&&(e.exports=r.locals)}}]);