import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { SharedModule } from './shared.module';
import { AuthGuard } from './auth/auth.guard';
import { ROLES } from './Constants/roles';

const routes: Routes = [
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  {
    path: '',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  { path: 'new-chilivote', loadChildren: './components/new-chilivote/new-chilivote.module#NewChilivotePageModule', 
    data: {roles: [ROLES.CHILIVOTER, ROLES.MASTER, ROLES.LEGEND, ROLES.ACTIVE, ROLES.VOTER, ROLES.DECENT]} },
  { path: 'main', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'mychilivotes', loadChildren: './components/my-chilivotes/my-chilivotes.module#MyChilivotesPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'connections', loadChildren: './connections/connections.module#ConnectionsPageModule' },
  { path: 'followers-tab', loadChildren: './followers-tab/followers-tab.module#FollowersTabPageModule' },
  { path: 'following-tab', loadChildren: './following-tab/following-tab.module#FollowingTabPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
