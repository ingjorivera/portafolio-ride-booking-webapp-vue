import{d as R,n as p,o as c,i as S,w as a,g as l,j as u,e as f,k as m,a5 as V,t as _,c as q,l as y,Y as L,Z as Q,f as h,$ as I,a6 as N,a7 as w}from"./index-DdqqIGr3.js";import{a as B}from"./QTabPanels-CGJrTv5V.js";const C={key:0,style:{"font-size":"10px"}},z=R({__name:"locationsInput",props:{label:String},emits:{change:null},setup(g,{emit:v}){const k=g,o=B(),b=v,n=p(""),s=p(!1);function x(i,t,e){let r=0,d=0;if(o.listLocations=[],i.length<3){e();return}t(()=>{s.value=!0,o.quoteRide.pickup_1.lat!=0&&o.quoteRide.pickup_1.lon!=0&&(r=o.quoteRide.pickup_1.lat,d=o.quoteRide.pickup_1.lon),o.searchLocations(i,r,d).then(()=>{s.value=!1})})}return(i,t)=>(c(),S(I,{modelValue:n.value,"onUpdate:modelValue":[t[0]||(t[0]=e=>n.value=e),t[1]||(t[1]=e=>b("change",n.value))],filled:"",class:"col",dense:"","use-input":"","hide-selected":"","fill-input":"",label:k.label,"option-label":"name",options:h(o).listLocations,"input-debounce":500,loading:s.value,"dropdown-icon":"",onFilter:x},{"no-option":a(()=>[l(m,null,{default:a(()=>[l(u,{class:"text-grey"},{default:a(()=>t[2]||(t[2]=[f(" No results ")])),_:1})]),_:1})]),option:a(e=>[l(m,L(Q(e.itemProps)),{default:a(()=>[l(u,null,{default:a(()=>[l(V,null,{default:a(()=>[f(_(e.opt.name),1)]),_:2},1024)]),_:2},1024),l(u,{avatar:""},{default:a(()=>[e.opt.iata!=""||e.opt.icao!=""?(c(),q("div",C,_(e.opt.iata!=!1?e.opt.iata:e.opt.icao),1)):y("",!0)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue","label","options","loading"]))}});function $(){return N(w)}export{z as _,$ as u};
