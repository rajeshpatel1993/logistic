/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { NbIconLibraries } from '@nebular/theme';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    console.log("test");
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}
