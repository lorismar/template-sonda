import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQuadroComponent } from './item-quadro.component';

describe('ItemQuadroComponent', () => {
  let component: ItemQuadroComponent;
  let fixture: ComponentFixture<ItemQuadroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemQuadroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemQuadroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
