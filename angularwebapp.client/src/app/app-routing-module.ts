import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './account/login/login';
import { Register } from './account/register/register';
import { Home } from './home/home';
import { AuthGuard } from './core/auth/auth-guard';
import { AppRoutes } from './core/enums/app-routes.enum';

const routes: Routes = [
  { path: AppRoutes.Login, component: Login },
  { path: AppRoutes.Register, component: Register },
  { path: AppRoutes.Home, component: Home, canActivate: [AuthGuard] },
  { path: '', redirectTo: `/${AppRoutes.Login}`, pathMatch: 'full'},
  { path: '**', redirectTo: `/${AppRoutes.Login}`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
