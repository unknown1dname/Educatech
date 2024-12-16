import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetroalimentacionAsistenciaPage } from './retroalimentacion-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: RetroalimentacionAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetroalimentacionAsistenciaPageRoutingModule {}
