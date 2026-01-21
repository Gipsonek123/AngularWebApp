import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth-api';
import { AppRoutes } from '../core/enums/app-routes.enum';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate([`/${AppRoutes.Login}`]);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
