import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragQuestionComponent } from './drag-question.component';

describe('DragQuestionComponent', () => {
  let component: DragQuestionComponent;
  let fixture: ComponentFixture<DragQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
