import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/Alumno/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/Alumno/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/Paginas Compartidas/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/Alumno/qr-scanner/qr-scanner.module').then(m => m.QrScannerPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/Paginas Compartidas/error/error.module').then(m => m.ErrorPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/Alumno/notas/notas.module').then(m => m.NotasPageModule)
  },
  {
    path: 'select',
    loadChildren: () => import('./pages/Paginas Compartidas/select/select.module').then(m => m.SelectPageModule)
  },
  {
    path: 'inicio-p',
    loadChildren: () => import('./pages/Profesor/inicio-p/inicio-p.module').then(m => m.InicioPPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/Profesor/generar-qr/generar-qr.module').then(m => m.GenerarQrPageModule)
  },
  {
    path: 'resumen-asistencia',
    loadChildren: () => import('./pages/Alumno/resumen-asistencia/resumen-asistencia.module').then( m => m.ResumenAsistenciaPageModule)
  },
  {
    path: 'comparativa-notas',
    loadChildren: () => import('./pages/Profesor/comparativa-notas/comparativa-notas.module').then( m => m.ComparativaNotasPageModule)
  },
  {
    path: 'notificaciones-asistencia',
    loadChildren: () => import('./pages/Alumno/notificaciones-asistencia/notificaciones-asistencia.module').then( m => m.NotificacionesAsistenciaPageModule)
  },
  {
    path: 'comparativa-asistencia',
    loadChildren: () => import('./pages/Profesor/comparativa-asistencia/comparativa-asistencia.module').then( m => m.ComparativaAsistenciaPageModule)
  },
  {
    path: 'retroalimentacion-asistencia',
    loadChildren: () => import('./pages/Alumno/retroalimentacion-asistencia/retroalimentacion-asistencia.module').then( m => m.RetroalimentacionAsistenciaPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/Alumno/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/Paginas Compartidas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'asistencia-guardada',
    loadChildren: () => import('./pages/Alumno/asistencia-guardada/asistencia-guardada.module').then( m => m.AsistenciaGuardadaPageModule)
  },
  {
    path: 'clases-visualizacion',
    loadChildren: () => import('./pages/Alumno/clases-visualizacion/clases-visualizacion.module').then( m => m.ClasesVisualizacionPageModule)
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
