import { TestBed } from '@angular/core/testing';

import { ConfigGameService } from './config-game.service';

describe('ConfigGameService', () => {
  let service: ConfigGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
