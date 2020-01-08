import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConnectionsPage } from './connections.page';
import { SharedModule } from '../shared.module';
import { ConnectionsPageRoutingModule } from './connections-routing,module';

const routes: Routes = [
  {
    path: '',
    component: ConnectionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ConnectionsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConnectionsPage]
})
export class ConnectionsPageModule {}
