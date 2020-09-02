import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-tutor-profile',
  templateUrl: './view-tutor-profile.component.html',
  styleUrls: ['./view-tutor-profile.component.scss'],
})
export class ViewTutorProfileComponent implements OnInit {
  tutorData: any;
  constructor(public params: NavParams) {
    this.tutorData = this.params.data['tutor'];
  }

  ngOnInit() {}
}
