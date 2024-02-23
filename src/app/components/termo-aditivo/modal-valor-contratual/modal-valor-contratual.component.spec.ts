import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValorContratualComponent } from './modal-valor-contratual.component';

describe('ModalValorContratualComponent', () => {
  let component: ModalValorContratualComponent;
  let fixture: ComponentFixture<ModalValorContratualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValorContratualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValorContratualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
