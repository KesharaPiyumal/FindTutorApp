import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormValidationHelperService } from '../../@common/helpers/form-validation-helper.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  user = {} as User;
  loginForm: FormGroup;
  loading = false;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private formValidationHelperService: FormValidationHelperService,
    public nbToastService: NbToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async userLogin(user: User) {
    if (this.loginForm.invalid) {
      this.formValidationHelperService.validateAllFormFields(this.loginForm);
    } else {
      try {
        user.email = this.email.value;
        user.password = this.password.value;
        this.loading = true;
        await this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
          .then((data) => {
            this.loading = false;
            this.nbToastService.show('Logged Successfully!', 'Success', { status: 'success' });
            this.router.navigate(['home/']).then((result) => {});
          })
          .catch((e) => {
            this.loading = false;
            this.nbToastService.show(e, 'Warning', { status: 'warning' });
          });
      } catch (e) {
          this.loading = false;
          this.nbToastService.show(e, 'Warning', { status: 'warning' });
      }
    }
  }

  goToRegisterPage() {
    this.router.navigate(['auth/register']).then((r) => {});
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await loading.present();
  }

  showToast(msg: string) {
    this.toastController
      .create({
        message: msg,
        duration: 1000,
        position: 'bottom',
      })
      .then((result) => result.present())
      .catch((e) => console.log(e));
  }
}
