import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationDTO } from 'src/app/models/NotificationDTO';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PopoverController } from '@ionic/angular';
import { NotificationsPopoverComponent } from '../notifications-popover/notifications-popover.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  notificationsCount: number = 0;
  notificationsCounterSubscription: Subscription;
  rankSubscription = new Subscription();
  rank:string;

  constructor(
    private router: Router, 
    private notificationsService: NotificationsService,
    public popoverController: PopoverController,
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.authenticationService.getRole().then(role => {
      this.rank = role;
    })

    this.notificationsService.getAllNotifications().then(() =>{
      this.notificationsCounterSubscription = this.notificationsService.notificationsCount$.subscribe((count:number) => {
        this.notificationsCount = count;
      })
    });

    this.rankSubscription = this.authenticationService.rankUpdated$.subscribe((rank:string) => {
      this.rank = rank;
    })
  }

  // goToSearch(){
  //   this.router.navigate(['/search']);
  // }

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

  // goToProfile(){
  //   this.router.navigate(['/profile']);
  // }

  goHome(){
    this.router.navigate(['/main'])
  }

  ngOnDestroy(){
    if(this.notificationsCounterSubscription)
      this.notificationsCounterSubscription.unsubscribe();
  }
}
