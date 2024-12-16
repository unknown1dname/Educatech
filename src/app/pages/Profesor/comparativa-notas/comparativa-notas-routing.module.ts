import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparativaNotasPage } from './comparativa-notas.page';

const routes: Routes = [
  {
    path: '',
    component: ComparativaNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparativaNotasPageRoutingModule {}
