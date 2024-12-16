import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { supabase } from 'src/app/services/supabase.service'; // Asegúrate de importar tu configuración de Supabase

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  seccion: string = '';
  asignatura: string = '';
  codigoQR: string | null = null;
  usuarioID: string = '';

  constructor(private router: Router) {
    // Recuperamos el ID del usuario desde el localStorage
    const usuarioID = localStorage.getItem('usuarioID');
    if (usuarioID) {
      this.usuarioID = usuarioID;
    } else {
      console.error('No se encontró el usuarioID en el almacenamiento local');
      // Manejar el caso donde no se encuentra el usuarioID
      this.router.navigate(['/login']);  // Redirigir a la página de login si no hay usuario autenticado
    }
  }

  async generarCodigoQR() {
    try {
      console.log('Usuario ID:', this.usuarioID);
      console.log('Asignatura:', this.asignatura); // Verifica el valor de asignatura
      console.log('Sección:', this.seccion);       // Verifica el valor de sección

      // Obtener la fecha actual
      const fechaActual = new Date().toISOString(); // ISO String, que es adecuado para la base de datos

      // Crear un identificador único para la clase (puedes usar un UUID o algo que garantice unicidad)
      const claseID = Date.now();  // Generar un número único basado en el tiempo (por ejemplo, 1734215645666)

      // Crear el objeto con la información de la clase
      const claseData = {
        id: claseID,
        asignatura: this.asignatura,
        seccion: this.seccion,
        fecha: fechaActual,
        profesor_id: this.usuarioID, // Asignar el ID del profesor
      };

      // Generar el código QR con la información de la clase
      this.codigoQR = await QRCode.toDataURL(JSON.stringify(claseData));

      // Guardar la clase en la base de datos (Supabase)
      const { data, error } = await supabase.from('clases').insert([{
        id: claseID,
        asignatura: this.asignatura,
        seccion: this.seccion,
        fecha: fechaActual,
        profesor_id: this.usuarioID, // Incluir el ID del profesor aquí
        codigo_qr: this.codigoQR,
      }]);

      if (error) {
        console.error('Error al guardar la clase:', error);
        alert('Hubo un problema al guardar la clase');
        return;
      }

      alert('Clase guardada correctamente');
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      alert('Hubo un problema al generar el código QR');
    }
  }
}
