import { Routes } from '@angular/router';
import { AdminRoute } from '@admin/enums/admin-route.enum';
import { AdminPanel } from '@admin/components/admin-panel/admin-panel';
import { EditUser } from '@admin/components/edit-user/edit-user';
import { CreateUser } from '@admin/components/create-user/create-user';
import { RoleGuard } from '@core/guards/role-guard';
import { UserRole } from '@shared/enums/user-role.enum';

export const ADMIN_ROUTES: Routes = [
  { path: AdminRoute.AdminPanel, component: AdminPanel, canActivate: [RoleGuard], data: { role: UserRole.Admin } },
  { path: `${AdminRoute.EditUser}/:id`, component: EditUser, canActivate: [RoleGuard], data: { role: UserRole.Admin } },
  { path: AdminRoute.CreateUser, component: CreateUser, canActivate: [RoleGuard], data: { role: UserRole.Admin } }
];
