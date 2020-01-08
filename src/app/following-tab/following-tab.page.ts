import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { UserService } from '../services/user.service';
import { ConnectionsSearchPipe } from '../pipes/connections-search.pipe';

@Component({
  selector: 'app-following-tab',
  templateUrl: './following-tab.page.html',
  styleUrls: ['./following-tab.page.scss'],
})
export class FollowingTabPage implements OnInit {

  loading:boolean;
  following: UserDTO[];

  constructor(private userService: UserService, public connectionsSearchFilter: ConnectionsSearchPipe) { }
  
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loading = true;
    this.userService.getFollowing().subscribe((result) => {
      this.loading = false;
      this.following = result;
    });
  }
}
