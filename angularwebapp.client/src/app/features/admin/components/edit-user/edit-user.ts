import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@admin/services/admin-service';
import { AccountValidator } from '@core/validators/account-validator';
import { AppPath } from '@core/enums/app-path.enum';
import { UserRole } from '@shared/enums/user-role.enum';
import { SuccessMessages } from '@core/constants/success-messages';
import { AccountService } from '@account/services/account-service';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {

  form!: FormGroup;
  errors: string[] = [];
  editedUserId!: number;
  submitted = false;
  roles = Object.values(UserRole);
  successMessage = SuccessMessages.userEdited;
  currentUserId!: number;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.id;
      }
    });

    this.editedUserId = +this.route.snapshot.params['id'];

    this.form = this.fb.group({
      userName: ['', AccountValidator.usernameRules],
      email: ['', AccountValidator.emailRules],
      role: ['', Validators.required],
      password: ['', AccountValidator.passwordRulesEditUser],
      confirmPassword: ['', AccountValidator.passwordsMatch]
    });

    this.adminService.getUserById(this.editedUserId).subscribe(user => {
      this.form.patchValue(user);
    });

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  editUser() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const selectedRole = this.form.get('role')?.value;

    if (this.adminService.isSelfDowngradeToUser(selectedRole, this.currentUserId, this.editedUserId)) {
      if (!confirm('Are you sure you want to change your role to User? You will be logged out.')) {
        return;
      } 
    }

    this.adminService.updateUser(this.editedUserId, this.form.value).subscribe({
      next: () => {
        alert(this.successMessage);

        if (this.adminService.isSelfDowngradeToUser(selectedRole, this.currentUserId, this.editedUserId)) {
          this.accountService.logout().subscribe(() => {
            this.router.navigate([AppPath.Login]);
          });
        } else {
          this.router.navigate([AppPath.AdminPanel]);
        }
      },
      error: (err) => {
        this.errors = err.error?.errors ?? ['User editing failed. Please try again.'];
      }
    });
  }
}
