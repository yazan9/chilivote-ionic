import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ToastService } from './toast.service';

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

  //Observable sources
  private rankUpdatedSource = new BehaviorSubject('');
  private debugStringsSource = new BehaviorSubject('Initialized Debugger >> ');

  //Observable streams
  public rankUpdated$ = this.rankUpdatedSource.asObservable();
  public debugMessageUpdated$ = this.debugStringsSource.asObservable();

  role: string = "";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private fb: Facebook,
    private storage: Storage,
    private toastService: ToastService
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
        this.startUpdateTimer();
      }, err => {
        this.loadingSource.next(false);
        this.toastService.presentToast("Error logging in");
      });
    } else if (res.status === 'not_authorized') {
      this.loadingSource.next(false);
      // The user is logged in on Facebook, but has not authorized your app
    }
    else {
      this.loadingSource.next(false);
    }
    console.log('Logged into Facebook!', res);
  })
  .catch(e => console.log('Error logging into Facebook', e));
  }

  public emailLogin(email:string, password:string){
    this.loadingSource.next(true);
    this.http.post(this.AuthenticationURL + '/users/emailLogin', {email:email, password:password}).subscribe((data:TokenResponse) => {
      this.loadingSource.next(false);
      if (data.token) {
        this.saveToken(data.token);
        this.router.navigate(["tabs"]);
        this.startUpdateTimer();
      }
    }, err => {
      this.loadingSource.next(false);
      this.toastService.presentToast("Error logging in");
    })
  }

  public emailRegister(email:string, password:string, username: string){
    this.loadingSource.next(true);
    this.http.post(this.AuthenticationURL + '/users/register', {email:email, password:password, username: username}).subscribe((data:TokenResponse) => {
      this.loadingSource.next(false);
      if (data.token) {
        this.saveToken(data.token);
        this.router.navigate(["tabs"]);
        this.startUpdateTimer();
      }
    }, err => {
      this.loadingSource.next(false);
      this.toastService.presentToast("An error occured during registration");
    })
  }

  private login(FBToken: string): Observable<any> {
    let base = this.http.post(this.AuthenticationURL + '/users/login', { "FBToken": FBToken });
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
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
    this.broadcastDebugString(`Inside is Authorized: ${roles}`);
    return new Promise<boolean>((resolve) => this.getRole().then(r => {
      this.broadcastDebugString(`Role: ${r}`);
      let result = roles.find((role) => role === r);
      return resolve(!!result);      
    }, err => {
      this.broadcastDebugString("Error 503: " +  err);
    }));
  }

  public getRole():Promise<string>{
    this.broadcastDebugString(`Inside getRole -- `);
    return new Promise((resolve) => {
      let role = this.role;
      this.broadcastDebugString(`Role From Storage2: ${role}`);
        if(role){
          return resolve(role);
        }
        else{
          const httpOptions = {
            headers: this.getHeaders(),
            responseType : 'text' as 'text'
          };
          return this.http.get(this.AuthenticationURL + '/users/get_role', httpOptions).subscribe(role => {
            this.broadcastDebugString(`Role From Web: ${role}`);
            this.role = role;
            return resolve(role.toString());          
          }, err => {
            this.broadcastDebugString("Error 501: " +  err);
          })
        }
    });
  }

  startUpdateTimer(){
    setInterval(() => this.updateTimer(), 60000);
  }

  private updateTimer(){
    const httpOptions = {
      headers: this.getHeaders(),
      responseType : 'text' as 'text'
    };
    this.http.get(this.AuthenticationURL + '/users/get_role', httpOptions).subscribe(role => {
      this.role = role;
      this.broadcastRank(role); 
    });
  }

  broadcastRank(role){
    this.rankUpdatedSource.next(role);
  }

  broadcastDebugString(message: string){
    this.debugStringsSource.next(message);
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  }
}
