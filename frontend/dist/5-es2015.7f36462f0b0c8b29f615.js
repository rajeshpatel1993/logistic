(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"4fRq":function(n,l){var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var t=new Uint8Array(16);n.exports=function(){return e(t),t}}else{var i=new Array(16);n.exports=function(){for(var n,l=0;l<16;l++)0==(3&l)&&(n=4294967296*Math.random()),i[l]=n>>>((3&l)<<3)&255;return i}}},"4zdW":function(n,l,e){"use strict";var t=e("8Y7J"),i=e("SVse");e("NYqN"),e.d(l,"a",(function(){return o})),e.d(l,"b",(function(){return a}));var o=t["\u0275crt"]({encapsulation:0,styles:[[".dialogBox[_ngcontent-%COMP%]{position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,.5);top:0;left:0;z-index:9999}.dialogBox_wrraper[_ngcontent-%COMP%]{width:400px;height:200px;background-color:#fff;padding:15px;border-radius:15px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.dialogBox_wrraper_common[_ngcontent-%COMP%]{padding:10px}.dialogBox_wrraper_common[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:24px;line-height:30px;font-weight:600;text-align:center;padding:5px 0}.dialogBox_wrraper_common[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font-size:16px;line-height:21px;font-weight:400;text-align:center;padding:10px 0}.dialogBox_wrraper[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]{position:absolute;top:-15px;right:-15px;font-size:24px;color:red;background-color:#fff;opacity:1;border-radius:15px}@media (max-width:575.98px){.dialogBox_wrraper[_ngcontent-%COMP%]{width:300px}}"]],data:{}});function r(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h6",[["class","text-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.msgObj.message)}))}function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h6",[["class","text-success"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.component.msgObj.message)}))}function a(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"div",[["class","dialogBox"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,7,"div",[["class","dialogBox_wrraper"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,1,"a",[["class","close"],["href","javascript:void(0)"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.showDialogF()&&t),t}),null,null)),(n()(),t["\u0275eld"](3,0,null,null,0,"i",[["class","fas fa-times-circle"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,4,"div",[["class","dialogBox_wrraper_common"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,r)),t["\u0275did"](6,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](8,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,6,0,"error"==e.msgObj.type),n(l,8,0,"success"==e.msgObj.type)}),null)}},"8C2B":function(n,l,e){"use strict";e.d(l,"a",(function(){return t})),e("x/PY");class t{constructor(n,l){this.vehicleService=n,this.dialogService=l,this.showPage=!1,this.vehicleData=[]}ngOnInit(){this.loadVehicleDetail(this.vehicleId)}open(n){this.dialogService.open(n,{context:"this is some additional data passed to dialog"})}loadVehicleDetail(n){this.vehicleService.loadVehicle(this.vehicleId).subscribe(n=>{this.vehicleData=n.data[0],this.showPage=!0,console.log("vehdata",this.vehicleData)},n=>{}),console.log(n)}}},Cn9t:function(n,l,e){"use strict";e.d(l,"a",(function(){return r})),e.d(l,"b",(function(){return h}));var t=e("8Y7J"),i=e("cpTs"),o=e("SVse"),r=(e("s7LF"),t["\u0275crt"]({encapsulation:0,styles:['.ngx-img-wrapper[_ngcontent-%COMP%]{display:block;position:relative;cursor:pointer;overflow:hidden;width:100%;max-width:100%;height:400px;padding:5px 10px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:300;line-height:22px;color:#333;background-color:#fff;background-image:none;text-align:center;border:2px solid #e5e5e5;-webkit-transition:border-color .15s linear;transition:border-color .15s linear}.ngx-img-wrapper[_ngcontent-%COMP%]:hover{background-size:30px 30px;background-image:linear-gradient(-45deg,#f6f6f6 25%,transparent 0,transparent 50%,#f6f6f6 0,#f6f6f6 75%,transparent 0,transparent);-webkit-animation:a 2s linear infinite;animation:a 2s linear infinite}.ngx-img-wrapper.has-preview[_ngcontent-%COMP%]   .ngx-img-clear[_ngcontent-%COMP%]{display:block}.ngx-img-wrapper.has-error[_ngcontent-%COMP%]{border-color:#f44336}.ngx-img-wrapper.has-error[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   .ngx-img-error[_ngcontent-%COMP%]{display:block}.ngx-img-wrapper.has-error[_ngcontent-%COMP%]:hover   .ngx-img-errors-container[_ngcontent-%COMP%]{visibility:visible;opacity:1;-webkit-transition-delay:0s;transition-delay:0s}.ngx-img-wrapper.disabled[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{cursor:not-allowed}.ngx-img-wrapper.disabled[_ngcontent-%COMP%]:hover{background-image:none;-webkit-animation:none;animation:none}.ngx-img-wrapper.disabled[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]{opacity:.5;text-decoration:line-through}.ngx-img-wrapper.disabled[_ngcontent-%COMP%]   .ngx-img-infos-message[_ngcontent-%COMP%]{display:none}.ngx-img-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;top:0;right:0;bottom:0;left:0;height:100%;width:100%;opacity:0;cursor:pointer;z-index:3}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-button[_ngcontent-%COMP%]{font-size:.7rem;padding:.6rem 1rem;background:#17a2c4;-webkit-box-shadow:none;box-shadow:none;border-radius:10em;border:0;color:#fff;margin-top:1rem;text-transform:uppercase;display:inline-block;font-weight:400;line-height:1.25;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]{position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   svg.ngx-img-upload[_ngcontent-%COMP%]   .st-1[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   svg.ngx-img-upload[_ngcontent-%COMP%]   .st-2[_ngcontent-%COMP%]{fill:#17a2c4}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0 0}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   div.ngx-img-error[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   p.ngx-img-error[_ngcontent-%COMP%]{color:#f44336;font-weight:700;display:none}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-clear[_ngcontent-%COMP%]{display:block;position:absolute;opacity:0;z-index:4;top:10px;right:10px;background:none;border:2px solid #fff;text-transform:uppercase;font-family:Helvetica,Arial;font-size:11px;padding:4px 8px;font-weight:700;color:#fff;-webkit-transition:all .15s linear;transition:all .15s linear}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-clear[_ngcontent-%COMP%]:hover{background:hsla(0,0%,100%,.2)}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]{display:block;position:absolute;z-index:1;background-color:#fff;padding:5px;width:100%;height:100%;top:0;right:0;bottom:0;left:0;overflow:hidden;text-align:center}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-render[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);position:relative;max-width:100%;max-height:100%;background-color:#fff;-webkit-transition:border-color .15s linear;transition:border-color .15s linear}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-render[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:70px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;color:#777}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-render[_ngcontent-%COMP%]   .ngx-img-extension[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);margin-top:10px;text-transform:uppercase;font-weight:900;letter-spacing:-.03em;font-size:13px;width:42px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]{position:absolute;left:0;top:0;right:0;bottom:0;z-index:2;background:rgba(0,0,0,.7);opacity:0;-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]{position:absolute;top:50%;-webkit-transform:translateY(-40%);transform:translateY(-40%);-webkit-backface-visibility:hidden;backface-visibility:hidden;width:100%;padding:0 20px;-webkit-transition:all .2s ease;transition:all .2s ease}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;margin:0;position:relative;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff;text-align:center;line-height:25px;font-weight:700}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]   p.ngx-img-infos-message[_ngcontent-%COMP%]{margin-top:15px;padding-top:15px;font-size:12px;position:relative;opacity:.5}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]   p.ngx-img-infos-message[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%);background:#fff;width:30px;height:2px}.ngx-img-wrapper[_ngcontent-%COMP%]:hover   .ngx-img-clear[_ngcontent-%COMP%], .ngx-img-wrapper[_ngcontent-%COMP%]:hover   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]{opacity:1}.ngx-img-wrapper[_ngcontent-%COMP%]:hover   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]{margin-top:-5px}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]{height:auto!important}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]:hover{background-image:none;-webkit-animation:none;animation:none}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]{position:relative;padding:0;display:block}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-render[_ngcontent-%COMP%]{display:block;position:relative}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-render[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:relative;-webkit-transform:translate(0);transform:translate(0)}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]{position:relative;opacity:1;background:transparent}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]{position:relative;top:0;-webkit-transform:translate(0);transform:translate(0);padding:5px 90px 5px 0}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;margin:0;position:relative;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#777;text-align:left;line-height:25px}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]   p.ngx-img-filename[_ngcontent-%COMP%]{font-weight:700}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]   p.ngx-img-infos-message[_ngcontent-%COMP%]{margin-top:0;padding-top:0;font-size:11px;position:relative;opacity:1}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]{-webkit-transform:translate(0);transform:translate(0);padding:40px 0}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]   .ngx-img-clear[_ngcontent-%COMP%]{top:auto;bottom:23px;opacity:1;border-color:hsla(0,0%,47%,.7);color:#777}.ngx-img-wrapper.touch-fallback.has-preview[_ngcontent-%COMP%]   .ngx-img-message[_ngcontent-%COMP%]{display:none}.ngx-img-wrapper.touch-fallback[_ngcontent-%COMP%]:hover   .ngx-img-preview[_ngcontent-%COMP%]   .ngx-img-infos[_ngcontent-%COMP%]   .ngx-img-infos-inner[_ngcontent-%COMP%]{margin-top:0}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-loader[_ngcontent-%COMP%]{position:absolute;top:15px;right:15px;display:block;z-index:5}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-loader[_ngcontent-%COMP%]:after{display:block;position:relative;width:20px;height:20px;-webkit-animation:b .6s linear infinite;animation:b .6s linear infinite;border-radius:100%;border-top:1px solid #ccc;border-bottom:1px solid #777;border-left:1px solid #ccc;border-right:1px solid #777;content:""}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-errors-container[_ngcontent-%COMP%]{position:absolute;left:0;top:0;right:0;bottom:0;z-index:2;background:rgba(244,67,54,.8);text-align:left;visibility:hidden;opacity:0;-webkit-transition:visibility 0s linear .15s,opacity .15s linear;transition:visibility 0s linear .15s,opacity .15s linear}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-errors-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding:10px 20px;margin:0;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-errors-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-left:20px;color:#fff;font-weight:700}.ngx-img-wrapper[_ngcontent-%COMP%]   .ngx-img-errors-container.visible[_ngcontent-%COMP%]{visibility:visible;opacity:1;-webkit-transition-delay:0s;transition-delay:0s}.ngx-img-wrapper[_ngcontent-%COMP%] ~ .ngx-img-errors-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding:0;margin:15px 0}.ngx-img-wrapper[_ngcontent-%COMP%] ~ .ngx-img-errors-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-left:20px;color:#f44336;font-weight:700}@-webkit-keyframes a{0%{background-position:0 0}to{background-position:60px 30px}}@keyframes a{0%{background-position:0 0}to{background-position:60px 30px}}@-webkit-keyframes b{0%{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes b{0%{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}'],data:{}}));function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""])),(n()(),t["\u0275eld"](2,0,null,null,1,"button",[["class","ngx-img-button"]],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,["",""]))],null,(function(n,l){var e=l.component;n(l,1,0,e._text.default),n(l,3,0,e._text.button)}))}function a(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"li",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,(function(n,l){n(l,1,0,l.context.$implicit)}))}function c(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"div",[["class","ngx-img-error"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,2,"ul",[],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,a)),t["\u0275did"](3,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){n(l,3,0,l.component.errors)}),null)}function p(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""])),(n()(),t["\u0275and"](16777216,null,null,1,null,c)),t["\u0275did"](3,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](4,0,null,null,1,"button",[["class","ngx-img-button"],["style","margin-top: 0"]],null,null,null,null,null)),(n()(),t["\u0275ted"](5,null,["",""]))],(function(n,l){n(l,3,0,l.component.hasError)}),(function(n,l){var e=l.component;n(l,1,0,e._text._default),n(l,5,0,e._text.try_again)}))}function u(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"div",[["class","ngx-img-message"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,2,":svg:svg",[["class","ngx-img-upload"],["height","60"],["viewBox","0 0 640 640"],["width","60"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,":svg:path",[["class","st-1"],["d","M411.312 372.688l-64-64c-6.247-6.248-16.379-6.248-22.627 0l-64 64c-6.248 6.247-6.248 16.379 0 22.627s16.379 6.248 22.628 0l36.687-36.687v137.372c0 8.837 7.163 16 16 16s16-7.163 16-16v-137.372l36.688 36.687c3.123 3.123 7.217 4.685 11.312 4.685s8.189-1.562 11.312-4.688c6.25-6.247 6.25-16.377 0-22.624z"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,0,":svg:path",[["class","st-2"],["d","M512.2 512h-112.2c-8.837 0-16-7.163-16-16s7.163-16 16-16h112.2c52.824 0 95.8-42.976 95.8-95.8s-42.976-95.8-95.8-95.8c-11.33 0-22.371 1.938-32.817 5.764-6.979 2.555-14.798-0.031-18.876-6.243s-3.343-14.415 1.776-19.803c11.425-12.022 17.717-27.692 17.717-44.118 0-35.29-28.71-64-64-64-20.536 0-39.32 9.492-51.535 26.042-7.374 9.991-11.668 21.692-12.417 33.836-0.419 6.781-5.073 12.558-11.609 14.409-6.539 1.854-13.53-0.629-17.441-6.182-3.52-4.998-7.331-9.814-11.329-14.314-30.367-34.185-73.984-53.791-119.669-53.791-88.224 0-160 71.775-160 160s71.776 160 160 160h80c8.836 0 16 7.163 16 16s-7.164 16-16 16h-80c-105.869 0-192-86.131-192-192s86.131-192 192-192c51.271 0 100.368 20.573 136.315 56.791 2.802-6.217 6.28-12.168 10.402-17.752 18.044-24.445 46.933-39.039 77.283-39.039 52.935 0 96 43.065 96 96 0 11.223-1.949 22.202-5.685 32.532 1.954-0.089 3.917-0.132 5.885-0.132 70.469 0 127.8 57.331 127.8 127.8s-57.331 127.8-127.8 127.8z"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](5,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t["\u0275and"](0,[["withErrorBlock",2]],null,0,null,p))],(function(n,l){n(l,5,0,!l.component.hasError,t["\u0275nov"](l,6))}),null)}function s(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","ngx-img-loader"]],null,null,null,null,null))],null,null)}function d(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","ngx-img-clear"],["type","button"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.reset()&&t),t}),null,null)),(n()(),t["\u0275ted"](1,null,[""," "]))],null,(function(n,l){n(l,1,0,l.component._text.reset)}))}function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"div",[["class","ngx-img-preview"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"span",[["class","ngx-img-render"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[],[[8,"src",4],[8,"alt",0]],null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,5,"div",[["class","ngx-img-infos"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,4,"div",[["class","ngx-img-infos-inner"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,1,"p",[["class","ngx-img-filename"]],null,null,null,null,null)),(n()(),t["\u0275ted"](6,null,["",""])),(n()(),t["\u0275eld"](7,0,null,null,1,"p",[["class","ngx-img-infos-message"]],null,null,null,null,null)),(n()(),t["\u0275ted"](8,null,["",""]))],null,(function(n,l){var e=l.component;n(l,2,0,e.imgSrc,e.alt),n(l,6,0,e.fileName),n(l,8,0,e._text.replace)}))}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,9,"div",[["class","ngx-img-wrapper"]],[[2,"has-preview",null],[2,"has-error",null],[4,"height",null]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,u)),t["\u0275did"](2,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,s)),t["\u0275did"](4,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](5,0,[[1,0],["fileInput",1]],null,0,"input",[["type","file"]],[[8,"accept",0]],[[null,"change"]],(function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.fileChangeListener(e)&&t),t}),null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,d)),t["\u0275did"](7,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](9,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,2,0,!e.hasPreview),n(l,4,0,e.isLoading),n(l,7,0,e.remove&&e.hasPreview),n(l,9,0,e.hasPreview)}),(function(n,l){var e=l.component;n(l,0,0,e.hasPreview,e.hasError,e._config.height),n(l,5,0,e._config.fileType.join(", "))}))}function f(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ngx-img-crop",[],null,[[null,"onCrop"],[null,"onReset"]],(function(n,l,e){var t=!0,i=n.component;return"onCrop"===l&&(t=!1!==i.onSelectEvent(e)&&t),"onReset"===l&&(t=!1!==i.reset()&&t),t}),v,w)),t["\u0275did"](1,245760,null,0,i.b,[i.d,t.ChangeDetectorRef],{config:[0,"config"],imgSrc:[1,"imgSrc"]},{onCrop:"onCrop",onReset:"onReset"})],(function(n,l){var e=l.component;n(l,1,0,e.config,e.imgSrc)}),null)}function h(n){return t["\u0275vid"](2,[t["\u0275qud"](671088640,1,{fileInput:0}),(n()(),t["\u0275eld"](1,0,null,null,5,null,null,null,null,null,null,null)),t["\u0275did"](2,16384,null,0,o.NgSwitch,[],{ngSwitch:[0,"ngSwitch"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](4,278528,null,0,o.NgSwitchCase,[t.ViewContainerRef,t.TemplateRef,o.NgSwitch],{ngSwitchCase:[0,"ngSwitchCase"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](6,278528,null,0,o.NgSwitchCase,[t.ViewContainerRef,t.TemplateRef,o.NgSwitch],{ngSwitchCase:[0,"ngSwitchCase"]},null)],(function(n,l){n(l,2,0,l.component.mode),n(l,4,0,"upload"),n(l,6,0,"crop")}),null)}var w=t["\u0275crt"]({encapsulation:2,styles:['\n    .ngx-img-crop-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;position:relative;cursor:pointer;overflow:hidden;width:100%;max-width:100%;height:400px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:300;line-height:22px;color:#333;background-color:#fff;background-image:none;text-align:center;border:2px solid #e5e5e5;-webkit-box-sizing:content-box;box-sizing:content-box}.ngx-img-crop-wrapper .ngx-img-clear{display:block;position:absolute;opacity:0;z-index:1;top:10px;right:10px;background:none;border:2px solid #fff;text-transform:uppercase;font-family:Helvetica,Arial;font-size:11px;padding:4px 8px;font-weight:700;color:#fff;-webkit-transition:all .15s linear;transition:all .15s linear}.ngx-img-crop-wrapper .ngx-img-clear:hover{background:hsla(0,0%,100%,.2)}.ngx-img-crop-wrapper:hover .ngx-img-clear{opacity:1}.ngx-img-crop-wrapper .ngx-img-crop-col{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px;-webkit-box-sizing:content-box;box-sizing:content-box}.ngx-img-crop-wrapper .ngx-img-crop-col>img{position:relative;max-width:100%;max-height:100%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-canvas,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-crop-box,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-drag-box,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-modal,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-canvas,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-wrap-box{overflow:hidden}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-drag-box{background-color:#fff;opacity:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-modal{background-color:#000;opacity:.5}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-view-box{display:block;height:100%;outline-color:rgba(51,153,255,.75);outline:1px solid #17a2c4;overflow:hidden;width:100%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-center:after,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-center:before{background-color:#eee;content:" ";display:block;position:absolute}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-center:before{height:1px;left:-3px;top:0;width:7px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-center:after{height:7px;left:0;top:-3px;width:1px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-face,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-line,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-face{background-color:#fff;left:0;top:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-line{background-color:#17a2c4}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-line.line-e{cursor:e-resize;right:-3px;top:0;width:5px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-line.line-n{cursor:n-resize;height:5px;left:0;top:-3px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-line.line-w{cursor:w-resize;left:-3px;top:0;width:5px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-line.line-s{bottom:-3px;cursor:s-resize;height:5px;left:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point{background-color:#17a2c4;height:5px;opacity:.75;width:5px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-e{cursor:e-resize;margin-top:-3px;right:-3px;top:50%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-n{cursor:n-resize;left:50%;margin-left:-3px;top:-3px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-w{cursor:w-resize;left:-3px;margin-top:-3px;top:50%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-ne{cursor:ne-resize;right:-3px;top:-3px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-nw{cursor:nw-resize;left:-3px;top:-3px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-sw{bottom:-3px;cursor:sw-resize;left:-3px}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-se{bottom:-3px;cursor:se-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-se{height:5px;opacity:.75;width:5px}}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-point.point-se:before{background-color:#17a2c4;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-invisible{opacity:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-hide{display:block;height:0;position:absolute;width:0}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-hidden{display:none!important}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-move{cursor:move}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-crop{cursor:crosshair}.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-disabled .cropper-drag-box,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-disabled .cropper-face,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-disabled .cropper-line,.ngx-img-crop-wrapper .ngx-img-crop-col .cropper-disabled .cropper-point{cursor:not-allowed}\n  '],data:{}});function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","ngx-img-crop-col"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"img",[],[[8,"id",0],[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,1,0,"ngx-crop-img-"+l.context.index,l.component.imgSrc)}))}function v(n){return t["\u0275vid"](2,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","ngx-img-crop-wrapper"]],[[4,"height",null]],null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"button",[["class","ngx-img-clear"],["type","button"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.reset()&&t),t}),null,null)),(n()(),t["\u0275ted"](2,null,["",""])),(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](4,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){n(l,4,0,l.component._config.crop)}),(function(n,l){var e=l.component;n(l,0,0,e._config.height),n(l,2,0,e._text.reset)}))}},EcEN:function(n,l,e){var t=e("xDdU"),i=e("xk4V"),o=i;o.v1=t,o.v4=i,n.exports=o},HF7W:function(n,l,e){"use strict";var t=e("8Y7J"),i=e("SVse");e("8C2B"),e("x/PY"),e("tKwJ"),e.d(l,"a",(function(){return o})),e.d(l,"b",(function(){return x}));var o=t["\u0275crt"]({encapsulation:0,styles:[[".VehicleDetail[_ngcontent-%COMP%]{width:100%;float:left}.VehicleDetail_image[_ngcontent-%COMP%]{width:80px;float:left;margin-right:5px}.VehicleDetail_name[_ngcontent-%COMP%]{width:calc(100%- 55px);float:left}.VehicleDetail_name[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-weight:400}"]],data:{}});function r(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"nb-card",[["class","popupImage"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"nb-card-body",[],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["alt"," "]],[[8,"src",4]],null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,1,"button",[["class","popupClose"],["nbButton",""]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.context.dialogRef.close()&&t),t}),null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,"i",[["class","fas fa-times-circle"]],null,null,null,null,null))],null,(function(n,l){n(l,2,0,t["\u0275inlineInterpolate"](1,"",l.component.vehicleData.vehicleImage,""))}))}function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-info"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-wrench"]],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,[" ",""]))],null,(function(n,l){n(l,2,0,l.component.vehicleData.vehicleStatuss[0].vehicleStatus)}))}function a(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-success"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-check-circle"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" Active"]))],null,null)}function c(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-warning"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"img",[["alt",""],["src","assets/images/repair.png"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" In-Service"]))],null,null)}function p(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-success"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-file-signature"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" Complaint"]))],null,null)}function u(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-danger"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-car-crash"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" Accident"]))],null,null)}function s(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-danger"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-times-circle"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" Not Working"]))],null,null)}function d(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"li",[["class","text-success"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-check-circle"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" In Active"]))],null,null)}function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,23,"div",[["class","VehicleDetail"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"div",[["class","VehicleDetail_image"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"img",[["nbButton",""],["width","80"]],[[8,"src",4]],[[null,"click"]],(function(n,l,e){var i=!0;return"click"===l&&(i=!1!==n.component.open(t["\u0275nov"](n.parent,0))&&i),i}),null,null)),(n()(),t["\u0275eld"](3,0,null,null,20,"div",[["class","VehicleDetail_name"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,1,"h5",[],null,null,null,null,null)),(n()(),t["\u0275ted"](5,null,["","(",")"])),(n()(),t["\u0275eld"](6,0,null,null,17,"div",[["class","vehicleStatus"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,16,"ul",[],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](9,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,a)),t["\u0275did"](11,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,c)),t["\u0275did"](13,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,p)),t["\u0275did"](15,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,u)),t["\u0275did"](17,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,s)),t["\u0275did"](19,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,d)),t["\u0275did"](21,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](22,0,null,null,1,"li",[],null,null,null,null,null)),(n()(),t["\u0275ted"](23,null,["\xa0"," - ",""]))],(function(n,l){var e=l.component;n(l,9,0,"Working"==e.vehicleData.vehicleStatuss[0].vehicleStatus),n(l,11,0,"Active"==e.vehicleData.vehicleStatuss[0].vehicleStatus),n(l,13,0,"In-Service"==e.vehicleData.vehicleStatuss[0].vehicleStatus),n(l,15,0,"Complaint"==e.vehicleData.vehicleStatuss[0].vehicleStatus),n(l,17,0,"Accident"==e.vehicleData.vehicleStatuss[0].vehicleStatus),n(l,19,0,"Not-Working"==e.vehicleData.vehicleStatuss[0].vehicleStatus),n(l,21,0,"In-Active"==e.vehicleData.vehicleStatuss[0].vehicleStatus)}),(function(n,l){var e=l.component;n(l,2,0,t["\u0275inlineInterpolate"](1,"",e.vehicleData.vehicleImage,"")),n(l,5,0,e.vehicleData.name,e.vehicleData.regNo),n(l,23,0,e.vehicleData.vehicleTypes[0].vehicleType,e.vehicleData.vehicleDetailsArray[0].vehicleDetails)}))}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275and"](0,[["dialog",2]],null,0,null,r)),(n()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,l.component.showPage)}),null)}},I2ZF:function(n,l){for(var e=[],t=0;t<256;++t)e[t]=(t+256).toString(16).substr(1);n.exports=function(n,l){var t=l||0;return[e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],"-",e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]],e[n[t++]]].join("")}},NYqN:function(n,l,e){"use strict";e.d(l,"a",(function(){return i}));var t=e("8Y7J");class i{constructor(){this.dialogBox=!1,this.messageToEmit=new t.EventEmitter,this.showDialog="false"}ngOnInit(){console.log(this.msgObj)}showDialogF(){this.messageToEmit.emit(this.showDialog)}}},xDdU:function(n,l,e){var t,i,o=e("4fRq"),r=e("I2ZF"),g=0,a=0;n.exports=function(n,l,e){var c=l&&e||0,p=l||[],u=(n=n||{}).node||t,s=void 0!==n.clockseq?n.clockseq:i;if(null==u||null==s){var d=o();null==u&&(u=t=[1|d[0],d[1],d[2],d[3],d[4],d[5]]),null==s&&(s=i=16383&(d[6]<<8|d[7]))}var m=void 0!==n.msecs?n.msecs:(new Date).getTime(),x=void 0!==n.nsecs?n.nsecs:a+1,f=m-g+(x-a)/1e4;if(f<0&&void 0===n.clockseq&&(s=s+1&16383),(f<0||m>g)&&void 0===n.nsecs&&(x=0),x>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=m,a=x,i=s;var h=(1e4*(268435455&(m+=122192928e5))+x)%4294967296;p[c++]=h>>>24&255,p[c++]=h>>>16&255,p[c++]=h>>>8&255,p[c++]=255&h;var w=m/4294967296*1e4&268435455;p[c++]=w>>>8&255,p[c++]=255&w,p[c++]=w>>>24&15|16,p[c++]=w>>>16&255,p[c++]=s>>>8|128,p[c++]=255&s;for(var b=0;b<6;++b)p[c+b]=u[b];return l||r(p)}},xk4V:function(n,l,e){var t=e("4fRq"),i=e("I2ZF");n.exports=function(n,l,e){var o=l&&e||0;"string"==typeof n&&(l="binary"===n?new Array(16):null,n=null);var r=(n=n||{}).random||(n.rng||t)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,l)for(var g=0;g<16;++g)l[o+g]=r[g];return l||i(r)}}}]);