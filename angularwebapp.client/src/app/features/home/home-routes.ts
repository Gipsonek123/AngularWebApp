import { Routes } from '@angular/router';
import { Welcome } from '@home/components/welcome/welcome';
import { UserGuard } from '@core/guards/user-guard';
import { HomeRoute } from '@home/enums/home-route.enum'

export const HOME_ROUTES: Routes = [
  { path: HomeRoute.Welcome, component: Welcome, canActivate: [UserGuard] }
];
