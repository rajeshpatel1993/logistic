import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemaindersRoutingModule } from './remainders-routing.module';
import { RemaindersListComponent } from './remainders-list/remainders-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbButtonModule,
  NbCardModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbLayoutModule, NbUserModule,NbTabsetModule,NbDatepickerModule,
} from '@nebular/theme';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { RemaindersComponent } from './remainders.component';
import { AadRemaindersComponent } from './aad-remainders/aad-remainders.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [RemaindersListComponent,RemaindersComponent, AadRemaindersComponent],
  imports: [
    CommonModule,
    RemaindersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbLayoutModule,
    NbUserModule,
    NbTabsetModule,
    NbDatepickerModule,
    AutocompleteLibModule,
    AngularEditorModule
  ]
})
export class RemaindersModule { }
