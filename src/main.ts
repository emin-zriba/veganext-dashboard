import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { MsalModule, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { MSALInstanceFactory } from './app/msal-instance';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 

const guardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
};

const interceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  ])
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(MsalModule.forRoot(MSALInstanceFactory(), guardConfig, interceptorConfig)),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));