import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { AuthEndpoints } from "./auth-endpoints.enum";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(data: { username: string; password: string }) {
    return this.http.post(`${AuthEndpoints.Base}/${AuthEndpoints.Login}`, data, { withCredentials: true }).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  register(data: { username: string; email: string; password: string; confirmPassword: string }) {
    return this.http.post(`${AuthEndpoints.Base}/${AuthEndpoints.Register}`, data);
  }

  logout() {
    return this.http.post(`${AuthEndpoints.Base}/${AuthEndpoints.Logout}`, {}, { withCredentials: true }).pipe(
      tap(() => this.loggedIn.next(false))
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}
