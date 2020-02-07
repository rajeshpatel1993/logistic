import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImgModule } from 'ngx-img';

import {
  NbButtonModule,
  NbCardModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbLayoutModule, NbUserModule,NbTabsetModule,NbDatepickerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { VehicleServiceComponent } from './vehicle-service/vehicle-service.component';
import { VehicleRoutingModule } from './vehicles-service-routing.module';
import { VehicleService } from './vehicles.service';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AssignVehicleDetailsComponent } from './assign-vehicle-details/assign-vehicle-details.component'
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';
import { ServiceComponent } from './service.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbLayoutModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbUserModule,
    VehicleRoutingModule,
    NbTabsetModule,
    AutocompleteLibModule,
    NgxImgModule.forRoot(),
    NbDatepickerModule,
  ],
  declarations: [
    VehicleServiceComponent,
    ServiceComponent,
    JwPaginationComponent,
    AssignVehicleDetailsComponent,
    DailogBoxComponent
  ],
  providers: [
    VehicleService
  ],
})
export class VehicleServiceModule { }
