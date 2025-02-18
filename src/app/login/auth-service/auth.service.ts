// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Get the token from localStorage or sessionStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; // If no token is found, it's considered expired
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return expirationTime < Date.now(); // Token is expired if expiration time is less than current time
    } catch (e) {
      return true; // If there's an error decoding the token, consider it expired
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  // Logout and redirect to login page
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
