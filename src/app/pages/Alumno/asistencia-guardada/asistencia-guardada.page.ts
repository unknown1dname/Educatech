import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-guardada',
  templateUrl: './asistencia-guardada.page.html',
  styleUrls: ['./asistencia-guardada.page.scss'],
})
export class AsistenciaGuardadaPage implements OnInit {
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.asignatura = navigation.extras.state['asignatura'] || 'N/A';
      this.seccion = navigation.extras.state['seccion'] || 'N/A';
      this.fecha = navigation.extras.state['fecha'] || 'N/A';
    }

    
  }

  volverInicio() {
    this.router.navigate(['/inicio']); // Redirige al panel principal del estudiante
  }
  
}
