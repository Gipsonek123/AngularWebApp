import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from '@account/services/account-api';
import { Router } from '@angular/router';
import { CustomValidators } from '@core/validators/custom-validators';
import { AppPath } from '@core/enums/app-path.enum';

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

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: ['', CustomValidators.usernameRules],
        email: ['', CustomValidators.emailRules],
        password: ['', CustomValidators.passwordRules],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [CustomValidators.passwordsMatch]
      }
    );
  }

  register() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.accountService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate([AppPath.Login]);
      },
      error: (err) => {
        this.errors = err.error?.errors ?? ['Registration failed. Try again.'];
      }
    });
  }

}
