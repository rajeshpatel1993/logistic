/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { NbIconLibraries } from '@nebular/theme';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private iconLibraries: NbIconLibraries, private router : Router) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
   // console.log("test");

    let loggedInToken = localStorage.getItem("access_token");
    if(!loggedInToken){
      this.router.navigateByUrl("/auth/login");
    }
    
    // else{
    //   this.router.navigateByUrl("/auth/login");
    // }
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}
