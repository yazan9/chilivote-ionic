import { Component, OnInit } from '@angular/core';
import { ChilivoteService } from 'src/app/services/chilivote.service';
import { UserDetails, AuthenticationService } from 'src/app/services/authentication.service';
import { MyChilivoteDTO } from 'src/app/models/MyChilivoteDTO';

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
    ) { }

  ngOnInit() {

    this.user = this.auth.getUserDetails();
    this.avatar = this.parseAvatarString(this.user.avatar);

    this.chilivotesService.getMyChilivotes().subscribe((result)=>{
      this.chilivotes = result;
    });
  }

  parseAvatarString(avatar:string):string
  {
    let url = avatar.substr(avatar.indexOf('url='));
    let removedUrl = url.substr(4, url.indexOf(',')-4);
    return removedUrl;
  }

  onDelete(chilivote: MyChilivoteDTO) {
      // this.DeleteBottomSheetRef = this._bottomSheet.open(DeleteChilivoteSheetComponent);
      // this.DeleteBottomSheetRef.afterDismissed().subscribe((result:boolean) => {
      //   if(result == true)
      //   {
      //       this.chilivotesService.deleteChilivote(chilivote.id).subscribe((result)=>{
      //         const index: number = this.chilivotes.indexOf(chilivote);
      //         if (index !== -1) {
      //           this.chilivotes.splice(index, 1);
      //         }
      //     });          
      //   }
      // });
  }
}
