import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';
import { ChilivoteDTOUI } from '../../models/ChilivoteDTOUI';
import { ChilivoteService } from '../../services/chilivote.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ROLES } from 'src/app/constants/roles';

@Component({
  selector: 'app-new-chilivote',
  templateUrl: './new-chilivote.page.html',
  styleUrls: ['./new-chilivote.page.scss'],
  providers:[Camera]
})
export class NewChilivotePage implements OnInit {
  newChilivote: ChilivoteDTOUI;
  photoID: number;
  loading: boolean = false;
  authorizedRoles = [ROLES.SUPER, ROLES.ACTIVE, ROLES.CHILIVOTER, ROLES.DECENT, ROLES.LEGEND, ROLES.MASTER, ROLES.VOTER]
  authorized:boolean;
  unauthorizedText:string;

  constructor(
    private cloudinaryService: CloudinaryService,
    private chilivoteService: ChilivoteService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private camera: Camera,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.authService.isAuthorized(this.authorizedRoles).then((authorized) => {
      this.loading = false;
      this.authorized = authorized;
    })
    this.newChilivote = new ChilivoteDTOUI();
    this.photoID = 1;
    this.unauthorizedText = "You do not have enough privileges to view this page. You have to earn the 'Voter' privilege before you can create new Chilivotes";
  }

  async openBottomSheet(photoID: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload',
      buttons: [{
        text: 'Upload from Gallery',
        icon: 'images',
        handler: () => {
          this.ChooseFromGallery(photoID)
        }
      }, {
        text: 'Take a Photo',
        icon: 'camera',
        handler: () => {
          this.GetFromCamera(photoID);
        }
      }]
    });
    await actionSheet.present();
  }

  ChooseFromGallery(photoID: number)
  {
    this.photoID = photoID;
    let element:HTMLElement = document.getElementById("PhotoUploader") as HTMLElement;
    element.click();
  }

  GetFromCamera(photoID:number){
    this.photoID = photoID;
    const options: CameraOptions = this.cloudinaryService.getCameraOptions(this.camera);

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.cloudinaryService.uploadAnswer(base64Image).subscribe((image) => {
        this.loading = false;
        if(this.photoID == 1)
          this.newChilivote.answerLeft = image.public_id;
        if(this.photoID == 2)
        this.newChilivote.answerRight = image.public_id;
     }, (err) => {
       console.log(err);
       this.loading = false;
     });
     }, (err) => {
     });
  }

 uploadToCloudinary(blob){
  var fileReader = new FileReader();
  fileReader.readAsDataURL(blob);
  fileReader.onload = () => {
    this.loading = true;
   this.cloudinaryService.uploadAnswer(fileReader.result).subscribe((image) => {
     this.loading = false;
     if(this.photoID == 1)
       this.newChilivote.answerLeft = image.public_id;
     if(this.photoID == 2)
     this.newChilivote.answerRight = image.public_id;
  }, (err) => {
    console.log(err);
    this.loading = false;
  });
 };
 }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.uploadToCloudinary(file);
  }

  submitChilivote(){
    this.loading = true;
    this.chilivoteService.addChilivote(this.newChilivote).subscribe(()=> {
      this.loading = false;
      this.router.navigate(['mychilivotes']);
    });
  }
}
