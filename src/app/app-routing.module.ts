import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'primarydish',
    loadChildren: () => import('./pages/primarydish/primarydish.module').then( m => m.PrimarydishPageModule)
  },
  {
    path: 'secondarydish',
    loadChildren: () => import('./pages/secondarydish/secondarydish.module').then( m => m.SecondarydishPageModule)
  },
  {
    path: 'drinks',
    loadChildren: () => import('./pages/drinks/drinks.module').then( m => m.DrinksPageModule)
  },
  {
    path: 'dessert',
    loadChildren: () => import('./pages/dessert/dessert.module').then( m => m.DessertPageModule)
  },
  {
    path: 'pay-request',
    loadChildren: () => import('./pages/pay-request/pay-request.module').then( m => m.PayRequestPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
