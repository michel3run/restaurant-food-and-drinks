import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondarydishPage } from './secondarydish.page';

const routes: Routes = [
  {
    path: '',
    component: SecondarydishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondarydishPageRoutingModule {}
