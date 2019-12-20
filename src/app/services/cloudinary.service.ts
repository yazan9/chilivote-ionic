import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(
    private http: HttpClient, 
    private router: Router, 
    //private authService : AuthenticationService
    ) { }
  
  public uploadAnswer(file: any): Observable<any>{
    //var token = this.authService.getToken();
    return this.http.post("https://api.cloudinary.com/v1_1/dzv1zwbj5/image/upload", {"file":file, "upload_preset": "z9mycu78"})
  }
  
  public uploadAvatar(file: any): Observable<any>{
    //var token = this.authService.getToken();
    return this.http.post("https://api.cloudinary.com/v1_1/dzv1zwbj5/image/upload", {"file":file, "upload_preset": "z9mycu78"})
  }
}
