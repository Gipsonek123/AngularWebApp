import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './account/login/login';
import { Register } from './account/register/register';
import { Home } from './home/home';
import { AuthGuard } from './core/auth/auth-guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '*', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
