import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  user = {} as User;
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private afAuth: AngularFireAuth,
    public toastService: ToastController
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
    try {
      user.email = this.email.value;
      user.password = this.password.value;
      await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((data) => {
        console.log(data);
        this.showToast(JSON.stringify(data));
        // this.router.navigate(['folder/inbox']).then((result) => {});
      });
    } catch (e) {
      console.log(e);
    }
  }

  goToRegisterPage() {
    this.router.navigate(['auth/register']).then((r) => {});
  }

  showToast(msg: string) {
    this.toastService
      .create({
        message: msg,
        duration: 3000,
      })
      .then((r) => r.present);
  }
}
