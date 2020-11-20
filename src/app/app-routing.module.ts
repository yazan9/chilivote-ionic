import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROLES } from './constants/roles';

const routes: Routes = [

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  { path: 'new-chilivote', loadChildren: './pages/new-chilivote/new-chilivote.module#NewChilivotePageModule', 
    data: {roles: [ROLES.CHILIVOTER, ROLES.MASTER, ROLES.LEGEND, ROLES.ACTIVE, ROLES.VOTER, ROLES.DECENT]} },
  { path: 'main', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: []},
  { path: 'mychilivotes', loadChildren: './pages/my-chilivotes/my-chilivotes.module#MyChilivotesPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'connections', loadChildren: './pages/connections/connections.module#ConnectionsPageModule' },
  { path: 'followers-tab', loadChildren: './pages/followers-tab/followers-tab.module#FollowersTabPageModule' },
  { path: 'following-tab', loadChildren: './pages/following-tab/following-tab.module#FollowingTabPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'chilivote-details/:id', loadChildren: './pages/chilivote-details/chilivote-details.module#ChilivoteDetailsPageModule'}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
