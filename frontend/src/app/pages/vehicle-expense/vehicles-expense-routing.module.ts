import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VehicleExpenseListComponent} from './vehicle-expense-list/vehicle-expense-list.component'
import { VehicleExpenseDetailsComponent } from './vehicle-expense-details/vehicle-expense-details.component'
import { ExpenseComponent } from './expense.component';
import { EditVehicleExpenseComponent } from './edit-vehicle-expense/edit-vehicle-expense.component';

const routes: Routes = [{
  path: '',
  component: ExpenseComponent,
  children: [
      {
        path: 'list',
        component: VehicleExpenseListComponent
      },
      {
        path: 'add-expense',
        component: VehicleExpenseDetailsComponent
      },
      {
        path: 'edit-vehicle-expense/:id',
        component: EditVehicleExpenseComponent
      }
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
export class VehicleRoutingModule {
}
