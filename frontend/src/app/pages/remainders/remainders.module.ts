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
import { RemaindersReportComponent } from './remainders-report/remainders-report.component';
import { RemainderService } from './remainder.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CustomCommonModule } from '../custom-common.module';
import { EditRemaindersComponent } from './edit-remainders/edit-remainders.component';

@NgModule({
  declarations: [RemaindersListComponent,RemaindersComponent, AadRemaindersComponent, RemaindersReportComponent, EditRemaindersComponent],
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
    AngularEditorModule,
    NgxMaterialTimepickerModule,
    CustomCommonModule
  ],

  providers: [RemainderService]
})
export class RemaindersModule { }
