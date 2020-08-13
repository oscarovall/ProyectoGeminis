import { RouterModule, Routes } from '@angular/router';


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



const pagesRoutes: Routes = [
  { path: '', component: DashboardComponent },
  // AOSP General Features pages
  { path: 'calendar', component: CalendarComponent },
  // AOSP Lead pages
  { path: 'lead/:id', component: LeadComponent },
  // AOSP Admin pages
  { path: 'emails-admin', component: EmailComponent },
  { path: 'users-admin', component: UsersComponent },
  { path: 'workflows-admin', component: WorkflowComponent },

  // Template Examples
  { path: 'roles-admin', component: RolesComponent, canActivate: [AuthGuard], data: { pageName: 'roles-admin' } },
  { path: 'log-in', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  {
    path: '',
    component: VerticalLayoutComponent,
  },
  {
    path: 'log-in',
    component: LoginComponent,
  },
  {
    path: 'log-out',
    component: LogoutComponent,
  },
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
