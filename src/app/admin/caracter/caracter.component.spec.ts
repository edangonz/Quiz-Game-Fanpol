import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterComponent } from './caracter.component';

describe('CaracterComponent', () => {
  let component: CaracterComponent;
  let fixture: ComponentFixture<CaracterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
