!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var n=e=>{const t=document.querySelector("#timer-days"),o=document.querySelector("#timer-hours"),n=document.querySelector("#timer-minutes"),r=document.querySelector("#timer-seconds");let c=()=>{const t=(new Date(e).getTime()-(new Date).getTime())/1e3,o=Math.floor(t%60),n=Math.floor(t/60%60),r=Math.floor(t/60/60%24);return{timeRemaning:t,days:Math.floor(t/60/60/24),hours:r,minutes:n,seconds:o}};const a=()=>{const e=c();o.textContent=e.hours<10?"0"+e.hours:e.hours,n.textContent=e.minutes<10?"0"+e.minutes:e.minutes,r.textContent=e.seconds<10?"0"+e.seconds:e.seconds,0===e.days?t.remove():t.textContent=`${e.days<10?"0"+e.days:e.days}\n                               ${((e,t)=>t[e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2])(e.days,["день","дня","дней"])} : `},l=c();if(l.timeRemaning>0){const e=setInterval(a,1e3);setTimeout(()=>{clearTimeout(e)},1e3*l.timeRemaning)}else o.textContent="00",n.textContent="00",r.textContent="00",t.textContent="00"};var r=()=>{const e=document.querySelector(".menu"),t=document.querySelector("menu"),o=t.querySelectorAll("ul>li"),n=document.querySelector(".close-btn"),r=()=>{t.classList.toggle("active-menu")};e.addEventListener("click",e=>{e.target;r()}),t.addEventListener("click",e=>{let t=e.target;t===n?r():void 0!==t.href?r():o.forEach(e=>{t===e&&r()})})};var c=()=>{const e=document.querySelector(".popup"),t=document.querySelector(".popup-content"),o=document.querySelectorAll(".popup-btn");let n,r=.01;t.style.opacity=0,o.forEach(t=>{t.addEventListener("click",()=>{e.style.display="block",validation(),n=requestAnimationFrame(a)})});const c=()=>{e.style.display="none",t.style.opacity=0,r=.01,formClear(t);const o=t.querySelector(".status-message");o&&o.parentNode.removeChild(o),cancelAnimationFrame(n)};e.addEventListener("click",e=>{let t=e.target;t.classList.contains("popup-close")?c():(t=t.closest(".popup-content"),t||c())});let a=()=>{n=requestAnimationFrame(a),r+=.01,t.style.opacity<=1?t.style.opacity=r:cancelAnimationFrame(n)}};var a=()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{let n=e.target;n=n.closest(".service-header-tab"),n&&t.forEach((e,r)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(r)})})};var l=()=>{const e=document.getElementById("command"),t=e=>{const t=e.getAttribute("src");e.setAttribute("src",e.dataset.img),e.dataset.img=t};e.addEventListener("mouseover",e=>{let o=e.target;o=o.closest("img"),o&&t(o)}),e.addEventListener("mouseout",e=>{let o=e.target;o=o.closest("img"),o&&t(o)})};var s=()=>{document.querySelector(".calc-block").addEventListener("input",e=>{let t=e.target;if(t=t.closest("input"),t){let e=t.value;t.value=e.replace(/\D/g,"")}})};var i=()=>{const e=document.querySelectorAll(".portfolio-item"),t=(document.querySelectorAll(".portfolio-btn"),document.querySelector(".portfolio-content"));let o=0,n=0;const r=document.createElement("ul");t.appendChild(r),r.classList.add("portfolio-dots");for(let t=0;t<e.length;t++){const e=document.createElement("li");r.appendChild(e),e.classList.add("dot"),0===t&&e.classList.add("dot-active")}const c=document.querySelectorAll(".dot"),a=(e,t)=>e===t.length?0:e<0?t.length-1:e,l=(e,t,o)=>{e[t].classList.remove(o)},s=(e,t,o)=>{e[t].classList.add(o)},i=()=>{l(e,o,"portfolio-item-active"),l(c,o,"dot-active"),o=a(++o,e),s(e,o,"portfolio-item-active"),s(c,o,"dot-active")},u=(e=3e3)=>{n=setInterval(i,e)};t.addEventListener("click",t=>{t.preventDefault();let n=t.target;n.matches(".portfolio-btn, .dot")&&(l(e,o,"portfolio-item-active"),l(c,o,"dot-active"),n.matches("#arrow-right")?o++:n.matches("#arrow-left")?o--:n.matches(".dot")&&c.forEach((e,t)=>{e===n&&(o=t)}),o=a(o,e),s(e,o,"portfolio-item-active"),s(c,o,"dot-active"))}),t.addEventListener("mouseover",e=>{e.target.matches(".portfolio-btn, .dot")&&clearInterval(n)}),t.addEventListener("mouseout",e=>{e.target.matches(".portfolio-btn, .dot")&&u(1500)}),u(1500)};var u=(e=100)=>{const t=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),n=document.querySelector(".calc-square"),r=document.querySelector(".calc-day"),c=document.querySelector(".calc-count"),a=document.getElementById("total");t.addEventListener("change",t=>{const l=t.target;(l.matches("select")||l.matches("input"))&&(()=>{let t=0,l=1,s=1;const i=o.options[o.selectedIndex].value,u=+n.value;if(c.value>1&&(l+=(c.value-1)/10),r.value<5?s*=2:r.value&&r.value<10&&(s*=1.5),i&&u){t=Math.floor(e*i*u*s*l);let o=+a.textContent,n=()=>{const e=requestAnimationFrame(n);o<t?(o+=200,a.textContent=o,Math.abs(o-t)<200&&(cancelAnimationFrame(e),a.textContent=t)):o>t&&(o-=200,a.textContent=o,Math.abs(o-t)<200&&(cancelAnimationFrame(e),a.textContent=t))};n()}})()})};var d=e=>{const t=document.querySelector(".popup"),o=document.querySelector(".popup-content"),n=document.querySelectorAll(".form123"),r={errorMessage:"Что то не так ",loadMessage:"Загрузка",succesMessage:"Спасибо ! Скоро свяжемся с вами"},c=document.createElement("div");let a={};c.classList.add("status-message"),c.style.cssText="font-size: 2rem; color: #fff;",c.textContent=r.loadMessage,r.div=c;let l=1,s=()=>{const e=requestAnimationFrame(s);if(l-=.005,o.style.opacity>=0)o.style.opacity=l;else{t.style.display="none";const n=o.querySelector(".status-message");n&&n.parentNode.removeChild(n),cancelAnimationFrame(e),l=0}};n.forEach(e=>{e.addEventListener("submit",o=>{new FormData(e).forEach((e,t)=>{a[t]=e}),o.preventDefault(),e.appendChild(r.div),(e=>fetch("./server.php",{method:"Post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),credentials:"include"}))(a).then(t=>{if(200!==t.status)throw new Error("Status network not 200");e.querySelectorAll("input").forEach(e=>e.value=""),r.div.textContent=r.succesMessage}).then(()=>{if("block"===t.style.display)s();else{const t=e.querySelector(".status-message");setTimeout(()=>{t&&t.parentNode.removeChild(t)},4e3)}}).catch(e=>{r.div.textContent=r.errorMessage,console.log("errorMessage: ",r.errorMessage),console.error(e)})})})};(()=>{const e=document.querySelectorAll(".form-name"),t=document.querySelectorAll(".form-email"),o=document.querySelectorAll(".mess"),n=document.querySelectorAll(".form-phone");e.forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/[^а-яё\s]/gi,"")})}),t.forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/[^a-z@-_\d]/gi,"")})}),o.forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/[^а-яё\s]/gi,"")})}),n.forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/\D/g,"")})})})(),n("10 december 2019"),r(),c(),a(),l(),s(),i(),u(100),d()}]);