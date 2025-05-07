import { TestBed } from '@angular/core/testing';

import { SemeterService } from './semeter.service';

describe('SemeterService', () => {
  let service: SemeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
