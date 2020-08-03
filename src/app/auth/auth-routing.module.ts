import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
