import { Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin-guard';
import { AdminRoute } from '@admin/enums/admin-route.enum';
import { AdminPanel } from '@admin/components/admin-panel/admin-panel';
import { EditUser } from '@admin/components/edit-user/edit-user';
import { CreateUser } from '@admin/components/create-user/create-user';

export const ADMIN_ROUTES: Routes = [
  { path: AdminRoute.AdminPanel, component: AdminPanel, canActivate: [AdminGuard] },
  { path: `${AdminRoute.EditUser}/:id`, component: EditUser, canActivate: [AdminGuard] },
  { path: AdminRoute.CreateUser, component: CreateUser, canActivate: [AdminGuard]}
];
