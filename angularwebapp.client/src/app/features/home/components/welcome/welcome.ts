import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@account/services/account-api';
import { AppPath } from '@core/enums/app-path.enum';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.router.navigate([AppPath.Login]);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
