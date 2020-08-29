import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {IonicModule} from '@ionic/angular';
import {NbCardModule, NbContextMenuModule} from '@nebular/theme';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, IonicModule, NbContextMenuModule, NbCardModule],
})
export class HomeModule {}
