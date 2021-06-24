(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{18:function(t,r,a){"use strict";a.d(r,"a",(function(){return i}));var e=a(1),n=a(4);function i(t,r,a){var i,o=e.y(t),c=Object(n.b)(!0,{widget:!1},a),s=c.events,l=0,u=960,d=.4*(u=o.node().getBoundingClientRect().width-(c.widget?0:17));function h(t){return Math.PI/180*t}function f(t){var r,a,e=t.sum(),n=[],i=t.length;for(a=0;a<i;a++)r=100*t[a]/e,n.push(r>=0?r:0);return n}Array.prototype.sum=function(t){var r,a=0,e=this.length;for(r=0;r<e;r++)if("number"==typeof this[r]){if(t&&this[r]<0)continue;a+=this[r]}return a};var p=e.A({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),m=e.C("%Y-%m-%dT%H:%M:%S.%LZ"),y=p.format("%A %d, %H:%M"),g=["wfhp","cs","pwu","pmru","pmre"],v={wfhp:{id:"wfhp",name:"Work from home peak",color:"7EAADD",highlightColor:"c6d1dd"},cs:{id:"cs",name:"Cost Saving",color:"33537A",highlightColor:"446fa4"},pwu:{id:"pwu",name:"Peak Workspace Utilisation",color:"F5A623",highlightColor:"f5cc89"},pmru:{id:"pmru",name:"Peak Meeting Room Utilisation",color:"8F31AE",highlightColor:"b662d2"},pmre:{id:"pmre",name:"Peak Meeting Room Efficiency",color:"3D3F56",highlightColor:"6a6d95"}},x=o.append("svg").attr("class","time-chart").attr("width",u).attr("height",500),w=x.append("defs").append("filter").attr("id","brightness").append("feComponentTransfer");w.append("feFuncR").attr("type","linear").attr("slope","1.25"),w.append("feFuncG").attr("type","linear").attr("slope","1.25"),w.append("feFuncB").attr("type","linear").attr("slope","1.25"),x.append("circle").attr("id","circleBG").attr("r",200).attr("cx",d).attr("cy",250).attr("fill","rgb(57,57,57)"),x.append("g").attr("id","hours");x.append("g").attr("id","hostRads");var _,b,M=x.append("g").attr("id","circle"),k=M.append("circle").attr("r",200).attr("cx",d).attr("cy",250).attr("stroke","#990000").attr("fill","none").attr("stroke-dasharray",3).attr("stroke-width",2).attr("stroke-opacity",0),C=x.append("g").attr("id","curr-time-dot"),A=C.append("circle").attr("r",5).attr("cx",-9999).attr("cy",-9999).attr("stroke","none").attr("fill","#900"),D=e.y("svg #hours").attr("transform","translate("+d+",250)"),j=e.w().domain([0,1440]).range([0,360]),H=new Date,B=j(60*H.getHours()+H.getMinutes()),P=x.append("circle").attr("id","circleHour").attr("r",3).attr("cx",d+212*Math.sin(h(540-B))).attr("cy",250+212*Math.cos(h(540-B))).attr("stroke-width","2").attr("stroke","#BCD5D5").attr("fill","#BCD5D5"),F=setInterval((function(){var t=new Date,r=h(540-j(60*t.getHours()+t.getMinutes()));P.transition().attr("cx",d+212*Math.sin(r)).attr("cy",250+212*Math.cos(r)).attr("r",(function(){return 3!=P.attr("r")?3:1}))}),1e3);for(b=0;b<24;b++)_=180-15*b,D.append("text").text((b>9?b:"0"+b)+":00").attr("x",233*Math.sin(h(_))).attr("y",233*Math.cos(h(_))+7).attr("text-anchor","middle").style("font-size","14").style("font-weight","bold").style("fill","#666");var T=x.append("g").attr("id","breakdown_group").attr("transform","translate("+(d+200+100)+",100)").attr("opacity",0);T.append("rect").attr("y",320).attr("width",165).attr("height",3).attr("fill","#3C3C3C");var S,J=T.append("text").text("hoy").attr("y",339).attr("text-anchor","start").style("font-size","14").attr("fill","#666"),O=T.append("text").text("21:00h").attr("y",362).attr("text-anchor","start").style("font-size","27").attr("fill","#666"),R=x.append("g").attr("id","data-tooltip").attr("opacity",0),z=R.append("rect").attr("width",120).attr("height",32).attr("rx",5),G=R.append("text").attr("id","fecha").attr("x",5).attr("y",11).attr("text-anchor","start").style("font-size","11").style("fill","white").style("fill-opacity",.75),E=R.append("text").text("").attr("x",15).attr("y",24).style("font-size","13").style("fill","white");x.on("mousemove",(function(t,r){var a,n,o,c,s,u,h,f,p,m=e.s(this),y=m[0],g=m[1],v=Math,w=v.pow(d-y,2),_=v.pow(250-g,2),b=v.sqrt(w+_),k=(x.offsetLeft,x.offsetTop,["fmt_",y>d?1:0,"_",g>250?1:0].join(""));k!=S&&(n="fmt_0_0"==(a=k)||"fmt_0_1"==a?-120:0,o="fmt_0_0"==a||"fmt_1_0"==a?-32:0,c="fmt_0_0"==a||"fmt_0_1"==a?-6:6,s="fmt_0_0"==a||"fmt_1_0"==a?-18:13,u="fmt_0_0"==a||"fmt_0_1"==a?"end":"start",h="fmt_0_0"==a||"fmt_0_1"==a?-6:6,f="fmt_0_0"==a||"fmt_1_0"==a?-6:26,p="fmt_0_0"==a||"fmt_0_1"==a?"end":"start",z.attr("x",n).attr("y",o),G.attr("x",c).attr("y",s).attr("text-anchor",u),E.attr("x",h).attr("y",f).attr("text-anchor",p),S=k),l!=+(b<=200)&&(l=+(b<=200),M.transition().duration(100).style("opacity",l),C.transition().duration(100).style("opacity",l),R.transition().duration(100).style("opacity",l),l||X.call("mouseenter",this,i))}));var W,$,I,Y,L,N=e.w().range([.4,1]),U=e.w().range(["#996A00","#990000"]).domain([0,100]),q=e.w().range([0,200]).domain([0,100]),X=e.g("mouseenter");function Z(t){var r,a=f(g.map((function(r){return t[r]}))),n=0,i=0,o=m(t.ts);T.attr("opacity",1),J.text(p.format("%A %d")(o)),O.text(p.format("%H:%M")(o)+"h");var c=[];for(r=0;r<g.length;r++)c[r]={id:g[r],data:t[g[r]]};var l=T.selectAll(".j-block").data(c,(function(t,r){return t.id}));l.enter().append("g").attr("id",(function(t,r){return"des_"+t.id})).attr("class","j-block").each((function(){var t=this,r=e.y(this);r.append("rect").attr("width",6).attr("height",10).style("cursor","pointer").attr("fill",(function(t){return"#".concat(v[t.id].color)})).on("click",(function(r){return s&&(s.toPeakChart.call(t,r),e.i.stopPropagation())})),r.append("text").text((function(t){return v[t.id].id})).attr("class","j-name").attr("x",30).attr("y",20).attr("text-anchor","start").style("font-size","13").style("cursor","pointer").style("fill","#B3B3B3").style("fill",(function(t){return"#".concat(v[t.id].highlightColor)})).attr("transform","rotate(-45)").on("click",(function(r){return s&&(s.toPeakChart.call(t,r),e.i.stopPropagation())})),r.append("text").text((function(t){return v[t.id].id})).attr("class","j-data").attr("x",30).attr("y",32).attr("text-anchor","start").style("font-size","12").style("cursor","pointer").style("fill","#B3B3B3").style("fill",(function(t){return"#".concat(v[t.id].highlightColor)})).attr("transform","rotate(-45)").on("click",(function(r){return s&&(s.toPeakChart.call(t,r),e.i.stopPropagation())})),r.append("path").style("fill","none").style("stroke-width","1").style("stroke",(function(t){return"#".concat(v[t.id].color)}))})).attr("transform",(function(t,r){return"translate(0,".concat(50*r,")")}));var u=0,d=0;l.each((function(t,r){a[r-1]<8&&d++,u=33*d,i=a[r]/100*300;e.y(this).transition().attr("transform","translate(0,".concat(n,")")).each((function(){var t=e.y(this);t.select("rect").transition().attr("height",i),t.select(".j-name").text((function(t){return v[t.id].name})).transition().attr("transform","translate(".concat(u,",0) rotate(-45 0 0)")),t.select(".j-data").text((function(t){return"".concat(t.data,"%")})).transition().attr("transform","translate(".concat(u,",0) rotate(-45 0 0)")),t.select("path").transition().attr("d","M6,1 H".concat(Math.floor(31+u)," l3,-3"))}));n+=i}))}X.on("mouseenter",(W=Z,$=125,function(){var t=this,r=arguments,a=function(){Y=null,I||W.apply(t,r)},e=I&&!Y;clearTimeout(Y),Y=setTimeout(a,$),e&&W.apply(t,r)})),L=r,e.m(L).then((function(t){var r=t.map((function(t){var r=[];for(var a in t)g.indexOf(a)>=0&&r.push(t[a]);return t.combined=e.r(r),t}));r.reverse(),N.domain([0,r.length]),new Date;var a=m(r[r.length-1].ts),n=(j(60*a.getHours()+a.getMinutes()),360/r.length/1.05);l||X.call("mouseenter",this,r[r.length-1]);var o=x.select("#hostRads").selectAll(".rad").data(r,(function(t){return t.ts})),c=0;o.enter().append("g").attr("class","rad").attr("id",(function(t){var r=m(t.ts);return"id-".concat(r.getHours(),":").concat(r.getMinutes(),"-dia-").concat(r.getDate())})).on("mouseenter",(function(t){X.call("mouseenter",this,t);var r=m(t.ts),a=r.getHours(),n=r.getMinutes(),i=h(180-j(60*a+n)),o=q(t.combined),c=Math.sin(i),s=Math.cos(i);A.attr("cx",d+o*c).attr("cy",250+o*s).transition().duration(150).attr("fill",U(t.combined)),R.attr("transform","translate(".concat(d+o*c,",").concat(250+o*s,")")),G.text((function(){var r=m(t.ts);return y(r)})),E.text("Combined: ".concat(e.k(",")(t.combined),"%")),z.attr("fill-opacity",1).transition().duration(150).attr("fill",U(t.combined)),k.attr("stroke-opacity",.9).transition().attr("r",q(t.combined)).attr("stroke",U(t.combined))})).each((function(t){e.y(this).selectAll("path").data(g).enter().append("path").on("mouseover",(function(){var t=e.y(this);t.attr("fill","#".concat(v[t.datum()].highlightColor))})).on("mouseout",(function(){var t=e.y(this);t.attr("fill","#".concat(v[t.datum()].color))})).attr("fill",(function(t,r){var a=e.y(this);return"#".concat(v[a.datum()].color)}))})).attr("opacity",0).attr("transform","translate(".concat(d,",").concat(250,")")).each((function(t,r){var a=e.y(this).selectAll("path"),i=f(g.map((function(r){return t[r]}))),o=0,c=0,s=0,l=e.b(),u=m(t.ts),d=u.getHours(),p=u.getMinutes(),y=j(60*d+p);a.each((function(){c=i[s]/100*q(t.combined),e.y(this).attr("d",l.startAngle((function(){return h(y)})).endAngle((function(){return h(y+n)})).outerRadius((function(){return c+o})).innerRadius((function(){return o}))),o+=c,s++}))})).transition().duration(500).delay((function(t,r){var a=Math.abs(r+1-c)*(0===t.combined?0:25);return 0===t.combined&&c++,a})).attr("opacity",(function(t,r){return N(r)})).attr("transform","translate(".concat(d,",").concat(250,")")),o.exit().remove(),(i=r[r.length-1])&&Z(i)})),this.destroy=function(){clearInterval(F)}}},262:function(t,r,a){"use strict";a.r(r);var e=a(4),n=a(18),i={data:function(){return{width:900,height:450,timeGraph:null}},created:function(){var t=Object(e.e)("w"),r=Object(e.e)("h");t&&(this.width=t),r&&(this.height=r)},mounted:function(){this.$refs.chart.style.width="".concat(this.width,"px"),this.$refs.chart.style.height="".concat(this.height,"px"),this.timeGraph=new n.a("#time-chart","".concat(Object(e.c)(),"/data/time-chart-data.json"),{widget:!0})},destroyed:function(){this.timeGraph.destroy()}},o=a(3),c=Object(o.a)(i,(function(){var t=this.$createElement,r=this._self._c||t;return r("div",{staticClass:"widget"},[r("div",{ref:"chart",attrs:{id:"time-chart"}})])}),[],!1,null,null,null);r.default=c.exports}}]);