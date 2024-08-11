import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

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
  imports: [MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatTableModule]
})
export class OnlineMachinesListComponent {
  machines: Machine[] = [
    { ip: '192.168.1.1', hostname: 'Machine-A', os: 'Windows 10', status: 'Online' },
    { ip: '192.168.1.2', hostname: 'Machine-B', os: 'Linux', status: 'Online' },
    { ip: '192.168.1.3', hostname: 'Machine-C', os: 'macOS', status: 'Offline' },
    { ip: '192.168.1.4', hostname: 'Machine-D', os: 'Windows Server', status: 'Online' },
    { ip: '192.168.1.5', hostname: 'Machine-E', os: 'Ubuntu', status: 'Online' },
  ];

  displayedColumns: string[] = ['ip', 'hostname', 'os', 'status', 'actions'];

  viewMachine(machine: Machine) {
    console.log(`Viewing machine: ${machine.hostname}`);
  }

  restartMachine(machine: Machine) {
    console.log(`Restarting machine: ${machine.hostname}`);
  }
}