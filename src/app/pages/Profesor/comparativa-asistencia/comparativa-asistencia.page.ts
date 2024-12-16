import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

// Definir las interfaces para los tipos de datos
interface Estudiante {
  id: number;
  nombre: string;
  estado: 'asistido' | 'faltado';
}

interface Clase {
  id: number;
  asignatura: string;
  seccion: string;
  fecha: string;
  estudiantes: Estudiante[];
}

@Component({
  selector: 'app-comparativa-asistencia',
  templateUrl: './comparativa-asistencia.page.html',
  styleUrls: ['./comparativa-asistencia.page.scss'],
})
export class ComparativaAsistenciaPage implements OnInit {
  clasesConEstudiantes: Clase[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarDatosAsistencia();
  }

  async cargarDatosAsistencia() {
    try {
      const profesorID = localStorage.getItem('usuarioID');
      if (!profesorID) {
        this.router.navigate(['/login']);
        return;
      }

      // Obtener todas las clases creadas por el profesor
      const { data: clases, error: errorClases } = await supabase
        .from('clases')
        .select('*')
        .eq('profesor_id', profesorID);

      if (errorClases) {
        console.error('Error al cargar clases:', errorClases);
        return;
      }

      const clasesConEstudiantes: Clase[] = [];

      for (const clase of clases) {
        // Obtener todos los estudiantes de la misma sección
        const { data: estudiantes, error: errorEstudiantes } = await supabase
          .from('users')
          .select('id, nombre')
          .eq('seccion', clase.seccion);

        if (errorEstudiantes) {
          console.error('Error al cargar estudiantes:', errorEstudiantes);
          return;
        }

        // Obtener la asistencia para cada clase
        const { data: asistencia, error: errorAsistencia } = await supabase
          .from('asistencias')
          .select('estudiante_id')
          .eq('clase_id', clase.id);

        if (errorAsistencia) {
          console.error('Error al cargar asistencia:', errorAsistencia);
          return;
        }

        // Crear un array de estudiantes con su estado de asistencia
        const estudiantesConAsistencia: Estudiante[] = estudiantes.map((estudiante) => {
          const yaAsistido = asistencia.some((asistenciaItem) => asistenciaItem.estudiante_id === estudiante.id);
          return {
            id: estudiante.id,
            nombre: estudiante.nombre,
            estado: yaAsistido ? 'asistido' : 'faltado',
          };
        });

        // Agregar la clase con sus estudiantes y su estado de asistencia
        clasesConEstudiantes.push({
          id: clase.id,
          asignatura: clase.asignatura,
          seccion: clase.seccion,
          fecha: clase.fecha,
          estudiantes: estudiantesConAsistencia,
        });
      }

      // Asignar el resultado final para mostrar en la vista
      this.clasesConEstudiantes = clasesConEstudiantes;
    } catch (error) {
      console.error('Error al cargar los datos de asistencia:', error);
    }
  }
}
