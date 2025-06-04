import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FeatureFlagService } from 'src/app/feature-flag/feature-flag.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private featureFlagService: FeatureFlagService) {}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; 
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; 
      return expirationTime < Date.now(); 
    } catch (e) {
      return true; 
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded["role"]; // Match the exact claim name you used in your token
    } catch (e) {
      return null;
    }
  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.featureFlagService.clearFlags();
    this.router.navigate(['/login']);
  }
}
