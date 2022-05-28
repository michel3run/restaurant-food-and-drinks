import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayRequestPageRoutingModule } from './pay-request-routing.module';

import { PayRequestPage } from './pay-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayRequestPageRoutingModule
  ],
  declarations: [PayRequestPage]
})
export class PayRequestPageModule {}
