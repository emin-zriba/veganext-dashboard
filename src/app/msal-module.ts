import { NgModule } from '@angular/core';
import { MsalModule, MsalService, MSAL_INSTANCE, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';

export function MSALInstanceFactory(): PublicClientApplication {
  const config = {
    auth: {
      clientId: 'a53159c0-b506-4ccf-a935-f0b0601c4b0d',
      authority: 'https://login.microsoftonline.com/b9a69ceb-1933-4949-803a-732baf92ddf0',
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  };
  return new PublicClientApplication(config);
}

@NgModule({
  imports: [MsalModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ]
})
export class MsalProviderModule {}

