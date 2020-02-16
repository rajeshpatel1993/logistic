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
import {  VehicleExpenseListComponent } from './vehicle-expense-list/vehicle-expense-list.component';
import { VehicleRoutingModule } from './vehicles-expense-routing.module';
import {  VehicleExpenseService } from './vehicleexpense.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ExpenseComponent } from './expense.component';
import { VehicleExpenseDetailsComponent } from './vehicle-expense-details/vehicle-expense-details.component';
import { CustomCommonModule } from '../custom-common.module';
import { VehicleservService } from '../vehicle-service/vehicleserv.service';
import { EditVehicleExpenseComponent } from './edit-vehicle-expense/edit-vehicle-expense.component';


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
    VehicleExpenseListComponent,
    VehicleExpenseDetailsComponent,
    ExpenseComponent,
    EditVehicleExpenseComponent
    // ,
    // VehicleServiceDetailsComponent
  ],
  providers: [
    VehicleExpenseService,
    VehicleservService
  ],
})
export class VehicleExpenseModule { }
