import { Component } from '@angular/core';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrData: string = ''; // Contenido del QR
  generatedQr: string = ''; // URL del QR generado

  constructor() { }

  generarCodigoQr() {
    this.generatedQr = this.qrData; // Asigna el texto a la propiedad del QR
  }
}

