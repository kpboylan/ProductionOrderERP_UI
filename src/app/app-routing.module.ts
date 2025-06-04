import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductionOrderComponent } from './production-order/production-order.component';
import { MaterialComponent } from './material/material.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UserComponent } from './user/user.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth-guard/auth.gaurd';
import { RoleGuard } from './login/role-guard/role-guard';
import { MaterialFormComponent } from './material/material-form/material-form.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { RoomTemperatureComponent } from './room/room-temperature/room-temperature.component';
import { RoomHumidityComponent } from './room/room-humidity/room-humidity.component';
import { AccessDeniedComponent } from './login/access-denied/access-denied.component';
import { ProdOrderAddComponent } from './production-order/production-order-form/prod-order-add/prod-order-add.component';
import { GraphqlProductsComponent } from './graphql/graphql-products/graphql-products.component';
import { FeatureFlagGuard } from './feature-flag/feature-flag.guard';

const routes: Routes = [
  {path: 'products', component: ProductComponent},
  {path: 'productionOrders', component: ProductionOrderComponent, canActivate: [AuthGuard]},
  {path: 'addProductionOrder', component: ProdOrderAddComponent, canActivate: [AuthGuard]},
  {path: 'roomTemperature', component: RoomTemperatureComponent, canActivate: [AuthGuard, FeatureFlagGuard]},
  {path: 'roomHumidity', component: RoomHumidityComponent, canActivate: [AuthGuard, FeatureFlagGuard]},
  {path: 'materials', component: MaterialComponent, canActivate: [AuthGuard]},
  {path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserComponent},
  {path: 'graphqlProducts', component: GraphqlProductsComponent},
  {
    path: 'addProduct', 
    component: ProductFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Support', 'Admin'] }
  },
  {path: 'editProduct/:id', component: ProductEditComponent},
  //{path: 'addUser', component: UserFormComponent},
  {path: 'editUser/:id', component: UserEditComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {
    path: 'addMaterial', 
    component: MaterialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Support', 'Admin'] }
  },
  {path: 'editMaterial/:id', component: MaterialEditComponent},
  {path: 'accessDenied', component: AccessDeniedComponent},
  {
    path: 'addUser',
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Support', 'Admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
