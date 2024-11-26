import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

const routes: Routes = [
  { path: '', redirectTo: 'select', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/qr-scanner/qr-scanner.module').then(m => m.QrScannerPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/notas/notas.module').then(m => m.NotasPageModule)
  },
  {
    path: 'select',
    loadChildren: () => import('./pages/select/select.module').then(m => m.SelectPageModule)
  },
  {
    path: 'login-p',
    loadChildren: () => import('./pages/login-p/login-p.module').then(m => m.LoginPPageModule)
  },
  {
    path: 'inicio-p',
    loadChildren: () => import('./pages/inicio-p/inicio-p.module').then(m => m.InicioPPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/generar-qr/generar-qr.module').then(m => m.GenerarQrPageModule)
  },
  {
    path: 'resumen-asistencia',
    loadChildren: () => import('./pages/resumen-asistencia/resumen-asistencia.module').then( m => m.ResumenAsistenciaPageModule)
  },
  {
    path: 'comparativa-notas',
    loadChildren: () => import('./pages/comparativa-notas/comparativa-notas.module').then( m => m.ComparativaNotasPageModule)
  },
  {
    path: 'notificaciones-asistencia',
    loadChildren: () => import('./pages/notificaciones-asistencia/notificaciones-asistencia.module').then( m => m.NotificacionesAsistenciaPageModule)
  },
  {
    path: 'comparativa-asistencia',
    loadChildren: () => import('./pages/comparativa-asistencia/comparativa-asistencia.module').then( m => m.ComparativaAsistenciaPageModule)
  },
  {
    path: 'retroalimentacion-asistencia',
    loadChildren: () => import('./pages/retroalimentacion-asistencia/retroalimentacion-asistencia.module').then( m => m.RetroalimentacionAsistenciaPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },

  {path: '**', redirectTo: 'error', pathMatch: 'full'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
