import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparativaNotasPage } from './comparativa-notas.page';

describe('ComparativaNotasPage', () => {
  let component: ComparativaNotasPage;
  let fixture: ComponentFixture<ComparativaNotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativaNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
