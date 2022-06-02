import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayRequestPage } from './pay-request.page';

const routes: Routes = [
  {
    path: '',
    component: PayRequestPage
  },  {
    path: 'modal-stock',
    loadChildren: () => import('./modalOutStock/modal-stock/modal-stock.module').then( m => m.ModalStockPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayRequestPageRoutingModule {}
