import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroMaterialComponent } from './modal-erro-material.component';

describe('ModalErroMaterialComponent', () => {
  let component: ModalErroMaterialComponent;
  let fixture: ComponentFixture<ModalErroMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroMaterialComponent]
    });
    fixture = TestBed.createComponent(ModalErroMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
