import { TestBed } from '@angular/core/testing';

import { ResultCapacityService } from './result-capacity.service';

describe('ResultCapacityService', () => {
  let service: ResultCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
