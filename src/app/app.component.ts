import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MsalProviderModule } from './msal-instance';

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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.msalService.instance.initialize();
      this.checkAccount();
    }
  }

  checkAccount(): void {
    this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }
}