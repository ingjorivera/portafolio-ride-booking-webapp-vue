import{av as Fe,n as b,u as K,b as H,X as Ue,a6 as ze,aw as fe,s as _,a8 as Ae,am as Ke,ax as De,h as He,ay as We,G as R,az as Ge,aA as Xe,ah as ie,V as ae,al as Je,I as oe,y as ne,aB as he,aC as pe,aD as Ye,E as X,ar as Ze,aE as et,aF as tt,H as re,aG as it,aH as W,aI as at,aJ as ot,aK as te,aL as ve,aM as ke,aN as nt,aO as me,T as rt,aP as st,aQ as lt,A as ut,B as ct,aR as dt}from"./index-DdqqIGr3.js";import{Q as ft,g as Re,s as Ie}from"./touch-Bp1tm7vm.js";const ht={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_ACCOUNTS_URL:"https://accounts.drivania.com/",VITE_BASE_URL:"https://bag.drivania.com",VITE_COOKIE_NAME:"drivaniaCKSC",VITE_GOOGLE_MAPS_API_KEY:"AIzaSyC3AbAJxQjU8jph9ai6tH5G58moyPHWx_A",VITE_HOMEPAGE:"https://www.drivania.com"},vt=ht,G=`${vt.VITE_BASE_URL}`,At=Fe("rides",{state:()=>({bookService:b({salesPlatform:0,add_every_service_contacts:!1,bookingAgentId:0,itineraryReference:"",staffId:"",confirm:!1,clientReference:"",brokerCommission:0,ipClient:"",userAgent:"",invoice:{invoiceTo:"",clientId:0,agentId:0,payment:{type:0,creditCardId:""},client:{name:"",address:"",phone:0,email:"",vatId:"",city:"",postcode:"",county:"",country:"",simplifiedInvoice:!1}},services:[{contacts:[],purchase_order:"",internal_additional_info:null,passenger:{id:0,phone:"",email:"",name:""},type:"",pax:0,flights:{},fbo:{},comments:"",serviceID:"",vehicleID:"",serviceDescription:"",childseats:0,crew_member:!1,arrival_flight_type:"",departure_flight_type:"",boosters:0}]}),quoteRide:b({pickup_1:{lat:0,lon:0,name:"",type:0},dropoff_1:{lat:0,lon:0,name:"",type:0},date_1:"",time_1:"",type:"singleride",pickup_2:{lat:0,lon:0,name:"",type:0},dropoff_2:{lat:0,lon:0,name:"",type:0},date_2:"",time_2:""}),quoteResults:b([]),selectedVehicles:b([]),listFbos:b([]),listLocations:b([]),passengerDetails:b({fullName:"",email:"",countryCode:"",cellphone:"",numTravelers:0,babySeats:0,childBoosters:0,aditional:"",id:0}),flightInfo:b({crewMembers:!1,arrival:{flightNumber:"",tailNumber:"",fbo:{fbo_id:"",fbo_name:""}},departure:{flightNumber:"",tailNumber:"",fbo:{fbo_id:"",fbo_name:""}}}),mySettings:b({bookingID:"",managementFee:0}),passengersNotifications:b([]),services:b([])}),actions:{resetQuote(){this.quoteRide={pickup_1:{lat:0,lon:0,name:"",type:0},dropoff_1:{lat:0,lon:0,name:"",type:0},date_1:"",time_1:"",type:"singleride",pickup_2:{lat:0,lon:0,name:"",type:0},dropoff_2:{lat:0,lon:0,name:"",type:0},date_2:"",time_2:""}},refreshQuotes(){this.quoteResults=[]},addVehicle(e){this.selectedVehicles.push(e)},removeVehicle(e){this.selectedVehicles=this.selectedVehicles.filter(t=>t.vehicleId!==e.vehicleId)},addPassengerNotification(e){this.passengersNotifications.push(e)},removePassengerNotification(e){this.passengersNotifications.splice(e,1)},async searchLocations(e,t,o){const n=K(),r=H();let i="";n.isLoading=!0;try{(t!=0||o!=0)&&(i="&lat="+t+"&lon="+o);const l=await fetch(`${G}/locations?query=${e}${i}`,{headers:{Authorization:`Bearer ${r.token}`}}),f=await l.json();if(!l.ok)throw new Error("Error searching locations");this.listLocations=f.locations;return}catch{n.isError=!0,n.isLoading=!1,n.errorMessage="Error getting locations",n.createNotification(n.errorMessage,"negative","top","drv-alert-triangle"),this.listLocations=[];return}finally{n.isLoading=!1}},async getFbos(e){const t=K(),o=H();try{const n=await fetch(`${G}/fbos?airport_code=${e}`,{headers:{Authorization:`Bearer ${o.token}`}}),r=await n.json();if(!n.ok)throw new Error("Error fetching FBOs");return this.listFbos=r,!0}catch{return t.isError=!0,t.errorMessage="Error getting FBOs",t.createNotification(t.errorMessage,"negative","top","drv-alert-triangle"),!1}},async requestQuote(e,t){const o=K(),n=H();o.isLoading=!0;try{const r=[{quote_client_id:t||null,service_type:e,segments:this.getSegments(e),passengers:1,lang:"en"}],i=await fetch(`${G}/quote-requests`,{method:"POST",headers:{Authorization:`Bearer ${n.token}`,"Content-Type":"application/json"},body:JSON.stringify(r)}),l=await i.json();if(!i.ok)throw new Error("Error requesting quote");return this.quoteResults=l.collection,!0}catch(r){return console.log(r,"error----"),o.isError=!0,o.isLoading=!1,o.errorMessage="Error getting quote",o.createNotification(o.errorMessage,"negative","top","drv-alert-triangle"),this.quoteResults=[],!1}finally{o.isLoading=!1}},getSegments(e){const t=[],o=this.convertDate(this.quoteRide.date_1,this.quoteRide.time_1);if(e===1)t.push({name:this.quoteRide.pickup_1.name,type:this.quoteRide.pickup_1.type,lat:this.quoteRide.pickup_1.lat.toString(),lon:this.quoteRide.pickup_1.lon.toString(),date_time:o,airport_code:this.quoteRide.pickup_1.iata||this.quoteRide.pickup_1.icao||""}),t.push({name:this.quoteRide.dropoff_1.name,type:this.quoteRide.dropoff_1.type,lat:this.quoteRide.dropoff_1.lat.toString(),lon:this.quoteRide.dropoff_1.lon.toString(),date_time:o,airport_code:this.quoteRide.dropoff_1.iata||this.quoteRide.dropoff_1.icao||""});else if(e===2){const n=this.convertDate(this.quoteRide.date_1,this.quoteRide.time_2||"");t.push({name:this.quoteRide.pickup_1.name,type:this.quoteRide.pickup_1.type,lat:this.quoteRide.pickup_1.lat.toString(),lon:this.quoteRide.pickup_1.lon.toString(),date_time:o,airport_code:this.quoteRide.pickup_1.iata||this.quoteRide.pickup_1.icao||""}),t.push({name:this.quoteRide.dropoff_1.name,type:this.quoteRide.dropoff_1.type,lat:this.quoteRide.dropoff_1.lat.toString(),lon:this.quoteRide.dropoff_1.lon.toString(),date_time:n,airport_code:this.quoteRide.dropoff_1.iata||this.quoteRide.dropoff_1.icao||""})}return t},convertDate(e,t){if(!e||!t)return console.error("Fecha u hora faltante:",{date:e,time:t}),new Date().toISOString();try{const[o,n,r]=e.split("/"),[i,l]=t.split(" "),[f,T]=i.split(":");let k=parseInt(f);return(l==null?void 0:l.toUpperCase())==="PM"&&k<12?k+=12:(l==null?void 0:l.toUpperCase())==="AM"&&k===12&&(k=0),new Date(Date.UTC(parseInt(o),parseInt(n)-1,parseInt(r),k,parseInt(T))).toISOString()}catch(o){return console.error("Error al convertir fecha:",o,{date:e,time:t}),new Date().toISOString()}},convertToTimeWithAmPmFromISO(e){const t=new Date(e),o=t.getHours(),n=t.getMinutes();let r="";n<10&&(r="0");let i="";return o<12?i=`${o}:${r}${n} AM`:i=`${o-12}:${r}${n} PM`,i},resetRides(){this.quoteRide={pickup_1:{lat:0,lon:0,name:"",type:0},dropoff_1:{lat:0,lon:0,name:"",type:0},date_1:"",time_1:"",type:"singleride",pickup_2:{lat:0,lon:0,name:"",type:0},dropoff_2:{lat:0,lon:0,name:"",type:0},date_2:"",time_2:""},this.quoteResults=[],this.selectedVehicles=[],this.listFbos=[],this.listLocations=[],this.passengerDetails={aditional:"",fullName:"",email:"",countryCode:"",cellphone:"",numTravelers:0,babySeats:0,childBoosters:0,id:0}},async getLocationInfo(e){const t=K(),o=H();t.isLoading=!0;try{const n=await fetch(`${G}/location/${e}`,{headers:{Authorization:`Bearer ${o.token}`}}),r=await n.json();if(!n.ok)throw new Error("Error getting location with gReference");return console.log(r,"data----------"),r}catch{t.isError=!0,t.isLoading=!1,t.errorMessage="Error getting location with gReference",t.createNotification(t.errorMessage,"negative","top","drv-alert-triangle"),this.listLocations=[];return}finally{t.isLoading=!1}},searchAlert(e,t){const o=t.find(n=>n.name===e);return o?{email:o.email,sms:o.sms}:{email:!1,sms:!1}},convertContacts(){return this.passengersNotifications.length===0?null:this.passengersNotifications.map(e=>{const t={BookingConfirmation:{email:this.searchAlert("BookingChauffeurDetail",e.actions).email,sms:this.searchAlert("BookingChauffeurDetail",e.actions).sms},BookingQuotation:{email:this.searchAlert("BookingQuotation",e.actions).email,sms:this.searchAlert("BookingQuotation",e.actions).sms},DriverOnLocation:{email:this.searchAlert("DriverOnLocation",e.actions).email,sms:this.searchAlert("DriverOnLocation",e.actions).sms},PassengerOnBoard:{email:this.searchAlert("PassengerOnBoard",e.actions).email,sms:this.searchAlert("PassengerOnBoard",e.actions).sms},DropOff:{email:this.searchAlert("DropOff",e.actions).email,sms:this.searchAlert("DropOff",e.actions).sms}};return{roleId:e.role_id,name:e.name,email:e.email,phone:e.phone,recipient:e.name,position:e.role_name,permissions:t}})},async saveQuote(){var i,l,f,T,k,m,L,p,y,q,I,A,B,M;const e=Ue(),t=K(),o=H(),n={},r={};this.bookService={salesPlatform:8,add_every_service_contacts:!1,bookingAgentId:((i=o.payload)==null?void 0:i.cid)||0,itineraryReference:null,staffId:""+((l=o.payload)==null?void 0:l.sid)||"",confirm:!1,clientReference:this.mySettings.bookingID||"",brokerCommission:+this.mySettings.managementFee,ipClient:"",userAgent:"",invoice:{invoiceTo:"1",clientId:((f=e.selectedClient)==null?void 0:f.id)||0,agentId:((T=o.payload)==null?void 0:T.cid)||0,payment:{type:((k=e.currentClientInfo)==null?void 0:k.payment_method.id)||0,creditCardId:""},client:{name:((m=e.selectedClient)==null?void 0:m.name)||"",address:((L=e.selectedClient)==null?void 0:L.address)||"",phone:+(((p=e.selectedClient)==null?void 0:p.phone)||0),email:((y=e.selectedClient)==null?void 0:y.email)||"",vatId:((q=e.selectedClient)==null?void 0:q.tax)||"",city:((I=e.selectedClient)==null?void 0:I.city)||"",postcode:((A=e.selectedClient)==null?void 0:A.postcode)||"",county:((B=e.selectedClient)==null?void 0:B.county)||"",country:((M=e.selectedClient)==null?void 0:M.country)||"",simplifiedInvoice:!1}},services:[]},(this.quoteRide.dropoff_1.iata!=""||this.quoteRide.pickup_1.icao!="")&&(n.pickup={id:this.quoteRide.dropoff_1.iata||null,name:this.quoteRide.dropoff_1.name,phone:"",iata:this.quoteRide.dropoff_1.iata||null}),(this.quoteRide.pickup_1.icao!=""||this.quoteRide.dropoff_1.iata!="")&&(n.pickup={id:this.quoteRide.pickup_1.iata||null,name:this.quoteRide.pickup_1.name,phone:"",iata:this.quoteRide.pickup_1.iata||null}),(this.flightInfo.departure.flightNumber!=""||this.flightInfo.departure.tailNumber!="")&&(r.pickup=this.flightInfo.departure.flightNumber!=""?this.flightInfo.departure.flightNumber:this.flightInfo.departure.tailNumber),(this.flightInfo.arrival.flightNumber!=""||this.flightInfo.arrival.tailNumber!="")&&(r.dropoff=this.flightInfo.arrival.flightNumber!=""?this.flightInfo.arrival.flightNumber:this.flightInfo.arrival.tailNumber);for(const c of this.selectedVehicles)this.bookService.services.push({arrival_flight_type:"",purchase_order:"",internal_additional_info:null,contacts:this.convertContacts(),boosters:this.passengerDetails.childBoosters,childseats:this.passengerDetails.babySeats,comments:this.passengerDetails.aditional,crew_member:this.flightInfo.crewMembers,departure_flight_type:"",fbo:Object.keys(n).length===0?null:n,flights:Object.keys(r).length===0?null:r,pax:this.passengerDetails.numTravelers,passenger:{email:this.passengerDetails.email,phone:this.passengerDetails.cellphone,name:this.passengerDetails.fullName},serviceDescription:"",serviceID:this.quoteResults[0].serviceId,type:"",vehicleID:c.vehicleId});t.isLoading=!0;try{console.log(this.bookService,"bookService");const c=await fetch(`${G}/services`,{method:"POST",headers:{Authorization:`Bearer ${o.token}`,"Content-Type":"application/json"},body:JSON.stringify(this.bookService)}),S=await c.json();if(console.log(S,"data"),!c.ok)throw new Error("Error saving quote");return!0}catch(c){return console.log(c,"error"),t.isError=!0,t.isLoading=!1,t.errorMessage="Error saving quote",t.createNotification(t.errorMessage,"negative","top","drv-alert-triangle"),!1}finally{t.isLoading=!1}}}});let mt=0;const pt=["click","keydown"],gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${mt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function bt(e,t,o,n){const r=ze(De,fe);if(r===fe)return console.error("QTab/QRouteTab component needs to be child of QTabs"),fe;const{proxy:i}=oe(),l=b(null),f=b(null),T=b(null),k=_(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),m=_(()=>r.currentModel.value===e.name),L=_(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(m.value===!0?" q-tab--active"+(r.tabProps.value.activeClass?" "+r.tabProps.value.activeClass:"")+(r.tabProps.value.activeColor?` text-${r.tabProps.value.activeColor}`:"")+(r.tabProps.value.activeBgColor?` bg-${r.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&r.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||r.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")),p=_(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(r.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),y=_(()=>e.disable===!0||r.hasFocus.value===!0||m.value===!1&&r.hasActiveTab.value===!0?-1:e.tabindex||0);function q(c,S){if(S!==!0&&l.value!==null&&l.value.focus(),e.disable!==!0){r.updateModel({name:e.name}),o("click",c);return}}function I(c){Ge(c,[13,32])?q(c,!0):Xe(c)!==!0&&c.keyCode>=35&&c.keyCode<=40&&c.altKey!==!0&&c.metaKey!==!0&&r.onKbdNavigate(c.keyCode,i.$el)===!0&&ie(c),o("keydown",c)}function A(){const c=r.tabProps.value.narrowIndicator,S=[],E=R("div",{ref:T,class:["q-tab__indicator",r.tabProps.value.indicatorClass]});e.icon!==void 0&&S.push(R(ae,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&S.push(R("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&S.push(e.alertIcon!==void 0?R(ae,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):R("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),c===!0&&S.push(E);const $=[R("div",{class:"q-focus-helper",tabindex:-1,ref:l}),R("div",{class:p.value},Je(t.default,S))];return c===!1&&$.push(E),$}const B={name:_(()=>e.name),rootRef:f,tabIndicatorRef:T,routeData:n};Ae(()=>{r.unregisterTab(B)}),Ke(()=>{r.registerTab(B)});function M(c,S){const E={ref:f,class:L.value,tabindex:y.value,role:"tab","aria-selected":m.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:q,onKeydown:I,...S};return He(R(c,E,A()),[[We,k.value]])}return{renderTab:M,$tabs:r}}const Dt=ne({name:"QTab",props:gt,emits:pt,setup(e,{slots:t,emit:o}){const{renderTab:n}=bt(e,t,o);return()=>n("div")}});function _t(e,t,o){const n=o===!0?["left","right"]:["top","bottom"];return`absolute-${t===!0?n[0]:n[1]}${e?` text-${e}`:""}`}const yt=["left","center","right","justify"],Lt=ne({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>yt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:t,emit:o}){const{proxy:n}=oe(),{$q:r}=n,{registerTick:i}=he(),{registerTick:l}=he(),{registerTick:f}=he(),{registerTimeout:T,removeTimeout:k}=pe(),{registerTimeout:m,removeTimeout:L}=pe(),p=b(null),y=b(null),q=b(e.modelValue),I=b(!1),A=b(!0),B=b(!1),M=b(!1),c=[],S=b(0),E=b(!1);let $=null,N=null,D;const J=_(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:_t(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Y=_(()=>{const a=S.value,s=q.value;for(let d=0;d<a;d++)if(c[d].name.value===s)return!0;return!1}),se=_(()=>`q-tabs__content--align-${I.value===!0?"left":M.value===!0?"justify":e.align}`),le=_(()=>`q-tabs row no-wrap items-center q-tabs--${I.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),ue=_(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+se.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),u=_(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),g=_(()=>e.vertical!==!0&&r.lang.rtl===!0),x=_(()=>Ye===!1&&g.value===!0);X(g,U),X(()=>e.modelValue,a=>{V({name:a,setCurrent:!0,skipEmit:!0})}),X(()=>e.outsideArrows,Z);function V({name:a,setCurrent:s,skipEmit:d}){q.value!==a&&(d!==!0&&e["onUpdate:modelValue"]!==void 0&&o("update:modelValue",a),(s===!0||e["onUpdate:modelValue"]===void 0)&&(Le(q.value,a),q.value=a))}function Z(){i(()=>{ge({width:p.value.offsetWidth,height:p.value.offsetHeight})})}function ge(a){if(u.value===void 0||y.value===null)return;const s=a[u.value.container],d=Math.min(y.value[u.value.scroll],Array.prototype.reduce.call(y.value.children,(w,v)=>w+(v[u.value.content]||0),0)),C=s>0&&d>s;I.value=C,C===!0&&l(U),M.value=s<parseInt(e.breakpoint,10)}function Le(a,s){const d=a!=null&&a!==""?c.find(w=>w.name.value===a):null,C=s!=null&&s!==""?c.find(w=>w.name.value===s):null;if(ee===!0)ee=!1;else if(d&&C){const w=d.tabIndicatorRef.value,v=C.tabIndicatorRef.value;$!==null&&(clearTimeout($),$=null),w.style.transition="none",w.style.transform="none",v.style.transition="none",v.style.transform="none";const h=w.getBoundingClientRect(),P=v.getBoundingClientRect();v.style.transform=e.vertical===!0?`translate3d(0,${h.top-P.top}px,0) scale3d(1,${P.height?h.height/P.height:1},1)`:`translate3d(${h.left-P.left}px,0,0) scale3d(${P.width?h.width/P.width:1},1,1)`,f(()=>{$=setTimeout(()=>{$=null,v.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",v.style.transform="none"},70)})}C&&I.value===!0&&F(C.rootRef.value)}function F(a){const{left:s,width:d,top:C,height:w}=y.value.getBoundingClientRect(),v=a.getBoundingClientRect();let h=e.vertical===!0?v.top-C:v.left-s;if(h<0){y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(h),U();return}h+=e.vertical===!0?v.height-w:v.width-d,h>0&&(y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(h),U())}function U(){const a=y.value;if(a===null)return;const s=a.getBoundingClientRect(),d=e.vertical===!0?a.scrollTop:Math.abs(a.scrollLeft);g.value===!0?(A.value=Math.ceil(d+s.width)<a.scrollWidth-1,B.value=d>0):(A.value=d>0,B.value=e.vertical===!0?Math.ceil(d+s.height)<a.scrollHeight:Math.ceil(d+s.width)<a.scrollWidth)}function be(a){N!==null&&clearInterval(N),N=setInterval(()=>{Be(a)===!0&&Q()},5)}function _e(){be(x.value===!0?Number.MAX_SAFE_INTEGER:0)}function ye(){be(x.value===!0?0:Number.MAX_SAFE_INTEGER)}function Q(){N!==null&&(clearInterval(N),N=null)}function Ee(a,s){const d=Array.prototype.filter.call(y.value.children,P=>P===s||P.matches&&P.matches(".q-tab.q-focusable")===!0),C=d.length;if(C===0)return;if(a===36)return F(d[0]),d[0].focus(),!0;if(a===35)return F(d[C-1]),d[C-1].focus(),!0;const w=a===(e.vertical===!0?38:37),v=a===(e.vertical===!0?40:39),h=w===!0?-1:v===!0?1:void 0;if(h!==void 0){const P=g.value===!0?-1:1,O=d.indexOf(s)+h*P;return O>=0&&O<C&&(F(d[O]),d[O].focus({preventScroll:!0})),!0}}const xe=_(()=>x.value===!0?{get:a=>Math.abs(a.scrollLeft),set:(a,s)=>{a.scrollLeft=-s}}:e.vertical===!0?{get:a=>a.scrollTop,set:(a,s)=>{a.scrollTop=s}}:{get:a=>a.scrollLeft,set:(a,s)=>{a.scrollLeft=s}});function Be(a){const s=y.value,{get:d,set:C}=xe.value;let w=!1,v=d(s);const h=a<v?-1:1;return v+=h*5,v<0?(w=!0,v=0):(h===-1&&v<=a||h===1&&v>=a)&&(w=!0,v=a),C(s,v),U(),w}function qe(a,s){for(const d in a)if(a[d]!==s[d])return!1;return!0}function $e(){let a=null,s={matchedLen:0,queryDiff:9999,hrefLen:0};const d=c.filter(h=>h.routeData!==void 0&&h.routeData.hasRouterLink.value===!0),{hash:C,query:w}=n.$route,v=Object.keys(w).length;for(const h of d){const P=h.routeData.exact.value===!0;if(h.routeData[P===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:O,query:ce,matched:Qe,href:je}=h.routeData.resolvedLink.value,de=Object.keys(ce).length;if(P===!0){if(O!==C||de!==v||qe(w,ce)===!1)continue;a=h.name.value;break}if(O!==""&&O!==C||de!==0&&qe(ce,w)===!1)continue;const j={matchedLen:Qe.length,queryDiff:v-de,hrefLen:je.length-O.length};if(j.matchedLen>s.matchedLen){a=h.name.value,s=j;continue}else if(j.matchedLen!==s.matchedLen)continue;if(j.queryDiff<s.queryDiff)a=h.name.value,s=j;else if(j.queryDiff!==s.queryDiff)continue;j.hrefLen>s.hrefLen&&(a=h.name.value,s=j)}if(a===null&&c.some(h=>h.routeData===void 0&&h.name.value===q.value)===!0){ee=!1;return}V({name:a,setCurrent:!0})}function Me(a){if(k(),E.value!==!0&&p.value!==null&&a.target&&typeof a.target.closest=="function"){const s=a.target.closest(".q-tab");s&&p.value.contains(s)===!0&&(E.value=!0,I.value===!0&&F(s))}}function Ne(){T(()=>{E.value=!1},30)}function z(){we.avoidRouteWatcher===!1?m($e):L()}function Ce(){if(D===void 0){const a=X(()=>n.$route.fullPath,z);D=()=>{a(),D=void 0}}}function Oe(a){c.push(a),S.value++,Z(),a.routeData===void 0||n.$route===void 0?m(()=>{if(I.value===!0){const s=q.value,d=s!=null&&s!==""?c.find(C=>C.name.value===s):null;d&&F(d.rootRef.value)}}):(Ce(),a.routeData.hasRouterLink.value===!0&&z())}function Ve(a){c.splice(c.indexOf(a),1),S.value--,Z(),D!==void 0&&a.routeData!==void 0&&(c.every(s=>s.routeData===void 0)===!0&&D(),z())}const we={currentModel:q,tabProps:J,hasFocus:E,hasActiveTab:Y,registerTab:Oe,unregisterTab:Ve,verifyRouteModel:z,updateModel:V,onKbdNavigate:Ee,avoidRouteWatcher:!1};Ze(De,we);function Se(){$!==null&&clearTimeout($),Q(),D!==void 0&&D()}let Te,ee;return Ae(Se),et(()=>{Te=D!==void 0,Se()}),tt(()=>{Te===!0&&(Ce(),ee=!0,z()),Z()}),()=>R("div",{ref:p,class:le.value,role:"tablist",onFocusin:Me,onFocusout:Ne},[R(ft,{onResize:ge}),R("div",{ref:y,class:ue.value,onScroll:U},re(t.default)),R(ae,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(A.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||r.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:_e,onTouchstartPassive:_e,onMouseupPassive:Q,onMouseleavePassive:Q,onTouchendPassive:Q}),R(ae,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(B.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||r.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ye,onTouchstartPassive:ye,onMouseupPassive:Q,onMouseleavePassive:Q,onTouchendPassive:Q})])}});function qt(e){const t=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((o,n)=>{const r=parseFloat(o);r&&(t[n]=r)}),t}const Ct=it({name:"touch-swipe",beforeMount(e,{value:t,arg:o,modifiers:n}){if(n.mouse!==!0&&W.has.touch!==!0)return;const r=n.mouseCapture===!0?"Capture":"",i={handler:t,sensitivity:qt(o),direction:Re(n),noop:at,mouseStart(l){Ie(l,i)&&ot(l)&&(te(i,"temp",[[document,"mousemove","move",`notPassive${r}`],[document,"mouseup","end","notPassiveCapture"]]),i.start(l,!0))},touchStart(l){if(Ie(l,i)){const f=l.target;te(i,"temp",[[f,"touchmove","move","notPassiveCapture"],[f,"touchcancel","end","notPassiveCapture"],[f,"touchend","end","notPassiveCapture"]]),i.start(l)}},start(l,f){W.is.firefox===!0&&ve(e,!0);const T=ke(l);i.event={x:T.left,y:T.top,time:Date.now(),mouse:f===!0,dir:!1}},move(l){if(i.event===void 0)return;if(i.event.dir!==!1){ie(l);return}const f=Date.now()-i.event.time;if(f===0)return;const T=ke(l),k=T.left-i.event.x,m=Math.abs(k),L=T.top-i.event.y,p=Math.abs(L);if(i.event.mouse!==!0){if(m<i.sensitivity[1]&&p<i.sensitivity[1]){i.end(l);return}}else if(window.getSelection().toString()!==""){i.end(l);return}else if(m<i.sensitivity[2]&&p<i.sensitivity[2])return;const y=m/f,q=p/f;i.direction.vertical===!0&&m<p&&m<100&&q>i.sensitivity[0]&&(i.event.dir=L<0?"up":"down"),i.direction.horizontal===!0&&m>p&&p<100&&y>i.sensitivity[0]&&(i.event.dir=k<0?"left":"right"),i.direction.up===!0&&m<p&&L<0&&m<100&&q>i.sensitivity[0]&&(i.event.dir="up"),i.direction.down===!0&&m<p&&L>0&&m<100&&q>i.sensitivity[0]&&(i.event.dir="down"),i.direction.left===!0&&m>p&&k<0&&p<100&&y>i.sensitivity[0]&&(i.event.dir="left"),i.direction.right===!0&&m>p&&k>0&&p<100&&y>i.sensitivity[0]&&(i.event.dir="right"),i.event.dir!==!1?(ie(l),i.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),nt(),i.styleCleanup=I=>{i.styleCleanup=void 0,document.body.classList.remove("non-selectable");const A=()=>{document.body.classList.remove("no-pointer-events--children")};I===!0?setTimeout(A,50):A()}),i.handler({evt:l,touch:i.event.mouse!==!0,mouse:i.event.mouse,direction:i.event.dir,duration:f,distance:{x:m,y:p}})):i.end(l)},end(l){i.event!==void 0&&(me(i,"temp"),W.is.firefox===!0&&ve(e,!1),i.styleCleanup!==void 0&&i.styleCleanup(!0),l!==void 0&&i.event.dir!==!1&&ie(l),i.event=void 0)}};if(e.__qtouchswipe=i,n.mouse===!0){const l=n.mouseCapture===!0||n.mousecapture===!0?"Capture":"";te(i,"main",[[e,"mousedown","mouseStart",`passive${l}`]])}W.has.touch===!0&&te(i,"main",[[e,"touchstart","touchStart",`passive${n.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const o=e.__qtouchswipe;o!==void 0&&(t.oldValue!==t.value&&(typeof t.value!="function"&&o.end(),o.handler=t.value),o.direction=Re(t.modifiers))},beforeUnmount(e){const t=e.__qtouchswipe;t!==void 0&&(me(t,"main"),me(t,"temp"),W.is.firefox===!0&&ve(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchswipe)}});function wt(){let e=Object.create(null);return{getCache:(t,o)=>e[t]===void 0?e[t]=typeof o=="function"?o():o:e[t],setCache(t,o){e[t]=o},hasCache(t){return Object.hasOwnProperty.call(e,t)},clearCache(t){t!==void 0?delete e[t]:e=Object.create(null)}}}const St={name:{required:!0},disable:Boolean},Pe={setup(e,{slots:t}){return()=>R("div",{class:"q-panel scroll",role:"tabpanel"},re(t.default))}},Tt={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},kt=["update:modelValue","beforeTransition","transition"];function Rt(){const{props:e,emit:t,proxy:o}=oe(),{getCache:n}=wt(),{registerTimeout:r}=pe();let i,l;const f=b(null),T=b(null);function k(u){const g=e.vertical===!0?"up":"left";D((o.$q.lang.rtl===!0?-1:1)*(u.direction===g?1:-1))}const m=_(()=>[[Ct,k,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),L=_(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),p=_(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),y=_(()=>`--q-transition-duration: ${e.transitionDuration}ms`),q=_(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),I=_(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),A=_(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);X(()=>e.modelValue,(u,g)=>{const x=S(u)===!0?E(u):-1;l!==!0&&N(x===-1?0:x<E(g)?-1:1),f.value!==x&&(f.value=x,t("beforeTransition",u,g),r(()=>{t("transition",u,g)},e.transitionDuration))});function B(){D(1)}function M(){D(-1)}function c(u){t("update:modelValue",u)}function S(u){return u!=null&&u!==""}function E(u){return i.findIndex(g=>g.props.name===u&&g.props.disable!==""&&g.props.disable!==!0)}function $(){return i.filter(u=>u.props.disable!==""&&u.props.disable!==!0)}function N(u){const g=u!==0&&e.animated===!0&&f.value!==-1?"q-transition--"+(u===-1?L.value:p.value):null;T.value!==g&&(T.value=g)}function D(u,g=f.value){let x=g+u;for(;x!==-1&&x<i.length;){const V=i[x];if(V!==void 0&&V.props.disable!==""&&V.props.disable!==!0){N(u),l=!0,t("update:modelValue",V.props.name),setTimeout(()=>{l=!1});return}x+=u}e.infinite===!0&&i.length!==0&&g!==-1&&g!==i.length&&D(u,u===-1?i.length:-1)}function J(){const u=E(e.modelValue);return f.value!==u&&(f.value=u),!0}function Y(){const u=S(e.modelValue)===!0&&J()&&i[f.value];return e.keepAlive===!0?[R(lt,I.value,[R(A.value===!0?n(q.value,()=>({...Pe,name:q.value})):Pe,{key:q.value,style:y.value},()=>u)])]:[R("div",{class:"q-panel scroll",style:y.value,key:q.value,role:"tabpanel"},[u])]}function se(){if(i.length!==0)return e.animated===!0?[R(rt,{name:T.value},Y)]:Y()}function le(u){return i=st(re(u.default,[])).filter(g=>g.props!==null&&g.props.slot===void 0&&S(g.props.name)===!0),i.length}function ue(){return i}return Object.assign(o,{next:B,previous:M,goTo:c}),{panelIndex:f,panelDirectives:m,updatePanelsList:le,updatePanelIndex:J,getPanelContent:se,getEnabledPanels:$,getPanels:ue,isValidPanelName:S,keepAliveProps:I,needsUniqueKeepAliveWrapper:A,goToPanelByOffset:D,goToPanel:c,nextPanel:B,previousPanel:M}}const Et=ne({name:"QTabPanel",props:St,setup(e,{slots:t}){return()=>R("div",{class:"q-tab-panel",role:"tabpanel"},re(t.default))}}),xt=ne({name:"QTabPanels",props:{...Tt,...ut},emits:kt,setup(e,{slots:t}){const o=oe(),n=ct(e,o.proxy.$q),{updatePanelsList:r,getPanelContent:i,panelDirectives:l}=Rt(),f=_(()=>"q-tab-panels q-panel-parent"+(n.value===!0?" q-tab-panels--dark q-dark":""));return()=>(r(t),dt("div",{class:f.value},i(),"pan",e.swipeable,()=>l.value))}});export{Lt as Q,At as a,xt as b,Dt as c,Et as d,wt as u};