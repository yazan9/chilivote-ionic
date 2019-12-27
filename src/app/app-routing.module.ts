import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { SharedModule } from './shared.module';

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
  { path: 'new-chilivote', loadChildren: './components/new-chilivote/new-chilivote.module#NewChilivotePageModule' },
  { path: 'main', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'mychilivotes', loadChildren: './components/my-chilivotes/my-chilivotes.module#MyChilivotesPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
