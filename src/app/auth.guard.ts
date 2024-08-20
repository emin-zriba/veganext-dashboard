import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private msalService: MsalService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;

    if (isAuthenticated) {
      return true;
    } else {
      this.msalService.loginRedirect({
        scopes: ['user.read'],
        redirectUri: '/' 
      });
      return false;
    }
  }
}
