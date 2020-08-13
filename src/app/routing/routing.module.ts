import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerticalLayoutComponent } from '../layout/vertical';
import { ExtraLayoutComponent } from '../layout/extra';
import { HorizontalLayoutComponent } from '../layout/horizontal';
import { WorkflowComponent } from '../pages/admin/workflow/workflow.component';
import { LeadComponent } from '../pages/crm/lead/lead.component';
import { EmailComponent } from '../pages/admin/email/email.component';
import { CalendarComponent } from '../pages/apps/aosp/calendar/calendar.component';
import { UsersComponent } from '../pages/admin/users/users.component';
import { LoginComponent } from '../auth-aosp/login/login.component';
import { LogoutComponent } from '../auth-aosp/logout/logout/logout.component';
import { RolesComponent } from '../pages/admin/roles/roles.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LeadsComponent } from '../pages/crm/leads/leads.component';
import { CustomersComponent } from '../pages/crm/customers/customers.component';

import { FormsComponent } from '../pages/admin/forms/forms.component';
import { HomeInformationComponent } from '../pages/crm/lead/home-information/home-information.component';
import { HomesComponent } from '../pages/crm/lead/home-information/homes/homes.component';
import { PromoHomesComponent } from '../pages/crm/lead/home-information/promo-homes/promo-homes.component';
import { HomeComponent } from '../pages/crm/lead/home-information/home/home.component';
import { InventoryTableComponent } from '../pages/inventory/inventory-table/inventory-table.component';
import { RolesForAuth } from '../shared/models/role';
import { RolePage } from '../models/RolePage';
import { RolePagesForAuth } from '../shared/models/role-page';
import { NotEnoughRightsComponent } from '../pages/not-enough-rights/not-enough-rights.component';
import { DealershipsComponent } from '../pages/admin/dealerships/dealerships.component';
import { ManufacturerComponent } from '../pages/admin/manufacturer/manufacturer/manufacturer.component';
import { UnderConstructionComponent } from '../pages/under-construction/under-construction.component';

import { AuthAospComponent } from '../auth-aosp/auth-aosp/auth-aosp.component';



const DEFAULT_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data:
    {
      // roles: [RolesForAuth.LeadAgent],
      // roles: [RolesForAuth.ProceesingAgent],
      // rolePages: [RolePagesForAuth.Roles],
      // roleWithRolePage :
      // [
      //   {
      //     role: RolesForAuth.ProceesingAgent,
      //     rolePage: RolePagesForAuth.Roles
      //   }
      // ],

    }
  },
  // AOSP General Features pages
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], },
  // AOSP Lead pages
  { path: 'lead/:id', component: LeadComponent, canActivate: [AuthGuard], },
  { path: 'leads', component: LeadsComponent, canActivate: [AuthGuard], },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], },
  { path: 'homeInformation', component: HomeInformationComponent, canActivate: [AuthGuard], },
  { path: 'homes', component: HomesComponent, canActivate: [AuthGuard], },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], },
  { path: 'promoHomes', component: PromoHomesComponent, canActivate: [AuthGuard], },
  { path: 'inventory', component: InventoryTableComponent, canActivate: [AuthGuard], },

  // AOSP Admin pages
  { path: 'emails-admin', component: EmailComponent, canActivate: [AuthGuard], },
  { path: 'users-admin', component: UsersComponent, canActivate: [AuthGuard], },
  { path: 'workflows-admin', component: WorkflowComponent, canActivate: [AuthGuard], },
  { path: 'forms-admin', component: FormsComponent, canActivate: [AuthGuard], },
  { path: 'dealerships-admin', component: DealershipsComponent, canActivate: [AuthGuard], },
  { path: 'manufacturers-admin', component: ManufacturerComponent, canActivate: [AuthGuard], },

  // Template Examples
  { path: 'roles-admin', component: RolesComponent, canActivate: [AuthGuard], },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], },

  { path: 'not-enough-rights', component: NotEnoughRightsComponent, },

  // Under Construction
  { path: 'serviceandrepair', component: UnderConstructionComponent, },
  { path: 'insurance', component: UnderConstructionComponent, },
  { path: 'finance', component: UnderConstructionComponent, },
  { path: 'realestate', component: UnderConstructionComponent, },
  { path: 'reports', component: UnderConstructionComponent, },


  { path: 'company-admin', component: UnderConstructionComponent, },
  { path: 'attributes-admin', component: UnderConstructionComponent, },
];

const AUTH_ROUTES: Routes = [
  {
    path: 'log-in',
    component: LoginComponent,
  },
  {
    path: 'log-out',
    component: LogoutComponent,
  }

];

//  canActivate: [AuthGuard], data: {pageName: 'Roles'}
export const ROUTES: Routes = [
  {
    path: '',
    component: VerticalLayoutComponent,
    children: DEFAULT_ROUTES
  },
  {
    path: 'auth',
    component: AuthAospComponent,
    children: AUTH_ROUTES
  },
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class RoutingModule { }
