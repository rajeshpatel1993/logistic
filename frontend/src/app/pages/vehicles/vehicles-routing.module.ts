import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleComponent } from './vehicles.component';
import { ListComponent } from '../vehicles/list/list.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import {AssignVehicleComponent} from './assign-vehicle/assign-vehicle.component'
import { AssignVehicleDetailsComponent } from './assign-vehicle-details/assign-vehicle-details.component'

const routes: Routes = [{
  path: '',
  component: VehicleComponent,
  children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add-vehicle',
        component: AddVehicleComponent
      },
      {
        path: 'edit-vehicle/:id',
        component: EditVehicleComponent
      }
      
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
{
  path: 'assign-vehicles',
  component: AssignVehicleComponent
},
{
  path: 'assign-vehicle-details/:id/:isReassigned',
  component: AssignVehicleDetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {
}
