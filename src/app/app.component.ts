import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; //import MenuController to access toggle() method.

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private auth: AuthenticationService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout()
  {
    this.menuCtrl.toggle();
    this.auth.logout();
  }

  onMyChilivotes()
  {
    this.menuCtrl.toggle();
    this.router.navigate(["/mychilivotes"]);
  }

  onConnections()
  {
    this.menuCtrl.toggle();
    this.router.navigate(["/connections"]);
  }

  onMyFeed(){
    this.menuCtrl.toggle();
    this.router.navigate(["/main"]);
  }

  goToSearch(){
    this.menuCtrl.toggle();
    this.router.navigate(['/search']);
  }

  goToProfile(){
    this.menuCtrl.toggle();
    this.router.navigate(['/profile']);
  }
}
