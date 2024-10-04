import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WazuhApiService } from '../services/wazuh-api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
  imports: [MatIconModule, MatDividerModule, MatButtonModule, CommonModule, MatTableModule, HttpClientModule, MatPaginatorModule],
})
export class OnlineMachinesListComponent implements OnInit, AfterViewInit {
  machines: Machine[] = [];
  displayedColumns: string[] = ['ip', 'hostname', 'os', 'status'];
  dataSource = new MatTableDataSource<Machine>(this.machines);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private wazuhApiService: WazuhApiService) {}

  ngOnInit(): void {
    this.fetchMachines();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchMachines(): void {
    this.wazuhApiService.getMachines().subscribe(
      (data: Machine[]) => {
        this.machines = data;
        this.dataSource.data = this.machines;
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