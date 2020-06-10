import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mychilivote-options',
  templateUrl: './mychilivote-options.component.html',
  styleUrls: ['./mychilivote-options.component.scss'],
})
export class MychilivoteOptionsComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  delete(){
    this.popoverController.dismiss("delete");
  }

}
