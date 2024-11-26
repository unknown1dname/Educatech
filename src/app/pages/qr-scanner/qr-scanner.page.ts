import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { DbService } from 'src/app/services/db.service';

import { Router } from '@angular/router';  // Importa Router para redirigir

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
    private dbService: DbService,  // Inyectamos el servicio DbService
    private router: Router         // Inyectamos el Router para redirección
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Por favor, otorga permisos para usar la cámara.');
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    const barcodeData = this.barcodes[0]?.displayValue;  // Suponiendo que estamos usando solo el primer código

    if (barcodeData) {
      // Aquí puedes parsear el valor del código QR según tu necesidad
      // Por ejemplo, si el código QR contiene información como "estudianteId-cursoId"
      const [estudianteId, cursoId] = barcodeData.split('-');  // Asumiendo que el formato del código QR es "estudianteId-cursoId"

      // Guarda la asistencia en la base de datos
      const asistenciaGuardada = await this.dbService.saveAssistance(Number(estudianteId), Number(cursoId), true);

      if (asistenciaGuardada) {
        // Redirige a la página de "asistencia guardada"
        this.router.navigate(['/asistencia-guardada']);
        this.presentAlert('Asistencia guardada con éxito');
      } else {
        this.presentAlert('Error al guardar la asistencia');
      }
    }
  }

  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  
}
