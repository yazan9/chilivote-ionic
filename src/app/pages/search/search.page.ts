import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserDTO } from 'src/app/models/UserDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  location:Location;
  loading:boolean;
  users: UserDTO[];
  searchText:string = "";

  constructor(location: Location, private userService: UserService) {
    this.location = location;
   }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  search(){
    this.loading = true;
    this.userService.search(this.searchText).subscribe((result) => {
      this.loading = false;
      this.users = result;
    });
  }

}
