import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoAditivoComponent } from './termo-aditivo.component';

describe('TermoAditivoComponent', () => {
  let component: TermoAditivoComponent;
  let fixture: ComponentFixture<TermoAditivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoAditivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoAditivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
