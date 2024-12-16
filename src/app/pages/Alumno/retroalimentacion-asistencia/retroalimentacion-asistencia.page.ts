import { Component } from '@angular/core';

@Component({
  selector: 'app-retroalimentacion-asistencia',
  templateUrl: './retroalimentacion-asistencia.page.html',
  styleUrls: ['./retroalimentacion-asistencia.page.scss'],
})
export class RetroalimentacionAsistenciaPage {
  historialAsistencia = [
    { fecha: '2024-10-01', estado: 'Presente', comentario: '' },
    { fecha: '2024-10-05', estado: 'Ausente', comentario: '' }
  ];

  guardarComentarios() {
    // Lógica para guardar los comentarios
    console.log('Comentarios guardados:', this.historialAsistencia);
  }
}
