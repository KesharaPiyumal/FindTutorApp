import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { HomeService } from '../home.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StatusCodes, ToastStatus, UserType } from '../../@common/enum';
import { ToastService } from '../../@common/services/toast.service';

@Component({
  selector: 'app-view-tutor-profile',
  templateUrl: './view-tutor-profile.component.html',
  styleUrls: ['./view-tutor-profile.component.scss'],
})
export class ViewTutorProfileComponent implements OnInit {
  tutorData: any;
  studentData: any;
  tutorRatings = [
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
    { id: 5, selected: false },
  ];
  selectedRate: any;
  ratingLoading = false;
  tutorLoading = false;
  studentLoading = false;
  constructor(
    public params: NavParams,
    public modalController: ModalController,
    public homeService: HomeService,
    private callNumber: CallNumber,
    public alertController: AlertController,
    public toastService: ToastService
  ) {
    this.tutorData = this.params.data['tutor'];
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user['type'] === UserType.Student) {
        this.studentData = user;
      }
    }
  }

  ngOnInit() {
    this.getAllStudents();
  }

  dismissModal(bool?) {
    if (bool) {
      this.modalController.dismiss({}, 'set').then((r) => {});
    } else {
      this.modalController.dismiss(null, 'cancel').then((r) => {});
    }
  }

  selectionStarRating(rateIndex: number) {
    this.selectedRate = this.tutorRatings[rateIndex];
    this.tutorRatings.forEach((item) => {
      item['selected'] = this.tutorRatings[rateIndex]['id'] === item['id'];
    });
    for (let x = 0; x < rateIndex + 1; x++) {
      this.tutorRatings[x]['selected'] = true;
    }
    this.presentAlertConfirm().then((r) => {});
  }

  call() {
    this.callNumber
      .callNumber(this.tutorData['mobileNumber'], true)
      .then((res) => console.log('Launched dialer!', res))
      .catch((err) => console.log('Error launching dialer', err));
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'FindTutor Asks,',
      message: 'Are you sure to rate now?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.rateTutor();
          },
        },
      ],
    });
    await alert.present();
  }

  rateTutor() {
    this.ratingLoading = true;
    let rateData = {};
    if (this.selectedRate && this.tutorData && this.studentData) {
      rateData = {
        studentId: this.studentData['userId'],
        tutorId: this.tutorData['id'],
        rateId: this.selectedRate['id'],
      };
    }
    this.homeService.rateTutor(rateData).subscribe(
      (response) => {
        this.ratingLoading = false;
        if (response.statusCode === StatusCodes.Success) {
          this.toastService.showToast(ToastStatus.Success, 'Success!', response.message);
          this.getAllTutorsWithoutFiltering();
        }
      },
      (error) => {
        this.ratingLoading = false;
      }
    );
  }

  getAllTutorsWithoutFiltering() {
    let user;
    if (localStorage.getItem('currentUser')) {
      user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.tutorLoading = true;
    this.homeService.geAllTutors({ lat: user['latitude'], lng: user['longitude'] }).subscribe(
      (response) => {
        this.tutorLoading = false;
        response.data.forEach((item) => {
          if (item.id === this.tutorData['id']) {
            this.tutorData = item;
          }
        });
        this.setRating(this.tutorData);
        this.checkRatingStatus(this.tutorData);
      },
      (error) => {
        this.tutorLoading = false;
      }
    );
  }

  checkRatingStatus(tutor) {
    if (tutor['rating'] > 0 && tutor['rating'] <= 2) {
      tutor['ratingStatus'] = 'danger';
    } else if (tutor['rating'] > 2 && tutor['rating'] <= 3) {
      tutor['ratingStatus'] = 'warning';
    } else if (tutor['rating'] > 3 && tutor['rating'] <= 5) {
      tutor['ratingStatus'] = 'success';
    } else {
      tutor['ratingStatus'] = 'basic';
    }
  }

  setRating(tutor) {
    if (tutor['studenttutorrates']['length'] > 0) {
      let ratedCount = 0;
      let fullRating = 0;
      tutor['studenttutorrates'].forEach((stTutorRate) => {
        ratedCount++;
        fullRating = fullRating + stTutorRate['rateId'];
      });
      tutor['rating'] = (fullRating / ratedCount).toFixed(1);
    } else {
      tutor['rating'] = 0;
    }
  }

  getAllStudents() {
    this.studentLoading = true;
    this.homeService.getAllStudents().subscribe(
      (response) => {
        this.studentLoading = false;
        if (response.statusCode === StatusCodes.Success) {
          response.data.forEach((item) => {
            if (this.studentData['userId'] === item['id']) {
              item['studenttutorrates'].forEach((stTutorRate) => {
                if (stTutorRate['tutorId'] === this.tutorData['id']) {
                  let rateIndex;
                  this.tutorRatings.forEach((item) => {
                    if (stTutorRate['rateId'] === item['id']) {
                      item['selected'] = true;
                      rateIndex = this.tutorRatings.indexOf(item);
                    }
                  });
                  for (let x = 0; x < rateIndex + 1; x++) {
                    this.tutorRatings[x]['selected'] = true;
                  }
                }
              });
            }
          });
        }
      },
      (error) => {
        this.studentLoading = false;
      }
    );
  }
}
