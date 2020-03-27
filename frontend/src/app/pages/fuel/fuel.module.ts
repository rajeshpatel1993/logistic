import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { FuelRoutingModule } from './fuel-routing.module';
import { FuelComponent } from './fuel.component';
import { ListComponent } from './list/list.component';
import { CustomCommonModule } from '../custom-common.module';
import { NbCardModule, NbLayoutModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';
import { AddFuelComponent } from './add-fuel/add-fuel.component';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxImgModule } from 'ngx-img';

@NgModule({
  imports: [
    FuelRoutingModule,
    CustomCommonModule,
    NbCardModule,
    AutocompleteLibModule,
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbTabsetModule,
    NgxMaterialTimepickerModule,
    NbDatepickerModule,
    NgxImgModule.forRoot(),
  ],
  declarations: [ListComponent, FuelComponent, AddFuelComponent],
})
export class FuelModule { }
