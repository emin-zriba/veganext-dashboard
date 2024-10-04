import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { WazuhApiService } from '../services/wazuh-api.service';
import { CommonModule } from '@angular/common';
import { OnlineMachinesListComponent } from "../online-machines-list/online-machines-list.component";
import { AgentOnShiftComponent } from "../agent-on-shift/agent-on-shift.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, OnlineMachinesListComponent, AgentOnShiftComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  alerts: any[] = [];
  incidentsCount: number = 0;
  criticalAlertsCount: number = 0;
  incidentsChange: number = -15; 
  alertsChange: number = -10; 

  constructor(
    private msalService: MsalService,
    private router: Router,
    private wazuhApiService: WazuhApiService  
  ) {}

  ngOnInit() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.username = accounts[0].username.split("@")[0];
    }

    this.wazuhApiService.getAlerts().subscribe(data => {
      console.log('Alerts:', data);
      this.alerts = data;
      this.criticalAlertsCount = data.length; // Assuming each alert is critical
    });

    this.wazuhApiService.getIncidents().subscribe(data => {
      console.log('Incidents:', data);
      this.incidentsCount = data.length; // Assuming data is an array of incidents
    });
  }

  async logout() {
    await this.msalService.instance.initialize();
    await this.msalService.logout();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}