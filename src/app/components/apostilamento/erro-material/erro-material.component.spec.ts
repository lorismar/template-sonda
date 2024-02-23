import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroMaterialComponent } from './erro-material.component';

describe('ErroMaterialComponent', () => {
  let component: ErroMaterialComponent;
  let fixture: ComponentFixture<ErroMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErroMaterialComponent]
    });
    fixture = TestBed.createComponent(ErroMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
