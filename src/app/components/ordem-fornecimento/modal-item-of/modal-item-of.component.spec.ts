import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemOFComponent } from './modal-item-of.component';

describe('ModalItemOFComponent', () => {
  let component: ModalItemOFComponent;
  let fixture: ComponentFixture<ModalItemOFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItemOFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalItemOFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
