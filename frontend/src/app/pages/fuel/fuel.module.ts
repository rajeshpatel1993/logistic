import { NgModule } from '@angular/core';

import { FuelRoutingModule } from './fuel-routing.module';
import { FuelComponent } from './fuel.component';
import { ListComponent } from './list/list.component';
import { CustomCommonModule } from '../custom-common.module';

@NgModule({
  imports: [
    FuelRoutingModule,
    CustomCommonModule
  ],
  declarations: [ListComponent, FuelComponent],
})
export class FuelModule { }
