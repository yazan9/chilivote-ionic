import { Injectable } from '@angular/core';
import { CloudinaryService } from './cloudinary.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private cloudinaryService: CloudinaryService) { }

  parseAvatarString(avatar:string):string
  {
    if(avatar){
      let url = avatar.substr(avatar.indexOf('url='));
      let removedUrl = url.substr(4, url.indexOf(',')-4);
      return removedUrl;
    }
    else{
      return "assets/images/avatar.png";
    }    
  }

  buildAvatarUrl(cloudinaryId:string){
    return `${this.cloudinaryService.getCloudinaryImageUrl()}${cloudinaryId},`;
  }
}
