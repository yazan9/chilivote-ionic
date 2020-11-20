import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { ConnectionsSearchPipe } from 'src/app/pipes/connections-search.pipe';
import { UserService } from 'src/app/services/user.service';

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
