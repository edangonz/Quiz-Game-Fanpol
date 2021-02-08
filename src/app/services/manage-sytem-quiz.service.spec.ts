import { TestBed } from '@angular/core/testing';

import { ManageSytemQuizService } from './manage-sytem-quiz.service';

describe('ManageSytemQuizService', () => {
  let service: ManageSytemQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageSytemQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
