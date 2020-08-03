import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  user = {} as User;
  registerForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  async registerUser(user: User) {
    try {
      user.email = this.email.value;
      user.password = this.password.value;
      await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((r) => {
        console.log(r);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
