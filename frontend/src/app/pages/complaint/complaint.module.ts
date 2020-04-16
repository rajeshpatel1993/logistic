import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintComponent } from './complaint.component'
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { NbLayoutModule, NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [ComplaintComponent,ComplaintListComponent],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    NbLayoutModule,
    NbCardModule
  ]
})
export class ComplaintModule { }
