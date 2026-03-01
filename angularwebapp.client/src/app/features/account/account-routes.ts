import { Routes } from '@angular/router';
import { Login } from '@account/components/login/login';
import { Register } from '@account/components/register/register';
import { ConfirmEmail } from '@account/components/confirm-email/confirm-email';
import { AccountRoute } from '@account/enums/account-route.enum';

export const ACCOUNT_ROUTES: Routes = [
  { path: AccountRoute.Login, component: Login },
  { path: AccountRoute.Register, component: Register },
  { path: AccountRoute.ConfirmEmail, component: ConfirmEmail }
];
