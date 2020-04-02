import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes.components';
import { AddNotesComponent } from './add-notes/add-notes.component';

const routes: Routes = [{
  path: '',
  component: NotesComponent,
    children: [
      {
        path: 'add-notes',
        component: AddNotesComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
