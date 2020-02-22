import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { CommonModule } from '@angular/common';  
import { VehicleDetailSComponent } from './vehicle-service/vehicle-detail/vehicle-details-s.component';
import {AssignedVehicleComponent} from './vehicles/assigned-vehicle/assigned-vehicle.component';




@NgModule({
  imports: [
    CommonModule
  ],
  exports: [DailogBoxComponent, VehicleDetailSComponent, AssignedVehicleComponent],
  declarations: [
    // JwPaginationComponent,
    DailogBoxComponent,
    VehicleDetailSComponent,
    AssignedVehicleComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CustomCommonModule {
}
