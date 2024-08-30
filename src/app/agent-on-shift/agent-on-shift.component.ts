import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftService, Agent } from '../services/shift.service'; 

@Component({
  selector: 'app-agent-on-shift',
  templateUrl: './agent-on-shift.component.html',
  styleUrls: ['./agent-on-shift.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [ShiftService] 
})
export class AgentOnShiftComponent implements OnInit {
  currentAgent: Agent | null = null;

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.currentAgent = this.shiftService.getCurrentAgent();
  }
}
