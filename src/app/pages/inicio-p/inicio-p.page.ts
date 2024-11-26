import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio-p.page.html',
  styleUrls: ['./inicio-p.page.scss'],
})
export class InicioPPage {

  constructor(private router: Router) {}

  irANotas() {
    this.router.navigate(['/comparativa-notas']);
  }

  irAlQrScanner() {
    this.router.navigate(['/generar-qr']); // Cambiar la ruta a '/generar-qr'
  }
  
  irAAsistencia(){
    this.router.navigate(['/comparativa-asistencia'])
  }
}
