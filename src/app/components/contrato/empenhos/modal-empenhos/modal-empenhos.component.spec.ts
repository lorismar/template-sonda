import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpenhosComponent } from './modal-empenhos.component';

describe('ModalContratoComponent', () => {
  let component: ModalEmpenhosComponent;
  let fixture: ComponentFixture<ModalEmpenhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmpenhosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEmpenhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
