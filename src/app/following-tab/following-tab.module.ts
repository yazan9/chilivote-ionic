import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowingTabPage } from './following-tab.page';
import { SharedModule } from '../shared.module';
import { ConnectionsSearchPipe } from '../pipes/connections-search.pipe';

const routes: Routes = [
  {
    path: '',
    component: FollowingTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FollowingTabPage]
})
export class FollowingTabPageModule {}
