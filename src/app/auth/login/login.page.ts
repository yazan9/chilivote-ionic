import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  FB_APP_ID: number = 317506779163001;

  loadingSubscription: Subscription;
  loading: boolean = false;

  constructor(private fb: Facebook, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.loadingSubscription = this.auth.loading$.subscribe((loading) => {
      this.loading = false;
    })
  }

  fbLogin()
  {
  //   this.fb.login(['public_profile', 'email'])
  // .then((res: FacebookLoginResponse) => {
  //   console.log('Logged into Facebook!', res);
  //   this.router.navigate(["tabs"]);
  // })
  // .catch(e => console.log('Error logging into Facebook', e));

  this.loading = true;
  this.auth.fbLogin();


  //this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }
}
