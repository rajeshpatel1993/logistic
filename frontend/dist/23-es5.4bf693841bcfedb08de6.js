function _defineProperties(l,n){for(var e=0;e<n.length;e++){var u=n[e];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(l,u.key,u)}}function _createClass(l,n,e){return n&&_defineProperties(l.prototype,n),e&&_defineProperties(l,e),l}function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{HO5y:function(l,n,e){"use strict";e.r(n);var u=e("8Y7J"),t=function l(){_classCallCheck(this,l)},a=e("pMnS"),i=e("iInd"),c=function(){function l(){_classCallCheck(this,l)}return _createClass(l,[{key:"ngOnInit",value:function(){}}]),l}(),o=u["\u0275crt"]({encapsulation:2,styles:[],data:{}});function s(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),u["\u0275did"](1,212992,null,0,i.q,[i.b,u.ViewContainerRef,u.ComponentFactoryResolver,[8,null],u.ChangeDetectorRef],null,null)],(function(l,n){l(n,1,0)}),null)}var r,d=u["\u0275ccf"]("ngx-contact-us-component",c,(function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"ngx-contact-us-component",[],null,null,null,s,o)),u["\u0275did"](1,114688,null,0,c,[],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),g=e("SVse"),p=e("jXVt"),m=e("tKwJ"),f=e("AytR"),h=e("IheW"),v=((r=function(){function l(n){_classCallCheck(this,l),this.http=n,this.baseUrl=f.a.baseUrl}return _createClass(l,[{key:"loadContact",value:function(l){return this.http.get(this.baseUrl+"/employees/emp_list?page="+l)}},{key:"getContactDetail",value:function(l){return this.http.get(this.baseUrl+"/employees/"+l)}}]),l}()).ngInjectableDef=u["\u0275\u0275defineInjectable"]({factory:function(){return new r(u["\u0275\u0275inject"](h.c))},token:r,providedIn:"root"}),r),C=function(){function l(n,e,u){_classCallCheck(this,l),this.contactServices=n,this.router=e,this.activeRoute=u,this.vehicleTypes=[],this.contactList=[],this.pager={},this.showNoRecord=!1,this.pageOfItems=[],this.filterQueryString=""}return _createClass(l,[{key:"ngOnInit",value:function(){var l=this;this.activeRoute.queryParams.subscribe((function(n){l.filterQueryString.trim(),l.loadEmployee(n.page)}))}},{key:"loadEmployee",value:function(l){var n=this,e=l||1;this.contactServices.loadContact(e).subscribe((function(l){n.contactList=l.data,n.contactList.length>0?(n.pageOfItems=l.data,n.pager=l.page,n.showNoRecord=!1,n.pager.totalPages<e&&n.router.navigateByUrl("/pages/contacts/list?page="+(e-1))):(e>1&&n.router.navigateByUrl("/pages/contacts/list?page="+(e-1)),n.showNoRecord=!0)}),(function(l){}))}}]),l}(),b=u["\u0275crt"]({encapsulation:0,styles:[[".AssignVehicle[_ngcontent-%COMP%]   .ng-autocomplete[_ngcontent-%COMP%]{width:auto}.AssignVehicle[_ngcontent-%COMP%]   .formbg-light[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.07);padding:1rem .25rem;margin-top:12px}.AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:.8rem}.AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font-size:14px;background-color:#ebebeb;border-radius:2px;display:inline-block;padding:3px 5px;margin-right:5px;font-weight:400}.AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:1rem .75rem;white-space:nowrap}.AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]{background-color:#fff}.AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.03)}.AssignVehicle[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{background-color:#ebebeb}.AssignVehicle[_ngcontent-%COMP%]   .VehicleDriver[_ngcontent-%COMP%]{width:100%;float:left}.AssignVehicle[_ngcontent-%COMP%]   .VehicleDriver_image[_ngcontent-%COMP%]{width:60px;float:left;margin-right:5px}.AssignVehicle[_ngcontent-%COMP%]   .VehicleDriver_image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.AssignVehicle[_ngcontent-%COMP%]   .VehicleDriver_name[_ngcontent-%COMP%]{width:calc(100%- 65px);float:left}.AssignVehicle[_ngcontent-%COMP%]   .VehicleDriver_name[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-weight:400}"]],data:{}});function _(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,2).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](2,671744,null,0,i.o,[i.l,i.a,g.LocationStrategy],{routerLink:[0,"routerLink"]},null),(l()(),u["\u0275ted"](3,null,[" "," "]))],(function(l,n){l(n,2,0,u["\u0275inlineInterpolate"](1,"pages/vehicles/edit-vehicle/",n.context.$implicit.vehicle,""))}),(function(l,n){l(n,1,0,u["\u0275nov"](n,2).target,u["\u0275nov"](n,2).href),l(n,3,0,n.context.$implicit.vehicledata.name)}))}function y(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,19,"tr",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,6,"td",[],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,5,"div",[["class","VehicleDriver"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,1,"div",[["class","VehicleDriver_image"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,0,"img",[["alt","driver"]],[[8,"src",4]],null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,2,"div",[["class","VehicleDriver_name"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),u["\u0275ted"](7,null,[""," "," ",""])),(l()(),u["\u0275eld"](8,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),u["\u0275eld"](9,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),u["\u0275ted"](10,null,["",""])),(l()(),u["\u0275ted"](11,null,[" ",""])),(l()(),u["\u0275eld"](12,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u["\u0275ted"](13,null,["",""])),(l()(),u["\u0275eld"](14,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u["\u0275ted"](15,null,["",""])),(l()(),u["\u0275eld"](16,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),u["\u0275eld"](17,0,null,null,2,"ul",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,_)),u["\u0275did"](19,278528,null,0,g.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,19,0,n.context.$implicit.assignVehicleData)}),(function(l,n){l(n,4,0,n.context.$implicit.empImage),l(n,7,0,n.context.$implicit.firstName,n.context.$implicit.middleName,n.context.$implicit.lastName),l(n,10,0,n.context.$implicit.jobTitleData.jobTitle),l(n,11,0,n.context.$implicit.workLocationData.workLocation),l(n,13,0,n.context.$implicit.employeeCode),l(n,15,0,n.context.$implicit.primaryContact)}))}function P(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,8,"li",[["class","page-item number-item"]],null,null,null,null,null)),u["\u0275prd"](512,null,g["\u0275NgClassImpl"],g["\u0275NgClassR2Impl"],[u.IterableDiffers,u.KeyValueDiffers,u.ElementRef,u.Renderer2]),u["\u0275did"](2,278528,null,0,g.NgClass,[g["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),u["\u0275pod"](3,{active:0}),(l()(),u["\u0275eld"](4,0,null,null,4,"a",[["class","page-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,5).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](5,671744,null,0,i.o,[i.l,i.a,g.LocationStrategy],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u["\u0275pod"](6,{page:0}),u["\u0275pad"](7,1),(l()(),u["\u0275ted"](8,null,["",""]))],(function(l,n){var e=l(n,3,0,n.component.pager.currentPage===n.context.$implicit);l(n,2,0,"page-item number-item",e);var u=l(n,6,0,n.context.$implicit),t=l(n,7,0,"/pages/contacts/contact-list");l(n,5,0,u,t)}),(function(l,n){l(n,4,0,u["\u0275nov"](n,5).target,u["\u0275nov"](n,5).href),l(n,8,0,n.context.$implicit)}))}function k(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,38,"ul",[["class","pagination justify-content-center"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,8,"li",[["class","page-item first-item"]],null,null,null,null,null)),u["\u0275prd"](512,null,g["\u0275NgClassImpl"],g["\u0275NgClassR2Impl"],[u.IterableDiffers,u.KeyValueDiffers,u.ElementRef,u.Renderer2]),u["\u0275did"](3,278528,null,0,g.NgClass,[g["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),u["\u0275pod"](4,{disabled:0}),(l()(),u["\u0275eld"](5,0,null,null,4,"a",[["class","page-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,6).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](6,671744,null,0,i.o,[i.l,i.a,g.LocationStrategy],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u["\u0275pod"](7,{page:0}),u["\u0275pad"](8,1),(l()(),u["\u0275eld"](9,0,null,null,0,"i",[["class","fas fa-angle-double-left"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,8,"li",[["class","page-item previous-item"]],null,null,null,null,null)),u["\u0275prd"](512,null,g["\u0275NgClassImpl"],g["\u0275NgClassR2Impl"],[u.IterableDiffers,u.KeyValueDiffers,u.ElementRef,u.Renderer2]),u["\u0275did"](12,278528,null,0,g.NgClass,[g["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),u["\u0275pod"](13,{disabled:0}),(l()(),u["\u0275eld"](14,0,null,null,4,"a",[["class","page-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,15).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](15,671744,null,0,i.o,[i.l,i.a,g.LocationStrategy],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u["\u0275pod"](16,{page:0}),u["\u0275pad"](17,1),(l()(),u["\u0275eld"](18,0,null,null,0,"i",[["class","fas fa-angle-left"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,P)),u["\u0275did"](20,278528,null,0,g.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275eld"](21,0,null,null,8,"li",[["class","page-item next-item"]],null,null,null,null,null)),u["\u0275prd"](512,null,g["\u0275NgClassImpl"],g["\u0275NgClassR2Impl"],[u.IterableDiffers,u.KeyValueDiffers,u.ElementRef,u.Renderer2]),u["\u0275did"](23,278528,null,0,g.NgClass,[g["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),u["\u0275pod"](24,{disabled:0}),(l()(),u["\u0275eld"](25,0,null,null,4,"a",[["class","page-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,26).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](26,671744,null,0,i.o,[i.l,i.a,g.LocationStrategy],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u["\u0275pod"](27,{page:0}),u["\u0275pad"](28,1),(l()(),u["\u0275eld"](29,0,null,null,0,"i",[["class","fas fa-angle-right"]],null,null,null,null,null)),(l()(),u["\u0275eld"](30,0,null,null,8,"li",[["class","page-item last-item"]],null,null,null,null,null)),u["\u0275prd"](512,null,g["\u0275NgClassImpl"],g["\u0275NgClassR2Impl"],[u.IterableDiffers,u.KeyValueDiffers,u.ElementRef,u.Renderer2]),u["\u0275did"](32,278528,null,0,g.NgClass,[g["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),u["\u0275pod"](33,{disabled:0}),(l()(),u["\u0275eld"](34,0,null,null,4,"a",[["class","page-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,35).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](35,671744,null,0,i.o,[i.l,i.a,g.LocationStrategy],{queryParams:[0,"queryParams"],routerLink:[1,"routerLink"]},null),u["\u0275pod"](36,{page:0}),u["\u0275pad"](37,1),(l()(),u["\u0275eld"](38,0,null,null,0,"i",[["class","fas fa-angle-double-right"]],null,null,null,null,null))],(function(l,n){var e=n.component,u=l(n,4,0,1===e.pager.currentPage);l(n,3,0,"page-item first-item",u);var t=l(n,7,0,1),a=l(n,8,0,"/pages/contacts/contact-list");l(n,6,0,t,a);var i=l(n,13,0,1===e.pager.currentPage);l(n,12,0,"page-item previous-item",i);var c=l(n,16,0,e.pager.currentPage-1),o=l(n,17,0,"/pages/contacts/contact-list");l(n,15,0,c,o),l(n,20,0,e.pager.pages);var s=l(n,24,0,e.pager.currentPage===e.pager.totalPages);l(n,23,0,"page-item next-item",s);var r=l(n,27,0,e.pager.currentPage+1),d=l(n,28,0,"/pages/contacts/contact-list");l(n,26,0,r,d);var g=l(n,33,0,e.pager.currentPage===e.pager.totalPages);l(n,32,0,"page-item last-item",g);var p=l(n,36,0,e.pager.totalPages),m=l(n,37,0,"/pages/contacts/contact-list");l(n,35,0,p,m)}),(function(l,n){l(n,5,0,u["\u0275nov"](n,6).target,u["\u0275nov"](n,6).href),l(n,14,0,u["\u0275nov"](n,15).target,u["\u0275nov"](n,15).href),l(n,25,0,u["\u0275nov"](n,26).target,u["\u0275nov"](n,26).href),l(n,34,0,u["\u0275nov"](n,35).target,u["\u0275nov"](n,35).href)}))}function O(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,21,"nb-layout-column",[["class","p-0"]],[[2,"left",null],[2,"start",null]],null,null,p.Kb,p.O)),u["\u0275did"](1,49152,null,0,m.qc,[],null,null),(l()(),u["\u0275eld"](2,0,null,0,16,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,15,"table",[["class","table table-hover mt-3"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,11,"thead",[],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Name"])),(l()(),u["\u0275eld"](8,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Designation & work location"])),(l()(),u["\u0275eld"](10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Emp code"])),(l()(),u["\u0275eld"](12,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Phone number"])),(l()(),u["\u0275eld"](14,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Vehicle assigned"])),(l()(),u["\u0275eld"](16,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,y)),u["\u0275did"](18,278528,null,0,g.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275eld"](19,0,null,0,2,"div",[["class","card-footer pb-0 pt-3 pb-3"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,k)),u["\u0275did"](21,16384,null,0,g.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,18,0,e.contactList),l(n,21,0,e.pager.pages&&e.pager.pages.length)}),(function(l,n){l(n,0,0,u["\u0275nov"](n,1).leftValue,u["\u0275nov"](n,1).startValue)}))}function w(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,1,"h5",[["class","text-center text-danger p-4"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" No records Found"]))],null,null)}function M(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,12,"div",[["class","AssignVehicle"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,11,"nb-card",[],[[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null]],null,null,p.Bb,p.F)),u["\u0275did"](2,49152,null,0,m.nb,[],null,null),(l()(),u["\u0275eld"](3,0,null,1,7,"nb-card-body",[],null,null,null,p.Ab,p.E)),u["\u0275did"](4,49152,null,0,m.mb,[],null,null),(l()(),u["\u0275eld"](5,0,null,0,3,"div",[["class","row no-gutters"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,1,"h4",[["class","pb-3"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Contact List"])),(l()(),u["\u0275and"](16777216,null,0,1,null,O)),u["\u0275did"](10,16384,null,0,g.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,2,1,null,w)),u["\u0275did"](12,16384,null,0,g.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,10,0,!e.showNoRecord),l(n,12,0,e.showNoRecord)}),(function(l,n){l(n,1,1,[u["\u0275nov"](n,2).tiny,u["\u0275nov"](n,2).small,u["\u0275nov"](n,2).medium,u["\u0275nov"](n,2).large,u["\u0275nov"](n,2).giant,u["\u0275nov"](n,2).primary,u["\u0275nov"](n,2).info,u["\u0275nov"](n,2).success,u["\u0275nov"](n,2).warning,u["\u0275nov"](n,2).danger,u["\u0275nov"](n,2).hasAccent,u["\u0275nov"](n,2).primaryAccent,u["\u0275nov"](n,2).infoAccent,u["\u0275nov"](n,2).successAccent,u["\u0275nov"](n,2).warningAccent,u["\u0275nov"](n,2).dangerAccent])}))}var D=u["\u0275ccf"]("ngx-contact-list",C,(function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"ngx-contact-list",[],null,null,null,M,b)),u["\u0275did"](1,114688,null,0,C,[v,i.l,i.a],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),I=function(){function l(n,e){_classCallCheck(this,l),this.contactService=n,this.activeRoute=e,this.showEmpData=!1}return _createClass(l,[{key:"ngOnInit",value:function(){this.employeeId=this.activeRoute.snapshot.params.id,this.loadContactDetail(this.employeeId)}},{key:"loadContactDetail",value:function(l){var n=this;this.empDataSubscription=this.contactService.getContactDetail(l).subscribe((function(l){n.empData=l.data,n.showEmpData=!0}),(function(l){}))}}]),l}(),N=u["\u0275crt"]({encapsulation:0,styles:[[".ViewContact[_ngcontent-%COMP%]{width:100%;height:100%;display:flex}.ViewContact[_ngcontent-%COMP%]   .contactSidebar[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 200px);padding:20px 0 0}.ViewContact[_ngcontent-%COMP%]   .contactSidebar[_ngcontent-%COMP%]   .contactImage[_ngcontent-%COMP%]{width:150px;height:150px;border-radius:150px;overflow:hidden;margin-bottom:20px}.ViewContact[_ngcontent-%COMP%]   .contactSidebar[_ngcontent-%COMP%]   .contactImage[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.ViewContact[_ngcontent-%COMP%]   .contactDetail[_ngcontent-%COMP%]{width:100%;height:100%;display:block;background-color:#fff;padding:20px}.ViewContact[_ngcontent-%COMP%]   .contactDetail[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:18px;font-weight:700;padding:5px 15px}"]],data:{}});function V(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,37,"div",[["class","row no-gutters"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,12,"div",[["class","col-12 col-sm-4 col-lg-3"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,11,"div",[["class","contactSidebar"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,10,"div",[["class","row no-gutters"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,1,"div",[["class","contactImage"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,6,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](8,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](9,null,[""," "," ",""])),(l()(),u["\u0275eld"](10,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),u["\u0275ted"](11,null,["",""])),(l()(),u["\u0275eld"](12,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),u["\u0275ted"](13,null,["",""])),(l()(),u["\u0275eld"](14,0,null,null,23,"div",[["class","col-12 col-sm-8 col-lg-9"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,22,"div",[["class","contactDetail"]],null,null,null,null,null)),(l()(),u["\u0275eld"](16,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](17,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,1,"h4",[["class","pb-5"]],null,null,null,null,null)),(l()(),u["\u0275ted"](19,null,[""," "," "," Contact Details"])),(l()(),u["\u0275eld"](20,0,null,null,5,"div",[["class","row mb-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](21,0,null,null,1,"label",[["class","col-12 col-sm-3 col-lg-2"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Address:"])),(l()(),u["\u0275eld"](23,0,null,null,2,"div",[["class","col-12 col-sm-8 col-lg-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](24,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),u["\u0275ted"](25,null,["",""])),(l()(),u["\u0275eld"](26,0,null,null,5,"div",[["class","row mb-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](27,0,null,null,1,"label",[["class","col-12 col-sm-3 col-lg-2"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Contact No:"])),(l()(),u["\u0275eld"](29,0,null,null,2,"div",[["class","col-12 col-sm-8 col-lg-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](30,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),u["\u0275ted"](31,null,["",""])),(l()(),u["\u0275eld"](32,0,null,null,5,"div",[["class","row mb-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](33,0,null,null,1,"label",[["class","col-12 col-sm-3 col-lg-2"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Email:"])),(l()(),u["\u0275eld"](35,0,null,null,2,"div",[["class","col-12 col-sm-8 col-lg-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](36,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),u["\u0275ted"](37,null,["",""]))],null,(function(l,n){var e=n.component;l(n,6,0,null==e.empData?null:e.empData.empImage),l(n,9,0,e.empData.firstName,e.empData.middleName,e.empData.lastName),l(n,11,0,e.empData.role),l(n,13,0,e.empData.passportNo),l(n,19,0,e.empData.firstName,e.empData.middleName,e.empData.lastName),l(n,25,0,e.empData.address),l(n,31,0,e.empData.primaryContact),l(n,37,0,e.empData.emailAddress)}))}function R(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"div",[["class","ViewContact"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,2,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,V)),u["\u0275did"](3,16384,null,0,g.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,3,0,n.component.showEmpData)}),null)}var x=u["\u0275ccf"]("ngx-view-contact",I,(function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"ngx-view-contact",[],null,null,null,R,N)),u["\u0275did"](1,114688,null,0,I,[v,i.a],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),L=e("s7LF"),A=function l(){_classCallCheck(this,l)};e.d(n,"ContactUsModuleNgFactory",(function(){return K}));var K=u["\u0275cmf"](t,[],(function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,d,D,x]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,g.NgLocalization,g.NgLocaleLocalization,[u.LOCALE_ID,[2,g["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,L["\u0275angular_packages_forms_forms_o"],L["\u0275angular_packages_forms_forms_o"],[]),u["\u0275mpd"](4608,m.hd,m.hd,[i.l]),u["\u0275mpd"](1073742336,g.CommonModule,g.CommonModule,[]),u["\u0275mpd"](1073742336,i.p,i.p,[[2,i.u],[2,i.l]]),u["\u0275mpd"](1073742336,A,A,[]),u["\u0275mpd"](1073742336,L["\u0275angular_packages_forms_forms_d"],L["\u0275angular_packages_forms_forms_d"],[]),u["\u0275mpd"](1073742336,L.FormsModule,L.FormsModule,[]),u["\u0275mpd"](1073742336,m.Je,m.Je,[]),u["\u0275mpd"](1073742336,m.wc,m.wc,[]),u["\u0275mpd"](1073742336,m.lc,m.lc,[m.kc]),u["\u0275mpd"](1073742336,m.rb,m.rb,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,i.j,(function(){return[[{path:"",component:c,children:[{path:"contact-list",component:C},{path:"view-contact/:id",component:I}]}]]}),[])])}))}}]);