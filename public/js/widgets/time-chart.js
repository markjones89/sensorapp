!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/sensor-app/",r(r.s=213)}({213:function(e,t,r){e.exports=r(214)},214:function(e,t,r){"use strict";r.r(t);var n=r(4),o=document.currentScript,c=o.src,u=o.parentNode,i=Object(n.b)(),a=Object(n.c)(c,"w")||900,f=Object(n.c)(c,"h")||450,l=Object(n.c)(c,"bc"),d="".concat("http://localhost/sensor-app","/").concat(i,"widgets/time-chart?w=").concat(a,"&h=").concat(f),s=document.createElement("iframe");s.setAttribute("src",d),s.setAttribute("allowtransparency",!0),s.setAttribute("width",a),s.setAttribute("height",f),s.setAttribute("frameborder","0"),s.setAttribute("scrolling","no"),l&&(s.style.backgroundColor=l),u.appendChild(s)},4:function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t="".concat("/sensor-app").concat(e?"/":"");return t}function o(e,t,r){Array.isArray(t)?t.forEach((function(t){return e.addEventListener(t,r)})):e.addEventListener(t,r)}function c(e,t,r){Array.isArray(t)?t.forEach((function(t){return e.removeEventListener(t,r)})):e.removeEventListener(t,r)}function u(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}function i(e,t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var r=new RegExp("[\\?&]"+t+"=([^&#]*)").exec(e);return null===r?"":decodeURIComponent(r[1].replace(/\+/g," "))}function a(e){var t=["th","st","nd","rd"];if(Array.isArray(e))return e.map((function(e){return a(e)}));var r=e%100;return e+(t[(r-20)%10]||t[r]||t[0])}function f(e,t){var r=new Image;r.onload=t,r.src="".concat(e)}r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o})),r.d(t,"f",(function(){return c})),r.d(t,"d",(function(){return u})),r.d(t,"c",(function(){return i})),r.d(t,"g",(function(){return a})),r.d(t,"e",(function(){return f}))}});