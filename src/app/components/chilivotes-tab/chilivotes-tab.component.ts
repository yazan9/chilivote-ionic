import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AnswerVoteDTO } from 'src/app/models/AnswerVoteDTO';
import { UserService } from 'src/app/services/user.service';
import { PopoverController } from '@ionic/angular';
import { HideReportPopoverComponent } from '../hide-report-popover/hide-report-popover.component';

@Component({
  selector: 'app-chilivotes-tab',
  templateUrl: './chilivotes-tab.component.html',
  styleUrls: ['./chilivotes-tab.component.scss'],
})
export class ChilivotesTabComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() chilivotes;
  @Input() votable:boolean;
  @Input() followEnabled:boolean;
  @Input() currentChilivote;
  @Input() showVotesAtAllTimes:boolean;
  //@Output() follow = new EventEmitter();
  //@Output() unfollow = new EventEmitter();
  @Output() voted = new EventEmitter();
  votesTracker: Record<number,boolean>;

  constructor(
    private userService: UserService,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.votesTracker = {};
  }

  ngAfterViewInit(){
    
  }

  ngOnChanges(obj: SimpleChanges){
    if(obj.currentChilivote){
      this.chilivotes = [];
      this.chilivotes.push(obj.currentChilivote.currentValue);
    }

    if(obj.chilivotes){
      this.chilivotes.forEach(c => {
        if(c.answerLeft.voted || c.answerRight.voted){
          this.votesTracker[c.id] = true;
        }
      }
      );
    }
  }

  // onFollow(chilivote:any){
  //   this.follow.emit(chilivote);
  // }

  // onUnfollow(chilivote:any){
  //   this.unfollow.emit(chilivote);
  // }

  onFollow(chilivote)
  {
    this.userService.follow(chilivote.userId).subscribe(() => {
      let chilivotes = this.chilivotes.filter(c => c.userId === chilivote.userId);
      chilivotes.forEach(c => c.isFollowing = true);
    })
  }

  onUnfollow(chilivote)
  {
    this.userService.unfollow(chilivote.userId).subscribe(() => {
      let chilivotes = this.chilivotes.filter(c => c.userId === chilivote.userId);
      chilivotes.forEach(c => c.isFollowing = false);
    })  
  }

  vote(answer: AnswerVoteDTO, theOtherAnswer: AnswerVoteDTO, chilivote){
    if(!this.votable) return;
    this.voted.emit({answer: answer, theOtherAnswer: theOtherAnswer});
    this.votesTracker[chilivote.id] = true;
    answer.votes++;
    if(theOtherAnswer.voted)
      theOtherAnswer.votes--;
  }

  async presentPopover(ev: any, chilivote) {
    const popover = await this.popoverController.create({
      component: HideReportPopoverComponent,
      event: ev,
      translucent: true
    });
    popover.present();

    return popover.onDidDismiss().then(
      (response:any) => {
        if(response.data === "hide"){
          this.userService.hideChilivote(chilivote.id).subscribe(()=>{
            this.removeChilivote(chilivote);
          });

        }
        else if(response.data === "report"){
          this.userService.hideAndReportChilivote(chilivote.id).subscribe(()=>{
            this.removeChilivote(chilivote);
          });
        }
      }
    )
  }

  removeChilivote(chilivote) {
    let index = this.chilivotes.find(chilivote);
    if (index != -1) {
      this.chilivotes.splice(index, 1);
    }
  }
}
