import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: MsalService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.instance.getActiveAccount() != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}