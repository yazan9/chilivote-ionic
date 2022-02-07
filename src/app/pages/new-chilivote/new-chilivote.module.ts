import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewChilivotePage } from './new-chilivote.page';
import { SharedModule } from '../../shared.module';
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
    component: NewChilivotePage
  },
  { path: 'mychilivotes',
    loadChildren: () => import('../my-chilivotes/my-chilivotes.module').then(m => m.MyChilivotesPageModule)
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
  declarations: [NewChilivotePage],
})
export class NewChilivotePageModule {}
