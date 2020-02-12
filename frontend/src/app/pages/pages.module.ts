import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { VehicleService } from './vehicles/vehicles.service';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    // DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    JwPaginationComponent,
    // DailogBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    VehicleService
  ],
})
export class PagesModule {
}
