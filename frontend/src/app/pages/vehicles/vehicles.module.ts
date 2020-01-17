import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  NbButtonModule,
  NbCardModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbLayoutModule, NbUserModule,NbTabsetModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { VehicleComponent } from './vehicles.component';
import { VehicleRoutingModule } from './vehicles-routing.module';
import { ListComponent } from './list/list.component';
import { VehicleService } from './vehicles.service';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NgxDatatableModule,
    NbLayoutModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbUserModule,
    VehicleRoutingModule,
    NbTabsetModule,
    AutocompleteLibModule
  ],
  declarations: [
    VehicleComponent,
    ListComponent,
    AddVehicleComponent,
    JwPaginationComponent

  ],
  providers: [
    VehicleService
  ],
})
export class VehicleModule { }
