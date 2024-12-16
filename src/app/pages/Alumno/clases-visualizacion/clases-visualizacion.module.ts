import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesVisualizacionPageRoutingModule } from './clases-visualizacion-routing.module';

import { ClasesVisualizacionPage } from './clases-visualizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesVisualizacionPageRoutingModule
  ],
  declarations: [ClasesVisualizacionPage]
})
export class ClasesVisualizacionPageModule {}
