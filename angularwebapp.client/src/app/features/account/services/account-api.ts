import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ACCOUNT_ENDPOINTS } from '@account/api/account-endpoints';
import { LoginResponse } from '@account/models/responses/login-response.model';
import { LoginRequest } from '@account/models/requests/login-request.model';
import { RegisterRequest } from '@account/models/requests/register-request.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(ACCOUNT_ENDPOINTS.login, data, { withCredentials: true })
      .pipe(
        tap(result => {
          this.loggedIn.next(true);
          localStorage.setItem('role', result.role);
        })
    );
  }

  register(data: RegisterRequest) {
    return this.http.post(ACCOUNT_ENDPOINTS.register, data);
  }

  logout() {
    return this.http.post(ACCOUNT_ENDPOINTS.logout, {}, { withCredentials: true })
      .pipe(
        tap(() => this.loggedIn.next(false))
    );
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}
