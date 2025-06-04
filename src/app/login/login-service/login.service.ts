// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../login-model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://localhost:7283/api/Auth/login';

  constructor(private http: HttpClient) {}

  login(loginData: LoginModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData);
  }
}
