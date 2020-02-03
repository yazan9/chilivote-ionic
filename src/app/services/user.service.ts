import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private UserUrl:string;
  env = environment;

  constructor(private http: HttpClient, private authService:AuthenticationService) { 
    this.UserUrl = `${this.env.backendUri}/users`;
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  public search(searchText:string): Observable<UserDTO[]>
  {
    const httpOptions = {
      headers: this.getHeaders(),
      params: {q:searchText}
    };

    return this.http.get<UserDTO[]>(this.UserUrl + '/search', httpOptions);
  }

  public getFollowing(): Observable<UserDTO[]>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<UserDTO[]>(this.UserUrl + '/following', httpOptions);
  }

  public getFollowers(): Observable<UserDTO[]>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<UserDTO[]>(this.UserUrl + '/followers', httpOptions);
  }

  public getRandom(): Observable<UserDTO[]>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<UserDTO[]>(this.UserUrl + '/suggested_users', httpOptions);
  }

  public follow(id:number): Observable<any>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<any>(this.UserUrl + '/follow/' + id.toString(), "", httpOptions);
  }

  public unfollow(id:number): Observable<any>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<any>(this.UserUrl + '/unfollow/' + id.toString(), "", httpOptions);
  }
}
