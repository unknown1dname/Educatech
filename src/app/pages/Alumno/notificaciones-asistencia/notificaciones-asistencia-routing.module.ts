import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesAsistenciaPage } from './notificaciones-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesAsistenciaPageRoutingModule {}
