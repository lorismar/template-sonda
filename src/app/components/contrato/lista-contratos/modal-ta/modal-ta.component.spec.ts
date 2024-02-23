import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaComponent } from './modal-ta.component';

describe('ModalTaComponent', () => {
  let component: ModalTaComponent;
  let fixture: ComponentFixture<ModalTaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
