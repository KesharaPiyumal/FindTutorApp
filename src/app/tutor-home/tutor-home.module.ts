import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorHomeComponent } from './tutor-home.component';
import { TutorHomeRoutingModule } from './tutor-home-routing.module';

@NgModule({
  declarations: [TutorHomeComponent],
  imports: [CommonModule, TutorHomeRoutingModule],
})
export class TutorHomeModule {}
