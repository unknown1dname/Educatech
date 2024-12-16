import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { supabase } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
      console.log('Escaneo de QR soportado:', this.isSupported);
    });
  }

  async scan(): Promise<void> {
    console.log('Iniciando escaneo del QR...');
    const granted = await this.requestPermissions();

    if (!granted) {
      this.presentAlert('Por favor, otorga permisos para usar la cámara.');
      return;
    }

    // Escanear el QR
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    console.log('Datos del código QR escaneado:', this.barcodes);

    const barcodeData = this.barcodes[0]?.displayValue;

    if (barcodeData) {
      console.log('Valor del primer código QR escaneado:', barcodeData);

      try {
        // Decodificar el contenido del QR
        const claseData = JSON.parse(barcodeData);
        console.log('Datos decodificados del QR:', claseData);

        const estudianteID = localStorage.getItem('usuarioID');
        const estudianteSeccion = localStorage.getItem('seccion'); // Sección del estudiante

        console.log('ID del estudiante obtenido del localStorage:', estudianteID);
        console.log('Sección del estudiante:', estudianteSeccion);

        if (!estudianteID || !estudianteSeccion) {
          this.presentAlert('Error: No se encontró el ID o la sección del estudiante. Inicia sesión de nuevo.');
          return;
        }

        console.log('Iniciando el registro de asistencia...');
        console.log('ID del estudiante:', estudianteID);
        console.log('ID de la clase:', claseData.id);
        console.log('Sección de la clase:', claseData.seccion);

        // Validar la sección del estudiante con la de la clase
        if (claseData.seccion !== estudianteSeccion) {
          console.log('La sección del estudiante no coincide con la de la clase.');
          this.presentAlert('No puedes registrar tu asistencia en esta clase porque no corresponde a tu sección.');
          return;
        }

        // Validar la sesión de Supabase
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error('Error de sesión:', sessionError);
          this.presentAlert('Sesión no válida. Por favor, inicia sesión nuevamente.');
          return;
        }

        console.log('Sesión activa:', session);

        // Verificar si la asistencia ya está registrada
        const { data: asistenciaExistente, error: errorExistente } = await supabase
          .from('asistencias')
          .select('*')
          .eq('estudiante_id', estudianteID)
          .eq('clase_id', claseData.id)
          .single(); // Solo esperamos un resultado

        if (asistenciaExistente) {
          console.log('La asistencia ya está registrada.');
          this.presentAlert('Ya has registrado tu asistencia para esta clase.');
          return;
        }

        // Datos a insertar en la tabla de asistencias con el campo estado
        const asistenciaData = {
          estudiante_id: estudianteID,
          clase_id: claseData.id,
          fecha: new Date().toISOString(),
          estado: 'asistido', // Cuando el QR se escanea correctamente, se marca como asistido
        };
        console.log('Datos de asistencia a insertar:', asistenciaData);

        // Guardar la asistencia en la base de datos
        const { data, error } = await supabase.from('asistencias').insert([asistenciaData]);

        if (error) {
          console.error('Error al registrar la asistencia:', error.message);
          this.presentAlert(`Error al registrar la asistencia: ${error.message}`);
        } else {
          console.log('Asistencia registrada con éxito:', data);
          this.presentAlert('Asistencia registrada correctamente.');
          this.router.navigate(['/asistencia-guardada'], {
            state: {
              asignatura: claseData.asignatura, // Asignatura del QR
              seccion: claseData.seccion,     // Sección del QR
              fecha: new Date().toLocaleString(), // Fecha actual
            },
          });
        }
      } catch (error) {
        console.error('Error inesperado al procesar el QR:', error);
        this.presentAlert('Hubo un problema al procesar el código QR.');
      }
    } else {
      this.presentAlert('No se pudo leer el código QR.');
    }
  }

  async presentAlert(message: string): Promise<void> {
    console.log('Mostrando alerta:', message);
    const alert = await this.alertController.create({
      header: 'Atención',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log('Estado de permisos de cámara:', camera);
    return camera === 'granted' || camera === 'limited';
  }
}
