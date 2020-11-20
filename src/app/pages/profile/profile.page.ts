import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileDTO } from 'src/app/models/ProfileDTO';
import { ProfileService } from 'src/app/services/profile.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: ProfileDTO;
  error: boolean = false;
  loading: boolean = false;
  location: Location;

  constructor(
    private profileService: ProfileService,
    private avatarService: AvatarService,
    location: Location,
    private router: Router
  ) {
    this.location = location;
  }

  ngOnInit(){
  }

  ionViewWillEnter() {
    this.loadProfile();    
  }

  loadProfile(){
    this.loading = true;
    this.error = false;
    this.profileService.getProfile().subscribe((profile: ProfileDTO) => {
      profile.avatar = this.avatarService.parseAvatarString(profile.avatar);
      this.profile = profile;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.error = true;
    })
  }

  goBack() {
    this.location.back();
  }

  goToEditProfile() {
    this.router.navigate(['edit-profile']);
  }
}
