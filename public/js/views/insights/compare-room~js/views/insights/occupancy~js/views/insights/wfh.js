(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(l,e,d){"use strict";d(49)},121:function(l,e,d){(l.exports=d(6)(!1)).push([l.i,".building-svg svg{pointer-events:auto}.floor path{transition:fill .24s}.floor.green>path{fill:#01fe01}.floor.yellow>path{fill:#ff8600}.floor.orange>path{fill:#ed0003}.floor[data-hover=true]{cursor:pointer}.floor[data-hover=true].green:hover>path{fill:#01cb01}.floor[data-hover=true].yellow:hover>path{fill:#cc6b00}.floor[data-hover=true].orange:hover>path{fill:#ba0002}",""])},21:function(l,e,d){"use strict";d.d(e,"a",(function(){return i})),d.d(e,"b",(function(){return v})),d.d(e,"c",(function(){return a}));var t={props:["floors","clickableFloor"],data:function(){return{floorHeight:48,roofHeight:234}},computed:{floorCount:function(){return this.floors.length},buildingHeight:function(){return this.floorCount*this.floorHeight+this.roofHeight}},methods:{getLiveColor:function(l,e){var d=l/e*100;return{green:d<50,yellow:d>=50,orange:d>=90}},floorClick:function(l){this.$emit("floorClick",l)}}},r=(d(120),d(3)),i=Object(r.a)(t,(function(){var l=this,e=l.$createElement,d=l._self._c||e;return d("div",{staticClass:"building-svg"},[d("svg",{attrs:{width:"355",height:l.buildingHeight,viewBox:"0 0 355 "+l.buildingHeight,fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[d("g",{staticClass:"rooftop"},[d("path",{attrs:{d:"M341.559 134.27L243.971 190.677V223.899L341.559 167.492V134.27Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M12.457 89.6288L243.969 223.899V190.677L12.457 56.0613V89.6288Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{d:"M354.709 163.339L243.971 227.359V232.204L354.709 168.184V163.339Z",fill:"#5F7C8C"}}),l._v(" "),d("path",{attrs:{d:"M0 90.6669L243.97 232.204V227.359L0 85.8221V90.6669Z",fill:"#5F7C8C"}}),l._v(" "),d("path",{attrs:{d:"M12.4581 78.5549L0 85.8221L243.97 227.359L354.709 163.339L341.558 155.726V161.609L243.97 218.362L12.4581 84.0918V78.5549Z",fill:"#839BA9"}}),l._v(" "),d("path",{attrs:{d:"M12.457 56.0612L243.969 190.677L341.557 134.27L110.391 0L12.457 56.0612Z",fill:"#597281"}}),l._v(" "),d("path",{attrs:{d:"M331.178 137.039L335.331 134.616L110.394 3.80664L19.3809 56.0613L23.5335 58.4837L110.394 8.65144L331.178 137.039Z",fill:"#668196"}}),l._v(" "),d("path",{attrs:{d:"M331.174 137.039L110.39 8.65137L23.5293 58.4836L244.314 187.217L331.174 137.039Z",fill:"#889BAA"}}),l._v(" "),d("path",{attrs:{d:"M236.703 116.275L200.713 137.039L254.698 168.53L290.688 148.112L236.703 116.275Z",fill:"#668196"}}),l._v(" "),d("path",{attrs:{d:"M286.881 147.42L254.697 166.107V137.039L286.881 118.352V147.42Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M204.52 137.039L254.698 166.107V137.039L204.52 107.97V137.039Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{d:"M209.02 114.199V139.461L219.747 146.036V120.774L209.02 114.199Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M219.054 121.12L209.711 115.583V139.807L219.054 145.344V121.12Z",fill:"#839BA9"}}),l._v(" "),d("path",{attrs:{d:"M236.703 89.2827L204.52 107.97L254.698 137.039L286.881 118.352L236.703 89.2827Z",fill:"#597281"}}),l._v(" "),d("path",{attrs:{d:"M105.2 33.5676L132.192 49.4863L91.3577 73.3642L64.3652 57.7916L105.2 33.5676Z",fill:"#668196"}}),l._v(" "),d("path",{attrs:{d:"M67.4805 57.0994L91.3584 70.9417V59.5219L67.4805 45.6796V57.0994Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{d:"M128.393 49.4862L91.3652 70.9417V59.5218L128.393 38.0663V49.4862Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M104.509 24.224L128.387 38.0663L91.3584 59.5218L67.4805 45.6795L104.509 24.224Z",fill:"#597281"}}),l._v(" "),d("path",{attrs:{d:"M70.9414 45.3335L88.5903 55.7152V51.9086L70.9414 41.8729V45.3335Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{d:"M122.159 35.99L88.5918 55.7152V51.9086L122.159 32.5294V35.99Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M104.855 22.1477L122.158 32.5294L88.5903 51.9086L70.9414 41.873L104.855 22.1477Z",fill:"#597281"}})]),l._v(" "),l._l(l.floors,(function(e,t){return d("g",{key:e.id,staticClass:"floor",class:l.getLiveColor(e.occupancy_live,e.occupancy_limit),style:{transform:"translateY("+t*l.floorHeight+"px)"},attrs:{floor:e.number,"data-hover":l.clickableFloor},on:{click:function(d){l.clickableFloor&&l.floorClick(e)}}},[d("path",{attrs:{d:"M341.559 175L243.971 231.5V267.5L341.559 211.5V175Z",fill:"#FF8600"}}),l._v(" "),d("path",{attrs:{d:"M12.457 133L243.969 267.5V231.5L12.457 96.5V133Z",fill:"#FF8600"}}),l._v(" "),d("g",{staticClass:"floor-base"},[d("path",{attrs:{d:"M354.709 212.46L243.971 276.481V280.98L354.709 216.959V212.46Z",fill:"#5F7C8C"}}),l._v(" "),d("path",{attrs:{d:"M0 139.442L243.97 280.979V276.481L0 134.943V139.442Z",fill:"#5F7C8C"}}),l._v(" "),d("path",{attrs:{d:"M12.4581 127.676L0 134.943L243.97 276.481L354.709 212.46L341.558 204.501V210.73L243.97 267.137L12.4581 132.867V127.676Z",fill:"#839BA9"}})])])}))],2)])}),[],!1,null,null,null).exports,v=Object(r.a)({},(function(){var l=this,e=l.$createElement,d=l._self._c||e;return d("div",{staticClass:"house-svg"},[d("svg",{attrs:{width:"434",height:"396",viewBox:"0 0 434 396",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M434 268.956L234.661 384.287L0 248.683L199.339 133.352L434 268.956Z",fill:"#889BAA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0 248.683L234.661 384.287V396L0 260.396V248.683Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M434.001 268.956L234.662 384.287V396L433.776 280.894L434.001 268.956Z",fill:"#5C7483"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M265.709 323.468L190.113 187.413L252.21 163.986L433.999 268.956L340.63 323.017L265.709 323.468Z",fill:"#889BAA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M265.485 323.468L106.869 231.788V92.1297L265.485 183.809V323.468Z",fill:"#993127"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M360.654 268.73V129.297C319.481 153.174 306.882 159.706 265.484 183.584V323.468C306.657 300.041 319.931 292.382 360.654 268.73Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M265.485 317.16L106.869 225.706V218.048L265.485 309.952V317.16Z",fill:"#612E2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M183.59 262.198H227.012V301.167L183.59 276.164V262.198Z",fill:"#612E2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M266.384 316.485L103.719 222.553V79.5154L266.384 173.447V316.485Z",fill:"#CACACA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M103.719 99.1126V79.2901L266.384 173.222V190.567L103.719 99.1126Z",fill:"#666666"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M363.804 260.171V117.584C321.507 141.911 308.682 148.669 266.385 173.222V316.259C308.457 292.382 321.957 284.498 363.804 260.171Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.389 216.246L227.913 294.41L155.692 255.215L145.793 171.195L221.389 216.246Z",fill:"#666666"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 228.86C134.093 218.498 134.093 189.891 134.093 179.529C128.018 176.15 121.944 172.546 115.869 169.167C115.869 179.529 115.869 208.137 115.869 218.498C121.944 221.877 128.018 225.481 134.093 228.86Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 228.86V207.911C128.018 211.29 121.944 214.894 115.869 218.273C121.944 221.877 128.018 225.481 134.093 228.86Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.092 227.058V179.529C128.468 176.375 123.068 173.222 117.443 170.068V217.372C123.068 220.526 128.693 223.679 134.092 227.058Z",fill:"white"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.094 179.98C128.919 177.051 123.97 174.123 118.795 171.195V216.246C123.97 219.174 128.919 222.102 134.094 225.031V179.98Z",fill:"#5A9FB0"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M128.244 176.15V223.454L126.895 222.778V175.474L128.244 176.15Z",fill:"white"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.094 195.297C128.919 192.369 123.97 189.44 118.795 186.512V187.863C123.97 190.792 128.919 193.72 134.094 196.648V195.297Z",fill:"white"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.094 209.939C128.919 207.01 123.97 204.082 118.795 201.154V202.505C123.97 205.433 128.919 208.362 134.094 211.29V209.939Z",fill:"white"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M265.709 304.997C265.709 294.635 265.709 266.027 265.709 255.666C259.635 252.287 241.411 241.925 235.336 238.321C235.336 248.683 235.336 277.29 235.336 287.652C241.636 291.031 259.635 301.392 265.709 304.997Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M266.834 304.997C266.834 294.635 266.834 266.027 266.834 255.666C272.909 252.287 300.582 236.519 306.657 232.915C306.657 243.276 306.657 271.884 306.657 282.246C300.582 285.625 272.909 301.392 266.834 304.997Z",fill:"#AFAFAF"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M266.384 305.222V284.273C261.434 286.976 245.235 282.471 238.26 286.075L235.561 287.427L266.384 305.222Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M266.385 305.222V284.273C271.334 286.976 296.983 276.84 304.183 280.669L306.882 282.02L266.385 305.222Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M266.385 255.891C261.21 252.962 243.661 243.051 238.486 240.123V285.399C243.661 288.328 261.21 298.239 266.385 301.167V255.891Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M266.385 255.891C271.559 252.962 298.558 237.645 303.733 234.717V279.993C298.558 282.922 271.334 298.239 266.385 301.167V255.891Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M227.238 266.253C227.238 255.891 227.238 243.952 227.238 233.365C221.163 229.986 215.088 226.382 209.014 223.003C209.014 233.365 209.014 245.304 209.014 255.666C215.088 259.27 221.163 262.874 227.238 266.253Z",fill:"#979797"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M227.238 266.253V245.304C221.163 248.683 215.088 252.287 209.014 255.666C215.088 259.27 221.163 262.874 227.238 266.253Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M227.237 233.365C222.062 230.437 217.112 227.509 211.938 224.58V253.413C217.112 256.341 222.062 259.27 227.237 262.198V233.365Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M175.264 325.27L96.9688 279.543V275.939L175.264 321.891V325.27Z",fill:"#993127"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.612 294.86L175.264 321.891L96.9688 275.939L142.641 249.133L221.612 294.86Z",fill:"#B55525"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.838 298.239L175.266 325.27V321.891L221.838 294.635V298.239Z",fill:"#822B29"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M194.164 310.853L181.34 303.42L209.238 287.201L221.838 294.635L194.164 310.853Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M175.266 317.611L105.295 276.614V273.236L182.24 272.109L175.266 317.611Z",fill:"#993127"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M218.013 289.229L175.266 314.007L105.295 273.236L148.042 248.007L218.013 289.229Z",fill:"#B55525"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M218.238 292.607L175.266 317.611V314.007L218.238 289.003V292.607Z",fill:"#822B29"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M189.664 305.672L176.84 298.239L204.963 281.795L218.237 289.003L189.664 305.672Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M175.266 309.727H175.041L113.619 273.911V270.532L175.266 306.123V309.727Z",fill:"#993127"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M213.963 283.597L175.041 306.123L113.619 270.532L152.092 247.782L213.963 283.597Z",fill:"#B55525"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M185.839 300.041L126.893 265.802L155.016 249.584L214.413 283.372L185.839 300.041Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M214.413 286.976L175.266 309.727V306.123L214.413 283.372V286.976Z",fill:"#822B29"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M330.506 267.829C330.506 257.468 330.506 152.949 330.506 142.587C336.581 139.208 342.655 135.604 348.73 132.225C348.73 142.587 348.73 247.106 348.73 257.468C342.655 260.846 336.581 264.451 330.506 267.829Z",fill:"#AFAFAF"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M330.506 267.829V246.881C336.581 250.259 339.505 252.061 345.58 255.44L348.955 257.468C342.655 260.846 336.581 264.451 330.506 267.829Z",fill:"#CACACA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M330.506 143.038C335.681 140.109 340.405 137.406 345.58 134.478V255.44C340.405 258.369 335.681 261.072 330.506 264V143.038Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 155.427C134.093 145.065 134.093 116.457 134.093 106.096C128.018 102.717 121.944 99.1126 115.869 95.7338C115.869 106.096 115.869 134.703 115.869 145.065C121.944 148.444 128.018 151.823 134.093 155.427Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 155.427V134.478L119.244 143.038L115.869 145.065C121.944 148.444 128.018 151.823 134.093 155.427Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 105.87C128.919 102.942 124.194 100.239 119.244 97.3106V142.812C124.419 145.741 129.144 148.444 134.093 151.372V105.87Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M254.236 224.58C254.236 214.218 254.236 185.611 254.236 175.249C248.161 171.87 242.086 168.266 236.012 164.887C236.012 175.249 236.012 203.857 236.012 214.218C242.086 217.597 248.161 221.201 254.236 224.58Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M254.236 224.58V203.631L239.387 212.191L236.012 214.218C242.086 217.597 248.161 221.201 254.236 224.58Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M254.236 175.249C249.061 172.321 244.336 169.618 239.387 166.689V212.191C244.561 215.119 249.286 217.823 254.236 220.751V175.249Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M203.614 195.297C203.614 184.935 203.614 156.328 203.614 145.966C197.539 142.587 169.866 126.819 163.791 123.215C163.791 133.577 163.791 162.184 163.791 172.546C169.866 175.925 197.539 191.693 203.614 195.297Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M203.614 195.297V174.348C198.664 177.051 174.14 166.464 167.166 170.519L163.791 172.546L203.614 195.297Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M203.614 145.741C198.439 142.812 172.116 127.945 167.166 125.017V170.519C172.341 173.447 198.664 188.314 203.614 191.242V145.741Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M121.268 275.038L125.992 266.928L145.341 267.154L149.166 275.038H121.268Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M175.266 306.123L178.19 298.239H188.765L175.266 306.123Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M192.14 299.816L193.715 303.42L186.29 307.474L178.641 307.7L192.14 299.816Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M199.79 303.195L201.14 306.799L193.941 311.079H186.291L199.79 303.195Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M184.714 266.027C184.714 255.666 184.714 227.283 184.714 216.922C178.64 213.543 172.565 209.939 166.49 206.56C166.49 216.921 166.49 245.529 166.49 255.891C172.565 259.27 178.64 262.648 184.714 266.027Z",fill:"#979797"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M200.012 276.164V263.099C194.838 266.027 182.464 246.655 175.039 250.935L165.814 256.341L200.012 276.164Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M184.715 217.823C179.54 214.894 174.591 211.966 169.416 209.038V254.089C174.591 257.017 179.54 259.945 184.715 262.874V217.823Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M200.014 226.608C194.839 223.679 189.89 220.751 184.715 217.823V262.874C189.89 265.802 194.839 268.73 200.014 271.659V226.608Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 228.86C134.093 218.498 134.093 189.891 134.093 179.529C128.018 176.15 121.944 172.546 115.869 169.167C115.869 179.529 115.869 208.137 115.869 218.498C121.944 221.877 128.018 225.256 134.093 228.86Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 228.86V207.911L119.244 216.471L115.869 218.498C121.944 221.877 128.018 225.256 134.093 228.86Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M134.093 179.529C128.919 176.601 124.194 173.898 119.244 170.969V216.471C124.419 219.399 129.144 222.102 134.093 225.031V179.529Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M129.142 270.532L121.268 275.038V199.352L129.142 202.956V270.532Z",fill:"#979797"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M175.04 306.123L167.391 301.618V237.645L174.59 234.942H175.715L175.265 234.041L175.04 306.123Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M121.269 275.038L113.619 270.532V206.785L120.819 203.857H121.944L121.494 203.181L121.269 275.038Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M182.916 301.618L175.041 306.123V230.437L182.916 234.041V301.618Z",fill:"#979797"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M113.619 221.652V206.785L120.819 203.857H121.944L121.494 203.181L121.269 226.157L113.619 221.652Z",fill:"#666666"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M167.391 252.737V237.42L174.59 234.717H175.715L175.265 233.816V257.242L167.391 252.737Z",fill:"#666666"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M271.333 183.133L91.5684 79.2901V72.3072L271.333 175.925V183.133Z",fill:"#677A85"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M382.703 118.935V112.628L271.334 175.925V183.133L382.703 118.935Z",fill:"#44555F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M272.233 62.3959L271.333 176.375L91.5684 72.3072L208.562 25.4539L272.233 62.3959Z",fill:"#889BAA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M272.234 62.3959L271.334 176.375L382.703 112.403L272.234 62.3959Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M208.563 25.6792L202.264 8.33447L382.703 112.403L272.235 62.3959L208.563 25.6792Z",fill:"#5C7483"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M202.262 8.33447L91.5684 72.3072L208.562 25.6792L202.262 8.33447Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M273.134 9.68601L254.91 20.273L245.461 14.8669L263.235 4.05461L273.134 9.68601Z",fill:"#B55525"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M274.935 52.4846L254.236 48.43V20.9488L274.935 9.01024V52.4846Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M276.284 6.98293L253.785 20.0478L242.311 13.2901L264.359 0L276.284 6.98293Z",fill:"#B55525"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M271.335 6.98294L254.461 16.8942L247.262 12.6143L263.911 2.70307L271.335 6.98294Z",fill:"#6D2D2B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M263.91 11.4881V2.92833L271.335 6.98294L263.91 11.4881Z",fill:"#993127"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M254.685 63.2969L209.463 129.072V97.0853L254.685 63.2969Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M173.465 75.0102L209.463 95.959V129.072L173.465 107.898V75.0102Z",fill:"#CACACA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M254.236 48.43L243.662 42.3481V14.8669L254.236 20.9488V48.43Z",fill:"#CACACA"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M253.785 28.157L242.311 21.3993V13.2901L253.785 19.8225V28.157Z",fill:"#993127"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M209.463 102.491L173.465 81.7679V75.0102L209.463 95.9591V102.491Z",fill:"#666666"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M198.664 118.935C198.664 110.375 198.664 101.14 198.664 92.3549C193.714 89.4266 188.54 86.7235 183.59 83.7952C183.59 92.3549 183.59 101.59 183.59 110.15C188.765 113.304 193.714 116.007 198.664 118.935Z",fill:"#7E7E7E"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M198.664 118.935V101.59C193.714 104.519 188.54 107.222 183.59 110.15C188.765 113.304 193.714 116.007 198.664 118.935Z",fill:"#E3E3E3"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M198.664 92.3549C194.389 89.8771 190.339 87.6246 186.064 85.1468V108.348C190.339 110.826 194.389 113.078 198.664 115.556V92.3549Z",fill:"#3A3D3F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M261.435 56.0887L210.588 97.5358L168.74 73.4334L219.812 31.9863L261.435 56.0887Z",fill:"#778C9C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M168.74 73.4334L210.588 97.5358V100.239L168.74 76.1365V73.4334Z",fill:"#65737B"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M261.435 56.0887L210.588 97.5358V100.239L257.61 62.1707L261.435 56.0887Z",fill:"#5C7483"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M276.286 15.0921L253.787 27.9317V19.8225L276.286 6.98293V15.0921Z",fill:"#822B29"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.387 210.84L171.44 245.079L95.6191 201.154L145.791 167.14L221.387 210.84Z",fill:"#778C9C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M95.6191 201.154L171.44 245.079V250.034L95.6191 206.334V201.154Z",fill:"#677A85"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.387 210.84L171.439 245.079V250.034L221.387 216.02V210.84Z",fill:"#44555F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M61.3591 242.435C58.0207 242.435 55.2578 243.931 55.2578 245.658C55.2578 247.5 58.0207 248.881 61.3591 248.881C64.6976 248.881 67.4605 247.385 67.4605 245.658C67.4605 243.816 64.8127 242.435 61.3591 242.435Z",fill:"#5E722F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M61.2455 240.593C61.5909 240.593 61.8211 240.823 61.8211 241.169V245.198C61.8211 245.543 61.5909 245.773 61.2455 245.773C60.9002 245.773 60.6699 245.543 60.6699 245.198V241.169C60.6699 240.823 60.9002 240.593 61.2455 240.593Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M59.5176 240.248C59.7479 241.514 59.7479 242.78 60.7839 244.046C61.0142 244.277 61.3595 245.888 60.6688 244.852C59.2874 243.126 59.2874 241.514 58.942 240.248C58.7118 239.442 59.2874 239.442 59.5176 240.248Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M62.9714 239.557C62.7411 240.823 62.7411 242.09 61.7051 243.356C61.4748 243.586 61.1295 245.198 61.8202 244.162C63.2016 242.435 63.2016 240.823 63.547 239.557C63.7772 238.751 63.2016 238.751 62.9714 239.557Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M61.2448 209.512C66.0799 209.512 70.5695 242.205 61.2448 242.205C51.1143 242.205 56.4098 209.512 61.2448 209.512Z",fill:"#394719"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M61.8201 210.663C65.619 210.663 69.1877 239.212 61.8201 239.212C53.7617 239.096 58.0211 210.663 61.8201 210.663Z",fill:"#44551F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M62.1655 211.699C64.0074 211.699 66.5401 228.621 62.9714 228.621C59.1724 228.621 60.3236 211.699 62.1655 211.699Z",fill:"#506325"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M70.7986 247.27C67.4601 247.27 64.6973 248.766 64.6973 250.493C64.6973 252.335 67.4601 253.716 70.7986 253.716C74.1371 253.716 76.8999 252.22 76.8999 250.493C76.8999 248.651 74.1371 247.27 70.7986 247.27Z",fill:"#5E722F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M70.6841 245.428C71.0295 245.428 71.2597 245.658 71.2597 246.003V250.033C71.2597 250.378 71.0295 250.608 70.6841 250.608C70.3388 250.608 70.1085 250.378 70.1085 250.033V246.003C69.9934 245.658 70.3388 245.428 70.6841 245.428Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M68.8427 244.967C69.0729 246.234 69.0729 247.5 70.109 248.766C70.3392 248.996 70.6846 250.608 69.9939 249.572C68.6124 247.845 68.6124 246.234 68.2671 244.967C68.152 244.277 68.7276 244.277 68.8427 244.967Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M72.4108 244.277C72.1806 245.543 72.1806 246.809 71.1445 248.076C70.9143 248.306 70.5689 249.917 71.2596 248.881C72.6411 247.155 72.6411 245.543 72.9864 244.277C73.2167 243.586 72.5259 243.586 72.4108 244.277Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M70.6843 214.346C75.5193 214.346 80.009 247.04 70.6843 247.04C60.5538 247.04 65.8493 214.346 70.6843 214.346Z",fill:"#394719"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M71.2595 215.383C75.0585 215.383 78.6272 243.931 71.2595 243.931C63.2012 243.931 67.4606 215.383 71.2595 215.383Z",fill:"#44551F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M71.4892 216.534C73.3311 216.534 75.8637 233.456 72.295 233.456C68.4961 233.341 69.7624 216.534 71.4892 216.534Z",fill:"#506325"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.375 339.133C218.036 339.133 215.273 340.629 215.273 342.356C215.273 344.198 218.036 345.579 221.375 345.579C224.713 345.579 227.476 344.083 227.476 342.356C227.476 340.514 224.828 339.133 221.375 339.133Z",fill:"#5E722F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.261 337.291C221.607 337.291 221.837 337.521 221.837 337.866V341.895C221.837 342.241 221.607 342.471 221.261 342.471C220.916 342.471 220.686 342.241 220.686 341.895V337.866C220.686 337.521 220.916 337.291 221.261 337.291Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M219.533 336.945C219.763 338.212 219.763 339.478 220.8 340.744C221.03 340.974 221.375 342.586 220.684 341.55C219.303 339.823 219.303 338.212 218.958 336.945C218.727 336.14 219.303 336.14 219.533 336.945Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M222.987 336.255C222.757 337.521 222.757 338.787 221.721 340.054C221.49 340.284 221.145 341.895 221.836 340.859C223.217 339.133 223.217 337.521 223.563 336.255C223.793 335.449 223.217 335.449 222.987 336.255Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.26 306.209C226.095 306.209 230.585 338.902 221.26 338.902C211.13 338.902 216.425 306.209 221.26 306.209Z",fill:"#394719"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M221.836 307.361C225.635 307.361 229.203 335.909 221.836 335.909C213.777 335.794 218.037 307.361 221.836 307.361Z",fill:"#44551F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M222.181 308.397C224.023 308.397 226.556 325.319 222.987 325.319C219.188 325.319 220.339 308.397 222.181 308.397Z",fill:"#506325"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M230.814 343.967C227.476 343.967 224.713 345.464 224.713 347.191C224.713 349.033 227.476 350.414 230.814 350.414C234.153 350.414 236.916 348.917 236.916 347.191C236.916 345.349 234.153 343.967 230.814 343.967Z",fill:"#5E722F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M230.7 342.126C231.045 342.126 231.275 342.356 231.275 342.701V346.73C231.275 347.076 231.045 347.306 230.7 347.306C230.354 347.306 230.124 347.076 230.124 346.73V342.701C230.009 342.356 230.354 342.126 230.7 342.126Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M228.858 341.665C229.089 342.931 229.089 344.198 230.125 345.464C230.355 345.694 230.7 347.306 230.01 346.27C228.628 344.543 228.628 342.931 228.283 341.665C228.168 340.974 228.743 340.974 228.858 341.665Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M232.426 340.974C232.196 342.241 232.196 343.507 231.16 344.773C230.93 345.004 230.585 346.615 231.275 345.579C232.657 343.852 232.657 342.241 233.002 340.974C233.232 340.284 232.542 340.284 232.426 340.974Z",fill:"#55392C"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M230.7 311.044C235.535 311.044 240.025 343.737 230.7 343.737C220.569 343.737 225.865 311.044 230.7 311.044Z",fill:"#394719"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M231.275 312.08C235.074 312.08 238.643 340.629 231.275 340.629C223.217 340.629 227.476 312.08 231.275 312.08Z",fill:"#44551F"}}),l._v(" "),d("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M231.505 313.231C233.347 313.231 235.879 330.154 232.311 330.154C228.512 330.038 229.778 313.231 231.505 313.231Z",fill:"#506325"}})])])}),[],!1,null,null,null).exports,a=Object(r.a)({},(function(){var l=this,e=l.$createElement,d=l._self._c||e;return d("div",{staticClass:"person-chair-svg"},[d("svg",{attrs:{width:"212",height:"134",viewBox:"0 0 212 134",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[d("path",{attrs:{d:"M113.138 56.4581H97.0714H63.739C62.3492 56.4581 61.2227 57.5845 61.2227 58.9745V60.5228C61.2227 61.9126 62.3494 63.0395 63.739 63.0395H97.0712H113.138H121.462V56.4581H113.138Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M32.2021 43.4891C32.2021 36.5054 35.8302 30.8435 44.8481 30.8435C53.866 30.8435 59.0539 35 59.0539 43.4891V51.0669L59.0534 63.9657V79.2058H60.3187H72.7156H76.0015H77.7491C81.7046 79.2058 84.9109 82.4022 84.9109 86.3442V126.862C84.9109 130.804 81.7043 134 77.7491 134C73.7934 134 70.5872 130.804 70.5872 126.862V97.025H60.319H56.794H48.546H41.1115C36.3576 97.025 32.4738 93.3013 32.2165 88.6113V88.6079C32.2074 88.4446 32.2021 88.2803 32.2021 88.115C32.2021 87.9496 32.2074 87.7856 32.2165 87.6225V83.9767C32.2082 83.79 32.2021 83.603 32.2021 83.4144V43.4891Z",fill:"#FF5A09"}}),l._v(" "),d("path",{attrs:{d:"M45.2219 26.8637C52.9162 26.8637 59.1537 20.85 59.1537 13.4318C59.1537 6.01364 52.9162 0 45.2219 0C37.5275 0 31.29 6.01364 31.29 13.4318C31.29 20.85 37.5275 26.8637 45.2219 26.8637Z",fill:"#FF5A09"}}),l._v(" "),d("rect",{attrs:{x:"42.7314",y:"110",width:"10",height:"24",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M27.9158 99.2424C25.7606 99.2424 23.8903 100.458 22.9501 102.24C12.9804 101.471 5.1022 93.1191 5.1022 82.9556C5.1022 73.6534 11.7014 65.8653 20.4635 64.0221V75.0014C20.4635 77.6501 22.6105 79.7978 25.2593 79.7978C27.908 79.7978 30.0551 77.6501 30.0551 75.0014V47.1109C30.0551 44.4621 27.9078 42.3149 25.2593 42.3149C22.6105 42.3149 20.4635 44.4622 20.4635 47.1109V58.8318C8.87136 60.7415 0 70.8311 0 82.9556C0 95.9135 10.1328 106.548 22.8909 107.354C23.8102 109.199 25.7145 110.467 27.9155 110.467H68.4472V99.2427L27.9158 99.2424Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M98.3237 56.4581H114.391H147.723C149.113 56.4581 150.239 57.5845 150.239 58.9745V60.5228C150.239 61.9126 149.113 63.0395 147.723 63.0395H114.391H98.324H90.0002V56.4581H98.3237Z",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M179.26 43.4891C179.26 36.5054 175.632 30.8435 166.614 30.8435C157.596 30.8435 152.408 35 152.408 43.4891V51.0669L152.409 63.9657V79.2058H151.143H138.746H135.46H133.713C129.757 79.2058 126.551 82.4022 126.551 86.3442V126.862C126.551 130.804 129.758 134 133.713 134C137.668 134 140.875 130.804 140.875 126.862V97.025H151.143H154.668H162.916H170.35C175.104 97.025 178.988 93.3013 179.245 88.6113V88.6079C179.254 88.4446 179.26 88.2803 179.26 88.115C179.26 87.9496 179.254 87.7856 179.245 87.6225V83.9767C179.254 83.79 179.26 83.603 179.26 83.4144V43.4891Z",fill:"#FF5A09"}}),l._v(" "),d("path",{attrs:{d:"M166.24 26.8637C158.546 26.8637 152.308 20.85 152.308 13.4318C152.308 6.01364 158.546 0 166.24 0C173.934 0 180.172 6.01364 180.172 13.4318C180.172 20.85 173.934 26.8637 166.24 26.8637Z",fill:"#FF5A09"}}),l._v(" "),d("rect",{attrs:{width:"10",height:"24",transform:"matrix(-1 0 0 1 168.73 110)",fill:"#485B66"}}),l._v(" "),d("path",{attrs:{d:"M183.546 99.2424C185.701 99.2424 187.572 100.458 188.512 102.24C198.481 101.471 206.36 93.1191 206.36 82.9556C206.36 73.6534 199.76 65.8653 190.998 64.0221V75.0014C190.998 77.6501 188.851 79.7978 186.203 79.7978C183.554 79.7978 181.407 77.6501 181.407 75.0014V47.1109C181.407 44.4621 183.554 42.3149 186.203 42.3149C188.851 42.3149 190.998 44.4622 190.998 47.1109V58.8318C202.591 60.7415 211.462 70.8311 211.462 82.9556C211.462 95.9135 201.329 106.548 188.571 107.354C187.652 109.199 185.747 110.467 183.546 110.467H143.015V99.2427L183.546 99.2424Z",fill:"#485B66"}}),l._v(" "),d("rect",{attrs:{x:"102",y:"63",width:"6",height:"71",fill:"#485B66"}})])])}),[],!1,null,null,null).exports},49:function(l,e,d){var t=d(121);"string"==typeof t&&(t=[[l.i,t,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};d(7)(t,r);t.locals&&(l.exports=t.locals)}}]);