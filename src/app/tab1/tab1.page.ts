import { Component } from '@angular/core';
import { ChilivoteService } from 'src/app/services/chilivote.service';
import { UserService } from '../services/user.service';
import { VoteService } from '../services/vote.service';
import { ChilivoteVotableDTO } from '../models/ChilivoteVotableDTO';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  chilivotes: ChilivoteVotableDTO[] = [];
  loading:boolean = false;
  constructor(
    private chilivoteService: ChilivoteService, 
    private userService: UserService,
    private voteService:VoteService) { }
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.loading = true;
    this.chilivoteService.getRandomFeed().subscribe((result) => {
      this.loading = false;
      result.sort((a,b) => a.created_at > b.created_at ? -1 : 1);
      this.chilivotes = result;
    });
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
