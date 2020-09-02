import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-tutor-profile',
  templateUrl: './view-tutor-profile.component.html',
  styleUrls: ['./view-tutor-profile.component.scss'],
})
export class ViewTutorProfileComponent implements OnInit {
  tutorData: any;
  constructor(public params: NavParams, public modalController: ModalController) {
    this.tutorData = this.params.data['tutor'];
  }

  ngOnInit() {}

  dismissModal(bool?) {
    if (bool) {
      this.modalController.dismiss({}, 'set').then((r) => {});
    } else {
      this.modalController.dismiss(null, 'cancel').then((r) => {});
    }
  }
}
