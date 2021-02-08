import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouldContainerComponent } from './could-container.component';

describe('CouldContainerComponent', () => {
  let component: CouldContainerComponent;
  let fixture: ComponentFixture<CouldContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouldContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
