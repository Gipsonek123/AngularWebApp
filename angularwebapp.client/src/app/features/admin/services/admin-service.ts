import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApi } from '@admin/api/admin-api';
import { User } from '@shared/models/user.model';
import { NewUser } from '@shared/models/new-user.model';
import { UserRole } from '@shared/enums/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private adminApi: AdminApi) { }

  getAllUsers(): Observable<User[]> {
    return this.adminApi.getAllUsers();
  }

  getUserById(id: number): Observable<User> {
    return this.adminApi.getUserById(id);
  }

  createUser(model: NewUser): Observable<void> {
    return this.adminApi.createUser(model);
  }

  updateUser(id: number, model: NewUser): Observable<void> {
    return this.adminApi.updateUser(id, model);
  }

  deleteUser(id: number): Observable<void> {
    return this.adminApi.deleteUser(id);
  }

  isSelfDowngradeToUser(selectedRole: UserRole, currentUserId: number, editedUserId: number): boolean {
    return (selectedRole === UserRole.User && currentUserId === editedUserId);
  }
}
