import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimarydishPageRoutingModule } from './primarydish-routing.module';

import { PrimarydishPage } from './primarydish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimarydishPageRoutingModule
  ],
  declarations: [PrimarydishPage]
})
export class PrimarydishPageModule {}
