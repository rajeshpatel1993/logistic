import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.components';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { CustomCommonModule } from '../custom-common.module';
import { NbCardModule, NbLayoutModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxImgModule } from 'ngx-img';

@NgModule({
  
  imports: [
    NotesRoutingModule,
    CustomCommonModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbDatepickerModule,
    AutocompleteLibModule,
    NgxImgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NotesComponent,AddNotesComponent],
})
export class NotesModule { }
