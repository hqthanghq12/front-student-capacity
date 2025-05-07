import { TestBed } from '@angular/core/testing';

import { PageStateServiceService } from './page-state-service.service';

describe('PageStateServiceService', () => {
  let service: PageStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
