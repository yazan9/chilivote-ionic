import { Component } from '@angular/core';
import { ChilivoteService } from 'src/app/services/chilivote.service';
import { UserService } from '../services/user.service';
import { VoteService } from '../services/vote.service';
import { ChilivoteVotableDTO } from '../models/ChilivoteVotableDTO';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  chilivotes: ChilivoteVotableDTO[] = [];
  loading:boolean = false;

  constructor(
    private chilivoteService: ChilivoteService,
    private userService: UserService,
    private voteService:VoteService
    ) {}

  ionViewWillEnter(){
    this.loading = true;

    this.chilivoteService.getTrendingFeed().subscribe((result) => {
      this.loading = false;
      let chilivotes = this.orderChilivotes(result);
      this.chilivotes = chilivotes;
    });
  }

  orderChilivotes(chilivotes: ChilivoteVotableDTO[]){
    return chilivotes.sort(this.sortByVotes);
  }

  sortByVotes(a: ChilivoteVotableDTO, b:ChilivoteVotableDTO){
    if((a.answerLeft.votes + a.answerRight.votes) > (b.answerLeft.votes + b.answerRight.votes))
      return -1
    else return 1;
  }

  onFollow(chilivote)
  {
    this.userService.follow(chilivote.userId).subscribe(() => {
      let chilivotes = this.chilivotes.filter(c => c.userId === chilivote.userId);
      chilivotes.forEach(c => c.isFollowing = true);
    })
  }

  onUnfollow(chilivote)
  {
    this.userService.unfollow(chilivote.userId).subscribe(() => {
      let chilivotes = this.chilivotes.filter(c => c.userId === chilivote.userId);
      chilivotes.forEach(c => c.isFollowing = false);
    })  
  }
}
