import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOutrosComponent } from './modal-outros.component';

describe('ModalOutrosComponent', () => {
  let component: ModalOutrosComponent;
  let fixture: ComponentFixture<ModalOutrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOutrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
