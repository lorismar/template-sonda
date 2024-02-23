import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcessoComponent } from './modal-processo.component';

describe('ModalProcessoComponent', () => {
  let component: ModalProcessoComponent;
  let fixture: ComponentFixture<ModalProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcessoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
