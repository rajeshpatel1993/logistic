import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { CommonModule } from '@angular/common';  




@NgModule({
  imports: [
    CommonModule
  ],
  exports: [DailogBoxComponent],
  declarations: [
    // JwPaginationComponent,
    DailogBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CustomCommonModule {
}
