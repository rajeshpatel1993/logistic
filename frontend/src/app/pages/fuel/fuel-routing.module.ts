import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelComponent } from './fuel.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: FuelComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule { }
