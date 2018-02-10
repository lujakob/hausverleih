import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Route[] = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory',
    loadChildren: 'app/inventory/inventory.module#InventoryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
