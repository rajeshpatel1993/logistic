import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintComponent } from './complaint.component'
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';

const routes: Routes = [
  {
    path: '',
    component: ComplaintComponent,
    children: [
      {
        path: 'list',
        component: ComplaintListComponent
      },
      {
        path: 'add-issue',
        component: AddComplaintComponent
      },
      {
        path: 'edit-issue/:id',
        component: EditComplaintComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintRoutingModule { }
