import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalStockPageRoutingModule } from './modal-stock-routing.module';

import { ModalStockPage } from './modal-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalStockPageRoutingModule
  ],
  declarations: [ModalStockPage]
})
export class ModalStockPageModule {}
