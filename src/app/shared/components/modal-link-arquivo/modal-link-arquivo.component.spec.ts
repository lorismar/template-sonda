import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinkArquivoComponent } from './modal-link-arquivo.component';

describe('ModalLinkArquivoComponent', () => {
  let component: ModalLinkArquivoComponent;
  let fixture: ComponentFixture<ModalLinkArquivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLinkArquivoComponent]
    });
    fixture = TestBed.createComponent(ModalLinkArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
