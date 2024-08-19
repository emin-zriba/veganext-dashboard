import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig as importedAppConfig} from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MsalService } from '@azure/msal-angular'
import { ApplicationConfig } from '@angular/core';
import { Location } from '@angular/common';
//import { msalConfig } from './app/msal-config'; // wherever your msalConfig is defined
import { PublicClientApplication } from '@azure/msal-browser';
import { inject } from '@angular/core';


const msalConfig = {
  auth: {
    clientId: 'a53159c0-b506-4ccf-a935-f0b0601c4b0d', // Replace with your client ID
    authority: 'https://login.microsoftonline.com/b9a69ceb-1933-4949-803a-732baf92ddf0', // Replace with your tenant ID
    redirectUri: 'http://localhost:4200', // This should match your app registration's redirect URI
  },
  // other configurations
};

// Create an instance of PublicClientApplication
const msalInstance = new PublicClientApplication(msalConfig);
// Function to inject dependencies and create MsalService
function createMsalService() {
  const location = inject(Location); // Get Location from Angular's DI
  return new MsalService(msalInstance, location);
}
// AppConfig with providers
const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MsalService,
      useFactory: createMsalService,
    },
    Location,
  ],
};

bootstrapApplication(AppComponent, appConfig);