import { Component, OnInit, HostBinding } from '@angular/core';
import { ChilivoteService } from '../services/chilivote.service';
import { UserService } from '../services/user.service';
import { ChilivoteVotableDTO } from '../models/ChilivoteVotableDTO';
import { AnswerVoteDTO } from '../models/AnswerVoteDTO';
import { VoteService } from '../services/vote.service';
import { AnswerVotePairDTO} from '../models/AnswerVotePairDTO';

import { trigger, transition, animate, style } from '@angular/animations';

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

  constructor(private chilivoteService: ChilivoteService, private userService: UserService, private voteService: VoteService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getChilivotes();
  }

  getChilivotes(){
    this.NoChilivotes = false;
    this.loading = true;
    this.chilivoteService.getFireFeed().subscribe((result) => {
      this.loading = false;
      this.chilivotes = result;
      if(this.chilivotes.length){
        this.currentChilivote = this.chilivotes[0];    
      }
      else{
        this.NoChilivotes = true;
        this.currentChilivote = null;
      }
    });
  }

  vote(event)
  {
    this.voteService.voteAndGetAnswers(event.answer.id).subscribe((answersVotesList: AnswerVotePairDTO[])=> {
      event.answer.voted = true;
      event.theOtherAnswer.voted = false;
      event.answer.votes = answersVotesList.find((a) => a.answerId === event.answer.id).votes;
      event.theOtherAnswer.votes = answersVotesList.find((a) => a.answerId === event.theOtherAnswer.id).votes;
    });

    this.chilivotes.splice(0,1);
    this.showVotes = true;

    setTimeout(() => {
      if(this.chilivotes.length){
        //loading here is for animations
        this.currentChilivote = null;
        this.currentChilivote = this.chilivotes[0];  
      }
      else
        this.getChilivotes();
      this.showVotes = false;
    }, 2000);   
  }

  // onFollow(chilivote)
  // {
  //   this.userService.follow(chilivote.userId).subscribe(() => {
  //     let chilivotes = this.chilivotes.filter(c => c.userId === chilivote.userId);
  //     chilivotes.forEach(c => c.isFollowing = true);
  //   })
  // }

  // onUnfollow(chilivote)
  // {
  //   this.userService.unfollow(chilivote.userId).subscribe(() => {
  //     let chilivotes = this.chilivotes.filter(c => c.userId === chilivote.userId);
  //     chilivotes.forEach(c => c.isFollowing = false);
  //   })  
  // }
}
