import { AccountRoute } from '@account/enums/account-route.enum';
import { AdminRoute } from '@admin/enums/admin-route.enum';
import { HomeRoute } from '@home/enums/home-route.enum';
import { AppRoute } from '@core/enums/app-route.enum';

export const AppPath = {
  Login: `${AppRoute.Account}/${AccountRoute.Login}`,
  Register: `${AppRoute.Account}/${AccountRoute.Register}`,
  AdminPanel: `${AppRoute.Admin}/${AdminRoute.AdminPanel}`,
  Welcome: `${AppRoute.Home}/${HomeRoute.Welcome}`,
  EditUser: `${AppRoute.Admin}/${AdminRoute.EditUser}`,
  CreateUser: `${AppRoute.Admin}/${AdminRoute.CreateUser}`
} as const;
