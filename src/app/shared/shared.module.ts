import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "./loading/loading.component";
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LoadingComponent],
  exports: [
    LoadingComponent,
    MaterialModule
  ]
})
export class SharedModule { }
