import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import {NbButtonModule, NbInputModule} from '@nebular/theme';

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent],
    imports: [CommonModule, AuthRoutingModule, IonicModule, ReactiveFormsModule, NbInputModule, NbButtonModule],
})
export class AuthModule {}
