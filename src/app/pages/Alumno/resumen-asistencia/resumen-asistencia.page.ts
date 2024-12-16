import { Component } from '@angular/core';

@Component({
  selector: 'app-resumen-asistencia',
  templateUrl: './resumen-asistencia.page.html',
  styleUrls: ['./resumen-asistencia.page.scss'],
})
export class ResumenAsistenciaPage {
  totalClases = 30;
  clasesAsistidas = 24;
  clasesFaltadas = 6;
  porcentajeAsistencia = (this.clasesAsistidas / this.totalClases) * 100;
  clasesRestantes = Math.floor(this.totalClases * 0.8) - this.clasesAsistidas;
}
