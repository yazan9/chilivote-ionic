import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserDTO } from '../../models/UserDTO';
import { UserService } from '../../services/user.service';
import { ConnectionsSearchPipe } from 'src/app/pipes/connections-search.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit, OnChanges {

  @Input() users: UserDTO[];
  searchText: string;
  
  constructor(
    private userService:UserService,
    public connectionsSearchFilter: ConnectionsSearchPipe,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.processAvatars();

    this.searchText = '';
  }

  ngOnChanges(){
    this.processAvatars();
  }

  processAvatars(){
    this.users.forEach((user) => {
      user.avatar = this.parseAvatarString(user.avatar);
    })
  }

  onFollow(user)
  {
    this.userService.follow(user.id).subscribe(() => {
      user.isFollowing = true;
    })
  }

  onUnfollow(user)
  {
    this.userService.unfollow(user.id).subscribe(() => {
      user.isFollowing = false;
    })  
  }

  parseAvatarString(avatar:string):string
  {
    let url = avatar.substr(avatar.indexOf('url='));
    let removedUrl = url.substr(4, url.indexOf(',')-4);
    return removedUrl;
  }
}
