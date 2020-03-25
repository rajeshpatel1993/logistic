import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';
import { FuelComponent } from './fuel.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FuelRoutingModule
  ],
  declarations: [ListComponent, FuelComponent],
})
export class FuelModule { }
