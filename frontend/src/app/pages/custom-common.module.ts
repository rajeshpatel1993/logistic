import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { CommonModule } from '@angular/common';  
import { VehicleDetailSComponent } from './vehicle-service/vehicle-detail/vehicle-details-s.component';




@NgModule({
  imports: [
    CommonModule
  ],
  exports: [DailogBoxComponent, VehicleDetailSComponent],
  declarations: [
    // JwPaginationComponent,
    DailogBoxComponent,
    VehicleDetailSComponent,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CustomCommonModule {
}
