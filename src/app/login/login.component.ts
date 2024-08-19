import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: MsalService) {}

  login() {
    // Handle login logic here
  }

  loginWithMicrosoft() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log('Login successful', result);
          // Handle successful login
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error
        }
      });
  }
  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
