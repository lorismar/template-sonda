import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalApComponent } from './modal-ap.component';

describe('ModalAaComponent', () => {
  let component: ModalApComponent;
  let fixture: ComponentFixture<ModalApComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalApComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
