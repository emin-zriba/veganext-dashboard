import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNavList } from '@angular/material/list';  

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, MatNavList]
})
export class SidebarComponent { }
