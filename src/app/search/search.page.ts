import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  location:Location;

  constructor(location: Location) {
    this.location = location;
   }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

}
