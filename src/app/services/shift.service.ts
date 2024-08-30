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
    { name: 'Amine', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'amine@example.com', number: '123456', shiftStart: 21, shiftEnd: 9 },
    { name: 'Youssef', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'youssef@example.com', number: '234567', shiftStart: 20, shiftEnd: 8 },
    { name: 'Chouaib', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'chouaib@example.com', number: '345678', shiftStart: 22, shiftEnd: 10 },
    { name: 'Ahmed', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'ahmed@example.com', number: '456789', shiftStart: 21, shiftEnd: 9 },
    { name: 'Nabil', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'nabil@example.com', number: '567890', shiftStart: 22, shiftEnd: 10 },
    { name: 'Moussa', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'moussa@example.com', number: '678901', shiftStart: 21, shiftEnd: 9 },
    { name: 'Hussein', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'hussein@example.com', number: '789012', shiftStart: 20, shiftEnd: 8 },
    { name: 'Mohamed', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'mohamed@example.com', number: '890123', shiftStart: 22, shiftEnd: 10 },
    { name: 'TestAgent', avatar: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png', email: 'testagent@example.com', number: '999999', shiftStart: 15, shiftEnd: 23 }, // Active shift from 3 PM to 11 PM
  ];

  getCurrentAgent(): Agent | null {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    console.log(`Current time: ${currentHour}:${currentMinutes}`);

    for (const agent of this.agents) {
      console.log(`Checking agent: ${agent.name}, Shift: ${agent.shiftStart}:00 - ${agent.shiftEnd}:00`);

      if (agent.shiftStart > agent.shiftEnd) {
        if (currentHour >= agent.shiftStart || currentHour < agent.shiftEnd) {
          console.log(`Agent ${agent.name} is currently on shift.`);
          return agent;
        }
      } else {
        if (currentHour > agent.shiftStart && currentHour < agent.shiftEnd) {
          console.log(`Agent ${agent.name} is currently on shift.`);
          return agent;
        }
        if (currentHour === agent.shiftStart && currentMinutes >= 0) {
          console.log(`Agent ${agent.name} is currently on shift.`);
          return agent;
        }
        if (currentHour === agent.shiftEnd && currentMinutes < 60) {
          console.log(`Agent ${agent.name} is currently on shift.`);
          return agent;
        }
      }
    }

    console.log("No agent is currently on shift.");
    return null;
  }
}
