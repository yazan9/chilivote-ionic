import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { TimerService } from './timer.service';

export interface UserDetails {
  id:number;
  email: string;
  avatar: string;
  exp: number;
  username: string;
  role: string;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private AuthenticationURL: string
  env = environment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private loadingSource = new Subject<boolean>();

  loading$ = this.loadingSource.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private fb: Facebook,
    private storage: Storage
    ) { 
    this.AuthenticationURL = `${this.env.backendUri}`;
  }

  fbLogin()
  {
    this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {
    if (res.status === 'connected') {
      this.login(res.authResponse.accessToken).subscribe(()=>{
        this.loadingSource.next(false);
        this.router.navigate(["tabs"]);
        this.startRoleCheckTimer();
      });
    } else if (res.status === 'not_authorized') {
      this.loadingSource.next(false);
      // The user is logged in on Facebook, but has not authorized your app
    }
    else {
      this.loadingSource.next(false);
    //   this.logout();
    }
    console.log('Logged into Facebook!', res);
  })
  .catch(e => console.log('Error logging into Facebook', e));
  }

  private login(FBToken: string): Observable<any> {
    let base = this.http.post(this.AuthenticationURL + '/users/login', { "FBToken": FBToken });
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          console.log(data.token);
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  private saveToken(token: string): void {
    localStorage.removeItem('mean-token');
    localStorage.setItem('mean-token', token);
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
     payload = token.split('.')[1];
     payload = window.atob(payload);
     return JSON.parse(payload);
    }
    else {
     return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } 
    else {
      return false;
    }
  }

  public getToken(): string {
    return localStorage.getItem('mean-token');
  }

  public logout(): void {
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }

  public isAuthorized(roles:string[]): Promise<boolean>
  {
    //let result = roles.find((role) => role === this.getUserDetails().role);
    return new Promise<boolean>((resolve) => {this.getRole().then(r => {
      let result = roles.find((role) => role === r);
      resolve(!!result);      
    })
  });
  }

  public getRole():Promise<string>{
    return new Promise((resolve) => {
      this.storage.get('role').then((role) => {
        if(role){
          resolve(role);
        }
        else{
          const httpOptions = {
            headers: this.getHeaders()
          };
          this.http.get(this.AuthenticationURL + '/users/get_role', httpOptions).subscribe(role => {
            this.storage.set('role', role);
            resolve(role.toString());
          })
        }
      })
    });
  }

  startRoleCheckTimer(){
    setInterval(() => this.updateRole(), 60000);
  }

  private updateRole(){
    const httpOptions = {
      headers: this.getHeaders(),
      responseType : 'text' as 'text'
    };
    this.http.get(this.AuthenticationURL + '/users/get_role', httpOptions).subscribe(role => {
      this.storage.set('role', role);
      console.log(role);
    })    
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  }
}
