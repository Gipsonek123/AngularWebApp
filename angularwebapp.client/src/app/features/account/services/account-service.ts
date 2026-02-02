import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AccountApi } from '@account/api/account-api';
import { LoginRequest } from '@account/models/requests/login-request.model';
import { RegisterRequest } from '@account/models/requests/register-request.model';
import { UserResponse } from '@account/models/responses/user-response.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private currentUser$ = new BehaviorSubject<UserResponse | null>(null);

  constructor(private accountApi: AccountApi) { }

  loadCurrentUser(): Observable<UserResponse> {
    return this.accountApi.currentUser()
      .pipe(
        tap(user => this.currentUser$.next(user))
      );
  }

  getCurrentUser(): Observable<UserResponse | null> {
    return this.currentUser$.asObservable();
  }

  getCurrentUserId(): number | null {
    return this.currentUser$.value?.id ?? null;
  }

  getRole(): string | null {
    return this.currentUser$.value?.role ?? null;
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }

  login(data: LoginRequest): Observable<UserResponse> {
    return this.accountApi.login(data)
      .pipe(
        switchMap(() => this.loadCurrentUser())
      );
  }

  logout(): Observable<void> {
    return this.accountApi.logout()
      .pipe(
        tap(() => this.currentUser$.next(null))
      );
  }

  register(data: RegisterRequest): Observable<void> {
    return this.accountApi.register(data);
  }
}
