import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InventoryRoutingModule
  ],
  declarations: [InventoryListComponent, InventoryCreateComponent, InventoryDetailComponent]
})
export class InventoryModule { }
