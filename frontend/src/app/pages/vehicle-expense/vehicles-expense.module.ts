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
// import { JwPaginationComponent } from 'jw-angular-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
// import { VehicleServiceDetailsComponent } from './vehicle-expense-details/vehicle-service-details.component'
// import { DailogBoxComponent } from '../dailog-box/dailog-box.component';
import { ExpenseComponent } from './expense.component';
import { CustomCommonModule } from '../custom-common.module';

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
    ExpenseComponent
    // ,
    // VehicleServiceDetailsComponent
  ],
  providers: [
    VehicleExpenseService
  ],
})
export class VehicleExpenseModule { }
