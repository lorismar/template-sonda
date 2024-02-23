import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarGestoresComponent } from './modal-visualizar-gestores.component';

describe('ModalVisualizarGestoresComponent', () => {
  let component: ModalVisualizarGestoresComponent;
  let fixture: ComponentFixture<ModalVisualizarGestoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVisualizarGestoresComponent]
    });
    fixture = TestBed.createComponent(ModalVisualizarGestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
