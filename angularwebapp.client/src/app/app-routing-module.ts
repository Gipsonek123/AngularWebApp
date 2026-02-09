import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '@core/enums/app-route.enum';
import { AppPath } from '@core/enums/app-path.enum';

export const APP_ROUTES: Routes = [
  {
    path: AppRoute.Account,
    loadChildren: () =>
      import('@account/account.module')
        .then(m => m.AccountModule)
  },
  {
    path: AppRoute.Admin,
    loadChildren: () =>
      import('@admin/admin.module')
        .then(m => m.AdminModule)
  },
  {
    path: AppRoute.Home,
    loadChildren: () =>
      import('@home/home.module')
        .then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: AppPath.Login,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: AppPath.Login
  }
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
