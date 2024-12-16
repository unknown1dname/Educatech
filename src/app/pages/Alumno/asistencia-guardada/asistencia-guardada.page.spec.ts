import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaGuardadaPage } from './asistencia-guardada.page';

describe('AsistenciaGuardadaPage', () => {
  let component: AsistenciaGuardadaPage;
  let fixture: ComponentFixture<AsistenciaGuardadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaGuardadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
