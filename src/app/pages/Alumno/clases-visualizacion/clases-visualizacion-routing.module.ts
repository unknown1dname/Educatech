import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesVisualizacionPage } from './clases-visualizacion.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesVisualizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesVisualizacionPageRoutingModule {}
