import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatToolbar, MatInput]
})
export class NavbarComponent { 
  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  async logout() {
    // i can still see a token in session storage after logout , i need to clear it
    await this.msalService.instance.initialize();
    await this.msalService.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/'
    });
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
