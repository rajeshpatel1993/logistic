function _defineProperties(l,n){for(var e=0;e<n.length;e++){var u=n[e];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(l,u.key,u)}}function _createClass(l,n,e){return n&&_defineProperties(l.prototype,n),e&&_defineProperties(l,e),l}function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"4fRq":function(l,n){var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var u=new Uint8Array(16);l.exports=function(){return e(u),u}}else{var t=new Array(16);l.exports=function(){for(var l,n=0;n<16;n++)0==(3&n)&&(l=4294967296*Math.random()),t[n]=l>>>((3&n)<<3)&255;return t}}},EcEN:function(l,n,e){var u=e("xDdU"),t=e("xk4V"),o=t;o.v1=u,o.v4=t,l.exports=o},GT4v:function(l,n,e){"use strict";e.r(n);var u=e("8Y7J"),t=function l(){_classCallCheck(this,l)},o=e("pMnS"),a=e("iInd"),i=function l(){_classCallCheck(this,l)},s=u["\u0275crt"]({encapsulation:2,styles:[],data:{}});function c(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),u["\u0275did"](1,212992,null,0,a.q,[a.b,u.ViewContainerRef,u.ComponentFactoryResolver,[8,null],u.ChangeDetectorRef],null,null)],(function(l,n){l(n,1,0)}),null)}var d=u["\u0275ccf"]("ngx-notes-components",i,(function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"ngx-notes-components",[],null,null,null,c,s)),u["\u0275did"](1,49152,null,0,i,[],null,null)],null,null)}),{},{},[]),r=e("s7LF"),m=e("jXVt"),p=e("tKwJ"),g=e("MBgw"),v=e("s7Le"),h=e("x/PY"),f=e("IiDS"),C=e("EcEN"),b=function(){function l(n,e,u,t,o){_classCallCheck(this,l),this.vehicleService=n,this.vehicleservService=e,this.fb=u,this.activeRoute=t,this.router=o,this.vehicleData=[],this.vehicleTypesData=[],this.vehicleNamesData=[],this.expenseTypesData=[],this.vehicleIssueStatusData=[],this.selectedFiles=[],this.msgObj={},this.dialogBox=!1,this.submitted=!1,this.keyword="name",this.billFileUniqueId=C.v4(),this.imageFileUniqueId=C.v4()}return _createClass(l,[{key:"ngOnInit",value:function(){this.vehicleId=this.activeRoute.snapshot.params.id,this.loadVehiclesTypes(),this.createForm(),this.loadExpenseType(),this.loadvehicleIssueStatus()}},{key:"getMsg",value:function(l){this.dialogBox=!1,console.log(l)}},{key:"createForm",value:function(){this.vehicleExpenseForm=this.fb.group({vehicle_type:["",r.Validators.required],vehicle:["",r.Validators.required],expense_type:["",r.Validators.required],expense_date:["",r.Validators.required],vendor:[""],details:["",r.Validators.required],amount:["",r.Validators.required],issue_status:["",r.Validators.required],attachments:[this.billFileUniqueId],images:[this.imageFileUniqueId],note:[""]})}},{key:"uploadBills",value:function(){var l=this,n=new FormData;if(n.append("fileId",this.billFileUniqueId),n.append("typeoffile","bills"),this.selectedFiles.length)for(var e=0;e<this.selectedFiles.length;e++)n.append("files",this.selectedFiles[e],this.selectedFiles[e].name);this.vehicleService.uploadFile(n).subscribe((function(n){l.msgObj.type="success",l.msgObj.message="successfully uploaded",l.dialogBox=!0}),(function(l){console.log(l)}))}},{key:"uploadImages",value:function(){var l=this,n=new FormData;if(n.append("fileId",this.imageFileUniqueId),n.append("typeoffile","images"),this.selectedFiles.length)for(var e=0;e<this.selectedFiles.length;e++)n.append("files",this.selectedFiles[e],this.selectedFiles[e].name);this.vehicleService.uploadFile(n).subscribe((function(n){l.msgObj.type="success",l.msgObj.message="successfully uploaded",l.dialogBox=!0}),(function(l){console.log(l)}))}},{key:"selectEventVehicle",value:function(l){var n=this;this.vehicleService.loadVehicle(l.id).subscribe((function(l){var e=l.data[0];n.vehicleRegNo=e.regNo,n.vehicleCode=e.vehicle_code,n.vehicleImage=e.vehicleImage,n.vehicleDetail=e.vehicleDetailsArray[0].vehicleDetails}),(function(l){console.log(l)}))}},{key:"selectVehicleType",value:function(l){var n=this;this.vehicleservService.loadVehiclesByTypeId(l.id).subscribe((function(l){l.data.forEach((function(l,e){var u={};u.id=l._id,u.name=l.name,n.vehicleNamesData.push(u)}))}),(function(l){console.log(l)}))}},{key:"onChangeSearch",value:function(l){}},{key:"onFocused",value:function(l){}},{key:"loadExpenseType",value:function(){var l=this;this.vehicleservService.loadExpenseType().subscribe((function(n){n.data.forEach((function(n,e){var u={};u.id=n._id,u.name=n.expenseType,l.expenseTypesData.push(u)}))}))}},{key:"loadvehicleIssueStatus",value:function(){var l=this;this.vehicleservService.loadVehicleIssueStatus().subscribe((function(n){n.data.forEach((function(n,e){var u={};u.id=n._id,u.name=n.vehicleIssueStatus,l.vehicleIssueStatusData.push(u)}))}))}},{key:"selectEvent",value:function(l){}},{key:"fileAdded",value:function(l){if(l.target.files.length)for(var n=0;n<l.target.files.length;n++)this.selectedFiles.push(l.target.files[n])}},{key:"loadVehiclesTypes",value:function(){var l=this;this.vehicleService.loadVehiclesTypes().subscribe((function(n){n.data.forEach((function(n,e){var u={};u.id=n.vehicleTypeId,u.name=n.vehicleType,u.code=n.vehicleTypeCode,u._id=n._id,l.vehicleTypesData.push(u)}))}))}},{key:"addExpense",value:function(){var l=this;this.submitted=!0,this.vehicleExpenseForm.invalid?alert("Please fill all required field"):this.vehicleservService.addExpense(this.vehicleExpenseForm.value).subscribe((function(n){l.msgObj.type="success",l.msgObj.message="successfully Added",l.dialogBox=!0,setTimeout((function(){l.router.navigateByUrl("/pages/expenses/list")}),2e3)}),(function(l){}))}},{key:"f",get:function(){return this.vehicleExpenseForm.controls}}]),l}(),_=u["\u0275crt"]({encapsulation:0,styles:[[".VehicleAddTab[_ngcontent-%COMP%]{width:100%;float:left;background-color:#fff;padding:1rem}.VehicleAddTab[_ngcontent-%COMP%]   nb-tab[_ngcontent-%COMP%]{width:70%;float:left;min-height:355px}@media (max-width:767px){.VehicleAddTab[_ngcontent-%COMP%]   nb-tab[_ngcontent-%COMP%]{width:100%;padding:20px 0}}.VehicleAddTab[_ngcontent-%COMP%]   .col-form-label[_ngcontent-%COMP%]{font-size:14px;font-weight:600}.VehicleAddTab[_ngcontent-%COMP%]   .vehbgcolor[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.05);padding:1rem}.VehicleAddTab[_ngcontent-%COMP%]   .vehbgcolor[_ngcontent-%COMP%]   .col-form-label[_ngcontent-%COMP%]{font-size:18px;font-weight:600;color:var(--tabset-tab-active-text-color)}.VehicleAddTab[_ngcontent-%COMP%]   .tabset[_ngcontent-%COMP%]   .tab.active[_ngcontent-%COMP%]   .tab-link[_ngcontent-%COMP%]{background-color:#fff}.VehicleAddTab[_ngcontent-%COMP%]   .tabset[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .tab-link[_ngcontent-%COMP%]{font-size:14px}.VehicleAddTab[_ngcontent-%COMP%]   .ng-autocomplete[_ngcontent-%COMP%]{width:100%}.VehicleAddTab[_ngcontent-%COMP%]   label[for=file-input][_ngcontent-%COMP%]{display:block;margin-bottom:1em;font-size:1em;color:#fff;font-weight:700}.VehicleAddTab[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{cursor:pointer}.VehicleAddTab[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]::-webkit-file-upload-button{background:#17a2b8;border:0;padding:.7em 2em;cursor:pointer;color:#fff;border-radius:.2em}.VehicleAddTab[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]::-ms-browse{background:#17a2b8;border:0;padding:1em 2em;cursor:pointer;color:#fff;border-radius:.2em}.autocomplete-container[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:20px}"]],data:{}});function y(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"a",[],[[8,"innerHTML",1]],null,null,null,null))],null,(function(l,n){l(n,0,0,n.context.$implicit.name)}))}function V(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null))],null,(function(l,n){l(n,0,0,n.context.$implicit)}))}function T(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"a",[],[[8,"innerHTML",1]],null,null,null,null))],null,(function(l,n){l(n,0,0,n.context.$implicit.name)}))}function O(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null))],null,(function(l,n){l(n,0,0,n.context.$implicit)}))}function F(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,116,"div",[["class","VehicleAddTab"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,115,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,e){var t=!0;return"submit"===n&&(t=!1!==u["\u0275nov"](l,3).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,3).onReset()&&t),t}),null,null)),u["\u0275did"](2,16384,null,0,r["\u0275angular_packages_forms_forms_z"],[],null,null),u["\u0275did"](3,540672,null,0,r.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},null),u["\u0275prd"](2048,null,r.ControlContainer,null,[r.FormGroupDirective]),u["\u0275did"](5,16384,null,0,r.NgControlStatusGroup,[[4,r.ControlContainer]],null,null),(l()(),u["\u0275eld"](6,0,null,null,106,"div",[["class","row no-gutters"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,105,"nb-tabset",[["class","col-12"]],[[2,"full-width",null]],null,null,m.ec,m.ib)),u["\u0275did"](8,1097728,null,1,p.Qd,[a.a,u.ChangeDetectorRef],null,null),u["\u0275qud"](603979776,1,{tabs:1}),(l()(),u["\u0275eld"](10,0,null,0,58,"nb-tab",[["class","identification"],["tabTitle","Identification"]],[[2,"disabled",null],[2,"content-active",null]],null,null,m.dc,m.hb)),u["\u0275did"](11,49152,[[1,4]],0,p.Nd,[],{tabTitle:[0,"tabTitle"]},null),(l()(),u["\u0275eld"](12,0,null,0,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](13,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle Type"])),(l()(),u["\u0275eld"](15,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](17,0,null,null,10,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,9,"div",[["class","ng-autocomplete"]],null,null,null,null,null)),(l()(),u["\u0275eld"](19,0,null,null,6,"ng-autocomplete",[["class","ng-autocomplete"],["formControlName","vehicle_type"],["placeHolder","Enter the Vehicle Type"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"selected"],["document","click"]],(function(l,n,e){var t=!0,o=l.component;return"document:click"===n&&(t=!1!==u["\u0275nov"](l,20).handleClick(e)&&t),"selected"===n&&(t=!1!==o.selectVehicleType(e)&&t),t}),g.b,g.a)),u["\u0275did"](20,638976,null,1,v.a,[u.ElementRef,u.Renderer2],{data:[0,"data"],searchKeyword:[1,"searchKeyword"],placeHolder:[2,"placeHolder"],itemTemplate:[3,"itemTemplate"],notFoundTemplate:[4,"notFoundTemplate"]},{selected:"selected"}),u["\u0275qud"](335544320,2,{itemTemplate:0}),u["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,(function(l){return[l]}),[v.a]),u["\u0275did"](23,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),u["\u0275did"](25,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),u["\u0275and"](0,[["itemTemplate1",2]],null,0,null,y)),(l()(),u["\u0275and"](0,[["notFoundTemplate1",2]],null,0,null,V)),(l()(),u["\u0275eld"](28,0,null,0,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](29,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle Name"])),(l()(),u["\u0275eld"](31,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](33,0,null,null,10,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](34,0,null,null,9,"div",[["class","ng-autocomplete"]],null,null,null,null,null)),(l()(),u["\u0275eld"](35,0,null,null,6,"ng-autocomplete",[["class","ng-autocomplete"],["formControlName","vehicle"],["placeHolder","Enter the Vehicle Name"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"selected"],["document","click"]],(function(l,n,e){var t=!0,o=l.component;return"document:click"===n&&(t=!1!==u["\u0275nov"](l,36).handleClick(e)&&t),"selected"===n&&(t=!1!==o.selectEventVehicle(e)&&t),t}),g.b,g.a)),u["\u0275did"](36,638976,null,1,v.a,[u.ElementRef,u.Renderer2],{data:[0,"data"],searchKeyword:[1,"searchKeyword"],placeHolder:[2,"placeHolder"],itemTemplate:[3,"itemTemplate"],notFoundTemplate:[4,"notFoundTemplate"]},{selected:"selected"}),u["\u0275qud"](335544320,3,{itemTemplate:0}),u["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,(function(l){return[l]}),[v.a]),u["\u0275did"](39,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),u["\u0275did"](41,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),u["\u0275and"](0,[["itemTemplate2",2]],null,0,null,T)),(l()(),u["\u0275and"](0,[["notFoundTemplate2",2]],null,0,null,O)),(l()(),u["\u0275eld"](44,0,null,0,6,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](45,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle Reg No"])),(l()(),u["\u0275eld"](47,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](49,0,null,null,1,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](50,0,null,null,0,"input",[["class","form-control"],["placeholder","Vehicle Reg No"],["readonly",""],["type","text"]],[[8,"value",0]],null,null,null,null)),(l()(),u["\u0275eld"](51,0,null,0,4,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](52,0,null,null,1,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle Code"])),(l()(),u["\u0275eld"](54,0,null,null,1,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](55,0,null,null,0,"input",[["class","form-control"],["placeholder","Vehicle Code"],["readonly",""],["type","text"]],[[8,"value",0]],null,null,null,null)),(l()(),u["\u0275eld"](56,0,null,0,5,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](57,0,null,null,1,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle Image"])),(l()(),u["\u0275eld"](59,0,null,null,2,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](60,0,null,null,1,"div",[["class","assignImage"]],null,null,null,null,null)),(l()(),u["\u0275eld"](61,0,null,null,0,"img",[["alt",""],["class","img-thumbnail"]],[[8,"src",4]],null,null,null,null)),(l()(),u["\u0275eld"](62,0,null,0,6,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](63,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle Detail"])),(l()(),u["\u0275eld"](65,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](67,0,null,null,1,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](68,0,null,null,0,"input",[["class","form-control"],["placeholder","Vehicle Detail"],["readonly",""],["type","text"]],[[8,"value",0]],null,null,null,null)),(l()(),u["\u0275eld"](69,0,null,0,43,"nb-tab",[["tabTitle","Specification"]],[[2,"disabled",null],[2,"content-active",null]],null,null,m.dc,m.hb)),u["\u0275did"](70,49152,[[1,4]],0,p.Nd,[],{tabTitle:[0,"tabTitle"]},null),(l()(),u["\u0275eld"](71,0,null,0,11,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](72,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Note"])),(l()(),u["\u0275eld"](74,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](76,0,null,null,6,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](77,0,null,null,5,"input",[["class","form-control"],["formControlName","note"],["placeholder","Note"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,e){var t=!0;return"input"===n&&(t=!1!==u["\u0275nov"](l,78)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,78).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,78)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,78)._compositionEnd(e.target.value)&&t),t}),null,null)),u["\u0275did"](78,16384,null,0,r.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,r.COMPOSITION_BUFFER_MODE]],null,null),u["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,(function(l){return[l]}),[r.DefaultValueAccessor]),u["\u0275did"](80,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),u["\u0275did"](82,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),u["\u0275eld"](83,0,null,0,14,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](84,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Attachments "])),(l()(),u["\u0275eld"](86,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](88,0,null,null,9,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](89,0,null,null,5,"input",[["class","form-control"],["formControlName","attachments"],["id","attachments"],["type","hidden"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,e){var t=!0;return"input"===n&&(t=!1!==u["\u0275nov"](l,90)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,90).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,90)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,90)._compositionEnd(e.target.value)&&t),t}),null,null)),u["\u0275did"](90,16384,null,0,r.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,r.COMPOSITION_BUFFER_MODE]],null,null),u["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,(function(l){return[l]}),[r.DefaultValueAccessor]),u["\u0275did"](92,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),u["\u0275did"](94,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),u["\u0275eld"](95,0,[["attachdoc",1]],null,0,"input",[["id","attachdoc"],["multiple",""],["type","file"]],null,[[null,"change"]],(function(l,n,e){var u=!0;return"change"===n&&(u=!1!==l.component.fileAdded(e)&&u),u}),null,null)),(l()(),u["\u0275eld"](96,0,null,null,1,"button",[["class","btn btn-primary float-right"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.uploadBills()&&u),u}),null,null)),(l()(),u["\u0275ted"](-1,null,["Upload"])),(l()(),u["\u0275eld"](98,0,null,0,14,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](99,0,null,null,3,"label",[["class","col-sm-3 col-form-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Images "])),(l()(),u["\u0275eld"](101,0,null,null,1,"span",[["class","star"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["*"])),(l()(),u["\u0275eld"](103,0,null,null,9,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](104,0,null,null,5,"input",[["class","form-control"],["formControlName","images"],["id","images"],["type","hidden"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,e){var t=!0;return"input"===n&&(t=!1!==u["\u0275nov"](l,105)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,105).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,105)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,105)._compositionEnd(e.target.value)&&t),t}),null,null)),u["\u0275did"](105,16384,null,0,r.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,r.COMPOSITION_BUFFER_MODE]],null,null),u["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,(function(l){return[l]}),[r.DefaultValueAccessor]),u["\u0275did"](107,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),u["\u0275did"](109,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),u["\u0275eld"](110,0,[["attachimages",1]],null,0,"input",[["id","attachImages"],["multiple",""],["type","file"]],null,[[null,"change"]],(function(l,n,e){var u=!0;return"change"===n&&(u=!1!==l.component.fileAdded(e)&&u),u}),null,null)),(l()(),u["\u0275eld"](111,0,null,null,1,"button",[["class","btn btn-primary float-right"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.uploadImages()&&u),u}),null,null)),(l()(),u["\u0275ted"](-1,null,["Upload Image"])),(l()(),u["\u0275eld"](113,0,null,null,3,"div",[["class","row no-gutters mt-3"]],null,null,null,null,null)),(l()(),u["\u0275eld"](114,0,null,null,2,"div",[["class","col-12 pr-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](115,0,null,null,1,"button",[["class","btn btn-primary float-right"],["type","submit"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.addExpense()&&u),u}),null,null)),(l()(),u["\u0275ted"](-1,null,["Submit"]))],(function(l,n){var e=n.component;l(n,3,0,e.vehicleExpenseForm),l(n,11,0,"Identification"),l(n,20,0,e.vehicleTypesData,e.keyword,"Enter the Vehicle Type",u["\u0275nov"](n,26),u["\u0275nov"](n,27)),l(n,23,0,"vehicle_type"),l(n,36,0,e.vehicleNamesData,e.keyword,"Enter the Vehicle Name",u["\u0275nov"](n,42),u["\u0275nov"](n,43)),l(n,39,0,"vehicle"),l(n,70,0,"Specification"),l(n,80,0,"note"),l(n,92,0,"attachments"),l(n,107,0,"images")}),(function(l,n){var e=n.component;l(n,1,0,u["\u0275nov"](n,5).ngClassUntouched,u["\u0275nov"](n,5).ngClassTouched,u["\u0275nov"](n,5).ngClassPristine,u["\u0275nov"](n,5).ngClassDirty,u["\u0275nov"](n,5).ngClassValid,u["\u0275nov"](n,5).ngClassInvalid,u["\u0275nov"](n,5).ngClassPending),l(n,7,0,u["\u0275nov"](n,8).fullWidthValue),l(n,10,0,u["\u0275nov"](n,11).disabled,u["\u0275nov"](n,11).activeValue),l(n,19,0,u["\u0275nov"](n,25).ngClassUntouched,u["\u0275nov"](n,25).ngClassTouched,u["\u0275nov"](n,25).ngClassPristine,u["\u0275nov"](n,25).ngClassDirty,u["\u0275nov"](n,25).ngClassValid,u["\u0275nov"](n,25).ngClassInvalid,u["\u0275nov"](n,25).ngClassPending),l(n,35,0,u["\u0275nov"](n,41).ngClassUntouched,u["\u0275nov"](n,41).ngClassTouched,u["\u0275nov"](n,41).ngClassPristine,u["\u0275nov"](n,41).ngClassDirty,u["\u0275nov"](n,41).ngClassValid,u["\u0275nov"](n,41).ngClassInvalid,u["\u0275nov"](n,41).ngClassPending),l(n,50,0,u["\u0275inlineInterpolate"](1,"",e.vehicleRegNo,"")),l(n,55,0,u["\u0275inlineInterpolate"](1,"",e.vehicleCode,"")),l(n,61,0,e.vehicleImage),l(n,68,0,u["\u0275inlineInterpolate"](1,"",e.vehicleDetail,"")),l(n,69,0,u["\u0275nov"](n,70).disabled,u["\u0275nov"](n,70).activeValue),l(n,77,0,u["\u0275nov"](n,82).ngClassUntouched,u["\u0275nov"](n,82).ngClassTouched,u["\u0275nov"](n,82).ngClassPristine,u["\u0275nov"](n,82).ngClassDirty,u["\u0275nov"](n,82).ngClassValid,u["\u0275nov"](n,82).ngClassInvalid,u["\u0275nov"](n,82).ngClassPending),l(n,89,0,u["\u0275nov"](n,94).ngClassUntouched,u["\u0275nov"](n,94).ngClassTouched,u["\u0275nov"](n,94).ngClassPristine,u["\u0275nov"](n,94).ngClassDirty,u["\u0275nov"](n,94).ngClassValid,u["\u0275nov"](n,94).ngClassInvalid,u["\u0275nov"](n,94).ngClassPending),l(n,104,0,u["\u0275nov"](n,109).ngClassUntouched,u["\u0275nov"](n,109).ngClassTouched,u["\u0275nov"](n,109).ngClassPristine,u["\u0275nov"](n,109).ngClassDirty,u["\u0275nov"](n,109).ngClassValid,u["\u0275nov"](n,109).ngClassInvalid,u["\u0275nov"](n,109).ngClassPending)}))}var N=u["\u0275ccf"]("ngx-add-notes",b,(function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"ngx-add-notes",[],null,null,null,F,_)),u["\u0275did"](1,114688,null,0,b,[h.a,f.a,r.FormBuilder,a.a,a.l],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),E=e("SVse"),k=e("QQfA"),M=e("IP0z"),I=e("cpTs"),P=function l(){_classCallCheck(this,l)},S=e("5KUd"),x=e("zMNK"),w=e("/HVE"),A=e("hOhj");e.d(n,"NotesModuleNgFactory",(function(){return R}));var R=u["\u0275cmf"](t,[],(function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,d,N,m.b,m.c,m.g,m.e,m.f,m.a,m.d,m.i]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,E.NgLocalization,E.NgLocaleLocalization,[u.LOCALE_ID,[2,E["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,r["\u0275angular_packages_forms_forms_o"],r["\u0275angular_packages_forms_forms_o"],[]),u["\u0275mpd"](4608,p.hd,p.hd,[a.l]),u["\u0275mpd"](4608,k.d,k.d,[k.i,k.e,u.ComponentFactoryResolver,k.h,k.f,u.Injector,u.NgZone,E.DOCUMENT,M.b,[2,E.Location]]),u["\u0275mpd"](5120,k.j,k.k,[k.d]),u["\u0275mpd"](4608,p.Mb,p.Hc,[u.LOCALE_ID]),u["\u0275mpd"](4608,E.DatePipe,E.DatePipe,[u.LOCALE_ID]),u["\u0275mpd"](4608,p.Z,p.Z,[p.Mb]),u["\u0275mpd"](4608,I.d,I.d,[]),u["\u0275mpd"](4608,r.FormBuilder,r.FormBuilder,[]),u["\u0275mpd"](1073742336,a.p,a.p,[[2,a.u],[2,a.l]]),u["\u0275mpd"](1073742336,P,P,[]),u["\u0275mpd"](1073742336,E.CommonModule,E.CommonModule,[]),u["\u0275mpd"](1073742336,S.a,S.a,[]),u["\u0275mpd"](1073742336,r["\u0275angular_packages_forms_forms_d"],r["\u0275angular_packages_forms_forms_d"],[]),u["\u0275mpd"](1073742336,r.FormsModule,r.FormsModule,[]),u["\u0275mpd"](1073742336,p.Je,p.Je,[]),u["\u0275mpd"](1073742336,p.lc,p.lc,[p.kc]),u["\u0275mpd"](1073742336,p.rb,p.rb,[]),u["\u0275mpd"](1073742336,p.wc,p.wc,[]),u["\u0275mpd"](1073742336,p.K,p.K,[]),u["\u0275mpd"](1073742336,p.Rd,p.Rd,[]),u["\u0275mpd"](1073742336,M.a,M.a,[]),u["\u0275mpd"](1073742336,x.f,x.f,[]),u["\u0275mpd"](1073742336,w.b,w.b,[]),u["\u0275mpd"](1073742336,A.b,A.b,[]),u["\u0275mpd"](1073742336,k.g,k.g,[]),u["\u0275mpd"](1073742336,p.tb,p.tb,[]),u["\u0275mpd"](1073742336,p.sb,p.sb,[]),u["\u0275mpd"](1073742336,p.Oc,p.Oc,[]),u["\u0275mpd"](1073742336,p.Q,p.Q,[]),u["\u0275mpd"](1073742336,p.W,p.W,[]),u["\u0275mpd"](1073742336,p.M,p.M,[]),u["\u0275mpd"](1073742336,p.X,p.X,[]),u["\u0275mpd"](1073742336,p.hb,p.hb,[]),u["\u0275mpd"](1073742336,p.Qb,p.Qb,[]),u["\u0275mpd"](1073742336,v.c,v.c,[]),u["\u0275mpd"](1073742336,I.c,I.c,[]),u["\u0275mpd"](1073742336,r.ReactiveFormsModule,r.ReactiveFormsModule,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,a.j,(function(){return[[{path:"",component:i,children:[{path:"add-notes",component:b}]}]]}),[])])}))},I2ZF:function(l,n){for(var e=[],u=0;u<256;++u)e[u]=(u+256).toString(16).substr(1);l.exports=function(l,n){var u=n||0;return[e[l[u++]],e[l[u++]],e[l[u++]],e[l[u++]],"-",e[l[u++]],e[l[u++]],"-",e[l[u++]],e[l[u++]],"-",e[l[u++]],e[l[u++]],"-",e[l[u++]],e[l[u++]],e[l[u++]],e[l[u++]],e[l[u++]],e[l[u++]]].join("")}},xDdU:function(l,n,e){var u,t,o=e("4fRq"),a=e("I2ZF"),i=0,s=0;l.exports=function(l,n,e){var c=n&&e||0,d=n||[],r=(l=l||{}).node||u,m=void 0!==l.clockseq?l.clockseq:t;if(null==r||null==m){var p=o();null==r&&(r=u=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==m&&(m=t=16383&(p[6]<<8|p[7]))}var g=void 0!==l.msecs?l.msecs:(new Date).getTime(),v=void 0!==l.nsecs?l.nsecs:s+1,h=g-i+(v-s)/1e4;if(h<0&&void 0===l.clockseq&&(m=m+1&16383),(h<0||g>i)&&void 0===l.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");i=g,s=v,t=m;var f=(1e4*(268435455&(g+=122192928e5))+v)%4294967296;d[c++]=f>>>24&255,d[c++]=f>>>16&255,d[c++]=f>>>8&255,d[c++]=255&f;var C=g/4294967296*1e4&268435455;d[c++]=C>>>8&255,d[c++]=255&C,d[c++]=C>>>24&15|16,d[c++]=C>>>16&255,d[c++]=m>>>8|128,d[c++]=255&m;for(var b=0;b<6;++b)d[c+b]=r[b];return n||a(d)}},xk4V:function(l,n,e){var u=e("4fRq"),t=e("I2ZF");l.exports=function(l,n,e){var o=n&&e||0;"string"==typeof l&&(n="binary"===l?new Array(16):null,l=null);var a=(l=l||{}).random||(l.rng||u)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,n)for(var i=0;i<16;++i)n[o+i]=a[i];return n||t(a)}}}]);