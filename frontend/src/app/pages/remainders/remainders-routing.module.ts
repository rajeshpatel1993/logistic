import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemaindersComponent } from './remainders.component'
import { RemaindersListComponent } from './remainders-list/remainders-list.component';
import { AadRemaindersComponent } from './aad-remainders/aad-remainders.component';

const routes: Routes = [
  {
    path: '',
    component: RemaindersComponent,
    children: [
      {
        path: 'list',
        component: RemaindersListComponent
      },
      {
        path: 'add-remainders',
        component: AadRemaindersComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemaindersRoutingModule { }
