import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth-service/auth.service';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showRoomsFeature: boolean = false;

  constructor(private featureFlagService: FeatureFlagService, public authService: AuthService) {}

  ngOnInit(): void {
    this.featureFlagService.flags$.subscribe(flags => {
      this.showRoomsFeature = flags['RoomsFeature'] === true;
    });
  }

  toggleLoginLogout(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    } else {
      window.location.href = '/login';
    }
  } 
}
