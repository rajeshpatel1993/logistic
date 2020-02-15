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
import { VehicleservService } from './vehicleserv.service';
// import { JwPaginationComponent } from 'jw-angular-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { VehicleServiceDetailsComponent } from './vehicle-service-details/vehicle-service-details.component'
// import { DailogBoxComponent } from '../dailog-box/dailog-box.component';
import { ServiceComponent } from './service.component';
import { CustomCommonModule } from '../custom-common.module';
import { VehicleDetailSComponent } from './vehicle-detail/vehicle-details-s.component';
import { EditVehicleServiceComponent } from './edit-vehicle-service/edit-vehicle-service.component';

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
    CustomCommonModule
  ],
  declarations: [
    VehicleServiceComponent,
    ServiceComponent,
    // JwPaginationComponent,
    VehicleServiceDetailsComponent,
    VehicleDetailSComponent,
    EditVehicleServiceComponent
  ],
  providers: [
    VehicleservService
  ],
})
export class VehicleServiceModule { }
