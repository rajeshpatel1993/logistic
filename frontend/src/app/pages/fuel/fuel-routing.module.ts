import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelComponent } from './fuel.component';
import { ListComponent } from './list/list.component';
import { AddFuelComponent } from './add-fuel/add-fuel.component';
import { EditFuelComponent } from './edit-fuel/edit-fuel.component';

const routes: Routes = [{
  path: '',
  component: FuelComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add-fuel-entry',
        component: AddFuelComponent
      },
      {
        path: 'edit-fuel/:id',
        component: EditFuelComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule { }
