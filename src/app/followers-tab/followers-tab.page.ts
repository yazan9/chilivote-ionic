import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDTO } from '../models/UserDTO';
import { ConnectionsSearchPipe } from '../pipes/connections-search.pipe';
import { filter } from 'minimatch';

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
