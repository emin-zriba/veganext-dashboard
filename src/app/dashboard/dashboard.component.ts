import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineMachinesListComponent } from '../online-machines-list/online-machines-list.component';
import { AgentOnShiftComponent } from '../agent-on-shift/agent-on-shift.component';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, OnlineMachinesListComponent, AgentOnShiftComponent]
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  ngOnInit() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.username = accounts[0].username;
    }
  }

  async logout() {
    await this.msalService.instance.initialize();
    await this.msalService.logout();
    this.router.navigate(['/login']);
  }
}
