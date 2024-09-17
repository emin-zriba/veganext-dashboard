import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WazuhApiService } from '../services/wazuh-api.service';

interface Machine {
  ip: string;
  hostname: string;
  os: string;
  status: string;
}

@Component({
  selector: 'app-online-machines-list',
  templateUrl: './online-machines-list.component.html',
  styleUrls: ['./online-machines-list.component.css'],
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatTableModule, HttpClientModule],
})
export class OnlineMachinesListComponent implements OnInit {
  machines: Machine[] = [];
  displayedColumns: string[] = ['ip', 'hostname', 'os', 'status'];

  constructor(private wazuhApiService: WazuhApiService) {}

  ngOnInit(): void {
    this.fetchMachines();
  }

  fetchMachines(): void {
    this.wazuhApiService.getmachines().subscribe(
      (data: Machine[]) => {
        this.machines = data;
      },
      (error) => {
        console.error('Error fetching machines', error);
      }
    );
  }

  viewMachine(machine: Machine) {
    console.log(`Viewing machine: ${machine.hostname}`);
  }

  restartMachine(machine: Machine) {
    console.log(`Restarting machine: ${machine.hostname}`);
  }
}