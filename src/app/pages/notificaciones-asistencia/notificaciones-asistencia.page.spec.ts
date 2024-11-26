import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionesAsistenciaPage } from './notificaciones-asistencia.page';

describe('NotificacionesAsistenciaPage', () => {
  let component: NotificacionesAsistenciaPage;
  let fixture: ComponentFixture<NotificacionesAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
