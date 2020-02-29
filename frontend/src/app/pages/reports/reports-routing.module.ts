import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ReportsListComponent} from './reports-list/reports-list.component'
import { ReportsComponent } from './reports.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
      {
        path: 'list',
        component: ReportsListComponent
      },
      {
        path: 'expense-summary/:vehicleId',
        component: ExpenseSummaryComponent
      }
      // {
      //   path: 'add-expense',
      //   component: VehicleExpenseDetailsComponent
      // }
      // {
      //   path: 'add-vehicle',
      //   component: AddVehicleComponent
      // },
      // {
      //   path: 'edit-vehicle/:id',
      //   component: EditVehicleComponent
      // }
      
    // {
    //   path: 'stepper',
    //   component: StepperComponent,
    // },
    // {
    //   path: 'list',
    //   component: ListComponent,
    // },
    // {
    //   path: 'infinite-list',
    //   component: InfiniteListComponent,
    // },
    // {
    //   path: 'accordion',
    //   component: AccordionComponent,
    // },
    // {
    //   path: 'tabs',
    //   component: TabsComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: 'tab1',
    //       pathMatch: 'full',
    //     },
    //     {
    //       path: 'tab1',
    //       component: Tab1Component,
    //     },
    //     {
    //       path: 'tab2',
    //       component: Tab2Component,
    //     },
    //   ],
    // },
  ],
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {
}
