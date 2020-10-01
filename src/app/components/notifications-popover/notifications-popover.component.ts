import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { NotificationDTO } from 'src/app/models/NotificationDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit {

  private notifications: NotificationDTO[];
  loading:boolean = false;

  constructor(private notificationsService: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.notificationsService.getAllNotifications().subscribe((notifications) => {
      this.loading = false;
      this.notifications = notifications;
    }, err => {
      this.loading = false;
      this.notifications = null;
    })
  }

  goToMyChilivotes(notification: NotificationDTO){
    this.notificationsService.readNotification(notification.chilivoteId).subscribe();
    this.router.navigate(["/mychilivotes"]);
  }

}
