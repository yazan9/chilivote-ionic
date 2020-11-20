import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/models/UserDTO';
import { ChilivoteVotableDTO } from '../models/ChilivoteVotableDTO';
import { ChilivoteService } from '../services/chilivote.service';
import { AnswerVoteDTO } from '../models/AnswerVoteDTO';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  chilivotes: ChilivoteVotableDTO[] = [];
  loading:boolean = false;
  authorized:boolean;
  unauthorizedText:string;

  constructor(private chilivoteService:ChilivoteService, private voteService:VoteService, private usersService: UserService) { }

  ngOnInit() {
    this.unauthorizedText = "You cannot access this page until you have followed 1 person";
  }

  ionViewWillEnter()
  {
    
    this.loading = true;
    this.usersService.getFollowing().subscribe((following) => {
      if(following && following.length <1){
        this.authorized = false;
        this.loading = false;
      }
      else{
        this.chilivoteService.getFeed().subscribe((result) => {
          this.authorized = true;
          this.loading = false;
          this.chilivotes = result;
        });
      }
    })
  }
}
