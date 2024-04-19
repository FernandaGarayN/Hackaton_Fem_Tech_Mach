import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProbandoPageRoutingModule } from './probando-routing.module';

import { ProbandoPage } from './probando.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProbandoPageRoutingModule
  ],
  declarations: [ProbandoPage]
})
export class ProbandoPageModule {}
