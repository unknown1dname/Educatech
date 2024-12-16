import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroalimentacionAsistenciaPage } from './retroalimentacion-asistencia.page';

describe('RetroalimentacionAsistenciaPage', () => {
  let component: RetroalimentacionAsistenciaPage;
  let fixture: ComponentFixture<RetroalimentacionAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroalimentacionAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
