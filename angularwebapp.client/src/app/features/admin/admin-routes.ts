import { Routes } from '@angular/router';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { AdminGuard } from '../../core/guards/admin-guard';
import { AdminRoute } from '../admin/enums/admin-route.enum'

export const ADMIN_ROUTES: Routes = [
  { path: AdminRoute.AdminPanel, component: AdminPanel, canActivate: [AdminGuard] }
];
