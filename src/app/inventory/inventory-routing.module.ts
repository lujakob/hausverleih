import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import {InventoryCreateComponent} from "./inventory-create/inventory-create.component";
import {InventoryDetailComponent} from "./inventory-detail/inventory-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: InventoryDetailComponent,
      },
      {
        path: 'create',
        component: InventoryCreateComponent
      },
      {
        path: '',
        component: InventoryListComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
