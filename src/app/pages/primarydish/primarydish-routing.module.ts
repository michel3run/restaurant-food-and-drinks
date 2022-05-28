import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimarydishPage } from './primarydish.page';

const routes: Routes = [
  {
    path: '',
    component: PrimarydishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimarydishPageRoutingModule {}
