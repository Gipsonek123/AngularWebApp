import { Routes } from '@angular/router';
import { Welcome } from '@home/components/welcome/welcome';
import { RoleGuard } from '@core/guards/role-guard';
import { UserRole } from '@shared/enums/user-role.enum';
import { HomeRoute } from '@home/enums/home-route.enum'

export const HOME_ROUTES: Routes = [
  { path: HomeRoute.Welcome, component: Welcome, canActivate: [RoleGuard], data: { role: UserRole.User } }
];
