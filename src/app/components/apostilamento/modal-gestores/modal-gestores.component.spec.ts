import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestoresComponent } from './modal-gestores.component';

describe('ModalGestoresComponent', () => {
  let component: ModalGestoresComponent;
  let fixture: ComponentFixture<ModalGestoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGestoresComponent]
    });
    fixture = TestBed.createComponent(ModalGestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
