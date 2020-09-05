import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../home.service';
import { TutorHomeService } from '../../tutor-home/tutor-home.service';
import { UserType } from '../../@common/enum';

@Component({
  selector: 'app-profile-modal-page',
  templateUrl: './profile-modal-page.component.html',
  styleUrls: ['./profile-modal-page.component.scss'],
})
export class ProfileModalPageComponent implements OnInit {
  user: any;
  tutor: any;
  student: any;
  profileForm: FormGroup;
  tutorLoading = false;
  constructor(public modalController: ModalController, public formBuilder: FormBuilder, public tutorHomeService: TutorHomeService) {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      if (this.user['type'] === UserType.Tutor) {
        this.tutor = this.user;
      } else {
        this.student = this.user;
      }
    }
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      about: [''],
    });
  }

  dismissModal(bool?) {
    if (bool) {
      this.modalController.dismiss({}, 'set').then((r) => {});
    } else {
      this.modalController.dismiss({}, 'cancel').then((r) => {});
    }
  }

  uploadFile(event: Event) {}

  updateData() {
    if (this.tutor) {
      this.tutorLoading = true;
      const updateTutorData = {
        about: this.profileForm.get('about').value,
        tutorId: this.tutor['userId'],
      };
      this.tutorHomeService.updateTutorData(updateTutorData).subscribe(
        (response) => {
          this.tutorLoading = false;
        },
        (error) => {
          this.tutorLoading = false;
        }
      );
    }
  }
}
