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
import { VehicleComponent } from './vehicles.component';
import { VehicleRoutingModule } from './vehicles-routing.module';
import { ListComponent } from './list/list.component';
import { VehicleService } from './vehicles.service';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
// import { JwPaginationComponent } from 'jw-angular-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import {AssignVehicleComponent} from './assign-vehicle/assign-vehicle.component';
import { AssignVehicleDetailsComponent } from './assign-vehicle-details/assign-vehicle-details.component'
import { CustomCommonModule} from '../custom-common.module';
// import { DailogBoxComponent } from '../dailog-box/dailog-box.component';

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
    VehicleComponent,
    ListComponent,
    AddVehicleComponent,
    // JwPaginationComponent,
    EditVehicleComponent,
    AssignVehicleComponent,
    AssignVehicleDetailsComponent,
    // DailogBoxComponent
  ],
  providers: [
    VehicleService
  ],
})
export class VehicleModule { }
