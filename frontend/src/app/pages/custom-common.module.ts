import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { CommonModule } from '@angular/common';  
import { VehicleDetailSComponent } from './vehicle-service/vehicle-detail/vehicle-details-s.component';
import {AssignedVehicleComponent} from './vehicles/assigned-vehicle/assigned-vehicle.component';
import { SingleVehicleComponent } from './vehicles/single-vehicle/single-vehicle.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DailogBoxComponent, VehicleDetailSComponent, AssignedVehicleComponent, SingleVehicleComponent, LoginComponent],
  declarations: [
    // JwPaginationComponent,
    DailogBoxComponent,
    VehicleDetailSComponent,
    AssignedVehicleComponent,
    LoginComponent,
    SingleVehicleComponent    // DailogBoxComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }

  ]
})
export class CustomCommonModule {
}
