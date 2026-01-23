import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../core/auth/auth-api';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/enums/app-routes.enum';
import { CustomValidators } from '../../core/validators/custom-validators';

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
    private auth: AuthService,
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

  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  register() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate([`/${AppRoutes.Login}`]);
      },
      error: (err) => {
        this.errors = err.error?.errors ?? ['Registration failed. Try again.'];
      }
    });
  }

}
