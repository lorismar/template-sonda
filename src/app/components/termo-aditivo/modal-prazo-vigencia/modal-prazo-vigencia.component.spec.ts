import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrazoVigenciaComponent } from './modal-prazo-vigencia.component';

describe('ModalPrazoVigenciaComponent', () => {
  let component: ModalPrazoVigenciaComponent;
  let fixture: ComponentFixture<ModalPrazoVigenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPrazoVigenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPrazoVigenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
