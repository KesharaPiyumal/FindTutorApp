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
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModalPageComponent } from './profile-modal-page/profile-modal-page.component';
import { FilterModalPageComponent } from './filter-modal-page/filter-modal-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewTutorProfileComponent } from './view-tutor-profile/view-tutor-profile.component';

@NgModule({
  declarations: [HomeComponent, ProfileModalPageComponent, FilterModalPageComponent, ViewTutorProfileComponent],
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
  ],
  exports: [ProfileModalPageComponent, FilterModalPageComponent, ViewTutorProfileComponent],
})
export class HomeModule {}
