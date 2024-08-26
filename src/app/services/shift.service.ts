import { Injectable } from '@angular/core';

export interface Agent {
  name: string;
  avatar: string;
  email: string;
  number: string;
  shiftStart: number;
  shiftEnd: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private agents: Agent[] = [
    { name: 'Amine', avatar: 'amine.jpg', email: 'amine@example.com', number: '123456', shiftStart: 21, shiftEnd: 9 },
    { name: 'Youssef', avatar: 'youssef.jpg', email: 'youssef@example.com', number: '234567', shiftStart: 20, shiftEnd: 8 },
    { name: 'Chouaib', avatar: 'chouaib.jpg', email: 'chouaib@example.com', number: '345678', shiftStart: 22, shiftEnd: 10 },
  ];

  getCurrentAgent(): Agent | null {
    const now = new Date();
    const currentHour = now.getHours();

    for (const agent of this.agents) {
      if (agent.shiftStart > agent.shiftEnd) {
        if (currentHour >= agent.shiftStart || currentHour < agent.shiftEnd) {
          return agent;
        }
      } else {
        if (currentHour >= agent.shiftStart && currentHour < agent.shiftEnd) {
          return agent;
        }
      }
    }

    return null;
  }
}