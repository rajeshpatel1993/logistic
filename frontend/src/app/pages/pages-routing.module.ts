import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ComplaintModule } from './complaint/complaint.module';

const routes: Routes = [
  
  {
  path: '',
  component: PagesComponent,
  children: [

  
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    // },
    {
      path:'vehicles',
      loadChildren: () => import('./vehicles/vehicles.module')
        .then(m => m.VehicleModule),
    },

    {
      path:'services',
      loadChildren: () => import('./vehicle-service/vehicles-service.module')
        .then(m => m.VehicleServiceModule),
    },

    {
      path:'expenses',
      loadChildren: () => import('./vehicle-expense/vehicles-expense.module')
        .then(m => m.VehicleExpenseModule),
    },
    {
      path:'reports',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path:'remainders',
      loadChildren: () => import('./remainders/remainders.module')
        .then(m => m.RemaindersModule),
    },

    {
      path:'fuel',
      loadChildren: () => import('./fuel/fuel.module')
        .then(m => m.FuelModule),
    },

    {
      path:'notes',
      loadChildren: () => import('./notes/notes.module')
        .then(m => m.NotesModule),
    },

    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'contacts',
      loadChildren: () => import('./contact-us/contact-us.module')
        .then(m => m.ContactUsModule),
    },
    {
      path: 'complaint',
      loadChildren: () => import('./complaint/complaint.module')
      .then(m => m.ComplaintModule)
    },
    {
      path: 'employee',
      loadChildren: () => import('./employee-management/employee-management.module')
      .then(m => m.EmployeeManagementModule)
    },

    // {
    //   path: 'employee',
    //   loadChildren: () => import('./employee-management/employee-management.module')
    //   .then(m => m.EmployeeManagementModule)
    // },

  

    // {
    //   path: 'login',
    //   loadChildren: () => import('./login/login.module')
    //   .then(m => m.LoginModule)
    // },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class PagesRoutingModule {
}
