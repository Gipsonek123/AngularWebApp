import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth-api';
import { Router } from '@angular/router';

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
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.auth.login(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = "Invalid username or password";
      }
    });
  }
}
