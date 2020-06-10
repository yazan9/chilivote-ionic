import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationDTO } from 'src/app/models/NotificationDTO';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PopoverController } from '@ionic/angular';
import { NotificationsPopoverComponent } from '../notifications-popover/notifications-popover.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  notifications: NotificationDTO[];

  constructor(
    private router: Router, 
    private notificationsService: NotificationsService,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.notificationsService.getAllNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    }, err => {
      this.notifications = [];
    });
  }

  goToSearch(){
    this.router.navigate(['/search']);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationsPopoverComponent,
      event: ev,
      translucent: true
    });
    popover.present();

    return popover.onDidDismiss().then(
      (response:any) => {
        if(response.data === "hide"){
          
        }
        else if(response.data === "report"){
          
        }
      }
    )
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
