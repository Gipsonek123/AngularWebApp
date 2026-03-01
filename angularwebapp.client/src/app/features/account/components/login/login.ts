import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@account/services/account-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from '@shared/enums/user-role.enum';
import { AppPath } from '@core/enums/app-path.enum';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errors: string[] = [];
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    const confirmed = this.route.snapshot.queryParamMap.get('confirmed');
    if (confirmed === 'true') {
      alert("Your email has been confirmed. You can log in.");
    }
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
      error: (err) => {
        if (typeof err.error === 'string') {
          this.errors = [err.error];
        } else {
          this.errors = err.error?.errors ?? ['Login failed. Please try again.'];
        }
      }
    });
  }
}
