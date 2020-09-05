import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModalPageComponent } from './profile-modal-page/profile-modal-page.component';
import { FilterModalPageComponent } from './filter-modal-page/filter-modal-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewTutorProfileComponent } from './view-tutor-profile/view-tutor-profile.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';

@NgModule({
  declarations: [HomeComponent, ProfileModalPageComponent, FilterModalPageComponent, ViewTutorProfileComponent, PopoverMenuComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    NbContextMenuModule,
    NbCardModule,
    NbIconModule,
    FontAwesomeModule,
    HttpClientModule,
    NbButtonModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbInputModule,
    NbBadgeModule,
    NbSpinnerModule,
    NbProgressBarModule,
  ],
  exports: [ProfileModalPageComponent, FilterModalPageComponent, ViewTutorProfileComponent, PopoverMenuComponent],
  providers: [CallNumber],
})
export class HomeModule {}
