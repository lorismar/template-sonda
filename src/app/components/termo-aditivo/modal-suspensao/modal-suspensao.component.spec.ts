import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuspensaoComponent } from './modal-suspensao.component';

describe('ModalSuspensaoComponent', () => {
  let component: ModalSuspensaoComponent;
  let fixture: ComponentFixture<ModalSuspensaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuspensaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSuspensaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
