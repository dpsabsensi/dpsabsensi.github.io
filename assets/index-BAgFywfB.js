(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();/*!
 * Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */function Te(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function $a(e){if(Array.isArray(e))return e}function Da(e){if(Array.isArray(e))return Te(e)}function Ra(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function za(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Dt(r.key),r)}}function Ha(e,t,a){return t&&za(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function de(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=Je(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||a.return==null||a.return()}finally{if(s)throw i}}}}function v(e,t,a){return(t=Dt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Wa(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ua(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,f=!1;try{if(i=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(d){f=!0,n=d}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(f)throw n}}return s}}function Ba(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ya(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ot(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?ot(Object(a),!0).forEach(function(r){v(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ot(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function ye(e,t){return $a(e)||Ua(e,t)||Je(e,t)||Ba()}function _(e){return Da(e)||Wa(e)||Je(e)||Ya()}function Ka(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Dt(e){var t=Ka(e,"string");return typeof t=="symbol"?t:t+""}function he(e){"@babel/helpers - typeof";return he=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},he(e)}function Je(e,t){if(e){if(typeof e=="string")return Te(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Te(e,t):void 0}}var it=function(){},Ge={},Rt={},zt=null,Ht={mark:it,measure:it};try{typeof window<"u"&&(Ge=window),typeof document<"u"&&(Rt=document),typeof MutationObserver<"u"&&(zt=MutationObserver),typeof performance<"u"&&(Ht=performance)}catch{}var Ja=Ge.navigator||{},st=Ja.userAgent,lt=st===void 0?"":st,W=Ge,b=Rt,ft=zt,ue=Ht;W.document;var H=!!b.documentElement&&!!b.head&&typeof b.addEventListener=="function"&&typeof b.createElement=="function",Wt=~lt.indexOf("MSIE")||~lt.indexOf("Trident/"),Se,Ga=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Xa=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,Ut={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},Va={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Bt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],P="classic",oe="duotone",Yt="sharp",Kt="sharp-duotone",Jt="chisel",Gt="etch",Xt="jelly",Vt="jelly-duo",qt="jelly-fill",Qt="notdog",Zt="notdog-duo",ea="slab",ta="slab-press",aa="thumbprint",ra="whiteboard",qa="Classic",Qa="Duotone",Za="Sharp",er="Sharp Duotone",tr="Chisel",ar="Etch",rr="Jelly",nr="Jelly Duo",or="Jelly Fill",ir="Notdog",sr="Notdog Duo",lr="Slab",fr="Slab Press",ur="Thumbprint",cr="Whiteboard",na=[P,oe,Yt,Kt,Jt,Gt,Xt,Vt,qt,Qt,Zt,ea,ta,aa,ra];Se={},v(v(v(v(v(v(v(v(v(v(Se,P,qa),oe,Qa),Yt,Za),Kt,er),Jt,tr),Gt,ar),Xt,rr),Vt,nr),qt,or),Qt,ir),v(v(v(v(v(Se,Zt,sr),ea,lr),ta,fr),aa,ur),ra,cr);var dr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},mr={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},gr=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),hr={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},oa=["fak","fa-kit","fakd","fa-kit-duotone"],ut={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},vr=["kit"],pr="kit",yr="kit-duotone",br="Kit",xr="Kit Duotone";v(v({},pr,br),yr,xr);var kr={kit:{"fa-kit":"fak"}},wr={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Sr={kit:{fak:"fa-kit"}},ct={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Ae,ce={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Ar=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],Er="classic",Ir="duotone",Pr="sharp",Or="sharp-duotone",jr="chisel",Lr="etch",Tr="jelly",Fr="jelly-duo",Cr="jelly-fill",Nr="notdog",Mr="notdog-duo",_r="slab",$r="slab-press",Dr="thumbprint",Rr="whiteboard",zr="Classic",Hr="Duotone",Wr="Sharp",Ur="Sharp Duotone",Br="Chisel",Yr="Etch",Kr="Jelly",Jr="Jelly Duo",Gr="Jelly Fill",Xr="Notdog",Vr="Notdog Duo",qr="Slab",Qr="Slab Press",Zr="Thumbprint",en="Whiteboard";Ae={},v(v(v(v(v(v(v(v(v(v(Ae,Er,zr),Ir,Hr),Pr,Wr),Or,Ur),jr,Br),Lr,Yr),Tr,Kr),Fr,Jr),Cr,Gr),Nr,Xr),v(v(v(v(v(Ae,Mr,Vr),_r,qr),$r,Qr),Dr,Zr),Rr,en);var tn="kit",an="kit-duotone",rn="Kit",nn="Kit Duotone";v(v({},tn,rn),an,nn);var on={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},sn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},Fe={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},ln=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],ia=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(Ar,ln),fn=["solid","regular","light","thin","duotone","brands","semibold"],sa=[1,2,3,4,5,6,7,8,9,10],un=sa.concat([11,12,13,14,15,16,17,18,19,20]),cn=["aw","fw","pull-left","pull-right"],dn=[].concat(_(Object.keys(sn)),fn,cn,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",ce.GROUP,ce.SWAP_OPACITY,ce.PRIMARY,ce.SECONDARY]).concat(sa.map(function(e){return"".concat(e,"x")})).concat(un.map(function(e){return"w-".concat(e)})),mn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},R="___FONT_AWESOME___",Ce=16,la="fa",fa="svg-inline--fa",J="data-fa-i2svg",Ne="data-fa-pseudo-element",gn="data-fa-pseudo-element-pending",Xe="data-prefix",Ve="data-icon",dt="fontawesome-i2svg",hn="async",vn=["HTML","HEAD","STYLE","SCRIPT"],ua=["::before","::after",":before",":after"],ca=(function(){try{return!0}catch{return!1}})();function ie(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[P]}})}var da=u({},Ut);da[P]=u(u(u(u({},{"fa-duotone":"duotone"}),Ut[P]),ut.kit),ut["kit-duotone"]);var pn=ie(da),Me=u({},hr);Me[P]=u(u(u(u({},{duotone:"fad"}),Me[P]),ct.kit),ct["kit-duotone"]);var mt=ie(Me),_e=u({},Fe);_e[P]=u(u({},_e[P]),Sr.kit);var qe=ie(_e),$e=u({},on);$e[P]=u(u({},$e[P]),kr.kit);ie($e);var yn=Ga,ma="fa-layers-text",bn=Xa,xn=u({},dr);ie(xn);var kn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ee=Va,wn=[].concat(_(vr),_(dn)),ae=W.FontAwesomeConfig||{};function Sn(e){var t=b.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function An(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(b&&typeof b.querySelector=="function"){var En=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];En.forEach(function(e){var t=ye(e,2),a=t[0],r=t[1],n=An(Sn(a));n!=null&&(ae[r]=n)})}var ga={styleDefault:"solid",familyDefault:P,cssPrefix:la,replacementClass:fa,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ae.familyPrefix&&(ae.cssPrefix=ae.familyPrefix);var Q=u(u({},ga),ae);Q.autoReplaceSvg||(Q.observeMutations=!1);var m={};Object.keys(ga).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(a){Q[e]=a,re.forEach(function(r){return r(m)})},get:function(){return Q[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){Q.cssPrefix=t,re.forEach(function(a){return a(m)})},get:function(){return Q.cssPrefix}});W.FontAwesomeConfig=m;var re=[];function In(e){return re.push(e),function(){re.splice(re.indexOf(e),1)}}var X=Ce,D={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Pn(e){if(!(!e||!H)){var t=b.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=b.head.childNodes,r=null,n=a.length-1;n>-1;n--){var i=a[n],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return b.head.insertBefore(t,r),e}}var On="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function gt(){for(var e=12,t="";e-- >0;)t+=On[Math.random()*62|0];return t}function Z(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function Qe(e){return e.classList?Z(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function ha(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function jn(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(ha(e[a]),'" ')},"").trim()}function be(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function Ze(e){return e.size!==D.size||e.x!==D.x||e.y!==D.y||e.rotate!==D.rotate||e.flipX||e.flipY}function Ln(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},f={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:f}}function Tn(e){var t=e.transform,a=e.width,r=a===void 0?Ce:a,n=e.height,i=n===void 0?Ce:n,o="";return Wt?o+="translate(".concat(t.x/X-r/2,"em, ").concat(t.y/X-i/2,"em) "):o+="translate(calc(-50% + ".concat(t.x/X,"em), calc(-50% + ").concat(t.y/X,"em)) "),o+="scale(".concat(t.size/X*(t.flipX?-1:1),", ").concat(t.size/X*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var Fn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function va(){var e=la,t=fa,a=m.cssPrefix,r=m.replacementClass,n=Fn;if(a!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");n=n.replace(i,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(s,".".concat(r))}return n}var ht=!1;function Ie(){m.autoAddCss&&!ht&&(Pn(va()),ht=!0)}var Cn={mixout:function(){return{dom:{css:va,insertCss:Ie}}},hooks:function(){return{beforeDOMElementCreation:function(){Ie()},beforeI2svg:function(){Ie()}}}},z=W||{};z[R]||(z[R]={});z[R].styles||(z[R].styles={});z[R].hooks||(z[R].hooks={});z[R].shims||(z[R].shims=[]);var M=z[R],pa=[],ya=function(){b.removeEventListener("DOMContentLoaded",ya),ve=1,pa.map(function(t){return t()})},ve=!1;H&&(ve=(b.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(b.readyState),ve||b.addEventListener("DOMContentLoaded",ya));function Nn(e){H&&(ve?setTimeout(e,0):pa.push(e))}function se(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,i=n===void 0?[]:n;return typeof e=="string"?ha(e):"<".concat(t," ").concat(jn(r),">").concat(i.map(se).join(""),"</").concat(t,">")}function vt(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Pe=function(t,a,r,n){var i=Object.keys(t),o=i.length,s=a,l,f,d;for(r===void 0?(l=1,d=t[i[0]]):(l=0,d=r);l<o;l++)f=i[l],d=s(d,t[f],f,t);return d};function ba(e){return _(e).length!==1?null:e.codePointAt(0).toString(16)}function pt(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function De(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,i=pt(t);typeof M.hooks.addPack=="function"&&!n?M.hooks.addPack(e,pt(t)):M.styles[e]=u(u({},M.styles[e]||{}),i),e==="fas"&&De("fa",t)}var ne=M.styles,Mn=M.shims,xa=Object.keys(qe),_n=xa.reduce(function(e,t){return e[t]=Object.keys(qe[t]),e},{}),et=null,ka={},wa={},Sa={},Aa={},Ea={};function $n(e){return~wn.indexOf(e)}function Dn(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!$n(n)?n:null}var Ia=function(){var t=function(i){return Pe(ne,function(o,s,l){return o[l]=Pe(s,i,{}),o},{})};ka=t(function(n,i,o){if(i[3]&&(n[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=o})}return n}),wa=t(function(n,i,o){if(n[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=o})}return n}),Ea=t(function(n,i,o){var s=i[2];return n[o]=o,s.forEach(function(l){n[l]=o}),n});var a="far"in ne||m.autoFetchSvg,r=Pe(Mn,function(n,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!a&&(s="fas"),typeof o=="string"&&(n.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});Sa=r.names,Aa=r.unicodes,et=xe(m.styleDefault,{family:m.familyDefault})};In(function(e){et=xe(e.styleDefault,{family:m.familyDefault})});Ia();function tt(e,t){return(ka[e]||{})[t]}function Rn(e,t){return(wa[e]||{})[t]}function K(e,t){return(Ea[e]||{})[t]}function Pa(e){return Sa[e]||{prefix:null,iconName:null}}function zn(e){var t=Aa[e],a=tt("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function U(){return et}var Oa=function(){return{prefix:null,iconName:null,rest:[]}};function Hn(e){var t=P,a=xa.reduce(function(r,n){return r[n]="".concat(m.cssPrefix,"-").concat(n),r},{});return na.forEach(function(r){(e.includes(a[r])||e.some(function(n){return _n[r].includes(n)}))&&(t=r)}),t}function xe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?P:a,n=pn[r][e];if(r===oe&&!e)return"fad";var i=mt[r][e]||mt[r][n],o=e in M.styles?e:null,s=i||o||null;return s}function Wn(e){var t=[],a=null;return e.forEach(function(r){var n=Dn(m.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function yt(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var bt=ia.concat(oa);function ke(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,i=yt(e.filter(function(g){return bt.includes(g)})),o=yt(e.filter(function(g){return!bt.includes(g)})),s=i.filter(function(g){return n=g,!Bt.includes(g)}),l=ye(s,1),f=l[0],d=f===void 0?null:f,c=Hn(i),h=u(u({},Wn(o)),{},{prefix:xe(d,{family:c})});return u(u(u({},h),Kn({values:e,family:c,styles:ne,config:m,canonical:h,givenPrefix:n})),Un(r,n,h))}function Un(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var i=t==="fa"?Pa(n):{},o=K(r,n);return n=i.iconName||o||n,r=i.prefix||r,r==="far"&&!ne.far&&ne.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var Bn=na.filter(function(e){return e!==P||e!==oe}),Yn=Object.keys(Fe).filter(function(e){return e!==P}).map(function(e){return Object.keys(Fe[e])}).flat();function Kn(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,i=n===void 0?"":n,o=e.styles,s=o===void 0?{}:o,l=e.config,f=l===void 0?{}:l,d=a===oe,c=t.includes("fa-duotone")||t.includes("fad"),h=f.familyDefault==="duotone",g=r.prefix==="fad"||r.prefix==="fa-duotone";if(!d&&(c||h||g)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Bn.includes(a)){var p=Object.keys(s).find(function(w){return Yn.includes(w)});if(p||f.autoFetchSvg){var y=gr.get(a).defaultShortPrefixId;r.prefix=y,r.iconName=K(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||i==="fa")&&(r.prefix=U()||"fas"),r}var Jn=(function(){function e(){Ra(this,e),this.definitions={}}return Ha(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){a.definitions[s]=u(u({},a.definitions[s]||{}),o[s]),De(s,o[s]);var l=qe[P][s];l&&De(l,o[s]),Ia()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(i){var o=n[i],s=o.prefix,l=o.iconName,f=o.icon,d=f[2];a[s]||(a[s]={}),d.length>0&&d.forEach(function(c){typeof c=="string"&&(a[s][c]=f)}),a[s][l]=f}),a}}])})(),xt=[],V={},q={},Gn=Object.keys(q);function Xn(e,t){var a=t.mixoutsTo;return xt=e,V={},Object.keys(q).forEach(function(r){Gn.indexOf(r)===-1&&delete q[r]}),xt.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(o){typeof n[o]=="function"&&(a[o]=n[o]),he(n[o])==="object"&&Object.keys(n[o]).forEach(function(s){a[o]||(a[o]={}),a[o][s]=n[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){V[o]||(V[o]=[]),V[o].push(i[o])})}r.provides&&r.provides(q)}),a}function Re(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var i=V[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function G(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=V[e]||[];n.forEach(function(i){i.apply(null,a)})}function B(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return q[e]?q[e].apply(null,t):void 0}function ze(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||U();if(t)return t=K(a,t)||t,vt(ja.definitions,a,t)||vt(M.styles,a,t)}var ja=new Jn,Vn=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,G("noAuto")},qn={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return H?(G("beforeI2svg",t),B("pseudoElements2svg",t),B("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Nn(function(){Zn({autoReplaceSvgRoot:a}),G("watch",t)})}},Qn={icon:function(t){if(t===null)return null;if(he(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:K(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=xe(t[0]);return{prefix:r,iconName:K(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(yn))){var n=ke(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||U(),iconName:K(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var i=U();return{prefix:i,iconName:K(i,t)||t}}}},F={noAuto:Vn,config:m,dom:qn,parse:Qn,library:ja,findIconDefinition:ze,toHtml:se},Zn=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?b:a;(Object.keys(M.styles).length>0||m.autoFetchSvg)&&H&&m.autoReplaceSvg&&F.dom.i2svg({node:r})};function we(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return se(r)})}}),Object.defineProperty(e,"node",{get:function(){if(H){var r=b.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function eo(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,i=e.styles,o=e.transform;if(Ze(o)&&a.found&&!r.found){var s=a.width,l=a.height,f={x:s/l/2,y:.5};n.style=be(u(u({},i),{},{"transform-origin":"".concat(f.x+o.x/16,"em ").concat(f.y+o.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function to(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(m.cssPrefix,"-").concat(a):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:u(u({},n),{},{id:o}),children:r}]}]}function ao(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function at(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,f=e.extra,d=e.watchable,c=d===void 0?!1:d,h=r.found?r:a,g=h.width,p=h.height,y=[m.replacementClass,i?"".concat(m.cssPrefix,"-").concat(i):""].filter(function(j){return f.classes.indexOf(j)===-1}).filter(function(j){return j!==""||!!j}).concat(f.classes).join(" "),w={children:[],attributes:u(u({},f.attributes),{},{"data-prefix":n,"data-icon":i,class:y,role:f.attributes.role||"img",viewBox:"0 0 ".concat(g," ").concat(p)})};!ao(f.attributes)&&!f.attributes["aria-hidden"]&&(w.attributes["aria-hidden"]="true"),c&&(w.attributes[J]="");var k=u(u({},w),{},{prefix:n,iconName:i,main:a,mask:r,maskId:l,transform:o,symbol:s,styles:u({},f.styles)}),S=r.found&&a.found?B("generateAbstractMask",k)||{children:[],attributes:{}}:B("generateAbstractIcon",k)||{children:[],attributes:{}},O=S.children,N=S.attributes;return k.children=O,k.attributes=N,s?to(k):eo(k)}function kt(e){var t=e.content,a=e.width,r=e.height,n=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=u(u({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[J]="");var f=u({},i.styles);Ze(n)&&(f.transform=Tn({transform:n,width:a,height:r}),f["-webkit-transform"]=f.transform);var d=be(f);d.length>0&&(l.style=d);var c=[];return c.push({tag:"span",attributes:l,children:[t]}),c}function ro(e){var t=e.content,a=e.extra,r=u(u({},a.attributes),{},{class:a.classes.join(" ")}),n=be(a.styles);n.length>0&&(r.style=n);var i=[];return i.push({tag:"span",attributes:r,children:[t]}),i}var Oe=M.styles;function He(e){var t=e[0],a=e[1],r=e.slice(4),n=ye(r,1),i=n[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ee.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ee.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ee.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:a,icon:o}}var no={found:!1,width:512,height:512};function oo(e,t){!ca&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function We(e,t){var a=t;return t==="fa"&&m.styleDefault!==null&&(t=U()),new Promise(function(r,n){if(a==="fa"){var i=Pa(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Oe[t]&&Oe[t][e]){var o=Oe[t][e];return r(He(o))}oo(e,t),r(u(u({},no),{},{icon:m.showMissingIcons&&e?B("missingIconAbstract")||{}:{}}))})}var wt=function(){},Ue=m.measurePerformance&&ue&&ue.mark&&ue.measure?ue:{mark:wt,measure:wt},te='FA "7.0.1"',io=function(t){return Ue.mark("".concat(te," ").concat(t," begins")),function(){return La(t)}},La=function(t){Ue.mark("".concat(te," ").concat(t," ends")),Ue.measure("".concat(te," ").concat(t),"".concat(te," ").concat(t," begins"),"".concat(te," ").concat(t," ends"))},rt={begin:io,end:La},me=function(){};function St(e){var t=e.getAttribute?e.getAttribute(J):null;return typeof t=="string"}function so(e){var t=e.getAttribute?e.getAttribute(Xe):null,a=e.getAttribute?e.getAttribute(Ve):null;return t&&a}function lo(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function fo(){if(m.autoReplaceSvg===!0)return ge.replace;var e=ge[m.autoReplaceSvg];return e||ge.replace}function uo(e){return b.createElementNS("http://www.w3.org/2000/svg",e)}function co(e){return b.createElement(e)}function Ta(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?uo:co:a;if(typeof e=="string")return b.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){n.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){n.appendChild(Ta(o,{ceFn:r}))}),n}function mo(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var ge={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(Ta(n),a)}),a.getAttribute(J)===null&&m.keepOriginalSource){var r=b.createComment(mo(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~Qe(a).indexOf(m.replacementClass))return ge.replace(t);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return se(s)}).join(`
`);a.setAttribute(J,""),a.innerHTML=o}};function At(e){e()}function Fa(e,t){var a=typeof t=="function"?t:me;if(e.length===0)a();else{var r=At;m.mutateApproach===hn&&(r=W.requestAnimationFrame||At),r(function(){var n=fo(),i=rt.begin("mutate");e.map(n),i(),a()})}}var nt=!1;function Ca(){nt=!0}function Be(){nt=!1}var pe=null;function Et(e){if(ft&&m.observeMutations){var t=e.treeCallback,a=t===void 0?me:t,r=e.nodeCallback,n=r===void 0?me:r,i=e.pseudoElementsCallback,o=i===void 0?me:i,s=e.observeMutationsRoot,l=s===void 0?b:s;pe=new ft(function(f){if(!nt){var d=U();Z(f).forEach(function(c){if(c.type==="childList"&&c.addedNodes.length>0&&!St(c.addedNodes[0])&&(m.searchPseudoElements&&o(c.target),a(c.target)),c.type==="attributes"&&c.target.parentNode&&m.searchPseudoElements&&o([c.target],!0),c.type==="attributes"&&St(c.target)&&~kn.indexOf(c.attributeName))if(c.attributeName==="class"&&so(c.target)){var h=ke(Qe(c.target)),g=h.prefix,p=h.iconName;c.target.setAttribute(Xe,g||d),p&&c.target.setAttribute(Ve,p)}else lo(c.target)&&n(c.target)})}}),H&&pe.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function go(){pe&&pe.disconnect()}function ho(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var i=n.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),a}function vo(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=ke(Qe(e));return n.prefix||(n.prefix=U()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=Rn(n.prefix,e.innerText)||tt(n.prefix,ba(e.innerText))),!n.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function po(e){var t=Z(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function yo(){return{iconName:null,prefix:null,transform:D,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function It(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=vo(e),r=a.iconName,n=a.prefix,i=a.rest,o=po(e),s=Re("parseNodeAttributes",{},e),l=t.styleParser?ho(e):[];return u({iconName:r,prefix:n,transform:D,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var bo=M.styles;function Na(e){var t=m.autoReplaceSvg==="nest"?It(e,{styleParser:!1}):It(e);return~t.extra.classes.indexOf(ma)?B("generateLayersText",e,t):B("generateSvgReplacementMutation",e,t)}function xo(){return[].concat(_(oa),_(ia))}function Pt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!H)return Promise.resolve();var a=b.documentElement.classList,r=function(c){return a.add("".concat(dt,"-").concat(c))},n=function(c){return a.remove("".concat(dt,"-").concat(c))},i=m.autoFetchSvg?xo():Bt.concat(Object.keys(bo));i.includes("fa")||i.push("fa");var o=[".".concat(ma,":not([").concat(J,"])")].concat(i.map(function(d){return".".concat(d,":not([").concat(J,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Z(e.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=rt.begin("onTree"),f=s.reduce(function(d,c){try{var h=Na(c);h&&d.push(h)}catch(g){ca||g.name==="MissingIcon"&&console.error(g)}return d},[]);return new Promise(function(d,c){Promise.all(f).then(function(h){Fa(h,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),l(),d()})}).catch(function(h){l(),c(h)})})}function ko(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Na(e).then(function(a){a&&Fa([a],t)})}function wo(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:ze(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:ze(n||{})),e(r,u(u({},a),{},{mask:n}))}}var So=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?D:r,i=a.symbol,o=i===void 0?!1:i,s=a.mask,l=s===void 0?null:s,f=a.maskId,d=f===void 0?null:f,c=a.classes,h=c===void 0?[]:c,g=a.attributes,p=g===void 0?{}:g,y=a.styles,w=y===void 0?{}:y;if(t){var k=t.prefix,S=t.iconName,O=t.icon;return we(u({type:"icon"},t),function(){return G("beforeDOMElementCreation",{iconDefinition:t,params:a}),at({icons:{main:He(O),mask:l?He(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:k,iconName:S,transform:u(u({},D),n),symbol:o,maskId:d,extra:{attributes:p,styles:w,classes:h}})})}},Ao={mixout:function(){return{icon:wo(So)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Pt,a.nodeCallback=ko,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?b:r,i=a.callback,o=i===void 0?function(){}:i;return Pt(n,o)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,i=r.prefix,o=r.transform,s=r.symbol,l=r.mask,f=r.maskId,d=r.extra;return new Promise(function(c,h){Promise.all([We(n,i),l.iconName?We(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(g){var p=ye(g,2),y=p[0],w=p[1];c([a,at({icons:{main:y,mask:w},prefix:i,iconName:n,transform:o,symbol:s,maskId:f,extra:d,watchable:!0})])}).catch(h)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.transform,s=a.styles,l=be(s);l.length>0&&(n.style=l);var f;return Ze(o)&&(f=B("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(f||i.icon),{children:r,attributes:n}}}},Eo={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,i=n===void 0?[]:n;return we({type:"layer"},function(){G("beforeDOMElementCreation",{assembler:a,params:r});var o=[];return a(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(_(i)).join(" ")},children:o}]})}}}},Io={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,i=n===void 0?[]:n,o=r.attributes,s=o===void 0?{}:o,l=r.styles,f=l===void 0?{}:l;return we({type:"counter",content:a},function(){return G("beforeDOMElementCreation",{content:a,params:r}),ro({content:a.toString(),extra:{attributes:s,styles:f,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(_(i))}})})}}}},Po={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,i=n===void 0?D:n,o=r.classes,s=o===void 0?[]:o,l=r.attributes,f=l===void 0?{}:l,d=r.styles,c=d===void 0?{}:d;return we({type:"text",content:a},function(){return G("beforeDOMElementCreation",{content:a,params:r}),kt({content:a,transform:u(u({},D),i),extra:{attributes:f,styles:c,classes:["".concat(m.cssPrefix,"-layers-text")].concat(_(s))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,i=r.extra,o=null,s=null;if(Wt){var l=parseInt(getComputedStyle(a).fontSize,10),f=a.getBoundingClientRect();o=f.width/l,s=f.height/l}return Promise.resolve([a,kt({content:a.innerHTML,width:o,height:s,transform:n,extra:i,watchable:!0})])}}},Ma=new RegExp('"',"ug"),Ot=[1105920,1112319],jt=u(u(u(u({},{FontAwesome:{normal:"fas",400:"fas"}}),mr),mn),wr),Ye=Object.keys(jt).reduce(function(e,t){return e[t.toLowerCase()]=jt[t],e},{}),Oo=Object.keys(Ye).reduce(function(e,t){var a=Ye[t];return e[t]=a[900]||_(Object.entries(a))[0][1],e},{});function jo(e){var t=e.replace(Ma,"");return ba(_(t)[0]||"")}function Lo(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(Ma,""),n=r.codePointAt(0),i=n>=Ot[0]&&n<=Ot[1],o=r.length===2?r[0]===r[1]:!1;return i||o||t}function To(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(Ye[a]||{})[n]||Oo[a]}function Lt(e,t){var a="".concat(gn).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var i=Z(e.children),o=i.filter(function(x){return x.getAttribute(Ne)===t})[0],s=W.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),f=l.match(bn),d=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(o&&!f)return e.removeChild(o),r();if(f&&c!=="none"&&c!==""){var h=s.getPropertyValue("content"),g=To(l,d),p=jo(h),y=f[0].startsWith("FontAwesome"),w=Lo(s),k=tt(g,p),S=k;if(y){var O=zn(p);O.iconName&&O.prefix&&(k=O.iconName,g=O.prefix)}if(k&&!w&&(!o||o.getAttribute(Xe)!==g||o.getAttribute(Ve)!==S)){e.setAttribute(a,S),o&&e.removeChild(o);var N=yo(),j=N.extra;j.attributes[Ne]=t,We(k,g).then(function(x){var L=at(u(u({},N),{},{icons:{main:x,mask:Oa()},prefix:g,iconName:S,extra:j,watchable:!0})),E=b.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(E,e.firstChild):e.appendChild(E),E.outerHTML=L.map(function(T){return se(T)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function Fo(e){return Promise.all([Lt(e,"::before"),Lt(e,"::after")])}function Co(e){return e.parentNode!==document.head&&!~vn.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Ne)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var No=function(t){return!!t&&ua.some(function(a){return t.includes(a)})},Mo=function(t){if(!t)return[];var a=new Set,r=t.split(/,(?![^()]*\))/).map(function(l){return l.trim()});r=r.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(f){return f.trim()})});var n=de(r),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;if(No(o)){var s=ua.reduce(function(l,f){return l.replace(f,"")},o);s!==""&&s!=="*"&&a.add(s)}}}catch(l){n.e(l)}finally{n.f()}return a};function Tt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(H){var a;if(t)a=e;else if(m.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=de(document.styleSheets),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;try{var s=de(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var f=l.value,d=Mo(f.selectorText),c=de(d),h;try{for(c.s();!(h=c.n()).done;){var g=h.value;r.add(g)}}catch(y){c.e(y)}finally{c.f()}}}catch(y){s.e(y)}finally{s.f()}}catch(y){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(y.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(y){n.e(y)}finally{n.f()}if(!r.size)return;var p=Array.from(r).join(", ");try{a=e.querySelectorAll(p)}catch{}}return new Promise(function(y,w){var k=Z(a).filter(Co).map(Fo),S=rt.begin("searchPseudoElements");Ca(),Promise.all(k).then(function(){S(),Be(),y()}).catch(function(){S(),Be(),w()})})}}var _o={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Tt,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?b:r;m.searchPseudoElements&&Tt(n)}}},Ft=!1,$o={mixout:function(){return{dom:{unwatch:function(){Ca(),Ft=!0}}}},hooks:function(){return{bootstrap:function(){Et(Re("mutationObserverCallbacks",{}))},noAuto:function(){go()},watch:function(a){var r=a.observeMutationsRoot;Ft?Be():Et(Re("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Ct=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var i=n.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},a)},Do={mixout:function(){return{parse:{transform:function(a){return Ct(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=Ct(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,i=a.containerWidth,o=a.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),f="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),d="rotate(".concat(n.rotate," 0 0)"),c={transform:"".concat(l," ").concat(f," ").concat(d)},h={transform:"translate(".concat(o/2*-1," -256)")},g={outer:s,inner:c,path:h};return{tag:"g",attributes:u({},g.outer),children:[{tag:"g",attributes:u({},g.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:u(u({},r.icon.attributes),g.path)}]}]}}}},je={x:0,y:0,width:"100%",height:"100%"};function Nt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Ro(e){return e.tag==="g"?e.children:[e]}var zo={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),i=n?ke(n.split(" ").map(function(o){return o.trim()})):Oa();return i.prefix||(i.prefix=U()),a.mask=i,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.mask,s=a.maskId,l=a.transform,f=i.width,d=i.icon,c=o.width,h=o.icon,g=Ln({transform:l,containerWidth:c,iconWidth:f}),p={tag:"rect",attributes:u(u({},je),{},{fill:"white"})},y=d.children?{children:d.children.map(Nt)}:{},w={tag:"g",attributes:u({},g.inner),children:[Nt(u({tag:d.tag,attributes:u(u({},d.attributes),g.path)},y))]},k={tag:"g",attributes:u({},g.outer),children:[w]},S="mask-".concat(s||gt()),O="clip-".concat(s||gt()),N={tag:"mask",attributes:u(u({},je),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[p,k]},j={tag:"defs",children:[{tag:"clipPath",attributes:{id:O},children:Ro(h)},N]};return r.push(j,{tag:"rect",attributes:u({fill:"currentColor","clip-path":"url(#".concat(O,")"),mask:"url(#".concat(S,")")},je)}),{children:r,attributes:n}}}},Ho={provides:function(t){var a=!1;W.matchMedia&&(a=W.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:u(u({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=u(u({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:u(u({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:u(u({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:u(u({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:u(u({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:u(u({},o),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:u(u({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:u(u({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Wo={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),i=n===null?!1:n===""?!0:n;return a.symbol=i,a}}}},Uo=[Cn,Ao,Eo,Io,Po,_o,$o,Do,zo,Ho,Wo];Xn(Uo,{mixoutsTo:F});F.noAuto;F.config;var Bo=F.library;F.dom;F.parse;F.findIconDefinition;F.toHtml;F.icon;F.layer;F.text;F.counter;/*!
 * Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */var Yo={prefix:"fas",iconName:"file-arrow-up",icon:[384,512,["file-upload"],"f574","M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM209 263c-9.4-9.4-24.6-9.4-33.9 0l-64 64c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l23-23 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-86.1 23 23c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-64-64z"]},Ko={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]};const Ke="https://pusatpneumatic.com/absen",Jo=480,Go=960,Xo=840,Le=5,Vo=5e3;function ee(e,t="info"){const a=document.getElementById("message");a.textContent=e,a.classList.remove("bg-blue-600","bg-red-600","bg-green-600"),t==="error"?a.classList.add("bg-red-600"):t==="success"?a.classList.add("bg-green-600"):a.classList.add("bg-blue-600"),a.classList.remove("opacity-0"),a.classList.add("opacity-100"),setTimeout(()=>{a.classList.remove("opacity-100"),a.classList.add("opacity-0")},3e3)}document.getElementById("upload-form").addEventListener("submit",async function(e){e.preventDefault();const t=document.querySelector('input[type="file"]'),a=new FormData;a.append("csvFile",t.files[0]),ee("⏳ Uploading...","info");try{const n=await(await fetch(`${Ke}/upload.php`,{method:"POST",body:a})).text();let i;try{i=JSON.parse(n)}catch(o){console.error("Error parsing JSON dari upload.php:",o.message,n),ee("❌ Upload gagal: respons server bukan JSON valid.","error");return}if(!i.success){ee("❌ Upload gagal: "+i.message,"error");return}ee("✅ Sukses! Data berhasil diparse","success"),console.log("Parsed data:",i.parse_log),i.parse_log&&i.parse_log.data&&console.log("User Logs:",i.parse_log.data)}catch(r){ee("❌ Terjadi kesalahan: "+r.message,"error")}});function qo(e,t,a=[],r=[]){const n=document.querySelectorAll(e),i=document.querySelectorAll(t);if(n.forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-target"),l=document.getElementById(s);i.forEach(f=>f.classList.add("hidden")),n.forEach(f=>{r.forEach(d=>f.classList.add(d)),a.forEach(d=>f.classList.remove(d))}),l.classList.remove("hidden"),a.forEach(f=>o.classList.add(f)),r.forEach(f=>o.classList.remove(f))})}),n.length>0&&i.length>0){const o=n[0],s=o.getAttribute("data-target");document.getElementById(s).classList.remove("hidden"),a.forEach(f=>o.classList.add(f)),r.forEach(f=>o.classList.remove(f))}}function $(e){if(e==null)return"-";const t=Math.floor(e/60),a=String(e%60).padStart(2,"0");return`${t}:${a}`}const Qo=[[5,0],[15,1e4],[30,25e3],[60,5e4],[1/0,1e5]];function Zo(e){return Qo.find(([t])=>e<=t)[1]}function ei(e,t,a){const r=new Date(e,t-1,a);return r.getDay()===6||r.getDay()===0}function ti(e){const t=e.i||{},a=t.m||0,r=t.k||0,n=t.l||0;return{minutes:a,formatted:$(a),hariKerja:r,hariLibur:n}}function ai(e){return Array.isArray(e)?e.map((t,a)=>{const r=a+1;if(typeof t=="number")return{tanggal:r,jamMasuk:null,jamKeluar:null,breaks:[],isEmpty:!0,holiday:t===2,status:t};const n=t.l||[];let i=null,o=null;const s=[];return n.forEach((l,f)=>{const[d,c]=l;if(c===0&&!i&&(i=d),c===1&&(o=d),f<n.length-1){const[h,g]=n[f+1];if(c===2&&g===3){const p=h-d;p>0&&s.push(p)}}}),{tanggal:r,jamMasuk:i,jamKeluar:o,breaks:s,isEmpty:!i&&!o,holiday:t.s===2,status:t.s}}):(console.warn("normalizeLogs: input bukan array",e),[])}async function ri(e,t,a){if(!e||e.length===0)return{workMinutes:0,workHours:"00:00",lemburHours:"00:00",uangLemburKotor:0,jamKerjaIdeal:"00:00",dendaTelat:0,uangLembur:0,telatHours:"00:00",earlyOutHours:"00:00",absenceDays:0,missingDays:0,holidayDays:0,breakHours:"00:00"};let r=0,n=0,i=0,o=0,s=0,l=0,f=0,d=0;const c=new Set,h=[],g=[],p=new Date,y=p.getFullYear(),w=p.getMonth()+1,k=p.getDate(),S=t===y&&a===w?k:31;e.forEach(x=>{if(x.tanggal>S)return;if(x.holiday&&!x.jamMasuk&&!x.jamKeluar){d++;return}if(c.add(x.tanggal),!x.jamMasuk||!x.jamKeluar){f++;return}const L=x.jamMasuk,E=x.jamKeluar,T=ei(t,a,x.tanggal)?Xo:Go,C=E-L;r+=C;const I=L-Jo;if(I>Le){s+=I;const fe=Zo(I);o+=fe,h.push({tanggal:x.tanggal,telat:I,denda:fe})}const le=T-E;le>Le&&(l+=le);const A=E-T;A>Le&&(n+=A,g.push({tanggal:x.tanggal,lembur:A}));const Y=x.breaks.reduce((fe,_a)=>fe+_a,0);i+=Y});const O=e.filter(x=>!x.holiday&&x.isEmpty&&x.tanggal<=S).length,N=Math.floor(n/60)*Vo,j=Math.max(N-o,0);return{workMinutes:r,workHours:$(r),lemburHours:$(n),uangLemburKotor:N,dendaTelat:o,uangLembur:j,telatHours:$(s),earlyOutHours:$(l),absenceDays:O,missingDays:f,holidayDays:d,breakHours:$(i),dendaPerHari:h}}async function ni(e){const t=document.getElementById("yearSelect"),a=document.getElementById("monthSelect"),r=Object.keys(e).sort().reverse();r.forEach(s=>{const l=document.createElement("option");l.value=s,l.textContent=s,t.appendChild(l)});const n=r[0],i=e[n]?e[n].sort().reverse():[],o=i[0];return t.value=n,a.innerHTML="",i.forEach(s=>{const l=document.createElement("option");l.value=s,l.textContent=s,a.appendChild(l)}),a.value=o,{year:n,month:o}}async function oi(e,t){const a=document.getElementById("monthSelect"),r=e[t]||[];return a.innerHTML="",r.forEach(n=>{const i=document.createElement("option");i.value=n,i.textContent=n,a.appendChild(i)}),r[0]||null}function Mt(e,t,a=""){t.innerHTML=`
    <tr class="${a}">
      ${e.map(r=>`
        <th 
          class="px-4 py-3 border-b text-center cursor-pointer"
          data-type="${r.type||"string"}"
          data-sort="${r.key}"
        >${r.label}</th>
      `).join("")}
    </tr>
  `}function _t(e,t,a){t.innerHTML=e.map(r=>`
    <tr>
      ${a.map(n=>`
        <td class="px-4 py-2 border text-center">${r[n.key]??"-"}</td>
      `).join("")}
    </tr>
  `).join("")}function $t(e,t,a,r="asc"){const n=Array.from(e.querySelectorAll("tr")),i=o=>{const s=o.textContent.trim();if(a==="number")return parseFloat(s)||0;if(a==="time"){const[l,f]=s.split(":").map(Number);return l*60+(f||0)}return s.toLowerCase()};n.sort((o,s)=>{const l=i(o.children[t]),f=i(s.children[t]);return r==="asc"?l-f:f-l}),e.innerHTML="",n.forEach(o=>e.appendChild(o))}Bo.add(Ko,Yo);document.addEventListener("DOMContentLoaded",async()=>{const e=window.fetch;window.fetch=(o,s={})=>{const l=o.includes("?")?"&":"?",f=`${o}${l}_=${Date.now()}`;return e(f,{...s,cache:"no-store"})};function t(){const o=document.getElementById("yearSelect")?.value,s=document.getElementById("monthSelect")?.value;return`${Ke}/json/${o}/${o}-${s}.json`}async function a(){const o=t();try{let x=function(){const L=d.value.toLowerCase();[p,h].forEach(E=>{E.querySelectorAll("tr").forEach(T=>{const C=T.children[0]?.textContent?.toLowerCase()||"";T.style.display=C.includes(L)?"":"none"})})};var s=x;const l=await fetch(o);if(!l.ok)throw new Error("Gagal memuat data JSON");const f=await l.json(),d=document.getElementById("filterName"),c=document.getElementById("summaryHead"),h=document.getElementById("summaryBody"),g=document.getElementById("detailHead"),p=document.getElementById("detailBody"),y=ti(f),w=[{key:"nama",label:"Nama",type:"string"},{key:"workHours",label:`Work<br>${y.formatted}`,type:"time"},{key:"lemburHours",label:"Lembur (jam)",type:"time"},{key:"uangLembur",label:"Uang Lembur",type:"string"},{key:"telatHours",label:"Telat (jam)",type:"time"},{key:"earlyOutHours",label:"Early Out",type:"time"},{key:"absenceDays",label:"Absence",type:"number"},{key:"breakHours",label:"Break (jam)",type:"time"}],k=[{key:"nama",label:"Nama",type:"string"},{key:"tanggal",label:"Tanggal",type:"number"},{key:"jamMasuk",label:"Jam Masuk",type:"time"},{key:"breakOut",label:"Jam Break-Out",type:"time"},{key:"breakIn",label:"Jam Break-In",type:"time"},{key:"jamKeluar",label:"Jam Keluar",type:"time"},{key:"ket",label:"KET",type:"string"}];h.innerHTML="",p.innerHTML="",Mt(w,c,"text-gray-800 font-semibold text-sm shadow-sm"),Mt(k,g,"text-gray-800 font-semibold text-sm shadow-sm");const S=[],O=[],N=f.u||[];for(const L of N){const E=L.n,T=(L.d||[]).map(A=>typeof A=="number"?{s:A,l:[]}:A),C=ai(T),I=await ri(C,f.y,f.m);S.push({nama:E,workHours:I.workHours,lemburHours:I.lemburHours,uangLembur:`Rp${I.uangLembur.toLocaleString()}`,telatHours:I.telatHours,earlyOutHours:I.earlyOutHours,absenceDays:I.absenceDays,breakHours:I.breakHours});const le=C.map(A=>{let Y="";return A.status===1?Y="Tidak hadir":A.status===2?Y="Libur":A.isEmpty?Y="Missing Time":A.holiday===1&&(Y="Tanggal Merah"),{nama:E,tanggal:A.tanggal,jamMasuk:$(A.jamMasuk),breakOut:A.breaks.length>=1?$(A.breaks[0]):"-",breakIn:A.breaks.length>=2?$(A.breaks.at(-1)):"-",jamKeluar:$(A.jamKeluar),ket:Y}});O.push(...le)}_t(S,h,w),_t(O,p,k);const j={};g.querySelectorAll("th").forEach((L,E)=>{L.addEventListener("click",()=>{const T=L.dataset.type||"string",C=`detail-${E}`,I=j[C]==="asc"?"desc":"asc";j[C]=I,$t(p,E,T,I)})}),c.querySelectorAll("th").forEach((L,E)=>{L.addEventListener("click",()=>{const T=L.dataset.type||"string",C=`summary-${E}`,I=j[C]==="asc"?"desc":"asc";j[C]=I,$t(h,E,T,I)})}),d.addEventListener("input",x)}catch(l){console.error("❌ Gagal memuat JSON:",l);const f=document.getElementById("message");f&&(f.innerText="Gagal memuat data. Periksa file JSON.")}}async function r(){try{const o=await fetch(`${Ke}/json/list_index.json`);if(!o.ok)throw new Error("Failed to fetch list_index.json");const s=await o.json(),f=Object.keys(s).sort().reverse()[0],c=s[f].sort().reverse()[0];await ni(s,f,c);const h=document.getElementById("yearSelect"),g=document.getElementById("monthSelect");h.addEventListener("change",async()=>{await oi(s,h.value),a()}),g.addEventListener("change",a),a()}catch(o){console.error("❌ Error initializing period selectors:",o);const s=document.getElementById("message");s&&(s.innerText="Gagal memuat daftar tahun/bulan. Periksa file list_index.json.")}}const n=document.getElementById("toggle-upload-btn"),i=document.getElementById("upload-form");n&&i&&n.addEventListener("click",()=>{i.classList.toggle("hidden"),i.classList.contains("hidden")?n.innerHTML='<i class="fa-solid fa-file-arrow-up"></i> Upload Data':n.innerHTML='<i class="fa-solid fa-xmark"></i>'}),await r(),qo(".tab-btn",".tab-panel",["bg-blue-600","text-white"],["bg-gray-200","text-gray-700"])});
