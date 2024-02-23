import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRazaoSocialComponent } from './modal-razao-social.component';

describe('ModalRazaoSocialComponent', () => {
  let component: ModalRazaoSocialComponent;
  let fixture: ComponentFixture<ModalRazaoSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRazaoSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRazaoSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
