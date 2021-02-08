import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterContainerComponent } from './caracter-container.component';

describe('CaracterContainerComponent', () => {
  let component: CaracterContainerComponent;
  let fixture: ComponentFixture<CaracterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
