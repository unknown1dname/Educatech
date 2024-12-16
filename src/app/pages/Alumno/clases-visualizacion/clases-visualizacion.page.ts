import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from 'src/app/services/supabase.service'; // Asegúrate de que la importación esté correcta

@Component({
  selector: 'app-clases-visualizacion',
  templateUrl: './clases-visualizacion.page.html',
  styleUrls: ['./clases-visualizacion.page.scss'],
})
export class ClasesVisualizacionPage implements OnInit {
  asignaturas: any[] = []; // Lista de asignaturas del usuario
  clases: any[] = []; // Clases asociadas a la sección del usuario
  asistencias: any[] = []; // Asistencias del usuario
  usuarioID: string = '';
  seccion: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    // Verificar sesión activa
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError);
      this.router.navigate(['/login']);  // Redirigir a la página de login si no hay sesión
      return;
    }

    console.log('Sesión activa:', session);

    // Obtener ID del usuario y la sección desde el session o localStorage
    this.usuarioID = localStorage.getItem('usuarioID') || '';
    this.seccion = localStorage.getItem('seccion') || '';

    if (!this.usuarioID || !this.seccion) {
      this.router.navigate(['/login']); // Si no se encuentra la información, redirigir a login
      return;
    }

    console.log('UsuarioID:', this.usuarioID);
    console.log('Sección:', this.seccion);

    // Obtener las clases asociadas a la sección del usuario
    const { data: clases, error: errorClases } = await supabase
      .from('clases')
      .select('*')
      .eq('seccion', this.seccion); // Filtrar por la sección del usuario

    if (errorClases) {
      console.error('Error al obtener las clases:', errorClases);
      return;
    }
    this.clases = clases;

    // Obtener las asistencias del usuario
    const { data: asistencias, error: errorAsistencias } = await supabase
      .from('asistencias')
      .select('*')
      .eq('estudiante_id', this.usuarioID);

    if (errorAsistencias) {
      console.error('Error al obtener las asistencias:', errorAsistencias);
      return;
    }
    this.asistencias = asistencias;

    // Aquí puedes filtrar y contar las asistencias y clases según tus necesidades
    // Ejemplo de cómo puedes hacerlo:
    this.asignaturas = [...new Set(this.clases.map(clase => clase.asignatura))]; // Obtener asignaturas únicas
  }

  // Contar las clases totales para una asignatura
  getClasesTotalesCount(asignatura: string): number {
    return this.clases.filter(clase => clase.asignatura === asignatura).length;
  }

  // Contar las clases asistidas para una asignatura
  getClasesAsistidasCount(asignatura: string): number {
    return this.asistencias.filter(asistencia => 
      this.clases.some(clase => clase.id === asistencia.clase_id && clase.asignatura === asignatura)
    ).length;
  }

  // Contar las clases faltadas para una asignatura
  getClasesFaltadasCount(asignatura: string): number {
    const totalClases = this.getClasesTotalesCount(asignatura);
    const clasesAsistidas = this.getClasesAsistidasCount(asignatura);
    return totalClases - clasesAsistidas;
  }
}
