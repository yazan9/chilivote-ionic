import { Component, OnInit, Input } from '@angular/core';
import { ChilivoteRandomDTO } from '../../models/ChilivoteRandomDTO';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chilivote-container-wfollow',
  templateUrl: './chilivote-container-wfollow.component.html',
  styleUrls: ['./chilivote-container-wfollow.component.scss'],
})
export class ChilivoteContainerWfollowComponent implements OnInit {
  @Input() chilivotes: ChilivoteRandomDTO[];

  constructor(private userService: UserService) { }

  ngOnInit() {}

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
