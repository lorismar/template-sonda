import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrdComponent } from './modal-trd.component';

describe('ModalTrdComponent', () => {
  let component: ModalTrdComponent;
  let fixture: ComponentFixture<ModalTrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTrdComponent]
    });
    fixture = TestBed.createComponent(ModalTrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
