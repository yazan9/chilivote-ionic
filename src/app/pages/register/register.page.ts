import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loadingSubscription: Subscription;
  loading: boolean = false;
  registrationForm: FormGroup;
  hiddenLogo = false;

  constructor(
    private router: Router, 
    private auth: AuthenticationService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.auth.loading$.subscribe((loading) => {
      this.loading = false;
    });

    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ionViewWillEnter(){
    this.hiddenLogo = false;
    if (this.auth.isLoggedIn()){
      this.router.navigate(["tabs"]);
    }
  }

  emailRegister(){
    if(!this.registrationForm.valid) return;
    this.auth.emailRegister(this.email.value, this.password.value, this.username.value);
  }

  get email(){return this.registrationForm.get('email')}
  get password(){return this.registrationForm.get('password')}
  get username(){return this.registrationForm.get('username')};

  hideLogo(){
    this.hiddenLogo = true;
  }
}
