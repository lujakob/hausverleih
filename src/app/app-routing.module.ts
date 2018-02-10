import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    loadChildren: 'app/inventory/inventory.module#InventoryModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
