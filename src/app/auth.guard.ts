import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: MsalService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard called');
    if (!this.authService.instance.getActiveAccount()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}