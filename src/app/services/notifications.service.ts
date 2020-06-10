import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { NotificationDTO } from '../models/NotificationDTO';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationsURL:string;
  env = environment;

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  constructor(private http: HttpClient, private authService:AuthenticationService) {
    this.notificationsURL = `${this.env.backendUri}/notifications/`;
  }

  getAllNotifications(){
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<NotificationDTO[]>(this.notificationsURL, httpOptions);
  }
}
