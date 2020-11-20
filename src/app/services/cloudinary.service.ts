import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getCloudinaryImageUrl(){
    return "https://res.cloudinary.com/dzv1zwbj5/image/upload/";
  }

  public uploadAnswer(file: any): Observable<any> {
    return this.http.post("https://api.cloudinary.com/v1_1/dzv1zwbj5/image/upload", { "file": file, "upload_preset": "z9mycu78" })
  }

  public uploadRawAnswer(file: any): Observable<any> {
    return this.http.post("https://api.cloudinary.com/v1_1/dzv1zwbj5/raw/upload", { "file": file, "upload_preset": "z9mycu78" })
  }

  public uploadAvatar(file: any): Observable<any> {
    return this.http.post("https://api.cloudinary.com/v1_1/dzv1zwbj5/image/upload", { "file": file, "upload_preset": "z9mycu78" })
  }

  public dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  public getCameraOptions(camera: Camera):CameraOptions{
    const options: CameraOptions = {
      quality: 20,
      destinationType: camera.DestinationType.DATA_URL,
      encodingType: camera.EncodingType.JPEG,
      mediaType: camera.MediaType.PICTURE,
      targetWidth: 720,
      correctOrientation: true
    }

    return options;
  }
  
}
