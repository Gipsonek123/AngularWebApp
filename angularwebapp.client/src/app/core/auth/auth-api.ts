import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // TODO: to enum
  private apiUrl = '/api/account';

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    // TODO: no random string - to enum
    return this.http
      .post(`${this.apiUrl}/login`, data, { withCredentials: true })
      .pipe(tap(() => this.loggedIn.next(true)));
  }

  register(data: { username: string; email: string; password: string; confirmPassword: string }) {
    // TODO: no random string - to enum
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    // TODO: no random string - to enum
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.loggedIn.next(false)));
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}
