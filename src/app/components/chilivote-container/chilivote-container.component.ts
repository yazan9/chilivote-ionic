import { Component, OnInit, Input } from '@angular/core';
import { ChilivoteVotableDTO } from '../../models/ChilivoteVotableDTO';
import { ChilivoteService } from '../../services/chilivote.service';
import { VoteService } from '../../services/vote.service';
import { AnswerVoteDTO } from '../../models/AnswerVoteDTO';

@Component({
  selector: 'app-chilivote-container',
  templateUrl: './chilivote-container.component.html',
  styleUrls: ['./chilivote-container.component.scss'],
})
export class ChilivoteContainerComponent implements OnInit {
  // chilivotes: ChilivoteVotableDTO[] = [];
  @Input() chilivote: ChilivoteVotableDTO;
  avatar:string;
  
  constructor(private chilivoteService: ChilivoteService, private voteService:VoteService) { }
  
  ngOnInit() {
    // this.chilivoteService.getFeed().subscribe((result) => {
    //   this.chilivotes = result;
    // });
  }

  vote(answer: AnswerVoteDTO, theOtherAnswer: AnswerVoteDTO)
  {
    this.voteService.vote(answer.id).subscribe(()=> {
      answer.voted = true;
      theOtherAnswer.voted = false;
    });
  }

}
