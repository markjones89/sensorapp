(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{148:function(t,e,r){"use strict";r(62)},149:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,'.apexcharts-canvas svg{pointer-events:auto}.section-header{margin:0;padding:4px;font-weight:500;border-bottom:1px solid #000}.graph-loading{pointer-events:none}.graph-error,.graph-loading{display:flex;justify-content:center;align-items:center;font-size:1.1em;color:grey;height:350px}.graph-error,.insight-card{flex-direction:column}.insight-card{display:flex;text-align:center;color:#fff;margin-top:16px;padding:8px;background-color:#000}.insight-card.red{background-color:red}.insight-card .insight-title{font-size:.8em}.insight-card .insight-percent{font-size:1.6em;font-weight:500;padding:4px 0}.insight-card .insight-rooms,.insight-card .insight-seats{font-size:1.2em;font-weight:500}.insight-keys{margin-top:16px}.insight-keys ul{list-style:none;padding:0;margin:0}.insight-keys li{position:relative;font-size:.7em;padding:4px 4px 4px 24px}.insight-keys li:before{content:"";display:block;position:absolute;left:0;top:50%;width:16px;height:12px;background-color:#000;border-radius:4px;transform:translateY(-50%)}.insight-keys li.red:before{background-color:red}.meeting-room-util+.hourly-meeting-room-util,.workstation-util+.meeting-room-util{margin-top:48px}',""])},150:function(t,e,r){"use strict";r(63)},151:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,".rpt-container[data-v-44748987]{width:1200px;margin:0 auto;padding:0 8px}@media print{@page{size:A4 landscape;h2{page-break-before:always}h2,h3,h4{page-break-after:avoid}}.report-header[data-v-44748987]{display:none}}",""])},307:function(t,e,r){"use strict";r.r(e);var i=r(0),o=r.n(i),n=r(5),a=r(12),s=r(10),l=r(1),c=r(11),u=r.n(c);function p(t,e,r,i,o,n,a){try{var s=t[n](a),l=s.value}catch(t){return void r(t)}s.done?e(l):Promise.resolve(l).then(i,o)}function d(t){return function(t){if(Array.isArray(t))return m(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return m(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}function g(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?g(Object(r),!0).forEach((function(e){h(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var v={title:"Intuitive Report",components:{RippleLoader:s.a,apexchart:u.a,MonthlyWorkstationUtil:a.h,MonthlyMeetingRoomUtil:a.g,HourlyMeetingRoomUtil:a.c,TabularStats:a.i,MRUtilVSTotalHours:a.e,MRSupplyVsMeetingSize:a.d,MeetingRoomPerformance:a.f},props:{trigger:{type:Number,default:6},cid:{type:String,required:!0},bid:{type:String,required:!0},year:{type:Number,required:!0},month:{type:Number,required:!0},start_hour:{type:Number,required:!0},stop_hour:{type:Number,required:!0}},data:function(){return{checkAuthInterval:null,dataLoaded:!1,dataError:!1,company:null,building:null,floorWorkUtils:[],roomSizeVSMeetingSizeFooter:null}},computed:f(f(f({},Object(n.e)({authToken:function(t){return t.backend.authToken}})),Object(n.c)({api_header:"backend/api_header",api_customers:"backend/api_customers",api_building_overview:"backend/api_building_overview",api_workspace_utils_daily_rpt:"backend/api_workspace_utils_daily_rpt",api_room_vs_meeting_size_rpt:"backend/api_room_vs_meeting_size_rpt"})),{},{baseUrl:function(){return Object(l.d)()},floors:function(){var t=d(this.building.children);return t.sort((function(t,e){var r=parseInt(t.number),i=parseInt(e.number);return r>i?1:r<i?-1:0}))},floorNumbers:function(){return"".concat(this.floors.map((function(t){return Object(l.u)(t.number)})).join(", ")," Floors")},timeRange:function(){return"".concat(Object(l.l)(this.start_hour)," to ").concat(Object(l.l)(this.stop_hour))},monthName:function(){return Object(l.f)(this.month)}}),methods:{getBuildingOverview:function(){var t,e=this;return(t=o.a.mark((function t(){var r,i,n,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,axios.all([axios.get(e.api_customers,e.api_header()),axios.get("/api/clients",{params:{rid:e.cid}}),axios.get(e.api_building_overview(e.cid,e.bid),e.api_header())]);case 3:r=t.sent,i=r[0].data,n=r[1].data,(a=i.find((function(t){return t.id==e.cid})))&&n&&(a.hid=n.hid,a.logo=n.logo),e.company=a,e.building=r[2].data,e.dataLoaded=!0,e.dataError=!1,t.next=19;break;case 14:t.prev=14,t.t0=t.catch(0),e.dataLoaded=!0,e.dataError=!0,console.log("getBuildingOverview.error",t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,14]])})),function(){var e=this,r=arguments;return new Promise((function(i,o){var n=t.apply(e,r);function a(t){p(n,i,o,a,s,"next",t)}function s(t){p(n,i,o,a,s,"throw",t)}a(void 0)}))})()},retry:function(){this.dataLoaded=!1,this.getBuildingOverview()},rptApiParams:function(t,e){var r=Object(l.g)(this.year,this.month);return{trigger:this.trigger,start_hour:this.start_hour,stop_hour:this.stop_hour,start_date:r.start,stop_date:r.end,node_id:e,node_type:t}},ordinalFloor:function(t){return"".concat(Object(l.u)(t)," Floor")},roomMeetingSizeLoaded:function(t){t.sort((function(t,e){var r=t.room_type.indexOf("(")>=0?Object(l.m)(Object(l.j)(t.room_type),3):t.room_type,i=Object(l.m)(Object(l.e)(t.meeting_type),3),o="".concat(r," | ").concat(i),n=e.room_type.indexOf("(")>=0?Object(l.m)(Object(l.j)(e.room_type),3):e.room_type,a=Object(l.m)(Object(l.e)(e.meeting_type),3),s="".concat(n," | ").concat(a);return o>s?1:o<s?-1:0}));var e=Object(l.p)(t.filter((function(t){return"Overall"==t.room_type&&["1 PAX Meeting Sizes","2 PAX Meeting Sizes"].indexOf(t.meeting_type)>=0})).map((function(t){return t.percentage})).reduce((function(t,e){return t+e})),1);this.roomSizeVSMeetingSizeFooter="1 and 2 person meetings make up ".concat(e,"% of all meeting sizes")}},mounted:function(){var t=this;null==this.authToken?this.checkAuthInterval=setInterval((function(){t.authToken&&(t.getBuildingOverview(),clearInterval(t.checkAuthInterval))}),500):this.getBuildingOverview()}},b=(r(148),r(150),r(3)),y=Object(b.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"report"},[r("div",{staticClass:"report-header"},[r("div",{staticClass:"report-name"},[t._v(t._s(t.monthName+" "+t.year)+" Intuitive Report")]),t._v(" "),r("div",{staticClass:"report-options"})]),t._v(" "),r("div",{staticClass:"report-content"},[t.dataLoaded?t.dataLoaded&&t.dataError?r("div",{staticClass:"rpt-error"},[r("p",[t._v("An error occured while getting the report data, please try again.")]),t._v(" "),r("a",{attrs:{href:"javascript:;"},on:{click:t.retry}},[t._v("Try again")])]):t.dataLoaded?r("div",{staticClass:"rpt-container",staticStyle:{width:"1100px"}},[r("div",{staticClass:"rpt-cover"},[r("div",{staticClass:"cover-logo"},[r("img",{attrs:{src:t.baseUrl+"/storage/logos/"+t.company.logo}})]),t._v(" "),r("div",{staticClass:"cover-box"},[r("h1",[t._v(t._s(t.building.name))]),t._v(" "),r("h2",[t._v("Utilisation Report Data")]),t._v(" "),r("h3",[t._v("Analytics service")]),t._v(" "),r("span",[t._v(t._s(t.monthName)+" "+t._s(t.year))])])]),t._v(" "),r("monthly-workstation-util",{attrs:{overall:!0,floor:t.floorNumbers,time:t.timeRange,query:t.rptApiParams("Building",t.bid)}}),t._v(" "),t._l(t.floors,(function(e){return r("monthly-workstation-util",{key:"WS:"+e.id,attrs:{floor:t.ordinalFloor(e.number),time:t.timeRange,query:t.rptApiParams("Floor",e.id)}})})),t._v(" "),r("monthly-meeting-room-util",{attrs:{overall:!0,floor:t.floorNumbers,time:t.timeRange,query:t.rptApiParams("Building",t.bid)}}),t._v(" "),t._l(t.floors,(function(e){return r("monthly-meeting-room-util",{key:"MR:"+e.id,attrs:{floor:t.ordinalFloor(e.number),time:t.timeRange,query:t.rptApiParams("Floor",e.id)}})})),t._v(" "),r("hourly-meeting-room-util",{attrs:{overall:!0,floor:t.floorNumbers,time:t.timeRange,query:t.rptApiParams("Building",t.bid)}}),t._v(" "),r("tabular-stats",{attrs:{title:"MEETING ROOM SIZES RELATIVE TO SIZE OF MEETINGS OBSERVED",api:t.api_room_vs_meeting_size_rpt,query:t.rptApiParams("Building",t.bid),footer:t.roomSizeVSMeetingSizeFooter,colKey:"meeting_type",rowKey:"room_type",valKey:"percentage"},on:{dataLoaded:t.roomMeetingSizeLoaded}}),t._v(" "),r("m-r-supply-vs-meeting-size",{attrs:{query:t.rptApiParams("Building",t.bid)}}),t._v(" "),t._l(t.floors,(function(e){return r("meeting-room-performance",{key:"MRPerf:"+e.id,attrs:{floor:"Level "+e.number,query:t.rptApiParams("Floor",e.id)}})})),t._v(" "),r("m-r-util-v-s-total-hours",{attrs:{query:t.rptApiParams("Building",t.bid)}})],2):t._e():r("div",{staticClass:"rpt-loading"},[r("ripple-loader"),t._v(" "),r("span",[t._v("Loading...")])],1)])])}),[],!1,null,"44748987",null);e.default=y.exports},62:function(t,e,r){var i=r(149);"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(7)(i,o);i.locals&&(t.exports=i.locals)},63:function(t,e,r){var i=r(151);"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(7)(i,o);i.locals&&(t.exports=i.locals)}}]);