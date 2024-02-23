import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReequilibrioComponent } from './modal-reequilibrio.component';

describe('ModalReequilibrioComponent', () => {
  let component: ModalReequilibrioComponent;
  let fixture: ComponentFixture<ModalReequilibrioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalReequilibrioComponent]
    });
    fixture = TestBed.createComponent(ModalReequilibrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
