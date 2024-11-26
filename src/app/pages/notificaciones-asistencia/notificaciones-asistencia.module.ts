import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesAsistenciaPageRoutingModule } from './notificaciones-asistencia-routing.module';

import { NotificacionesAsistenciaPage } from './notificaciones-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesAsistenciaPageRoutingModule
  ],
  declarations: [NotificacionesAsistenciaPage]
})
export class NotificacionesAsistenciaPageModule {}
