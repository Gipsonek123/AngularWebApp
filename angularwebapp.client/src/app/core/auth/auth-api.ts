import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/account';

  constructor(private http: HttpClient) { }

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, data, {
      withCredentials: true
    });
  }

  register(data: any) {
    console.log("test rejestracja");
    console.log(this.apiUrl);
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
