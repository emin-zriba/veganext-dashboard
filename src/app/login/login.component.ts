import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { MsalProviderModule } from '../msal-module';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,MsalProviderModule],
  providers: [AuthGuard],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: MsalService) {}
  loginWithMicrosoft() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log('Login successful', result);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }
}





