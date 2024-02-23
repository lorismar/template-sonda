import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReajusteComponent } from './modal-reajuste.component';

describe('ModalReajusteComponent', () => {
  let component: ModalReajusteComponent;
  let fixture: ComponentFixture<ModalReajusteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReajusteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReajusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
