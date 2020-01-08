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

  // users: UserDTO[] = [];
  // randomUsers: UserDTO[] = [];
  constructor(private chilivoteService:ChilivoteService, private voteService:VoteService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    // this.userService.getFollowing().subscribe((result) => {
    //   this.users = result;
    //   this.users.forEach((user) => {user.isFollowing = true;})
    // })

    // this.userService.getRandom().subscribe((result) => {
    //   this.randomUsers = result;
    // })
    this.loading = true;

    this.chilivoteService.getFeed().subscribe((result) => {
      this.loading = false;
      this.chilivotes = result;
    });
  }

  vote(event)
  {
    this.voteService.vote(event.answer.id).subscribe(()=> {
      event.answer.voted = true;
      event.theOtherAnswer.voted = false;
    });
  }

}
