import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ChilivoteVotableDTO } from '../../models/ChilivoteVotableDTO';
import { ChilivoteService } from '../../services/chilivote.service';

@Component({
  selector: 'app-chilivote-details',
  templateUrl: './chilivote-details.page.html',
  styleUrls: ['./chilivote-details.page.scss'],
  providers:[]
})
export class ChilivoteDetailsPage implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  chilivotes: ChilivoteVotableDTO[] = [];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private chilivotesService: ChilivoteService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    console.log("on init called")
    this.routeSubscription = this.route.params.subscribe(params => {
      console.log("parameter changed")
       const id:number = +params['id'];
       this.loadChilivote(id);
    });
  }

  loadChilivote(id:number){
    this.chilivotes = [];
    this.loading = true;
    this.chilivotesService.getChilivote(id).subscribe(chilivote => {
      this.loading = false;
      this.notificationsService.readNotification(id);
      this.chilivotes.push(chilivote);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
