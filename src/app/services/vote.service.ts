import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { AnswerVoteDTO } from '../models/AnswerVoteDTO';
import { AnswerVotePairDTO } from '../models/AnswerVotePairDTO';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private VoteUrl:string;
  env = environment;

  constructor(private http: HttpClient, private authService:AuthenticationService) { 
    this.VoteUrl = `${this.env.backendUri}/votes`;
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  vote(id: number): Observable<void>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<any>(this.VoteUrl + '/vote/' + id, "", httpOptions)
  } 

  voteAndGetAnswers(id: number): Observable<AnswerVotePairDTO[]>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<any>(this.VoteUrl + '/vote_return/' + id, "", httpOptions)
  }
}
