import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { NotificationDTO } from 'src/app/models/NotificationDTO';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit {

  public notifications: NotificationDTO[];
  loading:boolean = false;

  constructor(
    private notificationsService: NotificationsService, 
    private router: Router,
    private popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.loading = true;
    this.notificationsService.getAllNotifications().then((notifications) => {
      this.loading = false;
      this.notifications = notifications;
    }, err => {
      this.loading = false;
      this.notifications = null;
    })
  }

  goToMyChilivote(notification: NotificationDTO){
    this.popoverController.dismiss();
    this.router.navigate(["/chilivote-details", notification.chilivoteId]);
  }
}
