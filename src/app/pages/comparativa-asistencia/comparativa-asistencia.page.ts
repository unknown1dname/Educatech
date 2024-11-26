import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-comparativa-asistencia',
  templateUrl: './comparativa-asistencia.page.html',
  styleUrls: ['./comparativa-asistencia.page.scss'],
})
export class ComparativaAsistenciaPage implements OnInit {
  cursos = [{ nombre: '003D' }, { nombre: '002D' }, { nombre: '004D' }];
  cursoSeleccionado: string = '';
  asistenciaChart: any;

  ngOnInit() {
    this.cargarAsistencia();
  }

  cargarAsistencia() {
    // Simulación de datos de asistencia
    const data = [90, 85, 70, 95]; // Ejemplo de datos de asistencia
    this.generarGrafico(data);
  }

  generarGrafico(data: number[]) {
    // Destruir el gráfico anterior si existe
    if (this.asistenciaChart) {
      this.asistenciaChart.destroy();
    }

    // Generar el nuevo gráfico
    const ctx = document.getElementById('asistenciaChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('No se encontró el elemento del gráfico.');
      return;
    }

    this.asistenciaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Estudiante 1', 'Estudiante 2', 'Estudiante 3', 'Estudiante 4'],
        datasets: [{
          label: 'Asistencia (%)',
          data: data,
          fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Comparativa de Asistencia por Curso'
          }
        }
      }
    });
  }
}
