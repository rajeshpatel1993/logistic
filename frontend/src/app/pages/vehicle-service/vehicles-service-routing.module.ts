import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VehicleServiceComponent} from './vehicle-service/vehicle-service.component'
import { VehicleServiceDetailsComponent } from './vehicle-service-details/vehicle-service-details.component'
import { ServiceComponent } from './service.component';

const routes: Routes = [{
  path: '',
  component: ServiceComponent,
  children: [
      {
        path: 'list',
        component: VehicleServiceComponent
      },
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
// {
//   path: 'assign-vehicles',
//   component: AssignVehicleComponent
// },
// {
//   path: 'assign-vehicle-details/:id',
//   component: AssignVehicleDetailsComponent
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {
}
