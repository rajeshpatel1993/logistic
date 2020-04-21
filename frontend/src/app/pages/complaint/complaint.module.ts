import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgxImgModule } from 'ngx-img';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintComponent } from './complaint.component'
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { NbLayoutModule, NbCardModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomCommonModule } from '../custom-common.module';

@NgModule({
  declarations: [ComplaintComponent,ComplaintListComponent, AddComplaintComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomCommonModule,
    ComplaintRoutingModule,
    NbLayoutModule,
    NbCardModule,
    AutocompleteLibModule,
    NbTabsetModule,
    NbDatepickerModule,
    NgxMaterialTimepickerModule,
    NgxImgModule,
    ThemeModule
  ]
})
export class ComplaintModule { }
