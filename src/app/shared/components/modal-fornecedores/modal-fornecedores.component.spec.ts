import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFornecedoresComponent } from './modal-fornecedores.component';

describe('ModalFornecedoresComponent', () => {
  let component: ModalFornecedoresComponent;
  let fixture: ComponentFixture<ModalFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFornecedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
