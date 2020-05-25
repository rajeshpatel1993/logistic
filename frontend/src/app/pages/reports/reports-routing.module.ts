import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ReportsListComponent} from './reports-list/reports-list.component'
import { ReportsComponent } from './reports.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';
import { VehicleReportComponent } from './vehicle-report/vehicle-report.component';
import { AssignVehicleReportsComponent } from './assign-vehicle-reports/assign-vehicle-reports.component';
import { ServiceReportComponent } from './service-report/service-report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { FuelReportComponent } from './fuel-report/fuel-report.component';
import { IssueReportComponent } from './issue-report/issue-report.component';
import { ContactReportComponent } from './contact-report/contact-report.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
      {
        path: 'list',
        component: ReportsListComponent
      },
      {
        path: 'vehicle',
        component: VehicleReportComponent
      },
      {
        path: 'assign-vehicle',
        component: AssignVehicleReportsComponent
      },
      {
        path: 'expense-summary',
        component: ExpenseSummaryComponent
      },
      {
        path: 'vehicle-services',
        component: ServiceReportComponent
      },
      {
        path: 'vehicle-expenses',
        component: ExpenseReportComponent
      },
      {
        path: 'fuel',
        component: FuelReportComponent
      },
      {
        path: 'issue',
        component: IssueReportComponent
      },
      {
        path: 'contact',
        component: ContactReportComponent
      }

  ],
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {
}
