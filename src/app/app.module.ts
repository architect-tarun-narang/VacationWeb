import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../app/core/navbar/navbar.component';
import { AppInitializerService } from '../app/app-initializer.service';
import { environment } from 'src/environments/environment';
import { ConstantsMaster } from './shared/constants/constantsMaster';

import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';

import * as auth from './auth-config.json';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: auth.credentials.clientId,
      authority: 'https://login.microsoftonline.com/' + auth.credentials.tenantId,
      redirectUri: auth.configuration.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  });
}

/**
 * MSAL Angular will automatically retrieve tokens for resources 
 * added to protectedResourceMap. For more info, visit: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */

//  export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {

//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.trainingTypes, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeTrainingsDetails, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.addEmployeeTraining, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.deleteEmployeeTraining, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);  
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeInformationById, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeLeavesDetailsById, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeLeavesDetails, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeWFHDays, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.addEmployeeWFHDays, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.deleteEmployeeWFHDays, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.addEmployeeLeaves, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.deleteEmployeeLeaves, ["api://c0c072a3-eb2c-40f7-887a-8cb56db31c8a/access_as_user"]);
//   protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
//   return {
//     interactionType: InteractionType.Redirect,//InteractionType.Redirect
//     protectedResourceMap
//   };
// }

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {

  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.trainingTypes, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeTrainingsDetails, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.addEmployeeTraining, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.deleteEmployeeTraining, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);  
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeInformationById, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeLeavesDetailsById, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeLeavesDetails, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.employeeWFHDays, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.addEmployeeWFHDays, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.deleteEmployeeWFHDays, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.addEmployeeLeaves, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set(environment.settings.applicationBaseUrl+"/"+ConstantsMaster.apiEndPoints.lookup.deleteEmployeeLeaves, ["api://4be06af8-fdd7-40be-b91e-74beb7f5701f/access_as_user"]);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  return {
    interactionType: InteractionType.Redirect,//InteractionType.Redirect
    protectedResourceMap
  };
}


/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { interactionType: InteractionType.Redirect };
}


// export function intializeApp(appInitalizerService: AppInitializerService): Function {
//   debugger
//   return () => appInitalizerService.initializeApp();
// }

export function intializeGraphApp(appInitalizerService: AppInitializerService): Function {
  return () => appInitalizerService.initializeGraphProfile();
  }
  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    MsalModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: intializeGraphApp,
      multi: true,
      deps: [AppInitializerService]
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: intializeApp,
    //   multi: true,
    //   deps: [AppInitializerService]
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    AppInitializerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
