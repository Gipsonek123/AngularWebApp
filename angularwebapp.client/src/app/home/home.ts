import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth-api';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']); // po wylogowaniu przekieruj do login
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
