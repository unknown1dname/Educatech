import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';

  constructor(private alertController: AlertController) {}

  async recuperarContrasena() {
    if (this.email.trim() === '') {
      // Mostrar alerta si el campo de correo está vacío
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Campo vacío',
        message: 'Por favor, ingresa tu correo electrónico.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // Aquí iría la lógica para enviar el correo de recuperación
    console.log('Enviando instrucciones a:', this.email);

    // Muestra una alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Se han enviado las instrucciones de recuperación a tu correo electrónico.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
