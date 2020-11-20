import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from '../../config';
import { SharedModule } from '../../shared.module';
import { ChilivoteDetailsPage } from './chilivote-details.page';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

const routes: Routes = [
  {
    path: '',
    component: ChilivoteDetailsPage
  },
  { path: 'chilivote-details',
    loadChildren: () => import('./chilivote-details.page').then(m => m.ChilivoteDetailsPage)
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
  declarations: [ChilivoteDetailsPage]
})
export class ChilivoteDetailsPageModule {}
