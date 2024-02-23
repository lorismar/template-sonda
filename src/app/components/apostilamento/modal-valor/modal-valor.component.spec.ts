import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValorComponent } from './modal-valor.component';

describe('ModalValorComponent', () => {
  let component: ModalValorComponent;
  let fixture: ComponentFixture<ModalValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
