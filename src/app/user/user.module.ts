import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { SharedModule } from "../shared/shared.module";
import {DeleteAssetDialog, UserProfileComponent} from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [UserLoginComponent, UserProfileComponent, UserRegisterComponent, DeleteAssetDialog],
  entryComponents: [DeleteAssetDialog]
})
export class UserModule { }
