(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"82r1":function(l,e,n){"use strict";n.d(e,"a",(function(){return t})),n("x/PY"),n("IiDS");class t{constructor(l,e,n,t,u,i){this.vehicleService=l,this.vehicleservService=e,this.activeRoute=n,this.eRef=t,this.router=u,this.dialogService=i,this.vehicleDetails=[]}ngOnInit(){this.loadVehicles(this.vehicleId)}loadVehicles(l){this.vehicleService.loadVehicle(l).subscribe(l=>{this.vehicleDetails=l.data[0],console.log(this.vehicleDetails)},l=>{})}open(l){this.dialogService.open(l,{context:"this is some additional data passed to dialog"})}}},LboF:function(l,e,n){"use strict";var t,u={},i=function(){var l={};return function(e){if(void 0===l[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}l[e]=n}return l[e]}}();function s(l,e){for(var n=[],t={},u=0;u<l.length;u++){var i=l[u],s=e.base?i[0]+e.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};t[s]?t[s].parts.push(a):n.push(t[s]={id:s,parts:[a]})}return n}function a(l,e){for(var n=0;n<l.length;n++){var t=l[n],i=u[t.id],s=0;if(i){for(i.refs++;s<i.parts.length;s++)i.parts[s](t.parts[s]);for(;s<t.parts.length;s++)i.parts.push(v(t.parts[s],e))}else{for(var a=[];s<t.parts.length;s++)a.push(v(t.parts[s],e));u[t.id]={id:t.id,refs:1,parts:a}}}}function r(l){var e=document.createElement("style");if(void 0===l.attributes.nonce){var t=n.nc;t&&(l.attributes.nonce=t)}if(Object.keys(l.attributes).forEach((function(n){e.setAttribute(n,l.attributes[n])})),"function"==typeof l.insert)l.insert(e);else{var u=i(l.insert||"head");if(!u)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");u.appendChild(e)}return e}var c,o=(c=[],function(l,e){return c[l]=e,c.filter(Boolean).join("\n")});function h(l,e,n,t){var u=n?"":t.css;if(l.styleSheet)l.styleSheet.cssText=o(e,u);else{var i=document.createTextNode(u),s=l.childNodes;s[e]&&l.removeChild(s[e]),s.length?l.insertBefore(i,s[e]):l.appendChild(i)}}function d(l,e,n){var t=n.css,u=n.media,i=n.sourceMap;if(u&&l.setAttribute("media",u),i&&btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),l.styleSheet)l.styleSheet.cssText=t;else{for(;l.firstChild;)l.removeChild(l.firstChild);l.appendChild(document.createTextNode(t))}}var f=null,p=0;function v(l,e){var n,t,u;if(e.singleton){var i=p++;n=f||(f=r(e)),t=h.bind(null,n,i,!1),u=h.bind(null,n,i,!0)}else n=r(e),t=d.bind(null,n,e),u=function(){!function(l){if(null===l.parentNode)return!1;l.parentNode.removeChild(l)}(n)};return t(l),function(e){if(e){if(e.css===l.css&&e.media===l.media&&e.sourceMap===l.sourceMap)return;t(l=e)}else u()}}l.exports=function(l,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var n=s(l,e);return a(n,e),function(l){for(var t=[],i=0;i<n.length;i++){var r=u[n[i].id];r&&(r.refs--,t.push(r))}l&&a(s(l,e),e);for(var c=0;c<t.length;c++){var o=t[c];if(0===o.refs){for(var h=0;h<o.parts.length;h++)o.parts[h]();delete u[o.id]}}}}},c6ID:function(l,e,n){"use strict";n.d(e,"a",(function(){return i}));var t=n("l7GE"),u=n("ZUHj");function i(l){return e=>e.lift(new s(l))}class s{constructor(l){this.notifier=l}call(l,e){const n=new a(l),t=e.subscribe(n);return t.add(Object(u.a)(n,this.notifier)),t}}class a extends t.a{constructor(){super(...arguments),this.hasValue=!1}_next(l){this.value=l,this.hasValue=!0}notifyNext(l,e,n,t,u){this.emitValue()}notifyComplete(){this.emitValue()}emitValue(){this.hasValue&&(this.hasValue=!1,this.destination.next(this.value))}}},laEK:function(l,e,n){"use strict";n.d(e,"a",(function(){return u}));var t=n("AytR");class u{constructor(l){this.http=l,this.baseUrl=t.a.baseUrl}loadVehicles(l){return this.http.get(this.baseUrl+"/vehicles?page="+l)}loadAssignVehicles(l){return this.http.get(this.baseUrl+"/vehicles/assign_vehicles?page="+l)}loadVehiclesTypes(){return this.http.get(this.baseUrl+"/vehicles/types")}loadVehicleDetails(l){return this.http.get(this.baseUrl+"/vehicles/details/"+l)}loadVehicleRegistrations(){return this.http.get(this.baseUrl+"/vehicles/regnos")}loadFiltereddata(l,e){return this.http.get(this.baseUrl+"/vehicles/filtervehicle?"+l,e)}loadModelsData(l){return this.http.get(this.baseUrl+"/vehicles/models/"+l)}loadBrandsData(){return this.http.get(this.baseUrl+"/vehicles/brands")}loadColorsData(){return this.http.get(this.baseUrl+"/vehicles/colors")}loadFuelTypeData(l){return this.http.get(this.baseUrl+"/vehicles/fueltype/"+l)}loadFuelMesaurementData(){return this.http.get(this.baseUrl+"/vehicles/fuelMeasurement")}loadAgentData(){return this.http.get(this.baseUrl+"/vehicles/agents")}loadOwnerShipData(){return this.http.get(this.baseUrl+"/vehicles/ownerships")}uploadFile(l){return this.http.post(this.baseUrl+"/vehicles/fileupload",l)}addVehicle(l){return this.http.post(this.baseUrl+"/vehicles/add",l)}addAssignVehicle(l){return this.http.post(this.baseUrl+"/vehicles/add-assign",l)}loadVehicleStatus(){return this.http.get(this.baseUrl+"/vehicles/vehicleStatus")}loadWorkLocation(){return this.http.get(this.baseUrl+"/vehicles/workLocations")}deleteVehicle(l){return this.http.post(this.baseUrl+"/vehicles/deleteVehicle",l)}loadVehicle(l){return this.http.get(this.baseUrl+"/vehicles/getvehicle/"+l)}updateVehicle(l){return this.http.post(this.baseUrl+"/vehicles/updateVehicle",l)}loadAssignedVehiclesById(l){return this.http.get(this.baseUrl+"/vehicles/getAssignVehicle/"+l)}loadEmployee(){return this.http.get(this.baseUrl+"/employees")}loadProjectType(){return this.http.get(this.baseUrl+"/project/projecttypes")}loadProjects(l){return this.http.get(this.baseUrl+"/project/"+l)}loadExpensesByVehicles(){return this.http.get(this.baseUrl+"/expenses/vehicle_expenses_by_vehicle")}getExpenseTypename(l){return this.http.get(this.baseUrl+"/expenses/expensetypebyexpenseid/"+l)}}},nCWH:function(l,e,n){"use strict";var t=n("8Y7J"),u=n("SVse");n("82r1"),n("x/PY"),n("IiDS"),n("iInd"),n("tKwJ"),n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return b}));var i=t["\u0275crt"]({encapsulation:0,styles:[[".VehicleDetail[_ngcontent-%COMP%]{width:100%;float:left}.VehicleDetail_image[_ngcontent-%COMP%]{width:80px;float:left;margin-right:5px}.VehicleDetail_name[_ngcontent-%COMP%]{width:calc(100%- 55px);float:left}.VehicleDetail_name[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-weight:400}"]],data:{}});function s(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,4,"nb-card",[["class","popupImage"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,3,"nb-card-body",[],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,0,"img",[["alt"," "]],[[8,"src",4]],null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,1,"button",[["class","popupClose"],["nbButton",""]],null,[[null,"click"]],(function(l,e,n){var t=!0;return"click"===e&&(t=!1!==l.context.dialogRef.close()&&t),t}),null,null)),(l()(),t["\u0275eld"](4,0,null,null,0,"i",[["class","fas fa-times-circle"]],null,null,null,null,null))],null,(function(l,e){l(e,2,0,e.component.vehicleDetails.vehicleImage)}))}function a(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-info"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-wrench"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Working"]))],null,null)}function r(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-success"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-check-circle"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Active "]))],null,null)}function c(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-warning"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"img",[["alt",""],["src","assets/images/repair.png"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" In-Service"]))],null,null)}function o(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-success"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-file-signature"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Complaint"]))],null,null)}function h(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-danger"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-car-crash"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Accident "]))],null,null)}function d(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-danger"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-times-circle"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Not Working"]))],null,null)}function f(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-success"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-check-circle"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" In Active"]))],null,null)}function p(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,14,"ul",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,a)),t["\u0275did"](2,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,r)),t["\u0275did"](4,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,c)),t["\u0275did"](6,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,o)),t["\u0275did"](8,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](10,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,d)),t["\u0275did"](12,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](14,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,e){l(e,2,0,"Working"==e.context.$implicit.vehicleStatus),l(e,4,0,"Active"==e.context.$implicit.vehicleStatus),l(e,6,0,"In-Service"==e.context.$implicit.vehicleStatus),l(e,8,0,"Complaint"==e.context.$implicit.vehicleStatus),l(e,10,0,"Accident"==e.context.$implicit.vehicleStatus),l(e,12,0,"Not-Working"==e.context.$implicit.vehicleStatus),l(e,14,0,"In-Active"==e.context.$implicit.vehicleStatus)}),null)}function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,(function(l,e){l(e,1,0,e.context.$implicit.vehicleType)}))}function g(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,(function(l,e){l(e,1,0,e.context.$implicit.vehicleDetails)}))}function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,29,"table",[["class","table p-0 m-0"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,28,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,27,"tr",[],null,null,null,null,null)),(l()(),t["\u0275and"](0,[["dialog",2]],null,0,null,s)),(l()(),t["\u0275eld"](4,0,null,null,14,"td",[["class","border-0"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,13,"div",[["class","VehicleDetail"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,1,"div",[["class","VehicleDetail_image"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,0,"img",[["nbButton",""],["width","80"]],[[8,"src",4]],[[null,"click"]],(function(l,e,n){var u=!0;return"click"===e&&(u=!1!==l.component.open(t["\u0275nov"](l,3))&&u),u}),null,null)),(l()(),t["\u0275eld"](8,0,null,null,10,"div",[["class","VehicleDetail_name"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),t["\u0275ted"](10,null,["",""])),(l()(),t["\u0275eld"](11,0,null,null,3,"h6",[],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Code:"])),(l()(),t["\u0275ted"](14,null,[" ",""])),(l()(),t["\u0275eld"](15,0,null,null,3,"p",[],null,null,null,null,null)),(l()(),t["\u0275eld"](16,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Reg/Ser No.:"])),(l()(),t["\u0275ted"](18,null,[" ",""])),(l()(),t["\u0275eld"](19,0,null,null,3,"td",[["class","border-0"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,2,"div",[["class","vehicleStatus"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,p)),t["\u0275did"](22,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](23,0,null,null,6,"td",[["class","border-0"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,null,null,5,"h6",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](26,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275ted"](-1,null,[" - "])),(l()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](29,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(l,e){var n=e.component;l(e,22,0,n.vehicleDetails.vehicleStatuss),l(e,26,0,n.vehicleDetails.vehicleTypes),l(e,29,0,n.vehicleDetails.vehicleDetailsArray)}),(function(l,e){var n=e.component;l(e,7,0,n.vehicleDetails.vehicleImage),l(e,10,0,n.vehicleDetails.name),l(e,14,0,n.vehicleDetails.vehicle_code),l(e,18,0,n.vehicleDetails.regNo)}))}},tomM:function(l,e,n){"use strict";var t=n("HDdC"),u=n("JIr8");function i(l){return Object(u.a)(l)(this)}t.a.prototype.catch=i,t.a.prototype._catch=i}}]);