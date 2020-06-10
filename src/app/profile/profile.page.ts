import { Component, OnInit } from '@angular/core';
import { ProfileDTO } from '../models/ProfileDTO';
import { ProfileService } from '../services/profile.service';
import { AvatarService } from '../services/avatar.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: ProfileDTO;
  error: boolean = false;
  loading: boolean = false;
  location:Location;

  constructor(
    private profileService: ProfileService, 
    private avatarService: AvatarService,
    location: Location,
    private router:Router
    ) 
    {
      this.location = location;
    }

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.profileService.getProfile().subscribe((profile: ProfileDTO) => {
      this.profile = profile;
      this.profile.avatar = this.avatarService.parseAvatarString(this.profile.avatar);
      this.loading = false;
    }, err => {
      this.loading = false;
      this.error = true;
    })  
  }

  goBack(){
    this.location.back();
  }

  goToEditProfile(){
    this.router.navigate(['edit-profile']);
  }
}
