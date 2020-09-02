import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import config from '../fireBaseConfig';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { ModalLocationPageComponent } from '../auth/register-page/modal-location-page/modal-location-page.component';
import { ProfileModalPageComponent } from './profile-modal-page/profile-modal-page.component';
import { FilterModalPageComponent } from './filter-modal-page/filter-modal-page.component';
import { ViewTutorProfileComponent } from './view-tutor-profile/view-tutor-profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Auth',
      url: '/auth/',
      icon: 'mail',
    },
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail',
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane',
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart',
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive',
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash',
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  items = [
    { title: 'Profile', icon: 'person-outline', data: 1 },
    { title: 'Log out', icon: 'log-out-outline', data: 2 },
  ];
  tutorList = [];
  tutorLoading = false;
  constructor(
    private menu: MenuController,
    private nbMenuService: NbMenuService,
    private http: HttpClient,
    public homeService: HomeService,
    public router: Router,
    public modalController: ModalController
  ) {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  ngOnInit() {
    this.menuItemClicked();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getAllTutors();
  }

  menuItemClicked() {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { data } }) => data)
      )
      .subscribe((dataId) => {
        if (dataId === 1) {
          this.openProfileModal().then((r) => {});
        } else if (dataId === 2) {
          if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
          }
          this.router.navigate(['auth/login']).then((r) => {});
        }
      });
  }

  async openMenu() {
    await this.menu.open();
  }

  getDataFromAPI(tutor) {
    this.http
      .get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + tutor.latitude + ',' + tutor.longitude + '&key=' + config.apiKey)
      .pipe()
      .subscribe(
        (data) => {
          Object.assign(tutor, {
            geoCordAddress:
              data['results'][0].address_components[1]['short_name'] + ' ' + data['results'][0].address_components[2]['short_name'],
          });
        },
        (err) => {}
      );
  }

  getAllTutors(examId?, mediumId?, subjectIds?, distanceRange?) {
    let user;
    if (localStorage.getItem('currentUser')) {
      user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.tutorLoading = true;
    this.homeService
      .geAllFilteredTutors({ lat: user['latitude'], lng: user['longitude'], distanceRange, examId, mediumId, subjectIds })
      .subscribe(
        (response) => {
          this.tutorLoading = false;
          this.tutorList = response.data;
          this.tutorList.forEach((tutor) => {
            // this.getDataFromAPI(tutor);
          });
        },
        (error) => {
          this.tutorLoading = false;
        }
      );
  }

  async openProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileModalPageComponent,
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPageComponent,
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData.data !== null) {
      this.getAllTutors(
        modalData.data['examId'],
        modalData.data['mediumId'],
        modalData.data['subjectIds'],
        modalData.data['distanceRange'] === 0 ? null : +modalData.data['distanceRange']
      );
    }
  }

  async goToTutorProfile(tutorData: any) {
    const modal = await this.modalController.create({
      component: ViewTutorProfileComponent,
      componentProps: { tutor: tutorData },
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData.data !== null) {
    }
  }

  menuPopUpControl() {}
}
