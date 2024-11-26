import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparativaAsistenciaPageRoutingModule } from './comparativa-asistencia-routing.module';

import { ComparativaAsistenciaPage } from './comparativa-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparativaAsistenciaPageRoutingModule
  ],
  declarations: [ComparativaAsistenciaPage]
})
export class ComparativaAsistenciaPageModule {}
