import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyChilivotesPage } from './my-chilivotes.page';
import { SharedModule } from 'src/app/shared.module';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from '../../config';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

const routes: Routes = [
  {
    path: '',
    component: MyChilivotesPage
  },
  {
    path: 'mychilivotes',
    component: MyChilivotesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  declarations: [MyChilivotesPage]
})
export class MyChilivotesPageModule {}
