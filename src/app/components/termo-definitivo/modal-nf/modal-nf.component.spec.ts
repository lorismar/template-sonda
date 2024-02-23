import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNfComponent } from './modal-nf.component';

describe('ModalNfComponent', () => {
  let component: ModalNfComponent;
  let fixture: ComponentFixture<ModalNfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalNfComponent]
    });
    fixture = TestBed.createComponent(ModalNfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
