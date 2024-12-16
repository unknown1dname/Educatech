import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { supabase } from 'src/app/services/supabase.service'; // Importa tu configuración de Supabase

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  usuario: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  tipoUsuario: string = 'estudiante'; // Estudiante por defecto
  seccion: string = ''; // Campo Sección

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async registrar() {
    try {
      // Validar campos vacíos
      if (!this.nombre || !this.usuario || !this.contrasena || !this.confirmarContrasena) {
        await this.mostrarAlerta('Error', 'Por favor complete todos los campos');
        return;
      }

      // Validar formato de usuario
      if (!this.validarFormatoUsuario(this.usuario)) {
        await this.mostrarAlerta(
          'Error',
          'El usuario debe tener al menos 4 caracteres y solo puede contener letras y números'
        );
        return;
      }

      // Validar formato de contraseña
      if (!this.validarFormatoContrasena(this.contrasena)) {
        await this.mostrarAlerta(
          'Error',
          'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número'
        );
        return;
      }

      // Validar contraseñas coincidentes
      if (this.contrasena !== this.confirmarContrasena) {
        await this.mostrarAlerta('Error', 'Las contraseñas no coinciden');
        return;
      }

      // Validar campo sección si es estudiante
      if (this.tipoUsuario === 'estudiante' && !this.seccion) {
        await this.mostrarAlerta('Error', 'Por favor seleccione una sección');
        return;
      }

      // Registrar usuario en Supabase
      const usuarioData: any = {
        email: this.usuario,
        password: this.contrasena,
        tipo: this.tipoUsuario,
        nombre: this.nombre,
      };

      if (this.tipoUsuario === 'estudiante') {
        usuarioData.seccion = this.seccion;
      }

      const { data, error } = await supabase.from('users').insert([usuarioData]);

      if (error) {
        console.error('Error al registrar usuario en Supabase:', error);
        await this.mostrarAlerta('Error', 'El usuario ya existe o hubo un error en el registro');
        return;
      }

      await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
      this.router.navigate(['/login']);
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

  private validarFormatoUsuario(usuario: string): boolean {
    const regex = /^[a-zA-Z0-9]{4,}$/;
    return regex.test(usuario);
  }

  private validarFormatoContrasena(contrasena: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(contrasena);
  }
}
