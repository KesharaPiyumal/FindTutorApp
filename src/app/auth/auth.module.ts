import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent],
  imports: [CommonModule, AuthRoutingModule, IonicModule, ReactiveFormsModule],
})
export class AuthModule {}
