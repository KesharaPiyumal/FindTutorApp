import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
