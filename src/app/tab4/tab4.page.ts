import { Component, OnInit, HostBinding } from '@angular/core';
import { ChilivoteService } from '../services/chilivote.service';
import { ChilivoteVotableDTO } from '../models/ChilivoteVotableDTO';
import { VoteService } from '../services/vote.service';
import { AnswerVotePairDTO} from '../models/AnswerVotePairDTO';

import { trigger, transition, animate, style } from '@angular/animations';
import { ROLES } from '../constants/roles';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class Tab4Page implements OnInit {
  chilivotes: ChilivoteVotableDTO[] = [];
  loading:boolean = false;
  currentChilivote: ChilivoteVotableDTO;
  showVotes: boolean;
  NoChilivotes:boolean;
  authorizedRoles = [ROLES.CHILIVOTER, ROLES.DECENT, ROLES.LEGEND, ROLES.MASTER, ROLES.SUPER]
  authorized:boolean;
  unauthorizedText:string;

  constructor(
    private chilivoteService: ChilivoteService, 
    private voteService: VoteService,
    private authService:AuthenticationService
    ) { }

  ngOnInit() {
    this.unauthorizedText = "You do not have enough privileges to view this page. You have to earn the 'Decent Voter' privilege before you can view Fire Chilivotes";
  }

  ionViewWillEnter(){
    this.authorized = true;
    this.getChilivotes();
  }

  getChilivotes(){
    this.NoChilivotes = false;
    this.loading = true;
    this.chilivoteService.getPrivateFeed().subscribe((result: ChilivoteVotableDTO[] ) => {
      this.loading = false;

      if(result){
        result.sort((a, b) => a.created_at > b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0)
      }

      this.chilivotes = result;
      if(!this.chilivotes.length){
        this.NoChilivotes = true;
      }
    });
  }
}
