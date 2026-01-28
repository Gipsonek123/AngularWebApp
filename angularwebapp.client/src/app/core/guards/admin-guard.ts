import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '@account/services/account-api';
import { UserRole } from '@shared/enums/user-role.enum';
import { AppPath } from '@core/enums/app-path.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(): boolean {
    if (!this.accountService.isLoggedIn()) {
      this.router.navigate([AppPath.Login]);
      return false;
    }

    const role = this.accountService.getRole();

    if (role !== UserRole.Admin) {
      this.router.navigate([AppPath.Login]);
      return false;
    }

    return true;
  }
}
