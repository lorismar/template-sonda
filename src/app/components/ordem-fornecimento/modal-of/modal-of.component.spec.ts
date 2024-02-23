import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOfComponent } from './modal-of.component';

describe('ModalOfComponent', () => {
  let component: ModalOfComponent;
  let fixture: ComponentFixture<ModalOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
