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
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { VehicleReportComponent } from './vehicle-report/vehicle-report.component';
import { ServicetaskbyamountComponent } from './servicetaskbyamount/servicetaskbyamount.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';
import { ExpenseVehicleComponent } from './expense-summary/expense-vehicle/expense-vehicle.component';
import { ExpenseTypesComponent } from './expense-summary/expense-types/expense-types.component';
import { AssignVehicleReportsComponent } from './assign-vehicle-reports/assign-vehicle-reports.component';
import { ServiceReportComponent } from './service-report/service-report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';


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
    ReportsComponent,
    BarChartComponent,
    VehicleReportComponent,
    ServicetaskbyamountComponent,
    ExpenseSummaryComponent,
    ExpenseVehicleComponent,
    ExpenseTypesComponent,
    AssignVehicleReportsComponent,
    ServiceReportComponent,
    ExpenseReportComponent
    // ,
    // VehicleServiceDetailsComponent
  ],
  // providers: [
  //   ReportsService
  // ],
})
export class ReportsModule { }
