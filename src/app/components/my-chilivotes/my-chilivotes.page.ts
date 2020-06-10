import { Component, OnInit } from '@angular/core';
import { ChilivoteService } from 'src/app/services/chilivote.service';
import { UserDetails, AuthenticationService } from 'src/app/services/authentication.service';
import { MyChilivoteDTO } from 'src/app/models/MyChilivoteDTO';
import { PopoverController, ActionSheetController } from '@ionic/angular';
import { MychilivoteOptionsComponent } from '../mychilivote-options/mychilivote-options.component';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-my-chilivotes',
  templateUrl: './my-chilivotes.page.html',
  styleUrls: ['./my-chilivotes.page.scss'],
})
export class MyChilivotesPage implements OnInit {

  chilivotes: MyChilivoteDTO[] = [];
  user: UserDetails;
  DeleteBottomSheetRef;
  avatar:string;

  constructor(private chilivotesService: ChilivoteService, 
    private auth: AuthenticationService,
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    public avatarService:AvatarService
    ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.user = this.auth.getUserDetails();
    this.avatar = this.avatarService.parseAvatarString(this.user.avatar);

    this.chilivotesService.getMyChilivotes().subscribe((result)=>{
      this.chilivotes = result;
    });
  }

  

  async presentPopover(ev: any, chilivote) {
    const popover = await this.popoverController.create({
      component: MychilivoteOptionsComponent,
      event: ev,
      translucent: true
    });
    popover.present();

    return popover.onDidDismiss().then(
      (response:any) => {
        if(response.data === "delete"){
          this.openBottomSheet(chilivote);
        }
      }
    )
  }

  async openBottomSheet(chilivote) {
    const actionSheet = await this.actionSheetController.create({
      header: "Are you sure? You will lose all the votes on this post",
      buttons: [{
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.deleteChilivote(chilivote)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        handler: () => {
          this.actionSheetController.dismiss();
        }
      }]
    });
    await actionSheet.present();
  }

  deleteChilivote(chilivote){
    this.chilivotesService.deleteChilivote(chilivote.id).subscribe((result)=>{
      const index: number = this.chilivotes.indexOf(chilivote);
      if (index !== -1) {
        this.chilivotes.splice(index, 1);
      }
  });         
  }
}
