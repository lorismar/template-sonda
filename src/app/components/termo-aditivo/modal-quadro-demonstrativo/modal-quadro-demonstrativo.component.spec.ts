import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuadroDemonstrativoComponent } from './modal-quadro-demonstrativo.component';

describe('ModalQuadroDemonstrativoComponent', () => {
  let component: ModalQuadroDemonstrativoComponent;
  let fixture: ComponentFixture<ModalQuadroDemonstrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuadroDemonstrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalQuadroDemonstrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
