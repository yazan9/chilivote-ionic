import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ChilivoteContainerComponent } from './components/chilivote-container/chilivote-container.component';
import { UserContainerComponent } from './components/user-container/user-container.component';


@NgModule({
  declarations: [ToolbarComponent, ChilivoteContainerComponent, UserContainerComponent],
  entryComponents: [],
  imports: [IonicModule, RouterModule, CommonModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [],
  exports:[ToolbarComponent, ChilivoteContainerComponent, UserContainerComponent]
})
export class SharedModule {}