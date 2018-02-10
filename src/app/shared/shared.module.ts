import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "./loading/loading.component";
import { MaterialModule } from "./material.module";
import {FirestoreService} from "./services/firestore.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [FirestoreService],
  declarations: [LoadingComponent],
  exports: [
    LoadingComponent,
    MaterialModule
  ]
})
export class SharedModule { }
