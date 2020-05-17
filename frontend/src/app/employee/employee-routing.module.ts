import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeLComponent } from './employee-l/employee-l.component';
// import { AssetDetailsComponent } from './asset-details/asset-details.component';
// import { LeaveDashboardComponent } from './leave-dashboard/leave-dashboard.component';
// import { DocumentManagementComponent } from './document-management/document-management.component';
// import { ReportsComponent } from './reports/reports.component';
// import { EmployeeManagementComponent } from './employee-management/employee-management.component';
// import { DocumentRemindersComponent } from './document-reminders/document-reminders.component';
// import { AddeditEmployeeComponent } from './addedit-employee/addedit-employee.component';
// import { ProfileComponent } from './profile/profile.component';
// import { JobDetailsComponent } from './job-details/job-details.component';
// import { EmergencyDetailsComponent } from './emergency-details/emergency-details.component';
// import { PassportDetailsComponent } from './passport-details/passport-details.component';
// import { EmployeeNotesComponent } from './employee-notes/employee-notes.component';
// import { EmployeeFilesComponent } from './employee-files/employee-files.component';
// import { EmployeeNinComponent } from './employee-nin/employee-nin.component';
// import { AddLeaveComponent } from './add-leave/add-leave.component';
// import { AssetContainerComponent } from './asset-container/asset-container.component';
// import { CreateAssetComponent } from './create-asset/create-asset.component';
// import { AddNewDocumentComponent } from './add-new-document/add-new-document.component';

const routes: Routes = [
  {

    path : '',
    component:EmployeeLComponent,
    children: [
      {
        path: 'empList',
        component: EmployeeLComponent
      }
    ]
  }
  
//   {
//   path: 'dashboard',
//   component: DashboardComponent
// },




// {
//   path: 'asset',
//   component: AssetContainerComponent,
//   children: [{
//     path: 'assetDetails',
//     component: AssetDetailsComponent
//   }, {
//     path: 'createasset',
//     component: CreateAssetComponent
//   }, {
//     path: '',
//     redirectTo: 'assetDetails',
//     pathMatch: 'full'
//   }]
  
// }, {
//   path: 'leaveentitlement/leaveDashboard',
//   component: LeaveDashboardComponent
// }, {
//   path: 'leaveentitlement/addleave',
//   component: AddLeaveComponent
// }, {
//   path: 'docsManagement',
//   component: DocumentManagementComponent
// }, {
//   path: 'reports',
//   component: ReportsComponent
// }, {
//   path: 'manage-employees',
//   component: EmployeeManagementComponent
// }, {
//   path: 'reminders',
//   component: DocumentRemindersComponent
// }, {
//   path: 'edit/:employeeId',
//   component: AddeditEmployeeComponent,
//   children: [{
//     path: 'profile',
//     component: ProfileComponent
//   }, {
//     path: 'jobDetails',
//     component: JobDetailsComponent
//   }, {
//     path: 'emergency',
//     component: EmergencyDetailsComponent
//   }, {
//     path: 'passport',
//     component: PassportDetailsComponent
//   }, {
//     path: 'notes',
//     component: EmployeeNotesComponent
//   }, {
//     path: 'files',
//     component: EmployeeFilesComponent
//   }, {
//     path: 'nin',
//     component: EmployeeNinComponent
//   }]
// }, {
//   path: '',
//   redirectTo: 'dashboard',
//   pathMatch: 'full'
// }, {
//   path: '*',
//   redirectTo: 'dashboard',
//   pathMatch: 'full'
// }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
