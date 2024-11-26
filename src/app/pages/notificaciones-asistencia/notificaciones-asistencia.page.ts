import { Component } from '@angular/core';

@Component({
  selector: 'app-notificaciones-asistencia',
  templateUrl: './notificaciones-asistencia.page.html',
  styleUrls: ['./notificaciones-asistencia.page.scss'],
})
export class NotificacionesAsistenciaPage {
  notificaciones = [
    { mensaje: 'Has alcanzado el 80% de inasistencias.', fecha: '2024-10-10' },
    { mensaje: 'Falta una clase para llegar al límite.', fecha: '2024-10-15' }
  ];
}
