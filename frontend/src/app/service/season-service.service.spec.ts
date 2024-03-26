import { TestBed } from '@angular/core/testing';

import { SeasonServiceService } from './season-service.service';

describe('SeasonServiceService', () => {
  let service: SeasonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
