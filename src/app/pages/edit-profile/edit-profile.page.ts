import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProfileDTO } from 'src/app/models/ProfileDTO';
import { ProfileService } from 'src/app/services/profile.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  providers: [Camera]
})
export class EditProfilePage implements OnInit {

  profile: ProfileDTO;
  error: boolean = false;
  loading: boolean = false;
  location: Location;

  constructor(
    private profileService: ProfileService,
    private avatarService: AvatarService,
    location: Location,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private cloudinaryService: CloudinaryService,
    private router: Router
  ) {
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

  goBack() {
    this.location.back();
  }

  async openBottomSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload',
      buttons: [{
        text: 'Upload from Gallery',
        icon: 'images',
        handler: () => {
          this.ChooseFromGallery()
        }
      }, {
        text: 'Take a Photo',
        icon: 'camera',
        handler: () => {
          this.GetFromCamera();
        }
      }]
    });
    await actionSheet.present();
  }

  ChooseFromGallery() {
    let element: HTMLElement = document.getElementById("PhotoUploader") as HTMLElement;
    element.click();
  }

  GetFromCamera() {
    const options: CameraOptions = this.cloudinaryService.getCameraOptions(this.camera);

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.loading = true;
      this.cloudinaryService.uploadAvatar(base64Image).subscribe((image) => {
        this.loading = false;
        this.profile.avatar = image.url
      }, (err) => {
        console.log(err);
        this.loading = false;
      });

    }, (err) => {
      // Handle error
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.uploadToCloudinary(file);
  }

  uploadToCloudinary(blob) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = () => {
      this.loading = true;
      this.cloudinaryService.uploadAvatar(fileReader.result).subscribe((image) => {
        this.loading = false;
        this.profile.avatar = image.public_id;
      }, (err) => {
        console.log(err);
        this.loading = false;
      });
    };
  }

  update(){
    this.profileService.updateProfile(this.profile).subscribe(() => {
      this.router.navigate(['profile']);
    }, err => {
      this.error = true;
    })
  }
}
