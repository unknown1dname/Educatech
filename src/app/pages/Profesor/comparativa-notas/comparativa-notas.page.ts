import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-comparativa-notas',
  templateUrl: './comparativa-notas.page.html',
  styleUrls: ['./comparativa-notas.page.scss'],
})
export class ComparativaNotasPage implements OnInit {
  cursos = [{ nombre: 'Software' }, { nombre: 'Etica' }, { nombre: 'Arquitectura' }, { nombre: 'Estadisticas' }, { nombre: 'programacion' }];
  cursoSeleccionado: string = '';
  notasChart: any;

  ngOnInit() {
    this.cargarNotas();
  }

  cargarNotas() {
    // Simulación de datos de calificaciones
    const data = [75, 80, 60, 90]; // Ejemplo de datos de notas
    this.generarGrafico(data);
  }

  generarGrafico(data: number[]) {
    // Destruir el gráfico anterior si existe
    if (this.notasChart) {
      this.notasChart.destroy();
    }

    // Generar el nuevo gráfico
    this.notasChart = new Chart('notasChart', {
      type: 'bar',
      data: {
        labels: ['Estudiante 1', 'Estudiante 2', 'Estudiante 3', 'Estudiante 4'],
        datasets: [{
          label: 'Calificaciones',
          data: data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
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
            text: 'Comparativa de Notas por Curso'
          }
        }
      }
    });
  }
}
