import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { supabase } from 'src/app/services/supabase.service'; // Importa la configuración de Supabase

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginUsuario: string = ''; // Email o nombre de usuario
  loginContrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async validarCredenciales() {
    try {
      // Validar que los campos no estén vacíos
      if (!this.loginUsuario || !this.loginContrasena) {
        await this.mostrarAlerta('Campos vacíos', 'Por favor complete todos los campos');
        return;
      }

      // Buscar usuario en Supabase por email
      const { data: usuarios, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', this.loginUsuario);

      if (error || usuarios.length === 0) {
        await this.mostrarAlerta('Error', 'Usuario no encontrado o credenciales incorrectas');
        return;
      }

      const usuario = usuarios[0];

      // Validar contraseña
      if (usuario.password !== this.loginContrasena) {
        await this.mostrarAlerta('Error', 'Contraseña incorrecta');
        return;
      }

      // Guardar el usuarioID en localStorage
      localStorage.setItem('usuarioID', usuario.id);
      localStorage.setItem('seccion', usuario.seccion);  // Aquí guardas el ID del usuario en localStorage

      // Redirigir según el tipo de usuario
      let navigationExtras: NavigationExtras = {
        queryParams: {
          usuario: this.loginUsuario,
          tipo: usuario.tipo, // Tipo de usuario: 'estudiante' o 'profesor'
        },
      };

      if (usuario.tipo === 'estudiante') {
        this.router.navigate(['/inicio'], navigationExtras);
      } else if (usuario.tipo === 'profesor') {
        this.router.navigate(['/inicio-p'], navigationExtras);
      } else {
        await this.mostrarAlerta('Error', 'Tipo de usuario no reconocido');
      }
    } catch (error) {
      console.error('Error al validar credenciales:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un problema al iniciar sesión');
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
