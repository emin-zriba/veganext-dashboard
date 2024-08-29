import { NgModule } from '@angular/core';
import { MsalModule, MsalService, MSAL_INSTANCE, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '08c3208a-f152-47f9-ba68-8d413cf92624', // Replace with your Azure AD client ID
      authority: 'https://login.microsoftonline.com/1b87de2a-bf6b-495c-94a4-0a3291bad360', // Replace with your Azure AD tenant ID
      redirectUri: 'http://localhost:4200'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false
    }
  });
}
@NgModule({
    imports: [
      MsalModule.forRoot(
        MSALInstanceFactory(),
        {} as MsalGuardConfiguration,
        {} as MsalInterceptorConfiguration
      )
    ],
    exports: [MsalModule]
  })
  export class MsalProviderModule {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        console.log('MsalProviderModule loaded in browser.');
      }
    }
  }
