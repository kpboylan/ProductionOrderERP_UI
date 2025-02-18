import { Component } from '@angular/core';
import { AuthService } from '../login/auth-service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}  // Inject AuthService

  // Toggle between Login and Logout
  toggleLoginLogout(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();  // Log out if logged in
    } else {
      window.location.href = '/login';  // Redirect to the login page if not logged in
    }
  }
}
