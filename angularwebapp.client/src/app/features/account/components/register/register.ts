import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from '@account/services/account-service';
import { Router } from '@angular/router';
import { AccountValidator } from '@core/validators/account-validator';
import { AppPath } from '@core/enums/app-path.enum';
import { SuccessMessages } from '@core/constants/success-messages';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  errors: string[] = [];
  form!: FormGroup;
  submitted = false;
  successMessage = SuccessMessages.accountCreated;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        userName: ['', AccountValidator.usernameRules],
        email: ['', AccountValidator.emailRules],
        password: ['', AccountValidator.passwordRules],
        confirmPassword: ['', [Validators.required, AccountValidator.passwordsMatch]]
      }
    );

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  register() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.accountService.register(this.form.value).subscribe({
      next: () => {
        alert(this.successMessage);
        this.router.navigate([AppPath.Login]);
      },
      error: (err) => {
        this.errors = err.error?.errors ?? ['Registration failed. Try again.'];
      }
    });
  }

}
