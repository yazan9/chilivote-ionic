import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-hide-report-popover',
  templateUrl: './hide-report-popover.component.html',
  styleUrls: ['./hide-report-popover.component.scss'],
})
export class HideReportPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  hide(){
    this.popoverController.dismiss("hide");
  }

  hideAndReport(){
    this.popoverController.dismiss("report");
  }

}
