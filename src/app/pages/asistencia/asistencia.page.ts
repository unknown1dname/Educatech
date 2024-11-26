import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {

  constructor(private router: Router) {}

  irAAsistencia() {
    this.router.navigate(['/resumen-asistencia']);
  }

  irAlQrScanner() {
    this.router.navigate(['/qr-scanner']);
  }

  irAAsistenciaH(){
    this.router.navigate(['/retroalimentacion-asistencia'])
  }
}
