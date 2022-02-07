import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ChilivoteContainerComponent } from './components/chilivote-container/chilivote-container.component';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { ChilivotesTabComponent } from './components/chilivotes-tab/chilivotes-tab.component';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config';
import { ConnectionsSearchPipe } from './pipes/connections-search.pipe';
import { FormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HideReportPopoverComponent } from './components/hide-report-popover/hide-report-popover.component';
import { MychilivoteOptionsComponent } from './components/mychilivote-options/mychilivote-options.component';
import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { SelectUsersModalComponent } from './components/select-users-modal/select-users-modal.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    ToolbarComponent, 
    ChilivoteContainerComponent, 
    UserContainerComponent, 
    ChilivotesTabComponent, 
    ConnectionsSearchPipe,
    UnauthorizedComponent,
    HideReportPopoverComponent,
    MychilivoteOptionsComponent,
    NotificationsPopoverComponent,
    SelectUsersModalComponent
  ],
  entryComponents: [HideReportPopoverComponent, MychilivoteOptionsComponent, NotificationsPopoverComponent, SelectUsersModalComponent],
  imports: [
    IonicModule, 
    RouterModule, 
    CommonModule, 
    FormsModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConnectionsSearchPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [],
  exports:[
    ToolbarComponent, 
    ChilivoteContainerComponent, 
    UserContainerComponent, 
    ChilivotesTabComponent, 
    ConnectionsSearchPipe,
    UnauthorizedComponent,
    HideReportPopoverComponent,
    MychilivoteOptionsComponent
  ] 
})
export class SharedModule {}