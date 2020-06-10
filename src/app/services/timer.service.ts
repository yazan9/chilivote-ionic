import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private AuthenticationURL: string;
  env = environment;

  constructor() {}
}
