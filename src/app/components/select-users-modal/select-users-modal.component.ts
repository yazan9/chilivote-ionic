import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UserDTO } from 'src/app/models/UserDTO';

@Component({
  selector: 'app-select-users-modal',
  templateUrl: './select-users-modal.component.html',
  styleUrls: ['./select-users-modal.component.scss'],
})
export class SelectUsersModalComponent implements OnInit {

  @Input() followers: UserDTO[];
  selectedFollowers: number[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss({
      selectedUsers: this.selectedFollowers
    });
  }

  updateSelectedFollowers(selectedFollowers){
    this.selectedFollowers = selectedFollowers;
  }

}
