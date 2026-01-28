import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user.model';
import { NewUser } from '@shared/models/new-user.model';
import { ADMIN_ENDPOINTS } from '@admin/api/admin-endpoints';

@Injectable({ providedIn: 'root' })
export class AdminService {
constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(ADMIN_ENDPOINTS.users.getAll);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(ADMIN_ENDPOINTS.users.getById(id));
  }

  createUser(model: NewUser): Observable<void> {
    return this.http.post<void>(ADMIN_ENDPOINTS.users.create, model);
  }

  updateUser(id: number, model: NewUser): Observable<void> {
    return this.http.put<void>(ADMIN_ENDPOINTS.users.update(id), model);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(ADMIN_ENDPOINTS.users.delete(id));
  }
}
