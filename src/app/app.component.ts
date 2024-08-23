import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MsalProviderModule } from './msal-instance';
import { BrowserUtils } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    MsalProviderModule
  ]
})
export class AppComponent implements OnInit {
  title = 'vega-next-dashboard';
  isAuthenticated = false;
  username = '';

  constructor(
    private msalService: MsalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        await this.msalService.instance.initialize(); 
        await this.handleRedirectAndCheckAccount();
      } catch (error) {
        console.error('MSAL initialization failed:', error);
      }
    }
  }

  private async handleRedirectAndCheckAccount(): Promise<void> {
    if (!BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()) {
      try {
        await this.msalService.instance.handleRedirectPromise();
        this.checkAccount();
      } catch (error) {
        console.error('Error handling redirect:', error);
      }
    }
  }

  private checkAccount(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    this.isAuthenticated = accounts.length > 0;

    if (this.isAuthenticated) {
      this.username = accounts[0].username;
    }
  }

  login(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.msalService.loginRedirect();
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.msalService.logoutRedirect();
    }
  }
}
