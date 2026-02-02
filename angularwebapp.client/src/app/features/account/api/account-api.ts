import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ACCOUNT_ENDPOINTS } from '@account/api/account-endpoints';
import { LoginRequest } from '@account/models/requests/login-request.model';
import { RegisterRequest } from '@account/models/requests/register-request.model';
import { UserResponse } from '@account/models/responses/user-response.model';

@Injectable({ providedIn: 'root' })
export class AccountApi {

  constructor(private http: HttpClient) { }

  currentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      ACCOUNT_ENDPOINTS.currentUser,
      { withCredentials: true }
    );
  }

  login(data: LoginRequest): Observable<void> {
    return this.http.post<void>(
      ACCOUNT_ENDPOINTS.login,
      data,
      { withCredentials: true }
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      ACCOUNT_ENDPOINTS.logout,
      {},
      { withCredentials: true }
    );
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      ACCOUNT_ENDPOINTS.register,
      data
    );
  }

}
