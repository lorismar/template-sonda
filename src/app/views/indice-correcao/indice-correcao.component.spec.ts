import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceCorrecaoComponent } from './indice-correcao.component';

describe('IndiceCorrecaoComponent', () => {
  let component: IndiceCorrecaoComponent;
  let fixture: ComponentFixture<IndiceCorrecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiceCorrecaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceCorrecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
