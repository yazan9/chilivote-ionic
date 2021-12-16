import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  FB_APP_ID: number = 317506779163001;
  loadingSubscription: Subscription;
  loading: boolean = false;
  loginForm: FormGroup;
  isSubmitted:boolean = false;
  hiddenLogo = false;
  
  constructor(
    private fb: Facebook, 
    private router: Router, 
    private auth: AuthenticationService,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.loadingSubscription = this.auth.loading$.subscribe((loading) => {
      this.loading = false;
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
  ionViewWillEnter(){
    this.hiddenLogo = false;
  }

  fbLogin()
  {
    this.loading = true;
    this.auth.fbLogin();
  }

  emailLogin(){
    if(!this.loginForm.valid) return;
    this.auth.emailLogin(this.email.value, this.password.value);
    
  }

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  hideLogo(){
    this.hiddenLogo = true;
  }

}
