import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  parseAvatarString(avatar:string):string
  {
    if(avatar){
      let url = avatar.substr(avatar.indexOf('url='));
      let removedUrl = url.substr(4, url.indexOf(',')-4);
      return removedUrl;
    }
    else{
      return "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
    }    
  }
}
