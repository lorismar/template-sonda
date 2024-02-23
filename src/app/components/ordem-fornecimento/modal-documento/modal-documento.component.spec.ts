import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocumentoComponent } from './modal-documento.component';

describe('ModalDocumentoComponent', () => {
  let component: ModalDocumentoComponent;
  let fixture: ComponentFixture<ModalDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDocumentoComponent]
    });
    fixture = TestBed.createComponent(ModalDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
