import { NgModule, APP_INITIALIZER, isDevMode, inject } from '@angular/core';
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

// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({
//       uri: 'https://localhost:7176/graphql',
//     }),
//     cache: new InMemoryCache(),
//   };
// }

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
    })
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
    provideApollo(createApollo)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
