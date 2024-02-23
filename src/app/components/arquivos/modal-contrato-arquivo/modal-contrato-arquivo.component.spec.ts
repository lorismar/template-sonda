import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContratoArquivoComponent } from './modal-contrato-arquivo.component';

describe('ModalContratoArquivoComponent', () => {
  let component: ModalContratoArquivoComponent;
  let fixture: ComponentFixture<ModalContratoArquivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalContratoArquivoComponent]
    });
    fixture = TestBed.createComponent(ModalContratoArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
