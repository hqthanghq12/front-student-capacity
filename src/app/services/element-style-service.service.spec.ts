import { TestBed } from '@angular/core/testing';

import { ElementStyleServiceService } from './element-style-service.service';

describe('ElementStyleServiceService', () => {
  let service: ElementStyleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementStyleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
