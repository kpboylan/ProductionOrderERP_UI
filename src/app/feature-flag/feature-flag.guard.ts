import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagGuard implements CanActivate {

  constructor(
    private featureFlagService: FeatureFlagService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.featureFlagService.flags$.pipe(
      map(flags => {
        const hasAccess = flags['RoomsFeature'] === true;
        if (!hasAccess) {
          this.router.navigate(['/home']); 
        }
        return hasAccess;
      })
    );
  }
}