!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/sensor-app/",r(r.s=249)}({249:function(t,e,r){t.exports=r(250)},250:function(t,e,r){"use strict";r.r(e);var n=r(5),o=document.currentScript,c=o.src,u=o.parentNode,a=Object(n.c)(),i=Object(n.d)(c,"w")||900,f=Object(n.d)(c,"h")||450,l=Object(n.d)(c,"bc"),d="".concat("http://localhost/sensor-app","/").concat(a,"widgets/time-chart?w=").concat(i,"&h=").concat(f),p=document.createElement("iframe");p.setAttribute("src",d),p.setAttribute("allowtransparency",!0),p.setAttribute("width",i),p.setAttribute("height",f),p.setAttribute("frameborder","0"),p.setAttribute("scrolling","no"),l&&(p.style.backgroundColor=l),u.appendChild(p)},5:function(t,e,r){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e="".concat("/sensor-app").concat(t?"/":"");return e}function o(t,e,r){Array.isArray(e)?e.forEach((function(e){return t.addEventListener(e,r)})):t.addEventListener(e,r)}function c(t,e,r){Array.isArray(e)?e.forEach((function(e){return t.removeEventListener(e,r)})):t.removeEventListener(e,r)}function u(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var e=new RegExp("[\\?&]"+t+"=([^&#]*)").exec(location.search);return null===e?"":decodeURIComponent(e[1].replace(/\+/g," "))}function a(t,e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var r=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return null===r?"":decodeURIComponent(r[1].replace(/\+/g," "))}function i(t){if(0===t)return"Ground";var e=["th","st","nd","rd"];if(Array.isArray(t))return t.map((function(t){return i(t)}));var r=t%100;return t+(e[(r-20)%10]||e[r]||e[0])}function f(t,e){var r=new Image;r.onload=e,r.src="".concat(t)}function l(){var t={},e=!1,r=0,n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],r++);for(var o=function(r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e&&"[object Object]"===Object.prototype.toString.call(r[n])?t[n]=l(!0,t[n],r[n]):t[n]=r[n])};r<n;r++){var c=arguments[r];o(c)}return t}r.d(e,"c",(function(){return n})),r.d(e,"a",(function(){return o})),r.d(e,"g",(function(){return c})),r.d(e,"e",(function(){return u})),r.d(e,"d",(function(){return a})),r.d(e,"h",(function(){return i})),r.d(e,"f",(function(){return f})),r.d(e,"b",(function(){return l}))}});