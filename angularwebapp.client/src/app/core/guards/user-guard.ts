import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '@account/services/account-service';
import { UserRole } from '@shared/enums/user-role.enum';
import { AppPath } from '@core/enums/app-path.enum';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(): boolean {
    if (!this.accountService.isLoggedIn()) {
      this.router.navigate([AppPath.Login]);
      return false;
    }

    const role = this.accountService.getRole();

    if (role !== UserRole.User) {
      this.router.navigate([AppPath.Login]); 
      return false;
    }

    return true;
  }
}
