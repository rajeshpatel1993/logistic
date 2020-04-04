import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.components';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { CustomCommonModule } from '../custom-common.module';
import { NbCardModule, NbLayoutModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxImgModule } from 'ngx-img';
import { ListComponent } from './list/list.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';

@NgModule({
  
  imports: [
    NotesRoutingModule,
    CustomCommonModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbDatepickerModule,
    AutocompleteLibModule,
    NgxImgModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
  ],
  declarations: [NotesComponent,AddNotesComponent, ListComponent, EditNotesComponent],
})
export class NotesModule { }
