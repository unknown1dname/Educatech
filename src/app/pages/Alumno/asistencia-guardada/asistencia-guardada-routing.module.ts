import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaGuardadaPage } from './asistencia-guardada.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaGuardadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaGuardadaPageRoutingModule {}
