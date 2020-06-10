import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  parseAvatarString(avatar:string):string
  {
    let url = avatar.substr(avatar.indexOf('url='));
    let removedUrl = url.substr(4, url.indexOf(',')-4);
    return removedUrl;
  }
}
