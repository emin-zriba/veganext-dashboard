import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MsalService } from '@azure/msal-angular';
import { MsalProviderModule } from './msal-module';

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

  constructor(private msalService: MsalService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.msalService.instance.initialize();
    } catch (error) {
      console.error('MSAL initialization failed', error);
    }
  }
}