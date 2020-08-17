import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormValidationHelperService } from '../../@common/helpers/form-validation-helper.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { StatusCodes, ToastStatus, UserType } from '../../@common/enum';
import { ToastService } from '../../@common/services/toast.service';
import { EssentialDataService } from '../essential-data.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalLocationPageComponent } from './modal-location-page/modal-location-page.component';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, AfterViewInit {
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;
  user = {} as User;
  registerFormCommon: FormGroup;
  registerFormAdv: FormGroup;
  examList = [];
  examsDropdown = [];
  mediumDropdown = [
    { label: 'Sinhala', value: 1 },
    { label: 'English', value: 2 },
  ];
  subjectsDropdown = [];
  examsLoading = false;
  subjectsLoading = false;
  UserType: typeof UserType = UserType;
  selectedExamId: any;
  selectedMediumId: any;
  constructor(
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private formValidationHelperService: FormValidationHelperService,
    private geolocation: Geolocation,
    private toastrService: ToastService,
    private essentialDataService: EssentialDataService,
    private diagnostic: Diagnostic,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllExams();
    this.registerFormCommon = this.formBuilder.group({
      type: [1],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.registerFormAdv = this.formBuilder.group({
      address: ['', Validators.required],
      age: [],
      examId: [],
      mediumId: [],
      subjectIds: [[]],
      location: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {}

  get firstName() {
    return this.registerFormCommon.get('firstName');
  }
  get lastName() {
    return this.registerFormCommon.get('lastName');
  }
  get email() {
    return this.registerFormCommon.get('email');
  }
  get type() {
    return this.registerFormCommon.get('type');
  }
  get password() {
    return this.registerFormCommon.get('password');
  }
  get confirmPassword() {
    return this.registerFormCommon.get('confirmPassword');
  }
  get phoneNumber() {
    return this.registerFormCommon.get('phoneNumber');
  }
  get address() {
    return this.registerFormAdv.get('address');
  }
  get examId() {
    return this.registerFormAdv.get('examId');
  }
  get mediumId() {
    return this.registerFormAdv.get('mediumId');
  }
  get subjectIds() {
    return this.registerFormAdv.get('subjectIds');
  }
  get location() {
    return this.registerFormAdv.get('location');
  }

  validateForm1() {
    if (this.registerFormCommon.invalid) {
      this.formValidationHelperService.validateAllFormFields(this.registerFormCommon);
      return;
    }
    const popover = this.popovers.filter((p) => p.context === 'locationPopover')[0];
    popover.show();
    setTimeout(() => {
      popover.hide();
    }, 5000);
  }

  async registerUser(user: User) {
    if (user.lat && user.long) {
      try {
        user.email = this.email.value;
        user.password = this.password.value;
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
          console.log(result);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.toastrService.showToast(ToastStatus.Danger, 'Alert', 'Your have to give your location!');
      this.diagnostic.switchToLocationSettings();
    }
  }

  getAllExams() {
    this.examsLoading = true;
    this.essentialDataService.getAllExams().subscribe(
      (response) => {
        this.examsLoading = false;
        if (response.statusCode === StatusCodes.Success) {
          this.examList = response.data;
          this.examList.forEach((item) => {
            this.examsDropdown.push({ label: item['name'], value: item['id'] });
          });
          setTimeout(() => {
            this.registerFormAdv.patchValue({
              examId: this.examsDropdown[0]['value'],
            });
          }, 0);
        }
      },
      (error) => {
        this.examsLoading = false;
      }
    );
  }

  getAllSubjects() {
    this.subjectsLoading = true;
    const reqData = { examId: this.selectedExamId, mediumId: this.selectedMediumId };
    this.essentialDataService.getAllSubjectsForExamAndMedium(reqData).subscribe(
      (response) => {
        this.subjectsLoading = false;
        if (response.statusCode === StatusCodes.Success) {
          this.subjectsDropdown = [];
          response.data.forEach((item) => {
            this.subjectsDropdown.push({ label: item['name'], value: item['id'] });
          });
          // setTimeout(() => {
          //   this.registerFormAdv.patchValue({
          //     examId: this.examsDropdown[0]['value'],
          //   });
          // }, 0);
        }
      },
      (error) => {
        this.subjectsLoading = false;
      }
    );
  }

  setControlsForType(event: any) {
    if (event === UserType.Tutor) {
      if (this.registerFormAdv.get('examId') === null) {
        this.registerFormAdv.addControl('examId', new FormControl(null, Validators.required));
      }
      if (this.registerFormAdv.get('subjectIds') === null) {
        this.registerFormAdv.addControl('subjectIds', new FormControl([], Validators.required));
      }
      if (this.registerFormAdv.get('mediumId') === null) {
        this.registerFormAdv.addControl('mediumId', new FormControl(null, Validators.required));
      }
    } else {
      if (this.registerFormAdv.get('examId')) {
        this.registerFormAdv.removeControl('examId');
      }
      if (this.registerFormAdv.get('subjectIds')) {
        this.registerFormAdv.removeControl('subjectIds');
      }
      if (this.registerFormAdv.get('mediumId')) {
        this.registerFormAdv.removeControl('mediumId');
      }
    }
  }

  async getCurrentLocation() {
    const modal = await this.modalController.create({
      component: ModalLocationPageComponent,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData.data.lat && modalData.data.lon) {
      this.registerFormAdv.patchValue({
        location: modalData.data.lat + ', ' + modalData.data.lon,
      });
    }
    // this.diagnostic.switchToLocationSettings();
    // this.geolocation
    //     .getCurrentPosition()
    //     .then((resp) => {
    //       this.user.lat = resp.coords.latitude;
    //       this.user.long = resp.coords.longitude;
    //     })
    //     .catch((error) => {
    //       console.log('Error getting location', error);
    //     });
  }

  examinationOrGradeChange(event: any) {
    this.selectedExamId = event;
    if (this.selectedExamId && this.selectedMediumId) {
      this.getAllSubjects();
    }
  }

  mediumChange(event: any) {
    this.selectedMediumId = event;
    if (this.selectedExamId && this.selectedMediumId) {
      this.getAllSubjects();
    }
  }
}
