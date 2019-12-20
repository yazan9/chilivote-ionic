import { Component, OnInit, Input } from '@angular/core';
import { UserDTO } from '../../models/UserDTO';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit {

  @Input() user: UserDTO;
  
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.user.avatar = this.parseAvatarString(this.user.avatar);
  }

  onFollow()
  {
    this.userService.follow(this.user.id).subscribe(() => {
      this.user.isFollowing = true;
    })
  }

  onUnfollow()
  {
    this.userService.unfollow(this.user.id).subscribe(() => {
      this.user.isFollowing = false;
    })  
  }

  parseAvatarString(avatar:string):string
  {
    let url = avatar.substr(avatar.indexOf('url='));
    let removedUrl = url.substr(4, url.indexOf(',')-4);
    return removedUrl;
  }

}
