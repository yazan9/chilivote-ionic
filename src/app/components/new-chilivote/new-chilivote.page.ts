import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';
import { PhotoOptions } from '../../Constants/PhotoOptions';
import { ChilivoteDTOUI } from '../../models/ChilivoteDTOUI';
import { ChilivoteService } from '../../services/chilivote.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-chilivote',
  templateUrl: './new-chilivote.page.html',
  styleUrls: ['./new-chilivote.page.scss'],
})
export class NewChilivotePage implements OnInit {
  newChilivote: ChilivoteDTOUI;
  photoID: number;
  loading: boolean = false;

  constructor(
    private cloudinaryService: CloudinaryService,
    private chilivoteService: ChilivoteService,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {
    this.newChilivote = new ChilivoteDTOUI();
    this.photoID = 1;
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
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
    // this.UploadBottomSheetRef = this._bottomSheet.open(UploadBottomSheetComponent);
    // this.UploadBottomSheetRef.afterDismissed().subscribe((result:PhotoOptions) => {
    //   this.photoID = photoID;
    //   if(result == PhotoOptions.Gallery)
    //   {
    //     let element:HTMLElement = document.getElementById("PhotoUploader") as HTMLElement;
    //     element.click();
    //   }
    //   if(result == PhotoOptions.Camera)
    //   {
    //     //open camera
    //   }
    // });
  }

  ChooseFromGallery(photoID: number)
  {
    this.photoID = photoID;
    let element:HTMLElement = document.getElementById("PhotoUploader") as HTMLElement;
    element.click();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
    console.log("---------");
    console.log(this.photoID);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
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

  submitChilivote(){
    this.loading = true;
    this.chilivoteService.addChilivote(this.newChilivote).subscribe(()=> {
      this.loading = false;
      this.router.navigate(['mychilivotes']);
    });
  }
}
