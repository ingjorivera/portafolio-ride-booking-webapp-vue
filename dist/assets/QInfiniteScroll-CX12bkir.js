import{y as C,aT as F,n as d,s as N,E as c,aF as O,aE as R,a8 as W,am as $,aU as j,G as A,H as w,aV as G,aW as g,aX as y,aY as B,L as M,aZ as I,a_ as X,a$ as Y,I as Z}from"./index-DdqqIGr3.js";const{passive:r}=G,J=C({name:"QInfiniteScroll",props:{offset:{type:Number,default:500},debounce:{type:[String,Number],default:100},scrollTarget:F,initialIndex:{type:Number,default:0},disable:Boolean,reverse:Boolean},emits:["load"],setup(l,{slots:P,emit:q}){const s=d(!1),n=d(!0),f=d(null),h=d(null);let v=l.initialIndex,e,a;const D=N(()=>"q-infinite-scroll__loading"+(s.value===!0?"":" invisible"));function o(){if(l.disable===!0||s.value===!0||n.value===!1)return;const t=g(e),i=y(e),u=B(e);l.reverse===!1?Math.round(i+u+l.offset)>=Math.round(t)&&m():Math.round(i)<=l.offset&&m()}function m(){if(l.disable===!0||s.value===!0||n.value===!1)return;v++,s.value=!0;const t=g(e);q("load",v,i=>{n.value===!0&&(s.value=!1,M(()=>{if(l.reverse===!0){const u=g(e),_=y(e),k=u-t;I(e,_+k)}i===!0?b():f.value&&f.value.closest("body")&&a()}))})}function Q(){v=0}function x(){n.value===!1&&(n.value=!0,e.addEventListener("scroll",a,r)),o()}function b(){n.value===!0&&(n.value=!1,s.value=!1,e.removeEventListener("scroll",a,r),a!==void 0&&a.cancel!==void 0&&a.cancel())}function S(){if(e&&n.value===!0&&e.removeEventListener("scroll",a,r),e=X(f.value,l.scrollTarget),n.value===!0){if(e.addEventListener("scroll",a,r),l.reverse===!0){const t=g(e),i=B(e);I(e,t-i)}o()}}function U(t){v=t}function H(t){t=parseInt(t,10);const i=a;a=t<=0?o:Y(o,isNaN(t)===!0?100:t),e&&n.value===!0&&(i!==void 0&&e.removeEventListener("scroll",i,r),e.addEventListener("scroll",a,r))}function E(t){if(T.value===!0){if(h.value===null){t!==!0&&M(()=>{E(!0)});return}const i=`${s.value===!0?"un":""}pauseAnimations`;Array.from(h.value.getElementsByTagName("svg")).forEach(u=>{u[i]()})}}const T=N(()=>l.disable!==!0&&n.value===!0);c([s,T],()=>{E()}),c(()=>l.disable,t=>{t===!0?b():x()}),c(()=>l.reverse,()=>{s.value===!1&&n.value===!0&&o()}),c(()=>l.scrollTarget,S),c(()=>l.debounce,H);let L=!1;O(()=>{L!==!1&&e&&I(e,L)}),R(()=>{L=e?y(e):!1}),W(()=>{n.value===!0&&e.removeEventListener("scroll",a,r)}),$(()=>{H(l.debounce),S(),s.value===!1&&E()});const V=Z();return Object.assign(V.proxy,{poll:()=>{a!==void 0&&a()},trigger:m,stop:b,reset:Q,resume:x,setIndex:U,updateScrollTarget:S}),()=>{const t=j(P.default,[]);return T.value===!0&&t[l.reverse===!1?"push":"unshift"](A("div",{ref:h,class:D.value},w(P.loading))),A("div",{class:"q-infinite-scroll",ref:f},t)}}});export{J as Q};