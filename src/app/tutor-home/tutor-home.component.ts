import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from '../home/popover-menu/popover-menu.component';
import { PopMenuType } from '../@common/enum';
import { ProfileModalPageComponent } from '../home/profile-modal-page/profile-modal-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-home',
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.scss'],
})
export class TutorHomeComponent implements OnInit {
  constructor(public popoverController: PopoverController, public modalController: ModalController, public router: Router) {}

  ngOnInit() {}

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      event: event,
      translucent: true,
      animated: true,
      showBackdrop: true,
    });
    await popover.present();
    const popData = await popover.onWillDismiss();
    if (popData.data) {
      if (popData.data['popMenuItemType'] === PopMenuType.Profile) {
        this.openProfileModal().then((r) => {});
      } else {
        if (popData.data['popMenuItemType'] === PopMenuType.LogOut) {
          if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
          }
          this.router.navigate(['auth/login']).then((r) => {});
        }
      }
    }
  }

  async openProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileModalPageComponent,
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
  }
}
