import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPPageRoutingModule } from './login-p-routing.module';

import { LoginPPage } from './login-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPPageRoutingModule
  ],
  declarations: [LoginPPage]
})
export class LoginPPageModule {}
