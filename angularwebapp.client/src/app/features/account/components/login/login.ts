import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@account/services/account-api';
import { Router } from '@angular/router';
import { UserRole } from '@shared/enums/user-role.enum';
import { AppPath } from '@core/enums/app-path.enum';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  error = '';
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.accountService.login(this.form.value).subscribe({
      next: (res) => {
        if (res.role === UserRole.Admin) {
          this.router.navigate([AppPath.AdminPanel]);
        } else {
          this.router.navigate([AppPath.Welcome]);
        }
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
