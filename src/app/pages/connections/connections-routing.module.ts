import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionsPage } from './connections.page';

const routes: Routes = [
  {
    path: 'connections',
    component: ConnectionsPage,
    children: [
      {
        path: 'followersTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../followers-tab/followers-tab.module').then(m => m.FollowersTabPageModule)
          }
        ]
      },
      {
        path: 'followingTab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../following-tab/following-tab.module').then(m => m.FollowingTabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/connections/followersTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/connections/connections/followersTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsPageRoutingModule {}
