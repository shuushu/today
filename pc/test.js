!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}window.addEventListener("pageshow",(function(t){t.persisted&&null!==history.state&&"Article"===history.state.name&&window.location.reload()})),moment.locale("ko"),moment.updateLocale("ko",{relativeTime:{h:"1시간"}}),gsap.registerPlugin(Draggable,DrawSVGPlugin,MotionPathPlugin,ScrollToPlugin,InertiaPlugin);var u=function(){var t,e,r,n,i,o=document.getElementById("header"),u="#newsEdgeProgress",l=window.matchMedia("(orientation: portrait)").matches,d={isClick:!1,isPopPop:!1,isRender:!1};r=function(){var t,e,n,i,c,u,l,p,f,h,m,v,g=$("#newsEdgeBubbles"),y=$("#todayListWrap");function b(){gsap.killTweensOf(o),gsap.killTweensOf(h),gsap.killTweensOf(m),gsap.killTweensOf(v),gsap.killTweensOf(f),gsap.killTweensOf(n),gsap.killTweensOf(i)}return{setClickedBubble:function(){var t;this,h=a((t=this).parentNode.childNodes).filter((function(e){return e!==t})),m=this.querySelector("circle"),v=this.querySelector("text")},setListRefData:function(e){t=e},listRender:function(r){!function(r){f=$('<button type="button" class="btnTodayClose">닫기</button>'),e=$('<div class="todayList" />'),n=$('<h3 class="todayListTitle" />'),i=$('<div class="todayListItem" />'),c=$('<div class="todayListItemCounts">'),u=$('<ul class="listItemWrap" />'),e.append(f),e.append(n.html(t.keyword_service.split("<br />").map((function(t,e){return 0!==e&&e%2==1?t+"<br />":t+" "})))),c.append(t.article.map((function(t,e,r){return e<r.length-1?'<span class="count-'.concat(e,'"></span>'):'<span class="count-'.concat(e,'"></span><span class="count-more"></span>')}))),u.append(t.article.map((function(e,r){var n="",a=utils.isToday(t.serverDTM,utils.dateFormat(e.insert_dtm))?moment(utils.dateFormat(e.insert_dtm)).startOf("min").fromNow():e.insert_dtm,i=e.img_url?"":" empty";return n+='<li class="item" role="link" data-link="'+e.link_url+'" onclick="olapclick(\'TOR0'+(r+1)+"')\">",n+='<div class="face frontFace">',n+='<h5 class="subject">'+e.artc_title+"</h5>",n+='<div class="info">',n+='<div class="state"><span class="provider">'+e.cp_nm+'</span><span class="time">'+a+"</span></div>",n+='<div class="thumb-nail '+i+'"><img src="'+e.img_url+'" alt=""></div>',n+="</div></div>",n+='<div class="face backFace"></div>',n+="</li>"}))),l=$('<li class="more" role="link" data-link="'.concat(t.refs.link,'" onclick="olapclick(\'TOM00\');"><div class="face frontFace"><div class="innerWrap">비슷한 기사<div><span class="size">').concat(utils.withCommas(t.refs.cnt),'</span><span>개</span></div>더 보기</div></div><div class="face backFace"></div></li>')),p=$('<div class="todayListEffect"></div>'),u.append(l),i.append(u),i.append(c),e.append(i),y.append(e),y.append(p),r(y)}(r)},listUpdate:function(e){!function(e){var r=u.children();n.html(t.keyword_service.split("<br />").map((function(t,e){return 0!==e&&e%2==1?t+"<br />":t+" "}))),t.article.forEach((function(e,n){var a=utils.isToday(t.serverDTM,utils.dateFormat(e.insert_dtm))?moment(utils.dateFormat(e.insert_dtm)).startOf("min").fromNow():e.insert_dtm;r.eq(n).attr("data-link",e.link_url),r.eq(n).find(".subject").text(e.artc_title),r.eq(n).find(".provider").text(e.cp_nm),r.eq(n).find(".time").text(a),e.img_url?(r.eq(n).find(".thumb-nail").removeClass("empty"),r.eq(n).find(".thumb-nail img").attr("src",e.img_url)):(r.eq(n).find(".thumb-nail").addClass("empty"),r.eq(n).find(".thumb-nail img").attr("src",""))})),l.attr("data-link",t.refs.link),l.find(".size").text(utils.withCommas(t.refs.cnt)),e(y)}(e)},listRefEvent:function(){!function(){var t={width:335,x:0,initX:0,prevIndex:0,activeIndex:0,distance:0,minDistance:10,gap:20,margin:10,duration:.3,offsets:[],leng:6,direction:null,move:167.5,movePercent:0,moveLimit:.1,minScale:.92};function e(){switch(t.distance=this.x-t.initX,t.x=t.initX+t.distance,t.direction=t.distance>-1?"right":"left",t.movePercent=Math.abs(t.distance/t.width),t.direction){case"left":var e=t.movePercent<=t.moveLimit,r=t.movePercent-t.moveLimit;t.activeIndex<t.leng-2&&gsap.set(u.children(".item").eq(t.activeIndex),{autoAlpha:e?1:1-(r+1.1*t.moveLimit),x:e?0:0+200*r<=t.move?0+200*r:t.move,scale:e?1:1-r>=t.minScale?1-r:t.minScale});break;case"right":e=t.movePercent>=t.moveLimit/2;var n=t.movePercent-t.moveLimit;t.activeIndex>=0&&5!==t.activeIndex&&t.activeIndex-1!=-1&&gsap.set(u.children(".item").eq(t.activeIndex-1),{autoAlpha:e?0+(n+1.1*t.moveLimit):0,x:e?t.move-200*n>=0?t.move-200*n:0:t.move,scale:e?0+n+2*t.moveLimit<=t.minScale?t.minScale:0+n+2*t.moveLimit<=1?0+n+2*t.moveLimit:1:t.minScale})}}!function(){for(var e=0;e<t.leng;e++)t.offsets.push(-(t.width+t.margin)*e);void 0!==history.state.listIndex&&(t.prevIndex=t.activeIndex=history.state.listIndex,u.children(".item").each((function(e,r){e<t.activeIndex&&e<4&&gsap.set(r,{autoAlpha:0,x:t.width/2,scale:.92})})),gsap.to(u,t.duration,{x:t.offsets[t.activeIndex]})),c.children().removeClass("active"),c.children().eq(t.activeIndex).addClass("active")}(),Draggable.create(u,{type:"x",throwProps:!1,edgeResistance:.85,onDrag:e,onDragAndThrowUpdate:e,onDragStart:function(){t.initX=this.x},onDragEnd:function(){switch(t.direction){case"left":Math.abs(t.distance)>t.minDistance*(t.width/100)&&(t.prevIndex=t.activeIndex,t.activeIndex=Math.min(t.activeIndex+1,t.leng-1),history.replaceState(s(s({},history.state),{},{listIndex:t.activeIndex}),"네이트뉴스"),t.activeIndex<t.leng-1&&t.activeIndex!==t.leng-1&&gsap.to(u.children(".item").eq(t.activeIndex-1),t.duration,{autoAlpha:0,x:t.move,scale:t.minScale}));break;case"right":Math.abs(t.distance)>t.minDistance*(t.width/100)&&(t.prevIndex=t.activeIndex,t.activeIndex=Math.max(0,t.activeIndex-1),history.replaceState(s(s({},history.state),{},{listIndex:t.activeIndex}),"네이트뉴스"),t.activeIndex>=0&&5!==t.activeIndex&&gsap.to(u.children(".item").eq(t.activeIndex),t.duration,{autoAlpha:1,x:0,scale:1}))}c.children().removeClass("active"),c.children().eq(t.activeIndex).addClass("active"),t.activeIndex>=0&&5!==t.activeIndex&&t.activeIndex-1!=-1&&gsap.to(u.children(".item").eq(t.activeIndex-1),t.duration,{autoAlpha:0});gsap.to(u,t.duration,{x:t.offsets[t.activeIndex]})}}),y.on("click.PopPop",".listItemWrap li",(function(){var e=$(this);e.addClass("active"),gsap.delayedCall(t.duration/2,(function(){gsap.set(p,{x:e.offset().left,y:e.offset().top,width:e.width(),height:e.height(),borderRadius:e.hasClass("more")?"100%":.05970149253731343*e.width(),autoAlpha:1,ease:"power4.inOut",onComplete:function(){gsap.delayedCall(t.duration/2,(function(){gsap.to(p,t.duration,{scale:e.hasClass("more")?50:25,ease:"power4.inOut",onComplete:function(){return gsap.set("body",{clearProps:"background"}),window.location=e.attr("data-link")}})}))}})}))})),y.find(".btnTodayClose").on("click.PopPop",(function(){gsap.isTweening(i)||r.popOut()}))}()},popUp:function(e){!function(e){e&&b();var r=e?0:.3;gsap.to(window,r,{scrollTo:0,ease:"none",onComplete:function(){gsap.set("body",{overflow:"hidden",position:"fixed",left:0,top:0,right:0,bottom:0,background:utils.RGBAToRGB(t.fill)}),gsap.set(g,{zIndex:100}),y.addClass(t.index<5?"highScore":"lowScore")}}),h.forEach((function(t){return gsap.to(t.querySelector(".bubble"),r/2,{scale:.1,autoAlpha:0,transformOrigin:"50% 50%",ease:"power3.inOut"})})),gsap.to(v,r,{autoAlpha:0,ease:"power3.inOut",onComplete:function(){gsap.to(m,r,{scale:e?1:.8,transformOrigin:"50% 50%",fill:utils.RGBAToRGB(t.fill),ease:"power3.inOut",onComplete:function(){gsap.to(o,r/2,{autoAlpha:0}),gsap.to(m,r,{scale:20,ease:"power3.inOut",onComplete:function(){gsap.set(y,{display:"block"}),gsap.to(f,r,{autoAlpha:1,delay:r}),gsap.fromTo(n,r,{autoAlpha:0,x:-100},{autoAlpha:1,x:0,delay:1.5*r}),gsap.to(i,2*r,{autoAlpha:1,x:0,delay:2*r})}})}})}})}(e)},popOut:function(t){!function(t){t&&b();var e=t?0:.3;history.state&&history.pushState(null,null,window.location.pathname),gsap.set("body",{clearProps:"all"}),gsap.to([f,n,i],e,{autoAlpha:0,ease:"power3.inOut",onComplete:function(){gsap.set(y,{display:"none"}),gsap.set([i,u,u.children()],{clearProps:"all"}),gsap.to(m,2*e,{scale:1,ease:"power3.inOut",onComplete:function(){d.isPopPop=!1,d.isClick=!1,gsap.set(v,{autoAlpha:1}),gsap.set(m,{clearProps:"all"}),gsap.set(g,{clearProps:"all"}),y.removeClass("lowScore highScore"),h.forEach((function(t){return gsap.to(t.querySelector(".bubble"),e/2,{scale:1,autoAlpha:1,ease:"power2.inOut"})}))}}),gsap.to(o,2*e,{autoAlpha:1,ease:"power3.inOut"})}})}(t)}}}(),t=function(){var t={selection:d3.select("#newsEdgeBubbles"),options:{width:e(),height:e(),gap:4,duration:600,velocityDecay:.35,forceStrength:.003,percent:[48,32,28.8,26.6,24,20,20,20,20,20].map((function(t,e){return e<4?t/1.1:t})),sizes:[6.66,5.06,4.26,4,3.73,3.2,3.2,3.2,3.2,3.2].map((function(t,e){return e<4?t/1.1:t})),color:["rgba(21, 45, 255, .7)","rgba(47, 134, 255, .7)","rgba(20, 187, 190, .7)","rgba(86, 55, 255, .7)","rgba(141, 201, 29, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)"],ease:[d3.easeBackOut.overshoot(1.5),d3.easeQuadOut]},prevSq:null,prevPos:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],data:null};function e(){var t=o.getBoundingClientRect().height,e=t+58+window.innerWidth;return l&&e>window.innerHeight?window.innerHeight-(t+58):Math.min(Math.min(window.innerWidth,window.innerHeight),650)}var r,n,a=(r=t.options,n=[[{x:.12,y:.026},{x:.357,y:.357},{x:.053,y:.453},{x:.56,y:.213},{x:.653,y:.693},{x:.546,y:.001},{x:.23,y:.8},{x:.48,y:.8},{x:.753,y:.46},{x:.7467,y:.0667}],[{x:-.3013,y:.04},{x:-.2507,y:.56},{x:-.1333,y:.1333},{x:.32,y:.0373},{x:.3067,y:.3733},{x:.6187,y:.128},{x:.752,y:.3707},{x:1.056,y:.032},{x:1.0987,y:.288},{x:.96,y:.4907}]],function(e){var a,i=l?utils.shuffleArray(n[0]):utils.shuffleArray(n[1]),o=d3.scaleLinear().domain([0,100]).range([0,r.width]),s=[0,1,2,3,4,5,6,7,8,9];return null!==t.prevSq&&(t.prevPos=e.map((function(e,r){var n=-1!==t.prevSq.indexOf(e.keyword_sq)?t.prevPos[t.prevSq.indexOf(e.keyword_sq)]:-1;return-1!==n&&s.splice(s.indexOf(n),1),n}))),t.prevPos=t.prevPos.map((function(t){return-1!==t?t:s.shift()})),t.prevSq=e.map((function(t){return t.keyword_sq})),r.percent.map((function(e,n){return a=o(r.percent[n]/2),{x:r.width*(void 0!==t.prevPos[n]?i[t.prevPos[n]].x:i[n].x)+a,y:r.height*(void 0!==t.prevPos[n]?i[t.prevPos[n]].y:i[n].y)+a}}))});function s(e){var r=t.options,n=a(e),i=d3.scaleLinear().domain([0,100]).range([0,r.width]);return e.map((function(t,e){return utils._objectSpread(utils._objectSpread({},t),{},{radius:i(r.percent[e]/2),x:n[e].x,y:n[e].y})}))}function c(e){var r=t.selection,n=t.options;r.attr("width",n.width).attr("height",n.height).attr("viewBox",[0,0,n.width,n.height]);var a=d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7,8,9]).range(n.color),i=d3.scaleLinear().domain([0,100]).range([0,n.width]);return d3.select("#bubbleGroupWrap").selectAll(".bubbleGroup").data(e,(function(t){return t.keyword_sq})).join((function(t){var e=(t=t.append("g").attr("class","bubbleGroup").attr("role","list").attr("aria-label","버블 UI")).append("svg").attr("class","bubbleWrap").append("g").attr("class","bubble").attr("role","listitem");return e.append("circle").attr("class","bubbleCircle"),e.append("text").attr("class","bubbleText"),function(t){var e=t.select(".bubbleWrap"),r=t.select(".bubble"),o=t.select(".bubbleCircle"),s=t.select(".bubbleText");t.attr("data-importance",(function(t,e){return e})),e.attr("width",(function(t){return 2*t.radius})).attr("height",(function(t){return 2*t.radius})).attr("viewBox",(function(t){return[0,0,2*t.radius,2*t.radius]})),r.attr("transform","scale(0)").transition().delay((function(t,e){return 30*e})).ease(n.ease[0]).duration(n.duration).attr("transform","scale(1)"),o.transition().delay((function(t,e){return 30*e})).ease(n.ease[0]).duration(n.duration).attr("r",(function(t){return t.radius})).attr("cx",0).attr("cy",0).attr("fill",(function(t,e){return a(e)})),s.attr("stroke",(function(t,e){return e<5?"#fff":"#333"})).attr("stroke-width",0).attr("fill",(function(t,e){return e<5?"#fff":"#333"})).attr("font-size",(function(t,e){return i(n.sizes[e])+"px"})).style("text-anchor","middle"),s.selectAll(".lineBreak").data((function(t){return t.keyword_service.split("<br />").map((function(t){return t.trim()})).slice(0,3)})).enter().append("tspan").attr("class","lineBreak").attr("x",0).attr("y",(function(){switch(this.parentNode.childElementCount){case 1:return".3em";case 2:return"-.3em";case 3:return"-.9em";default:return 0}})).attr("dy",(function(t,e){return 0===e?0:1.3*e+"em"})).text((function(t){return t}))}(t),t}),(function(t){return function(t){var e=t.select(".bubbleWrap"),r=t.select(".bubble"),o=t.select(".bubbleCircle"),s=t.select(".bubbleText");t.attr("data-importance",(function(t,e){return e})),e.attr("width",(function(t){return 2*t.radius})).attr("height",(function(t){return 2*t.radius})).attr("viewBox",(function(t){return[0,0,2*t.radius,2*t.radius]})),r.attr("transform","scale(0)").transition().delay((function(t,e){return 30*e})).ease(n.ease[0]).duration(n.duration).attr("transform","scale(1)"),o.transition().delay((function(t,e){return e})).ease(n.ease[0]).duration(n.duration).attr("r",(function(t){return t.radius})).attr("cx",0).attr("cy",0).attr("fill",(function(t,e){return a(e)})),s.attr("stroke",(function(t,e){return e<5?"#fff":"#333"})).attr("stroke-width",0).attr("fill",(function(t,e){return e<5?"#fff":"#333"})).attr("font-size",(function(t,e){return i(n.sizes[e])+"px"})).style("text-anchor","middle"),s.selectAll(".lineBreak").data((function(t){return t.keyword_service.split("<br />").map((function(t){return t.trim()})).slice(0,3)})).enter().append("tspan").attr("class","lineBreak").attr("x",0).attr("y",(function(){switch(this.parentNode.childElementCount){case 1:return".3em";case 2:return"-.3em";case 3:return"-.9em";default:return 0}})).attr("dy",(function(t,e){return 0===e?0:1.3*e+"em"})).text((function(t){return t}))}(t),t}),(function(t){return function(t){t.transition().duration(3*n.duration).style("opacity",0),t.remove()}(t),t})).attr("transform",(function(t){return"translate("+t.x+", "+t.y+")"})).on("click",(function(t){d.isClick||(d.isClick=!0,f({selection:this,keyword_service:t.keyword_service,keyword_dtm:t.keyword_dtm,keyword_sq:t.keyword_sq,index:t.index},!1))}))}function u(e,r,n){var a=t.options,i=t.simulator,o=function(t){return d3.forceSimulation().alphaTarget(0).velocityDecay(a.velocityDecay).force("x",d3.forceX(a.width/2).strength(l?12*a.forceStrength:4*a.forceStrength)).force("y",d3.forceY(a.height/2).strength(l?12*a.forceStrength:4*a.forceStrength)).force("charge",d3.forceManyBody().strength(a.forceStrength)).force("collide",d3.forceCollide().radius((function(t){return t.radius+a.gap}))).on("tick",(function(e,r){return t.transition().duration(a.duration/10).attr("transform",(function(t){return"translate("+(t.x-1)+", "+(t.y-1)+")"})),t})).on("end",(function(){})).nodes(r)},s=function(t){return d3.forceSimulation().alphaTarget(1).velocityDecay(a.velocityDecay).force("x",d3.forceX(a.width/2).strength(12*a.forceStrength)).force("y",d3.forceY(a.height/2).strength(12*a.forceStrength)).force("charge",d3.forceManyBody().strength(a.forceStrength)).force("collide",d3.forceCollide().radius((function(t){return t.radius-(a.gap+150)*utils.getRandomIntInclusive(0,0,!0)})).strength(60*a.forceStrength)).on("tick",(function(){return t.transition().duration(a.duration/10).attr("transform",(function(t){return"translate("+(t.x-1)+", "+(t.y-1)+") scale(.8)"})),t})).on("end",(function(){})).nodes(r)},c=function(t){return d3.forceSimulation().alphaTarget(0).velocityDecay(a.velocityDecay).force("x",d3.forceX(a.width/2).strength(12*a.forceStrength)).force("y",d3.forceY(a.height/2).strength(12*a.forceStrength)).force("charge",d3.forceManyBody()).force("collide",d3.forceCollide().radius((function(t){return t.radius+a.gap}))).on("tick",(function(){return t.transition().duration(a.duration/10).attr("transform",(function(t){return"translate("+(t.x-1)+", "+(t.y-1)+") scale(1)"})),t})).on("end",(function(){})).nodes(r)};switch(n){case"onInit":return i&&i.stop(),o(e);case"onDragStart":return i&&i.stop(),s(e);case"onDragEnd":return i&&i.stop(),c(e)}}return{init:function(){var e;(e=t.selection).attr("role","group").attr("aria-labelledby","title desc"),e.append("title").attr("id","title").text("한눈에 보는 오늘"),e.append("desc").attr("id","desc").text("현재시간 실시간 이슈를 키워드 형태로 제공"),e.append("g").attr("id","bubbleGroupWrap"),t.data=s(i.keyword),t.group=c(t.data),t.simulator=u(t.group,t.data,"onInit")},update:function(){t.data=s(i.keyword),t.group=c(t.data),t.simulator=u(t.group,t.data,"onInit")},resize:function(){t.options.width=e(),t.options.height=e(),t.data=s(t.data),t.group=c(t.data),t.simulator=u(t.group,t.data,"onInit")},dragStart:function(){t.simulator=u(t.group,t.data,"onDragStart")},dragEnd:function(){i.resetKeyword(),i.dataLoadEvent("".concat(KEYWORD_URL,"?service_dtm=").concat(utils.convertTime(i.serviceDTM,"YMDH")),(function(e){for(var r in i.serverDTM=utils.dateFormat(e.server_dtm),e.data)i.keyword=e.data[r];t.data=s(i.keyword),t.group=c(t.data),t.simulator=u(t.group,t.data,"onDragEnd")}))}}}();function p(t){var e=document.querySelector(".layerPopup.share");return t?e.classList.add("active"):e.classList.remove("active")}function f(t,e){var n=document.querySelector('.bubbleGroup[data-importance="'+t.index+'"]'),a=["rgba(21, 45, 255, .7)","rgba(47, 134, 255, .7)","rgba(20, 187, 190, .7)","rgba(86, 55, 255, .7)","rgba(141, 201, 29, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)","rgba(212, 216, 220, .7)"];d.isPopPop||(i.resetArticle(),i.dataLoadEvent("".concat(ARTICLE_URL,"?keyword_dtm=").concat(t.keyword_dtm,"&keyword_sq=").concat(t.keyword_sq),(function(o){for(var s in o.data)i.article=o.data[s];var c={name:"Article",serverDTM:i.serverDTM,progressDTM:i.progressDTM,article:i.article,keyword_service:t.keyword_service,keyword_dtm:t.keyword_dtm,keyword_sq:t.keyword_sq,index:t.index,listIndex:void 0!==t.listIndex?t.listIndex:0,refs:{link:o.search_link,cnt:o.search_cnt},fill:a[t.index]};null!==history.state&&"Article"===history.state.name?history.replaceState(c,"네이트뉴스"):history.pushState(c,"네이트뉴스"),r.setClickedBubble.call(n),r.setListRefData(c),d.isRender?r.listUpdate((function(){d.isPopPop=!0,d.isClick=!1,r.popUp(e)})):(d.isRender=!0,r.listRender((function(){d.isPopPop=!0,d.isClick=!1,r.popUp(e)}))),r.listRefEvent()})))}function h(a){var o,s,u,h,m;i=a,t.init(),e.init(),n.init(),o=window.location.search,s=["keyword_dtm","keyword_sq","index"].every((function(t){return-1!==o.indexOf(t)}))?o.substr(1).split("&").reduce((function(t,e){return Object.assign(t,c({},e.split("=")[0],decodeURIComponent(e.split("=")[1])))}),{}):null,null===history.state&&null!==s&&f({selection:document.querySelector('.bubbleGroup[data-importance="'+s.index+'"]'),keyword_service:i.keyword[parseInt(s.index,10)].keyword_service,keyword_dtm:s.keyword_dtm,keyword_sq:s.keyword_sq,index:parseInt(s.index,10)},!0),null!==history.state&&"LayerShare"===history.state.name&&p(!0),null!==history.state&&"Article"===history.state.name&&f(history.state,!0),window.addEventListener("popstate",(function(){null!==history.state&&"LayerShare"===history.state.name?p(!0):p(!1),null!==history.state&&"Article"===history.state.name?f(history.state,!0):d.isPopPop&&r.popOut(!0)})),u=window.innerWidth,h=window.devicePixelRatio,m=utils.debounce((function(r){u!==window.innerWidth&&h===window.devicePixelRatio&&(l=window.matchMedia("(orientation: portrait)").matches,u=window.innerWidth,t.resize(),e.resize())}),30),window.addEventListener("resize",m);var v=33+33;console.log(v)}function m(r){if(!("string"!=typeof r&&r.length>=0)){var a={minDTM:utils.dateFormat(i.minDTM),serverDTM:utils.dateFormat(i.serverDTM),serviceDTM:utils.dateFormat(i.serviceDTM),progressDTM:utils.dateFormat(i.progressDTM),dateType:r};n.confirmTimeTravle(a,(function(r){i.resetKeyword(),i.dataLoadEvent(r.path,(function(a){for(var o in i.serverDTM=utils.dateFormat(a.server_dtm),i.updateDTM=utils.dateFormat(a.update_dtm),i.serviceDTM=null!==r.serviceDTM?utils.dateFormat(r.serviceDTM):utils.dateFormat(a.service_dtm),i.progressDTM=null!==r.progressDTM?utils.dateFormat(r.progressDTM):utils.dateFormat(a.server_dtm),a.data)i.keyword=a.data[o];t.update(),e.update(),n.setDisplayLogTime(i.updateDTM),n.setDisplayTragetTime(i.progressDTM),n.setDisabledTirgger()}))}))}}return e=function(){var e={selection:d3.select(u),options:{width:r(254/375),height:r(.128),bar:{width:r(254/375),height:r(.128)},knob:{r:r(.064)/2}},TL:null,drag:null,minLimit:null,maxLimit:null,timestamp:null,percent:null,data:null};function r(t){return Math.min(window.innerWidth,375)*t}function n(){var t={};return t.min=moment(i.minDTM).valueOf(),t.server=moment(i.serverDTM).minutes(0).seconds(0).valueOf(),t.now=moment(i.progressDTM).minutes(0).seconds(0).valueOf(),t.start=moment(i.progressDTM).startOf("day").valueOf(),t.end=moment(i.progressDTM).endOf("day").valueOf(),t.percent=(t.now-t.start)/828e5,t.minLimit=utils.convertTime(i.minDTM,"YMD")===utils.convertTime(i.progressDTM,"YMD")?(t.min-t.start)/828e5:0,t.maxLimit=utils.convertTime(i.serverDTM,"YMD")===utils.convertTime(i.progressDTM,"YMD")?(t.server-t.start)/828e5:1,t.perToTime=function(t,e){return utils.convertTime(828e5*t+this.start,e)},t}function a(t,e){return[t].map((function(t,r){return utils._objectSpread(utils._objectSpread({},t,e),{},{HM:e.perToTime(e.percent,"HM"),YMDH:e.perToTime(e.percent,"YMDH"),YMDHM:e.perToTime(e.percent,"YMDHM"),path:{front:"M0 "+t.bar.height/2+" l "+t.bar.width+" 0.01",back:"M0 "+t.bar.height/2+" l "+t.bar.width*e.maxLimit+" 0.01",backboard:function(){for(var e=t.bar.width/(.08333333333333333*t.height),r="",n=0;n<e;n++)r+="M "+.08333333333333333*t.bar.height*n+" "+.4166666666666667*t.bar.height+" H "+.08333333333333333*t.bar.height*n+" V "+(.4166666666666667*t.bar.height+.16666666666666666*t.bar.height);return r}()}})}))[0]}function o(t){var r=e.selection,n=e.options;return r.attr("width",n.width).attr("height",n.height).attr("viewBox",[0,0,n.width,n.height]),r.selectAll(".progress").data([t]).join((function(t){var e=(t=t.append("g").attr("class","progress")).append("defs").append("linearGradient").attr("id","pathLinear");e.append("stop").attr("offset","0%").attr("stop-color","#639eff"),e.append("stop").attr("offset","100%").attr("stop-color","rgba(91, 108, 255, .98)"),t.append("path").attr("class","pathBackboard"),t.append("path").attr("class","pathBack"),t.append("path").attr("class","pathFront");var r=t.append("g").attr("class","timeGroup");r.append("circle").attr("class","timeKnob"),r.append("rect").attr("class","timeKnobEmpty").attr("x",(function(t){return-2*t.knob.r})).attr("y",(function(t){return-2*t.knob.r})).attr("width",(function(t){return 4*t.knob.r})).attr("height",(function(t){return 4*t.knob.r})).attr("fill","transparent");var n=r.append("svg").attr("class","timeTooltip").attr("xmlns","http://www.w3.org/2000/svg").attr("xmlns:xlink","http://www.w3.org/1999/xlink"),a=n.append("defs"),i=a.append("filter").attr("id","filter1Back").attr("width","128.9%").attr("height","167.4%").attr("x","-14.4%").attr("y","-28.5%").attr("filterUnits","objectBoundingBox");i.append("feOffset").attr("result","shadowOffsetOuter1").attr("in","SourceAlpha").attr("dy",2),i.append("feGaussianBlur").attr("result","shadowBlurOuter1").attr("in","shadowOffsetOuter1").attr("stdDeviation",4),i.append("feColorMatrix").attr("in","shadowBlurOuter1").attr("values","0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"),i.append("rect").attr("id","filter1Rect");var o=a.append("filter").attr("id","filter2Back").attr("width","356.7%").attr("height","367.1%").attr("x","-128.3%").attr("y","-85%").attr("filterUnits","objectBoundingBox");o.append("feOffset").attr("result","shadowOffsetOuter1").attr("in","SourceAlpha").attr("dy",4),o.append("feGaussianBlur").attr("result","shadowBlurOuter1").attr("in","shadowOffsetOuter1").attr("stdDeviation",3),o.append("feColorMatrix").attr("in","shadowBlurOuter1").attr("values","0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0"),o.append("path").attr("id","filter2Path");var s=n.append("g");return s.append("use").attr("fill","#000").attr("filter","url(#filter1Back)").attr("xlink:xlink:href","#filter1Rect"),s.append("use").attr("fill","#fff").attr("xlink:xlink:href","#filter1Rect"),s.append("use").attr("fill","#000").attr("filter","url(#filter2Back)").attr("xlink:xlink:href","#filter2Path"),s.append("use").attr("fill","#fff").attr("xlink:xlink:href","#filter2Path"),s.append("text").attr("class","timeText"),function(t){var e=t.select(".pathBackboard"),r=t.select(".pathBack"),n=t.select(".pathFront"),a=(t.select(".timeGroup"),t.select(".timeKnob")),i=t.select(".timeTooltip"),o=i.select("rect"),s=i.select("path"),c=i.select("text");e.attr("d",(function(t){return t.path.backboard})).attr("stroke-width",1).attr("stroke","#c7ccd1").attr("fill","none").attr("shape-rendering","crispEdges"),r.attr("d",(function(t){return t.path.back})).attr("stroke-width",(function(t){return.20833333333333334*t.height})).attr("stroke","#e6e8ea"),n.attr("d",(function(t){return t.path.front})).attr("stroke-width",(function(t){return.2916666666666667*t.height})).attr("stroke","url(#pathLinear)").attr("stroke-linecap","round").attr("fill","#5b6cff"),a.attr("r",(function(t){return t.knob.r})).attr("stroke","#5b6cff").attr("stroke-width",1).attr("fill","#fff"),i.attr("width",(function(t){return.36*t.width})).attr("height",(function(t){return.8333333333333334*t.height})).attr("viebox",(function(t){return[0,0,.36*t.width,.8333333333333334*t.height]})),o.attr("width",(function(t){return.36*t.width})).attr("height",(function(t){return.8333333333333334*t.height})).attr("x",(function(t){return 100*t.percent>84?-(.36*t.width/2-(84-100*t.percent)):-.36*t.width/2})).attr("y",(function(t){return-(t.height+t.knob.r+4)})).attr("rx",(function(t){return 2*t.knob.r})),s.attr("transform",(function(t){return"translate("+-(t.knob.r+2)+" "+-2*t.knob.r+")"})).attr("d",(function(t){return"M 19.285 0 L 15 8.235 10.714 0 h 8.571z"})),c.attr("alignment-baseline","middle").attr("text-anchor","middle").attr("x",(function(t){return 84<100*t.percent?84-100*t.percent:0})).attr("y",(function(t){return-(3*t.knob.r+2)})).attr("font-size",(function(t){return.088*t.width+"px"})),c.selectAll("tspan").data((function(t){return t.HM.split(" ")})).enter().append("tspan").attr("class","break").attr("dx",(function(t,e){return 1===e?4*e:2.5*e})).attr("dy",(function(t,e){return 1===e?"-.1em":".1em"})).attr("fill",(function(t,e){return 1===e?"#7c8aff":"#000"})).text((function(t){return t}))}(t),t}),(function(t){return function(t){var e=t.select(".pathBackboard"),r=t.select(".pathBack"),n=t.select(".pathFront"),a=(t.select(".timeGroup"),t.select(".timeKnob")),i=t.select(".timeTooltip"),o=i.select("rect"),s=i.select("path"),c=i.select("text");e.attr("d",(function(t){return t.path.backboard})).attr("stroke-width",1),r.attr("d",(function(t){return t.path.back})).attr("stroke-width",(function(t){return.20833333333333334*t.height})),n.attr("d",(function(t){return t.path.front})).attr("stroke-width",(function(t){return.2916666666666667*t.height})),a.attr("r",(function(t){return t.knob.r})),i.attr("width",(function(t){return.36*t.width})).attr("height",(function(t){return.8333333333333334*t.height})).attr("viebox",(function(t){return[0,0,.36*t.width,.8333333333333334*t.height]})),o.attr("width",(function(t){return.36*t.width})).attr("height",(function(t){return.8333333333333334*t.height})).attr("x",(function(t){return 100*t.percent>84?-(.36*t.width/2-(84-100*t.percent)):-.36*t.width/2})).attr("y",(function(t){return-(t.height+t.knob.r+4)})).attr("rx",(function(t){return 2*t.knob.r})),s.attr("transform",(function(t){return"translate(0 "+-(2*t.knob.r+2)+")"})).attr("d",(function(t){return"M "+t.knob.r/2+" 0 l "+-t.knob.r/2+" "+t.knob.r+" "+-t.knob.r/2+" "+-t.knob.r+" h "+t.knob.r+"z"})),c.attr("x",(function(t){return 84<100*t.percent?84-100*t.percent:0})).attr("y",(function(t){return-(3*t.knob.r+2)})).attr("font-size",(function(t){return.088*t.width+"px"})),c.selectAll("tspan").data((function(t){return t.HM.split(" ")})).text((function(t){return t}))}(t),t}),(function(t){return function(t){t.transition().duration(3*n.duration).style("opacity",0),t.remove()}(t),t}))}function s(r){function n(){gsap.to("".concat(u," .timeKnob"),.3,{scale:1.3,transformOrigin:"50% 50%"}),e.timestamp.percent=e.percent=Math.abs(this.x/r.bar.width),e.TL.progress(Math.abs(this.x/r.bar.width)),e.data=a(e.options,e.timestamp),o(e.data)}e.TL=gsap.timeline({defaults:{overwrite:"auto",ease:"none"},paused:!0}),e.minLimit=e.timestamp.minLimit,e.maxLimit=e.timestamp.maxLimit,e.percent=e.percent||0!==e.timestamp.percent?e.timestamp.percent:1e-4,null!==e.drag&&e.drag[0].kill(),e.drag=Draggable.create("".concat(u," .timeGroup"),{trigger:"".concat(u," .timeGroup"),type:"x, y",bounds:{minX:e.minLimit?r.bar.width*(e.minLimit+1e-4):0,maxX:e.maxLimit?r.bar.width*(e.maxLimit+1e-4):1,minY:2*r.knob.r,maxY:2*r.knob.r},throwProps:!1,liveSnap:!0,snap:{x:function(t){return Math.floor(t/(r.bar.width/22.9999))*(r.bar.width/22.9999)},y:function(t){return Math.round(t)}},onThrowUpdate:n,onDrag:n,onDragStart:function(){return t.dragStart()},onDragEnd:function(){return gsap.to("".concat(u," .timeKnob"),.3,{scale:1,transformOrigin:"50% 50%"}),i.serviceDTM=utils.dateFormat(e.data.YMDH),i.progressDTM=utils.dateFormat(e.data.YMDHM),t.dragEnd()}}),gsap.set("".concat(u," .pathFront"),{clearProps:"all"}),e.TL.from("".concat(u," .pathFront"),1,{drawSVG:"0%"}).to("".concat(u," .timeGroup"),1,{scale:1,motionPath:{path:"".concat(u," .pathFront")}},0).progress(e.percent)}return{init:function(){e.timestamp=n(),e.data=a(e.options,e.timestamp),o(e.data),s(e.data)},update:function(){e.timestamp=n(),e.data=a(e.options,e.timestamp),o(e.data),s(e.data)},resize:function(){e.options.width=r(254/375),e.options.height=r(.128),e.options.bar.width=r(254/375),e.options.bar.height=r(.128),e.options.knob.r=r(.064)/2,e.data=a(e.options,e.timestamp),o(e.data),s(e.data)}}}(),n=function(){var t=document.querySelector(".timeTravel"),e=[document.querySelector(".btnTravel.prev"),document.querySelector(".btnTravel.next"),document.querySelector(".btnTravel.today")],r=[t.querySelector(".year"),t.querySelector(".month"),t.querySelector(".date")],n=document.querySelector(".timeLog"),a=document.querySelector(".btnShare");function o(t){n.innerText=utils.convertTime(t,"STANDARD")}function s(t){utils.convertTime(t,"YMD").split("-").forEach((function(t,e){r[e].innerText=t}))}function c(){var t=utils.convertTime(moment(i.minDTM),"YMD"),r=utils.convertTime(moment(i.serverDTM).valueOf(),"YMD"),o=utils.convertTime(moment(i.progressDTM).valueOf(),"YMD");t===r?(e[0].disabled=!0,e[1].disabled=!0,e[2].disabled=!0):o===t?(e[0].disabled=!0,e[1].disabled=!1,e[2].disabled=!1,n.innerText="",a.disabled=!0):o===r?(e[0].disabled=!1,e[1].disabled=!0,e[2].disabled=!0,a.disabled=!1):(e[0].disabled=!1,e[1].disabled=!1,e[2].disabled=!1,n.innerText="",a.disabled=!0)}return{setDisplayLogTime:o,setDisplayTragetTime:s,setDisabledTirgger:c,confirmTimeTravle:function(t,e){var r=moment(t.minDTM).valueOf(),n=moment(t.serverDTM).valueOf(),a=moment(t.serviceDTM).valueOf(),i=moment(t.progressDTM).valueOf();switch("prev"!==t.dateType&&"next"!==t.dateType||(a=utils.varOperator(t.dateType,a,864e5),i=utils.varOperator(t.dateType,i,864e5)),t.dateType){case"prev":return e(a>=r?{path:"".concat(KEYWORD_URL,"?service_dtm=").concat(utils.convertTime(a,"YMDH")),serviceDTM:utils.convertTime(a,"YMDH"),progressDTM:utils.convertTime(i,"YMDHM")}:{path:"".concat(KEYWORD_URL,"?service_dtm=").concat(utils.convertTime(r,"YMDH")),serviceDTM:utils.convertTime(r,"YMDH"),progressDTM:utils.convertTime(r,"YMDHM")});case"next":return e(a<=n?{path:"".concat(KEYWORD_URL,"?service_dtm=").concat(utils.convertTime(a,"YMDH")),serviceDTM:utils.convertTime(a,"YMDH"),progressDTM:utils.convertTime(i,"YMDHM")}:{path:KEYWORD_URL,serviceDTM:null,progressDTM:null,limitType:"maxLimit"});case"today":return e({path:KEYWORD_URL,serviceDTM:null,progressDTM:null,limitType:"maxLimit"})}},init:function(){e.forEach((function(t){t.addEventListener("click",(function(e){return m(t.getAttribute("data-travel"))}))})),o(i.updateDTM),s(i.progressDTM),c()}}}(),{init:function(t){return h(t)},update:function(t){return m(t)}}}();document.addEventListener("DOMContentLoaded",(function(){var t,e,r,a,i,o,s,c=new(t=Symbol("KEYWORD"),e=Symbol("ARTICLE"),r=Symbol("SERVICE_DTM"),a=Symbol("MIN_DTM"),i=Symbol("SERVER_DTM"),o=Symbol("UPDATE_DTM"),s=Symbol("PROGRESS_DTM"),function(){function c(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this[t]=[],this[e]=[],this[r],this[a],this[i],this[o],this[s]}var u,l,d;return u=c,(l=[{key:"resetKeyword",value:function(){this[t]=[]}},{key:"resetArticle",value:function(){this[e]=[]}},{key:"dataLoadEvent",value:function(t,e){var r;r=-1!==t.indexOf("keyword_sq")?"articleList":t.split("=")[1]||"2020-08-21 12:00:00",$.ajax({type:"GET",url:"./src/data/fake.json",dataType:"json",processData:!1}).then((function(t){return t[r]})).done((function(t){e(t)})).fail((function(){console.log("fail")}))}},{key:"keyword",get:function(){return this[t]},set:function(e){return this[t].push(e)}},{key:"article",get:function(){return this[e]},set:function(t){return this[e].push(t)}},{key:"serviceDTM",get:function(){return this[r]},set:function(t){this[r]=t}},{key:"minDTM",get:function(){return this[a]},set:function(t){this[a]=t}},{key:"serverDTM",get:function(){return this[i]},set:function(t){this[i]=t}},{key:"updateDTM",get:function(){return this[o]},set:function(t){this[o]=t}},{key:"progressDTM",get:function(){return this[s]},set:function(t){this[s]=t}}])&&n(u.prototype,l),d&&n(u,d),c}());c.dataLoadEvent(null!==history.state&&"Article"===history.state.name?KEYWORD_URL+"?service_dtm="+history.state.keyword_dtm:KEYWORD_URL,(function(t){for(var e in c.minDTM=utils.dateFormat("2020-08-20 09:00:00"),c.serverDTM=utils.dateFormat(t.server_dtm),c.updateDTM=utils.dateFormat(t.update_dtm),c.serviceDTM=utils.dateFormat(t.service_dtm),c.progressDTM=utils.dateFormat(null!==history.state&&"Article"===history.state.name?history.state.progressDTM:t.server_dtm),t.data)c.keyword=t.data[e];u.init(c)})),document.querySelector(".btnProgress").addEventListener("click",(function(t){t.preventDefault(),t.target.parentNode.classList.toggle("active")})),[document.querySelector(".btnShare"),document.querySelector(".btnClosePopup")].forEach((function(t){t.addEventListener("click",(function(){var t=document.querySelector(".layerPopup.share");return t.classList.toggle("active"),t.querySelector(".shareLinkUrl").disabled=!0,t.classList.contains("active")?history.pushState({name:"LayerShare"},"네이트뉴스 공유하기"):history.pushState(null,null)}))}))}))}]);