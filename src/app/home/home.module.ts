import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { NbCardModule, NbContextMenuModule, NbIconModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModalPageComponent } from './profile-modal-page/profile-modal-page.component';

@NgModule({
  declarations: [HomeComponent, ProfileModalPageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    NbContextMenuModule,
    NbCardModule,
    NbIconModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  exports: [ProfileModalPageComponent],
})
export class HomeModule {}
