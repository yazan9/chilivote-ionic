import { Component } from '@angular/core';
import { ChilivoteRandomDTO } from 'src/app/models/ChilivoteRandomDTO';
import { ChilivoteService } from 'src/app/services/chilivote.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  chilivotes: ChilivoteRandomDTO[] = [];
  loading:boolean = false;
  constructor(private chilivoteService: ChilivoteService, private userService: UserService) { }
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.loading = true;
    this.chilivoteService.getRandomFeed().subscribe((result) => {
      this.loading = false;
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
