import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AssetDetailsComponent, ButtonViewComponent } from './asset-details/asset-details.component';
// import { LeaveDashboardComponent } from './leave-dashboard/leave-dashboard.component';
// import { DocumentManagementComponent } from './document-management/document-management.component';
// import { ReportsComponent } from './reports/reports.component';
// import { DocumentRemindersComponent } from './document-reminders/document-reminders.component';
import { NbActionsModule, NbCardModule, NbInputModule,
  NbButtonModule, NbTabsetModule, NbRouteTabsetModule, 
  NbDatepickerModule, NbAccordionModule, NbSelectModule, NbDialogModule, NbToastrModule, NbSpinnerModule } from '@nebular/theme';
// import { AddeditEmployeeComponent } from './addedit-employee/addedit-employee.component';
// import { ProfileComponent } from './profile/profile.component';
// import { JobDetailsComponent } from './job-details/job-details.component';
// import { EmergencyDetailsComponent } from './emergency-details/emergency-details.component';
// import { PassportDetailsComponent } from './passport-details/passport-details.component';
// import { EmployeeNotesComponent } from './employee-notes/employee-notes.component';
// import { EmployeeFilesComponent } from './employee-files/employee-files.component';
// import { EmployeeNinComponent } from './employee-nin/employee-nin.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { AddLeaveComponent } from './add-leave/add-leave.component';

// Services
//import { EmployeeListService } from './shared/services/employee-list.service';

import { EmployeeListService } from '../../shared/services/employee-list.service';
// import { CoreModule } from '../core/core.module';
import { AssetService } from '../../shared/services/asset-list.service';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
// import { AssetContainerComponent } from './asset-container/asset-container.component';
// import { CreateAssetComponent } from './create-asset/create-asset.component';
import { LeaveDataService } from '../../shared/services/leave-data.service';
import { EmployeeComponent } from './employee.component';
import { AddeditEmployeeComponent } from './addedit-employee/addedit-employee.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomCommonModule } from '../custom-common.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { EmergencyDetailsComponent } from './emergency-details/emergency-details.component';
import { PassportDetailsComponent } from './passport-details/passport-details.component';
import { EmployeeNotesComponent } from './employee-notes/employee-notes.component';
import { EmployeeFilesComponent } from './employee-files/employee-files.component';
import { EmployeeNinComponent } from './employee-nin/employee-nin.component';
import { FileUploadService } from '../../services/file-upload.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
// import { AddNewDocumentComponent } from './add-new-document/add-new-document.component';
// import { EmployeeManagementComponent } from './employee-management/employee-management.component';
// import { AssetComponent } from './asset/asset.component';
import { AngularFireModule } from 'angularfire2';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    EmployeesListComponent,
    AssetDetailsComponent,
    EmployeeComponent,
    AddeditEmployeeComponent,
    // DashboardComponent,
    // LeaveDashboardComponent,
    // DocumentManagementComponent,
    // ReportsComponent,
    // DocumentRemindersComponent,
    // AddeditEmployeeComponent,
    ProfileComponent,
    JobDetailsComponent,
    EmergencyDetailsComponent,
    PassportDetailsComponent,
    EmployeeNotesComponent,
    EmployeeFilesComponent,
    EmployeeNinComponent,
    // AddLeaveComponent,
    // CreateAssetComponent,
    // AssetContainerComponent,
    // AddNewDocumentComponent,
    // EmployeeManagementComponent,
    // AssetComponent,

    AddNewEmployeeComponent,
    ButtonViewComponent
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomCommonModule,
    AngularFireStorageModule,
    // CoreModule,
    ReactiveFormsModule,
    ScrollingModule,
    EmployeeManagementRoutingModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forChild(),
    NbToastrModule.forRoot(),
    NbAccordionModule,
    NbSpinnerModule,
    NbSelectModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCVD_FPhsprqzSFWjy6baM_Fw63hwSWJHE",
      authDomain: "nirmal-hockey.firebaseapp.com",
      storageBucket: "nirmal-hockey.appspot.com",
      projectId: "nirmal-hockey",
    }),
    Ng2SmartTableModule
  ],
  // entryComponents: [ButtonViewComponent, AddNewEmployeeComponent],
  providers: [ EmployeeListService, AssetService, LeaveDataService, FileUploadService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class EmployeeManagementModule {

 }
