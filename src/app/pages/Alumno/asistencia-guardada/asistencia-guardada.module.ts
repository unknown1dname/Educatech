import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaGuardadaPageRoutingModule } from './asistencia-guardada-routing.module';

import { AsistenciaGuardadaPage } from './asistencia-guardada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaGuardadaPageRoutingModule
  ],
  declarations: [AsistenciaGuardadaPage]
})
export class AsistenciaGuardadaPageModule {}
