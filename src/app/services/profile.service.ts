import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { ProfileDTO } from '../models/ProfileDTO';
import { Observable } from 'rxjs';
import { AvatarService } from './avatar.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl:string;
  env = environment;

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  constructor(
    private http: HttpClient, 
    private authService:AuthenticationService,
    private avatarService: AvatarService
    ) {
    this.profileUrl = `${this.env.backendUri}/profile/`;
  }

  getProfile(): Observable<ProfileDTO>{
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<ProfileDTO>(this.profileUrl, httpOptions);
  }

  updateProfile(profile: ProfileDTO):Observable<void>{
    profile = {...profile}
    profile.avatar = this.avatarService.buildAvatarUrl(profile.avatar);
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<void>(this.profileUrl, profile, httpOptions);
  }
}
