import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NbLayoutModule, NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [ContactUsComponent,ContactListComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    NbLayoutModule,
    NbCardModule
  ]
})
export class ContactUsModule { }
