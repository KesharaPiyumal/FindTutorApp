import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HomeService } from '../home.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-view-tutor-profile',
  templateUrl: './view-tutor-profile.component.html',
  styleUrls: ['./view-tutor-profile.component.scss'],
})
export class ViewTutorProfileComponent implements OnInit {
  tutorData: any;
  tutorRatings = [
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
    { id: 5, selected: false },
  ];
  constructor(
    public params: NavParams,
    public modalController: ModalController,
    public homeService: HomeService,
    private callNumber: CallNumber
  ) {
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

  selectionStarRating(rateIndex: number) {
    this.tutorRatings.forEach((item) => {
      item['selected'] = this.tutorRatings[rateIndex]['id'] === item['id'];
    });
    for (let x = 0; x < rateIndex + 1; x++) {
      this.tutorRatings[x]['selected'] = true;
    }
  }

  call() {
    this.callNumber
      .callNumber('18001010101', true)
      .then((res) => console.log('Launched dialer!', res))
      .catch((err) => console.log('Error launching dialer', err));
  }
}
