import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AccountService } from '@account/services/account-service';
import { UserRole } from '@shared/enums/user-role.enum';
import { AppPath } from '@core/enums/app-path.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!this.accountService.isLoggedIn()) {
      return this.router.createUrlTree([AppPath.Login]);
    }

    const requiredRole = route.data['role'] as UserRole;
    return this.accountService.getRole() === requiredRole
      ? true
      : this.router.createUrlTree([AppPath.Login]);
  }
}
