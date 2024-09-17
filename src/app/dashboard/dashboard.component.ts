import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineMachinesListComponent } from '../online-machines-list/online-machines-list.component';
import { AgentOnShiftComponent } from '../agent-on-shift/agent-on-shift.component';
import { MsalService } from '@azure/msal-angular';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { WazuhApiService } from '../services/wazuh-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, OnlineMachinesListComponent, AgentOnShiftComponent, HttpClientModule], 
  providers: [WazuhApiService] 
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private msalService: MsalService,
    private router: Router,
    private wazuhApiService: WazuhApiService  
  ) {}

  ngOnInit() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      //this.username = accounts[0].username; // this return the email of the first account in the array of accounts and i want only the the first part of the email which is the username
      this.username = accounts[0].username.split("@")[0];
    }

    this.wazuhApiService.getAlerts().subscribe(data => {
      console.log('Alerts:', data);
    });
  }

  async logout() {
    await this.msalService.instance.initialize();
    await this.msalService.logout();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
