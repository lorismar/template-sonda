import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuadroSupressaoComponent } from './modal-quadro-supressao.component';

describe('ModalQuadroSupressaoComponent', () => {
  let component: ModalQuadroSupressaoComponent;
  let fixture: ComponentFixture<ModalQuadroSupressaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuadroSupressaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalQuadroSupressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
