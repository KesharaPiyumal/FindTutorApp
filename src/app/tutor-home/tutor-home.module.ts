import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorHomeComponent } from './tutor-home.component';
import { TutorHomeRoutingModule } from './tutor-home-routing.module';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonSharedModule } from '../@common/common-shared/common-shared.module';

@NgModule({
  declarations: [TutorHomeComponent],
  imports: [CommonModule, TutorHomeRoutingModule, IonicModule, FontAwesomeModule, ReactiveFormsModule, CommonSharedModule],
})
export class TutorHomeModule {}
