import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparativaNotasPageRoutingModule } from './comparativa-notas-routing.module';

import { ComparativaNotasPage } from './comparativa-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparativaNotasPageRoutingModule
  ],
  declarations: [ComparativaNotasPage]
})
export class ComparativaNotasPageModule {}
