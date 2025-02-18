import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
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

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig().toPromise().then((config) => {
    configService.setConfig(config); // Save the config data
  });
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
    HeaderNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
