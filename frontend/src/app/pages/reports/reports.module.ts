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
import {  ReportsListComponent } from './reports-list/reports-list.component';
import { VehicleRoutingModule } from './reports-routing.module';
import {  VehicleExpenseService } from '../vehicle-expense/vehicleexpense.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ReportsComponent } from './reports.component';
import { CustomCommonModule } from '../custom-common.module';
import { VehicleservService } from '../vehicle-service/vehicleserv.service';


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
    ReportsListComponent,
    ReportsComponent
    // ,
    // VehicleServiceDetailsComponent
  ],
  providers: [
    VehicleExpenseService,
    VehicleservService
  ],
})
export class ReportsModule { }
