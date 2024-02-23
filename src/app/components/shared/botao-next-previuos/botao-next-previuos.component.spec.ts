import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoNextPreviuosComponent } from './botao-next-previuos.component';

describe('BotaoNextPreviuosComponent', () => {
  let component: BotaoNextPreviuosComponent;
  let fixture: ComponentFixture<BotaoNextPreviuosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoNextPreviuosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoNextPreviuosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
