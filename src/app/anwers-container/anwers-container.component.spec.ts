import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnwersContainerComponent } from './anwers-container.component';

describe('AnwersContainerComponent', () => {
  let component: AnwersContainerComponent;
  let fixture: ComponentFixture<AnwersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnwersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnwersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
