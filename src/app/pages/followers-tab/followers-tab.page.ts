import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { ConnectionsSearchPipe } from 'src/app/pipes/connections-search.pipe';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-followers-tab',
  templateUrl: './followers-tab.page.html',
  styleUrls: ['./followers-tab.page.scss'],
})
export class FollowersTabPage implements OnInit {

  loading:boolean;
  followers: UserDTO[];

  constructor(private userService: UserService, public connectionsSearchFilter: ConnectionsSearchPipe) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loading = true;
    this.userService.getFollowers().subscribe((result) => {
      this.loading = false;
      this.followers = result;
    });
  }
}
