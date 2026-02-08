import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountValidator } from '@core/validators/account-validator';
import { AppPath } from '@core/enums/app-path.enum';
import { UserRole } from '@core/enums/user-role.enum';
import { SuccessMessages } from '@core/constants/success-messages';
import { AdminService } from '@admin/services/admin-service';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  form!: FormGroup;
  errors: string[] = [];
  submitted = false;
  roles = Object.values(UserRole);
  successMessage = SuccessMessages.userCreated;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        userName: ['', AccountValidator.usernameRules],
        email: ['', AccountValidator.emailRules],
        role: ['', Validators.required],
        password: ['', AccountValidator.passwordRules],
        confirmPassword: ['', [Validators.required, AccountValidator.passwordsMatch]]
      }
    );

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  createUser() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.adminService.createUser(this.form.value).subscribe({
      next: () => {
        alert(this.successMessage);
        this.router.navigate([AppPath.AdminPanel]);
      },
      error: (err) => {
        this.errors = err.error?.errors ?? ['User creation failed. Please try again.'];
      }
    });
  }
}
