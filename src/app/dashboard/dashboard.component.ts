import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineMachinesListComponent } from '../online-machines-list/online-machines-list.component';
import { AgentOnShiftComponent } from '../agent-on-shift/agent-on-shift.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, OnlineMachinesListComponent, AgentOnShiftComponent]
})
export class DashboardComponent { }
