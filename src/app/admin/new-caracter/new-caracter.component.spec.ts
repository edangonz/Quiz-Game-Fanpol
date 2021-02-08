import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaracterComponent } from './new-caracter.component';

describe('NewCaracterComponent', () => {
  let component: NewCaracterComponent;
  let fixture: ComponentFixture<NewCaracterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCaracterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaracterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
