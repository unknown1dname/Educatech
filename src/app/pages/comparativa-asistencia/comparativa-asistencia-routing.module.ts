import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparativaAsistenciaPage } from './comparativa-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ComparativaAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparativaAsistenciaPageRoutingModule {}
