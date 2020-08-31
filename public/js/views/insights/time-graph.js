(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{14:function(t,r,a){var e=a(84);"string"==typeof e&&(e=[[t.i,e,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(8)(e,n);e.locals&&(t.exports=e.locals)},15:function(t,r,a){var e=a(86);"string"==typeof e&&(e=[[t.i,e,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a(8)(e,n);e.locals&&(t.exports=e.locals)},213:function(t,r,a){"use strict";a.r(r);var e=a(4),n=a(5),o=a(2),i=a(6),s=a(48),c={title:"Time Chart",components:{CaretIcon:i.a,CaretLeftIcon:i.b,Checkbox:o.a,DateRangeToggle:o.c,Modal:o.g,TimeSlider:o.h},data:function(){return{user:null,showPageOpts:!1,showEmbed:!1,timeFilter:{start:null,end:null}}},computed:{baseUrl:function(){return Object(n.b)()},settings:function(){return this.user.company?this.user.company.settings:null}},methods:{backTo:function(){this.$router.back()},rangeSelect:function(t,r,a){console.log("rangeSelect",t,r,a)},toggleEmbed:function(t){t&&(this.showPageOpts=!1),this.showEmbed=t},timeStartChange:function(t){this.timeFilter.start=t},timeEndChange:function(t){this.timeFilter.end=t},viewCostAnalysis:function(){this.$router.push({name:"cost-analysis"})},toLive:function(){this.$router.push({name:"occupancy"})}},created:function(){this.user=e.a.getUser()},mounted:function(){var t=this;Object(s.a)("#time-chart","".concat(this.baseUrl,"/data/time-chart-data.json"),!1,{toPeakChart:function(r){console.log("toPeakChart",r),t.$router.push({name:"peak"})}})}},l=(a(83),a(85),a(3)),u=Object(l.a)(c,(function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"content"},[a("div",{staticClass:"graph-header"},[a("date-range-toggle",{on:{select:t.rangeSelect}}),t._v(" "),a("div",{staticClass:"graph-filters"},[a("span",{staticClass:"graph-filter"},[t._v("\n                Filter By\n                "),a("span",{staticClass:"caret"},[a("caret-icon")],1)]),t._v(" "),a("span",{staticClass:"graph-filter"},[t._v("\n                Select Location\n                "),a("span",{staticClass:"caret"},[a("caret-icon")],1)]),t._v(" "),a("a",{staticClass:"btn btn-primary",attrs:{href:"javascript:;",id:"cost-analysis-btn"},on:{click:t.viewCostAnalysis}},[t._v("Cost Analysis")])]),t._v(" "),a("span",{staticClass:"page-opt-trigger",attrs:{role:"button"},on:{click:function(r){t.showPageOpts=!t.showPageOpts}}},[a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"}),t._v(" "),a("span",{staticClass:"dot"})]),t._v(" "),a("transition",{attrs:{name:"fadeUp"}},[t.showPageOpts?a("div",{staticClass:"page-opt-panel"},[a("ul",[a("li",[a("a",{on:{click:function(r){return t.toggleEmbed(!0)}}},[t._v("Embed")])])])]):t._e()])],1),t._v(" "),a("div",{staticClass:"graph-content"},[a("div",{staticClass:"page-back"},[a("div",{staticClass:"back-button",on:{click:t.backTo}},[a("button",{staticClass:"btn btn-primary btn-small"},[a("caret-left-icon")],1),t._v("\n                Back\n            ")])]),t._v(" "),a("div",{attrs:{id:"time-chart"}}),t._v(" "),a("time-slider",{attrs:{from:t.settings?t.settings.start_time:null,to:t.settings?t.settings.end_time:null},on:{startChanged:t.timeStartChange,endChanged:t.timeEndChange}}),t._v(" "),a("div",{staticClass:"clearfix"})],1),t._v(" "),a("div",{staticClass:"graph-footer"},[a("div",{staticClass:"left-options"},[a("button",{staticClass:"btn btn-primary btn-small",on:{click:t.toLive}},[t._v("Live")])]),t._v(" "),a("div",{staticClass:"right-options"},[a("checkbox",{attrs:{label:"Save to report"}})],1)])])}),[],!1,null,"eeb1b166",null);r.default=u.exports},48:function(t,r,a){"use strict";a.d(r,"a",(function(){return n}));var e=a(0);function n(t,r,a,n){var o,i=e.w(t),s=0,c=i.node().getBoundingClientRect().width-(a?0:17),l=i.node().getBoundingClientRect().height||600,u=.4*c,h=l/2,d=l/3,p=d+12,f=.75*d*2;function m(t){return Math.PI/180*t}function g(t){var r,a,e=t.sum(),n=[],o=t.length;for(a=0;a<o;a++)r=100*t[a]/e,n.push(r>=0?r:0);return n}Array.prototype.sum=function(t){var r,a=0,e=this.length;for(r=0;r<e;r++)if("number"==typeof this[r]){if(t&&this[r]<0)continue;a+=this[r]}return a};var y=e.x({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),v=e.z("%Y-%m-%dT%H:%M:%S.%LZ"),b=y.format("%A %d, %H:%M"),x=["eol","hid","sol","aut","gf","nuc","car","cc"],C={eol:{id:"eol",nombre:"Wind",nombreAbrev:"Wind",color:"7EAADD",highlightColor:"c6d1dd",icon:"\\e82b"},hid:{id:"hid",nombre:"Hydroelectric",nombreAbrev:"Hydroelectric",color:"33537A",highlightColor:"446fa4",icon:"\\e82d"},sol:{id:"sol",nombre:"Solar/Solar Thermal",nombreAbrev:"Solar/S.Thermal",color:"F5A623",highlightColor:"f5cc89",icon:"\\e82c"},aut:{id:"aut",nombre:"Special Scheme",nombreAbrev:"Special S.",color:"9B9B9B",highlightColor:"bdbdbd",icon:"\\e800"},gf:{id:"gf",nombre:"Gas + Fuel",nombreAbrev:"Gas+Fuel",color:"6F93A4",highlightColor:"96C6DD",icon:"\\e806"},nuc:{id:"nuc",nombre:"Nuclear",nombreAbrev:"Nuclear",color:"BD10E0",highlightColor:"d712ff",icon:"\\e807"},car:{id:"car",nombre:"Coal",nombreAbrev:"Coal",color:"583636",highlightColor:"795d5d",icon:"\\e805"},cc:{id:"cc",nombre:"Combined Cycle",nombreAbrev:"Combined C.",color:"3D4163",highlightColor:"686fa9",icon:"\\e804"}},w={eol:{med24h:0,percent24h:[]},hid:{med24h:0,percent24h:[]},sol:{med24h:0,percent24h:[]},aut:{med24h:0,percent24h:[]},gf:{med24h:0,percent24h:[]},nuc:{med24h:0,percent24h:[]},car:{med24h:0,percent24h:[]},cc:{med24h:0,percent24h:[]}},k={dem:!0,icb:!0,inter:!0,car:!0,aut:!0,sol:!0,cc:!0,hid:!0,gf:!0,nuc:!0,eol:!0,ts:!0},M=i.append("svg").attr("class","time-chart").attr("width",c).attr("height",l),_=M.append("defs").append("filter").attr("id","brightness").append("feComponentTransfer");_.append("feFuncR").attr("type","linear").attr("slope","1.25"),_.append("feFuncG").attr("type","linear").attr("slope","1.25"),_.append("feFuncB").attr("type","linear").attr("slope","1.25"),M.append("g").attr("id","base"),M.append("circle").attr("id","circleBG").attr("r",d).attr("cx",u).attr("cy",h).attr("fill","#222222"),M.append("g").attr("id","horas");M.append("g").attr("id","hostRads");var A,S,B=M.append("g").attr("id","consumo"),D=B.append("circle").attr("r",d).attr("cx",u).attr("cy",h).attr("stroke","#990000").attr("fill","none").attr("stroke-dasharray",3).attr("stroke-width",2).attr("stroke-opacity",0),j=M.append("g").attr("id","consumo-dot"),T=j.append("circle").attr("r",5).attr("cx",-9999).attr("cy",-9999).attr("stroke","none").attr("fill","#900"),F=e.w("svg #horas").attr("transform","translate("+u+","+h+")"),H=e.u().domain([0,1440]).range([0,360]),P=new Date,E=H(60*P.getHours()+P.getMinutes()),O=M.append("circle").attr("id","circleHour").attr("r",3).attr("cx",u+(d+12)*Math.sin(m(540-E))).attr("cy",h+(d+12)*Math.cos(m(540-E))).attr("stroke-width","2").attr("stroke","#BCD5D5").attr("fill","#BCD5D5");setInterval((function(){var t=new Date,r=m(540-H(60*t.getHours()+t.getMinutes()));O.transition().attr("cx",u+p*Math.sin(r)).attr("cy",h+p*Math.cos(r)).attr("r",(function(){return 3!=O.attr("r")?3:1}))}),1e3);for(S=0;S<24;S++)A=180-15*S,F.append("text").text((S>9?S:"0"+S)+":00").attr("x",(d+33)*Math.sin(m(A))).attr("y",(d+33)*Math.cos(m(A))+7).attr("text-anchor","middle").style("font-size","14").style("fill","#666");var z=M.append("g").attr("id","desglose_grupo").attr("transform","translate("+(u+d+100)+","+(h-.75*d)+")").attr("opacity",0);z.append("rect").attr("y",f+20).attr("width",165).attr("height",3).attr("fill","#3C3C3C");var R,J=z.append("text").text("hoy").attr("y",f+39).attr("text-anchor","start").style("font-size","14").attr("fill","#666"),W=z.append("text").text("21:00h").attr("y",f+62).attr("text-anchor","start").style("font-size","27").attr("fill","#666"),L=z.append("g"),I=L.append("rect").attr("x",-8).attr("width",2).attr("height",200).attr("fill","#669C83"),$=L.append("text").text("--").attr("text-anchor","middle").style("font-size","13").attr("fill","#669C83").attr("x",-100).attr("y",-12).attr("transform","rotate(-90)"),q=M.append("g").attr("id","dem-tooltip").attr("opacity",0),G=q.append("rect").attr("width",124).attr("height",32).attr("rx",10).attr("fill","black").attr("fill-opacity",.15),N=q.append("rect").attr("width",120).attr("height",28).attr("rx",10),U=q.append("text").attr("id","fecha").attr("x",5).attr("y",11).attr("text-anchor","start").style("font-size","11").style("fill","black").style("fill-opacity",.75),Y=q.append("text").text("").attr("x",15).attr("y",24).style("font-size","13").style("fill","white");function X(t){return+t.dem}M.on("mousemove",(function(t,r){var a,n=e.s(this),i=n[0],c=n[1],l=Math,p=l.pow(u-i,2),f=l.pow(h-c,2),m=l.sqrt(p+f),g=(M.offsetLeft,M.offsetTop,["fmt_",i>u?1:0,"_",c>h?1:0].join(""));g!=R&&("fmt_0_0"==(a=g)&&(G.attr("x",-122).attr("y",-30),N.attr("x",-120).attr("y",-28),U.attr("x",-4).attr("y",-16).attr("text-anchor","end"),Y.attr("x",-4).attr("y",-4).attr("text-anchor","end")),"fmt_1_0"==a&&(G.attr("x",-2).attr("y",-30),N.attr("x",0).attr("y",-28),U.attr("x",5).attr("y",-16).attr("text-anchor","start"),Y.attr("x",5).attr("y",-4).attr("text-anchor","start")),"fmt_1_1"==a&&(G.attr("x",-2).attr("y",-2),N.attr("x",0).attr("y",0),U.attr("x",5).attr("y",11).attr("text-anchor","start"),Y.attr("x",5).attr("y",24).attr("text-anchor","start")),"fmt_0_1"==a&&(G.attr("x",-122).attr("y",-2),N.attr("x",-120).attr("y",0),U.attr("x",-4).attr("y",11).attr("text-anchor","end"),Y.attr("x",-4).attr("y",24).attr("text-anchor","end")),R=g),s!=+(m<=d)&&(s=+(m<=d),B.transition().duration(100).style("opacity",s),j.transition().duration(100).style("opacity",s),q.transition().duration(100).style("opacity",s),s||ot.call("mouseenter",this,o))}));var Z,K,Q,V,tt,rt=e.u().range([10,24]),at=e.u().range([.4,1]),et=e.u().range(["#996A00","#990000"]),nt=e.u().range([0,d]),ot=e.f("mouseenter");function it(t){var r,a,o,i=[t.eol,t.hid,t.sol,t.aut,t.gf,t.nuc,t.car,t.cc],s=g(i),c=i.sum(!0),l=0,u=0,h=(s.length,v(t.ts)),d=(h.getHours(),h.getMinutes(),a=c,[t.eol,t.hid,t.sol].sum(!0)*(o||100)/+a);z.attr("opacity",1),$.text("Renewable "+e.j(",.2f")(d)+"% ").transition().attr("x",-f/100*d/2),I.transition().attr("height",f/100*d),J.text(y.format("%A %d")(h)),W.text(y.format("%H:%M")(h)+"h");e.u().range([0,f]);var p=[];for(r=0;r<x.length;r++)p[r]={id:x[r],datos:t[x[r]]};var m=z.selectAll(".j-bloque").data(p,(function(t,r){return t.id}));m.enter().append("g").attr("id",(function(t,r){return"des_"+t.id})).attr("class","j-bloque").each((function(){var t=this,r=e.w(this);r.append("rect").attr("width",6).attr("height",10).style("cursor","pointer").attr("fill",(function(t){return"#"+C[t.id].color})).on("click",(function(r){return n&&(n.toPeakChart.call(t,r),e.h.stopPropagation())})),r.append("text").text((function(t){return C[t.id].id})).attr("class","j-nombre").attr("x",30).attr("y",20).attr("text-anchor","start").style("font-size","13").style("cursor","pointer").style("fill","#B3B3B3").style("fill",(function(t){return"#"+C[t.id].highlightColor})).attr("transform","rotate(-45)").on("click",(function(r){return n&&(n.toPeakChart.call(t,r),e.h.stopPropagation())})),r.append("text").text((function(t){return C[t.id].id})).attr("class","j-MW").attr("x",30).attr("y",32).attr("text-anchor","start").style("font-size","12").style("cursor","pointer").style("fill","#B3B3B3").style("fill",(function(t){return"#"+C[t.id].highlightColor})).attr("transform","rotate(-45)").on("click",(function(r){return n&&(n.toPeakChart.call(t,r),e.h.stopPropagation())})),r.append("path").style("fill","none").style("stroke-width","1").style("stroke",(function(t){return"#"+C[t.id].color}))})).attr("transform",(function(t,r){return"translate(0,"+50*r+")"}));var b=0,w=0;m.each((function(t,r){s[r-1]<8&&w++,b=33*w,u=s[r]/100*f;e.w(this).transition().attr("transform","translate(0,"+l+")").each((function(){var t=e.w(this);t.select("rect").transition().attr("height",u),t.select(".j-nombre").text((function(t){return C[t.id].nombreAbrev+" "})).transition().attr("transform","translate("+b+",0) rotate(-45 0 0) "),t.select(".j-MW").text((function(t){return e.j(",.2f")(s[r])+"% "+e.j(",")(t.datos)+"MW "})).transition().attr("transform","translate("+b+",0) rotate(-45 0 0) "),t.select("path").transition().attr("d","M6,1 H"+Math.floor(31+b)+" l3,-3")}));l+=u}))}ot.on("mouseenter",(Z=it,K=125,function(){var t=this,r=arguments,a=function(){V=null,Q||Z.apply(t,r)},e=Q&&!V;clearTimeout(V),V=setTimeout(a,K),e&&Z.apply(t,r)})),tt=r,e.n(tt).then((function(t){var r=t.map((function(t){var r,a={};for(r in t)k[r]&&(a[r]=t[r]);return a}));r.reverse();var a=e.p(r,X),n=e.r(r,X);for(var i in w)w[i].percent24h=[],w[i].med24h=0;for(var i in r.forEach((function(t){var r,a,e=[],n=0;for(a in w)e.push(t[a]);for(a in r=g(e),w)w[a].percent24h.push(r[n]),n++})),w)w[i].med24h=e.q(w[i].percent24h);rt.domain([n,a]),at.domain([0,r.length]),et.domain([n,a]),nt.domain([0,a]),new Date;var c=v(r[r.length-1].ts),l=(H(60*c.getHours()+c.getMinutes()),360/r.length/1.05);s||ot.call("mouseenter",this,r[r.length-1]);var d=M.select("#hostRads").selectAll(".rad").data(r,(function(t){return t.ts}));d.enter().append("g").attr("class","rad").attr("id",(function(t){var r=v(t.ts);return["id-",r.getHours(),":",r.getMinutes(),"-dia-",r.getDate()].join("")})).on("mouseenter",(function(t){ot.call("mouseenter",this,t);var r=v(t.ts),a=r.getHours(),n=r.getMinutes(),o=m(180-H(60*a+n)),i=nt(t.dem),s=Math.sin(o),c=Math.cos(o);T.attr("cx",u+i*s).attr("cy",h+i*c).transition().duration(150).attr("fill",et(t.dem)),q.attr("transform","translate("+(u+i*s)+","+(h+i*c)+")"),U.text((function(){var r=v(t.ts);return b(r)})),Y.text((function(){return e.j(",")(t.dem)+"MW"})),N.attr("fill-opacity",1).transition().duration(150).attr("fill",et(t.dem)),D.attr("stroke-opacity",.9).transition().attr("r",nt(t.dem)).attr("stroke",et(t.dem))})).each((function(t){e.w(this).selectAll("path").data(x).enter().append("path").on("click",(function(){e.w(this)})).on("mouseover",(function(){var t=e.w(this);t.attr("fill","#"+C[t.datum()].highlightColor)})).on("mouseout",(function(){var t=e.w(this);t.attr("fill","#"+C[t.datum()].color)})).attr("fill",(function(t,r){var a=e.w(this);return"#"+C[a.datum()].color}))})).attr("opacity",0).attr("transform","translate("+u+","+h+")").each((function(t,r){var a=e.w(this).selectAll("path"),n=[t.eol,t.hid,t.sol,t.aut,t.gf,t.nuc,t.car,t.cc],o=g(n),i=(n.sum(!0),0),s=0,c=(o.length,0),u=e.b(),h=v(t.ts),d=h.getHours(),p=h.getMinutes(),f=H(60*d+p);a.each((function(){s=o[c]/100*nt(t.dem),e.w(this).attr("d",u.startAngle((function(){return m(f)})).endAngle((function(){return m(f+l)})).outerRadius((function(){return s+i})).innerRadius((function(){return i}))),i+=s,c++}))})).transition().duration(500).delay((function(t,a){return 25*(r.length-a)})).attr("opacity",(function(t,r){return at(r)})).attr("transform","translate("+u+","+h+")"),d.exit().remove(),(o=r[r.length-1])&&it(o)}))}},83:function(t,r,a){"use strict";var e=a(14);a.n(e).a},84:function(t,r,a){(t.exports=a(7)(!1)).push([t.i,".time-chart {\n  pointer-events: initial;\n}",""])},85:function(t,r,a){"use strict";var e=a(15);a.n(e).a},86:function(t,r,a){(t.exports=a(7)(!1)).push([t.i,"#cost-analysis-btn[data-v-eeb1b166] {\n  margin-left: 12px;\n}",""])}}]);