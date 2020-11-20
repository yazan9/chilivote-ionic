import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { NotificationDTO } from '../models/NotificationDTO';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: NotificationDTO[] = [];

  //Observable Sources
  private notificationsCountSource = new BehaviorSubject(0);

  //Observable Streams
  public notificationsCount$ = this.notificationsCountSource.asObservable();

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

  getNotificationsCount(){
    return this.notifications.length;
  }

  getAllNotifications(): Promise<NotificationDTO[]>{
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: this.getHeaders()
      };
  
      return this.http.get<NotificationDTO[]>(this.notificationsURL, httpOptions).subscribe(notifications => {
        this.notifications = notifications;
        this.broadcastNotificationCount();
        return resolve(notifications);
      }, err => reject());
    })
  }

  readNotification(id:number): Promise<void>{
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: this.getHeaders()
      };
  
      return this.http.delete(this.notificationsURL + id, httpOptions).subscribe(() => {
        let index = this.notifications.findIndex(n => n.chilivoteId === id);
        if(index !== -1){
          this.notifications.splice(index, 1);
          this.broadcastNotificationCount();
        }
        return resolve();
      }, err => reject());
    });
  }

  broadcastNotificationCount(){
    this.notificationsCountSource.next(this.getNotificationsCount());
  }
}
