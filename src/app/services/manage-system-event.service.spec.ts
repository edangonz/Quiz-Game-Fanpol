import { TestBed } from '@angular/core/testing';

import { ManageSystemEventService } from './manage-system-event.service';

describe('ManageSystemEventService', () => {
  let service: ManageSystemEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageSystemEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
