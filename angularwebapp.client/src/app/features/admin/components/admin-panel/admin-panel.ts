import { Component } from '@angular/core';
import { User } from '@shared/models/user.model';
import { AdminService } from '@admin/services/admin-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  users: User[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure to delete this user?')) {
      return;
    }

    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }

  //editUser(id: number) {
  //  this.router.navigate(['/admin/edit', id]);
  //}


  //createUser() {
  //  this.router.navigate(['admin/create']);
  //}
}
