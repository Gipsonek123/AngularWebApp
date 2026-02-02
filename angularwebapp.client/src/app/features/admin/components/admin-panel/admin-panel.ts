import { Component } from '@angular/core';
import { User } from '@shared/models/user.model';
import { Router } from '@angular/router';
import { AppPath } from '@core/enums/app-path.enum';
import { SuccessMessages } from '@core/constants/success-messages';
import { AccountService } from '@account/services/account-service';
import { AdminService } from '@admin/services/admin-service';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  users: User[] = [];
  successMessage = SuccessMessages.userDeleted;
  currentUserId!: number;

  constructor(
    private accountService: AccountService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.id;
      }
    });

    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: number) {
    if (id === this.currentUserId) {
      alert("You can't delete your own account");
      return;
    }

    if (!confirm('Are you sure to delete this user?')) {
      return;
    }

    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
      alert(this.successMessage);
    });
  }

  editUser(id: number) {
    this.router.navigate([AppPath.EditUser, id]);
  }

  createUser() {
    this.router.navigate([AppPath.CreateUser]);
  }

  logout() {
    this.accountService.logout().subscribe(() => {
      this.router.navigate([AppPath.Login]);
    });
  }
}
