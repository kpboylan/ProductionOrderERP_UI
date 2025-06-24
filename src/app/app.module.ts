import { NgModule, APP_INITIALIZER, isDevMode, inject } from '@angular/core';
import { LogLevel } from '@azure/msal-browser';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalRedirectComponent,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG
} from '@azure/msal-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, TypePolicies  } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductionOrderComponent } from './production-order/production-order.component';
import { MaterialComponent } from './material/material.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UserComponent } from './user/user.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './login/auth-interceptor/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { MaterialFormComponent } from './material/material-form/material-form.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { HeaderNewComponent } from './header-new/header-new.component';
import { ConfigService } from './config.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RoomTemperatureComponent } from './room/room-temperature/room-temperature.component';
import { RoomHumidityComponent } from './room/room-humidity/room-humidity.component';
import { AccessDeniedComponent } from './login/access-denied/access-denied.component';
import { ProdOrderAddComponent } from './production-order/production-order-form/prod-order-add/prod-order-add.component';
import { ProdOrderEditComponent } from './production-order/production-order-form/prod-order-edit/prod-order-edit.component';
import { GraphqlProductsComponent } from './graphql/graphql-products/graphql-products.component';
import { ProductService } from './graphql/product.service';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig().toPromise().then((config) => {
    configService.setConfig(config); // Save the config data
  });
}

export function createApollo(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({ uri: 'https://localhost:7176/graphql' }),
    cache: new InMemoryCache(),
  };
}

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: '2740e754-a106-45e1-8d32-d1b01042f761',
      authority: 'https://login.microsoftonline.com/039488be-782d-40be-9b8d-44a8fa151859',
      redirectUri: '/'
    },
    system: { // <-- Add the system property
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return; // Do not log PII (Personally Identifiable Information) in production
          }
          switch (level) {
            case LogLevel.Error:
              console.error("[MSAL] E: ", message); // Prefix for easy identification
              return;
            case LogLevel.Info:
              console.info("[MSAL] I: ", message);
              return;
            case LogLevel.Verbose:
              console.debug("[MSAL] V: ", message); // Use console.debug for verbose output
              return;
            case LogLevel.Warning:
              console.warn("[MSAL] W: ", message);
              return;
          }
        },
        piiLoggingEnabled: false, // Set to true only for very detailed debugging, but be very careful with sensitive info
        logLevel: LogLevel.Verbose // <-- Set this to Verbose
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    'https://localhost:7034',
    //'https://material-api-staging-dpf8a8agbrfzgdce.westeurope-01.azurewebsites.net',
    ['api://2740e754-a106-45e1-8d32-d1b01042f761/Access_as_User']
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

  

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect as InteractionType.Redirect, // Explicitly cast here
    authRequest: {
      scopes: ['user.read']  // Or your custom scopes like `api://<client-id>/.default`
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ProductionOrderComponent,
    MaterialComponent,
    InventoryComponent,
    UserComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductEditComponent,
    UserListComponent,
    UserEditComponent,
    UserFormComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MaterialEditComponent,
    MaterialFormComponent,
    MaterialListComponent,
    HeaderNewComponent,
    RoomTemperatureComponent,
    RoomHumidityComponent,
    AccessDeniedComponent,
    ProdOrderAddComponent,
    ProdOrderEditComponent,
    GraphqlProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MsalModule.forRoot(
  MSALInstanceFactory(),
  MSALGuardConfigFactory(),
  MSALInterceptorConfigFactory()
)
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
        {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    provideApollo(createApollo)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
