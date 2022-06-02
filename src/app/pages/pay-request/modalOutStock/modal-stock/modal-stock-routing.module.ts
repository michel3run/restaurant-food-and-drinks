import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalStockPage } from './modal-stock.page';

const routes: Routes = [
  {
    path: '',
    component: ModalStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalStockPageRoutingModule {}
