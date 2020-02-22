import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImgModule } from 'ngx-img';


import {
  NbButtonModule,
  NbCardModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbLayoutModule, NbUserModule,NbTabsetModule,NbDatepickerModule,NbSelectModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import {  ReportsListComponent } from './reports-list/reports-list.component';
import { ReportRoutingModule } from './reports-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ReportsComponent } from './reports.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DataTablesModule } from 'angular-datatables';
import { ReportsService } from './reports.service';
import { CustomCommonModule} from '../custom-common.module';


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
    ReportRoutingModule,
    NbTabsetModule,
    AutocompleteLibModule,
    NgxImgModule.forRoot(),
    NbDatepickerModule,
    CustomCommonModule,
    NbSelectModule,
    NgxDaterangepickerMd.forRoot(),
    DataTablesModule
  ],
  declarations: [
    ReportsListComponent,
    ReportsComponent
    // ,
    // VehicleServiceDetailsComponent
  ],
  // providers: [
  //   ReportsService
  // ],
})
export class ReportsModule { }
