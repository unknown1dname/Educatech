import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesVisualizacionPage } from './clases-visualizacion.page';

describe('ClasesVisualizacionPage', () => {
  let component: ClasesVisualizacionPage;
  let fixture: ComponentFixture<ClasesVisualizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesVisualizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
