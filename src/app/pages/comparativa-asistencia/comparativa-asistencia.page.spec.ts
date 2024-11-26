import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparativaAsistenciaPage } from './comparativa-asistencia.page';

describe('ComparativaAsistenciaPage', () => {
  let component: ComparativaAsistenciaPage;
  let fixture: ComponentFixture<ComparativaAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativaAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
