import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationDTO } from 'src/app/models/NotificationDTO';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PopoverController } from '@ionic/angular';
import { NotificationsPopoverComponent } from '../notifications-popover/notifications-popover.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  notificationsCount: number = 0;
  notificationsCounterSubscription: Subscription;

  constructor(
    private router: Router, 
    private notificationsService: NotificationsService,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.notificationsService.getAllNotifications().then(() =>{
      this.notificationsCounterSubscription = this.notificationsService.notificationsCount$.subscribe((count:number) => {
        this.notificationsCount = count;
      })
    })
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

  ngOnDestroy(){
    if(this.notificationsCounterSubscription)
      this.notificationsCounterSubscription.unsubscribe();
  }
}
