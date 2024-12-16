import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetroalimentacionAsistenciaPageRoutingModule } from './retroalimentacion-asistencia-routing.module';

import { RetroalimentacionAsistenciaPage } from './retroalimentacion-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetroalimentacionAsistenciaPageRoutingModule
  ],
  declarations: [RetroalimentacionAsistenciaPage]
})
export class RetroalimentacionAsistenciaPageModule {}
