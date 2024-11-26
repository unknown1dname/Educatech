import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginUsuario: string = '';
  loginContrasena: string = '';

  constructor(
    private router: Router,
    private dbService: DbService,
    private alertController: AlertController
  ) {}

  async validarCredenciales() {
    try {
      // Validar que los campos no estén vacíos
      if (!this.loginUsuario || !this.loginContrasena) {
        await this.mostrarAlerta('Campos vacíos', 'Por favor complete todos los campos');
        return;
      }

      // Obtener el usuario de la base de datos
      const usuario = await this.dbService.getUsuario(this.loginUsuario);

      if (usuario && usuario.password === this.loginContrasena && usuario.tipo === 'estudiante') {
        // Si el usuario es un estudiante, navegar a la página de inicio del estudiante
        let navigationExtras: NavigationExtras = {
          queryParams: {
            usuario: this.loginUsuario,
            tipo: usuario.tipo // Pasar el tipo de usuario
          }
        };
        this.router.navigate(['/inicio'], navigationExtras); // Redirigir a inicio del estudiante
      } else {
        await this.mostrarAlerta('Error en inicio de sesión', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al validar credenciales:', error);
      await this.mostrarAlerta('Error', 'Hubo un problema al verificar las credenciales');
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
