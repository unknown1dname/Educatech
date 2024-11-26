import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  usuario: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  tipoUsuario: string = 'estudiante';  // Estudiante por defecto

  constructor(
    private dbService: DbService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async registrar() {
    try {
      // Validar campos vacíos
      if (!this.usuario || !this.contrasena || !this.confirmarContrasena) {
        await this.mostrarAlerta('Error', 'Por favor complete todos los campos');
        return;
      }

      // Validar formato de usuario
      if (!this.dbService.validarFormatoUsuario(this.usuario)) {
        await this.mostrarAlerta('Error', 'El usuario debe tener al menos 4 caracteres y solo puede contener letras y números');
        return;
      }

      // Validar formato de contraseña
      if (!this.dbService.validarFormatoContrasena(this.contrasena)) {
        await this.mostrarAlerta('Error', 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número');
        return;
      }

      // Validar contraseñas coincidentes
      if (this.contrasena !== this.confirmarContrasena) {
        await this.mostrarAlerta('Error', 'Las contraseñas no coinciden');
        return;
      }

      // Intentar registro en la base de datos SQLite
      const registroExitoso = await this.dbService.registrarUsuario(
        this.usuario,
        this.contrasena,
        this.tipoUsuario, // Pasamos el tipo de usuario (estudiante o profesor)
        '' // Email, podrías agregarlo también si es necesario
      );

      if (registroExitoso) {
        await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
        this.router.navigate(['/login']);
      } else {
        await this.mostrarAlerta('Error', 'El usuario ya existe o hubo un error en el registro');
      }

    } catch (error) {
      console.error('Error en el registro:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un error inesperado');
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
