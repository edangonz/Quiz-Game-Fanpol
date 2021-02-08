import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterCanvasComponent } from './caracter-canvas.component';

describe('CaracterCanvasComponent', () => {
  let component: CaracterCanvasComponent;
  let fixture: ComponentFixture<CaracterCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
