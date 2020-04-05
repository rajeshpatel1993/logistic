import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes.components';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ListComponent } from './list/list.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';

const routes: Routes = [{
  path: '',
  component: NotesComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add-notes',
        component: AddNotesComponent
      },
      {
        path: 'edit-notes/:id',
        component: EditNotesComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
